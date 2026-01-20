
import React, { useState } from 'react';

export const FloatingSimulation: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<'none' | 'wood' | 'nail' | 'ball'>('none');
  
  const items = [
    { id: 'wood', name: 'خشب', icon: 'deck', color: '#854d0e', density: 0.6 },
    { id: 'nail', name: 'مسمار', icon: 'architecture', color: '#475569', density: 7.8 },
    { id: 'ball', name: 'كرة', icon: 'sports_basketball', color: '#ea580c', density: 0.2 }
  ];

  return (
    <div className="relative w-full h-full bg-[#0a192f] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="relative w-full max-w-sm aspect-square flex flex-col items-center">
        {/* The Tank */}
        <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          
          {/* Glass Tank */}
          <path d="M60,100 L340,100 L310,380 L90,380 Z" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
          
          {/* Water */}
          <path d="M75,220 L325,220 L305,370 L95,370 Z" fill="url(#waterGrad)" />
          
          {/* Surface ripples */}
          <path d="M75,220 Q200,210 325,220" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" className="animate-pulse" />

          {/* Placed Item Animation */}
          {selectedItem !== 'none' && (
            <g 
              className="transition-all duration-[2000ms] ease-out" 
              style={{ transform: `translate(200px, ${selectedItem === 'nail' ? '340px' : '210px'})` }}
            >
              <circle r="30" fill={items.find(i => i.id === selectedItem)?.color} stroke="white" strokeWidth="2" />
              <text y="5" textAnchor="middle" fill="white" className="material-symbols-outlined" style={{ fontSize: '30px', fontFamily: 'Material Symbols Outlined' }}>
                {items.find(i => i.id === selectedItem)?.icon}
              </text>
            </g>
          )}
        </svg>

        <div className="absolute bottom-10 w-full px-6 grid grid-cols-3 gap-3 z-30">
          {items.map(item => (
            <button 
              key={item.id}
              onClick={() => setSelectedItem(item.id as any)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${selectedItem === item.id ? 'bg-primary border-primary shadow-lg scale-105 text-white' : 'bg-white/10 border-white/10 text-slate-300 hover:bg-white/20'}`}
            >
              <span className="material-symbols-outlined mb-1">{item.icon}</span>
              <span className="text-[10px] font-bold">{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 p-4 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 w-full max-w-xs text-center">
        <p className="text-[11px] font-bold text-slate-300 leading-relaxed">
          {selectedItem === 'none' ? 'اختر جسماً لوضعه في الماء' : 
           selectedItem === 'nail' ? 'المسمار يغوص لأن كثافة الحديد أكبر من كثافة الماء.' : 
           'الجسم يطفو لأن كثافته أقل من كثافة الماء.'}
        </p>
        {selectedItem !== 'none' && (
          <button onClick={() => setSelectedItem('none')} className="mt-2 text-[10px] text-primary font-black uppercase underline">إعادة التجربة</button>
        )}
      </div>
    </div>
  );
};
