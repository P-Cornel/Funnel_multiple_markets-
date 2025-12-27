import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  glowColor?: 'blue' | 'purple' | 'green' | 'pink' | 'none';
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  glowColor = 'none' 
}) => {
  const glowClass = {
    blue: 'hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] border-t-cyan-500/30',
    purple: 'hover:shadow-[0_0_20px_rgba(188,19,254,0.2)] border-t-purple-500/30',
    green: 'hover:shadow-[0_0_20px_rgba(10,255,96,0.2)] border-t-green-500/30',
    pink: 'hover:shadow-[0_0_20px_rgba(255,0,153,0.2)] border-t-pink-500/30',
    none: 'border-t-white/10'
  }[glowColor];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${glowClass} ${className}`}
    >
      {children}
    </motion.div>
  );
};