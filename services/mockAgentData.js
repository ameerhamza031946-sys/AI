/**
 * Pre-packaged Autonomous Decision Agent runs for zero-latency demo responses.
 */

const MOCK_AGENT_RUNS = {
  'Air Quality': {
    summary: {
      overview: "Ingested Lahore Air Quality Index dataset representing Gulberg, DHA, Johar Town, Model Town, and Shahdara districts. Analysis shows widespread elevated PM2.5 levels with acute spikes in northern transit corridors.",
      dataQuality: "High",
      recordCount: 240,
      timespan: "Past 30 Days",
      keyMetrics: [
        { name: "Max AQI", value: "214", unit: "Index" },
        { name: "Shahdara PM2.5", value: "102.3", unit: "μg/m³" },
        { name: "Average NO2", value: "48.2", unit: "ppb" }
      ],
      dataSources: ["EPA Punjab", "Punjab Safe Cities Cameras", "Local IoT Sensors"]
    },
    patterns: {
      patterns: [
        { pattern: "Diurnal PM2.5 spike between 8:00 PM and 2:00 AM", significance: "Critical", affectedArea: "Shahdara & Gulberg", percentage: 45 },
        { pattern: "Correlation between heavy transport transit and roadside NO2 concentration", significance: "High", affectedArea: "Ravi Bridge Corridor", percentage: 78 }
      ],
      anomalies: [
        { anomaly: "Sudden 85% AQI jump during winter temperature inversion", severity: "Critical", location: "Johar Town & Gulberg", deviation: "+95 AQI points" }
      ],
      trends: {
        shortTerm: "7-day outlook projects rising AQI levels as temperature inversion intensifies.",
        longTerm: "30-day projection indicates severe smog conditions requiring policy actions."
      },
      correlations: [
        "PM2.5 to pediatric asthma admissions: r = 0.84",
        "Transit delays to local carbon monoxide: r = 0.72"
      ]
    },
    forecast: {
      overallRisk: "Critical",
      riskScore: 87,
      confidence: 94,
      forecast: [
        { day: "Day 1", riskLevel: "Critical", probability: 92, primaryThreat: "Smog trapping" },
        { day: "Day 2", riskLevel: "Critical", probability: 94, primaryThreat: "Smog trapping" },
        { day: "Day 3", riskLevel: "Critical", probability: 95, primaryThreat: "Smog trapping" },
        { day: "Day 4", riskLevel: "Critical", probability: 90, primaryThreat: "Smog trapping" },
        { day: "Day 5", riskLevel: "High", probability: 85, primaryThreat: "Heavy traffic concentration" },
        { day: "Day 6", riskLevel: "High", probability: 80, primaryThreat: "Industrial emission overlap" },
        { day: "Day 7", riskLevel: "High", probability: 78, primaryThreat: "Industrial emission overlap" }
      ],
      topRisks: [
        { risk: "Acute respiratory emergency surge in schools", probability: 88, impact: "High", timeframe: "48 hours", affectedPopulation: "180,000 children" },
        { risk: "Zero-visibility traffic pileups on Ravi transit bridge", probability: 72, impact: "High", timeframe: "72 hours", affectedPopulation: "35,000 commuters" }
      ],
      reasoning: ["Persistent temperature inversion", "Active coal/wood burning in brick kilns", "Heavy diesel transport emissions during night transit window"]
    },
    actions: {
      immediateActions: [
        { action: "Enforce heavy diesel truck transit restrictions during peak inversion hours (8PM-12AM)", owner: "Traffic Police & City Administration", timeline: "Within 12 hours", resources: "20 barricades, police deployment", expectedImpact: "25% drop in night-time PM2.5 spikes", priority: "P1" },
        { action: "Temporarily shut down 12 non-compliant brick kilns in northern clusters", owner: "EPA Punjab", timeline: "Within 24 hours", resources: "Inspector squads", expectedImpact: "15% reduction in particulate background load", priority: "P2" }
      ],
      shortTermActions: [
        { action: "Issue public safety advisory and distribute masks in high-risk schools", timeline: "Within 2 days", expectedImpact: "40% lower pediatric asthma emergency admissions", priority: "P2" },
        { action: "Deploy mobile water mist sprinklers along Shahdara road corridors", timeline: "Within 3 days", expectedImpact: "Temporary suppression of road dust re-entrainment", priority: "P3" }
      ],
      longTermActions: [
        { action: "Subsidize zig-zag technology conversion for brick kilns", timeline: "Within 6 months", expectedImpact: "Permanent 70% emission cut from kiln sector" }
      ],
      kpis: [
        { metric: "Shahdara PM2.5", currentValue: "102.3", targetValue: "55.0", targetDate: "15 Days" }
      ],
      estimatedImpact: {
        populationBenefited: "1,200,000 residents",
        costSaving: "8.5M PKR/week in respiratory care expenses",
        riskReduction: "45%"
      }
    }
  },
  'Healthcare': {
    summary: {
      overview: "Ingested Karachi Healthcare utilization data (Jinnah, Civil, Aga Khan, Abbasi Shaheed, and NICH). Results highlight acute bed occupancy shortages fueled by a vector-borne outbreak.",
      dataQuality: "High",
      recordCount: 180,
      timespan: "Past 45 Days",
      keyMetrics: [
        { name: "Peak Bed Occupancy", value: "95", unit: "%" },
        { name: "Average Emergency Wait Time", value: "3.9", unit: "Hours" },
        { name: "Active Dengue Inpatients", value: "680", unit: "Cases" }
      ],
      dataSources: ["Sindh Health Department", "Municipal Hospital Registries", "Outpatient Clinics"]
    },
    patterns: {
      patterns: [
        { pattern: "Weekly dengue caseload doubling in Orangi and Lyari catchment areas", significance: "Critical", affectedArea: "Lyari & Orangi", percentage: 104 },
        { pattern: "Prolonged discharge delay in pediatric wards during morning shifts", significance: "Medium", affectedArea: "NICH Children Hospital", percentage: 32 }
      ],
      anomalies: [
        { anomaly: "95% capacity overload at Abbasi Shaheed emergency ward", severity: "Critical", location: "Orangi Town", deviation: "+22% above baseline" }
      ],
      trends: {
        shortTerm: "7-day outlook forecasts hospital inpatient occupancy crossing 100% capacity.",
        longTerm: "30-day outlook shows need for emergency overflow wards and public health measures."
      },
      correlations: [
        "Monsoon standing water index to Dengue caseload: r = 0.89",
        "Emergency wait time to nurse shift shortages: r = 0.65"
      ]
    },
    forecast: {
      overallRisk: "Critical",
      riskScore: 84,
      confidence: 92,
      forecast: [
        { day: "Day 1", riskLevel: "High", probability: 88, primaryThreat: "Emergency Overflow" },
        { day: "Day 2", riskLevel: "High", probability: 90, primaryThreat: "Emergency Overflow" },
        { day: "Day 3", riskLevel: "Critical", probability: 93, primaryThreat: "Staff Burnout" },
        { day: "Day 4", riskLevel: "Critical", probability: 95, primaryThreat: "Medicine Shortages" },
        { day: "Day 5", riskLevel: "Critical", probability: 97, primaryThreat: "Bed Exhaustion" },
        { day: "Day 6", riskLevel: "Critical", probability: 98, primaryThreat: "Bed Exhaustion" },
        { day: "Day 7", riskLevel: "Critical", probability: 103, primaryThreat: "Clinical Overwhelm" }
      ],
      topRisks: [
        { risk: "Critical ICU ventilator shortage for pediatric dengue patients", probability: 90, impact: "Critical", timeframe: "48 hours", affectedPopulation: "12,000 children" },
        { risk: "Secondary hospital referral delays leading to severe patient complications", probability: 78, impact: "High", timeframe: "7 days", affectedPopulation: "450,000 residents" }
      ],
      reasoning: ["Accelerated mosquito breeding cycle post-monsoon rain", "Delayed municipal spraying operations", "Insufficient primary health referral clinics in Orangi Town"]
    },
    actions: {
      immediateActions: [
        { action: "Reallocate 45 backup ventilators and ICU equipment to Abbasi Shaheed and NICH", owner: "Sindh Health Department", timeline: "Within 24 hours", resources: "Emergency transport, technical staff", expectedImpact: "Ensures backup ventilator safety net", priority: "P1" },
        { action: "Mobilize joint municipal teams for targeted vector spraying and larvicide in Orangi", owner: "Karachi Municipal Corporation", timeline: "Within 36 hours", resources: "20 spraying trucks, chemicals", expectedImpact: "50% drop in mosquito vector density in 5 days", priority: "P1" }
      ],
      shortTermActions: [
        { action: "Establish 3 temporary triage and dehydration camps in Orangi Town commercial zones", timeline: "Within 3 days", expectedImpact: "Diverts 35% of stable patients from emergency rooms", priority: "P2" },
        { action: "Enable emergency overtime shifts and call back retired nursing volunteers", timeline: "Within 4 days", expectedImpact: "Restores nurse-to-patient ratio to safe levels", priority: "P2" }
      ],
      longTermActions: [
        { action: "Construct 5 new primary healthcare units in outer metropolitan sub-districts", timeline: "Within 9 months", expectedImpact: "Permanent decentralization of emergency healthcare load" }
      ],
      kpis: [
        { metric: "Abbasi Shaheed Bed Occupancy", currentValue: "95%", targetValue: "80%", targetDate: "10 Days" }
      ],
      estimatedImpact: {
        populationBenefited: "450,000 residents",
        costSaving: "12M PKR/month in intensive care optimization",
        riskReduction: "50%"
      }
    }
  },
  'Traffic': {
    summary: {
      overview: "Ingested traffic volume and incident data for primary corridors in Islamabad (Kashmir Highway, Expressway, Murree Road, Srinagar Highway). Data shows severe arterial gridlock during peak commute shifts.",
      dataQuality: "High",
      recordCount: 150,
      timespan: "Past 15 Days",
      keyMetrics: [
        { name: "Max Congestion Rate", value: "92", unit: "%" },
        { name: "Average corridor speed", value: "27.5", unit: "km/h" },
        { name: "Daily Transit Delay", value: "42", unit: "Minutes" }
      ],
      dataSources: ["Punjab Safe Cities CCTV Cameras", "Inductive Loop Sensors", "Ride-sharing Telemetry"]
    },
    patterns: {
      patterns: [
        { pattern: "Severe bottleneck at Faizabad interchange from Rawalpindi transit overlap", significance: "Critical", affectedArea: "Faizabad & Murree Road", percentage: 92 },
        { pattern: "Expressway congestion correlation to commercial truck lane violations", significance: "High", affectedArea: "Islamabad Expressway", percentage: 65 }
      ],
      anomalies: [
        { anomaly: "92% gridlock on Murree Road with average speed dropping to 12 km/h", severity: "Critical", location: "Murree Road Corridor", deviation: "3.2x normal delay" }
      ],
      trends: {
        shortTerm: "7-day outlook indicates rising gridlock times unless active signaling is modified.",
        longTerm: "30-day outlook projects commuter time waste increasing by 18 hours/commuter/month."
      },
      correlations: [
        "Lane violations to minor accidents: r = 0.74",
        "Static signal duration to vehicle queue length: r = 0.81"
      ]
    },
    forecast: {
      overallRisk: "High",
      riskScore: 78,
      confidence: 90,
      forecast: [
        { day: "Day 1", riskLevel: "High", probability: 85, primaryThreat: "Peak Overlap" },
        { day: "Day 2", riskLevel: "High", probability: 86, primaryThreat: "Peak Overlap" },
        { day: "Day 3", riskLevel: "High", probability: 88, primaryThreat: "Minor Collisions" },
        { day: "Day 4", riskLevel: "High", probability: 87, primaryThreat: "Minor Collisions" },
        { day: "Day 5", riskLevel: "Medium", probability: 74, primaryThreat: "Commute delays" },
        { day: "Day 6", riskLevel: "Medium", probability: 70, primaryThreat: "Commute delays" },
        { day: "Day 7", riskLevel: "High", probability: 82, primaryThreat: "Peak Overlap" }
      ],
      topRisks: [
        { risk: "Emergency ambulance blocks at critical Faizabad medical route transit", probability: 85, impact: "High", timeframe: "Daily", affectedPopulation: "15,000 commuters" },
        { risk: "Localized smog increase due to idling fuel exhaust emissions in traffic queues", probability: 70, impact: "Medium", timeframe: "3 Days", affectedPopulation: "90,000 residents" }
      ],
      reasoning: ["Static legacy signal timer durations", "Inadequate lane physical enforcement during commercial hours", "Heavy mixing of freight transit and private vehicles"]
    },
    actions: {
      immediateActions: [
        { action: "Deploy 15 extra traffic marshals to enforce lane discipline and clear encroachments", owner: "Islamabad Traffic Police", timeline: "Within 12 hours", resources: "15 marshals, motorbikes", expectedImpact: "15% improvement in vehicle flow rate", priority: "P1" },
        { action: "Manually adjust static traffic signals at 4 key intersections to favor peak direction", owner: "Capital Development Authority", timeline: "Within 24 hours", resources: "Signal engineers", expectedImpact: "20% reduction in queue length at junctions", priority: "P2" }
      ],
      shortTermActions: [
        { action: "Implement a digital truck ban zone on Expressway during morning/evening commute windows", timeline: "Within 3 days", expectedImpact: "Cuts Expressway congestion by 30% instantly", priority: "P2" },
        { action: "Configure emergency green-wave override sequences for public ambulances", timeline: "Within 5 days", expectedImpact: "Halves emergency ambulance response times", priority: "P3" }
      ],
      longTermActions: [
        { action: "Deploy AI camera-enabled smart adaptive traffic signaling system at 50 intersections", timeline: "Within 6 months", expectedImpact: "Permanent 30% reduction in peak-hour commute times" }
      ],
      kpis: [
        { metric: "Murree Road Congestion", currentValue: "92%", targetValue: "70%", targetDate: "7 Days" }
      ],
      estimatedImpact: {
        populationBenefited: "320,000 commuters",
        costSaving: "15.4M PKR/week in saved fuel and transit hours",
        riskReduction: "35%"
      }
    }
  },
  'Safety': {
    summary: {
      overview: "Ingested Punjab Safe Cities safety logs, response telemetry, and district incident reports. Identified localized risk concentration in older commercial zones.",
      dataQuality: "High",
      recordCount: 320,
      timespan: "Past 30 Days",
      keyMetrics: [
        { name: "Max District Risk Score", value: "91", unit: "/100" },
        { name: "Average Response Time", value: "13.2", unit: "Minutes" },
        { name: "CCTV Blindspot Coverage", value: "62", unit: "%" }
      ],
      dataSources: ["Punjab Safe Cities Command", "Local Police Dispatch Logs", "Emergency Helpline 15"]
    },
    patterns: {
      patterns: [
        { pattern: "Increase in street larceny reports during power loadshedding hours", significance: "High", affectedArea: "Data Gunj Bakhsh district", percentage: 58 },
        { pattern: "Police response latency correlation with narrow street density in historical quarters", significance: "High", affectedArea: "Walled City blocks", percentage: 84 }
      ],
      anomalies: [
        { anomaly: "District risk score spikes to 91/100 in Data Gunj commercial streets", severity: "Critical", location: "Data Gunj Sector", deviation: "+34% above safety baseline" }
      ],
      trends: {
        shortTerm: "7-day outlook projects stable but high risk scores unless policing patterns change.",
        longTerm: "30-day projections indicate potential decrease in commercial footfall due to safety concerns."
      },
      correlations: [
        "Inadequate street lighting to property crimes: r = 0.78",
        "Police response latency to incident severity: r = 0.62"
      ]
    },
    forecast: {
      overallRisk: "High",
      riskScore: 81,
      confidence: 91,
      forecast: [
        { day: "Day 1", riskLevel: "High", probability: 82, primaryThreat: "Opportunistic Theft" },
        { day: "Day 2", riskLevel: "High", probability: 84, primaryThreat: "Opportunistic Theft" },
        { day: "Day 3", riskLevel: "High", probability: 85, primaryThreat: "Street Crime" },
        { day: "Day 4", riskLevel: "High", probability: 83, primaryThreat: "Street Crime" },
        { day: "Day 5", riskLevel: "Medium", probability: 72, primaryThreat: "Response delay" },
        { day: "Day 6", riskLevel: "Medium", probability: 68, primaryThreat: "Response delay" },
        { day: "Day 7", riskLevel: "High", probability: 78, primaryThreat: "Opportunistic Theft" }
      ],
      topRisks: [
        { risk: "Larceny spikes in dark unlit alleys during schedule loadshedding", probability: 89, impact: "Medium", timeframe: "Next 48 hours", affectedPopulation: "95,000 residents" },
        { risk: "Delayed response to emergency medical calls in narrow street layouts", probability: 74, impact: "High", timeframe: "7 days", affectedPopulation: "40,000 residents" }
      ],
      reasoning: ["Dark municipal streets from failed municipal lamps", "Delayed police dispatch queues", "Narrow historical streets preventing patrol vehicle entry"]
    },
    actions: {
      immediateActions: [
        { action: "Deploy Safe Cities mobile command vehicle and 6 foot-patrol officers to Data Gunj", owner: "Punjab Police & Safe Cities Division", timeline: "Within 12 hours", resources: "1 mobile vehicle, 6 officers", expectedImpact: "30% drop in opportunistic crime rates", priority: "P1" },
        { action: "Install temporary battery backup systems to power 14 critical CCTV security nodes", owner: "Punjab Safe Cities Authority", timeline: "Within 24 hours", resources: "14 backup batteries, engineers", expectedImpact: "Eliminates CCTV downtime during grid loadshedding", priority: "P1" }
      ],
      shortTermActions: [
        { action: "Procure and mount 40 solar-powered street lights in commercial lanes", timeline: "Within 3 days", expectedImpact: "Restores pedestrian visibility and deters thieves", priority: "P2" },
        { action: "Equip local police officers with lightweight patrol motorbikes for narrow alleys", timeline: "Within 4 days", expectedImpact: "Cuts response times in narrow lanes from 13 to 6 mins", priority: "P2" }
      ],
      longTermActions: [
        { action: "Establish a neighborhood localized emergency volunteer responder dispatch team", timeline: "Within 6 months", expectedImpact: "Guarantees 3-minute first-response for medical emergencies" }
      ],
      kpis: [
        { metric: "Data Gunj Risk Index", currentValue: "91/100", targetValue: "65/100", targetDate: "15 Days" }
      ],
      estimatedImpact: {
        populationBenefited: "95,000 residents",
        costSaving: "4.2M PKR/month in lost property and security costs",
        riskReduction: "40%"
      }
    }
  },
  'Community Overview': {
    summary: {
      overview: "Ingested multi-domain community logs covering Air Quality, Healthcare, Traffic, and Safety indices. Aggregated findings demonstrate interconnected urban stress clusters.",
      dataQuality: "High",
      recordCount: 450,
      timespan: "Past 30 Days",
      keyMetrics: [
        { name: "Aggregate Community Risk", value: "74", unit: "/100" },
        { name: "Active Alert Count", value: "4", unit: "Critical" },
        { name: "Overall Air Quality Index", value: "156", unit: "AQI" }
      ],
      dataSources: ["All Municipal & Provincial IoT streams", "Safe Cities", "Department of Health"]
    },
    patterns: {
      patterns: [
        { pattern: "Intersection of poor air quality with high respiratory admission rates in Shahdara", significance: "Critical", affectedArea: "Shahdara", percentage: 89 },
        { pattern: "Traffic congestion bottleneck causing commuter delay and local emission spikes", significance: "High", affectedArea: "Murree Road Corridor", percentage: 76 }
      ],
      anomalies: [
        { anomaly: "Combined system warning: Smog levels and Dengue outbreak occurring simultaneously", severity: "Critical", location: "City-wide", deviation: "Multiple standards crossed" }
      ],
      trends: {
        shortTerm: "7-day trend shows rising demands on healthcare and traffic corridors.",
        longTerm: "30-day outlook shows severe threat to public health without integrated urban controls."
      },
      correlations: [
        "AQI to Hospital respiratory entries: r = 0.86",
        "Traffic speed to local CO concentration: r = 0.78"
      ]
    },
    forecast: {
      overallRisk: "High",
      riskScore: 74,
      confidence: 93,
      forecast: [
        { day: "Day 1", riskLevel: "High", probability: 88, primaryThreat: "Interconnected Outbreak" },
        { day: "Day 2", riskLevel: "High", probability: 90, primaryThreat: "Interconnected Outbreak" },
        { day: "Day 3", riskLevel: "High", probability: 91, primaryThreat: "Smog Accumulation" },
        { day: "Day 4", riskLevel: "High", probability: 93, primaryThreat: "Hospital overcrowding" },
        { day: "Day 5", riskLevel: "Critical", probability: 95, primaryThreat: "Hospital overcrowding" },
        { day: "Day 6", riskLevel: "Critical", probability: 96, primaryThreat: "Smog emergency" },
        { day: "Day 7", riskLevel: "Critical", probability: 97, primaryThreat: "Smog emergency" }
      ],
      topRisks: [
        { risk: "Complete clinical bed shortage during combined Dengue and Smog asthma wave", probability: 92, impact: "Critical", timeframe: "72 hours", affectedPopulation: "600,000 residents" },
        { risk: "Widespread transportation slowdown due to zero-visibility smog gridlocks", probability: 80, impact: "High", timeframe: "5 days", affectedPopulation: "40,000 commuters" }
      ],
      reasoning: ["Co-occurrence of dengue mosquito vector cycle and winter inversion smog season", "Arterial gridlocks stalling police and ambulances", "Uncoordinated municipal response departments"]
    },
    actions: {
      immediateActions: [
        { action: "Mobilize joint Health-EPA taskforce to coordinate hospital beds and emission bans", owner: "Provincial Coordination Committee", timeline: "Within 12 hours", resources: "Integrated dashboard, taskforce staff", expectedImpact: "Decreases emergency response dispatch delay", priority: "P1" },
        { action: "Deploy Safe Cities CCTV signals to clear ambulance express routes to major clinics", owner: "Traffic Police & Emergency Dispatch", timeline: "Within 18 hours", resources: "Signal overrides, police marshals", expectedImpact: "Saves critical minutes for emergency patients", priority: "P1" }
      ],
      shortTermActions: [
        { action: "Setup local triage camps in Orangi and Shahdara districts to filter patients", timeline: "Within 2 days", expectedImpact: "Diverts 30% of emergency overflow", priority: "P2" },
        { action: "Apply temporary vehicle odd-even restrictions to reduce peak emissions", timeline: "Within 3 days", expectedImpact: "15% reduction in smog buildup velocity", priority: "P2" }
      ],
      longTermActions: [
        { action: "Establish a Unified Community Emergency Command Center linking Safe Cities and Health", timeline: "Within 6 months", expectedImpact: "Permanent 50% improvement in cross-departmental incident response" }
      ],
      kpis: [
        { metric: "Aggregate Risk Score", currentValue: "74/100", targetValue: "50/100", targetDate: "20 Days" }
      ],
      estimatedImpact: {
        populationBenefited: "2,500,000 residents",
        costSaving: "30M PKR/week in emergency health and traffic operations",
        riskReduction: "50%"
      }
    }
  }
};

module.exports = MOCK_AGENT_RUNS;
