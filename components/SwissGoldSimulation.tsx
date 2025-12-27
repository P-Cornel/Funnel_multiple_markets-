import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { GlassCard } from './GlassCard';
import { motion, AnimatePresence } from 'framer-motion';
import { useFuturisticSounds } from '../hooks/useFuturisticSounds';
import { 
  Mountain, 
  MousePointerClick, 
  UserPlus, 
  Wallet, 
  Globe, 
  Target, 
  ChevronRight,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';

interface Props {
  marketId: 'CH' | 'DE' | 'UK';
  isMuted?: boolean;
  params: {
    totalViews: number;
    targetShare: number;
    profileVisitRate: number;
    linkClickRate: number;
    registrationRate: number;
    ftdRate: number;
    revshareRate: number;
    avgSpend: number;
  };
  setParams: (p: any) => void;
}

export const SwissGoldSimulation: React.FC<Props> = ({ marketId, params, setParams, isMuted = false }) => {
  const { totalViews, targetShare, profileVisitRate, linkClickRate, registrationRate, ftdRate } = params;
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const { playHover, playClick, playTick, playExpand, playSuccess } = useFuturisticSounds();

  const presets = {
    CH: {
      conservative: { totalViews: 5000000, targetShare: 10, profileVisitRate: 0.4, linkClickRate: 8, registrationRate: 12, ftdRate: 20 },
      realistic: { totalViews: 13500000, targetShare: 18, profileVisitRate: 0.8, linkClickRate: 15, registrationRate: 20, ftdRate: 35 },
      optimistic: { totalViews: 45000000, targetShare: 25, profileVisitRate: 1.2, linkClickRate: 25, registrationRate: 35, ftdRate: 50 }
    },
    DE: {
      conservative: { totalViews: 20000000, targetShare: 40, profileVisitRate: 0.3, linkClickRate: 6, registrationRate: 10, ftdRate: 18 },
      realistic: { totalViews: 45000000, targetShare: 55, profileVisitRate: 0.6, linkClickRate: 12, registrationRate: 18, ftdRate: 28 },
      optimistic: { totalViews: 120000000, targetShare: 80, profileVisitRate: 1.0, linkClickRate: 20, registrationRate: 28, ftdRate: 45 }
    },
    UK: {
      conservative: { totalViews: 15000000, targetShare: 100, profileVisitRate: 0.5, linkClickRate: 10, registrationRate: 15, ftdRate: 25 }, 
      realistic: { totalViews: 35000000, targetShare: 100, profileVisitRate: 1.1, linkClickRate: 18, registrationRate: 25, ftdRate: 42 }, 
      optimistic: { totalViews: 85000000, targetShare: 100, profileVisitRate: 1.6, linkClickRate: 30, registrationRate: 38, ftdRate: 55 }
    }
  };

  const handleInteraction = useCallback((type: 'hover' | 'click' | 'tick' | 'expand' | 'success') => {
    if (isMuted) return;
    if (type === 'hover') playHover();
    if (type === 'click') playClick();
    if (type === 'tick') playTick();
    if (type === 'expand') playExpand();
    if (type === 'success') playSuccess();
  }, [isMuted, playHover, playClick, playTick, playExpand, playSuccess]);

  const applyPreset = useCallback((p: 'conservative' | 'realistic' | 'optimistic') => {
    handleInteraction('click');
    setParams(presets[marketId][p]);
  }, [setParams, marketId, handleInteraction]);

  const marketViews = Math.floor(totalViews * (targetShare / 100));
  const profileVisits = Math.floor(marketViews * (profileVisitRate / 100));
  const linkClicks = Math.floor(profileVisits * (linkClickRate / 100));
  const registrations = Math.floor(linkClicks * (registrationRate / 100));
  const ftds = Math.floor(registrations * (ftdRate / 100));

  const themes = {
    CH: { color: 'amber', hex: '#fbbf24', text: 'text-amber-400', glow: 'shadow-amber-500/20' },
    DE: { color: 'red', hex: '#ef4444', text: 'text-red-500', glow: 'shadow-red-500/20' },
    UK: { color: 'blue', hex: '#3b82f6', text: 'text-blue-500', glow: 'shadow-blue-500/20' }
  };
  const activeTheme = themes[marketId];

  const steps = useMemo(() => [
    { 
      id: 'reach', 
      label: `${marketId} views`, 
      input: totalViews, 
      output: marketViews, 
      rate: targetShare, 
      setter: (v: number) => setParams({ targetShare: v }), 
      icon: Globe, 
      accent: marketId === 'CH' ? 'bg-slate-400' : activeTheme.text.replace('text', 'bg'), 
      textColor: 'text-slate-300',
      fillColor: 'bg-slate-500/10',
      suffix: '%', min: 1, max: 100, step: 1, 
      explanation: `Efficiency in capturing specific ${marketId} traffic from broader regional pools.` 
    },
    { 
      id: 'intent', 
      label: 'profile visits', 
      input: marketViews, 
      output: profileVisits, 
      rate: profileVisitRate, 
      setter: (v: number) => setParams({ profileVisitRate: v }), 
      icon: UserPlus, 
      accent: 'bg-rose-500', 
      textColor: 'text-rose-400',
      fillColor: 'bg-rose-500/10',
      suffix: '%', min: 0.1, max: 10, step: 0.1, 
      explanation: 'Native conversion from content views to profile interest.' 
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
      suffix: '%', min: 1, max: 50, step: 1, 
      explanation: 'Visitors clicking the high-intent primary destination link.' 
    },
    { 
      id: 'signup', 
      label: 'Sign ups', 
      input: linkClicks, 
      output: registrations, 
      rate: registrationRate, 
      setter: (v: number) => setParams({ registrationRate: v }), 
      icon: Wallet, 
      accent: 'bg-purple-500', 
      textColor: 'text-purple-400',
      fillColor: 'bg-purple-500/10',
      suffix: '%', min: 5, max: 80, step: 1, 
      explanation: 'Registration efficiency from landing page traffic.' 
    },
    { 
      id: 'ftd', 
      label: 'FTD (Deposits)', 
      input: registrations, 
      output: ftds, 
      rate: ftdRate, 
      setter: (v: number) => setParams({ ftdRate: v }), 
      icon: Target, 
      accent: activeTheme.text.replace('text', 'bg'), 
      textColor: activeTheme.text,
      fillColor: marketId === 'CH' ? 'bg-amber-500/20' : activeTheme.text.replace('text', 'bg') + '/20',
      suffix: '%', min: 1, max: 95, step: 1, 
      explanation: 'Final conversion stage: High-LTV First Time Deposits.' 
    },
  ], [totalViews, targetShare, profileVisitRate, linkClickRate, registrationRate, ftdRate, marketViews, profileVisits, linkClicks, registrations, ftds, setParams, marketId, activeTheme]);

  const fluidTransition = {
    duration: 0.4,
    ease: [0.4, 0, 0.2, 1]
  };

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      handleInteraction('click');
      setExpandedId(null);
    } else {
      handleInteraction(id === 'ftd' ? 'success' : 'expand');
      setExpandedId(id);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700 max-w-5xl mx-auto px-4 pb-20">
      {/* Top Console */}
      <GlassCard className={`border-t-${activeTheme.color}-500/50 p-4`} glowColor="none">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 shrink-0">
             <div className={`p-2.5 ${activeTheme.text.replace('text', 'bg')}/20 rounded-xl ${activeTheme.text} border border-current/30`}>
               <Mountain size={18} />
             </div>
             <div>
               <h2 className="text-lg font-display font-bold text-white leading-none uppercase tracking-tight">Funnel Core</h2>
               <p className="text-slate-500 text-[8px] font-bold tracking-[0.2em] uppercase mt-1">Traffic Input</p>
             </div>
          </div>

          <div className="flex flex-1 items-center gap-4 bg-black/20 p-2 px-4 rounded-xl border border-white/5 w-full">
             <div className="flex flex-col items-start min-w-[100px]">
                <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Impressions</span>
                <span className="text-[10px] md:text-xs font-mono font-bold text-white">{totalViews.toLocaleString()}</span>
             </div>
             <div className="w-px h-8 bg-white/10 shrink-0" />
             <div className="flex-1 flex items-center h-8">
               <input 
                  type="range" min={100000} max={300000000} step={100000} value={totalViews}
                  onMouseDown={() => handleInteraction('click')}
                  onInput={() => handleInteraction('tick')}
                  onChange={(e) => setParams({ totalViews: parseInt(e.target.value) })}
                  className="w-full"
               />
             </div>
          </div>
          
          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
            {(['conservative', 'realistic', 'optimistic'] as const).map(p => {
              const isActive = (p === 'conservative' && totalViews === presets[marketId].conservative.totalViews) || 
                              (p === 'realistic' && totalViews === presets[marketId].realistic.totalViews) || 
                              (p === 'optimistic' && totalViews === presets[marketId].optimistic.totalViews);
              return (
                <button 
                  key={p} 
                  onClick={() => applyPreset(p)} 
                  onMouseEnter={() => handleInteraction('hover')}
                  className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all ${
                    isActive
                    ? `${activeTheme.text.replace('text', 'bg')} text-black shadow-lg`
                    : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Funnel Section with Stacked Layout */}
      <div className="relative flex flex-col items-center">
        <div className="w-full space-y-2 flex flex-col items-center">
          {steps.map((step, i) => {
            const isExpanded = expandedId === step.id;
            const anyExpanded = expandedId !== null;
            const collapsedWidth = `${98 - (i * 4)}%`;
            const isFTD = step.id === 'ftd';
            
            return (
              <motion.div 
                key={step.id}
                layout
                initial={false}
                animate={{ 
                  width: isExpanded ? (isFTD ? "85%" : "100%") : collapsedWidth,
                  opacity: anyExpanded && !isExpanded ? 0.35 : 1,
                  filter: anyExpanded && !isExpanded ? 'blur(1.5px)' : 'blur(0px)',
                  scale: anyExpanded && !isExpanded ? 0.97 : 1,
                  y: anyExpanded && !isExpanded ? (i < steps.findIndex(s => s.id === expandedId) ? -4 : 4) : 0,
                  zIndex: isExpanded ? 50 : 10 - i,
                }}
                transition={fluidTransition}
                className="relative w-full flex flex-col items-center"
              >
                <motion.div 
                  layout
                  onMouseEnter={() => !isExpanded && handleInteraction('hover')}
                  onClick={() => toggleExpand(step.id)}
                  className={`relative cursor-pointer w-full overflow-hidden border backdrop-blur-md transition-all duration-300 ${
                    isFTD 
                      ? `bg-gradient-to-br from-${activeTheme.color}-600/25 via-${activeTheme.color}-500/35 to-${activeTheme.color}-600/25 border-${activeTheme.color}-400/40 shadow-[0_0_25px_rgba(0,0,0,0.3)]` 
                      : `${step.fillColor} border-white/10`
                  } rounded-2xl md:rounded-[2rem] ${isExpanded ? 'bg-slate-900/95 border-white/20 p-5 md:p-8' : 'p-3 px-6 hover:bg-white/10'}`}
                >
                  {isFTD && (
                    <motion.div 
                      initial={{ x: '-150%' }}
                      animate={{ x: '250%' }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {!isExpanded ? (
                      <motion.div 
                        key="collapsed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-between gap-4 relative z-10"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-1.5 rounded-lg shrink-0 ${step.accent}/20 ${isFTD ? activeTheme.text : step.textColor} border border-white/5`}>
                            <step.icon size={16} />
                          </div>
                          <span className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isFTD ? `text-lg md:text-xl font-display ${activeTheme.text} drop-shadow-[0_0_8px_rgba(0,0,0,0.4)]` : 'text-white'}`}>
                            {step.label}
                            {isFTD && <Sparkles size={12} className="animate-pulse" />}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-4 md:gap-8">
                          <div className="hidden sm:flex flex-col items-end">
                             <span className={`text-[7px] font-bold uppercase tracking-widest mb-0.5 opacity-50 ${isFTD ? 'text-white' : step.textColor}`}>CVR</span>
                             <span className={`text-[10px] font-display font-bold ${isFTD ? 'text-white' : step.textColor}`}>{step.rate}{step.suffix}</span>
                          </div>
                          <div className="flex flex-col items-end min-w-[60px] md:min-w-[70px]">
                             <span className={`text-[7px] font-bold uppercase tracking-widest ${isFTD ? 'text-white/60' : 'text-slate-500'}`}>Yield</span>
                             <span className={`text-[10px] font-mono font-bold ${isFTD ? 'text-white' : 'text-white'}`}>{step.output.toLocaleString()}</span>
                          </div>
                          <ChevronRight size={14} className={isFTD ? 'text-white' : 'text-slate-600'} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full relative z-10"
                      >
                         <div className={`grid grid-cols-1 ${isFTD ? 'lg:grid-cols-2 lg:gap-12' : 'lg:grid-cols-12 lg:gap-8'} items-center`}>
                            
                            {/* Header Info */}
                            <div className={`${isFTD ? 'lg:col-span-1' : 'lg:col-span-3'} lg:border-r border-white/10 lg:pr-6`}>
                               <div className={`inline-block p-4 rounded-3xl ${isFTD ? `bg-${activeTheme.color}-400/20 ${activeTheme.text}` : `${step.accent}/20 ${step.textColor}`} border border-white/10 mb-4`}>
                                 <step.icon size={32} />
                               </div>
                               <h3 className={`font-display font-bold uppercase tracking-wider mb-2 ${isFTD ? `text-5xl ${activeTheme.text} glow-text` : 'text-xl text-white'}`}>
                                 {step.label}
                               </h3>
                               <p className={`text-[11px] leading-relaxed font-medium italic opacity-70 ${isFTD ? 'text-white/70' : 'text-slate-300'}`}>
                                 {step.explanation}
                               </p>

                               {isFTD && marketId === 'UK' && (
                                 <div className="mt-6 flex flex-col gap-1.5">
                                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 p-1.5 rounded-lg border border-blue-500/20">
                                       <AlertCircle size={10} /> £5 Max Stake Limit Active
                                    </div>
                                    <div className="flex items-center gap-1.5 text-[8px] font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 p-1.5 rounded-lg border border-emerald-500/20">
                                       <ShieldCheck size={10} /> Affordability Checks Phases
                                    </div>
                                 </div>
                               )}
                               
                               <button 
                                 onClick={(e) => { e.stopPropagation(); toggleExpand(step.id); }}
                                 className={`mt-6 text-[9px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2 ${isFTD ? activeTheme.text : 'text-slate-500 hover:text-white'}`}
                               >
                                 <ArrowLeft size={12} /> Back to Funnel
                               </button>
                            </div>

                            {/* Center Interaction Area */}
                            <div className={`${isFTD ? 'lg:col-span-1' : 'lg:col-span-9'} flex flex-col md:flex-row items-center justify-between`}>
                                <div className="flex-1 flex flex-col items-center justify-center py-4">
                                   <span className={`text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-40 ${isFTD ? 'text-white' : step.textColor}`}>Optimization</span>
                                   <div className={`font-display font-bold tracking-tighter tabular-nums flex items-baseline mb-6 ${isFTD ? 'text-[8rem] text-white drop-shadow-xl' : 'text-8xl text-white'}`}>
                                     {step.rate}<span className="text-2xl font-sans ml-2 opacity-20">%</span>
                                   </div>
                                   <div className="w-full max-w-[280px] px-4 h-12 flex items-center" onClick={e => e.stopPropagation()}>
                                      <input 
                                        type="range" min={step.min} max={step.max} step={step.step} value={step.rate}
                                        onMouseDown={() => handleInteraction('click')}
                                        onInput={() => handleInteraction('tick')}
                                        onChange={(e) => step.setter(parseFloat(e.target.value))}
                                        className="w-full"
                                      />
                                   </div>
                                </div>

                                <div className="w-full md:w-auto text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-8">
                                   <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-40 text-white">Inbound</div>
                                   <div className="text-xl font-mono font-bold text-white/50">{step.input.toLocaleString()}</div>
                                   <div className="my-4 h-px bg-white/10 hidden md:block" />
                                   <div className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-40 text-white">Success Rate</div>
                                   <div className={`font-display font-bold ${isFTD ? 'text-6xl text-white glow-text' : 'text-5xl text-white'}`}>
                                     {step.output.toLocaleString()}
                                   </div>
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
      
      <div className="pt-10 border-t border-white/5 text-center">
        <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] font-bold">
          {marketId} conversion dynamics visualized — V5 Process
        </p>
      </div>
    </div>
  );
};
