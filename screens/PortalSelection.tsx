
import React from 'react';
import { PORTALS } from '../constants';
import { Portal } from '../types';

interface PortalSelectionProps {
  onSelect: (portal: Portal) => void;
}

const PortalSelection: React.FC<PortalSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-full pb-24 bg-background">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/80 backdrop-blur-xl p-5 border-b border-slate-100 shadow-sm">
        <button className="flex size-11 items-center justify-center rounded-2xl hover:bg-slate-50 transition border border-slate-200">
          <span className="material-symbols-outlined text-slate-700 text-2xl">menu</span>
        </button>
        <h1 className="text-2xl font-black leading-tight tracking-tight text-slate-900 font-display">
          المختبر <span className="text-primary">الذكي</span>
        </h1>
        <button className="flex size-11 items-center justify-center rounded-2xl hover:bg-slate-50 transition border border-slate-200 relative">
          <span className="material-symbols-outlined text-slate-700 text-2xl">notifications</span>
          <div className="absolute top-2.5 right-2.5 size-2.5 bg-accent rounded-full border-2 border-white"></div>
        </button>
      </header>

      <div className="px-6 py-10 flex flex-col items-center justify-center text-center animate-slide-up-fade">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary border border-primary/20 shadow-sm">
          <span className="material-symbols-outlined text-5xl">biotech</span>
        </div>
        <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 mb-3 font-display">اختيار المستوى</h2>
        <p className="text-base font-medium text-slate-500 max-w-[300px] leading-relaxed">
          اختر مستواك الدراسي للانغماس في عالم من التجارب العلمية المذهلة
        </p>
      </div>

      <div className="px-6 space-y-6">
        {PORTALS.map((portal, idx) => (
          <button 
            key={portal.id}
            onClick={() => onSelect(portal)}
            style={{ animationDelay: `${idx * 0.1}s` }}
            className="group relative w-full h-56 overflow-hidden rounded-4xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500 active:scale-[0.98] border border-slate-100 animate-slide-up-fade opacity-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
              style={{ backgroundImage: `url("${portal.imageUrl}")` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
            </div>

            <div className="absolute top-6 left-6 z-20">
              <span className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
                {portal.tag}
              </span>
            </div>

            <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-right">
              <h3 className="text-2xl font-black text-white mb-1.5 font-display">{portal.name}</h3>
              <p className="text-white/80 text-sm font-bold leading-relaxed max-w-[240px] mb-4">
                {portal.description}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/20 border border-white/10">
                   <span className="material-symbols-outlined text-white text-xl">science</span>
                   <span className="text-white text-[10px] font-black">{portal.experimentsCount} تجربة</span>
                </div>
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary shadow-lg transition-transform group-hover:translate-x-[-5px]">
                  <span className="material-symbols-outlined font-black text-2xl">arrow_forward</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-10 px-6 pb-10">
        <div className="w-full h-36 rounded-4xl overflow-hidden relative group cursor-pointer glass border-2 border-primary/10 animate-slide-up-fade shadow-lg" style={{ animationDelay: '0.3s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/10 z-10"></div>
          <div className="absolute inset-0 z-20 flex items-center justify-between px-8">
            <div className="text-right">
              <p className="text-slate-900 font-black text-xl mb-1 font-display">مكتبة المصادر</p>
              <p className="text-slate-500 text-xs font-bold">تصفح الكتب والملخصات الذكية</p>
            </div>
            <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-inner">
              <span className="material-symbols-outlined text-primary text-3xl">menu_book</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSelection;
