import { 
  downloads, 
  analytics, 
  rateLimits, 
  type Download, 
  type InsertDownload,
  type Analytics,
  type InsertAnalytics,
  type RateLimit,
  type InsertRateLimit
} from "@shared/schema";
import { db } from "./db";
import { eq, and, gte, desc, sql, sum, count, avg } from "drizzle-orm";

export interface IStorage {
  // Download history tracking
  recordDownload(download: InsertDownload): Promise<Download>;
  getDownloads(limit?: number, offset?: number): Promise<Download[]>;
  getDownloadsByPlatform(platform: string, limit?: number): Promise<Download[]>;
  
  // Analytics tracking
  updateAnalytics(platform: string, success: boolean, processingTime: number): Promise<void>;
  getAnalytics(platform?: string): Promise<Analytics[]>;
  getDailyStats(date: Date): Promise<Analytics[]>;
  
  // Rate limiting
  checkRateLimit(ipAddress: string, endpoint: string, maxRequests: number, windowMinutes: number): Promise<boolean>;
  recordRequest(ipAddress: string, endpoint: string): Promise<void>;
  getRateLimitStatus(ipAddress: string, endpoint: string): Promise<RateLimit | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Download history methods
  async recordDownload(download: InsertDownload): Promise<Download> {
    const [result] = await db
      .insert(downloads)
      .values(download)
      .returning();
    return result;
  }

  async getDownloads(limit = 100, offset = 0): Promise<Download[]> {
    return await db
      .select()
      .from(downloads)
      .orderBy(desc(downloads.createdAt))
      .limit(limit)
      .offset(offset);
  }

  async getDownloadsByPlatform(platform: string, limit = 100): Promise<Download[]> {
    return await db
      .select()
      .from(downloads)
      .where(eq(downloads.platform, platform))
      .orderBy(desc(downloads.createdAt))
      .limit(limit);
  }

  // Analytics methods
  async updateAnalytics(platform: string, success: boolean, processingTime: number): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Try to update existing record for today
    const existingAnalytics = await db
      .select()
      .from(analytics)
      .where(and(
        eq(analytics.platform, platform),
        gte(analytics.date, today)
      ))
      .limit(1);

    if (existingAnalytics.length > 0) {
      // Update existing record
      const existing = existingAnalytics[0];
      await db
        .update(analytics)
        .set({
          totalRequests: existing.totalRequests + 1,
          successfulRequests: success ? existing.successfulRequests + 1 : existing.successfulRequests,
          failedRequests: success ? existing.failedRequests : existing.failedRequests + 1,
          averageProcessingTime: Math.round(
            (existing.averageProcessingTime * existing.totalRequests + processingTime) / 
            (existing.totalRequests + 1)
          ),
        })
        .where(eq(analytics.id, existing.id));
    } else {
      // Create new record for today
      await db
        .insert(analytics)
        .values({
          platform,
          totalRequests: 1,
          successfulRequests: success ? 1 : 0,
          failedRequests: success ? 0 : 1,
          averageProcessingTime: processingTime,
          date: today,
        });
    }
  }

  async getAnalytics(platform?: string): Promise<Analytics[]> {
    const query = db.select().from(analytics);
    
    if (platform) {
      return await query.where(eq(analytics.platform, platform))
        .orderBy(desc(analytics.date));
    }
    
    return await query.orderBy(desc(analytics.date));
  }

  async getDailyStats(date: Date): Promise<Analytics[]> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await db
      .select()
      .from(analytics)
      .where(and(
        gte(analytics.date, startOfDay),
        gte(endOfDay, analytics.date)
      ))
      .orderBy(desc(analytics.totalRequests));
  }

  // Rate limiting methods
  async checkRateLimit(ipAddress: string, endpoint: string, maxRequests: number, windowMinutes: number): Promise<boolean> {
    const windowStart = new Date();
    windowStart.setMinutes(windowStart.getMinutes() - windowMinutes);

    const rateLimit = await db
      .select()
      .from(rateLimits)
      .where(and(
        eq(rateLimits.ipAddress, ipAddress),
        eq(rateLimits.endpoint, endpoint),
        gte(rateLimits.windowStart, windowStart)
      ))
      .limit(1);

    if (rateLimit.length === 0) {
      return true; // No existing rate limit record
    }

    return rateLimit[0].requestCount < maxRequests;
  }

  async recordRequest(ipAddress: string, endpoint: string): Promise<void> {
    const windowStart = new Date();
    windowStart.setMinutes(windowStart.getMinutes() - 60); // 1 hour window

    const existing = await db
      .select()
      .from(rateLimits)
      .where(and(
        eq(rateLimits.ipAddress, ipAddress),
        eq(rateLimits.endpoint, endpoint),
        gte(rateLimits.windowStart, windowStart)
      ))
      .limit(1);

    if (existing.length > 0) {
      // Update existing record
      await db
        .update(rateLimits)
        .set({
          requestCount: existing[0].requestCount + 1,
          lastRequest: new Date(),
        })
        .where(eq(rateLimits.id, existing[0].id));
    } else {
      // Create new record
      await db
        .insert(rateLimits)
        .values({
          ipAddress,
          endpoint,
          requestCount: 1,
          windowStart: new Date(),
          lastRequest: new Date(),
        });
    }
  }

  async getRateLimitStatus(ipAddress: string, endpoint: string): Promise<RateLimit | undefined> {
    const windowStart = new Date();
    windowStart.setMinutes(windowStart.getMinutes() - 60);

    const [rateLimit] = await db
      .select()
      .from(rateLimits)
      .where(and(
        eq(rateLimits.ipAddress, ipAddress),
        eq(rateLimits.endpoint, endpoint),
        gte(rateLimits.windowStart, windowStart)
      ))
      .limit(1);

    return rateLimit || undefined;
  }
}

export const storage = new DatabaseStorage();
