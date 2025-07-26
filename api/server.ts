import type { VercelRequest, VercelResponse } from '@vercel/node';
import express from 'express';
import { storage } from '../server/storage.js';
import { generateUISchema, type GenerateUIResponse } from '../shared/schema.js';
import { generateUI } from '../server/services/openai-service.js';

const app = express();
app.use(express.json({ limit: '10mb' }));

// Generate UI endpoint
app.post("/api/generate", async (req, res) => {
  try {
    const validation = generateUISchema.safeParse(req.body);
    
    if (!validation.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: validation.error.errors
      });
    }

    const { prompt, model, responsive } = validation.data;

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        message: "OpenAI API key not configured. Please set OPENAI_API_KEY environment variable."
      });
    }

    try {
      // Generate HTML using OpenAI
      const generatedHtml = await generateUI({
        prompt,
        model,
        responsive
      });

      // Store the generation in storage
      const generation = await storage.createGeneration({
        prompt,
        generatedHtml,
        model
      });

      const response: GenerateUIResponse = {
        html: generatedHtml,
        generationId: generation.id,
        model: generation.model,
        timestamp: generation.createdAt?.toISOString() || new Date().toISOString()
      };

      res.json(response);
    } catch (error: any) {
      console.error("Error generating UI:", error);
      res.status(500).json({
        message: "Failed to generate UI. Please try again.",
        error: error.message
      });
    }
  } catch (error: any) {
    console.error("Server error:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  return app(req as any, res as any);
}