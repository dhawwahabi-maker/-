
import React, { useState } from 'react';

export const LightSourcesSimulation: React.FC = () => {
  const items = [
    { id: 'sun', name: 'الشمس', type: 'natural', icon: 'wb_sunny' },
    { id: 'lamp', name: 'المصباح', type: 'artificial', icon: 'lightbulb' },
    { id: 'fire', name: 'النار', type: 'natural', icon: 'local_fire_department' },
    { id: 'flashlight', name: 'الكشاف', type: 'artificial', icon: 'flashlight_on' },
    { id: 'moon', name: 'القمر (عاكس)', type: 'reflector', icon: 'dark_mode' }
  ];

  const [scores, setScores] = useState<Record<string, string>>({});

  const handleClassify = (id: string, type: string) => {
    setScores(prev => ({ ...prev, [id]: type }));
  };

  return (
    <div className="relative w-full h-full bg-[#05070a] flex flex-col items-center p-6 overflow-hidden rounded-t-3xl">
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(251,191,36,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <h3 className="text-white font-black text-lg mb-6 z-10 text-center">صنف مصادر الضوء</h3>
      
      <div className="w-full space-y-4 z-10 overflow-y-auto no-scrollbar pb-20">
        {items.map(item => (
          <div key={item.id} className="bg-white/5 border border-white/10 rounded-3xl p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span className="text-sm font-bold text-white">{item.name}</span>
              </div>
              {scores[item.id] && (
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${scores[item.id] === item.type ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {scores[item.id] === item.type ? 'صحيح' : 'خطأ'}
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => handleClassify(item.id, 'natural')}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${scores[item.id] === 'natural' ? 'bg-primary text-white' : 'bg-white/5 text-slate-400 border border-white/5'}`}
              >
                طبيعي
              </button>
              <button 
                onClick={() => handleClassify(item.id, 'artificial')}
                className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${scores[item.id] === 'artificial' ? 'bg-primary text-white' : 'bg-white/5 text-slate-400 border border-white/5'}`}
              >
                اصطناعي
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl backdrop-blur-md">
        <p className="text-[9px] font-bold text-amber-500 leading-tight text-center">
          تذكر: المصادر الطبيعية من صنع الخالق، والاصطناعية من صنع الإنسان.
        </p>
      </div>
    </div>
  );
};
