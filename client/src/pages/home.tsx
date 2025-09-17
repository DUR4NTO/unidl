import { Download, Rocket, Key, Globe, Server, Train, Triangle, Copy, Play, Github, Twitter, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ApiTester } from "@/components/api-tester";
import { PlatformCard } from "@/components/platform-card";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [activeSection, setActiveSection] = useState("overview");
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied!",
        description: "Code copied to clipboard",
      });
    });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="gradient-border">
                <div className="gradient-border-inner px-3 py-2">
                  <Download className="text-primary h-6 w-6" data-testid="icon-logo" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground" data-testid="text-app-title">
                  Universal Media Downloader API
                </h1>
                <p className="text-sm text-muted-foreground" data-testid="text-author">
                  by Mahi
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary" data-testid="badge-version">
                v1.0.0
              </Badge>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-deploy">
                <Github className="mr-2 h-4 w-4" />
                Deploy Now
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-80 bg-card border-r border-border overflow-y-auto sidebar-scrollbar">
          <nav className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Getting Started
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => scrollToSection("overview")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-overview"
                    >
                      Overview
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("installation")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-installation"
                    >
                      Installation
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("deployment")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-deployment"
                    >
                      Deployment
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  API Endpoints
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => scrollToSection("universal")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-universal"
                    >
                      Universal Download
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("tiktok")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-tiktok"
                    >
                      TikTok
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("instagram")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-instagram"
                    >
                      Instagram
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("pinterest")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-pinterest"
                    >
                      Pinterest
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("facebook")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-facebook"
                    >
                      Facebook
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("likee")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-likee"
                    >
                      Likee
                    </button>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Resources
                </h3>
                <ul className="space-y-2">
                  <li>
                    <button 
                      onClick={() => scrollToSection("examples")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-examples"
                    >
                      Examples
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("errors")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-errors"
                    >
                      Error Handling
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection("rate-limits")}
                      className="block text-foreground hover:text-primary transition-colors py-1 w-full text-left"
                      data-testid="nav-rate-limits"
                    >
                      Rate Limits
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {/* Hero Section */}
            <section id="overview" className="mb-12">
              <div className="gradient-border mb-8">
                <div className="gradient-border-inner p-8">
                  <h1 className="text-4xl font-bold mb-4" data-testid="text-hero-title">
                    Universal Media Downloader API
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6" data-testid="text-hero-description">
                    A powerful Express.js API for downloading videos and images from multiple social media platforms. 
                    No API keys required, simple deployment, and universal URL support.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2">
                      <div className="platform-icon tiktok" data-testid="icon-tiktok">TT</div>
                      <span className="text-sm">TikTok</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="platform-icon instagram" data-testid="icon-instagram">IG</div>
                      <span className="text-sm">Instagram</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="platform-icon pinterest" data-testid="icon-pinterest">PT</div>
                      <span className="text-sm">Pinterest</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="platform-icon facebook" data-testid="icon-facebook">FB</div>
                      <span className="text-sm">Facebook</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="platform-icon likee" data-testid="icon-likee">LK</div>
                      <span className="text-sm">Likee</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="text-primary mb-3">
                      <Rocket className="h-8 w-8" data-testid="icon-deployment" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid="text-feature-1-title">Easy Deployment</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-feature-1-description">
                      Deploy to Render, Railway, Vercel, or any platform with just 3-5 files
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="text-primary mb-3">
                      <Key className="h-8 w-8" data-testid="icon-no-keys" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid="text-feature-2-title">No API Keys</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-feature-2-description">
                      Simple GET requests without authentication or API key requirements
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="text-primary mb-3">
                      <Globe className="h-8 w-8" data-testid="icon-universal" />
                    </div>
                    <h3 className="font-semibold mb-2" data-testid="text-feature-3-title">Universal Support</h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-feature-3-description">
                      Auto-detect platform from URL or use specific endpoints
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Installation Section */}
            <section id="installation" className="mb-12">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-installation-title">Installation & Setup</h2>
              <div className="space-y-6">
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3" data-testid="text-file-structure-title">File Structure</h3>
                    <div className="code-block rounded-lg p-4 font-mono text-sm">
                      <pre className="text-muted-foreground" data-testid="code-file-structure">
{`universal-downloader/
├── server.js          # Main Express server
├── routes/
│   └── download.js    # Download route handlers
├── utils/
│   └── extractors.js  # Platform-specific extractors
├── package.json       # Dependencies
└── README.md         # Documentation`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-3" data-testid="text-dependencies-title">Dependencies</h3>
                    <div className="code-block rounded-lg p-4 font-mono text-sm relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => copyToClipboard(`{
  "name": "universal-media-downloader",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12"
  }
}`)}
                        data-testid="button-copy-dependencies"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-muted-foreground" data-testid="code-dependencies">
{`{
  "name": "universal-media-downloader",
  "version": "1.0.0",
  "main": "server.js",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "axios": "^1.6.0",
    "cheerio": "^1.0.0-rc.12"
  }
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Universal Endpoint */}
            <section id="universal" className="mb-12">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-universal-title">Universal Download Endpoint</h2>
              <Card className="bg-card border border-border overflow-hidden">
                <div className="bg-secondary px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="platform-icon universal" data-testid="icon-universal-endpoint">UN</div>
                      <Badge variant="secondary" className="bg-accent text-accent-foreground" data-testid="badge-get-method">GET</Badge>
                      <code className="font-mono" data-testid="code-universal-endpoint">/api/download</code>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard("GET /api/download?url=https://www.tiktok.com/@username/video/1234567890&quality=hd")}
                      data-testid="button-copy-universal-endpoint"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3" data-testid="text-description-title">Description</h4>
                    <p className="text-muted-foreground" data-testid="text-universal-description">
                      Auto-detects the platform from the provided URL and returns download links for the media content.
                    </p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3" data-testid="text-parameters-title">Parameters</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm" data-testid="table-parameters">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-medium">Parameter</th>
                            <th className="text-left py-2 font-medium">Type</th>
                            <th className="text-left py-2 font-medium">Required</th>
                            <th className="text-left py-2 font-medium">Description</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-2 font-mono" data-testid="param-url">url</td>
                            <td className="py-2 text-muted-foreground">string</td>
                            <td className="py-2">
                              <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                                Required
                              </Badge>
                            </td>
                            <td className="py-2 text-muted-foreground">The social media post URL</td>
                          </tr>
                          <tr>
                            <td className="py-2 font-mono" data-testid="param-quality">quality</td>
                            <td className="py-2 text-muted-foreground">string</td>
                            <td className="py-2">
                              <Badge variant="secondary" className="bg-muted text-muted-foreground">
                                Optional
                              </Badge>
                            </td>
                            <td className="py-2 text-muted-foreground">Preferred quality (hd, sd, auto)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3" data-testid="text-example-request-title">Example Request</h4>
                    <div className="code-block rounded-lg p-4 font-mono text-sm relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => copyToClipboard(`GET /api/download?url=https://www.tiktok.com/@username/video/1234567890&quality=hd

