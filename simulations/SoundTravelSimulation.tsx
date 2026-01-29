
import React, { useState, useCallback, useEffect, useRef } from 'react';

export const SoundTravelSimulation: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRinging, setIsRinging] = useState(false); // للحركة البصرية المتزامنة مع كل رنة
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBellSound = useCallback(() => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      
      const audioCtx = audioCtxRef.current;
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      const now = audioCtx.currentTime;
      // ترددات الجرس المعدني (تردد أساسي + توافقيات غير نغمية قليلاً)
      const frequencies = [880, 1100, 1320, 1760]; 
      
      frequencies.forEach((f, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        
        // غلاف الصوت (Envelope)
        const vol = i === 0 ? 0.3 : 0.1;
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(vol, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(now);
        osc.stop(now + 1.2);
      });

      // تفعيل التأثير البصري
      setIsRinging(true);
      setTimeout(() => setIsRinging(false), 500);

    } catch (e) {
      console.error("خطأ في تشغيل الصوت:", e);
    }
  }, []);

  // التحكم في التكرار
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      playBellSound();
      interval = setInterval(playBellSound, 1200);
    }
    return () => {
      if (interval) clearInterval(interval);
      setIsRinging(false);
    };
  }, [isPlaying, playBellSound]);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="relative w-full h-full bg-[#05050a] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl text-white">
      {/* شبكة خلفية متحركة عند الرنين */}
      <div className={`absolute inset-0 opacity-10 transition-opacity duration-500 ${isRinging ? 'opacity-20' : 'opacity-5'} bg-[radial-gradient(#3b82f6_1px,transparent_1px)] bg-[size:30px_30px]`}></div>
      
      <div className="relative w-full h-64 flex items-center justify-between px-10">
        {/* Bell - Source */}
        <div className="flex flex-col items-center gap-4 z-10">
          <div 
            className={`size-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-150 border-2
              ${isRinging ? 'bg-amber-400 border-amber-300 scale-110 shadow-amber-500/50' : 'bg-amber-600 border-amber-700/50 shadow-amber-900/20'}
            `}
          >
            <span className={`material-symbols-outlined text-5xl transition-transform ${isRinging ? 'rotate-12' : 'rotate-0'}`}>
              {isPlaying ? 'notifications_active' : 'notifications'}
            </span>
            
            {/* Visual Rings (Waves) */}
            {isRinging && (
              <>
                <div className="absolute inset-0 rounded-[2.5rem] border-4 border-amber-400 animate-ping opacity-40"></div>
                <div className="absolute inset-[-20px] rounded-[3rem] border-2 border-amber-400/30 animate-pulse"></div>
              </>
            )}
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full">الجرس</span>
        </div>

        {/* Medium (Air Particles) */}
        <div className="flex-1 h-32 relative flex items-center justify-center">
          <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-4 opacity-20">
             {[...Array(40)].map((_, i) => (
               <div 
                key={i} 
                className={`size-1.5 bg-blue-400 rounded-full transition-transform duration-300 ${isRinging ? 'scale-150 translate-x-1' : 'scale-100'}`} 
               />
             ))}
          </div>
          
          {/* Traveling Wave Pulse */}
          {isRinging && (
            <div className="absolute inset-y-0 left-0 w-full flex items-center pointer-events-none">
              <div className="h-full w-20 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent animate-[slideRight_1s_linear_infinite]"></div>
            </div>
          )}
        </div>

        {/* Ear - Receiver */}
        <div className="flex flex-col items-center gap-4 z-10">
           <div 
            className={`size-24 rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all duration-500 border-2
              ${isRinging ? 'bg-blue-500 border-blue-400 scale-105 shadow-blue-500/40' : 'bg-slate-800 border-slate-700 shadow-black/20'}
            `}
           >
            <span className={`material-symbols-outlined text-5xl ${isRinging ? 'animate-pulse text-white' : 'text-slate-500'}`}>
              hearing
            </span>
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">الأذن</span>
        </div>
      </div>

      <div className="w-full max-w-xs flex flex-col items-center gap-6 z-20">
        <button 
          onClick={toggleSound}
          className={`w-full py-5 rounded-[2rem] font-black text-base flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl
            ${isPlaying 
              ? 'bg-red-500 text-white shadow-red-500/30 hover:bg-red-600' 
              : 'bg-primary text-white shadow-primary/30 hover:bg-primary/90'}
          `}
        >
          <span className="material-symbols-outlined text-2xl">
            {isPlaying ? 'stop_circle' : 'notifications_active'}
          </span>
          {isPlaying ? 'إيقاف الرنين' : 'رن الجرس الآن'}
        </button>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 p-5 rounded-3xl">
          <p className="text-[11px] font-bold text-slate-300 text-center leading-relaxed">
            <span className="text-primary block mb-1">كيف ينتقل الصوت؟</span>
            عندما يهتز الجرس، فإنه يدفع جزيئات الهواء المجاورة له، فتنتقل هذه الاهتزازات من جزيء إلى آخر حتى تصل إلى أذنك.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes slideRight {
          from { transform: translateX(-100%); }
          to { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};
