import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function Hero({ settings }: { settings?: any }) {
  const [current, setCurrent] = useState(0);

  const dynamicSlides = settings?.hero?.images?.filter((img: string) => !!img).map((img: string, idx: number) => ({
    image: img,
    title: idx === 0 ? settings.hero.title : (idx === 1 ? 'Expert Civil Engineering' : 'Quality Structural Delivery'),
    description: idx === 0 ? settings.hero.subtitle : 'Committed to excellence across Nigeria.'
  })) || [];

  const displaySlides = dynamicSlides.length > 0 ? settings.hero.images.filter((img: string) => !!img).map((img: string, idx: number) => ({
    image: img,
    title: settings.hero.slides?.[idx]?.title || (idx === 0 ? settings.hero.title : (idx === 1 ? 'Expert Civil Engineering' : 'Quality Structural Delivery')),
    description: settings.hero.slides?.[idx]?.subtitle || (idx === 0 ? settings.hero.subtitle : 'Committed to excellence across Nigeria.')
  })) : [
    {
      image: 'https://images.unsplash.com/photo-1563166423-a78566af3dbe?w=1600',
      title: 'Structural Engineering Experts',
      description: 'Sampris Nigeria Limited: Delivering landmark projects since 2002.'
    },
    {
      image: 'https://images.unsplash.com/photo-1621511075938-f03482369feb?w=1600',
      title: 'Civil Infrastructure Design',
      description: 'Expertise in specialized drainage and sewage networks.'
    },
    {
      image: 'https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?w=1600',
      title: 'Indigenous Quality Service',
      description: 'High standard of excellence in general construction works.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % displaySlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displaySlides.length]);

  return (
    <section id="hero" className="relative h-[100vh] -mt-20 overflow-hidden bg-brand-primary">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/95 via-brand-primary/40 to-transparent z-10" />
          <img
            src={displaySlides[current].image}
            alt="Sampris Hero Slide"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      <div className="container mx-auto px-4 md:px-6 relative z-20 h-full flex items-center">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[2px] bg-amber-400" />
            <span className="text-amber-400 uppercase tracking-[0.3em] font-bold text-xs">Certified Nigerian Engineering</span>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.05] tracking-tight">
                {displaySlides[current].title}
              </h1>
              <p className="text-lg md:text-xl text-white/70 max-w-xl font-light leading-relaxed">
                {displaySlides[current].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mt-12"
          >
            <Link
              to="/projects"
              className="group bg-brand-accent text-white px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-[11px] flex items-center gap-3 transition-all hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-brand-accent/30"
            >
              View Our Portfolio
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Pagination indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-24 lg:translate-x-0 z-30 flex items-center gap-3">
        {displaySlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={cn(
              "h-1.5 transition-all duration-500 rounded-full",
              current === i ? "w-12 bg-brand-accent" : "w-3 bg-white/30 hover:bg-white/50"
            )}
          />
        ))}
      </div>
    </section>
  );
}
