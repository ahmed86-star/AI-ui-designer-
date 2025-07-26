import { WebSocket } from "ws";
import type { CollaborativeMessage, CollaborativeEvent, CollaborativeRoom } from "@shared/schema";
import { storage } from "../storage";

interface Participant {
  id: string;
  username: string;
  color: string;
  ws: WebSocket;
}

interface Room {
  id: string;
  participants: Map<string, Participant>;
  lastActivity: Date;
}

class CollaborationService {
  private rooms = new Map<string, Room>();
  private userColors = [
    "#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", 
    "#ef4444", "#ec4899", "#06b6d4", "#84cc16",
    "#f97316", "#6366f1", "#14b8a6", "#eab308"
  ];

  constructor() {
    // Clean up inactive rooms every 5 minutes
    setInterval(() => this.cleanupInactiveRooms(), 5 * 60 * 1000);
  }

  private getRandomColor(): string {
    return this.userColors[Math.floor(Math.random() * this.userColors.length)];
  }

  private cleanupInactiveRooms() {
    const cutoff = new Date(Date.now() - 30 * 60 * 1000); // 30 minutes
    
    for (const [roomId, room] of Array.from(this.rooms.entries())) {
      if (room.lastActivity < cutoff && room.participants.size === 0) {
        this.rooms.delete(roomId);
        console.log(`Cleaned up inactive room: ${roomId}`);
      }
    }
  }

  private broadcast(roomId: string, event: CollaborativeEvent, excludeUserId?: string) {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const message = JSON.stringify(event);
    
    for (const [userId, participant] of Array.from(room.participants.entries())) {
      if (userId !== excludeUserId && participant.ws.readyState === WebSocket.OPEN) {
        try {
          participant.ws.send(message);
        } catch (error) {
          console.error(`Failed to send message to user ${userId}:`, error);
          // Remove participant if connection is broken
          this.removeParticipant(roomId, userId);
        }
      }
    }
  }

  private getParticipantsList(roomId: string) {
    const room = this.rooms.get(roomId);
    if (!room) return [];

    return Array.from(room.participants.values()).map(p => ({
      id: p.id,
      username: p.username,
      color: p.color,
    }));
  }

  async joinRoom(roomId: string, userId: string, username: string, ws: WebSocket): Promise<void> {
    // Get or create room
    let room = this.rooms.get(roomId);
    if (!room) {
      room = {
        id: roomId,
        participants: new Map(),
        lastActivity: new Date(),
      };
      this.rooms.set(roomId, room);
    }

    // Add participant
    const participant: Participant = {
      id: userId,
      username,
      color: this.getRandomColor(),
      ws,
    };

    room.participants.set(userId, participant);
    room.lastActivity = new Date();

    // Get room data from storage
    const roomData = await storage.getRoom(roomId);
    
    // Send current room state to new participant
    if (roomData) {
      const roomState: CollaborativeEvent = {
        type: "prompt_updated",
        roomId,
        prompt: roomData.currentPrompt || "",
        userId: "system",
        username: "System",
      };
      
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(roomState));
      }
    }

    // Broadcast user joined event
    const joinEvent: CollaborativeEvent = {
      type: "user_joined",
      roomId,
      user: {
        id: userId,
        username,
        color: participant.color,
      },
      participants: this.getParticipantsList(roomId),
    };

    this.broadcast(roomId, joinEvent);
    
    console.log(`User ${username} (${userId}) joined room ${roomId}`);
  }

  removeParticipant(roomId: string, userId: string): void {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const participant = room.participants.get(userId);
    if (!participant) return;

    room.participants.delete(userId);
    room.lastActivity = new Date();

    // Broadcast user left event
    const leaveEvent: CollaborativeEvent = {
      type: "user_left",
      roomId,
      userId,
      participants: this.getParticipantsList(roomId),
    };

    this.broadcast(roomId, leaveEvent);
    
    console.log(`User ${participant.username} (${userId}) left room ${roomId}`);

    // Clean up room if empty
    if (room.participants.size === 0) {
      setTimeout(() => {
        const currentRoom = this.rooms.get(roomId);
        if (currentRoom && currentRoom.participants.size === 0) {
          this.rooms.delete(roomId);
          console.log(`Removed empty room: ${roomId}`);
        }
      }, 5000); // Wait 5 seconds before cleanup
    }
  }

  async handleMessage(roomId: string, userId: string, message: CollaborativeMessage): Promise<void> {
    const room = this.rooms.get(roomId);
    if (!room) return;

    const participant = room.participants.get(userId);
    if (!participant) return;

    room.lastActivity = new Date();

    switch (message.type) {
      case "prompt_change":
        // Update room prompt in storage
        await storage.updateRoomPrompt(roomId, message.prompt);
        
        // Broadcast prompt change
        const promptEvent: CollaborativeEvent = {
          type: "prompt_updated",
          roomId,
          prompt: message.prompt,
          userId,
          username: participant.username,
        };
        this.broadcast(roomId, promptEvent, userId);
        break;

      case "generate":
        // Broadcast generation started
        const startEvent: CollaborativeEvent = {
          type: "generation_started",
          roomId,
          userId,
          username: participant.username,
          prompt: message.prompt,
          model: message.model,
        };
        this.broadcast(roomId, startEvent);
        break;

      case "cursor_move":
        // Broadcast cursor position
        const cursorEvent: CollaborativeEvent = {
          type: "cursor_position",
          roomId,
          userId,
          username: participant.username,
          color: participant.color,
          position: message.position,
        };
        this.broadcast(roomId, cursorEvent, userId);
        break;
    }
  }

  async broadcastGenerationComplete(roomId: string, html: string, generationId: string): Promise<void> {
    // Update room HTML in storage
    await storage.updateRoomHtml(roomId, html);
    
    // Broadcast generation completed
    const completeEvent: CollaborativeEvent = {
      type: "generation_completed",
      roomId,
      html,
      generationId,
    };
    this.broadcast(roomId, completeEvent);
  }

  async broadcastGenerationError(roomId: string, error: string): Promise<void> {
    const errorEvent: CollaborativeEvent = {
      type: "generation_error",
      roomId,
      error,
    };
    this.broadcast(roomId, errorEvent);
  }

  getRoomParticipantCount(roomId: string): number {
    const room = this.rooms.get(roomId);
    return room?.participants.size || 0;
  }

  isUserInRoom(roomId: string, userId: string): boolean {
    const room = this.rooms.get(roomId);
    return room?.participants.has(userId) || false;
  }
}

export const collaborationService = new CollaborationService();