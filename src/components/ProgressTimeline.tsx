import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, CircleDashed, Hammer, Home, Construction, Check } from 'lucide-react';
import { cn } from '../lib/utils';

interface TimelineProps {
  stages: {
    foundation: number;
    structural: number;
    roofing: number;
    finishing: number;
  };
}

export default function ProgressTimeline({ stages }: TimelineProps) {
  const steps = [
    { name: 'Foundation', progress: stages.foundation, icon: Construction },
    { name: 'Structural', progress: stages.structural, icon: Hammer },
    { name: 'Roofing', progress: stages.roofing, icon: CheckCircle2 },
    { name: 'Finishing', progress: stages.finishing, icon: Home },
  ];

  return (
    <div className="w-full py-12">
      <div className="relative flex flex-col md:flex-row justify-between items-start gap-12 md:gap-4">
        {/* Connection Line */}
        <div className="absolute left-6 top-6 bottom-6 w-1 bg-neutral-100 md:left-0 md:right-0 md:top-8 md:h-1 md:w-full -z-0">
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="h-full bg-brand-accent origin-left"
            style={{ width: `${(steps.reduce((acc, curr) => acc + curr.progress, 0) / 400) * 100}%` }}
          />
        </div>

        {steps.map((step, i) => {
          const isCompleted = step.progress === 100;
          const isStarted = step.progress > 0;
          const Icon = step.icon;
          
          return (
            <motion.div 
              key={step.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="flex items-center md:flex-col md:text-center relative z-10 w-full group"
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0 mb-0 md:mb-4 transition-all duration-500 mr-6 md:mr-0 border-4 border-white shadow-md",
                isCompleted ? "bg-brand-primary text-white" : isStarted ? "bg-brand-accent text-white" : "bg-neutral-200 text-neutral-400"
              )}>
                {isCompleted ? <Check size={18} /> : <span>0{i+1}</span>}
              </div>
              
              <div className="space-y-1">
                <h4 className={cn(
                  "font-display font-bold text-sm uppercase tracking-widest",
                  isStarted ? "text-brand-primary" : "text-neutral-400"
                )}>
                  {step.name} Stage
                </h4>
                <div className="flex items-center md:justify-center gap-2">
                  <div className="w-24 h-1.5 bg-neutral-100 rounded-full overflow-hidden shrink-0">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${step.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.3 }}
                      className="h-full bg-brand-accent" 
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-brand-accent">{step.progress}%</span>
                </div>
              </div>

              {/* Detail on hover */}
              <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[9px] uppercase tracking-widest px-4 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all pointer-events-none hidden md:block">
                {step.name} Progress: {step.progress}%
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
