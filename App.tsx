import React, { useState } from 'react';
import { SwissGoldSimulation } from './components/SwissGoldSimulation';
import { SimulationReport } from './components/SimulationReport';
import { 
  Target, 
  Globe, 
  FileDown, 
  Loader2, 
  Volume2, 
  VolumeX, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type MarketId = 'CH' | 'DE' | 'UK';

const App: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [activeMarket, setActiveMarket] = useState<MarketId>('CH');
  const [isMuted, setIsMuted] = useState(false);
  
  // Market Parameters State
  const [marketParams, setMarketParams] = useState<Record<MarketId, any>>({
    CH: {
      totalViews: 13500000,
      targetShare: 18,
      profileVisitRate: 0.8,
      linkClickRate: 15,
      registrationRate: 20,
      ftdRate: 35,
    },
    DE: {
      totalViews: 45000000,
      targetShare: 55,
      profileVisitRate: 0.6,
      linkClickRate: 12,
      registrationRate: 18,
      ftdRate: 28,
    },
    UK: {
      totalViews: 35000000,
      targetShare: 100,
      profileVisitRate: 1.1,
      linkClickRate: 18,
      registrationRate: 25,
      ftdRate: 42,
    }
  });

  const updateParams = (newParams: any) => {
    setMarketParams({
      ...marketParams,
      [activeMarket]: { ...marketParams[activeMarket], ...newParams }
    });
  };

  const marketNames: Record<MarketId, string> = {
    CH: 'Switzerland',
    DE: 'Germany',
    UK: 'United Kingdom'
  };

  const exportSimulation = async () => {
    const reportElement = document.getElementById('simulation-report');
    if (!reportElement) return;
    
    setIsExporting(true);
    try {
      reportElement.style.position = 'fixed';
      reportElement.style.left = '0';
      reportElement.style.top = '0';
      reportElement.style.zIndex = '9999';
      reportElement.style.visibility = 'visible';

      const canvas = await html2canvas(reportElement, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#020617',
        logging: false,
      });
      
      reportElement.style.position = 'absolute';
      reportElement.style.left = '-9999px';
      reportElement.style.visibility = 'hidden';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width / 2, canvas.height / 2],
      });
      
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${marketNames[activeMarket]}_Optimization_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg relative selection:bg-amber-500/30 overflow-x-hidden">
      {/* Dynamic Ambient Background */}
      <div className={`fixed top-0 left-0 w-[800px] h-[800px] rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 transition-colors duration-1000 ${
        activeMarket === 'CH' ? 'bg-amber-600/10' : activeMarket === 'DE' ? 'bg-red-600/10' : 'bg-blue-600/10'
      }`}></div>

      {/* Hidden Report for Export */}
      <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
         <SimulationReport data={{ ...marketParams[activeMarket], marketName: marketNames[activeMarket] }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Section */}
        <header className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="bg-white/5 border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-300"></span>
                </span>
                <span className="text-[10px] font-mono text-amber-400/80 tracking-[0.2em] uppercase font-bold">Protocol v5.4 Live</span>
              </div>
              
              <div className="h-4 w-px bg-white/10 hidden sm:block" />
              
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                <Target size={12} className="text-amber-500" /> Market Optimizer
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4 tracking-tight leading-none">
              Swiss Gold <span className={`text-transparent bg-clip-text bg-gradient-to-br transition-all duration-700 ${
                activeMarket === 'CH' ? 'from-amber-200 via-amber-400 to-yellow-600' : 
                activeMarket === 'DE' ? 'from-red-300 via-red-500 to-red-800' : 
                'from-blue-200 via-blue-500 to-indigo-800'
              } drop-shadow-sm`}>Engine</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-lg text-sm md:text-base leading-relaxed">
              Precision conversion modeling for Tier-1 regional expansion. Tune individual funnel nodes to project high-LTV acquisition growth.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center self-start lg:self-end">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="glass-panel p-4 rounded-2xl text-slate-400 hover:text-white transition-all group border-white/10 hover:border-white/20"
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse text-amber-500" />}
            </button>

            <button
              onClick={exportSimulation}
              disabled={isExporting}
              className="w-full sm:w-auto glass-panel px-8 py-4 rounded-2xl flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all border-white/10 group active:scale-95"
            >
              {isExporting ? <Loader2 size={16} className="animate-spin text-amber-500" /> : <FileDown size={16} className="text-amber-500" />}
              {isExporting ? 'Generating' : 'Export Intel'}
            </button>
            
            <div className="flex gap-1.5 p-1.5 glass-panel rounded-2xl border-white/10">
              {(['CH', 'DE', 'UK'] as MarketId[]).map(id => (
                <button
                  key={id}
                  onClick={() => setActiveMarket(id)}
                  className={`px-5 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-500 flex items-center gap-2 ${
                    activeMarket === id 
                      ? 'bg-white text-black shadow-[0_0_25px_rgba(255,255,255,0.1)]' 
                      : 'text-slate-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Globe size={14} className={activeMarket === id ? 'text-black' : 'text-slate-600'} />
                  {id}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Main Interface Area */}
        <main className="relative mb-24 min-h-[500px]">
          <SwissGoldSimulation 
            params={marketParams[activeMarket]} 
            setParams={updateParams} 
            marketId={activeMarket}
            isMuted={isMuted}
          />
        </main>

        <footer className="mt-24 border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8 opacity-50 pb-12">
            <div className="flex items-center gap-4">
               <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                 <Sparkles size={18} className="text-amber-400" />
               </div>
               <div>
                 <p className="text-white text-[10px] font-black uppercase tracking-[0.4em]">
                   V5.4 Optimizer
                 </p>
                 <p className="text-slate-500 text-[9px] font-bold uppercase tracking-widest mt-1">
                   Tier-1 Multi-Core Projection Logic
                 </p>
               </div>
            </div>
            <div className="flex items-center gap-10">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Protocol</span>
                <span className="text-[10px] font-mono text-white uppercase">Encrypted Terminal</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Security</span>
                <span className="text-[10px] font-mono text-white uppercase flex items-center gap-1">
                  <ShieldCheck size={10} className="text-emerald-500" /> Node Verified
                </span>
              </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;