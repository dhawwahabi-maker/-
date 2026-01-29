
import React, { useState } from 'react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  setScreen: (screen: Screen) => void;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, setScreen, showNav = true }) => {
  const [isWideMode, setIsWideMode] = useState(false);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`خطأ أثناء تفعيل ملء الشاشة: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className={`flex h-screen flex-col overflow-hidden mx-auto transition-all duration-500 shadow-2xl bg-background relative ${isWideMode ? 'w-full max-w-none' : 'max-w-md border-x border-slate-100'}`}>
      
      {/* Global Fullscreen & Wide Mode Toggle (Floating) */}
      <div className="absolute top-4 left-4 z-[60] flex gap-2">
        <button 
          onClick={() => setIsWideMode(!isWideMode)}
          className="size-10 rounded-xl glass border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-all active:scale-90"
          title={isWideMode ? "وضع الهاتف" : "العرض الكامل للمختبر"}
        >
          <span className="material-symbols-outlined text-xl">
            {isWideMode ? 'stay_primary_portrait' : 'open_in_full'}
          </span>
        </button>
        <button 
          onClick={toggleFullScreen}
          className="size-10 rounded-xl glass border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-primary transition-all active:scale-90"
          title="تفعيل ملء الشاشة"
        >
          <span className="material-symbols-outlined text-xl">fullscreen</span>
        </button>
      </div>

      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {showNav && (
        <nav className={`sticky bottom-0 w-full glass border-t border-slate-200 pb-safe pt-3 px-10 z-50 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] ${isWideMode ? 'max-w-4xl mx-auto rounded-t-4xl border-x' : ''}`}>
          <div className="flex justify-around items-center h-16 relative">
            <button 
              onClick={() => setScreen(Screen.PortalSelection)}
              className={`relative flex flex-col items-center justify-center gap-1.5 w-full transition-all duration-300 ${activeScreen === Screen.PortalSelection || activeScreen === Screen.Welcome ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: (activeScreen === Screen.PortalSelection || activeScreen === Screen.Welcome) ? "'FILL' 1" : "" }}>home</span>
              <span className="text-[10px] font-black tracking-tighter uppercase">الرئيسية</span>
              {(activeScreen === Screen.PortalSelection || activeScreen === Screen.Welcome) && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-primary rounded-full animate-glow"></div>
              )}
            </button>

            <button 
              onClick={() => setScreen(Screen.ExperimentList)}
              className={`relative flex flex-col items-center justify-center gap-1.5 w-full transition-all duration-300 ${activeScreen === Screen.ExperimentList || activeScreen === Screen.ExperimentDetail ? 'text-primary scale-110' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '28px', fontVariationSettings: (activeScreen === Screen.ExperimentList || activeScreen === Screen.ExperimentDetail) ? "'FILL' 1" : "" }}>science</span>
              <span className="text-[10px] font-black tracking-tighter uppercase">التجارب</span>
              {(activeScreen === Screen.ExperimentList || activeScreen === Screen.ExperimentDetail) && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 bg-primary rounded-full animate-glow"></div>
              )}
            </button>

            <button className="relative flex flex-col items-center justify-center gap-1.5 w-full text-slate-400 hover:text-primary transition-all duration-300">
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>person</span>
              <span className="text-[10px] font-black tracking-tighter uppercase">حسابي</span>
            </button>
          </div>
          <div className="h-6 w-full"></div>
        </nav>
      )}
    </div>
  );
};

// Added missing default export
export default Layout;
