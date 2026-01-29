
import React, { useState } from 'react';

export const ShadowSimulation: React.FC = () => {
  const [sourceWidth, setSourceWidth] = useState(40);
  const [objectPos, setObjectPos] = useState(150);
  const objectRadius = 25;
  
  const sourceX = 20;
  const screenX = 350;
  const centerY = 150;

  const distSO = objectPos - sourceX;
  const distOS = screenX - objectPos;

  const umbraRadius = Math.max(0, objectRadius - (sourceWidth / 2 - objectRadius) * (distOS / distSO));
  const penumbraRadius = objectRadius + (sourceWidth / 2 + objectRadius) * (distOS / distSO);

  return (
    <div className="relative w-full h-full bg-indigo-50 flex flex-col items-center justify-center overflow-hidden rounded-t-3xl">
      {/* Light Grid Background */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#4f46e5_1px,transparent_1px),linear-gradient(to_bottom,#4f46e5_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="relative w-full max-w-sm aspect-video bg-white/60 backdrop-blur-sm rounded-3xl border border-indigo-100 overflow-hidden p-4 mb-4 shadow-sm">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <radialGradient id="lightSourceGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Penumbra Rays - Subtle amber */}
          <line x1={sourceX} y1={centerY - sourceWidth/2} x2={screenX} y2={centerY + penumbraRadius} stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="4,2" />
          <line x1={sourceX} y1={centerY + sourceWidth/2} x2={screenX} y2={centerY - penumbraRadius} stroke="rgba(245, 158, 11, 0.2)" strokeWidth="1" strokeDasharray="4,2" />
          
          {/* Umbra Rays - Stronger amber */}
          <line x1={sourceX} y1={centerY - sourceWidth/2} x2={screenX} y2={centerY - umbraRadius} stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
          <line x1={sourceX} y1={centerY + sourceWidth/2} x2={screenX} y2={centerY + umbraRadius} stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1.5" />
          
          {/* Screen - Vertical Line */}
          <line x1={screenX} y1="20" x2={screenX} y2="280" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
          
          {/* Source - The Lamp */}
          <rect x={sourceX - 10} y={centerY - sourceWidth/2} width="10" height={sourceWidth} fill="#fbbf24" rx="2" className="shadow-lg" />
          <circle cx={sourceX - 5} cy={centerY} r={sourceWidth/1.2} fill="url(#lightSourceGlow)" className="animate-pulse" />
          
          {/* Object - Dark Blue instead of black */}
          <circle cx={objectPos} cy={centerY} r={objectRadius} fill="#1e293b" stroke="#475569" strokeWidth="2" />
          
          {/* Screen Shadow Visualization (On the vertical line) */}
          <rect x={screenX} y={centerY - penumbraRadius} width="8" height={penumbraRadius * 2} fill="rgba(30, 41, 59, 0.15)" rx="2" />
          <rect x={screenX} y={centerY - umbraRadius} width="8" height={umbraRadius * 2} fill="#1e293b" rx="2" />
        </svg>
      </div>

      {/* The Shadow "Surface" View */}
      <div className="relative w-44 h-44 bg-slate-200 border-4 border-white rounded-[2.5rem] overflow-hidden shadow-xl flex items-center justify-center mb-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.05)_100%)]"></div>
        {/* Penumbra (Semi-shadow) */}
        <div className="absolute bg-slate-400/40 rounded-full transition-all duration-300" style={{ width: `${penumbraRadius * 2.8}px`, height: `${penumbraRadius * 2.8}px`, filter: 'blur(10px)' }} />
        {/* Umbra (Total shadow) */}
        <div className="absolute bg-slate-900 rounded-full transition-all duration-300 shadow-lg" style={{ width: `${umbraRadius * 2.8}px`, height: `${umbraRadius * 2.8}px` }} />
      </div>

      {/* Control Panel - Matches main app theme */}
      <div className="w-full max-w-xs bg-white/80 backdrop-blur-xl p-6 rounded-[2.5rem] border border-indigo-100 space-y-5 mb-4 shadow-lg">
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
             <span className="text-[10px] font-black text-primary uppercase tracking-widest">موقع الكرة</span>
             <span className="text-[10px] text-slate-500 font-bold">{Math.round(((objectPos-80)/200)*100)}%</span>
          </div>
          <input 
            type="range" 
            min="80" max="280" 
            value={objectPos} 
            onChange={(e) => setObjectPos(parseInt(e.target.value))} 
            className="w-full h-1.5 bg-indigo-100 rounded-full appearance-none accent-primary cursor-pointer transition-all" 
          />
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
             <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">حجم مصدر الضوء</span>
             <span className="text-[10px] text-slate-500 font-bold">{sourceWidth}px</span>
          </div>
          <input 
            type="range" 
            min="2" max="100" 
            value={sourceWidth} 
            onChange={(e) => setSourceWidth(parseInt(e.target.value))} 
            className="w-full h-1.5 bg-amber-100 rounded-full appearance-none accent-amber-500 cursor-pointer transition-all" 
          />
        </div>
        <div className="pt-2">
          <p className="text-[9px] font-bold text-slate-400 text-center leading-relaxed">
            حرك الكرة أو غير حجم الضوء لتلاحظ كيف يتغير الظل التام (المنطقة السوداء) والظل الناقص (المنطقة الرمادية).
          </p>
        </div>
      </div>
    </div>
  );
};
