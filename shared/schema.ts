import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const generations = pgTable("generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  prompt: text("prompt").notNull(),
  generatedHtml: text("generated_html").notNull(),
  model: text("model").notNull().default("gpt-4o"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertGenerationSchema = createInsertSchema(generations).pick({
  prompt: true,
  generatedHtml: true,
  model: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Generation = typeof generations.$inferSelect;
export type InsertGeneration = z.infer<typeof insertGenerationSchema>;

// API request/response schemas
export const generateUISchema = z.object({
  prompt: z.string().min(10, "Prompt must be at least 10 characters"),
  model: z.enum([
    // OpenAI
    "gpt-4o", "gpt-4-turbo", "gpt-3.5-turbo",
    // Anthropic
    "claude-sonnet-4-20250514", "claude-3-5-sonnet", "claude-3-opus", "claude-3-haiku",
    // Google
    "gemini-1.5-pro", "gemini-1.5-flash", "gemini-2.0", "gemini-2.5-flash",
    // xAI
    "grok-2-1212", "grok-2-vision-1212", "grok-1",
    // Cohere
    "command-r", "command-r-plus"
  ]).default("gpt-4o"),
  responsive: z.boolean().default(true),
});

export type GenerateUIRequest = z.infer<typeof generateUISchema>;

export const generateUIResponseSchema = z.object({
  html: z.string(),
  generationId: z.string(),
  model: z.string(),
  timestamp: z.string(),
});

export type GenerateUIResponse = z.infer<typeof generateUIResponseSchema>;

// Collaborative design schemas
export const collaborativeRooms = pgTable("collaborative_rooms", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  currentPrompt: text("current_prompt").default(""),
  currentHtml: text("current_html").default(""),
  model: text("model").notNull().default("gpt-4o"),
  createdAt: timestamp("created_at").defaultNow(),
  lastActivity: timestamp("last_activity").defaultNow(),
  participants: json("participants").default([]),
});

export const insertRoomSchema = createInsertSchema(collaborativeRooms).pick({
  name: true,
  currentPrompt: true,
  currentHtml: true,
  model: true,
});

export type InsertRoom = z.infer<typeof insertRoomSchema>;
export type CollaborativeRoom = typeof collaborativeRooms.$inferSelect;

// WebSocket message schemas
export const collaborativeMessageSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("join"),
    roomId: z.string(),
    userId: z.string(),
    username: z.string(),
  }),
  z.object({
    type: z.literal("leave"),
    roomId: z.string(),
    userId: z.string(),
  }),
  z.object({
    type: z.literal("prompt_change"),
    roomId: z.string(),
    userId: z.string(),
    prompt: z.string(),
  }),
  z.object({
    type: z.literal("generate"),
    roomId: z.string(),
    userId: z.string(),
    prompt: z.string(),
    model: z.string(),
  }),
  z.object({
    type: z.literal("cursor_move"),
    roomId: z.string(),
    userId: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
  }),
]);

export type CollaborativeMessage = z.infer<typeof collaborativeMessageSchema>;

export const collaborativeEventSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user_joined"),
    roomId: z.string(),
    user: z.object({
      id: z.string(),
      username: z.string(),
      color: z.string(),
    }),
    participants: z.array(z.object({
      id: z.string(),
      username: z.string(),
      color: z.string(),
    })),
  }),
  z.object({
    type: z.literal("user_left"),
    roomId: z.string(),
    userId: z.string(),
    participants: z.array(z.object({
      id: z.string(),
      username: z.string(),
      color: z.string(),
    })),
  }),
  z.object({
    type: z.literal("prompt_updated"),
    roomId: z.string(),
    prompt: z.string(),
    userId: z.string(),
    username: z.string(),
  }),
  z.object({
    type: z.literal("generation_started"),
    roomId: z.string(),
    userId: z.string(),
    username: z.string(),
    prompt: z.string(),
    model: z.string(),
  }),
  z.object({
    type: z.literal("generation_completed"),
    roomId: z.string(),
    html: z.string(),
    generationId: z.string(),
  }),
  z.object({
    type: z.literal("generation_error"),
    roomId: z.string(),
    error: z.string(),
  }),
  z.object({
    type: z.literal("cursor_position"),
    roomId: z.string(),
    userId: z.string(),
    username: z.string(),
    color: z.string(),
    position: z.object({
      x: z.number(),
      y: z.number(),
    }),
  }),
]);

export type CollaborativeEvent = z.infer<typeof collaborativeEventSchema>;
