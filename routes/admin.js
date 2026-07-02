const express = require('express');
const router = express.Router();

// Mock user database for demo
const MOCK_USERS = [
  { id: '1', name: 'Admin User', email: 'admin@smartcity.gov', role: 'admin', status: 'active', lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString(), uploads: 45, queries: 312 },
  { id: '2', name: 'Sarah Chen', email: 'sarah.chen@gov.city', role: 'government', status: 'active', lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), uploads: 28, queries: 187 },
  { id: '3', name: 'Marcus Johnson', email: 'm.johnson@greenearth.ngo', role: 'ngo', status: 'active', lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), uploads: 16, queries: 94 },
  { id: '4', name: 'Aisha Patel', email: 'aisha.patel@community.org', role: 'citizen', status: 'active', lastLogin: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), uploads: 5, queries: 42 },
  { id: '5', name: 'James Rodriguez', email: 'j.rodriguez@cityplanning.gov', role: 'government', status: 'active', lastLogin: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), uploads: 33, queries: 221 },
  { id: '6', name: 'Fatima Al-Hassan', email: 'fatima@healthwatch.ngo', role: 'ngo', status: 'inactive', lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), uploads: 9, queries: 55 },
  { id: '7', name: 'David Kim', email: 'david.kim@resident.com', role: 'citizen', status: 'active', lastLogin: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), uploads: 3, queries: 28 },
  { id: '8', name: 'Priya Sharma', email: 'priya.sharma@envirowatch.org', role: 'ngo', status: 'active', lastLogin: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), uploads: 21, queries: 143 },
];

const ACTIVITY_LOG = [
  { id: 1, user: 'Sarah Chen', action: 'Uploaded air quality dataset (Q2 2026)', type: 'upload', timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString() },
  { id: 2, user: 'Marcus Johnson', action: 'Generated Environment Report for June 2026', type: 'report', timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString() },
  { id: 3, user: 'Admin User', action: 'Updated system alert thresholds', type: 'config', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: 4, user: 'James Rodriguez', action: 'Analyzed traffic density CSV (District 4)', type: 'analysis', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
  { id: 5, user: 'Aisha Patel', action: 'Queried AI assistant about health services', type: 'ai_query', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
  { id: 6, user: 'Priya Sharma', action: 'Uploaded pollution sensors JSON dataset', type: 'upload', timestamp: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString() },
  { id: 7, user: 'David Kim', action: 'Viewed predictions dashboard', type: 'view', timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString() },
  { id: 8, user: 'Sarah Chen', action: 'Downloaded Health Index Report PDF', type: 'download', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() },
];

/**
 * GET /api/admin/users
 */
router.get('/users', (req, res) => {
  const { role, status, search } = req.query;
  let users = [...MOCK_USERS];
  if (role) users = users.filter((u) => u.role === role);
  if (status) users = users.filter((u) => u.status === status);
  if (search) {
    const q = search.toLowerCase();
    users = users.filter((u) => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q));
  }
  res.json({ users, total: users.length, timestamp: new Date().toISOString() });
});

/**
 * GET /api/admin/activity
 */
router.get('/activity', (req, res) => {
  res.json({ activity: ACTIVITY_LOG, timestamp: new Date().toISOString() });
});

/**
 * GET /api/admin/system-health
 */
router.get('/system-health', (req, res) => {
  res.json({
    uptime: '99.97%',
    responseTime: `${Math.round(120 + Math.random() * 80)}ms`,
    activeUsers: Math.round(247 + Math.random() * 50),
    apiCallsToday: Math.round(14500 + Math.random() * 2000),
    storageUsed: '2.4 GB',
    storageTotal: '50 GB',
    geminiApiUsage: Math.round(1240 + Math.random() * 200),
    geminiApiLimit: 10000,
    errorRate: `${(Math.random() * 0.5).toFixed(2)}%`,
    services: {
      api: 'operational',
      database: 'operational',
      gemini: 'operational',
      storage: 'operational',
      auth: 'operational',
    },
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/admin/stats
 */
router.get('/stats', (req, res) => {
  res.json({
    totalUsers: MOCK_USERS.length,
    activeUsers: MOCK_USERS.filter((u) => u.status === 'active').length,
    byRole: {
      admin: MOCK_USERS.filter((u) => u.role === 'admin').length,
      government: MOCK_USERS.filter((u) => u.role === 'government').length,
      ngo: MOCK_USERS.filter((u) => u.role === 'ngo').length,
      citizen: MOCK_USERS.filter((u) => u.role === 'citizen').length,
    },
    totalUploads: MOCK_USERS.reduce((sum, u) => sum + u.uploads, 0),
    totalQueries: MOCK_USERS.reduce((sum, u) => sum + u.queries, 0),
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
