import React, { useMemo, useCallback, useState } from 'react';
import { GlassCard } from './GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe2, 
  MousePointerClick, 
  UserPlus, 
  Wallet, 
  Flag, 
  Target, 
  Music, 
  RotateCcw, 
  ChevronRight,
  Info,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

interface Props {
  params: {
    totalViews: number;
    targetShare: number;
    profileVisitRate: number;
    linkClickRate: number;
    registrationRate: number;
    ftdRate: number;
  };
  setParams: (p: any) => void;
}

export const RomaniaSimulation: React.FC<Props> = ({ params, setParams }) => {
  const { totalViews, targetShare, profileVisitRate, linkClickRate, registrationRate, ftdRate } = params;
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const presets = {
    translated: { totalViews: 8000000, targetShare: 90, profileVisitRate: 0.6, linkClickRate: 15, registrationRate: 20, ftdRate: 35 },
    pacanele: { totalViews: 35000000, targetShare: 98, profileVisitRate: 1.0, linkClickRate: 20, registrationRate: 25, ftdRate: 35 },
    viral: { totalViews: 120000000, targetShare: 100, profileVisitRate: 1.5, linkClickRate: 25, registrationRate: 30, ftdRate: 35 }
  };

  const applyPreset = useCallback((p: keyof typeof presets) => {
    setParams(presets[p]);
  }, [setParams]);

  const roViews = Math.floor(totalViews * (targetShare / 100));
  const profileVisits = Math.floor(roViews * (profileVisitRate / 100));
  const linkClicks = Math.floor(profileVisits * (linkClickRate / 100));
  const registrations = Math.floor(linkClicks * (registrationRate / 100));
  const ftds = Math.floor(registrations * (ftdRate / 100));

  const steps = useMemo(() => [
    { 
      id: 'reach', 
      label: 'RO views', 
      input: totalViews, 
      output: roViews, 
      rate: targetShare, 
      setter: (v: number) => setParams({ targetShare: v }), 
      icon: Flag, 
      accent: 'bg-blue-500', 
      textColor: 'text-blue-400',
      fillColor: 'bg-blue-500/10',
      suffix: '%', min: 1, max: 100, step: 1, 
      explanation: 'Share of total DACH impressions successfully captured by RO native algorithms.' 
    },
    { 
      id: 'visit', 
      label: 'profile visits', 
      input: roViews, 
      output: profileVisits, 
      rate: profileVisitRate, 
      setter: (v: number) => setParams({ profileVisitRate: v }), 
      icon: UserPlus, 
      accent: 'bg-yellow-500', 
      textColor: 'text-yellow-400',
      fillColor: 'bg-yellow-500/10',
      suffix: '%', min: 0.1, max: 10, step: 0.1, 
      explanation: 'Conversion of RO native traffic to profile engagement.' 
    },
    { 
      id: 'click', 
      label: 'Link in bio clicked', 
      input: profileVisits, 
      output: linkClicks, 
      rate: linkClickRate, 
      setter: (v: number) => setParams({ linkClickRate: v }), 
      icon: MousePointerClick, 
      accent: 'bg-cyan-500', 
      textColor: 'text-cyan-400',
      fillColor: 'bg-cyan-500/10',
      suffix: '%', min: 5, max: 60, step: 1, 
      explanation: 'CTR efficiency for RO impulse market.' 
    },
    { 
      id: 'onboard', 
      label: 'Sing ups', 
      input: linkClicks, 
      output: registrations, 
      rate: registrationRate, 
      setter: (v: number) => setParams({ registrationRate: v }), 
      icon: Wallet, 
      accent: 'bg-purple-500', 
      textColor: 'text-purple-400',
      fillColor: 'bg-purple-500/10',
      suffix: '%', min: 5, max: 80, step: 1, 
      explanation: 'Account registration velocity for RO leads.' 
    },
    { 
      id: 'convert', 
      label: 'FTD', 
      input: registrations, 
      output: ftds, 
      rate: ftdRate, 
      setter: (v: number) => setParams({ ftdRate: v }), 
      icon: Target, 
      accent: 'bg-amber-500', 
      textColor: 'text-amber-400',
      fillColor: 'bg-amber-500/20',
      suffix: '%', min: 1, max: 95, step: 1, 
      explanation: 'The final revenue event: FTDs.' 
    },
  ], [totalViews, targetShare, profileVisitRate, linkClickRate, registrationRate, ftdRate, roViews, profileVisits, linkClicks, registrations, ftds, setParams]);

  const fluidTransition = {
    duration: 0.5,
    ease: [0.4, 0, 0.2, 1]
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-5xl mx-auto px-4 pb-20">
      <GlassCard className="relative overflow-hidden border-t-yellow-500/50 p-4" glowColor="purple">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-4">
             <div className="p-2.5 bg-yellow-500/20 rounded-xl text-yellow-400 border border-yellow-500/30">
               <Music size={18} />
             </div>
             <div>
               <h2 className="text-lg font-display font-bold text-white leading-none">Romania Funnel</h2>
               <p className="text-yellow-200/20 text-[8px] font-bold tracking-[0.2em] uppercase mt-1">Volume Engine</p>
             </div>
          </div>

          <div className="flex items-center gap-4 bg-black/20 p-2 rounded-xl border border-white/5">
             <div className="flex flex-col items-start px-2">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">DACH REGION VIEWS</span>
                <span className="text-xs font-mono font-bold text-yellow-400">{totalViews.toLocaleString()}</span>
             </div>
             <div className="w-px h-8 bg-white/10" />
             <input 
                type="range" min={1000000} max={300000000} step={1000000} value={totalViews}
                onChange={(e) => setParams({ totalViews: parseInt(e.target.value) })}
                className="w-32 md:w-48 h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
             />
          </div>
          
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
            {(['translated', 'pacanele', 'viral'] as const).map(p => (
              <button 
                key={p} 
                onClick={() => applyPreset(p)} 
                className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                  (p === 'translated' && totalViews === 8000000) || (p === 'pacanele' && totalViews === 35000000) || (p === 'viral' && totalViews === 120000000)
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                  : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="relative flex flex-col items-center">
        <div className="w-full space-y-2 flex flex-col items-center">
          {steps.map((step, i) => {
            const isExpanded = expandedId === step.id;
            const anyExpanded = expandedId !== null;
            const collapsedWidth = `${98 - (i * 6)}%`;
            const isFTD = step.id === 'convert';
            
            return (
              <motion.div 
                key={step.id}
                layout
                initial={false}
                animate={{ 
                  width: isExpanded ? "100%" : collapsedWidth,
                  opacity: anyExpanded && !isExpanded ? 0.45 : 1,
                  filter: anyExpanded && !isExpanded ? 'blur(1px)' : 'blur(0px)',
                  scale: anyExpanded && !isExpanded ? 0.98 : 1,
                  y: anyExpanded && !isExpanded ? (i < steps.findIndex(s => s.id === expandedId) ? -6 : 6) : 0,
                  zIndex: isExpanded ? 50 : 10 - i,
                }}
                transition={fluidTransition}
                className="relative w-full flex flex-col items-center"
              >
                <motion.div 
                  layout
                  onClick={() => setExpandedId(isExpanded ? null : step.id)}
                  className={`relative cursor-pointer w-full overflow-hidden border backdrop-blur-md transition-all duration-500 ${
                    isFTD 
                      ? 'bg-gradient-to-br from-amber-600/30 via-yellow-500/40 to-amber-600/30 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]' 
                      : `${step.fillColor} border-white/10`
                  } rounded-2xl ${isExpanded ? 'bg-white/[0.03] border-white/20 p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)]' : 'p-3 px-6 hover:bg-white/10'}`}
                >
                   {/* Shining Gold Glare Effect for FTD card */}
                   {isFTD && (
                    <motion.div 
                      initial={{ x: '-150%' }}
                      animate={{ x: '250%' }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none"
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.div 
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-between gap-4 relative z-10"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-1.5 rounded-lg ${step.accent}/20 ${isFTD ? 'text-amber-300' : step.textColor} border border-white/5`}>
                            <step.icon size={16} />
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-widest ${isFTD ? 'text-xl font-display text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] flex items-center gap-2' : 'text-white'}`}>
                            {step.label}
                            {isFTD && <Sparkles size={14} className="animate-pulse" />}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-8">
                          <div className="flex flex-col items-end">
                             <span className={`text-[7px] font-bold uppercase tracking-widest mb-0.5 opacity-50 ${isFTD ? 'text-amber-200' : step.textColor}`}>CVR</span>
                             <span className={`text-[10px] font-display font-bold ${isFTD ? 'text-amber-100' : step.textColor}`}>{step.rate}{step.suffix}</span>
                          </div>
                          <div className="flex flex-col items-center min-w-[70px]">
                             <span className={`text-[7px] font-bold uppercase tracking-widest ${isFTD ? 'text-amber-400/60' : 'text-slate-500'}`}>Yield</span>
                             <span className={`text-[10px] font-display font-bold ${isFTD ? 'text-amber-300' : step.textColor}`}>{step.output.toLocaleString()}</span>
                          </div>
                          <ChevronRight size={14} className={isFTD ? 'text-amber-400' : 'text-slate-600'} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                        className="w-full relative z-10"
                      >
                         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-3 lg:border-r border-white/10 lg:pr-6">
                               <div className={`inline-block p-4 rounded-3xl ${isFTD ? 'bg-amber-400/20 text-amber-300' : `${step.accent}/20 ${step.textColor}`} border border-white/10 mb-4`}>
                                 <step.icon size={32} />
                               </div>
                               <h3 className={`font-display font-bold uppercase tracking-wider mb-2 ${isFTD ? 'text-5xl text-amber-300 drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]' : 'text-xl text-white'}`}>
                                 {step.label}
                               </h3>
                               <p className={`text-[11px] leading-relaxed font-medium italic ${isFTD ? 'text-amber-100/70' : 'text-slate-200/60'}`}>
                                 {step.explanation}
                               </p>
                               <button 
                                 onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                                 className={`mt-6 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2 ${isFTD ? 'text-amber-400 hover:text-white' : 'text-slate-500 hover:text-white'}`}
                               >
                                 <ArrowLeft size={12} /> Back to Funnel
                               </button>
                            </div>

                            <div className="lg:col-span-6 flex flex-col items-center justify-center py-4">
                               <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-4 ${isFTD ? 'text-amber-400' : step.textColor}`}>Yield Optimization</span>
                               <div className={`font-display font-bold tracking-tighter tabular-nums flex items-baseline mb-6 ${isFTD ? 'text-[12rem] text-white drop-shadow-[0_0_40px_rgba(251,191,36,0.6)]' : 'text-8xl text-white'}`}>
                                 {step.rate}<span className={`text-3xl font-sans ml-2 opacity-30 ${isFTD ? 'text-amber-200' : ''}`}>{step.suffix}</span>
                               </div>
                               <div className="w-full max-w-sm px-4" onClick={e => e.stopPropagation()}>
                                  <input 
                                    type="range" min={step.min} max={step.max} step={step.step} value={step.rate}
                                    onChange={(e) => step.setter(parseFloat(e.target.value))}
                                    className={`w-full h-1.5 rounded-full appearance-none cursor-pointer hover:bg-white/20 transition-all ${isFTD ? 'bg-amber-400/20 accent-amber-300' : 'bg-white/10 accent-yellow-500'}`}
                                  />
                               </div>
                            </div>

                            <div className="lg:col-span-3 text-right">
                               <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isFTD ? 'text-amber-400/40' : 'text-white/40'}`}>Inflow</div>
                               <div className={`text-xl font-mono font-bold ${isFTD ? 'text-amber-200/60' : 'text-white/60'}`}>{step.input.toLocaleString()}</div>
                               <div className={`my-6 h-px ${isFTD ? 'bg-amber-400/20' : 'bg-white/10'}`} />
                               <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${isFTD ? 'text-amber-400/40' : 'text-white/40'}`}>Success Yield</div>
                               <div className={`font-display font-bold glow-text ${isFTD ? 'text-8xl text-amber-300 drop-shadow-[0_0_25px_rgba(251,191,36,0.8)]' : 'text-5xl text-white'}`}>
                                 {step.output.toLocaleString()}
                               </div>
                            </div>
                         </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 border-t border-white/5">
          <GlassCard className="flex flex-col items-center justify-center p-6 text-center" glowColor="purple">
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-[0.2em] mb-2 block">Alpha System Ratio</span>
              <span className="text-4xl font-display font-bold text-yellow-500 tabular-nums glow-text">
                {((ftds/totalViews)*100).toFixed(4)}%
              </span>
          </GlassCard>
          
          <GlassCard className="bg-yellow-500/5 p-6 rounded-2xl border border-yellow-500/10 flex flex-col items-center text-center">
              <span className="text-[10px] text-yellow-400 uppercase font-bold tracking-[0.2em] mb-2 block">Monthly Run-Rate</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-display font-bold text-white tabular-nums">{ftds.toLocaleString()}</span>
                <span className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">FTD</span>
              </div>
          </GlassCard>

          <GlassCard className="flex flex-col justify-center p-6 overflow-hidden">
              <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Info size={16} />
                <span className="text-[10px] uppercase font-bold tracking-widest">Market Context</span>
              </div>
              <p className="text-[10px] text-slate-400 italic leading-snug">
                The Romanian segment is volume-led. Focus on maximizing share of DACH impressions to trigger local algorithmic swells.
              </p>
          </GlassCard>
      </div>
    </div>
  );
};