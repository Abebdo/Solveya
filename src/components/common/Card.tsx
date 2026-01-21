import React from 'react';
import { cn } from '../../lib/utils';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<"div"> {
  gradient?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, children, gradient, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card p-6 relative overflow-hidden",
        gradient && "bg-gradient-to-br from-white/10 to-transparent",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
