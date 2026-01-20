
import React, { useState } from 'react';

export const ReflectionSimulation: React.FC = () => {
  const [angle, setAngle] = useState(45);
  const cx = 200; const cy = 250; const len = 200;
  const r = (angle * Math.PI) / 180;
  
  // Laser beam coordinates
  const ix = cx - len * Math.sin(r); const iy = cy - len * Math.cos(r);
  const rx = cx + len * Math.sin(r); const ry = cy - len * Math.cos(r);

  return (
    <div className="relative w-full h-full bg-[#05050a] flex flex-col items-center justify-center overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_0.5px,transparent_0.5px)] bg-[size:20px_20px]"></div>
      
      <svg viewBox="0 0 400 400" className="w-full h-full max-h-[60vh] drop-shadow-[0_0_10px_rgba(16,185,129,0.2)]">
        {/* Mirror */}
        <rect x="40" y={cy} width="320" height="8" rx="4" fill="#94a3b8" />
        <rect x="40" y={cy + 8} width="320" height="4" fill="#475569" opacity="0.3" />
        
        {/* Incident Ray */}
        <line x1={ix} y1={iy} x2={cx} y2={cy} stroke="#ef4444" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
        <circle cx={ix} cy={iy} r="4" fill="#ef4444" />
        
        {/* Reflected Ray */}
        <line x1={cx} y1={cy} x2={rx} y2={ry} stroke="#10b981" strokeWidth="4" strokeLinecap="round" className="animate-pulse" />
        <circle cx={rx} cy={ry} r="4" fill="#10b981" />
        
        {/* Normal Line */}
        <line x1={cx} y1={cy} x2={cx} y2={cy - 150} stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="5,5" />
        
        {/* Intersection Point */}
        <circle cx={cx} cy={cy} r="6" fill="white" className="animate-ping" style={{ animationDuration: '3s' }} />
        <circle cx={cx} cy={cy} r="4" fill="white" />
        
        {/* Angles Labels */}
        <text x={cx - 40} y={cy - 20} fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">{angle}°</text>
        <text x={cx + 40} y={cy - 20} fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">{angle}°</text>
      </svg>
      
      <div className="w-full max-w-xs p-6 bg-black/60 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 mb-8 shadow-2xl">
        <div className="flex justify-between mb-3 px-1">
           <span className="text-[10px] font-black text-primary uppercase tracking-widest">تعديل زاوية الشعاع</span>
           <span className="text-[10px] font-black text-white">{angle}°</span>
        </div>
        <input 
          type="range" 
          min="5" 
          max="85" 
          value={angle} 
          onChange={(e) => setAngle(parseInt(e.target.value))} 
          className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" 
        />
        <p className="mt-4 text-[9px] font-bold text-slate-500 text-center leading-tight">
          قانون الانعكاس: زاوية السقوط تساوي دائماً زاوية الانعكاس بالنسبة للعمود المقام على السطح.
        </p>
      </div>
    </div>
  );
};
