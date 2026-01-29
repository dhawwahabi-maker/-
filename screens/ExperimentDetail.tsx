
import React, { useState, useMemo, useRef } from 'react';
import { Experiment } from '../types';
import { geminiService } from '../services/geminiService';

// Import Modular Simulations
import { ShadowSimulation } from '../simulations/ShadowSimulation';
import { MagnetismSimulation } from '../simulations/MagnetismSimulation';
import { MatterSimulation } from '../simulations/MatterSimulation';
import { IceMeltingSimulation } from '../simulations/IceMeltingSimulation';
import { ReflectionSimulation } from '../simulations/ReflectionSimulation';
import { EvaporationSimulation } from '../simulations/EvaporationSimulation';
import { HeatTransferSimulation } from '../simulations/HeatTransferSimulation';
import { ElectricitySimulation } from '../simulations/ElectricitySimulation';

// New Year 3 Simulations
import { FloatingSimulation } from '../simulations/FloatingSimulation';
import { AirVolumeSimulation } from '../simulations/AirVolumeSimulation';
import { AirPressureSimulation } from '../simulations/AirPressureSimulation';
import { LightSourcesSimulation } from '../simulations/LightSourcesSimulation';
import { SoundVibrationSimulation } from '../simulations/SoundVibrationSimulation';
import { SoundTravelSimulation } from '../simulations/SoundTravelSimulation';
import { ForcesShapeSimulation } from '../simulations/ForcesShapeSimulation';

interface ExperimentDetailProps {
  experiment: Experiment;
  onBack: () => void;
}

