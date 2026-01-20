
import React, { useState } from 'react';

export const ElectricitySimulation: React.FC = () => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  // تعريف مسارات الأسلاك لإعادة استخدامها في حركة التيار
  const upperWirePath = "M100,200 L100,100 L300,100 L300,200";
  const lowerWirePath = "M300,300 L300,350 L100,350 L100,300";

  // توليد مجموعة من النقاط المتحركة (الإلكترونات)
  const renderElectrons = (path: string, reverse: boolean = false) => {
    if (!isSwitchOn) return null;
    
    // ننشئ 5 نقاط لكل سلك ببدء تشغيل متفاوت لخلق تدفق مستمر
    return [0, 0.4, 0.8, 1.2, 1.6].map((delay, i) => (
      <circle key={i} r="3" fill="#fbbf24" className="shadow-[0_0_8px_#fbbf24]">
        <animateMotion
          path={path}
          dur="2s"
          begin={`${delay}s`}
          repeatCount="indefinite"
          keyPoints={reverse ? "1;0" : "0;1"}
          keyTimes="0;1"
        />
      </circle>
    ));
  };

  return (
    <div className="relative w-full h-full bg-[#05070a] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#135bec_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative w-full max-w-sm aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Wires - Background Paths */}
          <path 
            d={upperWirePath} 
            fill="none" 
            stroke="#334155" 
            strokeWidth="8" 
            strokeLinecap="round"
          />
          <path 
            d={lowerWirePath} 
            fill="none" 
            stroke="#334155" 
            strokeWidth="8" 
            strokeLinecap="round"
          />

          {/* Active Wire Glow when switch is ON */}
          {isSwitchOn && (
            <>
              <path 
                d={upperWirePath} 
                fill="none" 
                stroke="#fbbf24" 
                strokeWidth="2" 
                strokeLinecap="round"
                className="opacity-20 blur-[1px]"
              />
              <path 
                d={lowerWirePath} 
                fill="none" 
                stroke="#fbbf24" 
                strokeWidth="2" 
                strokeLinecap="round"
                className="opacity-20 blur-[1px]"
              />
            </>
          )}

          {/* Electrons Animation (The moving points) */}
          {renderElectrons(upperWirePath, true)}
          {renderElectrons(lowerWirePath, true)}

          {/* Battery */}
          <rect x="260" y="200" width="80" height="100" rx="8" fill="#1e293b" stroke="#475569" strokeWidth="2" />
          <rect x="280" y="190" width="40" height="10" rx="2" fill="#94a3b8" />
          <text x="300" y="255" fill="white" fontSize="24" fontWeight="bold" textAnchor="middle" style={{ direction: 'ltr' }}>1.5V</text>
          <text x="300" y="225" fill="#ef4444" fontSize="20" fontWeight="bold" textAnchor="middle">+</text>
          <text x="300" y="290" fill="#3b82f6" fontSize="20" fontWeight="bold" textAnchor="middle">-</text>

          {/* Bulb */}
          <g transform="translate(60, 200)">
            {/* Light Glow Area */}
            {isSwitchOn && (
              <circle cx="40" cy="50" r="60" fill="url(#bulbGlow)" className="animate-pulse" />
            )}
            <defs>
              <radialGradient id="bulbGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            <circle cx="40" cy="50" r="45" fill={isSwitchOn ? "rgba(251, 191, 36, 0.1)" : "rgba(255,255,255,0.05)"} />
            <path 
              d="M40,10 Q65,10 65,50 Q65,80 40,90 Q15,80 15,50 Q15,10 40,10" 
              fill={isSwitchOn ? "#fbbf24" : "#475569"} 
              stroke={isSwitchOn ? "#fff" : "none"}
              strokeWidth="0.5"
              className="transition-colors duration-300"
            />
            
            {/* Filaments/Light rays */}
            {isSwitchOn && (
              <g className="animate-pulse">
                <line x1="40" y1="0" x2="40" y2="-25" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                <line x1="80" y1="20" x2="105" y2="-5" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                <line x1="0" y1="20" x2="-25" y2="-5" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                <line x1="85" y1="50" x2="110" y2="50" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
                <line x1="-5" y1="50" x2="-30" y2="50" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
              </g>
            )}
            <rect x="25" y="85" width="30" height="20" fill="#94a3b8" rx="2" />
          </g>

          {/* Interactive Switch */}
          <g 
            className="cursor-pointer group" 
            onClick={() => setIsSwitchOn(!isSwitchOn)}
            transform="translate(180, 340)"
          >
            {/* Switch Contacts */}
            <circle cx="0" cy="10" r="8" fill="#475569" />
            <circle cx="40" cy="10" r="8" fill="#475569" />
            
            {/* Moving Switch Arm */}
            <line 
              x1="0" y1="10" 
              x2={isSwitchOn ? "40" : "30"} 
              y2={isSwitchOn ? "10" : "-25"} 
              stroke="#fbbf24" 
              strokeWidth="6" 
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
            
            {/* Switch Label Box */}
            <rect x="-40" y="30" width="120" height="36" rx="18" fill="rgba(255,255,255,0.05)" className="group-hover:fill-white/10 transition-colors" />
            <text x="20" y="53" fill="white" fontSize="14" fontWeight="black" textAnchor="middle" className="select-none">
              {isSwitchOn ? 'افتح الدائرة' : 'اغلق الدائرة'}
            </text>
          </g>
        </svg>
      </div>

      <div className="mt-6 w-full max-w-xs bg-black/60 backdrop-blur-2xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl text-center mb-4 transition-all duration-500">
        <div className={`inline-flex items-center gap-2 mb-2 px-4 py-1.5 rounded-full ${isSwitchOn ? 'bg-yellow-500/20 text-yellow-400' : 'bg-slate-800 text-slate-500'}`}>
          <span className="material-symbols-outlined text-[18px]">{isSwitchOn ? 'bolt' : 'sync_disabled'}</span>
          <span className="text-sm font-black uppercase tracking-tight">
            {isSwitchOn ? 'تيار كهربائي نشط' : 'لا يوجد تيار'}
          </span>
        </div>
        <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
          عند إغلاق القاطع، تتدفق الإلكترونات (النقاط الصفراء) عبر الأسلاك من القطب السالب إلى القطب الموجب، مما يسبب توهج المصباح.
        </p>
      </div>
    </div>
  );
};
