const express = require('express');
const router = express.Router();
const { runDecisionAgent, explainDecision } = require('../services/agentService');
const { airQualityData, healthcareData, trafficData, safetyData } = require('../data/scenarios');

/**
 * POST /api/agent/analyze
 * Run the full 4-step autonomous decision agent pipeline
 */
router.post('/analyze', async (req, res) => {
  try {
    const { domain = 'Community Overview', data: uploadedData, context = '' } = req.body;

    // Select scenario data based on domain if no uploaded data provided
    let analysisData = uploadedData;
    if (!analysisData) {
      const domainMap = {
        'Air Quality':    airQualityData,
        'Healthcare':     healthcareData,
        'Traffic':        trafficData,
        'Safety':         safetyData,
        'Community Overview': { airQuality: airQualityData.districts.slice(0,3), healthcare: healthcareData.facilities.slice(0,3), traffic: trafficData.corridors.slice(0,3) },
      };
      analysisData = domainMap[domain] || domainMap['Community Overview'];
    }

    console.log(`🤖 Starting Decision Agent for domain: ${domain}`);
    const result = await runDecisionAgent(domain, analysisData, context);
    console.log(`✅ Decision Agent completed in ${result.processingTime}`);

    res.json(result);
  } catch (error) {
    console.error('Agent analyze error:', error);
    res.status(500).json({ error: error.message || 'Agent pipeline failed' });
  }
});

/**
 * POST /api/agent/explain
 * Explain a specific community metric with full AI reasoning
 */
router.post('/explain', async (req, res) => {
  try {
    const { metric, value, context = '', domain = 'Community' } = req.body;
    if (!metric || value === undefined) {
      return res.status(400).json({ error: 'metric and value are required' });
    }

    const explanation = await explainDecision(metric, value, context, domain);
    res.json({ explanation, metric, value, domain });
  } catch (error) {
    console.error('Agent explain error:', error);
    res.status(500).json({ error: error.message || 'Explanation failed' });
  }
});

/**
 * GET /api/agent/scenarios
 * Return list of available pre-built scenario domains
 */
router.get('/scenarios', (req, res) => {
  res.json({
    scenarios: [
      { id: 'Air Quality',    label: '🌫️ Air Quality & Pollution',       description: 'AQI, PM2.5, industrial emissions analysis' },
      { id: 'Healthcare',     label: '🏥 Healthcare Demand',              description: 'Hospital capacity, disease trends, demand forecast' },
      { id: 'Traffic',        label: '🚗 Traffic & Infrastructure',       description: 'Congestion index, corridor analysis, peak hours' },
      { id: 'Safety',         label: '🚨 Community Safety',               description: 'Incident rates, response times, district risk scores' },
      { id: 'Community Overview', label: '🏘️ Community Overview',         description: 'Holistic multi-domain community health summary' },
    ],
  });
});

/**
 * GET /api/agent/scenarios/:domain/data
 * Return raw scenario data for a given domain
 */
router.get('/scenarios/:domain/data', (req, res) => {
  const { domain } = req.params;
  const domainMap = {
    'Air Quality':    airQualityData,
    'Healthcare':     healthcareData,
    'Traffic':        trafficData,
    'Safety':         safetyData,
  };
  const data = domainMap[domain];
  if (!data) return res.status(404).json({ error: 'Domain not found' });
  res.json({ domain, data });
});

module.exports = router;
