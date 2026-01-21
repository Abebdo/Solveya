import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children, className }) => {
  const variants = {
    success: "bg-brand-green/20 text-brand-green border-brand-green/30",
    warning: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    danger: "bg-brand-red/20 text-brand-red border-brand-red/30",
    info: "bg-brand-cyan/20 text-brand-cyan border-brand-cyan/30",
    neutral: "bg-slate-500/20 text-slate-300 border-slate-500/30",
  };

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md uppercase tracking-wider",
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
};
