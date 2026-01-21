import React from 'react';
import type { AnalysisResult } from '../../lib/types';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { RiskMeter } from './RiskMeter';
import { HeatmapHighlighter } from './HeatmapHighlighter';
import { AlertTriangle, ShieldCheck, ShieldAlert, Info, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResultDashboardProps {
  result: AnalysisResult;
  originalText: string;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ result, originalText }) => {
  const isSafe = result.riskLevel === 'SAFE' || result.riskLevel === 'LOW';
  
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Top Row: Score & Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Risk Score Card */}
        <Card className="md:col-span-1 flex items-center justify-center bg-brand-navy/40">
          <RiskMeter score={result.riskScore} level={result.riskLevel} />
        </Card>

        {/* Summary Card */}
        <Card className="md:col-span-2 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            {isSafe ? (
              <ShieldCheck className="w-8 h-8 text-brand-green" />
            ) : (
              <ShieldAlert className="w-8 h-8 text-brand-red" />
            )}
            <h2 className="text-2xl font-bold text-white">Analysis Report</h2>
            <Badge variant={isSafe ? 'success' : 'danger'} className="ml-auto">
              {result.scamType}
            </Badge>
          </div>
          <p className="text-lg text-slate-300 mb-6">{result.summary}</p>
          
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-brand-cyan" /> Recommended Action
            </h4>
            <p className="text-brand-cyan font-medium">{result.action}</p>
          </div>
        </Card>
      </div>

      {/* Red Flags Grid */}
      {result.redFlags && result.redFlags.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {result.redFlags.map((flag, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-red/10 border border-brand-red/20 p-4 rounded-lg flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
              <span className="text-slate-300 text-sm">{flag}</span>
            </motion.div>
          ))}
        </div>
      )}

      {/* Heatmap Section */}
      <Card>
        <h3 className="text-xl font-bold text-white mb-4">Risk Heatmap</h3>
        <p className="text-sm text-slate-400 mb-4">Hover over highlighted text to see detailed analysis.</p>
        <HeatmapHighlighter text={originalText} highlights={result.highlightIndices} />
      </Card>

      {/* Safe Rewrite Section */}
      {result.safeRewrite && (
        <Card className="bg-gradient-to-br from-brand-green/5 to-transparent">
          <div className="flex items-center gap-2 mb-4">
            <RefreshCw className="w-6 h-6 text-brand-green" />
            <h3 className="text-xl font-bold text-white">Safe / Honest Version</h3>
          </div>
          <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-brand-green/90 text-sm md:text-base leading-relaxed">
            {result.safeRewrite}
          </div>
        </Card>
      )}
    </div>
  );
};
