const { GoogleGenerativeAI } = require('@google/generative-ai');
const getApiKey = () => process.env.GEMINI_API_KEY || process.env.OPENROUTER_API_KEY || 'demo-key';

const MODEL_NAME = 'gemini-1.5-flash';

/**
 * System prompt for the community AI assistant
 */
const SYSTEM_PROMPT = `You are an AI Decision Intelligence Assistant for a Smart Community Platform. 
Your role is to help citizens, government authorities, and NGOs make better decisions by analyzing community data.

You specialize in:
- Public health trends and healthcare demand forecasting
- Environmental analysis (air quality, pollution, waste management)
- Infrastructure assessment (traffic, roads, utilities)
- Community safety and emergency response
- Energy consumption optimization
- Economic development and poverty indicators
- Education access and quality metrics

Always provide:
1. Clear, actionable insights
2. Data-driven recommendations
3. Risk assessments when relevant
4. Prioritized action steps

Be concise, professional, and empathetic to community needs. When analyzing data, highlight the most critical findings first.`;

/**
 * Universal service caller supporting OpenRouter and Native Google SDK
 */
async function callAIService(systemPrompt, userPrompt, history = []) {
  const apiKey = getApiKey();
  
  if (apiKey.startsWith('sk-or-')) {
    console.log("Using OpenRouter API endpoint...");
    const messages = [];
    
    if (systemPrompt) {
      messages.push({ role: 'system', content: systemPrompt });
    }
    
    history.forEach(msg => {
      messages.push({
        role: msg.role === 'assistant' ? 'assistant' : 'user',
        content: msg.content
      });
    });
    
    messages.push({ role: 'user', content: userPrompt });
    
    try {
      console.log("Trying fast free model: liquid/lfm-2.5-1.2b-instruct:free...");
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000',
          'X-Title': 'Smart Community Decision Intelligence Platform'
        },
        body: JSON.stringify({
          model: 'liquid/lfm-2.5-1.2b-instruct:free',
          messages: messages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });
      
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message || 'OpenRouter API Error');
      }
      return data.choices[0].message.content;
    } catch (error) {
      console.log("Fast model failed, falling back to openrouter/free router. Error was:", error.message);
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'http://localhost:3000',
            'X-Title': 'Smart Community Decision Intelligence Platform'
          },
          body: JSON.stringify({
            model: 'openrouter/free',
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024
          })
        });
        
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error.message || 'Fallback OpenRouter API Error');
        }
        return data.choices[0].message.content;
      } catch (fallbackError) {
        console.error('OpenRouter fallback call error:', fallbackError);
        throw fallbackError;
      }
    }
  } else {
    console.log("Using Native Google Gemini SDK...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: MODEL_NAME,
      systemInstruction: systemPrompt || undefined
    });
    
    if (history.length > 0) {
      const chatSession = model.startChat({
        history: history.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        generationConfig: {
          maxOutputTokens: 2048,
          temperature: 0.7,
        }
      });
      const result = await chatSession.sendMessage(userPrompt);
      return result.response.text();
    } else {
      const result = await model.generateContent(userPrompt);
      return result.response.text();
    }
  }
}

/**
 * Send a chat message to Gemini
 */
async function chat(messages, userMessage) {
  try {
    return await callAIService(SYSTEM_PROMPT, userMessage, messages);
  } catch (error) {
    console.error('Gemini chat error:', error);
    throw new Error('AI service temporarily unavailable. Please try again.');
  }
}

/**
 * Analyze structured data from uploaded files
 */
async function analyzeData(data, filename) {
  try {
    const dataPreview = JSON.stringify(data.slice(0, 50), null, 2);
    const prompt = `You are analyzing community data uploaded to an AI Decision Intelligence Platform.

Dataset: "${filename}"
Total records: ${data.length}
Sample data (first 50 rows):
${dataPreview}

Please provide:
1. **Data Summary**: What this dataset represents and its key characteristics
2. **Key Findings**: The 3-5 most important insights from this data
3. **Anomalies & Risks**: Any concerning patterns, outliers, or anomalies detected
4. **Recommendations**: Specific, actionable recommendations for community decision-makers
5. **Predicted Trends**: Short-term trends based on the data patterns
6. **Priority Actions**: Top 3 immediate actions authorities should take

Format your response with clear headings and bullet points.`;

    return await callAIService(null, prompt);
  } catch (error) {
    console.error('Gemini analysis error:', error);
    throw new Error('Data analysis failed. Please check your API key and try again.');
  }
}

