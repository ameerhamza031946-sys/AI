/**
 * Realistic community scenario datasets for SARA platform
 * Data is inspired by real WHO, World Bank, and Pakistan Open Data formats
 */

const currentYear = new Date().getFullYear();

// ─── Air Quality Data (WHO AQI Format) ───────────────────────────────────────
const airQualityData = {
  city: 'Lahore Metropolitan Area',
  districts: [
    { name: 'Gulberg',      lat: 31.5204, lng: 74.3587, aqi: 187, pm25: 89.4,  pm10: 142, no2: 68,  co2: 412, risk: 'Critical', trend: 'rising' },
    { name: 'DHA Phase 5',  lat: 31.4697, lng: 74.4074, aqi: 134, pm25: 61.2,  pm10: 98,  no2: 44,  co2: 390, risk: 'High',     trend: 'stable' },
    { name: 'Johar Town',   lat: 31.4649, lng: 74.2691, aqi: 156, pm25: 74.8,  pm10: 118, no2: 55,  co2: 401, risk: 'High',     trend: 'rising' },
    { name: 'Allama Iqbal', lat: 31.5497, lng: 74.4063, aqi: 112, pm25: 49.6,  pm10: 78,  no2: 38,  co2: 378, risk: 'Moderate', trend: 'falling' },
    { name: 'Model Town',   lat: 31.4845, lng: 74.3131, aqi: 98,  pm25: 42.1,  pm10: 66,  no2: 31,  co2: 365, risk: 'Moderate', trend: 'stable' },
    { name: 'Shahdara',     lat: 31.6200, lng: 74.3190, aqi: 214, pm25: 102.3, pm10: 162, no2: 79,  co2: 428, risk: 'Critical', trend: 'rising' },
    { name: 'Raiwind',      lat: 31.2455, lng: 74.2720, aqi: 76,  pm25: 31.8,  pm10: 50,  no2: 24,  co2: 352, risk: 'Low',      trend: 'stable' },
    { name: 'Cantt Area',   lat: 31.5200, lng: 74.4033, aqi: 88,  pm25: 37.4,  pm10: 59,  no2: 28,  co2: 358, risk: 'Low',      trend: 'falling' },
  ],
  monthlyTrend: [
    { month: 'Jan', aqi: 198, pm25: 94.2, temp: 8 },
    { month: 'Feb', aqi: 176, pm25: 83.7, temp: 12 },
    { month: 'Mar', aqi: 152, pm25: 72.3, temp: 18 },
    { month: 'Apr', aqi: 134, pm25: 63.8, temp: 25 },
    { month: 'May', aqi: 145, pm25: 69.1, temp: 32 },
    { month: 'Jun', aqi: 167, pm25: 79.4, temp: 37 },
    { month: 'Jul', aqi: 188, pm25: 89.7, temp: 35 },
    { month: 'Aug', aqi: 172, pm25: 81.9, temp: 34 },
    { month: 'Sep', aqi: 156, pm25: 74.2, temp: 30 },
    { month: 'Oct', aqi: 178, pm25: 84.6, temp: 24 },
    { month: 'Nov', aqi: 201, pm25: 95.8, temp: 16 },
    { month: 'Dec', aqi: 209, pm25: 99.4, temp: 10 },
  ],
  forecast7Day: [
    { day: 'Today',    aqi: 187, risk: 'Critical' },
    { day: 'Tomorrow', aqi: 192, risk: 'Critical' },
    { day: 'Day 3',    aqi: 198, risk: 'Critical' },
    { day: 'Day 4',    aqi: 203, risk: 'Critical' },
    { day: 'Day 5',    aqi: 195, risk: 'Critical' },
    { day: 'Day 6',    aqi: 185, risk: 'High' },
    { day: 'Day 7',    aqi: 178, risk: 'High' },
  ],
};

