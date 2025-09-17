import type { Express } from "express";
import { createServer, type Server } from "http";
import cors from "cors";
import { downloadRequestSchema, ErrorCode } from "@shared/schema";
import { MediaDownloader } from "./services/downloader";

export async function registerRoutes(app: Express): Promise<Server> {
  // Enable CORS for all routes
  app.use(cors({
    origin: true,
    credentials: true
  }));

  const downloader = new MediaDownloader();

  // Universal download endpoint
  app.get("/api/download", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      const result = await downloader.downloadUniversal(url, quality);
      
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  // Platform-specific endpoints
  app.get("/api/tiktok", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      
      if (!downloader.detectPlatform(url).includes("tiktok")) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid TikTok URL",
            details: "Please provide a valid TikTok URL"
          }
        });
      }

      const result = await downloader.downloadUniversal(url, quality);
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  app.get("/api/instagram", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      
      if (!downloader.detectPlatform(url).includes("instagram")) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid Instagram URL",
            details: "Please provide a valid Instagram URL"
          }
        });
      }

      const result = await downloader.downloadUniversal(url, quality);
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  app.get("/api/pinterest", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      
      if (!downloader.detectPlatform(url).includes("pinterest")) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid Pinterest URL",
            details: "Please provide a valid Pinterest URL"
          }
        });
      }

      const result = await downloader.downloadUniversal(url, quality);
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  app.get("/api/facebook", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      
      if (!downloader.detectPlatform(url).includes("facebook")) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid Facebook URL",
            details: "Please provide a valid Facebook URL"
          }
        });
      }

      const result = await downloader.downloadUniversal(url, quality);
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  app.get("/api/likee", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      
      if (!downloader.detectPlatform(url).includes("likee")) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid Likee URL",
            details: "Please provide a valid Likee URL"
          }
        });
      }

      const result = await downloader.downloadUniversal(url, quality);
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  app.get("/api/youtube", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      
      if (!downloader.detectPlatform(url).includes("youtube")) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid YouTube URL",
            details: "Please provide a valid YouTube URL"
          }
        });
      }

      const result = await downloader.downloadUniversal(url, quality);
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  app.get("/api/twitter", async (req, res) => {
    try {
      const validation = downloadRequestSchema.safeParse(req.query);
      
      if (!validation.success) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid request parameters",
            details: validation.error.errors.map(e => e.message).join(", ")
          }
        });
      }

      const { url, quality } = validation.data;
      
      if (!downloader.detectPlatform(url).includes("twitter")) {
        return res.status(400).json({
          success: false,
          error: {
            code: ErrorCode.INVALID_URL,
            message: "Invalid Twitter URL",
            details: "Please provide a valid Twitter URL"
          }
        });
      }

      const result = await downloader.downloadUniversal(url, quality);
      const statusCode = result.success ? 200 : 400;
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: {
          code: ErrorCode.SERVER_ERROR,
          message: "Internal server error",
          details: error instanceof Error ? error.message : "Unknown error occurred"
        }
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
