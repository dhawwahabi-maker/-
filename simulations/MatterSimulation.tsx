
import React, { useState, useEffect, useRef } from 'react';

export const MatterSimulation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [temperature, setTemperature] = useState(25);
  const particles = useRef<any[]>([]);
  const steamParticles = useRef<any[]>([]);
  const bubbles = useRef<any[]>([]);
  
  const canvasArea = { width: 220, height: 350 };
  const beakerPos = { x: 20, y: 60 }; 
  const beakerDim = { width: 180, height: 200 };

  useEffect(() => {
    // Internal particles (water/ice molecules)
    particles.current = Array.from({ length: 45 }).map(() => ({
      x: beakerPos.x + Math.random() * beakerDim.width,
      y: beakerPos.y + beakerDim.height - 50,
      vx: 0, vy: 0, radius: 10, color: '#b3e5fc'
    }));
    // Steam particles
    steamParticles.current = Array.from({ length: 50 }).map(() => ({
      x: beakerPos.x + Math.random() * beakerDim.width,
      y: beakerPos.y + 10,
      vx: 0, vy: 0, opacity: 0, size: Math.random() * 8 + 4
    }));
    // Boiling bubbles
    bubbles.current = Array.from({ length: 20 }).map(() => ({
      x: beakerPos.x + Math.random() * beakerDim.width,
      y: beakerPos.y + beakerDim.height - 10,
      vy: 0, active: false, size: Math.random() * 5 + 2
    }));

    let raf: number;
    const ctx = canvasRef.current?.getContext('2d');
    const update = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasArea.width, canvasArea.height);
      
      const isSolid = temperature <= 0;
      const isLiquid = temperature > 0 && temperature < 100;
      const isGas = temperature >= 100;
      const energyFactor = Math.max(0.1, (temperature + 20) / 20);
      
      // --- DRAW PARTICLES ---
      particles.current.forEach((p, i) => {
        if (isSolid) {
          const cols = 5;
          const targetX = beakerPos.x + 25 + (i % cols) * 32;
          const targetY = beakerPos.y + beakerDim.height - 25 - Math.floor(i / cols) * 32;
          p.x += (targetX - p.x) * 0.1;
          p.y += (targetY - p.y) * 0.1;
          p.radius = 12; p.color = '#e1f5fe';
        } else {
          p.vx += (Math.random() - 0.5) * (energyFactor * 0.8);
          p.vy += (Math.random() - 0.5) * (energyFactor * 0.8) + 0.5; 
          p.vx *= 0.95; p.vy *= 0.95;
          p.x += p.vx; p.y += p.vy;

          if (p.x < beakerPos.x + 10) { p.x = beakerPos.x + 10; p.vx *= -1; }
          if (p.x > beakerPos.x + beakerDim.width - 10) { p.x = beakerPos.x + beakerDim.width - 10; p.vx *= -1; }
          if (p.y > beakerPos.y + beakerDim.height - 10) { p.y = beakerPos.y + beakerDim.height - 10; p.vy *= -1; }
          if (p.y < (isGas ? 0 : beakerPos.y + 20)) { p.vy *= -1; }

          p.radius = isGas ? 6 : 8; 
          p.color = isGas ? 'rgba(179,229,252,0.4)' : '#0288d1';
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      // --- BOILING BUBBLES ---
      if (temperature >= 95) {
        bubbles.current.forEach(b => {
          if (!b.active && Math.random() < 0.1) {
            b.active = true;
            b.y = beakerPos.y + beakerDim.height - 10;
            b.x = beakerPos.x + Math.random() * beakerDim.width;
            b.vy = -(Math.random() * 2 + 1) * (temperature / 100);
          }
          if (b.active) {
            b.y += b.vy;
            ctx.beginPath();
            ctx.arc(b.x, b.y, b.size, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            ctx.lineWidth = 1;
            ctx.stroke();
            if (b.y < beakerPos.y + 20) b.active = false;
          }
        });
      }

      // --- STEAM PARTICLES ---
      if (temperature > 60) {
        const steamDensity = (temperature - 60) / 90; 
        steamParticles.current.forEach((sp, idx) => {
          if (idx / 50 < steamDensity) {
            if (sp.opacity <= 0) {
              sp.opacity = Math.random() * 0.6 + 0.2;
              sp.x = beakerPos.x + Math.random() * beakerDim.width;
              sp.y = beakerPos.y + 10;
              sp.vx = (Math.random() - 0.5) * 1;
              sp.vy = -(Math.random() * 2 + 1) * energyFactor * 0.5;
            }
            sp.x += sp.vx;
            sp.y += sp.vy;
            sp.opacity -= 0.005;
            if (sp.opacity > 0) {
              ctx.beginPath();
              ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${sp.opacity})`;
              ctx.fill();
            }
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
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#135bec_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="relative flex flex-col items-center">
        <div className="relative" style={{ width: canvasArea.width, height: canvasArea.height }}>
          <div className="absolute border-x-[4px] border-b-[4px] border-white/20 rounded-b-3xl bg-white/5 backdrop-blur-[2px] z-0" 
               style={{ left: beakerPos.x, top: beakerPos.y, width: beakerDim.width, height: beakerDim.height }} />
          <canvas ref={canvasRef} width={canvasArea.width} height={canvasArea.height} className="relative z-10" />
          <div className="absolute border-[3px] border-white/20 rounded-full bg-white/10 z-20" 
               style={{ left: beakerPos.x, top: beakerPos.y - 6, width: beakerDim.width, height: 12 }} />
        </div>

        <div className="relative w-40 h-24 -mt-10 flex flex-col items-center z-20">
          <div className="w-full h-4 bg-slate-800 rounded-full border border-white/10 shadow-xl"></div>
          <div className="w-10 h-8 bg-slate-700 -mt-1 rounded-sm border border-black/40"></div>
          
          {temperature > 25 && (
            <div className="absolute bottom-6 w-full flex justify-center">
              <div className="w-16 bg-orange-600 blur-xl rounded-full absolute bottom-0 transition-all duration-300 animate-bounce"
                   style={{ height: `${Math.min(100, (temperature - 25) * 0.8 + 20)}px`, opacity: 0.6 }} />
              <div className="w-10 bg-yellow-400 blur-md rounded-full absolute bottom-0 transition-all duration-300 animate-pulse"
                   style={{ height: `${Math.min(70, (temperature - 25) * 0.6 + 10)}px`, opacity: 0.9 }} />
              {temperature > 100 && (
                 <div className="w-6 h-10 bg-blue-400 blur-sm rounded-full absolute bottom-0 opacity-80" />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Temperature Control Panel - Moved higher and made more compact */}
      <div className="relative mt-[-40px] z-30 w-full max-w-[280px] bg-slate-900/90 backdrop-blur-3xl p-4 rounded-[2rem] border border-white/10 shadow-2xl space-y-3 mb-4">
          <div className="flex justify-between items-center px-1">
             <div className="text-right">
                <span className="text-[9px] font-black text-primary uppercase block tracking-widest mb-0.5 opacity-70">الحرارة</span>
                <div className="flex items-baseline gap-0.5">
                  <span className={`text-xl font-black transition-colors ${temperature >= 100 ? 'text-red-500 animate-pulse' : temperature <= 0 ? 'text-cyan-400' : 'text-white'}`}>
                    {temperature}
                  </span>
                  <span className="text-[10px] text-slate-500">°C</span>
                </div>
             </div>
             <div className="text-left">
                <span className="text-[9px] font-black text-blue-400 uppercase block tracking-widest mb-0.5 opacity-70">الحالة</span>
                <span className="text-xs font-black text-white">
                  {temperature <= 0 ? 'جليد صلب' : temperature >= 100 ? 'غليان' : 'سائل'}
                </span>
             </div>
          </div>
          <div className="px-1">
            <input 
              type="range" 
              min="-20" 
              max="150" 
              value={temperature} 
              onChange={(e) => setTemperature(parseInt(e.target.value))} 
              className="w-full h-1.5 accent-primary cursor-pointer appearance-none bg-slate-800 rounded-full" 
            />
          </div>
          <p className="text-[9px] font-bold text-slate-400 text-center leading-tight px-2">
            اسحب لتغيير درجة الحرارة وملاحظة تغير حركة الجزيئات.
          </p>
      </div>
    </div>
  );
};
