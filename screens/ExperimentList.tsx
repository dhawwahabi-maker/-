
import React, { useState } from 'react';
import { EXPERIMENTS } from '../constants';
import { Experiment, Portal, Category } from '../types';

interface ExperimentListProps {
  portal: Portal | null;
  onSelect: (experiment: Experiment) => void;
  onBack: () => void;
}

const ExperimentList: React.FC<ExperimentListProps> = ({ portal, onSelect, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('الكل');

  const filteredExperiments = EXPERIMENTS.filter(exp => {
    const matchesPortal = portal ? exp.portalId === portal.id : true;
    const matchesSearch = exp.title.includes(searchTerm) || exp.description.includes(searchTerm);
    const matchesCategory = activeCategory === 'الكل' || exp.category === activeCategory;
    return matchesPortal && matchesSearch && matchesCategory;
  });

  const categories = ['الكل', Category.Biology, Category.Chemistry, Category.Physics, Category.Electricity];

  return (
    <div className="min-h-full pb-24 bg-background">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl p-5 border-b border-slate-100 shadow-sm">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-11 rounded-2xl hover:bg-slate-50 transition border border-slate-200 text-slate-700"
          >
            <span className="material-symbols-outlined text-2xl font-bold">arrow_forward</span>
          </button>
          <h1 className="text-xl font-black text-slate-900 font-display">{portal?.name || 'تجارب العلوم'}</h1>
          <div className="w-11"></div>
        </div>
      </header>

      <div className="px-6 py-8">
        <div className="relative group">
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span className="material-symbols-outlined text-slate-400 group-focus-within:text-primary transition-colors">search</span>
          </div>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pr-12 text-sm font-medium text-slate-900 border-none rounded-3xl bg-white shadow-xl shadow-indigo-100/50 ring-1 ring-slate-200 focus:ring-2 focus:ring-primary focus:outline-none placeholder-slate-400 transition-all" 
            placeholder="ابحث عن تجربة علمية..." 
          />
        </div>
      </div>

      <div className="px-6 mb-8 overflow-x-auto no-scrollbar flex gap-3 pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 text-xs font-black rounded-2xl transition-all border tracking-wide ${activeCategory === cat ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-white text-slate-500 border-slate-200 hover:border-primary/30'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-6 px-6">
        {filteredExperiments.length > 0 ? (
          filteredExperiments.map((exp, index) => (
            <button 
              key={exp.id}
              onClick={() => onSelect(exp)}
              style={{ animationDelay: `${index * 50}ms` }}
              className="w-full bg-white rounded-4xl p-6 shadow-md shadow-indigo-100/30 flex items-center gap-6 hover:shadow-xl transition-all text-right group border border-slate-50 active:scale-[0.98] animate-slide-up-fade opacity-0"
            >
              <div className={`flex-shrink-0 w-16 h-16 rounded-3xl flex items-center justify-center transition-all group-hover:scale-110 duration-500 ${exp.category === Category.Chemistry ? 'bg-blue-100 text-blue-600' : exp.category === Category.Biology ? 'bg-emerald-100 text-emerald-600' : exp.category === Category.Electricity ? 'bg-amber-100 text-amber-600' : 'bg-indigo-100 text-primary'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '32px' }}>
                  {exp.category === Category.Chemistry ? 'water_drop' : exp.category === Category.Biology ? 'potted_plant' : exp.category === Category.Electricity ? 'electric_bolt' : 'wb_sunny'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-black text-slate-900 mb-2 truncate font-display group-hover:text-primary transition-colors">{exp.title}</h3>
                <div className="flex items-center gap-3">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-0.5 rounded-lg">{exp.unit}</span>
                   <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-lg ${exp.difficulty === 'سهل' ? 'text-emerald-500 bg-emerald-50' : exp.difficulty === 'متوسط' ? 'text-amber-500 bg-amber-50' : 'text-accent bg-rose-50'}`}>
                     {exp.difficulty}
                   </span>
                </div>
              </div>
              <div className="flex-shrink-0 text-slate-300 group-hover:text-primary transition-all transform group-hover:translate-x-[-5px]">
                <span className="material-symbols-outlined -scale-x-100 font-black">chevron_right</span>
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-slate-400">
            <div className="size-20 rounded-full bg-white flex items-center justify-center mb-6 shadow-inner border border-slate-100">
              <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <p className="font-bold text-lg">لا توجد تجارب تطابق بحثك</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperimentList;
