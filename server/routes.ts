import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { generateUISchema, type GenerateUIRequest, type GenerateUIResponse } from "@shared/schema";
import { generateUI, validateAPIKey } from "./services/openai-service";

export async function registerRoutes(app: Express): Promise<Server> {
  
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
      if (!process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY_ENV_VAR) {
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
      } catch (apiError) {
        console.error("Generation error:", apiError);
        res.status(500).json({
          message: apiError instanceof Error ? apiError.message : "Failed to generate UI"
        });
      }
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({
        message: "Internal server error"
      });
    }
  });

  // Get generation by ID
  app.get("/api/generations/:id", async (req, res) => {
    try {
      const generation = await storage.getGeneration(req.params.id);
      
      if (!generation) {
        return res.status(404).json({
          message: "Generation not found"
        });
      }

      res.json(generation);
    } catch (error) {
      console.error("Error fetching generation:", error);
      res.status(500).json({
        message: "Failed to fetch generation"
      });
    }
  });

  // Get recent generations
  app.get("/api/generations", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const generations = await storage.getRecentGenerations(limit);
      res.json(generations);
    } catch (error) {
      console.error("Error fetching generations:", error);
      res.status(500).json({
        message: "Failed to fetch generations"
      });
    }
  });

  // Validate API key endpoint
  app.post("/api/validate-key", async (req, res) => {
    try {
      const isValid = await validateAPIKey();
      res.json({ valid: isValid });
    } catch (error) {
      res.json({ valid: false });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
