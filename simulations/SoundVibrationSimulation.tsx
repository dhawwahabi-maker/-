
import React, { useState } from 'react';

export const SoundVibrationSimulation: React.FC = () => {
  const [isVibrating, setIsVibrating] = useState(false);
  
  const triggerVibration = () => {
    if (isVibrating) return;
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 2000);
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0f] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#8b5cf6_1px,transparent_1px),linear-gradient(to_bottom,#8b5cf6_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="relative w-full max-w-sm flex flex-col items-center">
        {/* Table Surface */}
        <div className="absolute bottom-20 w-[150%] h-40 bg-slate-900 border-t-4 border-slate-800 rounded-full blur-[2px] opacity-50"></div>
        
        {/* The Ruler */}
        <div 
          onClick={triggerVibration}
          className={`relative w-64 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg shadow-2xl cursor-pointer origin-left transition-transform duration-75 flex items-center justify-between px-4 z-20 ${isVibrating ? 'animate-[bounce_0.1s_infinite]' : ''}`}
          style={{ transform: isVibrating ? 'rotate(5deg)' : 'rotate(0deg)' }}
        >
          <div className="flex gap-2">
            {[...Array(10)].map((_, i) => <div key={i} className="w-0.5 h-3 bg-white/30" />)}
          </div>
          <span className="text-[10px] font-black text-white/70 tracking-tighter">مسطرة المختبر الذكي</span>
        </div>

        {/* Sound Waves Animation */}
        {isVibrating && (
          <div className="absolute top-[-40px] flex flex-col items-center gap-2">
             <div className="w-12 h-12 rounded-full border-2 border-primary/40 animate-ping"></div>
             <div className="w-20 h-20 rounded-full border-2 border-primary/20 animate-ping delay-75"></div>
          </div>
        )}

        <button 
          onClick={triggerVibration}
          className="mt-20 z-30 bg-primary hover:bg-primary/80 text-white px-8 py-4 rounded-[2rem] font-black text-sm shadow-xl shadow-primary/20 active:scale-95 transition-all"
        >
          اضرب المسطرة بقوة
        </button>
      </div>

      <div className="mt-8 p-4 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 w-full max-w-xs text-center">
        <p className="text-[10px] font-bold text-slate-400 leading-tight">
          الصوت ينشأ عن اهتزاز الأجسام. عندما تهتز المسطرة، فإنها تحرك جزيئات الهواء من حولها لينتقل الصوت إلى أذنك.
        </p>
      </div>
    </div>
  );
};
