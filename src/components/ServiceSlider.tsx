import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, HardHat, Hammer, Home, ClipboardList, Wrench } from 'lucide-react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Building2,
  HardHat,
  Hammer,
  Home,
  ClipboardList,
  Wrench
};

export default function ServiceSlider() {
  return (
    <div className="w-full relative py-12">
      <div className="flex overflow-x-auto no-scrollbar gap-6 pb-8 snap-x">
        {SERVICES.map((service, index) => {
          const Icon = iconMap[service.icon];
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[300px] md:min-w-[350px] bg-white border border-neutral-100 p-8 snap-start group hover:border-brand-accent transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-brand-accent/5 rounded-sm relative overflow-hidden"
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-2 h-0 group-hover:h-12 bg-brand-accent transition-all duration-500" />
              
              <div className="w-16 h-16 bg-neutral-50 rounded-lg flex items-center justify-center mb-8 group-hover:bg-brand-accent/10 transition-colors duration-500">
                <Icon size={32} className="text-brand-accent" />
              </div>
              
              <h3 className="font-display font-bold text-xl mb-4 group-hover:text-brand-accent transition-colors">
                {service.title}
              </h3>
              
              <p className="text-neutral-500 text-sm leading-relaxed mb-8 font-light">
                {service.description}
              </p>
              
              <Link
                to="/services"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary group-hover:text-brand-accent transition-colors"
              >
                Learn More
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          );
        })}
      </div>
      
      {/* Scroll indicator overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-neutral-50 to-transparent pointer-events-none md:block hidden" />
    </div>
  );
}
