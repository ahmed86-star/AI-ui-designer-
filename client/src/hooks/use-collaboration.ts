import { useState, useEffect, useRef, useCallback } from "react";
import type { CollaborativeMessage, CollaborativeEvent } from "@shared/schema";

interface UseCollaborationOptions {
  roomId: string;
  userId: string;
  username: string;
  onPromptUpdate?: (prompt: string, userId: string, username: string) => void;
  onGenerationStart?: (userId: string, username: string, prompt?: string, model?: string) => void;
  onGenerationComplete?: (html: string, generationId?: string) => void;
  onGenerationError?: (error: string) => void;
  onParticipantsChange?: (participants: Array<{ id: string; username: string; color: string }>) => void;
  onCursorMove?: (userId: string, username: string, color: string, position: { x: number; y: number }) => void;
}

export function useCollaboration({
  roomId,
  userId,
  username,
  onPromptUpdate,
  onGenerationStart,
  onGenerationComplete,
  onGenerationError,
  onParticipantsChange,
  onCursorMove,
}: UseCollaborationOptions) {
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState<Array<{ id: string; username: string; color: string }>>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const [connectionAttempts, setConnectionAttempts] = useState(0);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return;
    }

    const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
    const wsUrl = `${protocol}//${window.location.host}/ws`;
    
    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("WebSocket connected");
        setIsConnected(true);
        setConnectionAttempts(0);
        
        // Join the room
        const joinMessage: CollaborativeMessage = {
          type: "join",
          roomId,
          userId,
          username,
        };
        ws.send(JSON.stringify(joinMessage));
      };

      ws.onmessage = (event) => {
        try {
          const data: CollaborativeEvent = JSON.parse(event.data);
          
          switch (data.type) {
            case "user_joined":
              setParticipants(data.participants);
              onParticipantsChange?.(data.participants);
              break;
              
            case "user_left":
              setParticipants(data.participants);
              onParticipantsChange?.(data.participants);
              break;
              
            case "prompt_updated":
              onPromptUpdate?.(data.prompt, data.userId, data.username);
              break;
              
            case "generation_started":
              onGenerationStart?.(data.userId, data.username, data.prompt, data.model);
              break;
              
            case "generation_completed":
              onGenerationComplete?.(data.html, data.generationId);
              break;
              
            case "generation_error":
              onGenerationError?.(data.error);
              break;
              
            case "cursor_position":
              onCursorMove?.(data.userId, data.username, data.color, data.position);
              break;
          }
        } catch (error) {
          console.error("Failed to parse WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setIsConnected(false);
        wsRef.current = null;
        
        // Don't auto-reconnect to prevent infinite loops
        // User can manually reconnect if needed
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    } catch (error) {
      console.error("Failed to create WebSocket connection:", error);
    }
  }, [roomId, userId, username, onPromptUpdate, onGenerationStart, onGenerationComplete, onGenerationError, onParticipantsChange, onCursorMove]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (wsRef.current) {
      const leaveMessage: CollaborativeMessage = {
        type: "leave",
        roomId,
        userId,
      };
      
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify(leaveMessage));
      }
      
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setIsConnected(false);
    setParticipants([]);
  }, [roomId, userId]);

  const sendPromptChange = useCallback((prompt: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: CollaborativeMessage = {
        type: "prompt_change",
        roomId,
        userId,
        prompt,
      };
      wsRef.current.send(JSON.stringify(message));
    }
  }, [roomId, userId]);

  const sendGenerate = useCallback((prompt: string, model: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: CollaborativeMessage = {
        type: "generate",
        roomId,
        userId,
        prompt,
        model,
      };
      wsRef.current.send(JSON.stringify(message));
    }
  }, [roomId, userId]);

  const sendCursorMove = useCallback((position: { x: number; y: number }) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const message: CollaborativeMessage = {
        type: "cursor_move",
        roomId,
        userId,
        position,
      };
      wsRef.current.send(JSON.stringify(message));
    }
  }, [roomId, userId]);

  useEffect(() => {
    if (roomId && userId && username) {
      connect();
    }
    
    return () => {
      disconnect();
    };
  }, [roomId, userId, username]);

  return {
    isConnected,
    participants,
    sendPromptChange,
    sendGenerate,
    sendCursorMove,
    reconnect: connect,
    disconnect,
  };
}