
import React, { useState } from 'react';

export const SoundTravelSimulation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => setIsPlaying(!isPlaying);

  return (
    <div className="relative w-full h-full bg-[#05050a] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl text-white">
      <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#135bec_1px,transparent_1px)] bg-[size:25px_25px]"></div>
      
      <div className="relative w-full h-64 flex items-center justify-between px-10">
        {/* Sound Source (Bell) */}
        <div className="flex flex-col items-center gap-3">
          <div className={`size-20 rounded-[2.5rem] bg-amber-500 flex items-center justify-center shadow-2xl shadow-amber-500/20 ${isPlaying ? 'animate-bounce' : ''}`}>
            <span className="material-symbols-outlined text-4xl">notifications_active</span>
          </div>
          <span className="text-[10px] font-black uppercase text-amber-500">مصدر الصوت</span>
        </div>

        {/* Air Particles & Waves */}
        <div className="flex-1 h-20 relative flex items-center justify-center overflow-hidden">
          {isPlaying && (
            <div className="flex gap-4">
               {[...Array(6)].map((_, i) => (
                 <div 
                  key={i} 
                  className="w-2 h-12 bg-primary/40 rounded-full animate-[ping_1.5s_infinite]"
                  style={{ animationDelay: `${i * 0.2}s` }}
                 />
               ))}
            </div>
          )}
          {/* Subtle dots for air molecules */}
          <div className="absolute inset-0 flex flex-wrap gap-4 opacity-20">
             {[...Array(40)].map((_, i) => <div key={i} className="size-1 bg-white rounded-full" />)}
          </div>
        </div>

        {/* Receiver (Ear) */}
        <div className="flex flex-col items-center gap-3">
           <div className={`size-20 rounded-[2.5rem] bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/20 ${isPlaying ? 'animate-pulse' : ''}`}>
            <span className="material-symbols-outlined text-4xl">hearing</span>
          </div>
          <span className="text-[10px] font-black uppercase text-blue-400">المستقبل</span>
        </div>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-6">
        <button 
          onClick={toggleSound}
          className={`w-full py-4 rounded-3xl font-black text-sm flex items-center justify-center gap-2 transition-all ${isPlaying ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-primary text-white shadow-xl shadow-primary/20'}`}
        >
          <span className="material-symbols-outlined">{isPlaying ? 'stop_circle' : 'play_circle'}</span>
          {isPlaying ? 'إيقاف الجرس' : 'رن الجرس'}
        </button>

        <p className="text-[10px] font-bold text-slate-400 text-center leading-relaxed">
          ينتقل الصوت في الهواء عبر اهتزاز جزيئات المادة (الهواء هنا) لتصل الموجات الصوتية من المصدر إلى الأذن.
        </p>
      </div>
    </div>
  );
};
