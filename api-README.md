# Universal Media Downloader API

**Author: Mahi**

A simple and powerful REST API for downloading videos and images from multiple social media platforms without requiring API keys.

## 🚀 Supported Platforms

- **TikTok** - Videos without watermarks
- **Instagram** - Photos and videos  
- **Pinterest** - Images and videos
- **Facebook** - Videos
- **Likee** - Videos

## 📁 Simple Structure (4 files)

```
universal-downloader-api/
├── package.json     # Dependencies and scripts
├── server.js        # Express server with all routes
├── downloader.js    # Platform extraction logic
└── README.md        # This file
```

## ⚡ Quick Deploy

### Deploy to Render

1. Fork/upload these 4 files to GitHub
2. Connect to Render.com
3. Create new Web Service
4. Build Command: `npm install`
5. Start Command: `npm start`

### Deploy to Railway

1. Upload files to GitHub
2. Connect to Railway.app
3. Deploy from GitHub
4. Set PORT environment variable (optional)

### Deploy to Vercel

1. Upload files to GitHub
2. Connect to Vercel.com
3. Framework Preset: None
4. Build Command: (leave empty)
5. Output Directory: (leave empty)
6. Install Command: `npm install`
7. Dev Command: `npm start`

## 🔗 API Endpoints

### Universal Endpoint (Auto-detect platform)
```
GET /api/download?url=<SOCIAL_MEDIA_URL>&quality=<hd|sd|auto>
```

### Platform-Specific Endpoints
```
GET /api/tiktok?url=<TIKTOK_URL>
GET /api/instagram?url=<INSTAGRAM_URL>
GET /api/pinterest?url=<PINTEREST_URL>
GET /api/facebook?url=<FACEBOOK_URL>
GET /api/likee?url=<LIKEE_URL>
```

## 📚 Usage Examples

### cURL Examples
```bash
# Universal endpoint
curl "https://your-api.com/api/download?url=https://www.tiktok.com/@user/video/123"

# Platform-specific
curl "https://your-api.com/api/tiktok?url=https://www.tiktok.com/@user/video/123"
```

### JavaScript Examples
```javascript
// Fetch API
const response = await fetch('https://your-api.com/api/download?url=https://www.tiktok.com/@user/video/123');
const data = await response.json();

// Axios
const { data } = await axios.get('https://your-api.com/api/download', {
  params: { url: 'https://www.tiktok.com/@user/video/123' }
});
```

## 📋 Response Format

### Success Response
```json
{
  "success": true,
  "platform": "tiktok",
  "data": {
    "title": "Video Title",
    "author": "username",
    "duration": 15,
    "thumbnail": "https://thumbnail-url.jpg",
    "downloads": {
      "video": {
        "hd": "https://video-hd.mp4",
        "sd": "https://video-sd.mp4"
      },
      "audio": "https://audio.mp3"
    },
    "metadata": {
      "views": 1000000,
      "likes": 50000,
      "uploadDate": "2024-01-15T10:30:00Z"
    }
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "PLATFORM_NOT_SUPPORTED",
    "message": "Platform not supported",
    "details": "This URL platform is not currently supported"
  }
}
```

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start server
npm start

# Server runs on http://localhost:5000
```

## 🌍 Environment Variables

- `PORT` - Server port (default: 5000)

## ⚠️ Important Notes

- **No API keys required** for basic usage
- **Rate limiting** recommended for production use
- **CORS enabled** for cross-origin requests
- Some platforms may require additional authentication for full functionality
- Respect platform terms of service and copyright laws

## 🛡️ Security Features

- URL validation to prevent SSRF attacks
- Strict hostname allowlists per platform
- Request timeouts and limits
- No redirect following on external requests

## 📄 License

MIT License - feel free to use and modify for your projects!

---

**Created by Mahi** 🚀