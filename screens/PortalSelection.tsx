
import React from 'react';
import { PORTALS } from '../constants';
import { Portal } from '../types';

interface PortalSelectionProps {
  onSelect: (portal: Portal) => void;
}

const PortalSelection: React.FC<PortalSelectionProps> = ({ onSelect }) => {
  return (
    <div className="min-h-full pb-24">
      <header className="sticky top-0 z-50 flex items-center justify-between bg-white/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-2 border-b border-gray-200 dark:border-white/5 transition-colors">
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <span className="material-symbols-outlined text-slate-900 dark:text-white text-2xl">menu</span>
        </button>
        <h1 className="text-lg font-bold leading-tight tracking-[-0.015em] dark:text-white">المختبر الذكي</h1>
        <button className="flex size-10 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <span className="material-symbols-outlined text-slate-900 dark:text-white text-2xl">notifications</span>
        </button>
      </header>

      <div className="px-4 py-6 flex flex-col items-center justify-center text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary">
          <span className="material-symbols-outlined text-5xl">biotech</span>
        </div>
        <h2 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white mb-2">اختيار المستوى</h2>
        <p className="text-base font-normal text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
          اختر مستواك الدراسي للانغماس في عالم من التجارب العلمية المشوقة
        </p>
      </div>

      <div className="px-4 space-y-5">
        {PORTALS.map((portal, idx) => (
          <button 
            key={portal.id}
            onClick={() => onSelect(portal)}
            className="group relative w-full h-48 overflow-hidden rounded-3xl bg-slate-900 shadow-xl shadow-black/10 hover:shadow-primary/20 transition-all duration-500 text-right active:scale-[0.98]"
          >
            {/* Dynamic Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url("${portal.imageUrl}")` }}
            >
              {/* Overlays for readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Top Tag */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-black uppercase tracking-widest">
                {portal.tag}
              </span>
            </div>

            {/* Content Area */}
            <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end">
              <div className="flex items-end justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-white mb-1 drop-shadow-lg">
                    {portal.name}
                  </h3>
                  <p className="text-white/70 text-sm font-medium leading-tight max-w-[200px] line-clamp-1">
                    {portal.description.split('،')[0]}
                  </p>
                </div>
                
                <div className="flex size-12 items-center justify-center rounded-2xl bg-white text-primary shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="material-symbols-outlined font-black">arrow_forward</span>
                </div>
              </div>
            </div>

            {/* Glassmorphism Badge */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10">
              <span className="material-symbols-outlined text-white text-sm">science</span>
              <span className="text-white text-[10px] font-bold">{portal.experimentsCount} تجربة</span>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-8 px-4">
        <div className="w-full h-36 rounded-3xl overflow-hidden relative group cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-purple-600/90 z-10 mix-blend-multiply transition-colors group-hover:from-primary group-hover:to-purple-500"></div>
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCuaxsEWWfo4RsvrbTjmGkMAoZWKQoaFxKYXEO-HQ2_SmstyPNowX65il89TeXk5qHIFk9uoRF5CR6gKELma6tdYsxZjgfSHH-xL-V5qjfXs9lpGz7bD5upSAx-hbIdVdKQagOjPki13Yj8zsmv2RzmmeilAHhF8gSeMTL5tebI1OSbfaULQdnNzcTYHaqfZGHOUmLIq3iGU2ce6YiNil99nee3QtWN75mjZboqUZQeb_lLgyxgOvdCZK30eusug2bX3twYAZyhpS0")' }}
          ></div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
             <div className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-white">menu_book</span>
             </div>
            <p className="text-white font-black text-xl drop-shadow-md">مكتبة المصادر</p>
            <p className="text-white/80 text-xs font-bold drop-shadow-md">تصفح الكتب المدرسية والملخصات</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortalSelection;
