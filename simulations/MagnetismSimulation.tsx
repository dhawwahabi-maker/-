
import React, { useState, useEffect, useRef, useMemo } from 'react';

export const MagnetismSimulation: React.FC = () => {
  const [magnetX, setMagnetX] = useState(50); 
  const [rotY, setRotY] = useState(0); 
  const [rotX, setRotX] = useState(25);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });

  const initialMaterials = useMemo(() => [
    { id: 'iron', name: 'حديد', factor: 1.0, icon: 'settings', startPos: 15, texture: 'bg-[radial-gradient(circle_at:30%_30%,#e2e8f0_0%,#1e293b_100%)] shadow-xl' },
    { id: 'copper', name: 'نحاس', factor: 0.1, icon: 'currency_bitcoin', startPos: 35, texture: 'bg-[radial-gradient(circle_at:30%_30%,#fb923c_0%,#7c2d12_100%)]' },
    { id: 'wood', name: 'خشب', factor: 0.0, icon: 'deck', startPos: 65, texture: 'bg-amber-900' },
    { id: 'plastic', name: 'بلاستيك', factor: 0.0, icon: 'layers', startPos: 85, texture: 'bg-blue-500' }
  ], []);

  const [itemPositions, setItemPositions] = useState(initialMaterials.map(m => m.startPos));

  useEffect(() => {
    const interval = setInterval(() => {
      setItemPositions(prev => prev.map((pos, idx) => {
        const material = initialMaterials[idx];
        const dist = Math.abs(magnetX - pos);
        const rawForce = (3000 * material.factor) / (dist * dist + 5);
        if (rawForce > 2.0 && dist > 8) {
           const move = Math.min(dist - 8, rawForce * 0.8);
           return pos + (magnetX > pos ? move : -move);
        }
        return pos;
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [magnetX, initialMaterials]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerCanvasX = (magnetX / 100) * canvas.width;
      const centerCanvasY = canvas.height * 0.15; 
      const magnetLen = 160;
      const radY = (rotY * Math.PI) / 180;
      const radX = (rotX * Math.PI) / 180;

      const rotate3D = (p: {x:number,y:number,z:number}) => {
         let x1 = p.x * Math.cos(radY) - p.z * Math.sin(radY);
         let z1 = p.x * Math.sin(radY) + p.z * Math.cos(radY);
         let y2 = p.y * Math.cos(radX) - z1 * Math.sin(radX);
         return { x: x1, y: y2 };
      };

      const n2 = rotate3D({ x: -magnetLen / 2.2, y: 0, z: 0 });
      const s2 = rotate3D({ x: magnetLen / 2.2, y: 0, z: 0 });
      const pN = { x: centerCanvasX + n2.x, y: centerCanvasY + n2.y };
      const pS = { x: centerCanvasX + s2.x, y: centerCanvasY + s2.y };

      ctx.lineWidth = 1.2;
      for (let i = 1; i <= 10; i++) {
        const spread = i * 25;
        const alpha = 0.4 - i * 0.03;
        const drawLoop = (dir: number) => {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`;
          ctx.moveTo(pN.x, pN.y);
          const cp1x = pN.x + rotate3D({x: -spread*0.5, y: dir*spread, z: dir*spread}).x;
          const cp1y = pN.y + rotate3D({x: -spread*0.5, y: dir*spread, z: dir*spread}).y;
          const cp2x = pS.x + rotate3D({x: spread*0.5, y: dir*spread, z: dir*spread}).x;
          const cp2y = pS.y + rotate3D({x: spread*0.5, y: dir*spread, z: dir*spread}).y;
          ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pS.x, pS.y);
          ctx.stroke();
        };
        drawLoop(1.5);
        drawLoop(-1.5);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [magnetX, rotY, rotX]);

  return (
    <div className="relative w-full h-full bg-[#020617] flex flex-col items-center justify-center overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#135bec_1.5px,transparent_1.5px)] bg-[size:40px_40px]"></div>
      <canvas ref={canvasRef} width={500} height={500} className="absolute inset-0 z-20 pointer-events-none opacity-90" />
      
      <div className="relative w-full h-80 perspective-[1500px] flex items-center justify-center z-30">
        <div className="absolute bottom-0 w-[180%] h-64 bg-slate-900 border-t-2 border-slate-800" style={{ transform: 'rotateX(75deg)' }} />
        
        <div className="absolute z-50 cursor-grab active:cursor-grabbing" style={{ left: `${magnetX}%`, top: '15%', transform: `translateX(-50%) translateZ(100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`, transformStyle: 'preserve-3d' }}>
           <div className="relative w-48 h-16" style={{ transformStyle: 'preserve-3d' }}>
              <div className="absolute inset-0 flex border border-white/20 rounded-xl overflow-hidden shadow-2xl" style={{ backfaceVisibility: 'hidden' }}>
                 <div className="w-1/2 h-full bg-red-600 flex items-center justify-center font-black text-white text-3xl">N</div>
                 <div className="w-1/2 h-full bg-slate-400 flex items-center justify-center font-black text-slate-900 text-3xl">S</div>
              </div>
           </div>
        </div>

        {initialMaterials.map((mat, idx) => (
          <div key={mat.id} className="absolute z-40" style={{ left: `${itemPositions[idx]}%`, top: '55%', transform: `translateX(-50%) translateZ(40px)` }}>
            <div className={`w-20 h-20 rounded-3xl border border-white/10 flex flex-col items-center justify-center shadow-2xl transition-all duration-300 ${mat.texture}`}>
               <span className="material-symbols-outlined text-white/50 text-3xl mb-1">{mat.icon}</span>
               <span className="text-[9px] font-black text-white uppercase">{mat.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 w-full p-6 pb-12 z-[100] bg-gradient-to-t from-black via-black/40 to-transparent">
         <div className="max-w-[320px] mx-auto bg-white/5 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl">
            <input type="range" min="5" max="95" value={magnetX} onChange={(e) => setMagnetX(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer mb-3"/>
            <button onClick={() => setItemPositions(initialMaterials.map(m => m.startPos))} className="w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary px-3 py-1.5 rounded-full transition-all active:scale-95 border border-primary/30 text-xs font-bold uppercase">إعادة ترتيب المواد</button>
         </div>
      </div>
    </div>
  );
};
