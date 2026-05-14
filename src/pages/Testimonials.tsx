import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Quote, Star, User, Loader2 } from 'lucide-react';
import { useCMS, CMSItem } from '../hooks/useCMS';
import SEO from '../components/SEO';

export default function Testimonials() {
  const { fetchItems } = useCMS();
  const [testimonials, setTestimonials] = useState<CMSItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTestimonials = async () => {
      setLoading(true);
      const data = await fetchItems('testimonials');
      setTestimonials(data);
      setLoading(false);
    };
    loadTestimonials();
  }, []);

  return (
    <div className="bg-neutral-50 pb-24">
      <SEO title="Client Testimonials" description="Read what our clients say about Sampris Nigeria Limited engineering and construction services." />
      
      {/* Header */}
      <section className="bg-brand-primary py-24 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 text-[60vw] font-black pointer-events-none italic">
          TRUST
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            light
            badge="Wall of Trust"
            title="What Our Clients Say"
            subtitle="Real feedback from property developers, government agencies, and industrial partners across Nigeria."
          />
        </div>
      </section>

      {/* Testimonials List */}
      <section className="py-20 -mt-12">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
               <Loader2 className="animate-spin text-brand-accent mb-4" size={48} />
               <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Authenticating Reviews...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-slate-100">
               <p className="text-slate-500 italic">Testimonials will appear here shortly.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white p-10 border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 relative group"
                >
                  <Quote className="absolute top-6 right-6 text-slate-50 group-hover:text-brand-accent/10 transition-colors" size={60} />
                  
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star 
                        key={idx} 
                        size={16} 
                        className={idx < (testimonial.rating || 5) ? "fill-amber-400 text-amber-400" : "text-slate-200"} 
                      />
                    ))}
                  </div>

                  <p className="text-neutral-500 leading-relaxed font-light italic mb-8 relative z-10">
                    "{testimonial.content}"
                  </p>

                  <div className="flex items-center gap-4 border-t border-slate-50 pt-8 mt-auto">
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-brand-primary text-white font-bold">
                          {testimonial.name?.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-primary tracking-tight">{testimonial.name}</h4>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
