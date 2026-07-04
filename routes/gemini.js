const express = require('express');
const router = express.Router();
const geminiService = require('../services/geminiService');

/**
 * POST /api/ai/chat
 * Body: { messages: [{role, content}], message: string }
 */
router.post('/chat', async (req, res) => {
  try {
    const { messages = [], message } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    // RAG: Fetch platform data to inject as context
    const platformContext = getDashboardMetrics();

    const response = await geminiService.chat(messages, message, platformContext);
    res.json({ response, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/ai/analyze
 * Body: { data: [], filename: string }
 */
router.post('/analyze', async (req, res) => {
  try {
    const { data, filename } = req.body;
    if (!data || !Array.isArray(data)) return res.status(400).json({ error: 'Data array is required' });

    const analysis = await geminiService.analyzeData(data, filename || 'dataset.csv');
    res.json({ analysis, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/ai/report
 * Body: { reportType, dateRange: {start, end}, metrics: {} }
 */
router.post('/report', async (req, res) => {
  try {
    const { reportType = 'Community Overview', dateRange, metrics } = req.body;

    const defaultDateRange = dateRange || {
      start: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0],
    };

    const defaultMetrics = metrics || getDashboardMetrics();
    const report = await geminiService.generateReport(reportType, defaultDateRange, defaultMetrics);
    res.json({ report, reportType, dateRange: defaultDateRange, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/ai/recommendations
 */
router.get('/recommendations', async (req, res) => {
  try {
    const communityData = getDashboardMetrics();
    const recommendations = await geminiService.generateRecommendations(communityData);
    res.json({ recommendations, timestamp: new Date().toISOString() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

function getDashboardMetrics() {
  return {
    population: 847234,
    healthIndex: 72.4,
    airQualityIndex: 58,
    trafficCongestionLevel: 67,
    energyConsumption: 4521,
    crimeRate: 23.1,
    unemploymentRate: 8.7,
    literacyRate: 89.3,
    waterQuality: 81.2,
    greenSpaceCoverage: 34.5,
    hospitalBedOccupancy: 78.9,
    renewableEnergyPercent: 22.3,
  };
}

module.exports = router;
