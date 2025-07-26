# AI UI Designer

An advanced AI-powered UI design platform that generates responsive Tailwind CSS layouts using cutting-edge multimodal AI models.

## Features

- **Multi-Provider AI Support**: OpenAI GPT-4o, Anthropic Claude, Google Gemini, xAI Grok, and more
- **Real-time Collaboration**: Live collaborative design with WebSocket support
- **Professional Templates**: 50+ pre-built templates and showcases
- **Responsive Design**: Mobile-first approach with breakpoint testing
- **Live Preview**: Instant HTML/CSS preview with Tailwind styling
- **Export Options**: Download HTML, copy code, or export as React components

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, WebSocket
- **UI Components**: Radix UI with shadcn/ui styling
- **State Management**: TanStack Query, React hooks
- **Database**: Drizzle ORM with PostgreSQL support
- **AI Integration**: OpenAI, Anthropic, Google, xAI APIs

## Environment Variables

Required for deployment:

\`\`\`
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here (optional)
GEMINI_API_KEY=your_gemini_api_key_here (optional)
XAI_API_KEY=your_xai_api_key_here (optional)
\`\`\`

## Deployment on Vercel

1. **Install Dependencies**: All necessary packages are already installed
2. **Set Environment Variables**: Add your API keys in Vercel dashboard
3. **Deploy**: Connect your repository to Vercel

### Required Environment Variables for Vercel:
- `OPENAI_API_KEY` (required)
- `ANTHROPIC_API_KEY` (optional)
- `GEMINI_API_KEY` (optional) 
- `XAI_API_KEY` (optional)

The application is configured with:
- `vercel.json` for deployment configuration
- Serverless API functions for backend
- Static build for frontend
- CORS configuration for cross-origin requests

## Local Development

\`\`\`bash
npm run dev
\`\`\`

## Build for Production

\`\`\`bash
npm run build
\`\`\`

## Project Structure

- `/client` - React frontend application
- `/server` - Express backend with API routes
- `/shared` - Shared TypeScript schemas
- `/api` - Vercel serverless functions
- `/components` - Reusable UI components

## API Endpoints

- `POST /api/generate` - Generate UI from text prompt
- `GET /api/health` - Health check endpoint

## Features

### AI-Powered Generation
Generate professional UIs from natural language descriptions using state-of-the-art AI models.

### Real-time Collaboration
Multiple users can collaborate on UI designs in real-time with live cursors and synchronized editing.

### Template Library
Choose from 50+ professional templates including:
- Modern SaaS landing pages
- Cryptocurrency dashboards
- E-commerce platforms
- Portfolio websites
- And more...

### Responsive Design
All generated UIs are mobile-first and responsive, tested across different breakpoints.

### Professional Output
Export clean HTML with Tailwind CSS classes, ready for production use.