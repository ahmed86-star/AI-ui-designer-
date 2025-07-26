# AI UI Designer

## Overview

This is a full-stack web application that generates HTML/CSS user interfaces from natural language descriptions using OpenAI's GPT models. Users can describe a UI in plain English, and the application generates a live, previewable webpage styled with Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **UI Library**: Radix UI components with shadcn/ui styling system
- **Styling**: Tailwind CSS with custom dark theme variables
- **State Management**: React hooks with TanStack Query for server state
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Design**: RESTful endpoints with JSON responses
- **Development**: Hot module replacement via Vite integration in development mode

### Data Storage Solutions
- **Primary Storage**: In-memory storage (MemStorage class) for development
- **Database Ready**: Drizzle ORM configured for PostgreSQL with Neon Database
- **Schema**: User management and generation history tracking
- **Migration Support**: Drizzle Kit for schema migrations

## Key Components

### Real-time Collaboration
- **WebSocket Integration**: Live real-time communication using WebSocket server on `/ws` path
- **Room Management**: Create and join collaborative rooms with unique IDs and participant tracking
- **Live Cursors**: Real-time cursor tracking with user colors and 5-second timeout for inactive cursors
- **Synchronized Prompts**: Shared prompt editing with real-time updates across all participants
- **Collaborative Generation**: Shared UI generation with live status updates and result broadcasting
- **Participant Management**: Live participant list with color-coded badges and connection status
- **Auto-reconnection**: Automatic WebSocket reconnection with exponential backoff for reliability
- **Room Sharing**: Copy room IDs and share links for easy collaboration access
- **Multi-user Support**: Handle multiple users per room with proper cleanup and connection management

### API Documentation
- **Comprehensive API Guide**: Multi-tabbed interface covering all major LLM providers
- **Provider Coverage**: OpenAI (GPT-4o, GPT-4 Turbo), Anthropic (Claude 3), Google (Gemini), Mistral, and open-source models
- **Setup Instructions**: Step-by-step guides for each provider with API key management
- **Code Examples**: Copy-paste ready curl commands and API calls for each service
- **Universal Gateways**: Coverage of OpenRouter, Fireworks.ai, Groq, Together.ai for multi-model access
- **Security Best Practices**: API key safety, environment variables, and production deployment tips
- **Interactive Features**: Code copying, external links, and organized tabbed navigation

### AI Integration
- **Multi-Provider Support**: Comprehensive AI model support across all major providers
- **OpenAI Models**: GPT-4o (default), GPT-4 Turbo, GPT-3.5-turbo
- **Anthropic Models**: Claude 4.0 Sonnet, Claude 3.5 Sonnet, Claude 3 Opus, Claude 3 Haiku
- **Google Models**: Gemini 1.5 Pro/Flash, Gemini 2.0/2.5 series (multimodal)
- **xAI Models**: Grok 2.0, Grok 2.0 Vision, Grok 1 (open weights)
- **Cohere Models**: Command-R and Command-R+
- **Open-Source Ready**: Infrastructure to support Meta LLaMA, Mistral, DeepSeek, Microsoft Phi, Alibaba Qwen, Google Gemma series
- **Prompt Engineering**: Specialized system prompts for HTML/Tailwind generation
- **Output**: Clean HTML with Tailwind CSS classes, no JavaScript

### UI Designer Interface
- **Trust Banner**: Top banner showing community metrics (30+ developers, 2.8k views, 150+ likes, 30+ projects) to build credibility
- **Navigation**: Professional navigation bar with AI UI Designer branding and route switching (Home, API Guide, Collaborate, About)
- **Input Panel**: 4-tab interface with Showcase (default), Gallery, Quick Templates, and Modern sections
- **The Showcase Tab**: Professional project showcase featuring amazing AI-built projects with:
  - **Visual UI Previews**: Real HTML/CSS mockups of dashboards, landing pages, and apps
  - **Featured Projects**: CryptoVision Dashboard, CloudFlow SaaS, NeuralAI Analytics with realistic view counts (52-203 views)
  - **Recent Projects**: Additional project examples with thumbnail previews and category badges
  - **Trust Building**: Authentic early-stage metrics (30+ developers, 2.8k views, 150+ likes, 30+ projects)
- **Professional Showcase Gallery**: Trust-building template gallery with:
  - **Categorized Templates**: Business, Finance, Creative, E-commerce, Content, Technology
  - **Professional Examples**: Modern SaaS Landing, Crypto Dashboard, Creative Portfolio, E-commerce Store, Glassmorphism Blog, AI Platform
  - **Quality Indicators**: Complexity ratings, user ratings, feature highlights
  - **Interactive Previews**: Hover effects, animated icons, gradient backgrounds
- **Modern Template Library**: 15+ animated templates with gradient designs, glassmorphism effects, and motion
  - **Modern & Animated**: Modern Landing, Neon Dashboard, Glass Blog, Motion E-commerce
  - **Business & Tech**: SaaS Landing, Dashboard, Startup, Crypto Platform, AI Service, Education
  - **Lifestyle & Creative**: Animated Portfolio, Restaurant, Fitness, Social Media, Creative Agency
- **Enhanced Animations**: Custom CSS animations including float, glow, fadeInUp, slideIn effects, gradient transitions
- **Template Showcase**: Interactive preview cards with gradient backgrounds and animated icons
- **Preview Panel**: Live HTML preview with responsive breakpoint testing (desktop/tablet/mobile)
- **Code Export**: HTML download, React component export, and copy functionality
- **API Guide**: Comprehensive LLM API documentation page with provider setup, code examples, and best practices
- **About Page**: Professional creator profile featuring Abdirahman Ahmed's background as Cloud Engineer & ML/AI Student
- **Collaborative Mode**: Real-time collaborative design with WebSocket support, room management, live cursors, and synchronized UI generation

### Component System
- **Design System**: shadcn/ui components with consistent dark theme
- **Responsive Design**: Mobile-first approach with breakpoint-specific styling
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## Data Flow

1. **User Input**: User enters UI description in input panel
2. **API Request**: Frontend sends prompt to `/api/generate` endpoint
3. **AI Processing**: Backend calls OpenAI API with specialized prompts
4. **Response Handling**: Generated HTML returned and stored in memory
5. **Live Preview**: HTML rendered in iframe with Tailwind CSS
6. **Export Options**: Users can copy code or download as HTML file

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@tanstack/react-query**: Server state management and caching
- **openai**: Official OpenAI API client
- **@anthropic-ai/sdk**: Official Anthropic Claude API client
- **xAI integration**: Grok models via OpenAI-compatible API

### UI Dependencies
- **@radix-ui/***: Headless UI primitives for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library with consistent design
- **wouter**: Minimalist routing library

### Development Dependencies
- **vite**: Fast build tool with HMR support
- **typescript**: Type checking and development experience
- **@replit/vite-plugin-***: Replit-specific development tools

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Assets**: Static files served from build output directory

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution with hot reload
- **Production**: Compiled JavaScript execution with Express static serving
- **Database**: Requires `DATABASE_URL` environment variable
- **API Keys**: Supports `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, and `XAI_API_KEY` environment variables

### Deployment Requirements
- Node.js runtime environment
- PostgreSQL database (configured but not required for basic functionality)
- OpenAI API access for AI generation features
- Environment variables for database and API credentials

### Scaling Considerations
- Stateless server design enables horizontal scaling
- In-memory storage should be replaced with persistent database for production
- Rate limiting and API key management needed for multi-user scenarios
- Consider caching generated HTML to reduce API costs