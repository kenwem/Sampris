import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO } from '../constants';
import SectionHeading from '../components/SectionHeading';
import { Shield, Target, Lightbulb, Users, ArrowDown, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCMS } from '../hooks/useCMS';

export default function About() {
  const { fetchItems } = useCMS();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSettings = async () => {
      setLoading(true);
      const data = await fetchItems('siteSettings');
      if (data && data.length > 0) {
        setSettings(data[0]);
      }
      setLoading(false);
    };
    loadSettings();
  }, []);

  const stats = [
    { label: 'Project Delivery Rate', value: '100%', detail: 'On-time & On-budget' },
    { label: 'Expert Staff', value: '50+', detail: 'Industry Professionals' },
    { label: 'Completed Projects', value: '250+', detail: 'Nationwide Presence' },
    { label: 'Safety Record', value: '0', detail: 'On-site Casualties' }
  ];

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-brand-primary"><Loader2 className="animate-spin text-brand-accent" size={48} /></div>;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] bg-brand-primary flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={settings?.about?.headerImage || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1600"} 
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Sampris Heritage"
            referrerPolicy="no-referrer"
            onError={(e: any) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=1600';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-primary via-brand-primary/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <SectionHeading 
              light
              badge="Since 2002"
              title="Building Nigeria's Future Through Engineering Excellence"
            />
            <p className="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
              From our humble beginnings to becoming one of Nigeria's most trusted indigenous construction firms.
            </p>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-10 lg:left-auto lg:right-10 animate-bounce">
          <ArrowDown className="text-brand-accent" size={32} />
        </div>
      </section>

      {/* History */}
      <section className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <SectionHeading 
                badge="Our Story"
                title="A Legacy of Vision and Hard Work"
                subtitle={COMPANY_INFO.history}
              />
              <p className="text-neutral-500 leading-relaxed font-light">
                {settings?.site?.aboutUs || COMPANY_INFO.description}
              </p>
              <div className="pt-8 border-t border-neutral-100 flex items-center gap-6">
                <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center border border-neutral-100">
                  <span className="font-display font-black text-brand-accent text-2xl">S</span>
                </div>
                <div>
                  <h6 className="font-display font-bold text-brand-primary">Indigenous Innovation</h6>
                  <p className="text-xs uppercase tracking-widest text-neutral-400 font-bold">Nigeria's Structural Partner</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden shadow-xl">
                    <img 
                      src={settings?.about?.storyImage1 || "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800"} 
                      className="w-full h-full object-cover grayscale" 
                      referrerPolicy="no-referrer"
                      onError={(e: any) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800';
                      }}
                    />
                  </div>
                  <div className="aspect-square bg-brand-accent flex items-center justify-center p-8 text-white shadow-xl">
                    <p className="text-4xl lg:text-6xl font-display font-black">20+</p>
                    <span className="text-[10px] uppercase tracking-widest font-bold ml-2">Years of Service</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="aspect-square bg-brand-primary flex flex-col justify-center p-8 text-white shadow-xl">
                    <CheckCircle2 size={32} className="text-brand-accent mb-4" />
                    <p className="text-lg font-display font-bold leading-tight">ISO Standard Quality Management</p>
                  </div>
                  <div className="aspect-[4/5] bg-neutral-100 rounded-sm overflow-hidden shadow-xl">
                    <img 
                      src={settings?.about?.storyImage2 || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800"} 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                      referrerPolicy="no-referrer"
                      onError={(e: any) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-neutral-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-12 shadow-xl rounded-sm space-y-6 border-t-4 border-brand-accent"
            >
              <div className="w-16 h-16 bg-neutral-50 rounded-lg flex items-center justify-center text-brand-accent mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold text-brand-primary">Our Mission</h3>
              <p className="text-neutral-500 leading-relaxed font-light text-lg">
                {COMPANY_INFO.mission}
              </p>
            </motion.div>
            
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-brand-primary p-12 shadow-xl rounded-sm space-y-6 text-white"
            >
              <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center text-brand-accent mb-6">
                <Lightbulb size={32} />
              </div>
              <h3 className="text-3xl font-display font-bold">Our Vision</h3>
              <p className="text-white/60 leading-relaxed font-light text-lg">
                {COMPANY_INFO.vision}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Corporate Values */}
      <section className="py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading 
            align="center"
            badge="Foundations"
            title="Our Corporate Values"
            subtitle="The fundamental principles that guide every decision we make and every project we undertake."
          />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {COMPANY_INFO.values.map((value, i) => {
              const icons = [Shield, Users, Lightbulb, CheckCircle2];
              const Icon = icons[i];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white border border-neutral-100 p-8 text-center group hover:border-brand-accent transition-colors"
                >
                  <div className="w-16 h-16 bg-neutral-50 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-accent/10 transition-colors">
                    <Icon className="text-brand-accent" size={24} />
                  </div>
                  <h4 className="font-display font-bold text-lg mb-2">{value.title}</h4>
                  <p className="text-neutral-500 text-sm font-light leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership / Expertise */}
      <section className="py-24 bg-brand-primary text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <SectionHeading 
              light
              align="center"
              badge="Our Team"
              title="Led by Industry Experts"
            />
            <p className="text-white/60 text-lg leading-relaxed font-light italic">
              "Projects at Sampris Nigeria Limited are executed by experienced engineering teams led by executive directors, ensuring optimal use of resources and high-quality delivery. We also collaborate with professional organizations nationwide to handle specialized engineering challenges."
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
              {stats.map((stat, i) => (
                <div key={i} className="space-y-1">
                  <h5 className="text-4xl font-display font-black text-brand-accent">{stat.value}</h5>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">{stat.label}</p>
                  <p className="text-[9px] uppercase tracking-widest text-white/20">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