// ─── Healthcare Demand Data ───────────────────────────────────────────────────
const healthcareData = {
  city: 'Karachi Metropolitan Area',
  facilities: [
    { name: 'Jinnah Hospital',     beds: 1200, occupied: 1104, occupancy: 92, waitTime: 4.2, emergency: true,  district: 'Saddar',     lat: 24.8607, lng: 67.0104 },
    { name: 'Civil Hospital',      beds: 1800, occupied: 1548, occupancy: 86, waitTime: 3.1, emergency: true,  district: 'Lyari',      lat: 24.8688, lng: 67.0091 },
    { name: 'Aga Khan Hospital',   beds: 700,  occupied: 595,  occupancy: 85, waitTime: 1.8, emergency: true,  district: 'Clifton',    lat: 24.8271, lng: 67.0633 },
    { name: 'Abbasi Shaheed',      beds: 400,  occupied: 380,  occupancy: 95, waitTime: 5.6, emergency: false, district: 'Orangi',     lat: 24.9260, lng: 67.0173 },
    { name: 'NICH Children',       beds: 300,  occupied: 282,  occupancy: 94, waitTime: 6.1, emergency: true,  district: 'PECHS',      lat: 24.8722, lng: 67.0609 },
    { name: 'Liaquat National',    beds: 600,  occupied: 468,  occupancy: 78, waitTime: 2.4, emergency: true,  district: 'Gulshan',    lat: 24.9167, lng: 67.0824 },
  ],
  diseaseTrends: [
    { month: 'Jan', respiratory: 4200, dengue: 180,  waterborne: 890,  heatStroke: 45  },
    { month: 'Feb', respiratory: 3800, dengue: 120,  waterborne: 780,  heatStroke: 38  },
    { month: 'Mar', respiratory: 3200, dengue: 95,   waterborne: 920,  heatStroke: 62  },
    { month: 'Apr', respiratory: 2900, dengue: 210,  waterborne: 1100, heatStroke: 145 },
    { month: 'May', respiratory: 2400, dengue: 580,  waterborne: 1320, heatStroke: 380 },
    { month: 'Jun', respiratory: 2800, dengue: 1240, waterborne: 1580, heatStroke: 720 },
    { month: 'Jul', respiratory: 3100, dengue: 2180, waterborne: 1890, heatStroke: 440 },
    { month: 'Aug', respiratory: 3400, dengue: 2650, waterborne: 1740, heatStroke: 280 },
    { month: 'Sep', respiratory: 3700, dengue: 1980, waterborne: 1420, heatStroke: 190 },
    { month: 'Oct', respiratory: 4100, dengue: 890,  waterborne: 1120, heatStroke: 88  },
    { month: 'Nov', respiratory: 4500, dengue: 340,  waterborne: 950,  heatStroke: 52  },
    { month: 'Dec', respiratory: 4800, dengue: 145,  waterborne: 820,  heatStroke: 41  },
  ],
  forecast7Day: [
    { day: 'Today',    demand: 8640, capacity: 9800, occupancy: 88 },
    { day: 'Tomorrow', demand: 8890, capacity: 9800, occupancy: 91 },
    { day: 'Day 3',    demand: 9180, capacity: 9800, occupancy: 94 },
    { day: 'Day 4',    demand: 9420, capacity: 9800, occupancy: 96 },
    { day: 'Day 5',    demand: 9650, capacity: 9800, occupancy: 98 },
    { day: 'Day 6',    demand: 9800, capacity: 9800, occupancy: 100 },
    { day: 'Day 7',    demand: 10100, capacity: 9800, occupancy: 103 },
  ],
};

// ─── Traffic & Infrastructure Data ───────────────────────────────────────────
const trafficData = {
  city: 'Islamabad Capital Territory',
  corridors: [
    { name: 'Kashmir Highway',      congestion: 84, avgSpeed: 18, incidents: 5, peakHour: '08:00-09:30', lat: 33.7215, lng: 73.0433 },
    { name: 'Islamabad Expressway', congestion: 71, avgSpeed: 24, incidents: 2, peakHour: '08:30-10:00', lat: 33.6844, lng: 73.0479 },
    { name: 'Murree Road',          congestion: 92, avgSpeed: 12, incidents: 8, peakHour: '07:30-09:00', lat: 33.7294, lng: 73.0931 },
    { name: 'Srinagar Highway',     congestion: 67, avgSpeed: 28, incidents: 1, peakHour: '09:00-10:30', lat: 33.6631, lng: 73.0736 },
    { name: 'PWD Road',             congestion: 55, avgSpeed: 32, incidents: 0, peakHour: '08:00-09:00', lat: 33.6757, lng: 73.0888 },
    { name: 'Margalla Road',        congestion: 38, avgSpeed: 45, incidents: 0, peakHour: 'None',        lat: 33.7417, lng: 73.0680 },
  ],
  hourlyTrend: [
    { hour: '06:00', vehicles: 1200 }, { hour: '07:00', vehicles: 3400 },
    { hour: '08:00', vehicles: 6800 }, { hour: '09:00', vehicles: 8200 },
    { hour: '10:00', vehicles: 6400 }, { hour: '11:00', vehicles: 5200 },
    { hour: '12:00', vehicles: 5800 }, { hour: '13:00', vehicles: 5600 },
    { hour: '14:00', vehicles: 5400 }, { hour: '15:00', vehicles: 5900 },
    { hour: '16:00', vehicles: 7200 }, { hour: '17:00', vehicles: 9100 },
    { hour: '18:00', vehicles: 8600 }, { hour: '19:00', vehicles: 6400 },
    { hour: '20:00', vehicles: 4200 }, { hour: '21:00', vehicles: 2800 },
  ],
};

