export interface AnalysisResult {
  riskScore: number;
  riskLevel: "SAFE" | "LOW" | "MODERATE" | "HIGH" | "CRITICAL";
  scamType: string;
  summary: string;
  redFlags: string[];
  action: string;
  safeRewrite: string;
  highlightIndices: Array<{
    phrase: string;
    type: "DANGER" | "WARNING";
    explanation: string;
  }>;
}

export interface AnalyzeRequest {
  message: string;
}

export interface AnalyzeResponse {
  success: boolean;
  data?: AnalysisResult;
  error?: string;
}
