export interface ScamFlag {
  id: string;
  message: string;
  severity: "low" | "medium" | "high";
}

export interface ScamResult {
  score: number;
  redFlags: ScamFlag[];
  greenFlags: string[];
  category: string | null;
  suggestions: string[];
}
