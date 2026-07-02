# AI Decision Intelligence Platform — Backend

A Node.js/Express backend powering the AI Decision Intelligence Platform for community analytics, autonomous decision agents, and AI-driven explainability.

## 🚀 Tech Stack
- **Node.js** + **Express.js**
- **OpenRouter API** (Free AI models)
- **Morgan** (HTTP logging)
- **Helmet** (Security headers)
- **CORS** (Cross-origin support)
- **Multer** (File uploads)

## 📁 Project Structure
```
backend/
├── data/
│   └── scenarios.js        # Pre-built Lahore community datasets
├── routes/
│   ├── agent.js            # Decision Agent API routes
│   ├── analytics.js        # Dashboard analytics routes
│   ├── gemini.js           # AI chat routes
│   ├── upload.js           # File upload routes
│   └── admin.js            # Admin panel routes
├── services/
│   ├── agentService.js     # Autonomous decision agent logic
│   ├── geminiService.js    # AI/LLM service integration
│   ├── dataParser.js       # Data parsing utilities
│   └── mockAgentData.js    # Mock data for demos
├── .env.example            # Environment variable template
└── server.js               # Main Express server
```

## ⚙️ Setup & Run

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Add your OpenRouter API key to .env
   ```

3. **Start the server**
   ```bash
   npm start
   # Server runs on http://localhost:5000
   ```

## 🔑 Environment Variables
| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `OPENROUTER_API_KEY` | OpenRouter API key for AI features |
| `NODE_ENV` | Environment (development/production) |

## 📡 API Endpoints

| Method | Route | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/ai/chat` | AI chat messages |
| GET | `/api/analytics/dashboard` | Dashboard metrics |
| GET | `/api/analytics/predictions` | Predictive analytics |
| GET | `/api/agent/scenarios` | Available AI agent domains |
| POST | `/api/agent/analyze` | Run decision agent pipeline |
| POST | `/api/agent/explain` | AI metric explanation |
| POST | `/api/upload` | Upload data files |
