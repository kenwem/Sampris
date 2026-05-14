import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { COMPANY_INFO, TESTIMONIALS } from '../constants';
import Hero from '../components/Hero';
import ServiceSlider from '../components/ServiceSlider';
import SectionHeading from '../components/SectionHeading';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Quote, Phone, MessageSquare, ExternalLink, Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCMS, CMSItem } from '../hooks/useCMS';
import SEO from '../components/SEO';

export default function Home() {
  const { fetchItems } = useCMS();
  const [featuredProjects, setFeaturedProjects] = useState<CMSItem[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [testimonials, setTestimonials] = useState<CMSItem[]>([]);
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const loadHomeData = async () => {
      setLoadingProjects(true);
      const data = await fetchItems('projects', []);
      setFeaturedProjects(data.slice(0, 3));
      setLoadingProjects(false);

      const testimonialsData = await fetchItems('testimonials');
      setTestimonials(testimonialsData.slice(0, 3));

      const settingsData = await fetchItems('siteSettings');
      if (settingsData && settingsData.length > 0) {
        setSiteSettings(settingsData[0]);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="bg-neutral-50">
      <SEO />
      <Hero settings={siteSettings} />

      {/* Services Mini-Slider */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background text decoration */}
        <div className="absolute top-10 right-0 text-[15vw] font-display font-black text-neutral-50 leading-none select-none pointer-events-none uppercase">
          Services
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            badge="Our Expertise"
            title="Comprehensive Engineering Solutions"
            subtitle="Diverse construction and civil engineering services tailored for infrastructure development and environmental sustainability."
          />
          <ServiceSlider />
        </div>
      </section>

      {/* Company Introduction */}
      <section className="py-12 bg-brand-primary relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-neutral-900 skew-x-12 translate-x-32" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <SectionHeading 
                light
                badge="Who We Are"
                title="Indigenous Excellence in Construction"
                subtitle={siteSettings?.site?.aboutUs || COMPANY_INFO.description}
              />
              <div className="grid grid-cols-2 gap-8 mt-8 mb-8">
                <div>
                  <h4 className="text-3xl font-display font-black text-brand-accent mb-2">2002</h4>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Year Founded</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-black text-brand-accent mb-2">100%</h4>
                  <p className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Safety Record</p>
                </div>
              </div>
              <Link 
                to="/about"
                className="inline-flex items-center gap-4 text-white font-bold uppercase tracking-widest text-[10px] group"
              >
                Learn more about our heritage
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-accent group-hover:border-brand-accent transition-all">
                  <ArrowRight size={16} />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-video lg:aspect-square rounded-sm overflow-hidden shadow-2xl relative max-h-[500px]">
                <img 
                  src={siteSettings?.hero?.introImage || "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800"} 
                  alt="Sampris Nigeria Excellence" 
                  className="w-full h-full object-cover grayscale opacity-80"
                  referrerPolicy="no-referrer"
                  onError={(e: any) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-brand-accent/10 mix-blend-multiply" />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 shadow-2xl max-w-xs hidden md:block">
                <p className="text-brand-primary font-display font-bold text-xl mb-2 italic">"Cost efficiency without compromising structural integrity."</p>
                <div className="w-12 h-1 bg-brand-accent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Project Highlights */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-neutral-100 pb-12">
            <SectionHeading 
              badge="Portfolio"
              title="Featured Projects"
              subtitle="Explore our comprehensive portfolio of landmark engineering projects across Nigeria."
            />
            <Link 
              to="/projects"
              className="bg-brand-primary text-white px-8 py-4 rounded-sm font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 transition-all hover:bg-brand-accent hover:shadow-xl group"
            >
              See All Projects
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Modern CTA / Contact */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-brand-primary rounded-sm overflow-hidden flex flex-col xl:flex-row shadow-2xl">
            <div className="flex-1 p-12 md:p-20 lg:p-24 space-y-12">
              <SectionHeading 
                light
                badge="Get Started"
                title="Ready to Build Your Vision?"
                subtitle="Request a free diagnostic and structural consultation for your next engineering project."
              />
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a 
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center justify-center gap-4 bg-brand-accent text-white px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-brand-accent/90 transition-all shadow-xl shadow-brand-accent/20"
                >
                  <Phone size={18} />
                  Call Engineering Team
                </a>
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsapp.replace(/\+/g, '').replace(/\s/g, '')}`}
                  className="flex items-center justify-center gap-4 bg-[#25D366] text-white px-8 py-5 rounded-sm font-bold uppercase tracking-widest text-xs hover:bg-[#25D366]/90 transition-all shadow-xl shadow-[#25D366]/20"
                >
                  <MessageSquare size={18} />
                  Chat on WhatsApp
                </a>
              </div>
              
              <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-8">
                <div>
                  <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-3">Our Office</h6>
                  <p className="text-sm text-white/80 leading-relaxed max-w-[200px]">{COMPANY_INFO.address}</p>
                </div>
                <div>
                  <h6 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 mb-3">Service Hours</h6>
                  <p className="text-sm text-white/80 leading-relaxed">Mon - Fri: 8am - 6pm<br />Sat: 9am - 2pm</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative bg-neutral-100 flex items-center justify-center p-8 lg:p-12">
              {/* Abstract decorative element */}
              <div className="absolute top-0 left-0 w-full h-full grayscale opacity-5 mix-blend-multiply flex items-center justify-center overflow-hidden pointer-events-none">
                <span className="text-[30vw] font-black uppercase font-display leading-none rotate-90">S</span>
              </div>
              <div className="w-full max-w-xl relative z-10 -mb-20 xl:mb-0 xl:-ml-20">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
