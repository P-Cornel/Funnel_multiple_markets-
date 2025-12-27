import React, { useMemo, useCallback, useState } from 'react';
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
  ShieldCheck,
  TrendingUp
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
      label: `${marketId} Segment Share`, 
      input: totalViews, 
      output: marketViews, 
      rate: targetShare, 
      setter: (v: number) => setParams({ targetShare: v }), 
      icon: Globe, 
      accent: marketId === 'CH' ? 'bg-slate-400' : activeTheme.text.replace('text', 'bg'), 
      textColor: 'text-slate-300',
      fillColor: 'bg-slate-500/10',
      suffix: '%', min: 1, max: 100, step: 1, 
      explanation: `The percentage of total impressions effectively reaching the specific ${marketId} audience.` 
    },
    { 
      id: 'intent', 
      label: 'Profile Visit Velocity', 
      input: marketViews, 
      output: profileVisits, 
      rate: profileVisitRate, 
      setter: (v: number) => setParams({ profileVisitRate: v }), 
      icon: UserPlus, 
      accent: 'bg-rose-500', 
      textColor: 'text-rose-400',
      fillColor: 'bg-rose-500/10',
      suffix: '%', min: 0.1, max: 10, step: 0.1, 
      explanation: 'Viewers transitioning from content engagement to active profile exploration.' 
    },
    { 
      id: 'click', 
      label: 'Link-in-Bio CTR', 
      input: profileVisits, 
      output: linkClicks, 
      rate: linkClickRate, 
      setter: (v: number) => setParams({ linkClickRate: v }), 
      icon: MousePointerClick, 
      accent: 'bg-cyan-500', 
      textColor: 'text-cyan-400',
      fillColor: 'bg-cyan-500/10',
      suffix: '%', min: 1, max: 50, step: 1, 
      explanation: 'Conversion of profile visitors to high-intent primary destination clicks.' 
    },
    { 
      id: 'signup', 
      label: 'Onboarding Efficiency', 
      input: linkClicks, 
      output: registrations, 
      rate: registrationRate, 
      setter: (v: number) => setParams({ registrationRate: v }), 
      icon: Wallet, 
      accent: 'bg-purple-500', 
      textColor: 'text-purple-400',
      fillColor: 'bg-purple-500/10',
      suffix: '%', min: 5, max: 80, step: 1, 
      explanation: 'Landing page registration performance for qualified Tier-1 leads.' 
    },
    { 
      id: 'ftd', 
      label: 'Conversion / Success (FTD)', 
      input: registrations, 
      output: ftds, 
      rate: ftdRate, 
      setter: (v: number) => setParams({ ftdRate: v }), 
      icon: Target, 
      accent: activeTheme.text.replace('text', 'bg'), 
      textColor: activeTheme.text,
      fillColor: marketId === 'CH' ? 'bg-amber-500/20' : activeTheme.text.replace('text', 'bg') + '/20',
      suffix: '%', min: 1, max: 95, step: 1, 
      explanation: 'The ultimate revenue event: Qualified First Time Deposits.' 
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
    <div className="space-y-10 animate-in fade-in duration-1000 max-w-5xl mx-auto pb-20">
      {/* Simulation Control Console */}
      <GlassCard className={`border-t-${activeTheme.color}-500/50 p-6`} glowColor="none">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-5 shrink-0">
             <div className={`p-3 ${activeTheme.text.replace('text', 'bg')}/20 rounded-2xl ${activeTheme.text} border border-current/30 shadow-lg`}>
               <Mountain size={22} />
             </div>
             <div>
               <h2 className="text-xl font-display font-bold text-white leading-none uppercase tracking-tight flex items-center gap-2">
                 Input Console
                 <TrendingUp size={14} className="opacity-50" />
               </h2>
               <p className="text-slate-500 text-[9px] font-black tracking-[0.3em] uppercase mt-2">Gross impressions baseline</p>
             </div>
          </div>

          <div className="flex-1 w-full space-y-3">
            <div className="flex justify-between px-1">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Scaling Power</span>
              <span className="text-[11px] font-mono font-bold text-white">{totalViews.toLocaleString()} <span className="text-slate-500">VIEWS</span></span>
            </div>
            <div className="flex items-center gap-4 bg-black/40 p-3 rounded-2xl border border-white/5 w-full">
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
          </div>
          
          <div className="flex items-center gap-2 bg-black/40 p-2 rounded-2xl border border-white/10 shrink-0">
            {(['conservative', 'realistic', 'optimistic'] as const).map(p => {
              const isActive = (p === 'conservative' && totalViews === presets[marketId].conservative.totalViews) || 
                              (p === 'realistic' && totalViews === presets[marketId].realistic.totalViews) || 
                              (p === 'optimistic' && totalViews === presets[marketId].optimistic.totalViews);
              return (
                <button 
                  key={p} 
                  onClick={() => applyPreset(p)} 
                  onMouseEnter={() => handleInteraction('hover')}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 ${
                    isActive
                    ? `${activeTheme.text.replace('text', 'bg')} text-black shadow-[0_0_15px_rgba(251,191,36,0.3)]`
                    : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>
      </GlassCard>

      {/* Funnel Visualization Stage */}
      <div className="relative flex flex-col items-center pt-4">
        <div className="w-full space-y-3 flex flex-col items-center">
          {steps.map((step, i) => {
            const isExpanded = expandedId === step.id;
            const anyExpanded = expandedId !== null;
            const collapsedWidth = `${100 - (i * 3)}%`;
            const isFTD = step.id === 'ftd';
            
            return (
              <motion.div 
                key={step.id}
                layout
                initial={false}
                animate={{ 
                  width: isExpanded ? "100%" : collapsedWidth,
                  opacity: anyExpanded && !isExpanded ? 0.35 : 1,
                  filter: anyExpanded && !isExpanded ? 'blur(2px)' : 'blur(0px)',
                  scale: anyExpanded && !isExpanded ? 0.98 : 1,
                  y: anyExpanded && !isExpanded ? (i < steps.findIndex(s => s.id === expandedId) ? -8 : 8) : 0,
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
                      ? `bg-gradient-to-br from-${activeTheme.color}-600/20 via-${activeTheme.color}-500/30 to-${activeTheme.color}-600/20 border-${activeTheme.color}-400/40 shadow-[0_0_30px_rgba(0,0,0,0.4)]` 
                      : `${step.fillColor} border-white/5`
                  } rounded-2xl md:rounded-[2.5rem] ${isExpanded ? 'bg-slate-900/95 border-white/20 p-6 md:p-10 shadow-2xl' : 'p-4 px-8 hover:bg-white/10 hover:border-white/10'}`}
                >
                  {isFTD && (
                    <motion.div 
                      initial={{ x: '-150%' }}
                      animate={{ x: '250%' }}
                      transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
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
                        className="flex items-center justify-between gap-6 relative z-10"
                      >
                        <div className="flex items-center gap-5">
                          <div className={`p-2 rounded-xl shrink-0 ${step.accent}/20 ${isFTD ? activeTheme.text : step.textColor} border border-white/5`}>
                            <step.icon size={18} />
                          </div>
                          <span className={`text-xs font-black uppercase tracking-[0.15em] flex items-center gap-3 ${isFTD ? `text-xl md:text-2xl font-display ${activeTheme.text} drop-shadow-lg` : 'text-white'}`}>
                            {step.label}
                            {isFTD && <Sparkles size={14} className="animate-pulse text-white" />}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-6 md:gap-12">
                          <div className="hidden sm:flex flex-col items-end">
                             <span className={`text-[8px] font-black uppercase tracking-[0.2em] mb-1 opacity-40 ${isFTD ? 'text-white' : step.textColor}`}>OPTIMIZED CVR</span>
                             <span className={`text-xs font-display font-bold ${isFTD ? 'text-white' : step.textColor}`}>{step.rate}{step.suffix}</span>
                          </div>
                          <div className="flex flex-col items-end min-w-[80px] md:min-w-[100px]">
                             <span className={`text-[8px] font-black uppercase tracking-[0.2em] opacity-40 ${isFTD ? 'text-white/60' : 'text-slate-500'}`}>PROJECTED FLOW</span>
                             <span className={`text-xs font-mono font-bold ${isFTD ? 'text-white' : 'text-white'}`}>{step.output.toLocaleString()}</span>
                          </div>
                          <ChevronRight size={18} className={isFTD ? 'text-white opacity-50' : 'text-slate-700'} />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="expanded"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full relative z-10"
                      >
                         <div className={`grid grid-cols-1 ${isFTD ? 'lg:grid-cols-2 lg:gap-16' : 'lg:grid-cols-12 lg:gap-10'} items-center`}>
                            
                            {/* Descriptive Section */}
                            <div className={`${isFTD ? 'lg:col-span-1' : 'lg:col-span-4'} lg:border-r border-white/10 lg:pr-10`}>
                               <div className={`inline-block p-5 rounded-[2rem] ${isFTD ? `bg-${activeTheme.color}-400/20 ${activeTheme.text}` : `${step.accent}/20 ${step.textColor}`} border border-white/10 mb-6 shadow-inner`}>
                                 <step.icon size={40} />
                               </div>
                               <h3 className={`font-display font-bold uppercase tracking-wider mb-3 leading-tight ${isFTD ? `text-6xl ${activeTheme.text} glow-text` : 'text-2xl text-white'}`}>
                                 {step.label}
                               </h3>
                               <p className={`text-sm leading-relaxed font-medium italic opacity-60 ${isFTD ? 'text-white/80' : 'text-slate-400'}`}>
                                 {step.explanation}
                               </p>

                               {isFTD && (
                                 <div className="mt-8 flex flex-col gap-3">
                                    <div className="flex items-center gap-2.5 text-[9px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 p-2.5 rounded-2xl border border-amber-500/20">
                                       <AlertCircle size={12} /> Regional Scaling Cap: Automated
                                    </div>
                                    <div className="flex items-center gap-2.5 text-[9px] font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 p-2.5 rounded-2xl border border-emerald-500/20">
                                       <ShieldCheck size={12} /> LTV Verification Complete
                                    </div>
                                 </div>
                               )}
                               
                               <button 
                                 onClick={(e) => { e.stopPropagation(); toggleExpand(step.id); }}
                                 className={`mt-10 text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-2 ${isFTD ? 'text-white hover:text-amber-400' : 'text-slate-500 hover:text-white hover:translate-x-[-4px]'}`}
                               >
                                 <ArrowLeft size={14} /> Close Node
                               </button>
                            </div>

                            {/* Center Optimization Area */}
                            <div className={`${isFTD ? 'lg:col-span-1' : 'lg:col-span-8'} flex flex-col md:flex-row items-center justify-between mt-8 lg:mt-0`}>
                                <div className="flex-1 flex flex-col items-center justify-center py-6 w-full">
                                   <span className={`text-[11px] font-black uppercase tracking-[0.5em] mb-6 opacity-30 ${isFTD ? 'text-white' : step.textColor}`}>CALIBRATION</span>
                                   <div className={`font-display font-bold tracking-tighter tabular-nums flex items-baseline mb-10 transition-all duration-300 ${isFTD ? 'text-[10rem] text-white drop-shadow-2xl' : 'text-9xl text-white'}`}>
                                     {step.rate}<span className="text-3xl font-sans ml-3 opacity-20">%</span>
                                   </div>
                                   <div className="w-full max-w-[320px] px-6 h-12 flex items-center" onClick={e => e.stopPropagation()}>
                                      <input 
                                        type="range" min={step.min} max={step.max} step={step.step} value={step.rate}
                                        onMouseDown={() => handleInteraction('click')}
                                        onInput={() => handleInteraction('tick')}
                                        onChange={(e) => step.setter(parseFloat(e.target.value))}
                                        className="w-full"
                                      />
                                   </div>
                                </div>

                                <div className="w-full md:w-auto text-center md:text-right border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 mt-8 md:mt-0">
                                   <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-30 text-white">Inbound flow</div>
                                   <div className="text-2xl font-mono font-bold text-white/40 mb-10">{step.input.toLocaleString()}</div>
                                   
                                   <div className="text-[10px] font-black uppercase tracking-widest mb-2 opacity-30 text-white">Projected Yield</div>
                                   <div className={`font-display font-bold ${isFTD ? 'text-7xl text-white glow-text' : 'text-6xl text-white'}`}>
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
      
      {/* Footer Branding */}
      <div className="pt-16 border-t border-white/5 text-center">
        <div className="inline-flex items-center gap-3 bg-white/5 px-6 py-2 rounded-full border border-white/10 mb-4">
           <ShieldCheck size={14} className="text-emerald-500" />
           <p className="text-[10px] text-slate-400 uppercase tracking-[0.4em] font-black">
             {marketId} Node Calibration Protocol Stable
           </p>
        </div>
      </div>
    </div>
  );
};