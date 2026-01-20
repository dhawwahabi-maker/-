
import React, { useState } from 'react';

export const AirPressureSimulation: React.FC = () => {
  const [plungerPos, setPlungerPos] = useState(0); // 0 (extended) to 100 (compressed)
  
  return (
    <div className="relative w-full h-full bg-[#020617] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] bg-[size:40px_40px]"></div>
      
      <div className="relative w-full max-w-sm flex flex-col items-center gap-12">
        {/* Syringe SVG */}
        <svg viewBox="0 0 400 200" className="w-full drop-shadow-2xl">
          {/* Syringe Body */}
          <rect x="100" y="60" width="200" height="60" rx="4" fill="rgba(255,255,255,0.05)" stroke="white" strokeOpacity="0.3" strokeWidth="3" />
          <rect x="300" y="80" width="30" height="20" rx="2" fill="rgba(255,255,255,0.2)" />
          
          {/* Finger (Tip Blocker) */}
          <g transform="translate(330, 70)">
             <path d="M0,0 Q20,0 20,20 Q20,40 0,40 Z" fill="#fca5a5" stroke="#ef4444" strokeWidth="1" />
             <text x="10" y="-10" textAnchor="middle" className="text-[10px] font-black fill-red-400">إصبع ساد</text>
          </g>

          {/* Plunger */}
          <g transform={`translateX(${plungerPos * 1.2}px)`} className="transition-transform duration-100">
             <rect x="20" y="70" width="80" height="40" rx="2" fill="#94a3b8" />
             <rect x="-20" y="85" width="40" height="10" rx="2" fill="#475569" />
             <circle cx="-25" cy="90" r="15" fill="#334155" />
          </g>

          {/* Compressed Air Visualization */}
          <rect 
            x={100 + (plungerPos * 1.2)} 
            y="65" 
            width={200 - (plungerPos * 1.2)} 
            height="50" 
            fill="rgba(59, 130, 246, 0.2)" 
            className={plungerPos > 70 ? "animate-pulse" : ""}
          />
        </svg>

        <div className="w-full max-w-xs bg-black/60 backdrop-blur-xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-4">
          <div className="flex justify-between items-center px-1">
             <span className="text-[10px] font-black text-primary uppercase tracking-widest">قوة ضغط المكبس</span>
             <span className={`text-[10px] font-bold ${plungerPos > 80 ? 'text-red-500 animate-bounce' : 'text-white'}`}>
               {plungerPos > 80 ? 'مقاومة قصوى' : `${plungerPos}%`}
             </span>
          </div>
          <input 
            type="range" 
            min="0" max="100" 
            value={plungerPos} 
            onChange={(e) => setPlungerPos(parseInt(e.target.value))} 
            className="w-full h-2 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" 
          />
          <p className="text-[10px] font-bold text-slate-400 text-center leading-tight">
            عند سد فتحة الحقنة، ينحصر الهواء في الداخل. كلما زاد الضغط، زادت مقاومة الهواء لأنه يشغل حيزاً ولا يمكنه الخروج.
          </p>
        </div>
      </div>
    </div>
  );
};
