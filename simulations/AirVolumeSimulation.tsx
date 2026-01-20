
import React, { useState } from 'react';

export const AirVolumeSimulation: React.FC = () => {
  const [depth, setDepth] = useState(0); // 0 to 100

  return (
    <div className="relative w-full h-full bg-[#0f172a] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:100%_40px]"></div>
      
      <div className="relative w-full max-w-[280px] h-[350px]">
        <svg viewBox="0 0 300 400" className="w-full h-full">
          {/* Water Container */}
          <path d="M40,150 L260,150 L240,380 L60,380 Z" fill="rgba(255,255,255,0.05)" stroke="white" strokeOpacity="0.2" strokeWidth="4" />
          
          {/* Water */}
          <path d="M50,200 L250,200 L235,370 L65,370 Z" fill="rgba(59, 130, 246, 0.5)" />
          
          {/* Glass and Napkin Group */}
          <g style={{ transform: `translateY(${depth * 1.5}px)`, transition: 'transform 0.1s linear' }}>
            {/* The Inverted Glass */}
            <path d="M100,100 L200,100 L180,20 L120,20 Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="2" />
            
            {/* The Napkin (at the top/base of the glass) */}
            <rect x="130" y="30" width="40" height="20" rx="4" fill="white" className={depth > 80 ? "animate-pulse" : ""} />
            
            {/* Trapped Air Bubble Visualization */}
            <path d="M105,100 L195,100 L180,30 L120,30 Z" fill="rgba(255,255,255,0.05)" />
          </g>
        </svg>

        <div className="absolute inset-x-0 bottom-[-20px] bg-black/60 backdrop-blur-xl p-4 rounded-3xl border border-white/10 text-center space-y-3">
          <span className="text-[10px] font-black text-primary uppercase block">تحريك الكأس لأسفل</span>
          <input 
            type="range" 
            min="0" max="100" 
            value={depth} 
            onChange={(e) => setDepth(parseInt(e.target.value))} 
            className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" 
          />
          <p className="text-[9px] font-bold text-slate-400 leading-tight">
            لاحظ كيف يمنع الهواء الموجود داخل الكأس دخول الماء، مما يحافظ على جفاف المنديل.
          </p>
        </div>
      </div>
    </div>
  );
};
