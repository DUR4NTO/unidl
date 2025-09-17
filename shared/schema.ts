import { z } from "zod";

// Download request schema
export const downloadRequestSchema = z.object({
  url: z.string().url("Invalid URL format"),
  quality: z.enum(["hd", "sd", "auto"]).optional().default("auto"),
});

export type DownloadRequest = z.infer<typeof downloadRequestSchema>;

// Download response schemas
export const downloadLinkSchema = z.object({
  url: z.string().url(),
  quality: z.string(),
  size: z.number().optional(),
  format: z.string(),
});

export const mediaMetadataSchema = z.object({
  title: z.string(),
  author: z.string(),
  duration: z.number().optional(),
  thumbnail: z.string().url().optional(),
  views: z.number().optional(),
  likes: z.number().optional(),
  uploadDate: z.string().optional(),
  description: z.string().optional(),
});

export const downloadResponseSchema = z.object({
  success: z.boolean(),
  platform: z.string(),
  data: z.object({
    title: z.string(),
    author: z.string(),
    duration: z.number().optional(),
    thumbnail: z.string().url().optional(),
    downloads: z.object({
      video: z.record(z.string()).optional(),
      audio: z.string().url().optional(),
      images: z.array(z.string().url()).optional(),
    }),
    metadata: mediaMetadataSchema.optional(),
  }).optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.string().optional(),
  }).optional(),
});

export type DownloadResponse = z.infer<typeof downloadResponseSchema>;

// Platform enum
export const Platform = {
  TIKTOK: "tiktok",
  INSTAGRAM: "instagram",
  PINTEREST: "pinterest",
  FACEBOOK: "facebook",
  LIKEE: "likee",
  UNKNOWN: "unknown",
} as const;

export type PlatformType = typeof Platform[keyof typeof Platform];

// Error codes
export const ErrorCode = {
  INVALID_URL: "INVALID_URL",
  PLATFORM_NOT_SUPPORTED: "PLATFORM_NOT_SUPPORTED",
  CONTENT_NOT_FOUND: "CONTENT_NOT_FOUND",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  SERVER_ERROR: "SERVER_ERROR",
  EXTRACTION_FAILED: "EXTRACTION_FAILED",
} as const;

export type ErrorCodeType = typeof ErrorCode[keyof typeof ErrorCode];
