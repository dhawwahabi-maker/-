
import React, { useState, useMemo } from 'react';
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

  const SimulationView = useMemo(() => {
    const title = experiment.title;
    // Year 3
    if (title.includes('الطفو والغوص')) return <FloatingSimulation />;
    if (title.includes('الهواء يشغل حيزًا')) return <AirVolumeSimulation />;
    if (title.includes('الضغط بالهواء')) return <AirPressureSimulation />;
    if (title.includes('الظل')) return <ShadowSimulation />;
    if (title.includes('مصادر الضوء')) return <LightSourcesSimulation />;
    if (title.includes('انعكاس الضوء')) return <ReflectionSimulation />;
    if (title.includes('الصوت والاهتزاز')) return <SoundVibrationSimulation />;
    if (title.includes('انتقال الصوت')) return <SoundTravelSimulation />;
    if (title.includes('تغير شكل الأجسام')) return <ForcesShapeSimulation />;
    
    // Year 4
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

  return (
    <div className="min-h-full pb-32 bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between p-4 h-16">
          <button onClick={onBack} className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined dark:text-white">arrow_forward</span>
          </button>
          <h2 className="text-lg font-bold dark:text-white">مختبر العلوم</h2>
          <button onClick={() => setIsBookmarked(!isBookmarked)} className={`size-10 flex items-center justify-center rounded-full transition-colors ${isBookmarked ? 'text-primary' : 'text-slate-400'}`}>
            <span className={`material-symbols-outlined ${isBookmarked ? 'filled' : ''}`} style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "" }}>bookmark</span>
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col w-full">
        {/* Interactive Simulation Area */}
        <div className="relative w-full aspect-[4/5] overflow-hidden shadow-inner">
          {SimulationView ? (
            SimulationView
          ) : (
            <div className="w-full h-full relative">
              <img src={experiment.imageUrl} className="w-full h-full object-cover" alt={experiment.title} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
        </div>

        <div className="px-5 text-right py-8">
          <div className="flex items-center justify-between mb-2">
             <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest">{experiment.category}</span>
             <span className="text-[10px] font-bold text-slate-400">{experiment.duration}</span>
          </div>
          <h1 className="text-3xl font-black mb-4 dark:text-white leading-tight">{experiment.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">{experiment.description}</p>

          <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[2.5rem] mb-8 border border-slate-100 dark:border-white/5 shadow-sm">
            <h3 className="font-black mb-4 dark:text-white text-sm uppercase tracking-widest">المواد والأدوات</h3>
            <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {experiment.materials.map(m => (
                <button 
                  key={m.id} 
                  onClick={() => handleMaterialClick(m.id, m.name)}
                  className={`flex-shrink-0 p-4 rounded-3xl border transition-all duration-300 flex flex-col items-center min-w-[100px] ${activeMaterialId === m.id ? 'bg-primary border-primary shadow-lg shadow-primary/20 scale-105' : 'bg-white dark:bg-slate-700 border-slate-100 dark:border-white/5'}`}
                >
                  <span className={`material-symbols-outlined mb-2 ${activeMaterialId === m.id ? 'text-white' : 'text-primary'}`}>{m.icon}</span>
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${activeMaterialId === m.id ? 'text-white' : 'dark:text-slate-300'}`}>{m.name}</span>
                </button>
              ))}
            </div>
            {activeMaterialId && (
              <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 animate-slide-up-fade">
                <p className="text-[11px] font-bold text-primary leading-relaxed italic">
                  {isMaterialLoading ? 'جاري التحليل...' : materialRole}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <h3 className="font-black dark:text-white text-sm uppercase tracking-widest mb-6">خطوات العمل</h3>
            {experiment.steps.map((s, i) => (
              <div key={i} className="group p-5 bg-white dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-white/5 flex gap-4 transition-all hover:shadow-md hover:border-primary/20">
                <p className="flex-1 text-sm dark:text-slate-300 leading-relaxed font-medium">{s}</p>
                <div className="size-8 flex-shrink-0 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-xs font-black transition-colors group-hover:bg-primary group-hover:text-white">
                  {i + 1}
                </div>
              </div>
            ))}
          </div>
          
          {experiment.safetyWarning && (
            <div className="mt-8 p-4 bg-red-500/10 rounded-2xl border border-red-500/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-red-500">warning</span>
              <p className="text-[10px] font-bold text-red-600 dark:text-red-400 text-right leading-tight">{experiment.safetyWarning}</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ExperimentDetail;
