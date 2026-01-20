
import React from 'react';
import { Screen } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeScreen: Screen;
  setScreen: (screen: Screen) => void;
  showNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeScreen, setScreen, showNav = true }) => {
  return (
    <div className="flex h-screen flex-col overflow-hidden max-w-md mx-auto shadow-2xl bg-background-light dark:bg-background-dark relative">
      <main className="flex-1 overflow-y-auto no-scrollbar">
        {children}
      </main>

      {showNav && (
        <nav className="sticky bottom-0 w-full bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 pb-safe pt-2 px-6 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
          <div className="flex justify-around items-center h-16">
            <button 
              onClick={() => setScreen(Screen.PortalSelection)}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-colors ${activeScreen === Screen.PortalSelection || activeScreen === Screen.Welcome ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
            >
              <span className={`material-symbols-outlined ${activeScreen === Screen.PortalSelection ? 'filled' : ''}`} style={{ fontSize: '28px', fontVariationSettings: activeScreen === Screen.PortalSelection ? "'FILL' 1" : "" }}>home</span>
              <span className="text-[10px] font-medium">الرئيسية</span>
            </button>
            <button 
              onClick={() => setScreen(Screen.ExperimentList)}
              className={`flex flex-col items-center justify-center gap-1 w-full transition-colors ${activeScreen === Screen.ExperimentList || activeScreen === Screen.ExperimentDetail ? 'text-primary' : 'text-slate-400 hover:text-primary'}`}
            >
              <span className={`material-symbols-outlined ${activeScreen === Screen.ExperimentList ? 'filled' : ''}`} style={{ fontSize: '28px', fontVariationSettings: activeScreen === Screen.ExperimentList ? "'FILL' 1" : "" }}>science</span>
              <span className="text-[10px] font-bold">التجارب</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-1 w-full text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '28px' }}>person</span>
              <span className="text-[10px] font-medium">حسابي</span>
            </button>
          </div>
          <div className="h-5 w-full"></div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
