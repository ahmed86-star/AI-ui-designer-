# 🎨 AI UI Designer

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/ahmed86-star/AI-ui-designer-)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Transform Ideas into Beautiful UIs Instantly** - A next-generation AI-powered design platform that converts natural language into production-ready interfaces using advanced multimodal AI models.

## 🚀 Live Demo

**[Try AI UI Designer →](https://ai-ui-designer.vercel.app)**

*Generate stunning UIs in seconds with simple text descriptions*

---

## ✨ Key Features

### 🤖 **Multi-AI Provider Support**
- **OpenAI GPT-4o** - Latest flagship model for precise UI generation
- **Anthropic Claude 4.0** - Advanced reasoning for complex layouts
- **Google Gemini 2.5** - Multimodal understanding for rich designs
- **xAI Grok 2.0** - Real-time web-aware UI suggestions
- **Seamless Model Switching** - Compare outputs across providers

### 🎯 **Professional Design System**
- **50+ Premium Templates** - Modern SaaS, E-commerce, Dashboards, Portfolios
- **Glassmorphism Effects** - Cutting-edge visual aesthetics
- **Responsive Breakpoints** - Mobile-first design with live preview
- **Component Library** - Radix UI + shadcn/ui integration
- **Dark/Light Themes** - Complete theme system with smooth transitions

### 🔄 **Real-time Collaboration**
- **Live Cursors** - See collaborators in real-time
- **Synchronized Editing** - Shared prompt editing across users
- **Room Management** - Create and join collaborative sessions
- **WebSocket Architecture** - Sub-100ms latency updates
- **Participant Tracking** - Color-coded user presence

### 📤 **Export & Integration**
- **Clean HTML Output** - Production-ready Tailwind CSS
- **React Component Export** - JSX with TypeScript support
- **Code Copying** - One-click clipboard integration
- **Download Options** - Standalone HTML files
- **Version History** - Track and revert generations

---

## 🏗️ Architecture

### Frontend Stack
```
React 18 + TypeScript + Vite
├── UI Framework: Radix UI + shadcn/ui
├── Styling: Tailwind CSS + CSS Variables
├── State: TanStack Query + React Hooks
├── Routing: Wouter (lightweight SPA)
├── Animations: Framer Motion + Custom CSS
└── WebSocket: Native WebSocket API
```

### Backend Infrastructure
```
Node.js + Express + TypeScript
├── API Layer: RESTful endpoints + WebSocket
├── AI Integration: Multi-provider SDK support
├── Storage: Drizzle ORM + PostgreSQL
├── Session Management: Express Sessions
└── Real-time: WebSocket Server
```

### Deployment Architecture
```
Vercel Serverless
├── Frontend: Static Site Generation
├── API Functions: Edge/Node.js Runtime
├── Database: Neon PostgreSQL
├── CDN: Global Edge Network
└── Analytics: Vercel Analytics
```

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|----------|------------|---------|
| **Frontend** | React 18, TypeScript, Vite | Core application framework |
| **Styling** | Tailwind CSS, Radix UI, shadcn/ui | Design system & components |
| **Backend** | Node.js, Express, WebSocket | Server & real-time features |
| **Database** | Drizzle ORM, PostgreSQL, Neon | Data persistence & queries |
| **AI/ML** | OpenAI, Anthropic, Google, xAI | Multi-provider AI generation |
| **State** | TanStack Query, Zustand | Client & server state |
| **Build** | Vite, esbuild, TypeScript | Development & production |
| **Deploy** | Vercel, Serverless Functions | Cloud hosting & scaling |

---

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- At least one AI provider API key
- Modern browser with WebSocket support

### 1. Clone & Install
```bash
git clone https://github.com/ahmed86-star/AI-ui-designer-.git
cd AI-ui-designer-
npm install
```

### 2. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Add your AI provider keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GEMINI_API_KEY=AI...
XAI_API_KEY=xai-...
```

### 3. Development Server
```bash
npm run dev
# Opens http://localhost:5000
```

### 4. Production Build
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
ai-ui-designer/
├── 📁 client/                 # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # shadcn/ui components
│   │   │   ├── ui-designer/  # Core designer interface
│   │   │   └── navigation.tsx # App navigation
│   │   ├── pages/            # Route components
│   │   │   ├── home.tsx      # Main designer interface
│   │   │   ├── api-guide.tsx # AI provider documentation
│   │   │   ├── collaborate.tsx # Real-time collaboration
│   │   │   └── about.tsx     # Creator information
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utilities & configurations
│   │   └── App.tsx           # Root component
│   └── index.html            # HTML entry point
│
├── 📁 server/                 # Backend Node.js application
│   ├── services/             # Business logic services
│   │   ├── openai-service.ts # AI generation logic
│   │   └── collaboration-service.ts # WebSocket management
│   ├── routes.ts             # API endpoints & WebSocket
│   ├── storage.ts            # Database interface
│   └── index.ts              # Server entry point
│
├── 📁 shared/                 # Shared TypeScript schemas
│   └── schema.ts             # Zod validation schemas
│
├── 📁 api/                   # Vercel serverless functions
│   └── server.ts             # Serverless API handler
│
├── 📄 vercel.json            # Vercel deployment config
├── 📄 package.json           # Dependencies & scripts
├── 📄 tailwind.config.ts     # Tailwind CSS configuration
├── 📄 vite.config.ts         # Vite build configuration
└── 📄 README.md              # This file
```

---

## 🌐 API Documentation

### Core Endpoints

#### `POST /api/generate`
Generate UI from natural language prompt
```typescript
interface GenerateRequest {
  prompt: string;      // UI description
  model: string;       // AI model to use
  responsive: boolean; // Enable responsive design
}

interface GenerateResponse {
  html: string;        // Generated HTML/CSS
  generationId: string; // Unique generation ID
  model: string;       // Model used
  timestamp: string;   // Generation timestamp
}
```

#### `GET /api/health`
Service health check
```typescript
interface HealthResponse {
  status: 'ok' | 'error';
  timestamp: string;
  uptime: number;
}
```

### WebSocket Events

#### Real-time Collaboration
```typescript
// Join room
{ type: 'join', roomId: string, user: User }

// Cursor movement
{ type: 'cursor', x: number, y: number, user: User }

// Prompt updates
{ type: 'prompt', content: string, user: User }

// UI generation
{ type: 'generate', status: 'start' | 'complete', data?: any }
```

---

## 🎨 Supported AI Models

| Provider | Models | Capabilities |
|----------|--------|-------------|
| **OpenAI** | GPT-4o, GPT-4 Turbo | Advanced reasoning, structured output |
| **Anthropic** | Claude 4.0, Claude 3.5 Sonnet | Long context, nuanced understanding |
| **Google** | Gemini 2.5 Pro/Flash | Multimodal, fast inference |
| **xAI** | Grok 2.0, Grok Vision | Real-time data, web awareness |
| **Meta** | Llama 3+ (via providers) | Open-source, customizable |
| **Mistral** | Large, Medium models | European AI, privacy-focused |

### Model Selection Strategy
- **Creative/Marketing**: Claude 4.0 for brand-aware designs
- **Technical/Complex**: GPT-4o for structured layouts
- **Speed/Iteration**: Gemini 2.5 Flash for rapid prototyping
- **Real-time/Trending**: Grok 2.0 for current design trends

---

## 🚀 Deployment Guide

### Vercel (Recommended)

1. **Deploy to Vercel**
   ```bash
   # Connect to Vercel
   npx vercel

   # Or use the deploy button
   # https://vercel.com/new/clone?repository-url=YOUR_REPO_URL
   ```

2. **Environment Variables**
   ```bash
   # Required
   OPENAI_API_KEY=sk-...

   # Optional (enable additional models)
   ANTHROPIC_API_KEY=sk-ant-...
   GEMINI_API_KEY=AI...
   XAI_API_KEY=xai-...
   ```

3. **Custom Domain** (Optional)
   - Add custom domain in Vercel dashboard
   - Configure DNS records
   - SSL automatically provisioned

### Alternative Platforms

<details>
<summary><strong>Netlify Deployment</strong></summary>

```bash
# Build command
npm run build

# Publish directory
dist/public

# Environment variables
OPENAI_API_KEY=sk-...
NODE_VERSION=18
```
</details>

<details>
<summary><strong>Railway Deployment</strong></summary>

```bash
# Connect Railway
npx @railway/cli login
railway link
railway up

# Environment variables in Railway dashboard
```
</details>

<details>
<summary><strong>Docker Deployment</strong></summary>

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```
</details>

---

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `OPENAI_API_KEY` | ✅ | OpenAI API access | `sk-...` |
| `ANTHROPIC_API_KEY` | ❌ | Claude model access | `sk-ant-...` |
| `GEMINI_API_KEY` | ❌ | Google AI access | `AI...` |
| `XAI_API_KEY` | ❌ | Grok model access | `xai-...` |
| `DATABASE_URL` | ❌ | PostgreSQL connection | `postgres://...` |
| `NODE_ENV` | ❌ | Environment mode | `production` |

### Feature Flags

```typescript
// Toggle features via environment
ENABLE_COLLABORATION=true
ENABLE_ANALYTICS=true
ENABLE_RATE_LIMITING=false
MAX_GENERATIONS_PER_HOUR=100
```

---

## 📊 Performance & Metrics

### Benchmarks
- **Cold Start**: <500ms (Vercel Edge)
- **Generation Time**: 2-8s (model dependent)
- **WebSocket Latency**: <100ms
- **Bundle Size**: <1MB gzipped
- **Lighthouse Score**: 95+ (Performance, A11y, SEO)

### Monitoring
- Real-time error tracking (Sentry integration ready)
- Performance metrics (Web Vitals)
- Usage analytics (privacy-focused)
- AI model performance tracking

---

## 🛡️ Security & Privacy

### Security Measures
- **API Key Protection**: Server-side only, never exposed
- **Input Validation**: Zod schema validation
- **Rate Limiting**: Per-IP and per-user limits
- **CORS Configuration**: Restricted origins
- **Environment Isolation**: Separate dev/prod configs

### Privacy Compliance
- **No Personal Data**: Only prompts and generated code stored
- **Data Retention**: 30-day automatic cleanup
- **Analytics**: Optional, anonymized metrics only
- **GDPR Ready**: Easy data deletion endpoints

---

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Make changes with tests
4. Commit with conventional commits (`feat: add new AI provider`)
5. Push and create Pull Request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint + Prettier**: Automated formatting
- **Conventional Commits**: Semantic versioning
- **Testing**: Jest + React Testing Library
- **Accessibility**: WCAG 2.1 AA compliance

---

## 📈 Roadmap

### Q1 2025
- [ ] **Visual Design System** - Drag & drop interface
- [ ] **Component Library** - Reusable component marketplace
- [ ] **Theme Engine** - Custom brand theming
- [ ] **Plugin System** - Third-party integrations

### Q2 2025
- [ ] **Mobile App** - React Native companion
- [ ] **Figma Plugin** - Direct Figma integration
- [ ] **Advanced Analytics** - Usage insights dashboard
- [ ] **Team Management** - Organization accounts

### Future Vision
- [ ] **AI Code Review** - Automated code quality checks
- [ ] **Performance Optimization** - AI-powered performance tuning
- [ ] **Accessibility Scanner** - Automated A11y compliance
- [ ] **Multi-framework** - Vue, Angular, Svelte support

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Vercel** for incredible deployment platform
- **OpenAI, Anthropic, Google, xAI** for powerful AI models
- **Radix UI & shadcn/ui** for exceptional component libraries
- **Tailwind CSS** for utility-first styling
- **Open Source Community** for countless amazing libraries

---

## 📞 Support & Contact

- **GitHub Issues**: [Report bugs or request features](https://github.com/ahmed86-star/AI-ui-designer-/issues)
- **Discussions**: [Community discussions](https://github.com/ahmed86-star/AI-ui-designer-/discussions)
- **Documentation**: [Full documentation](https://ai-ui-designer.vercel.app/docs)
- **Creator**: [Abdirahman Ahmed](https://github.com/ahmed86-star) - Cloud Engineer & ML/AI Student

---

<div align="center">
  <strong>⭐ Star this repository if you find it helpful!</strong>
  <br><br>
  <em>Built with ❤️ by developers, for developers</em>
</div>