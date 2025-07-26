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
