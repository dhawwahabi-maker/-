
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
    <div className="relative w-full h-full bg-[#05070a] flex flex-col items-center justify-center overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#135bec_1px,transparent_1px),linear-gradient(to_bottom,#135bec_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="relative w-full max-w-sm aspect-video bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-4 mb-4">
        <svg viewBox="0 0 400 300" className="w-full h-full">
          <defs>
            <radialGradient id="lightSourceGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
            </radialGradient>
          </defs>
          
          {/* Penumbra Rays */}
          <line x1={sourceX} y1={centerY - sourceWidth/2} x2={screenX} y2={centerY + penumbraRadius} stroke="rgba(251, 191, 36, 0.15)" strokeWidth="1" />
          <line x1={sourceX} y1={centerY + sourceWidth/2} x2={screenX} y2={centerY - penumbraRadius} stroke="rgba(251, 191, 36, 0.15)" strokeWidth="1" />
          
          {/* Umbra Rays */}
          <line x1={sourceX} y1={centerY - sourceWidth/2} x2={screenX} y2={centerY - umbraRadius} stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
          <line x1={sourceX} y1={centerY + sourceWidth/2} x2={screenX} y2={centerY + umbraRadius} stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1" />
          
          {/* Screen */}
          <line x1={screenX} y1="20" x2={screenX} y2="280" stroke="#475569" strokeWidth="4" />
          
          {/* Source */}
          <rect x={sourceX - 10} y={centerY - sourceWidth/2} width="10" height={sourceWidth} fill="#fbbf24" rx="2" />
          <circle cx={sourceX - 5} cy={centerY} r={sourceWidth/1.5} fill="url(#lightSourceGlow)" />
          
          {/* Object */}
          <circle cx={objectPos} cy={centerY} r={objectRadius} fill="#1e293b" stroke="#334155" strokeWidth="2" />
          
          {/* Screen Shades */}
          <rect x={screenX} y={centerY - penumbraRadius} width="10" height={penumbraRadius * 2} fill="rgba(255,255,255,0.05)" />
          <rect x={screenX} y={centerY - umbraRadius} width="10" height={umbraRadius * 2} fill="#000" />
        </svg>
      </div>

      <div className="relative w-48 h-48 bg-[#111827] border-4 border-slate-800 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center mb-6">
        <div className="absolute bg-black/40 rounded-full transition-all duration-300" style={{ width: `${penumbraRadius * 2.5}px`, height: `${penumbraRadius * 2.5}px`, filter: 'blur(8px)' }} />
        <div className="absolute bg-black rounded-full transition-all duration-300" style={{ width: `${umbraRadius * 2.5}px`, height: `${umbraRadius * 2.5}px` }} />
      </div>

      <div className="w-full max-w-xs bg-black/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 space-y-4 mb-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
             <span className="text-[10px] font-black text-primary uppercase">مكان الكرة</span>
             <span className="text-[10px] text-slate-500 font-bold">{objectPos}px</span>
          </div>
          <input type="range" min="80" max="280" value={objectPos} onChange={(e) => setObjectPos(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center px-1">
             <span className="text-[10px] font-black text-amber-500 uppercase">حجم مصدر الضوء</span>
             <span className="text-[10px] text-slate-500 font-bold">{sourceWidth}px</span>
          </div>
          <input type="range" min="2" max="100" value={sourceWidth} onChange={(e) => setSourceWidth(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-amber-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};
