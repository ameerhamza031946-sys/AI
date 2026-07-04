const express = require('express');
const router = express.Router();
const { dashboardKPIs, combinedTrends, airQualityData, healthcareData, trafficData, safetyData } = require('../data/scenarios');

/**
 * GET /api/analytics/dashboard
 */
router.get('/dashboard', async (req, res) => {
  let liveTemp = 34.5;
  let livePm25 = 102.3;
  
  try {
    const weatherRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=31.5497&longitude=74.3436&current=temperature_2m');
    const weatherData = await weatherRes.json();
    if (weatherData.current?.temperature_2m) liveTemp = weatherData.current.temperature_2m;

    const aqRes = await fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=31.5497&longitude=74.3436&current=pm2_5');
    const aqData = await aqRes.json();
    if (aqData.current?.pm2_5) livePm25 = aqData.current.pm2_5;
  } catch (e) {
    console.error("Live API fetch failed, using fallbacks:", e.message);
  }

  const dynamicKPIs = { ...dashboardKPIs };
  if (dynamicKPIs.airQuality) {
    dynamicKPIs.airQuality.current = livePm25;
    dynamicKPIs.airQuality.label = `Live PM2.5 (Lahore: ${liveTemp}°C)`;
  }

  res.json({
    kpis: dynamicKPIs,
    trends: combinedTrends,
    distribution: {
      health: [
        { name: 'Excellent', value: 18 },
        { name: 'Good',      value: 31 },
        { name: 'Fair',      value: 29 },
        { name: 'Poor',      value: 22 },
      ],
      riskByDomain: [
        { name: 'Air Quality', value: 34 },
        { name: 'Healthcare',  value: 26 },
        { name: 'Traffic',     value: 22 },
        { name: 'Safety',      value: 18 },
      ],
    },
    recentAlerts: [
      { id: 1, type: 'Critical', message: `Shahdara AQI Alert — PM2.5 at ${livePm25} μg/m³`, time: 'Live Update', category: 'Air Quality' },
      { id: 2, type: 'Critical', message: 'Karachi hospitals projected at 103% capacity within 48 hours', time: '1 hour ago', category: 'Healthcare' },
      { id: 3, type: 'Warning',  message: 'Murree Road 92% congested — avg speed 12 km/h', time: '2 hours ago', category: 'Traffic' },
      { id: 4, type: 'Warning',  message: 'Data Gunj district risk score 91/100 — highest in city', time: '3 hours ago', category: 'Safety' },
    ],
    aiSummary: {
      headline: 'Community at Elevated Risk — Immediate Action Required',
      insights: [
        `Live Air Quality in Lahore is showing PM2.5 levels of ${livePm25} μg/m³ at ${liveTemp}°C.`,
        'Healthcare demand forecast shows hospitals at 100% capacity within 48 hours if dengue trend continues.',
        'Traffic congestion on Murree Road has worsened 23% compared to last month — alternate routing needed.',
      ],
      overallRiskScore: 74,
      trend: 'deteriorating',
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/analytics/predictions
 */
router.get('/predictions', (req, res) => {
  const airForecast = airQualityData.forecast7Day;
  const healthForecast = healthcareData.forecast7Day;

  res.json({
    traffic: {
      historical: trafficData.hourlyTrend.slice(0, 6).map((h, i) => ({
        month: ['Jan','Feb','Mar','Apr','May','Jun'][i],
        actual: 55 + i * 2.5,
      })),
      forecast: ['Aug','Sep','Oct','Nov','Dec','Jan'].map((m, i) => ({
        month: m,
        predicted: 68 + i * 2,
        lower: 61 + i * 2,
        upper: 75 + i * 2,
      })),
    },
    pollution: {
      historical: airQualityData.monthlyTrend.slice(0, 6).map(d => ({ month: d.month, actual: d.aqi })),
      forecast: airForecast.map(d => ({
        month: d.day,
        predicted: d.aqi,
        lower: d.aqi - 12,
        upper: d.aqi + 15,
      })),
    },
    healthcare: {
      historical: healthcareData.diseaseTrends.slice(0, 6).map(d => ({
        month: d.month,
        actual: Math.round((d.respiratory + d.dengue) / 100),
      })),
      forecast: healthForecast.map(d => ({
        month: d.day,
        predicted: Math.round(d.occupancy),
        lower: Math.round(d.occupancy - 4),
        upper: Math.round(d.occupancy + 5),
      })),
    },
    energy: {
      historical: ['Jan','Feb','Mar','Apr','May','Jun'].map((m, i) => ({ month: m, actual: 2600 + i * 60 })),
      forecast: ['Aug','Sep','Oct','Nov','Dec','Jan'].map((m, i) => ({
        month: m, predicted: 2840 + i * 45, lower: 2780 + i * 40, upper: 2900 + i * 50,
      })),
    },
    modelAccuracy: { traffic: 91.3, pollution: 87.6, healthcare: 93.1, energy: 89.4 },
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/analytics/alerts
 */
router.get('/alerts', (req, res) => {
  res.json({
    alerts: [
      { id: 1, severity: 'critical', title: 'Hazardous Air Quality – Shahdara', description: 'PM2.5 at 102.3 μg/m³ — 5x above WHO safe limit of 15 μg/m³. Risk to 1.2M residents.', category: 'Environment', timestamp: new Date(Date.now() - 15*60*1000).toISOString(), status: 'active', district: 'Shahdara', affectedPopulation: 1200000 },
      { id: 2, severity: 'critical', title: 'Hospital Capacity – 2-Day Surge', description: 'Karachi hospitals projected at 103% occupancy within 48 hours. Overflow protocol needed.', category: 'Health', timestamp: new Date(Date.now() - 60*60*1000).toISOString(), status: 'active', district: 'Karachi', affectedPopulation: 850000 },
      { id: 3, severity: 'high',     title: 'Traffic Gridlock – Murree Road', description: '92% congestion, avg speed 12 km/h, 8 incidents reported. Alternate routing advised.', category: 'Traffic', timestamp: new Date(Date.now() - 2*60*60*1000).toISOString(), status: 'monitoring', district: 'Rawalpindi', affectedPopulation: 320000 },
      { id: 4, severity: 'critical', title: 'Community Safety – Data Gunj', description: 'Risk score 91/100, 67 incidents this month, 13.2 min avg response time.', category: 'Safety', timestamp: new Date(Date.now() - 3*60*60*1000).toISOString(), status: 'active', district: 'Data Gunj', affectedPopulation: 95000 },
      { id: 5, severity: 'high',     title: 'Dengue Surge – Karachi', description: '2,650 dengue cases reported in August — highest in 5 years. Fogging urgent.', category: 'Health', timestamp: new Date(Date.now() - 5*60*60*1000).toISOString(), status: 'monitoring', district: 'Karachi Metro', affectedPopulation: 2100000 },
      { id: 6, severity: 'medium',   title: 'Gulberg AQI Crossing 190', description: 'Industrial emissions + traffic causing rising PM2.5. Forecast shows further increase.', category: 'Environment', timestamp: new Date(Date.now() - 8*60*60*1000).toISOString(), status: 'monitoring', district: 'Gulberg', affectedPopulation: 680000 },
      { id: 7, severity: 'medium',   title: 'Hospital Wait Time – Abbasi Shaheed', description: 'Emergency wait time 5.6 hours at 95% occupancy. Patient diversion required.', category: 'Health', timestamp: new Date(Date.now() - 12*60*60*1000).toISOString(), status: 'active', district: 'Orangi', affectedPopulation: 450000 },
      { id: 8, severity: 'low',      title: 'Kashmir Highway Congestion Easing', description: 'Congestion dropped from 91% to 84% after signal optimization. Continuing improvement.', category: 'Traffic', timestamp: new Date(Date.now() - 24*60*60*1000).toISOString(), status: 'resolved', district: 'Islamabad', affectedPopulation: 210000 },
    ],
    summary: { critical: 3, high: 2, medium: 2, low: 1, total: 8, active: 5 },
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/analytics/map-data
 */
router.get('/map-data', (req, res) => {
  res.json({
    districts: airQualityData.districts.map((d, i) => ({
      id: i + 1,
      name: d.name,
      lat: d.lat,
      lng: d.lng,
      aqi: d.aqi,
      pm25: d.pm25,
      riskLevel: d.risk,
      trend: d.trend,
      population: [890000, 680000, 740000, 560000, 620000, 1200000, 410000, 520000][i] || 500000,
      hospitalOccupancy: [91, 85, 88, 79, 82, 94, 72, 76][i] || 80,
      incidentRate: [42, 18, 31, 22, 56, 67, 15, 12][i] || 30,
    })),
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/analytics/recommendations
 */
router.get('/recommendations', (req, res) => {
  res.json({
    recommendations: [
      {
        id: 1, title: 'Emergency AQI Response – Shahdara & Gulberg',
        category: 'Environment', priority: 'Critical',
        description: 'AQI in Shahdara (214) and Gulberg (187) has crossed hazardous thresholds. Industrial emission checks and vehicle restriction zones must be enforced immediately.',
        impact: 'Protect 1.88M residents from respiratory risk; reduce PM2.5 by 30% within 72 hours',
        timeframe: '24-48 hours', resources: 'Environment Protection Agency, Traffic Police',
        explanation: {
          causes: ['3 industrial zones operating above emission limits', 'Traffic congestion adding 34% to ground-level NO2', 'Wind direction trapping pollutants in low-lying areas'],
          confidence: 91, dataSource: 'WHO AQI data, EPA sensors, satellite imagery',
        },
      },
      {
        id: 2, title: 'Activate Hospital Overflow Protocol – Karachi',
        category: 'Health', priority: 'Critical',
        description: 'AI forecasts show hospital occupancy hitting 103% in 48 hours. Field hospitals at EXPO Center should be activated now, and patient transfers organized.',
        impact: 'Ensure continuity of care for 850,000 residents; prevent treatment delays',
        timeframe: 'Within 24 hours', resources: 'Health Department, NDMA, Armed Forces Medical Corps',
        explanation: {
          causes: ['Dengue surge adding 2,650+ weekly cases', 'Pre-existing occupancy at 92% baseline', 'Temperature increase driving heat-related illness'],
          confidence: 88, dataSource: 'PIMS hospital data, WHO dengue tracker, temperature sensors',
        },
      },
      {
        id: 3, title: 'Murree Road Smart Signal Optimization',
        category: 'Infrastructure', priority: 'High',
        description: 'Murree Road at 92% congestion with 8 active incidents. Deploy adaptive signal control and redirect heavy vehicles to GT Road during peak hours.',
        impact: 'Reduce congestion to 60% within 5 days; save 45+ minutes for 320,000 daily commuters',
        timeframe: '2-5 days', resources: 'Traffic Police, Smart City Authority, ITMS',
        explanation: {
          causes: ['Heavy vehicle mixing with passenger traffic during peak hours', 'Outdated fixed signal timings', '3 road construction sites reducing capacity by 20%'],
          confidence: 85, dataSource: 'ITMS sensors, Traffic API, incident reports',
        },
      },
      {
        id: 4, title: 'Data Gunj District Safety Operation',
        category: 'Safety', priority: 'High',
        description: 'Data Gunj has the highest risk score (91/100) with 67 monthly incidents and 13.2-minute average response time. Targeted police deployment and CCTV expansion is urgent.',
        impact: 'Reduce incidents by 35%; bring response time below 8 minutes',
        timeframe: '7 days', resources: 'Police Department, Punjab Safe Cities Authority',
        explanation: {
          causes: ['1 officer per 4,750 residents — under-resourced', 'CCTV dead zones in 60% of commercial areas', 'High economic vulnerability correlating with crime index'],
          confidence: 79, dataSource: 'Police incident database, PSCA monitoring data',
        },
      },
      {
        id: 5, title: 'Dengue Vector Control – Karachi Metro',
        category: 'Health', priority: 'High',
        description: 'Karachi 2,650 dengue cases in August — highest in 5 years. City-wide fogging, drainage clearing, and public awareness needed simultaneously.',
        impact: 'Reduce new weekly dengue cases by 50% within 3 weeks; protect 2.1M people',
        timeframe: '3-21 days', resources: 'Health Department, KWSB, City District Government',
        explanation: {
          causes: ['August rainfall creating breeding grounds in 1,200+ identified sites', 'Temperature at 34°C — optimal for Aedes aegypti lifecycle', 'Urban flooding mixing with stagnant water near low-income areas'],
          confidence: 92, dataSource: 'WHO dengue data, KWSB flood maps, temperature records',
        },
      },
      {
        id: 6, title: 'Green Zone Buffer – Lahore Industrial Districts',
        category: 'Environment', priority: 'Medium',
        description: 'Establish 5 urban tree plantation zones in highest-AQI districts. Partner with Punjab Forest Department to plant 50,000 trees in 90 days.',
        impact: 'Reduce ambient PM2.5 by 8-12% over 12 months in targeted areas',
        timeframe: '90 days', resources: 'Punjab Forest Dept, WASA, Private sector CSR funds',
        explanation: {
          causes: ['Green cover only 2.3% vs WHO recommended 12%', 'Industrial zone expansion without corresponding greening', 'Rising urban heat island amplifying pollution concentration'],
          confidence: 72, dataSource: 'Satellite green cover index, EPA environmental data',
        },
      },
    ],
  });
});

module.exports = router;