// ─── Community Safety Data ────────────────────────────────────────────────────
const safetyData = {
  districts: [
    { name: 'Gulberg',       incidents: 42, responseTime: 8.2,  riskScore: 72, trend: 'rising'  },
    { name: 'DHA',           incidents: 18, responseTime: 5.4,  riskScore: 34, trend: 'stable'  },
    { name: 'Johar Town',    incidents: 31, responseTime: 9.1,  riskScore: 58, trend: 'falling' },
    { name: 'Shadman',       incidents: 56, responseTime: 11.3, riskScore: 84, trend: 'rising'  },
    { name: 'Samanabad',     incidents: 49, responseTime: 10.6, riskScore: 79, trend: 'rising'  },
    { name: 'Model Town',    incidents: 22, responseTime: 6.8,  riskScore: 41, trend: 'stable'  },
    { name: 'Cantt',         incidents: 12, responseTime: 4.9,  riskScore: 22, trend: 'falling' },
    { name: 'Data Gunj',     incidents: 67, responseTime: 13.2, riskScore: 91, trend: 'rising'  },
  ],
  monthlyTrend: [
    { month: 'Jan', incidents: 312, resolved: 287, avgResponse: 9.2 },
    { month: 'Feb', incidents: 298, resolved: 276, avgResponse: 8.9 },
    { month: 'Mar', incidents: 334, resolved: 301, avgResponse: 9.8 },
    { month: 'Apr', incidents: 356, resolved: 318, avgResponse: 10.1 },
    { month: 'May', incidents: 389, resolved: 342, avgResponse: 10.8 },
    { month: 'Jun', incidents: 421, resolved: 368, avgResponse: 11.4 },
  ],
};

// ─── Economic Data ────────────────────────────────────────────────────────────
const economicData = {
  unemployment: 8.4,
  povertyRate: 22.3,
  gdpGrowth: 3.1,
  sectors: [
    { name: 'Agriculture', share: 24, growth: 2.1, employed: 1420000 },
    { name: 'Industry',    share: 19, growth: 1.8, employed: 890000  },
    { name: 'Services',    share: 57, growth: 4.2, employed: 2180000 },
  ],
  monthlyTrend: [
    { month: 'Jan', unemployment: 9.1, gdp: 2.8, inflation: 28.4 },
    { month: 'Feb', unemployment: 8.9, gdp: 2.9, inflation: 27.8 },
    { month: 'Mar', unemployment: 8.7, gdp: 3.0, inflation: 26.9 },
    { month: 'Apr', unemployment: 8.5, gdp: 3.1, inflation: 26.1 },
    { month: 'May', unemployment: 8.4, gdp: 3.1, inflation: 25.4 },
    { month: 'Jun', unemployment: 8.2, gdp: 3.2, inflation: 24.8 },
  ],
};

// ─── Dashboard KPIs ───────────────────────────────────────────────────────────
const dashboardKPIs = {
  airQuality:    { label: 'Avg AQI',          current: 156,  change: +14.2, unit: '',    icon: 'wind',   status: 'critical' },
  healthcare:    { label: 'Hospital Occupancy',current: 89,   change: +6.8,  unit: '%',   icon: 'heart',  status: 'warning'  },
  traffic:       { label: 'Traffic Index',     current: 71,   change: +8.3,  unit: '%',   icon: 'car',    status: 'warning'  },
  safety:        { label: 'Incident Rate',     current: 42,   change: +11.4, unit: '/wk', icon: 'shield', status: 'critical' },
  energy:        { label: 'Energy Usage',      current: 2840, change: -3.2,  unit: 'MW',  icon: 'zap',    status: 'good'     },
  population:    { label: 'Pop. Served',       current: 4.2,  change: +2.1,  unit: 'M',   icon: 'users',  status: 'good'     },
};

// ─── Combined Trend Data (for dashboard chart) ────────────────────────────────
const combinedTrends = airQualityData.monthlyTrend.map((item, i) => ({
  month:      item.month,
  airQuality: item.aqi,
  traffic:    [68, 62, 58, 55, 61, 70, 74, 71, 65, 69, 73, 77][i],
  healthcare: [81, 79, 78, 80, 83, 87, 89, 88, 85, 86, 88, 90][i],
  safety:     [65, 62, 67, 70, 73, 78, 80, 77, 72, 74, 76, 79][i],
}));

module.exports = {
  airQualityData,
  healthcareData,
  trafficData,
  safetyData,
  economicData,
  dashboardKPIs,
  combinedTrends,
};
