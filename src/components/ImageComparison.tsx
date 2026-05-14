import React, { useState, useRef, useEffect } from 'react';

interface ImageComparisonProps {
  beforeImage: string;
  afterImage: string;
}

export default function ImageComparison({ beforeImage, afterImage }: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent | MouseEvent | TouchEvent) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    setSliderPosition(Math.max(0, Math.min(100, position)));
  };

  const handleMouseDown = () => {
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', () => window.removeEventListener('mousemove', handleMove));
  };

  const handleTouchStart = () => {
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', () => window.removeEventListener('touchmove', handleMove));
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video overflow-hidden cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <img 
        src={afterImage} 
        alt="After" 
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before Image (Clipping) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="absolute inset-0 w-[calc(100vw*1)] h-full object-cover"
          style={{ width: containerRef.current?.offsetWidth }}
          draggable={false}
        />
        <div className="absolute top-4 left-4 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
          Before
        </div>
      </div>

      <div className="absolute top-4 right-4 bg-brand-accent text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1">
        After
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute inset-y-0 w-1 bg-white shadow-xl z-20 cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="w-4 h-4 border-l-2 border-r-2 border-brand-primary" />
        </div>
      </div>
    </div>
  );
}
