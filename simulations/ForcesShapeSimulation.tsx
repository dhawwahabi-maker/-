
import React, { useState } from 'react';

export const ForcesShapeSimulation: React.FC = () => {
  const [activeItem, setActiveItem] = useState<'sponge' | 'clay' | 'spring'>('sponge');
  const [force, setForce] = useState(0);

  const items = {
    sponge: { name: 'إسفنجة', desc: 'مرن: يتغير شكله بالقوة ويعود فور زوالها.' },
    clay: { name: 'صلصال', desc: 'لدن: يتغير شكله بالقوة ويبقى على شكله الجديد.' },
    spring: { name: 'نابض', desc: 'مرن: يستطيل عند السحب ويعود لوضعه الأصلي.' }
  };

  return (
    <div className="relative w-full h-full bg-[#0a0a0a] flex flex-col items-center justify-center p-6 overflow-hidden rounded-t-3xl text-white">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
      
      <div className="flex gap-2 mb-12 z-10">
        {(Object.keys(items) as Array<keyof typeof items>).map(k => (
          <button 
            key={k}
            onClick={() => { setActiveItem(k); setForce(0); }}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeItem === k ? 'bg-primary text-white shadow-lg' : 'bg-white/5 text-slate-500 border border-white/5'}`}
          >
            {items[k].name}
          </button>
        ))}
      </div>

      <div className="relative h-64 w-full flex items-center justify-center z-10">
        {activeItem === 'sponge' && (
          <div 
            className="w-40 h-40 bg-yellow-500 rounded-2xl border-4 border-yellow-600 shadow-2xl transition-all duration-200 flex flex-wrap gap-1 p-2 overflow-hidden"
            style={{ 
              transform: `scaleY(${1 - (force/200)}) scaleX(${1 + (force/400)})`,
              borderRadius: `${16 + (force/10)}px`
            }}
          >
             {[...Array(36)].map((_, i) => <div key={i} className="size-4 bg-yellow-400 rounded-full opacity-30" />)}
          </div>
        )}

        {activeItem === 'clay' && (
          <div 
            className="w-40 h-40 bg-red-800 rounded-full border-4 border-red-900 shadow-2xl transition-all duration-500"
            style={{ 
              transform: `scaleY(${1 - (force/300)}) scaleX(${1 + (force/200)}) rotate(${force/5}deg)`,
              borderRadius: `${50 - (force/5)}% ${50 + (force/10)}% ${50 + (force/5)}% ${50 - (force/10)}%`
            }}
          />
        )}

        {activeItem === 'spring' && (
          <div className="flex flex-col items-center">
            <div className="w-12 h-6 bg-slate-700 rounded-t-lg" />
            <div className="flex flex-col gap-0 transition-all duration-300" style={{ height: `${60 + force}px` }}>
               {[...Array(6)].map((_, i) => (
                 <div key={i} className="w-16 h-4 border-2 border-slate-400 rounded-full -mt-1" />
               ))}
            </div>
            <div className="w-12 h-8 bg-slate-600 rounded-b-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-xs">drag_handle</span>
            </div>
          </div>
        )}
      </div>

      <div className="w-full max-w-xs bg-black/60 backdrop-blur-3xl p-6 rounded-[2.5rem] border border-white/10 shadow-2xl space-y-4">
        <div className="flex justify-between items-center px-1">
           <span className="text-[10px] font-black text-primary uppercase tracking-widest">قوة الضغط / السحب</span>
           <span className="text-[10px] font-bold text-white">{force}%</span>
        </div>
        <input 
          type="range" 
          min="0" max="100" 
          value={force} 
          onChange={(e) => setForce(parseInt(e.target.value))} 
          className="w-full h-1.5 bg-slate-800 rounded-full appearance-none accent-primary cursor-pointer" 
        />
        <p className="text-[10px] font-bold text-slate-400 text-center leading-tight">
          {items[activeItem].desc}
        </p>
      </div>
    </div>
  );
};
