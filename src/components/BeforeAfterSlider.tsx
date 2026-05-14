import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Columns } from 'lucide-react';

interface BeforeAfterSliderProps {
  before: string;
  after: string;
}

export default function BeforeAfterSlider({ before, after }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing) return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const position = ((x - container.left) / container.width) * 100;
    
    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  return (
    <div 
      className="relative aspect-video w-full h-full overflow-hidden rounded-xl cursor-col-resize select-none border border-neutral-100"
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={() => setIsResizing(true)}
      onMouseUp={() => setIsResizing(false)}
      onMouseLeave={() => setIsResizing(false)}
      onTouchStart={() => setIsResizing(true)}
      onTouchEnd={() => setIsResizing(false)}
    >
      {/* After Image (Background) */}
      <img 
        src={after} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      {/* Before Image (Overlay with Clip) */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={before} 
          alt="Before" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Slider Line */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-xl z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-2xl flex items-center justify-center">
          <Columns size={16} className="text-brand-dark" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full pointer-events-none">
        Before
      </div>
      <div className="absolute top-4 right-4 z-20 bg-brand-accent backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full pointer-events-none">
        After
      </div>
    </div>
  );
}
