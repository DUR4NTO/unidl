# Universal Media Downloader API

## Overview

This is a full-stack web application that provides a universal media downloader API service. The application allows users to download media content from various social media platforms including TikTok, Instagram, Pinterest, Facebook, and Likee through a unified REST API interface. The frontend serves as both a documentation site and an interactive API testing tool, while the backend provides stateless media downloading capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives for consistent, accessible design
- **Styling**: Tailwind CSS with a dark theme configuration and custom CSS variables
- **State Management**: TanStack Query (React Query) for server state management and API caching
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod resolvers for form validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with unified endpoints for multi-platform media downloading
- **Request Validation**: Zod schemas for runtime type checking and validation
- **Error Handling**: Centralized error handling with structured error responses
- **CORS**: Enabled for cross-origin requests with credentials support

### Data Layer
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Migrations**: Drizzle Kit for database schema migrations
- **Connection**: Pooled connections using @neondatabase/serverless

### Core Services
- **MediaDownloader Service**: Platform-agnostic media downloading with automatic platform detection
- **Platform Support**: TikTok, Instagram, Pinterest, Facebook, and Likee
- **Quality Options**: HD, SD, and auto quality selection
- **Response Format**: Standardized JSON responses with success/error states

### Development Tools
- **Build System**: Vite for frontend bundling, esbuild for backend compilation
- **Type Safety**: Strict TypeScript configuration across frontend, backend, and shared modules
- **Code Quality**: ESLint and Prettier integration through Vite plugins
- **Development Server**: Hot module replacement with error overlay for development
- **Path Mapping**: Absolute imports using @ aliases for cleaner import statements

### Deployment Architecture
- **Build Process**: Vite builds frontend to dist/public, esbuild bundles backend to dist/
- **Production Mode**: Optimized builds with static asset serving
- **Environment Variables**: DATABASE_URL for database connection configuration
- **Stateless Design**: No persistent storage required for media downloading operations

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL database hosting
- **Drizzle ORM**: Type-safe database toolkit and query builder

### UI and Component Libraries
- **Radix UI**: Comprehensive set of accessible React components
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide React**: Icon library for consistent iconography
- **Shadcn/ui**: Pre-built component system based on Radix UI

### Media Processing
- **Cheerio**: Server-side HTML parsing for web scraping
- **Axios**: HTTP client for external API requests and media fetching

### Development and Build Tools
- **Vite**: Frontend build tool with HMR and plugin ecosystem
- **esbuild**: Fast JavaScript bundler for backend compilation
- **TypeScript**: Static type checking and compilation
- **Replit Plugins**: Development environment integration for error handling and debugging

### Runtime Libraries
- **Express.js**: Web application framework for Node.js
- **CORS**: Cross-origin resource sharing middleware
- **Zod**: TypeScript-first schema validation library
- **TanStack Query**: Data fetching and caching library for React
- **React Router**: Client-side routing with wouter implementation