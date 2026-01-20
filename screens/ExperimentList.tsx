
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

  // Filter by portal first, then by search and category
  const filteredExperiments = EXPERIMENTS.filter(exp => {
    const matchesPortal = portal ? exp.portalId === portal.id : true;
    const matchesSearch = exp.title.includes(searchTerm) || exp.description.includes(searchTerm);
    const matchesCategory = activeCategory === 'الكل' || exp.category === activeCategory;
    return matchesPortal && matchesSearch && matchesCategory;
  });

  const categories = ['الكل', Category.Biology, Category.Chemistry, Category.Physics, Category.Electricity];

  return (
    <div className="min-h-full pb-24">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md pt-safe">
        <div className="px-4 py-4 flex items-center justify-between border-b border-gray-100 dark:border-gray-800">
          <button 
            onClick={onBack}
            className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors dark:text-white"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>arrow_forward</span>
          </button>
          <h1 className="text-lg font-bold dark:text-white">{portal?.name || 'تجارب العلوم'}</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <div className="px-4 py-4">
        <div className="relative group">
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="material-symbols-outlined text-slate-400">search</span>
          </div>
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-4 pr-10 text-sm text-slate-900 dark:text-white border-none rounded-xl bg-white dark:bg-surface-dark shadow-sm ring-1 ring-black/5 dark:ring-white/10 focus:ring-2 focus:ring-primary focus:outline-none placeholder-slate-400" 
            placeholder="ابحث عن تجربة..." 
          />
        </div>
      </div>

      <div className="px-4 mb-4 overflow-x-auto no-scrollbar flex gap-2 pb-2">
        {categories.map((cat) => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full shadow-sm transition-all border ${activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-surface-dark text-slate-500 border-transparent'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 px-4">
        {filteredExperiments.length > 0 ? (
          filteredExperiments.map((exp, index) => (
            <button 
              key={exp.id}
              onClick={() => onSelect(exp)}
              style={{ animationDelay: `${index * 50}ms` }}
              className="w-full bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-right group border border-transparent hover:border-primary/20 active:scale-[0.98] animate-slide-up-fade opacity-0"
            >
              <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${exp.category === Category.Chemistry ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' : exp.category === Category.Biology ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : exp.category === Category.Electricity ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'}`}>
                <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>
                  {exp.category === Category.Chemistry ? 'water_drop' : exp.category === Category.Biology ? 'potted_plant' : exp.category === Category.Electricity ? 'electric_bolt' : 'wb_sunny'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold dark:text-white truncate">{exp.title}</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{exp.unit} • {exp.difficulty}</p>
              </div>
              <div className="flex-shrink-0 text-gray-400 group-hover:text-primary transition-colors">
                <span className="material-symbols-outlined -scale-x-100" style={{ fontSize: '24px' }}>chevron_right</span>
              </div>
            </button>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4">search_off</span>
            <p>لا توجد تجارب تطابق بحثك</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperimentList;
