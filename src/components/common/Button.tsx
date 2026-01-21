import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  isLoading, 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-brand-cyan text-brand-dark hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    danger: "bg-brand-red text-white hover:shadow-[0_0_20px_rgba(255,42,109,0.4)]",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Processing...
        </span>
      ) : children}
    </motion.button>
  );
};
