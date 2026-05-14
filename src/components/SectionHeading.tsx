import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  title,
  subtitle,
  badge,
  align = 'left',
  light = false
}: SectionHeadingProps) {
  return (
    <div className={cn(
      "max-w-2xl mb-12",
      align === 'center' ? "mx-auto text-center" : ""
    )}>
      {badge && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-4 justify-inherit"
        >
          {align === 'center' && <div className="w-6 h-[1px] bg-brand-accent" />}
          <span className="text-brand-accent uppercase tracking-[0.3em] font-bold text-[10px]">
            {badge}
          </span>
          <div className="w-6 h-[1px] bg-brand-accent" />
        </motion.div>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={cn(
          "text-4xl md:text-5xl font-display font-extrabold tracking-tight mb-6 leading-tight",
          light ? "text-white" : "text-brand-primary"
        )}
      >
        {title}
      </motion.h2>
      
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "text-base md:text-lg font-light leading-relaxed",
            light ? "text-white/60" : "text-neutral-500"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
