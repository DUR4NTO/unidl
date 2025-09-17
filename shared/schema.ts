import { z } from "zod";
import { 
  pgTable, 
  serial, 
  varchar, 
  text, 
  timestamp, 
  boolean, 
  integer, 
  jsonb,
  index
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";

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

// Database Models
export const downloads = pgTable("downloads", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  platform: varchar("platform", { length: 50 }).notNull(),
  success: boolean("success").notNull(),
  quality: varchar("quality", { length: 10 }),
  ipAddress: varchar("ip_address", { length: 45 }),
  userAgent: text("user_agent"),
  response: jsonb("response"), // Store the full response for analytics
  error: text("error"), // Store error message if failed
  processingTime: integer("processing_time"), // Processing time in milliseconds
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  platformIdx: index("platform_idx").on(table.platform),
  createdAtIdx: index("created_at_idx").on(table.createdAt),
  ipAddressIdx: index("ip_address_idx").on(table.ipAddress),
}));

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  platform: varchar("platform", { length: 50 }).notNull(),
  totalRequests: integer("total_requests").default(0).notNull(),
  successfulRequests: integer("successful_requests").default(0).notNull(),
  failedRequests: integer("failed_requests").default(0).notNull(),
  averageProcessingTime: integer("avg_processing_time").default(0), // in milliseconds
  date: timestamp("date").defaultNow().notNull(), // Daily aggregations
}, (table) => ({
  platformDateIdx: index("platform_date_idx").on(table.platform, table.date),
}));

export const rateLimits = pgTable("rate_limits", {
  id: serial("id").primaryKey(),
  ipAddress: varchar("ip_address", { length: 45 }).notNull(),
  endpoint: varchar("endpoint", { length: 100 }).notNull(),
  requestCount: integer("request_count").default(0).notNull(),
  windowStart: timestamp("window_start").defaultNow().notNull(),
  lastRequest: timestamp("last_request").defaultNow().notNull(),
}, (table) => ({
  ipEndpointIdx: index("ip_endpoint_idx").on(table.ipAddress, table.endpoint),
  windowStartIdx: index("window_start_idx").on(table.windowStart),
}));

// Relations
export const downloadsRelations = relations(downloads, ({ one }) => ({
  analytics: one(analytics, {
    fields: [downloads.platform],
    references: [analytics.platform],
  }),
}));

export const analyticsRelations = relations(analytics, ({ many }) => ({
  downloads: many(downloads),
}));

// Insert schemas
export const insertDownloadSchema = createInsertSchema(downloads).omit({
  id: true,
  createdAt: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).omit({
  id: true,
  date: true,
});

export const insertRateLimitSchema = createInsertSchema(rateLimits).omit({
  id: true,
  windowStart: true,
  lastRequest: true,
});

// Types
export type Download = typeof downloads.$inferSelect;
export type InsertDownload = z.infer<typeof insertDownloadSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type RateLimit = typeof rateLimits.$inferSelect;
export type InsertRateLimit = z.infer<typeof insertRateLimitSchema>;
