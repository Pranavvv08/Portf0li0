const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

const portfolioRoutes = require('./routes/portfolio');

const app = express();
const PORT = process.env.PORT || 5000;

// --------------- Middleware ---------------
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// --------------- Routes ---------------
app.use('/api', portfolioRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// --------------- Error Handling ---------------
// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, _next) => {
  console.error('❌ Error:', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'Internal server error'
      : err.message,
  });
});

// --------------- Start Server ---------------
app.listen(PORT, () => {
  console.log(`🚀 Portfolio API running on http://localhost:${PORT}`);
  console.log(`📡 Accepting requests from ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
});

module.exports = app;
