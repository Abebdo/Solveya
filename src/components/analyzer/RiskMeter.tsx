import React from 'react';
import { motion } from 'framer-motion';

interface RiskMeterProps {
  score: number; // 0-100
  level: string;
}

export const RiskMeter: React.FC<RiskMeterProps> = ({ score, level }) => {
  // Color calculation based on score
  const getColor = (s: number) => {
    if (s < 20) return '#05d5aa'; // Safe
    if (s < 50) return '#fbbf24'; // Warning
    if (s < 80) return '#f97316'; // High
    return '#ff2a6d'; // Critical
  };

  const color = getColor(score);
  
  // SVG Arc calculations
  const radius = 80;
  const stroke = 12;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  // We want a semi-circle (180deg), so max offset is half circumference? 
  // Let's do a full circle for simplicity but styled as a gauge.
  
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Background Circle */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="transform -rotate-90"
        >
          <circle
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Circle */}
          <motion.circle
            stroke={color}
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          />
        </svg>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            className="text-4xl font-display font-bold text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {score}%
          </motion.span>
          <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">Risk Score</span>
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-4 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
        style={{ borderColor: color }}
      >
        <span className="font-bold tracking-wider" style={{ color }}>{level}</span>
      </motion.div>
    </div>
  );
};
