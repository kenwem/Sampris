import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from '../components/SectionHeading';
import { Maximize2, X, ChevronLeft, ChevronRight, Play, Loader2, Video } from 'lucide-react';
import { useCMS, CMSItem } from '../hooks/useCMS';
import { cn } from '../lib/utils';
import SEO from '../components/SEO';

const VideoPlayer = ({ src, type }: { src: string; type: 'file' | 'link' }) => {
  if (type === 'link') {
    // Basic YouTube/Vimeo embed detection
    let embedUrl = src;
    if (src.includes('youtube.com') || src.includes('youtu.be')) {
      const id = src.split('v=')[1] || src.split('/').pop();
      embedUrl = `https://www.youtube.com/embed/${id}`;
    } else if (src.includes('vimeo.com')) {
      const id = src.split('/').pop();
      embedUrl = `https://player.vimeo.com/video/${id}`;
    }
    
    return (
      <iframe 
        src={embedUrl}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }
  
  return (
    <video src={src} className="w-full h-full" controls autoPlay />
  );
};

export default function Gallery() {
  const { fetchItems } = useCMS();
  const [items, setItems] = useState<CMSItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    const loadGallery = async () => {
      setLoading(true);
      const data = await fetchItems('gallery');
      setItems(data.sort((a, b) => (a.position || 0) - (b.position || 0)));
      setLoading(false);
    };
    loadGallery();
  }, []);

  const selectedItem = selectedIdx !== null ? items[selectedIdx] : null;

  return (
    <div className="bg-neutral-50 pb-24">
      <SEO title="Project Gallery" description="Visual documentation of Sampris Nigeria Limited's engineering and construction excellence." />
      {/* Header */}
      <section className="bg-brand-primary py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
           <div className="flex flex-wrap gap-4 rotate-12 -translate-x-20">
             {[...Array(20)].map((_, i) => <div key={i} className="w-20 h-20 border border-white" />)}
           </div>
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <SectionHeading 
            light
            badge="Visual Records"
            title="Project Gallery"
            subtitle="A comprehensive visual archive of our construction milestones, equipment deployment, and architectural achievements."
          />
        </div>
      </section>

      {/* Grid */}
      <section className="py-20 min-h-[500px]">
        <div className="container mx-auto px-4 md:px-6">
          {loading ? (
             <div className="flex flex-col items-center justify-center py-40">
                <Loader2 className="animate-spin text-brand-accent mb-4" size={48} />
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Visual Assets...</p>
             </div>
          ) : (
            <div className="columns-1 md:columns-2 lg:columns-4 gap-4 space-y-4">
              {items.map((img, i) => {
                const videoSrc = img.video || img.videoUrl || img.videoLink;
                const isVideo = !!videoSrc;
                return (
                  <motion.div
                    key={img.id || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedIdx(i)}
                    className="relative group cursor-zoom-in rounded-sm overflow-hidden bg-neutral-900 border border-neutral-100 mb-4"
                  >
                    <img 
                      src={img.imageUrl || img.image} 
                      alt={img.title}
                      className="w-full h-auto object-cover transition-all duration-700 group-hover:scale-110"
                      referrerPolicy="no-referrer"
                      onError={(e: any) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?q=80&w=800';
                      }}
                    />

                    
                    {/* Video Indicator */}
                    {isVideo && (
                      <div className="absolute top-4 right-4 z-10 w-10 h-10 bg-brand-accent/90 rounded-full flex items-center justify-center text-white shadow-xl">
                        <Play size={16} fill="white" />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-brand-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-brand-accent">{img.category}</span>
                          <h4 className="text-white font-display font-medium text-sm">{img.title}</h4>
                        </div>
                        <Maximize2 size={16} className="text-white/60" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-brand-primary flex items-center justify-center p-4 md:p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-brand-dark/95 backdrop-blur-sm" onClick={() => setSelectedIdx(null)} />
            
            <button 
              onClick={() => setSelectedIdx(null)}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors z-[110]"
            >
              <X size={32} />
            </button>

            <div className="relative w-full max-w-6xl aspect-video bg-neutral-900 shadow-2xl flex items-center justify-center overflow-hidden rounded-sm border border-white/5 z-[105]">
              {selectedItem.video || selectedItem.videoUrl || selectedItem.videoLink ? (
                <VideoPlayer 
                  src={selectedItem.video || selectedItem.videoUrl || selectedItem.videoLink} 
                  type={(selectedItem.video || selectedItem.videoUrl)?.includes('firebasestorage') ? 'file' : 'link'} 
                />
              ) : (
                <img 
                  src={selectedItem.imageUrl || selectedItem.image} 
                  className="max-w-full max-h-full object-contain"
                  alt={selectedItem.title}
                />
              )}
              
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                   <div className="flex items-center gap-3">
                     <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-brand-accent">{selectedItem.category}</span>
                     {(selectedItem.video || selectedItem.videoUrl || selectedItem.videoLink) && (
                       <span className="bg-brand-accent text-white text-[8px] font-black uppercase px-2 py-0.5 rounded tracking-widest">Video Project</span>
                     )}
                   </div>
                   <h2 className="text-2xl md:text-4xl font-display font-bold text-white tracking-tight leading-none">{selectedItem.title}</h2>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedIdx((prev) => (prev! - 1 + items.length) % items.length); }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setSelectedIdx((prev) => (prev! + 1) % items.length); }}
                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