curl -X GET "https://your-api-domain.com/api/download?url=https://www.tiktok.com/@username/video/1234567890"`)}
                        data-testid="button-copy-example-request"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-muted-foreground" data-testid="code-example-request">
{`GET /api/download?url=https://www.tiktok.com/@username/video/1234567890&quality=hd

curl -X GET "https://your-api-domain.com/api/download?url=https://www.tiktok.com/@username/video/1234567890"`}
                      </pre>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3" data-testid="text-example-response-title">Example Response</h4>
                    <div className="code-block rounded-lg p-4 font-mono text-sm relative">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                        onClick={() => copyToClipboard(`{
  "success": true,
  "platform": "tiktok",
  "data": {
    "title": "Amazing dance video!",
    "author": "username",
    "duration": 15,
    "thumbnail": "https://example.com/thumbnail.jpg",
    "downloads": {
      "video": {
        "hd": "https://example.com/video-hd.mp4",
        "sd": "https://example.com/video-sd.mp4"
      },
      "audio": "https://example.com/audio.mp3"
    },
    "metadata": {
      "views": 1000000,
      "likes": 50000,
      "uploadDate": "2024-01-15T10:30:00Z"
    }
  }
}`)}
                        data-testid="button-copy-example-response"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <pre className="text-muted-foreground" data-testid="code-example-response">
{`{
  "success": true,
  "platform": "tiktok",
  "data": {
    "title": "Amazing dance video!",
    "author": "username",
    "duration": 15,
    "thumbnail": "https://example.com/thumbnail.jpg",
    "downloads": {
      "video": {
        "hd": "https://example.com/video-hd.mp4",
        "sd": "https://example.com/video-sd.mp4"
      },
      "audio": "https://example.com/audio.mp3"
    },
    "metadata": {
      "views": 1000000,
      "likes": 50000,
      "uploadDate": "2024-01-15T10:30:00Z"
    }
  }
}`}
                      </pre>
                    </div>
                  </div>
                  
                  <ApiTester />
                </CardContent>
              </Card>
            </section>

            {/* Platform Specific Endpoints */}
            <section id="platform-endpoints" className="mb-12">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-platform-endpoints-title">Platform-Specific Endpoints</h2>
              <div className="grid gap-6">
                <div id="tiktok">
                  <PlatformCard 
                    platform="tiktok"
                    name="TikTok"
                    icon="TT"
                    endpoint="/api/tiktok"
                    description="Download TikTok videos without watermarks, including metadata and audio extraction."
                    exampleUrl="https://www.tiktok.com/@username/video/1234567890"
                    badge="No Watermark"
                    badgeColor="bg-chart-1/20 text-chart-1"
                  />
                </div>
                
                <div id="instagram">
                  <PlatformCard 
                    platform="instagram"
                    name="Instagram"
                    icon="IG"
                    endpoint="/api/instagram"
                    description="Download Instagram posts, stories, reels, and IGTV videos in high quality."
                    exampleUrl="https://www.instagram.com/p/ABC123/"
                    badge="Photos & Videos"
                    badgeColor="bg-chart-2/20 text-chart-2"
                  />
                </div>
                
                <div id="pinterest">
                  <PlatformCard 
                    platform="pinterest"
                    name="Pinterest"
                    icon="PT"
                    endpoint="/api/pinterest"
                    description="Download Pinterest images and videos in original resolution."
                    exampleUrl="https://www.pinterest.com/pin/123456789/"
                    badge="Images & Videos"
                    badgeColor="bg-chart-3/20 text-chart-3"
                  />
                </div>
                
                <div id="facebook">
                  <PlatformCard 
                    platform="facebook"
                    name="Facebook"
                    icon="FB"
                    endpoint="/api/facebook"
                    description="Download public Facebook videos with multiple quality options."
                    exampleUrl="https://www.facebook.com/watch/?v=123456789"
                    badge="Public Videos"
                    badgeColor="bg-chart-4/20 text-chart-4"
                  />
                </div>
                
                <div id="likee">
                  <PlatformCard 
                    platform="likee"
                    name="Likee"
                    icon="LK"
                    endpoint="/api/likee"
                    description="Download Likee videos with original quality and metadata."
                    exampleUrl="https://l.likee.video/v/123456"
                    badge="HD Videos"
                    badgeColor="bg-chart-5/20 text-chart-5"
                  />
                </div>
              </div>
            </section>

            {/* Error Handling */}
            <section id="errors" className="mb-12">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-errors-title">Error Handling</h2>
              <div className="space-y-6">
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4" data-testid="text-error-format-title">Error Response Format</h3>
                    <div className="code-block rounded-lg p-4 font-mono text-sm">
                      <pre className="text-muted-foreground" data-testid="code-error-format">
{`{
  "success": false,
  "error": {
    "code": "INVALID_URL",
    "message": "The provided URL is not valid or supported",
    "details": "Please check the URL format and try again"
  }
}`}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4" data-testid="text-error-codes-title">Common Error Codes</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <code className="font-mono text-sm" data-testid="error-code-invalid-url">INVALID_URL</code>
                        <span className="text-sm text-muted-foreground">URL format is incorrect or unsupported</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <code className="font-mono text-sm" data-testid="error-code-platform-not-supported">PLATFORM_NOT_SUPPORTED</code>
                        <span className="text-sm text-muted-foreground">Platform is not yet supported</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <code className="font-mono text-sm" data-testid="error-code-content-not-found">CONTENT_NOT_FOUND</code>
                        <span className="text-sm text-muted-foreground">Content was deleted or is private</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-border">
                        <code className="font-mono text-sm" data-testid="error-code-rate-limit">RATE_LIMIT_EXCEEDED</code>
                        <span className="text-sm text-muted-foreground">Too many requests, please slow down</span>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <code className="font-mono text-sm" data-testid="error-code-server-error">SERVER_ERROR</code>
                        <span className="text-sm text-muted-foreground">Internal server error occurred</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Deployment Guide */}
            <section id="deployment" className="mb-12">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-deployment-title">Deployment Guide</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="text-primary mb-3">
                      <Server className="h-8 w-8" data-testid="icon-render" />
                    </div>
                    <h3 className="font-semibold mb-3" data-testid="text-render-title">Render</h3>
                    <p className="text-sm text-muted-foreground mb-4" data-testid="text-render-description">
                      Deploy with automatic builds from GitHub
                    </p>
                    <div className="code-block rounded-lg p-3 font-mono text-xs">
                      <code data-testid="code-render-commands">Build Command: npm install<br />Start Command: node server.js</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="text-primary mb-3">
                      <Train className="h-8 w-8" data-testid="icon-railway" />
                    </div>
                    <h3 className="font-semibold mb-3" data-testid="text-railway-title">Railway</h3>
                    <p className="text-sm text-muted-foreground mb-4" data-testid="text-railway-description">
                      One-click deployment with custom domains
                    </p>
                    <div className="code-block rounded-lg p-3 font-mono text-xs">
                      <code data-testid="code-railway-commands">railway login<br />railway deploy</code>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border border-border">
                  <CardContent className="p-6">
                    <div className="text-primary mb-3">
                      <Triangle className="h-8 w-8" data-testid="icon-vercel" />
                    </div>
                    <h3 className="font-semibold mb-3" data-testid="text-vercel-title">Vercel</h3>
                    <p className="text-sm text-muted-foreground mb-4" data-testid="text-vercel-description">
                      Serverless deployment with edge functions
                    </p>
                    <div className="code-block rounded-lg p-3 font-mono text-xs">
                      <code data-testid="code-vercel-commands">vercel --prod<br />API routes in /api folder</code>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border pt-8 mt-12">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p className="text-muted-foreground" data-testid="text-footer-author">
                    Built with ❤️ by <span className="font-semibold text-primary">Mahi</span>
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" data-testid="button-github">
                    <Github className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" data-testid="button-twitter">
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" data-testid="button-email">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
