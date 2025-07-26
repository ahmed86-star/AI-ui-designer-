import { type User, type InsertUser, type Generation, type InsertGeneration, type CollaborativeRoom, type InsertRoom } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Generation operations
  createGeneration(generation: InsertGeneration): Promise<Generation>;
  getGeneration(id: string): Promise<Generation | undefined>;
  getRecentGenerations(limit?: number): Promise<Generation[]>;
  
  // Collaborative room operations
  createRoom(room: InsertRoom): Promise<CollaborativeRoom>;
  getRoom(id: string): Promise<CollaborativeRoom | undefined>;
  updateRoomPrompt(id: string, prompt: string): Promise<void>;
  updateRoomHtml(id: string, html: string): Promise<void>;
  getRooms(): Promise<CollaborativeRoom[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private generations: Map<string, Generation>;
  private rooms: Map<string, CollaborativeRoom>;

  constructor() {
    this.users = new Map();
    this.generations = new Map();
    this.rooms = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createGeneration(insertGeneration: InsertGeneration): Promise<Generation> {
    const id = randomUUID();
    const generation: Generation = {
      ...insertGeneration,
      id,
      model: insertGeneration.model || "gpt-4o",
      createdAt: new Date(),
    };
    this.generations.set(id, generation);
    return generation;
  }

  async getGeneration(id: string): Promise<Generation | undefined> {
    return this.generations.get(id);
  }

  async getRecentGenerations(limit: number = 10): Promise<Generation[]> {
    const allGenerations = Array.from(this.generations.values());
    return allGenerations
      .sort((a, b) => (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0))
      .slice(0, limit);
  }

  async createRoom(insertRoom: InsertRoom): Promise<CollaborativeRoom> {
    const id = randomUUID();
    const room: CollaborativeRoom = {
      ...insertRoom,
      id,
      currentPrompt: insertRoom.currentPrompt || "",
      currentHtml: insertRoom.currentHtml || "",
      model: insertRoom.model || "gpt-4o",
      createdAt: new Date(),
      lastActivity: new Date(),
      participants: [],
    };
    this.rooms.set(id, room);
    return room;
  }

  async getRoom(id: string): Promise<CollaborativeRoom | undefined> {
    return this.rooms.get(id);
  }

  async updateRoomPrompt(id: string, prompt: string): Promise<void> {
    const room = this.rooms.get(id);
    if (room) {
      room.currentPrompt = prompt;
      room.lastActivity = new Date();
      this.rooms.set(id, room);
    }
  }

  async updateRoomHtml(id: string, html: string): Promise<void> {
    const room = this.rooms.get(id);
    if (room) {
      room.currentHtml = html;
      room.lastActivity = new Date();
      this.rooms.set(id, room);
    }
  }

  async getRooms(): Promise<CollaborativeRoom[]> {
    return Array.from(this.rooms.values());
  }
}

export const storage = new MemStorage();
