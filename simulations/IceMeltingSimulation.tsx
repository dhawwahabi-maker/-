
import React, { useState, useEffect, useRef } from 'react';

export const IceMeltingSimulation: React.FC = () => {
  const [temperature, setTemperature] = useState(15);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const drops = useRef<any[]>([]);
  const steamParticles = useRef<any[]>([]);
  
  const canvasArea = { width: 300, height: 350 };
  const dishPos = { x: 50, y: 240 };
  const dishDim = { width: 200, height: 40 };

  useEffect(() => {
    particles.current = [
      { x: 100, y: 210, size: 60, rot: 12, opacity: 1 },
      { x: 170, y: 215, size: 55, rot: -8, opacity: 1 },
      { x: 135, y: 180, size: 50, rot: 5, opacity: 1 }
    ];
    drops.current = Array.from({ length: 20 }).map(() => ({
      x: 0, y: 0, vy: 0, active: false, size: Math.random() * 2 + 1
    }));
    steamParticles.current = Array.from({ length: 30 }).map(() => ({
       x: 0, y: 0, vy: 0, opacity: 0, active: false
    }));

    let raf: number;
    const ctx = canvasRef.current?.getContext('2d');
    const update = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasArea.width, canvasArea.height);
      
      const meltProgress = Math.max(0, Math.min(1, (temperature) / 100));

      // 1. Plate
      ctx.beginPath();
      ctx.moveTo(dishPos.x, dishPos.y);
      ctx.quadraticCurveTo(dishPos.x + dishDim.width/2, dishPos.y + dishDim.height*2.5, dishPos.x + dishDim.width, dishPos.y);
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 4;
      ctx.stroke();

      // 2. Water Accumulation
      const waterLevel = meltProgress * 30; 
      if (waterLevel > 1) {
        ctx.beginPath();
        ctx.moveTo(dishPos.x + 8, dishPos.y + 10 - waterLevel/4);
        ctx.quadraticCurveTo(dishPos.x + dishDim.width/2, dishPos.y + dishDim.height*2.5 - 8, dishPos.x + dishDim.width - 8, dishPos.y + 10 - waterLevel/4);
        const waterGradient = ctx.createLinearGradient(0, dishPos.y, 0, dishPos.y + dishDim.height);
        waterGradient.addColorStop(0, 'rgba(0, 150, 255, 0.5)');
        waterGradient.addColorStop(1, 'rgba(0, 100, 200, 0.8)');
        ctx.fillStyle = waterGradient;
        ctx.fill();
      }

      // 3. Ice Blocks
      particles.current.forEach(p => {
         const currentSize = p.size * (1 - meltProgress * 0.95);
         if (currentSize > 4) {
            ctx.save();
            ctx.translate(p.x, p.y + (meltProgress * 20)); 
            ctx.rotate(p.rot * Math.PI / 180);
            
            const r = currentSize / 2;
            const rounded = 10 * (1 - meltProgress);
            ctx.beginPath();
            ctx.roundRect(-r, -r, currentSize, currentSize, rounded);
            const iceGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, currentSize);
            iceGrad.addColorStop(0, '#ffffff');
            iceGrad.addColorStop(0.4, '#e1f5fe');
            iceGrad.addColorStop(1, '#b3e5fc');
            ctx.fillStyle = iceGrad;
            ctx.shadowBlur = 15;
            ctx.shadowColor = 'rgba(255,255,255,0.4)';
            ctx.globalAlpha = 0.8;
            ctx.fill();
            ctx.strokeStyle = 'rgba(255,255,255,0.9)';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();

            if (temperature > 0 && Math.random() < (temperature / 600)) {
               const d = drops.current.find(dr => !dr.active);
               if (d) {
                  d.active = true;
                  d.x = p.x + (Math.random() - 0.5) * currentSize;
                  d.y = p.y + currentSize/2;
                  d.vy = 1;
               }
            }
         }
      });

      // 4. Dripping Drops
      drops.current.forEach(d => {
         if (d.active) {
            d.y += d.vy;
            d.vy += 0.3; 
            ctx.beginPath();
            ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
            ctx.fillStyle = '#81d4fa';
            ctx.fill();
            if (d.y > dishPos.y + 15) d.active = false;
         }
      });

      // 5. Steam
      if (temperature > 60) {
         steamParticles.current.forEach(s => {
            if (!s.active && Math.random() < (temperature/1000)) {
               s.active = true;
               s.x = dishPos.x + Math.random() * dishDim.width;
               s.y = dishPos.y - 10;
               s.vy = -0.5 - Math.random();
               s.opacity = 0.4;
            }
            if (s.active) {
               s.y += s.vy;
               s.opacity -= 0.005;
               ctx.beginPath();
               ctx.arc(s.x, s.y, 10 + Math.random()*5, 0, Math.PI * 2);
               ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
               ctx.fill();
               if (s.opacity <= 0) s.active = false;
            }
         });
      }
      raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [temperature]);

  return (
    <div className="relative w-full h-full bg-[#0a0f1e] flex flex-col items-center justify-center p-4 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#135bec_1px,transparent_1px)] bg-[size:25px_25px]"></div>
      
      <div className="absolute top-8 right-8 flex flex-col items-center z-20">
          <div 
            className="size-24 rounded-full transition-all duration-700 relative"
            style={{ 
               background: `radial-gradient(circle, #fff 0%, #fbbf24 40%, rgba(251, 191, 36, 0) 70%)`,
               transform: `scale(${1 + temperature/100})`,
               boxShadow: `0 0 ${40 + temperature}px #fbbf24`,
               opacity: 0.4 + (temperature / 150)
            }}
          >
             <div className="absolute inset-[-20%] animate-spin-slow opacity-30">
                <div className="w-full h-full border-[2px] border-dashed border-amber-500 rounded-full"></div>
             </div>
          </div>
          <span className="mt-6 text-[11px] font-black text-amber-400 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-amber-400/20">حرارة الشمس</span>
      </div>

      <canvas ref={canvasRef} width={canvasArea.width} height={canvasArea.height} className="relative z-10" />

      <div className="mt-2 w-full max-w-[340px] bg-slate-900/90 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-5 mb-4">
           <div className="flex justify-between items-center">
              <div className="text-right">
                 <span className="text-[10px] font-black text-primary uppercase block tracking-widest mb-1 opacity-60">درجة الحرارة</span>
                 <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-black transition-colors ${temperature >= 80 ? 'text-red-500' : temperature <= 0 ? 'text-cyan-400' : 'text-white'}`}>
                      {temperature}
                    </span>
                    <span className="text-sm font-bold text-slate-400">°C</span>
                 </div>
              </div>
              <div className="h-10 w-[1px] bg-white/10 mx-2"></div>
              <div className="text-left flex-1 pl-2">
                 <span className="text-[10px] font-black text-blue-400 uppercase block tracking-widest mb-1 opacity-60">الحالة</span>
                 <span className="text-sm font-black text-white block truncate">
                    {temperature <= 0 ? 'متجمد' : 'ينصهر'}
                 </span>
              </div>
           </div>
           <div className="relative py-2">
              <input 
                type="range" 
                min="-20" 
                max="120" 
                value={temperature} 
                onChange={(e) => setTemperature(parseInt(e.target.value))} 
                className="w-full h-2 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer transition-all" 
              />
           </div>
      </div>
    </div>
  );
};