const ExperimentDetail: React.FC<ExperimentDetailProps> = ({ experiment, onBack }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activeMaterialId, setActiveMaterialId] = useState<string | null>(null);
  const [materialRole, setMaterialRole] = useState<string>('');
  const [isMaterialLoading, setIsMaterialLoading] = useState(false);
  const simulationContainerRef = useRef<HTMLDivElement>(null);

  const SimulationView = useMemo(() => {
    const title = experiment.title;
    if (title.includes('الطفو والغوص')) return <FloatingSimulation />;
    if (title.includes('الهواء يشغل حيزًا')) return <AirVolumeSimulation />;
    if (title.includes('الضغط بالهواء')) return <AirPressureSimulation />;
    if (title.includes('الظل')) return <ShadowSimulation />;
    if (title.includes('مصادر الضوء')) return <LightSourcesSimulation />;
    if (title.includes('انعكاس الضوء')) return <ReflectionSimulation />;
    if (title.includes('الصوت والاهتزاز')) return <SoundVibrationSimulation />;
    if (title.includes('انتقال الصوت')) return <SoundTravelSimulation />;
    if (title.includes('تغير شكل الأجسام')) return <ForcesShapeSimulation />;
    if (title.includes('المغناطيس')) return <MagnetismSimulation />;
    if (title.includes('حالات المادة')) return <MatterSimulation />;
    if (title.includes('انصهار الجليد')) return <IceMeltingSimulation />;
    if (title.includes('التبخر')) return <EvaporationSimulation />;
    if (title.includes('انتقال الحرارة')) return <HeatTransferSimulation />;
    if (title.includes('الدائرة الكهربائية')) return <ElectricitySimulation />;
    return null;
  }, [experiment.title]);

  const handleMaterialClick = async (materialId: string, materialName: string) => {
    if (activeMaterialId === materialId) {
      setActiveMaterialId(null);
      return;
    }
    setActiveMaterialId(materialId);
    setMaterialRole('');
    setIsMaterialLoading(true);
    const role = await geminiService.getMaterialRole(experiment.title, materialName);
    setMaterialRole(role || '');
    setIsMaterialLoading(false);
  };

  const toggleSimulationFullscreen = () => {
    if (simulationContainerRef.current) {
      if (!document.fullscreenElement) {
        simulationContainerRef.current.requestFullscreen().catch(err => {
          console.error("Error toggling simulation fullscreen:", err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="min-h-full pb-32 bg-background">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-100 p-4 h-18">
        <div className="flex items-center justify-between px-2">
          <button onClick={onBack} className="size-11 flex items-center justify-center rounded-2xl hover:bg-slate-50 transition border border-slate-200 text-slate-700">
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
          <h2 className="text-xl font-black text-slate-900 font-display">مختبر العلوم</h2>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className={`size-11 flex items-center justify-center rounded-2xl transition border ${isBookmarked ? 'bg-primary/10 text-primary border-primary/20' : 'text-slate-400 border-slate-200 hover:bg-slate-50'}`}>
            <span className={`material-symbols-outlined ${isBookmarked ? 'filled' : ''}`} style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "" }}>bookmark</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        {/* Simulation Area - Rounded & High Contrast */}
        <div ref={simulationContainerRef} className="relative w-full aspect-[4/5] overflow-hidden shadow-xl z-10 bg-slate-100 group">
          {SimulationView ? SimulationView : (
            <div className="w-full h-full relative">
              <img src={experiment.imageUrl} className="w-full h-full object-cover" alt={experiment.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
            </div>
          )}
          
          {/* Fullscreen Option for Simulation */}
          {SimulationView && (
            <button 
              onClick={toggleSimulationFullscreen}
              className="absolute bottom-4 right-4 z-20 size-12 rounded-2xl bg-black/40 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity active:scale-90"
              title="تكبير المحاكاة"
            >
              <span className="material-symbols-outlined">zoom_out_map</span>
            </button>
          )}

          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary opacity-30"></div>
        </div>

        <div className="px-6 text-right py-10 relative bg-white rounded-t-4xl -mt-8 z-20 shadow-[0_-20px_40px_rgba(0,0,0,0.03)]">
          <div className="flex items-center justify-between mb-4">
             <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest border border-primary/10">{experiment.category}</span>
             <div className="flex items-center gap-2 text-slate-400">
               <span className="material-symbols-outlined text-sm">schedule</span>
               <span className="text-[11px] font-black">{experiment.duration}</span>
             </div>
          </div>
          
          <h1 className="text-3xl font-black mb-6 text-slate-900 leading-tight font-display tracking-tight">{experiment.title}</h1>
          <p className="text-slate-500 mb-12 leading-relaxed font-medium text-base">{experiment.description}</p>

          <div className="bg-slate-50 p-8 rounded-4xl mb-12 border border-slate-100 shadow-inner">
            <h3 className="font-black mb-8 text-slate-400 text-xs uppercase tracking-[0.2em]">المواد والأدوات</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
              {experiment.materials.map(m => (
                <button 
                  key={m.id} 
                  onClick={() => handleMaterialClick(m.id, m.name)}
                  className={`flex-shrink-0 p-6 rounded-3xl border transition-all duration-500 flex flex-col items-center min-w-[120px] ${activeMaterialId === m.id ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-105' : 'bg-white border-slate-200 shadow-sm text-slate-500'}`}
                >
                  <div className={`size-14 rounded-2xl mb-4 flex items-center justify-center transition-colors ${activeMaterialId === m.id ? 'bg-white/20' : 'bg-primary/5'}`}>
                    <span className={`material-symbols-outlined text-3xl ${activeMaterialId === m.id ? 'text-white' : 'text-primary'}`}>{m.icon}</span>
                  </div>
                  <span className={`text-[11px] font-black uppercase text-center ${activeMaterialId === m.id ? 'text-white' : 'text-slate-700'}`}>{m.name}</span>
                </button>
              ))}
            </div>
            {activeMaterialId && (
              <div className="mt-8 p-6 bg-primary/5 rounded-3xl border border-primary/10 animate-slide-up-fade shadow-sm">
                <div className="flex items-start gap-4">
                  <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
                  <p className="text-sm font-bold text-primary/80 leading-relaxed italic">
                    {isMaterialLoading ? 'جاري التحليل العلمي...' : materialRole}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <h3 className="font-black text-slate-400 text-xs uppercase tracking-[0.2em] mb-8">خطوات العمل</h3>
            {experiment.steps.map((s, i) => (
              <div key={i} className="group p-7 bg-white rounded-4xl border border-slate-100 flex gap-6 transition-all duration-300 hover:border-primary/30 hover:shadow-lg shadow-sm">
                <div className="size-11 flex-shrink-0 bg-primary/5 text-primary rounded-2xl flex items-center justify-center text-sm font-black transition-all group-hover:bg-primary group-hover:text-white">
                  {i + 1}
                </div>
                <p className="flex-1 text-base text-slate-700 leading-relaxed font-bold">{s}</p>
              </div>
            ))}
          </div>
          
          {experiment.safetyWarning && (
            <div className="mt-12 p-6 bg-rose-50 rounded-4xl border border-rose-100 flex items-start gap-5">
              <div className="size-12 rounded-2xl bg-rose-500/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-rose-500 text-3xl">warning</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-black text-rose-500 uppercase tracking-widest block mb-2">تنبيه السلامة</span>
                <p className="text-xs font-black text-rose-600/80 leading-relaxed">{experiment.safetyWarning}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExperimentDetail;