/**
 * Generate a structured report
 */
async function generateReport(reportType, dateRange, metrics) {
  try {
    const prompt = `Generate a comprehensive ${reportType} report for a smart community platform.

Report Period: ${dateRange.start} to ${dateRange.end}
Key Metrics:
${JSON.stringify(metrics, null, 2)}

Generate a professional report with:
1. **Executive Summary** (2-3 paragraphs)
2. **Key Performance Indicators** - Analyze each metric provided
3. **Trend Analysis** - Identify significant trends over the period
4. **Risk Assessment** - Areas of concern requiring attention
5. **Recommendations** - Evidence-based recommendations for improvement
6. **Outlook** - Short-term predictions for the next quarter
7. **Conclusion** - Brief closing statement

Make the report professional, data-driven, and suitable for government authorities and NGOs.`;

    return await callAIService(null, prompt);
  } catch (error) {
    console.error('Gemini report error:', error);
    throw new Error('Report generation failed. Please check your API key and try again.');
  }
}

/**
 * Generate AI recommendations based on community data
 */
async function generateRecommendations(communityData) {
  try {
    const prompt = `Based on the following community metrics, generate 6 specific, actionable recommendations:

Community Data:
${JSON.stringify(communityData, null, 2)}

For each recommendation, provide:
- Title (concise)
- Category (Health/Environment/Infrastructure/Safety/Education/Economy)
- Priority (Critical/High/Medium/Low)
- Description (2-3 sentences)
- Expected Impact
- Implementation Timeframe
- Estimated Resources Needed

Return as a JSON array with these exact fields: title, category, priority, description, impact, timeframe, resources.`;

    let text = await callAIService(null, prompt);
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) text = jsonMatch[1];
    
    return JSON.parse(text);
  } catch (error) {
    console.error('Gemini recommendations error:', error);
    // Return fallback recommendations
    return getFallbackRecommendations();
  }
}

function getFallbackRecommendations() {
  return [
    {
      title: 'Deploy Air Quality Monitoring Network',
      category: 'Environment',
      priority: 'Critical',
      description: 'Install real-time air quality sensors across industrial zones and high-traffic areas to track PM2.5, CO2, and NO2 levels continuously.',
      impact: '40% improvement in pollution response time',
      timeframe: '3-6 months',
      resources: '$150,000 initial investment',
    },
    {
      title: 'Expand Community Health Clinics',
      category: 'Health',
      priority: 'High',
      description: 'Establish 5 new community health centers in underserved districts to reduce healthcare access gaps and lower emergency room overcrowding.',
      impact: 'Serve 25,000 additional residents',
      timeframe: '6-12 months',
      resources: '$2.5M budget allocation',
    },
    {
      title: 'Smart Traffic Management System',
      category: 'Infrastructure',
      priority: 'High',
      description: 'Implement AI-powered adaptive traffic signals at 50 key intersections to reduce congestion and improve emergency vehicle response times.',
      impact: '30% reduction in peak-hour congestion',
      timeframe: '4-8 months',
      resources: '$800,000',
    },
    {
      title: 'Digital Literacy Programs for Seniors',
      category: 'Education',
      priority: 'Medium',
      description: 'Launch monthly digital literacy workshops at community centers targeting residents over 60 to bridge the digital divide.',
      impact: '5,000 seniors trained annually',
      timeframe: '1-3 months',
      resources: '$50,000/year',
    },
    {
      title: 'Renewable Energy Microgrids',
      category: 'Environment',
      priority: 'High',
      description: 'Install solar microgrids in 10 public schools and community centers to reduce energy costs and carbon footprint.',
      impact: '35% reduction in public building energy costs',
      timeframe: '8-12 months',
      resources: '$1.2M with ROI in 7 years',
    },
    {
      title: 'Youth Employment Initiative',
      category: 'Economy',
      priority: 'Medium',
      description: 'Partner with local businesses to create 500 internship and apprenticeship positions for youth aged 18-25 in priority sectors.',
      impact: '500 youth employed, 15% reduction in youth unemployment',
      timeframe: '2-4 months',
      resources: '$300,000 in subsidies',
    },
  ];
}

module.exports = { chat, analyzeData, generateReport, generateRecommendations, callAI: callAIService };

