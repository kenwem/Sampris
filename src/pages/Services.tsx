import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { SERVICES as DEFAULT_SERVICES, COMPANY_INFO } from '../constants';
import SectionHeading from '../components/SectionHeading';
import { 
  Building2, HardHat, Hammer, Home, ClipboardList, Wrench, 
  CheckCircle2, ArrowRight, Cog, Layout, Search, Layers, ShieldCheck, 
  UtilityPole, Truck, Pipette, Mountain, Factory, Microscope
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMS } from '../hooks/useCMS';
import { cn } from '../lib/utils';

const iconMap: Record<string, any> = {
  Building2, HardHat, Hammer, Home, ClipboardList, Wrench, 
  UtilityPole, Truck, Pipette, Mountain, Factory, Microscope,
  Cog, Layout, Search, Layers, ShieldCheck, CheckCircle2
};

export default function Services() {
  const { fetchItems } = useCMS();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadServices = async () => {
      const data = await fetchItems('services');
      if (data && data.length > 0) {
        setServices(data.sort((a: any, b: any) => (a.position || 0) - (b.position || 0)));
      } else {
        setServices(DEFAULT_SERVICES);
      }
      setLoading(false);
    };
    loadServices();
  }, []);

  return (
    <div className="bg-neutral-50 pb-24">
      {/* Header */}
      <section className="bg-brand-primary py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none overflow-hidden">
          <span className="text-[40vw] font-black text-white leading-none absolute -bottom-20 -left-20 rotate-12 uppercase">Service</span>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            light
            badge="What We Do"
            title="Professional Engineering & Construction Services"
            subtitle="Providing a full spectrum of construction solutions, guided by decades of technical expertise and a commitment to quality."
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="-mt-12">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => {
              const Icon = iconMap[service.iconName || service.icon] || HardHat;
              return (
                <motion.div
                  key={service.id || i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-12 shadow-xl rounded-sm group hover:bg-brand-accent transition-all duration-500 border border-neutral-100 flex flex-col items-start"
                >
                  <div className="w-16 h-16 bg-neutral-50 rounded-lg flex items-center justify-center text-brand-accent mb-8 group-hover:bg-white group-hover:scale-110 transition-all duration-500">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-brand-primary mb-6 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed font-light mb-auto group-hover:text-white/80 transition-colors">
                    {service.description}
                  </p>
                  <div className="mt-12 w-full h-[1px] bg-neutral-100 group-hover:bg-white/20 transition-colors" />
                  <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-brand-accent group-hover:text-white transition-colors">
                    Certified Delivery
                    <ShieldCheck size={14} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Detailed Methodology */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-square bg-brand-primary rounded-sm overflow-hidden shadow-2xl relative p-12 flex items-center justify-center">
                <Cog size={300} className="text-white/5 absolute -top-20 -right-20 animate-spin-slow" />
                <div className="relative z-10 grid grid-cols-2 gap-4 w-full h-full">
                  <div className="bg-white/5 backdrop-blur-md rounded-sm p-8 flex flex-col justify-end border border-white/10 hover:bg-white/10 transition-all">
                    <Layout size={32} className="text-brand-accent mb-4" />
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Stage 1</span>
                    <h5 className="text-white font-bold text-lg leading-tight">Design & Feasibility</h5>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-sm p-8 flex flex-col justify-end border border-white/10 hover:bg-white/10 transition-all">
                    <Search size={32} className="text-brand-accent mb-4" />
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Stage 2</span>
                    <h5 className="text-white font-bold text-lg leading-tight">Resource Analysis</h5>
                  </div>
                  <div className="bg-white/5 backdrop-blur-md rounded-sm p-8 flex flex-col justify-end border border-white/10 hover:bg-white/10 transition-all">
                    <Layers size={32} className="text-brand-accent mb-4" />
                    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">Stage 3</span>
                    <h5 className="text-white font-bold text-lg leading-tight">Structural Execution</h5>
                  </div>
                  <div className="bg-brand-accent rounded-sm p-8 flex flex-col justify-end shadow-xl">
                    <CheckCircle2 size={32} className="text-white mb-4" />
                    <span className="text-[10px] uppercase font-bold text-white/60 tracking-widest">Final</span>
                    <h5 className="text-white font-bold text-lg leading-tight">Project Handover</h5>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <SectionHeading 
                badge="How We Work"
                title="Our Systematic Approach to Excellence"
                subtitle="We separate ourselves through a rigorous engineering methodology that ensures every project meets structural standards and client budget constraints."
              />
              <div className="space-y-6">
                {[
                  { title: 'Resource Optimization', desc: 'Optimal use of material and human resources through executive-led project management.' },
                  { title: 'Quality Performance', desc: 'Maintenance of high standard in architectural beauty and structural integrity.' },
                  { title: 'Specialized Collaboration', desc: 'Nationwide professional network to handle complex multi-disciplinary engineering challenges.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-start group">
                    <div className="w-12 h-12 rounded-full border border-neutral-100 flex items-center justify-center text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all shrink-0">
                      <span className="text-sm font-bold font-mono">0{i+1}</span>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-display font-bold text-brand-primary">{item.title}</h5>
                      <p className="text-neutral-500 font-light text-sm italic">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="pt-8">
                <Link to="/contact" className="bg-brand-primary text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-xs inline-flex items-center gap-3 hover:bg-brand-accent transition-all shadow-xl shadow-brand-primary/10">
                  Request Service Consultation
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industrial supply */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-neutral-50 p-12 md:p-20 border border-neutral-100 flex flex-col md:flex-row items-center gap-12 rounded-sm shadow-sm">
            <div className="flex-1 space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent">Supply Services</span>
              <h3 className="text-3xl font-display font-bold text-brand-primary">Industrial & Hospital Equipment Supply</h3>
              <p className="text-neutral-500 font-light italic text-lg leading-relaxed">
                Beyond construction, we specialize in the reliable supply of high-grade industrial machinery and essential medical hospital equipment for large-scale facilities.
              </p>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="w-24 h-24 bg-white shadow-lg flex items-center justify-center rounded-sm">
                  <Cog className="text-brand-accent animate-spin-slow" size={32} />
                </div>
                <div className="w-24 h-24 bg-brand-primary shadow-lg flex items-center justify-center rounded-sm">
                  <Wrench className="text-white" size={32} />
                </div>
                <div className="w-24 h-24 bg-brand-accent shadow-lg flex items-center justify-center rounded-sm">
                  <Layers className="text-white" size={32} />
                </div>
                <div className="w-24 h-24 bg-white shadow-lg flex items-center justify-center rounded-sm">
                  <ClipboardList className="text-brand-primary" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
