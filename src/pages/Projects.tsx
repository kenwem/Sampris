import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import BeforeAfterSlider from '../components/BeforeAfterSlider';
import ProgressTimeline from '../components/ProgressTimeline';
import { cn } from '../lib/utils';
import { Filter, Search, ChevronRight, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCMS, CMSItem } from '../hooks/useCMS';
import SEO from '../components/SEO';

const categories = ['All', 'Building', 'Infrastructure', 'Renovation', 'Estate'];

export default function Projects() {
  const { fetchItems } = useCMS();
  const [projects, setProjects] = useState<CMSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      const data = await fetchItems('projects');
      setProjects(data.sort((a, b) => (a.position || 0) - (b.position || 0)));
      setLoading(false);
    };
    loadProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (project.description || '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-neutral-50 pb-24">
      <SEO title="Our Projects" description="Discover our portfolio of landmark engineering projects across Nigeria, from urban infrastructure to luxury residential developments." />
      {/* Header */}
      <section className="bg-brand-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-6 h-full">
            {[...Array(6)].map((_, i) => <div key={i} className="border-r border-white" />)}
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            light
            badge="Portfolio"
            title="Our Engineering Masterpieces"
            subtitle="Explore our diverse range of ongoing and completed projects across Nigeria, demonstrating technical precision and innovative design."
          />
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[72px] bg-white border-b border-neutral-100 z-30 py-4 shadow-sm">
        <div className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex overflow-x-auto no-scrollbar gap-2 lg:gap-3 items-center">
            <Filter size={18} className="text-neutral-400 mr-2 shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-6 py-2 h-10 rounded-full text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-all border",
                  activeCategory === cat 
                    ? "bg-brand-accent text-white border-brand-accent shadow-lg shadow-brand-accent/20" 
                    : "bg-neutral-50 text-neutral-500 border-neutral-100 hover:border-neutral-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-brand-accent transition-colors" />
            <input 
              type="text"
              placeholder="Search by project name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-6 py-3 h-12 w-full lg:w-80 bg-neutral-50 rounded-sm border border-neutral-100 focus:bg-white focus:border-brand-accent focus:outline-none transition-all text-sm font-medium"
            />
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section className="py-20 min-h-[400px]">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="animate-spin text-brand-accent mb-4" size={48} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Accessing Portfolio...</p>
             </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <div className="space-y-32">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-stretch"
                  >
                    <div className={cn("space-y-8", index % 2 !== 0 && "lg:order-2")}>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-accent">
                            {project.category}
                          </span>
                          <div className="w-8 h-[1px] bg-neutral-200" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                            {project.status}
                          </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight text-brand-primary">
                          {project.title}
                        </h2>
                      </div>

                      <p className="text-neutral-500 leading-relaxed font-light text-lg">
                        {project.description}
                      </p>

                      {/* Progress Track for any project */}
                      {project.timeline && (
                        <div className="bg-white p-8 rounded-sm shadow-sm border border-neutral-100">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-900 mb-6 flex items-center gap-3">
                            <span className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                            Construction Progress Tracking
                          </h4>
                          <ProgressTimeline stages={project.timeline} />
                        </div>
                      )}

                      {project.status === 'Ongoing' && (
                        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-brand-accent">
                          <div className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-ping" />
                          Live Development Updates
                        </div>
                      )}
                    </div>

                    <div className={cn(index % 2 !== 0 && "lg:order-1")}>
                      {project.video || project.videoUrl || project.videoLink ? (
                        <div className="h-full min-h-[400px] rounded-sm overflow-hidden shadow-2xl relative bg-black group border border-neutral-100">
                          {(() => {
                            const vSrc = project.video || project.videoUrl || project.videoLink;
                            const isFirebase = vSrc.includes('firebasestorage');
                            const isYouTube = vSrc.includes('youtube.com') || vSrc.includes('youtu.be');
                            const isVimeo = vSrc.includes('vimeo.com');

                            if (isFirebase || vSrc.endsWith('.mp4') || vSrc.endsWith('.webm')) {
                              return (
                                <video 
                                  src={vSrc} 
                                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                  controls
                                  poster={project.image}
                                />
                              );
                            }

                            let embedUrl = vSrc;
                            if (isYouTube) {
                              const id = vSrc.split('v=')[1] || vSrc.split('/').pop();
                              embedUrl = `https://www.youtube.com/embed/${id}`;
                            } else if (isVimeo) {
                              const id = vSrc.split('/').pop();
                              embedUrl = `https://player.vimeo.com/video/${id}`;
                            }

                            return (
                              <iframe 
                                src={embedUrl}
                                className="w-full h-full"
                                allowFullScreen
                              />
                            );
                          })()}
                          <div className="absolute top-4 left-4 z-10 bg-brand-accent text-white text-[8px] font-black uppercase px-3 py-1 rounded tracking-[0.2em] shadow-lg">
                            Video Showcase
                          </div>
                        </div>
                      ) : (project.category === 'Renovation' || project.beforeImage) && project.beforeImage && project.afterImage ? (
                        <div className="space-y-6">
                          <BeforeAfterSlider before={project.beforeImage} after={project.afterImage} />
                          <div className="flex justify-between items-center px-2">
                            <h6 className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">Interactive Project Slider</h6>
                            <div className="flex gap-2">
                              <div className="w-8 h-[2px] bg-neutral-200" />
                              <div className="w-2 h-[2px] bg-brand-accent" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full min-h-[400px] rounded-sm overflow-hidden shadow-2xl relative group bg-neutral-100 italic flex items-center justify-center">
                          <img 
                            src={project.image || 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800'} 
                            alt={project.title}
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                            onError={(e: any) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800';
                            }}
                          />
                          <div className="absolute inset-0 bg-brand-primary/10 group-hover:bg-transparent transition-all duration-500" />
                        </div>
                      )}

                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          )}

          {!loading && filteredProjects.length === 0 && (
            <div className="py-40 text-center space-y-4">
              <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search size={32} className="text-neutral-300" />
              </div>
              <h3 className="text-3xl font-display font-bold text-brand-primary">No Projects Found</h3>
              <p className="text-neutral-500 max-w-sm mx-auto">
                We couldn't find any projects matching your current filters. Try adjusting your search criteria.
              </p>
              <button 
                onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                className="mt-6 text-brand-accent font-bold uppercase tracking-widest text-xs border-b border-brand-accent/20 pb-1"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="container mx-auto px-4 md:px-6 pt-12">
        <div className="bg-brand-accent px-12 py-20 rounded-sm text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 skew-x-12 translate-x-32" />
          <div className="max-w-xl space-y-4 relative z-10">
            <h3 className="text-4xl font-display font-black leading-tight italic">Have a project that requires engineering expertise?</h3>
            <p className="text-white/70 font-light text-lg">Partner with Sampris Nigeria Limited for innovative and cost-efficient construction solutions.</p>
          </div>
          <Link 
            to="/contact"
            className="group bg-white text-brand-primary px-10 py-5 rounded-sm font-bold uppercase tracking-widest text-xs transition-all hover:bg-neutral-100 flex items-center gap-3 shadow-xl relative z-10"
          >
            Start Your Project
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
