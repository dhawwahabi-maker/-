
import React from 'react';
import { Screen } from '../types';

interface WelcomeProps {
  onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
  return (
    <div className="relative h-full w-full flex flex-col justify-between bg-white overflow-hidden">
      {/* Background Gradients - Bright and Fresh */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#eef2ff,transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#eff6ff,transparent_60%)]"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] animate-pulse-subtle"></div>

      <div className="h-4 w-full"></div>

      <div className="flex flex-1 flex-col items-center justify-center px-8 z-10 w-full max-w-md mx-auto">
        <div className="relative mb-12">
          {/* Glowing Aura for Icon - Royal Indigo Glow */}
          <div className="absolute inset-[-40px] bg-indigo-600/30 rounded-full blur-3xl opacity-70 animate-pulse"></div>
          <div className="absolute inset-[-20px] bg-blue-400/20 rounded-full blur-2xl opacity-40 animate-pulse delay-75"></div>
          
          <div 
            className="relative w-48 h-48 bg-center bg-no-repeat bg-cover rounded-4xl shadow-2xl border-4 border-white overflow-hidden transform animate-float transition-all duration-700 hover:scale-105" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDoxf2_jCb0BefCY8IU3N_ESB2lVHhVO-0L67YjDhVZKQk_KZ2qagzk91mG6hYmrYT4vLr6KLp9VMy0fxvOJJyavWgIrY1crGMyYTDb-bORlKsU9eKTFd8JHL9NxzG7JkRwBzPteorRbapr_zBuyYiV-Jg4eRKgNcrpXZi7rmd8PZQbkH-7BS94n9AyXcF2Qc4FzB8VHuk9M9-bN9Aa143N0b16WoC9zpNA7vFYaetRDbyCDNGxuR6Kc6rluasK6nA-F4JnDMsaFK8")' }}
          >
            {/* Royal Indigo overlay inside the bottle/image */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-700/50 via-indigo-500/20 to-transparent mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-indigo-600/10 mix-blend-screen"></div>
            {/* Added a small specific 'spark' glow for the Royal Indigo effect */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-12 h-12 bg-indigo-400 blur-xl opacity-60 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center space-y-6 w-full animate-slide-up-fade">
          <h1 className="text-slate-900 tracking-tight text-5xl font-black font-display leading-tight">
            المختبر <span className="text-indigo-600">الذكي</span>
          </h1>
          <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-[300px]">
            اكتشف أسرار العلوم من خلال تجارب تفاعلية مذهلة وممتعة في بيئة آمنة
          </p>
          <div className="flex gap-2">
            <div className="w-8 h-1.5 bg-indigo-600 rounded-full"></div>
            <div className="w-8 h-1.5 bg-blue-300 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-md mx-auto px-8 pb-16 pt-6 z-10 animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
        <div className="flex flex-col gap-6">
          <button 
            onClick={onStart}
            className="group relative w-full flex items-center justify-center rounded-3xl h-18 py-5 px-6 bg-indigo-600 hover:bg-indigo-700 transition-all duration-500 text-white shadow-xl shadow-indigo-200 overflow-hidden active:scale-95"
          >
            <span className="relative text-xl font-black leading-none ml-4">ابدأ رحلة الاستكشاف</span>
            <div className="relative flex items-center justify-center size-10 rounded-2xl bg-white/20 backdrop-blur-md group-hover:bg-white group-hover:text-indigo-600 transition-all duration-300">
              <span className="material-symbols-outlined rtl:rotate-180 text-2xl font-black">arrow_forward</span>
            </div>
          </button>
          
          <button className="text-slate-400 text-sm font-bold hover:text-indigo-600 transition-colors tracking-wide flex items-center justify-center gap-1">
            هل لديك حساب؟ <span className="text-indigo-600 font-black hover:underline">تسجيل الدخول</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
