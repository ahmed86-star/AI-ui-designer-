import type { Express } from "express";
import { createServer, type Server } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { storage } from "./storage";
import { generateUISchema, type GenerateUIRequest, type GenerateUIResponse, collaborativeMessageSchema, insertRoomSchema } from "@shared/schema";
import { z } from "zod";
import { generateUI, validateAPIKey } from "./services/openai-service";
import { collaborationService } from "./services/collaboration-service";
import { randomUUID } from "crypto";

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

  // Create rooms endpoints
  app.post("/api/rooms", async (req, res) => {
    try {
      const validation = insertRoomSchema.safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid room data",
          errors: validation.error.errors
        });
      }

      const room = await storage.createRoom(validation.data);
      res.json(room);
    } catch (error) {
      console.error("Room creation error:", error);
      res.status(500).json({
        message: "Failed to create room"
      });
    }
  });

  app.get("/api/rooms", async (req, res) => {
    try {
      const rooms = await storage.getRooms();
      res.json(rooms);
    } catch (error) {
      console.error("Rooms fetch error:", error);
      res.status(500).json({
        message: "Failed to fetch rooms"
      });
    }
  });

  app.get("/api/rooms/:id", async (req, res) => {
    try {
      const room = await storage.getRoom(req.params.id);
      
      if (!room) {
        return res.status(404).json({
          message: "Room not found"
        });
      }

      res.json(room);
    } catch (error) {
      console.error("Room fetch error:", error);
      res.status(500).json({
        message: "Failed to fetch room"
      });
    }
  });

  // Enhanced generate endpoint for collaborative mode
  app.post("/api/generate/collaborative", async (req, res) => {
    try {
      const validation = generateUISchema.extend({
        roomId: z.string().optional(),
        userId: z.string().optional()
      }).safeParse(req.body);
      
      if (!validation.success) {
        return res.status(400).json({
          message: "Invalid request data",
          errors: validation.error.errors
        });
      }

      const { prompt, model, responsive, roomId, userId } = validation.data;

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

        // Store the generation
        const generation = await storage.createGeneration({
          prompt,
          generatedHtml,
          model
        });

        // If this is a collaborative session, broadcast the result
        if (roomId) {
          await collaborationService.broadcastGenerationComplete(
            roomId,
            generatedHtml,
            generation.id
          );
        }

        const response: GenerateUIResponse = {
          html: generatedHtml,
          generationId: generation.id,
          model: generation.model,
          timestamp: generation.createdAt?.toISOString() || new Date().toISOString()
        };

        res.json(response);
      } catch (apiError) {
        console.error("Generation error:", apiError);
        
        // If this is a collaborative session, broadcast the error
        if (roomId) {
          await collaborationService.broadcastGenerationError(
            roomId,
            apiError instanceof Error ? apiError.message : "Failed to generate UI"
          );
        }
        
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

  const httpServer = createServer(app);

  // Set up WebSocket server for real-time collaboration
  const wss = new WebSocketServer({ 
    server: httpServer, 
    path: '/ws' 
  });

  wss.on('connection', (ws: WebSocket, req) => {
    console.log('New WebSocket connection established');
    
    let currentUserId: string | null = null;
    let currentRoomId: string | null = null;

    ws.on('message', async (data) => {
      try {
        const message = JSON.parse(data.toString());
        const validation = collaborativeMessageSchema.safeParse(message);
        
        if (!validation.success) {
          console.error('Invalid message format:', validation.error);
          return;
        }

        const validMessage = validation.data;

        switch (validMessage.type) {
          case 'join':
            currentUserId = validMessage.userId;
            currentRoomId = validMessage.roomId;
            
            // Create room if it doesn't exist
            let room = await storage.getRoom(validMessage.roomId);
            if (!room) {
              room = await storage.createRoom({
                name: `Room ${validMessage.roomId.slice(0, 8)}`,
                currentPrompt: "",
                currentHtml: "",
                model: "gpt-4o"
              });
            }
            
            await collaborationService.joinRoom(
              validMessage.roomId,
              validMessage.userId,
              validMessage.username,
              ws
            );
            break;

          case 'leave':
            if (currentRoomId && currentUserId) {
              collaborationService.removeParticipant(currentRoomId, currentUserId);
            }
            break;

          default:
            if (currentRoomId && currentUserId) {
              await collaborationService.handleMessage(
                currentRoomId,
                currentUserId,
                validMessage
              );
            }
            break;
        }
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      if (currentRoomId && currentUserId) {
        collaborationService.removeParticipant(currentRoomId, currentUserId);
      }
    });

    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  });

  return httpServer;
}
