import React from 'react';
import type { AnalysisResult } from '../../lib/types';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

interface HeatmapProps {
  text: string;
  highlights: AnalysisResult['highlightIndices'];
}

export const HeatmapHighlighter: React.FC<HeatmapProps> = ({ text, highlights }) => {
  if (!highlights || highlights.length === 0) {
    return <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{text}</p>;
  }

  // Create a safe regex pattern
  // Escape special regex chars
  const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Sort highlights by length (descending) to match longest phrases first (greedy)
  const sortedHighlights = [...highlights].sort((a, b) => b.phrase.length - a.phrase.length);
  
  // We need to verify we don't double-highlight.
  // A simple approach is to use a recursive render or split by the first match, then process remainder.
  // Given the complexity of overlapping highlights, we will try a simpler approach:
  // Find all matches, verify they don't overlap with existing valid matches, then render.
  
  // Actually, for this demo, let's use the regex split method with a map for lookup.
  // Note: if phrases overlap, this simple regex OR logic might pick the first one in the pattern.
  // We sorted by length, so we prioritize longer phrases.
  
  const pattern = new RegExp(`(${sortedHighlights.map(h => escapeRegExp(h.phrase)).join('|')})`, 'gi');
  
  const parts = text.split(pattern);

  return (
    <div className="bg-brand-navy/30 p-6 rounded-xl border border-white/5 font-mono text-sm md:text-base leading-loose whitespace-pre-wrap">
      {parts.map((part, i) => {
        const match = sortedHighlights.find(h => h.phrase.toLowerCase() === part.toLowerCase());
        
        if (match) {
          const colorClass = match.type === 'DANGER' 
            ? 'bg-brand-red/20 text-brand-red border-b-2 border-brand-red cursor-help' 
            : 'bg-yellow-500/20 text-yellow-500 border-b-2 border-yellow-500 cursor-help';

          return (
            <motion.span
              key={i}
              initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
              animate={{ backgroundColor: match.type === 'DANGER' ? 'rgba(255,42,109,0.2)' : 'rgba(234,179,8,0.2)' }}
              className={cn("relative group px-1 rounded mx-0.5", colorClass)}
            >
              {part}
              {/* Tooltip */}
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-brand-dark border border-white/10 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
                {match.explanation}
              </span>
            </motion.span>
          );
        }
        return <span key={i} className="text-slate-300">{part}</span>;
      })}
    </div>
  );
};
