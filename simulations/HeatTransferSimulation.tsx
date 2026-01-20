
import React, { useState, useEffect } from 'react';

export const HeatTransferSimulation: React.FC = () => {
  const [waterTemp, setWaterTemp] = useState(25);
  const [conductionLevel, setConductionLevel] = useState(0); // 0 to 1

  useEffect(() => {
    let timer: any;
    if (waterTemp > 40) {
      const speed = (waterTemp - 40) / 1000;
      timer = setInterval(() => {
        setConductionLevel(prev => Math.min(1, prev + speed));
      }, 50);
    } else {
      setConductionLevel(prev => Math.max(0, prev - 0.01));
    }
    return () => clearInterval(timer);
  }, [waterTemp]);

  return (
    <div className="relative w-full h-full bg-[#0f172a] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#135bec_1px,transparent_1px),linear-gradient(to_bottom,#135bec_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
        <svg viewBox="0 0 400 400" className="w-64 h-64 drop-shadow-2xl">
          {/* Cup */}
          <path d="M120,150 L280,150 L260,350 L140,350 Z" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
          
          {/* Hot Water */}
          <path 
            d="M130,200 L270,200 L255,340 L145,340 Z" 
            fill={waterTemp > 60 ? 'rgba(239, 68, 68, 0.4)' : 'rgba(59, 130, 246, 0.3)'} 
            className="transition-colors duration-1000"
          />
          
          {/* Steam lines if hot */}
          {waterTemp > 60 && (
            <g className="animate-pulse">
              <path d="M160,180 Q170,160 160,140" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
              <path d="M200,170 Q210,150 200,130" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
              <path d="M240,180 Q250,160 240,140" stroke="white" strokeWidth="2" fill="none" opacity="0.4" />
            </g>
          )}

          {/* Metal Spoon Handle */}
          <defs>
            <linearGradient id="spoonGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#ef4444" stopOpacity={conductionLevel} />
              <stop offset={`${conductionLevel * 100}%`} stopColor="#ef4444" stopOpacity={conductionLevel * 0.5} />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
          </defs>
          <rect x="190" y="50" width="20" height="250" rx="10" fill="url(#spoonGrad)" stroke="#475569" strokeWidth="2" />
          <circle cx="200" cy="300" r="25" fill="url(#spoonGrad)" stroke="#475569" strokeWidth="2" />

          {/* Hand Icon - Moves away as conductionLevel increases */}
          <g 
            style={{ 
              transform: `translate(${210 + (conductionLevel * 30)}px, ${70 - (conductionLevel * 40)}px) rotate(${conductionLevel * 20}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <text 
              className="material-symbols-outlined select-none" 
              fill={conductionLevel > 0.8 ? "#ef4444" : "#ffffff"} 
              fontSize="48"
              style={{ fontFamily: 'Material Symbols Outlined' }}
            >
              back_hand
            </text>
            {conductionLevel > 0.8 && (
               <g className="animate-ping">
                  <circle cx="24" cy="24" r="30" stroke="#ef4444" strokeWidth="2" fill="none" />
               </g>
            )}
          </g>
        </svg>

        {/* Labels */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
           <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase transition-colors ${conductionLevel > 0.8 ? 'bg-red-500 text-white animate-bounce' : 'bg-slate-800 text-slate-400'}`}>
             {conductionLevel > 0.8 ? 'ساخن جداً!' : 'طرف بارد'}
           </div>
        </div>
      </div>

      <div className="w-full max-w-xs bg-black/60 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-[10px] font-black text-primary uppercase">حرارة الماء</span>
          <span className="text-xl font-black text-white">{waterTemp}°C</span>
        </div>
        <input 
          type="range" 
          min="20" max="100" 
          value={waterTemp} 
          onChange={(e) => setWaterTemp(parseInt(e.target.value))} 
          className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" 
        />
        <p className="text-[10px] font-bold text-slate-400 text-center leading-tight">
          عند وضع الملعقة في ماء ساخن، تنتقل الحرارة من الجزيئات السريعة للماء إلى طرف الملعقة ثم عبر المعدن (بالتوصيل) حتى تصل ليدك. تلاحظ كيف تبتعد اليد لا إرادياً عند الشعور بالسخونة!
        </p>
      </div>
    </div>
  );
};
