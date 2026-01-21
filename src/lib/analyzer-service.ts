import type { AnalysisResult } from './types';

// Real API Client
export async function analyzeTextAPI(message: string): Promise<AnalysisResult> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Analysis failed');
  }

  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error || 'Analysis failed');
  }

  return data.data;
}

// Mock Engine for Demo / Sandbox Environment
export async function analyzeTextMock(message: string): Promise<AnalysisResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const lowerMsg = message.toLowerCase();
  
  // Rule-based simulation for demo purposes
  let score = 10;
  let riskLevel: AnalysisResult['riskLevel'] = 'SAFE';
  let scamType = 'None';
  let redFlags: string[] = [];
  let highlights: AnalysisResult['highlightIndices'] = [];

  // 1. Phishing / Links
  if (lowerMsg.includes('http') || lowerMsg.includes('www') || lowerMsg.includes('click here') || lowerMsg.includes('verify')) {
    score += 30;
    redFlags.push('Contains external links or verification request');
    highlights.push({ phrase: 'verify', type: 'WARNING', explanation: 'Requests to verify accounts are common in phishing.' });
    if (lowerMsg.includes('http')) {
        // extract link roughly
        const linkMatch = message.match(/https?:\/\/[^\s]+/);
        if (linkMatch) {
            highlights.push({ phrase: linkMatch[0], type: 'DANGER', explanation: 'Suspicious link detected.' });
        }
    }
  }

  // 2. Urgency
  if (lowerMsg.includes('urgent') || lowerMsg.includes('immediately') || lowerMsg.includes('suspended') || lowerMsg.includes('act now')) {
    score += 40;
    redFlags.push('High urgency language detected');
    ['urgent', 'immediately', 'suspended', 'act now'].forEach(w => {
        if (lowerMsg.includes(w)) highlights.push({ phrase: w, type: 'DANGER', explanation: 'Scammers use urgency to bypass critical thinking.' });
    });
  }

  // 3. Money / Crypto
  if (lowerMsg.includes('bitcoin') || lowerMsg.includes('usd') || lowerMsg.includes('transfer') || lowerMsg.includes('gift card') || lowerMsg.includes('bank')) {
    score += 30;
    redFlags.push('Financial request or keyword detected');
    scamType = 'Financial Fraud';
  }

  // 4. Auth / Password
  if (lowerMsg.includes('password') || lowerMsg.includes('code') || lowerMsg.includes('login')) {
    score += 40;
    redFlags.push('Requests for sensitive security credentials');
    scamType = 'Phishing';
  }

  // Determine Final Score
  if (score > 100) score = 98;
  if (score < 10) score = 5;

  if (score > 80) riskLevel = 'CRITICAL';
  else if (score > 60) riskLevel = 'HIGH';
  else if (score > 40) riskLevel = 'MODERATE';
  else if (score > 20) riskLevel = 'LOW';

  if (score > 40 && scamType === 'None') scamType = 'Suspicious Activity';

  // Generate Summary & Action
  const summary = score > 40 
    ? "This message exhibits multiple characteristics of a scam, including urgency and requests for sensitive action. Proceed with extreme caution."
    : "This message appears mostly safe, but always verify the sender's identity.";

  const action = score > 60
    ? "Do not click any links. Block the sender immediately."
    : "No immediate action required. Verify sender if unsure.";

  const safeRewrite = score > 60
    ? `[SCAM BLOCKED]: The sender tried to pressure you into clicking a link or sending money. A safe version would be: 'Please contact us through our official app if you have concerns.'`
    : message;

  return {
    riskScore: score,
    riskLevel,
    scamType,
    summary,
    redFlags,
    action,
    safeRewrite,
    highlightIndices: highlights
  };
}
