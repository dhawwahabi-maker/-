
import React, { useState, useEffect, useRef } from 'react';

export const EvaporationSimulation: React.FC = () => {
  const [temperature, setTemperature] = useState(25);
  const [waterLevel, setWaterLevel] = useState(100); // Percentage
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const steamParticles = useRef<any[]>([]);
  const bubbles = useRef<any[]>([]);

  useEffect(() => {
    // Initialize steam particles
    steamParticles.current = Array.from({ length: 60 }).map(() => ({
      x: 0, y: 0, vx: 0, vy: 0, opacity: 0, size: Math.random() * 12 + 5
    }));

    // Initialize boiling bubbles
    bubbles.current = Array.from({ length: 15 }).map(() => ({
      x: 0, y: 0, vy: 0, active: false, size: Math.random() * 4 + 2
    }));

    let raf: number;
    const ctx = canvasRef.current?.getContext('2d');
    
    const update = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, 300, 400);

      const beakerX = 70, beakerY = 100, beakerW = 160, beakerH = 180;
      const currentH = (beakerH - 20) * (waterLevel / 100);
      const waterSurfaceY = beakerY + beakerH - currentH;

      // Draw Beaker
      ctx.beginPath();
      ctx.moveTo(beakerX, beakerY);
      ctx.lineTo(beakerX, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY + beakerH);
      ctx.lineTo(beakerX + beakerW, beakerY);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Draw Water
      if (waterLevel > 0) {
        const isBoiling = temperature >= 100;
        ctx.fillStyle = isBoiling ? 'rgba(0, 160, 255, 0.5)' : 'rgba(0, 150, 255, 0.4)';
        ctx.fillRect(beakerX + 5, waterSurfaceY, beakerW - 10, currentH - 5);
        
        // Water surface line with ripples if boiling
        ctx.beginPath();
        if (isBoiling) {
          ctx.moveTo(beakerX + 5, waterSurfaceY);
          for (let x = beakerX + 5; x <= beakerX + beakerW - 5; x += 10) {
            ctx.lineTo(x, waterSurfaceY + Math.sin(Date.now() * 0.01 + x) * 2);
          }
        } else {
          ctx.moveTo(beakerX + 5, waterSurfaceY);
          ctx.lineTo(beakerX + beakerW - 5, waterSurfaceY);
        }
        ctx.strokeStyle = 'rgba(255,255,255,0.6)';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Boiling Bubbles logic
        if (temperature >= 95) {
          bubbles.current.forEach(b => {
            if (!b.active && Math.random() < (temperature >= 100 ? 0.3 : 0.05)) {
              b.active = true;
              b.x = beakerX + 15 + Math.random() * (beakerW - 30);
              b.y = beakerY + beakerH - 10;
              b.vy = -(Math.random() * 2 + 1);
            }
            if (b.active) {
              b.y += b.vy;
              ctx.beginPath();
              ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
              ctx.strokeStyle = 'rgba(255,255,255,0.4)';
              ctx.stroke();
              if (b.y < waterSurfaceY) b.active = false;
            }
          });
        }
      }

      // Steam Logic (Enhanced for 100C+)
      if (temperature > 40 && waterLevel > 0) {
        const baseIntensity = temperature >= 100 ? 0.8 : (temperature - 40) / 100;
        
        steamParticles.current.forEach(p => {
          if (p.opacity <= 0 && Math.random() < baseIntensity * (temperature >= 100 ? 0.4 : 0.1)) {
            p.opacity = temperature >= 100 ? Math.random() * 0.8 + 0.2 : Math.random() * 0.4 + 0.1;
            p.x = beakerX + Math.random() * beakerW;
            p.y = waterSurfaceY;
            p.vx = (Math.random() - 0.5) * (temperature >= 100 ? 3 : 1);
            p.vy = -(Math.random() * 3 + 1) * (temperature >= 100 ? 1.5 : 1);
          }
          if (p.opacity > 0) {
            p.x += p.vx;
            p.y += p.vy;
            p.opacity -= temperature >= 100 ? 0.003 : 0.005; 
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
          }
        });
      }

      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);

    const interval = setInterval(() => {
      if (waterLevel > 0) {
        if (temperature >= 100) {
          setWaterLevel(prev => Math.max(0, prev - 0.4));
        } else if (temperature > 60) {
          setWaterLevel(prev => Math.max(0, prev - 0.05));
        }
      }
    }, 100);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, [temperature, waterLevel]);

  return (
    <div className="relative w-full h-full bg-[#0a0f1e] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#135bec_1px,transparent_1px)] bg-[size:25px_25px]"></div>
      
      <div className="relative flex flex-col items-center">
        <canvas ref={canvasRef} width={300} height={350} className="relative z-10" />
        
        {/* Fire Burner (Stove) */}
        <div className="relative w-44 h-24 -mt-12 flex flex-col items-center z-20">
          <div className="w-full h-6 bg-slate-800 rounded-t-xl border border-white/10 shadow-xl relative z-30">
             <div className="absolute inset-x-4 top-1 h-1 bg-slate-700 rounded-full opacity-50" />
          </div>
          <div className="w-3/4 h-10 bg-slate-700 rounded-b-2xl border-x border-b border-black/40 shadow-inner z-30">
            <div className="flex justify-center gap-2 mt-2">
              <div className={`size-2 rounded-full border transition-colors ${temperature >= 100 ? 'bg-red-500 border-red-400 animate-pulse' : 'bg-red-500/20 border-red-500/40'}`} />
              <div className="size-2 bg-slate-600 rounded-full" />
              <div className="size-2 bg-slate-600 rounded-full" />
            </div>
          </div>
          
          {/* Flames */}
          {temperature > 30 && (
            <div className="absolute bottom-16 flex justify-center items-end gap-1 w-full pointer-events-none">
              <div className="absolute bottom-0 w-32 bg-orange-600 blur-3xl rounded-full transition-all duration-300" 
                   style={{ height: `${Math.min(100, (temperature - 30) * 0.7)}px`, opacity: temperature >= 100 ? 0.6 : 0.4 }} />
              
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="w-4 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-full blur-[2px] animate-bounce"
                  style={{ 
                    height: `${Math.min(80, (temperature - 30) * 0.6 * (0.8 + Math.random() * 0.4))}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${0.3 + Math.random() * 0.3}s`,
                    opacity: 0.9
                  }}
                />
              ))}
              
              {temperature > 80 && (
                <div className="absolute bottom-0 w-24 flex justify-center gap-1">
                   {[1, 2, 3].map((i) => (
                     <div 
                      key={i}
                      className="w-3 bg-cyan-400 blur-[3px] rounded-full opacity-70 animate-pulse"
                      style={{ height: `${Math.min(40, (temperature - 80) * 0.4)}px` }}
                    />
                   ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Temperature Control Panel - Now smaller and positioned higher */}
      <div className="relative mt-[-30px] z-30 w-full max-w-[280px] bg-slate-900/90 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/10 shadow-2xl space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <div className="text-right">
            <span className="text-[9px] font-black text-primary uppercase block tracking-widest mb-0.5 opacity-70">الحرارة</span>
            <span className={`text-xl font-black transition-all ${temperature >= 100 ? 'text-red-500 scale-105 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'text-white'}`}>
              {temperature}°C
            </span>
          </div>
          <div className="text-left">
            <span className="text-[9px] font-black text-blue-400 uppercase block tracking-widest mb-0.5 opacity-70">الحالة</span>
            <span className={`text-xs font-black transition-colors ${temperature >= 100 ? 'text-red-400' : 'text-white'}`}>
              {temperature >= 100 ? 'غليان مستمر' : temperature > 60 ? 'تبخر هادئ' : 'سكون'}
            </span>
          </div>
        </div>
        <input 
          type="range" 
          min="20" max="150" 
          value={temperature} 
          onChange={(e) => setTemperature(parseInt(e.target.value))} 
          className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" 
        />
        <p className="text-[9px] font-bold text-slate-400 text-center leading-tight">
          {temperature >= 100 
            ? "عند وصول الحرارة لدرجة الغليان (100°م)، تتحول المادة السائلة إلى بخار بسرعة." 
            : "ارفع درجة الحرارة للوصول إلى مرحلة الغليان."}
        </p>
        <button 
          onClick={() => setWaterLevel(100)} 
          className="w-full py-1.5 bg-primary/20 text-primary rounded-xl text-[9px] font-black uppercase transition-all hover:bg-primary/30 border border-primary/20"
        >
          إعادة ملء الوعاء
        </button>
      </div>
    </div>
  );
};
