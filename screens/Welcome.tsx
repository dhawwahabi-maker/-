
import React from 'react';
import { Screen } from '../types';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="relative h-full w-full flex flex-col justify-between bg-[#0a1221] text-white overflow-hidden">
      {/* Background Gradient Layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f1d3a] via-[#0a1221] to-[#070d18] pointer-events-none"></div>

      {/* Ambient Background Glows - Enhanced */}
      <div className="absolute top-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-primary/30 blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-[-15%] left-[-15%] h-[400px] w-[400px] rounded-full bg-[#3b82f6]/20 blur-[110px] pointer-events-none"></div>
      <div className="absolute top-[30%] left-[20%] h-[200px] w-[200px] rounded-full bg-purple-500/10 blur-[90px] pointer-events-none"></div>

      <div className="h-4 w-full"></div>

      <div className="flex flex-1 flex-col items-center justify-center px-6 z-10 w-full max-w-md mx-auto">
        <div className="flex flex-col gap-6 items-center mb-10 w-full">
          <div className="relative group cursor-default">
            {/* Pulsing Outer Glow */}
            <div className="absolute inset-[-10px] bg-primary/30 rounded-[2.5rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-1000 animate-pulse"></div>
            
            <div className="absolute inset-0 bg-primary/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-700 opacity-60"></div>
            <div 
              className="relative w-40 h-40 bg-center bg-no-repeat bg-cover rounded-3xl shadow-2xl border border-white/20 overflow-hidden transform group-hover:scale-105 transition-transform duration-700 ease-out" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoxf2_jCb0BefCY8IU3N_ESB2lVHhVO-0L67YjDhVZKQk_KZ2qagzk91mG6hYmrYT4vLr6KLp9VMy0fxvOJJyavWgIrY1crGMyYTDb-bORlKsU9eKTFd8JHL9NxzG7JkRwBzPteorRbapr_zBuyYiV-Jg4eRKgNcrpXZi7rmd8PZQbkH-7BS94n9AyXcF2Qc4FzB8VHuk9M9-bN9Aa143N0b16WoC9zpNA7vFYaetRDbyCDNGxuR6Kc6rluasK6nA-F4JnDMsaFK8")' }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/10"></div>
              {/* Decorative Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(0,255,0,0.01),rgba(0,0,255,0.03))] bg-[size:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-4 w-full">
          <h1 className="text-white tracking-tight text-[44px] font-black font-display leading-[1] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
            المختبر الذكي
          </h1>
          <div className="h-1 w-12 bg-primary rounded-full mb-2"></div>
          <p className="text-slate-300 text-lg font-medium leading-relaxed max-w-[300px] drop-shadow-md">
            اكتشف أسرار العلوم من خلال تجارب تفاعلية مذهلة
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-6 pb-12 pt-6 z-10">
        <div className="flex flex-col gap-5">
          <button 
            onClick={onStart}
            className="relative w-full cursor-pointer flex items-center justify-center overflow-hidden rounded-2xl h-16 px-5 bg-primary hover:bg-[#124bd8] active:scale-[0.98] transition-all duration-300 text-white shadow-[0_8px_30px_rgb(19,91,236,0.3)] group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
            <span className="relative text-xl font-black leading-normal tracking-wide ml-3">ابدأ رحلة الاستكشاف</span>
            <div className="relative flex items-center justify-center size-8 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-white group-hover:text-primary transition-all duration-300">
              <span className="material-symbols-outlined rtl:rotate-180 text-[20px] transition-transform group-hover:translate-x-[-2px] font-bold">arrow_forward</span>
            </div>
          </button>
          
          <button className="text-slate-400 text-sm font-bold hover:text-white transition-colors tracking-wide">
            هل لديك حساب؟ <span className="text-primary hover:underline">تسجيل الدخول</span>
          </button>
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
};

export default Welcome;
