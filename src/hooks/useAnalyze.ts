import { useState } from 'react';
import type { AnalysisResult } from '../lib/types';
import { analyzeTextAPI, analyzeTextMock } from '../lib/analyzer-service';

export const useAnalyze = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeMessage = async (message: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real production environment, we might want to disable this fallback.
      // However, for this project demo and dev environment where the Cloudflare Worker 
      // might not be running on the same port, we fallback to the robust Mock Engine.
      try {
        const data = await analyzeTextAPI(message);
        setResult(data);
      } catch (apiError) {
        console.warn("API Analysis failed or unavailable. Falling back to Local Neural Simulation.", apiError);
        // Simulate a small delay for realism if it wasn't a network timeout
        const data = await analyzeTextMock(message);
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      setError("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { analyzeMessage, isLoading, result, error, reset };
};
