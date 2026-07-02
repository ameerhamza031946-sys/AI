const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const geminiRoutes = require('./routes/gemini');
const uploadRoutes = require('./routes/upload');
const analyticsRoutes = require('./routes/analytics');
const adminRoutes = require('./routes/admin');
const agentRoutes = require('./routes/agent');


const app = express();
const PORT = process.env.PORT || 5000;

// Security & logging
app.use(helmet({ 
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: false,
}));
app.use(morgan('dev'));

// CORS — explicit config to allow all localhost origins
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g. server-to-server, curl)
    // or any localhost origin
    if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all for demo/hackathon
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));


// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Static uploads folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🚀 AI Decision Intelligence Platform API is running successfully!',
    frontendUrl: 'http://localhost:5173',
    healthCheck: '/api/health'
  });
});

// API Routes
app.use('/api/ai', geminiRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/agent', agentRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    service: 'AI Decision Intelligence Platform API',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

app.listen(PORT, () => {
  console.log(`\n🚀 AI Decision Intelligence Platform API`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
