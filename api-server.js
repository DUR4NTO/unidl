import express from 'express';
import cors from 'cors';
import { MediaDownloader } from './downloader.js';

const app = express();
const port = process.env.PORT || 5000;
const downloader = new MediaDownloader();

// Enable CORS for all routes
app.use(cors({
  origin: true,
  credentials: false
}));

app.use(express.json());

// Universal download endpoint
app.get('/api/download', async (req, res) => {
  try {
    const { url, quality = 'auto' } = req.query;
    
    if (!url) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_URL',
          message: 'URL parameter is required',
          details: 'Please provide a valid social media URL'
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
        code: 'SERVER_ERROR',
        message: 'Internal server error',
        details: error.message
      }
    });
  }
});

// Platform-specific endpoints
const platforms = ['tiktok', 'instagram', 'pinterest', 'facebook', 'likee'];

platforms.forEach(platform => {
  app.get(`/api/${platform}`, async (req, res) => {
    try {
      const { url, quality = 'auto' } = req.query;
      
      if (!url) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_URL',
            message: 'URL parameter is required',
            details: `Please provide a valid ${platform} URL`
          }
        });
      }

      // Validate platform matches URL
      const detectedPlatform = downloader.detectPlatform(url);
      if (!detectedPlatform.includes(platform)) {
        return res.status(400).json({
          success: false,
          error: {
            code: 'INVALID_URL',
            message: `Invalid ${platform} URL`,
            details: `Please provide a valid ${platform} URL`
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
          code: 'SERVER_ERROR',
          message: 'Internal server error',
          details: error.message
        }
      });
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Universal Media Downloader API by Mahi' });
});

// Root endpoint with API info
app.get('/', (req, res) => {
  res.json({
    name: 'Universal Media Downloader API',
    author: 'Mahi',
    version: '1.0.0',
    description: 'Download videos and images from TikTok, Instagram, Pinterest, Facebook, Likee',
    endpoints: {
      universal: 'GET /api/download?url=<SOCIAL_MEDIA_URL>&quality=<hd|sd|auto>',
      platforms: {
        tiktok: 'GET /api/tiktok?url=<TIKTOK_URL>',
        instagram: 'GET /api/instagram?url=<INSTAGRAM_URL>',
        pinterest: 'GET /api/pinterest?url=<PINTEREST_URL>',
        facebook: 'GET /api/facebook?url=<FACEBOOK_URL>',
        likee: 'GET /api/likee?url=<LIKEE_URL>'
      }
    },
    example: `${req.protocol}://${req.get('host')}/api/download?url=https://www.tiktok.com/@username/video/123456789`
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Universal Media Downloader API by Mahi running on port ${port}`);
  console.log(`📖 API Documentation: http://localhost:${port}/`);
});