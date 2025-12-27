import React, { useState, useEffect } from 'react';
import { SwissGoldSimulation } from './components/SwissGoldSimulation';
import { SimulationReport } from './components/SimulationReport';
import { Activity, FileDown, Loader2, Sparkles, Target, Zap, Globe, Flag, Volume2, VolumeX } from 'lucide-react';
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
      revshareRate: 3.0,
      avgSpend: 3500
    },
    DE: {
      totalViews: 45000000,
      targetShare: 55,
      profileVisitRate: 0.6,
      linkClickRate: 12,
      registrationRate: 18,
      ftdRate: 28,
      revshareRate: 3.5,
      avgSpend: 2500
    },
    UK: {
      totalViews: 35000000,
      targetShare: 100,
      profileVisitRate: 1.1,
      linkClickRate: 18,
      registrationRate: 25,
      ftdRate: 42,
      revshareRate: 4.0,
      avgSpend: 65 
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
      pdf.save(`${marketNames[activeMarket]}_Engine_Report_${new Date().toISOString().split('T')[0]}.pdf`);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen grid-bg relative selection:bg-amber-500/30 overflow-x-hidden">
      {/* Dynamic Background elements */}
      <div className={`fixed top-0 left-0 w-[800px] h-[800px] rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 transition-colors duration-1000 ${
        activeMarket === 'CH' ? 'bg-amber-600/10' : activeMarket === 'DE' ? 'bg-red-600/10' : 'bg-blue-600/10'
      }`}></div>
      <div className="fixed bottom-0 right-0 w-[1000px] h-[1000px] bg-slate-600/5 rounded-full blur-[160px] translate-x-1/3 translate-y-1/3 pointer-events-none z-0"></div>

      {/* Hidden Report for Export */}
      <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
         <SimulationReport data={{ ...marketParams[activeMarket], marketName: marketNames[activeMarket] }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-200"></span>
                </span>
                <span className="text-[10px] font-mono text-slate-400 tracking-[0.2em] uppercase font-bold">V5.0 Multi-Core</span>
              </div>
              <div className="h-px w-12 bg-white/10" />
              <span className="text-[10px] font-mono text-slate-500 tracking-[0.2em] uppercase font-bold">{marketNames[activeMarket]} Node</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-none">
              Market <span className={`text-transparent bg-clip-text bg-gradient-to-br transition-all duration-700 ${
                activeMarket === 'CH' ? 'from-amber-200 via-amber-400 to-yellow-600' : 
                activeMarket === 'DE' ? 'from-red-300 via-red-500 to-red-800' : 
                'from-blue-200 via-blue-500 to-indigo-800'
              } drop-shadow-sm`}>Optimizer</span>
            </h1>
            <p className="text-slate-400 text-base md:text-lg leading-relaxed font-light max-w-lg italic">
              Performance simulation terminal for <span className="text-white font-medium">Tier 1 European hubs</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center self-start lg:self-end">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="glass-panel p-4 rounded-xl text-slate-400 hover:text-white transition-all group border-white/10"
              title={isMuted ? "Unmute Interface" : "Mute Interface"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="animate-pulse" />}
            </button>

            <button
              onClick={exportSimulation}
              disabled={isExporting}
              className="w-full sm:w-auto glass-panel px-10 py-5 rounded-2xl flex items-center justify-center gap-4 text-sm font-bold text-white hover:bg-white/10 transition-all active:scale-95 disabled:opacity-50 border-white/10 group overflow-hidden relative"
            >
              {isExporting ? (
                <Loader2 size={18} className="animate-spin text-slate-400" />
              ) : (
                <FileDown size={18} className="text-slate-400 group-hover:scale-110 transition-transform" />
              )}
              <span className="relative z-10">{isExporting ? 'Processing...' : 'Export Intel'}</span>
            </button>
            
            <div className="flex gap-2 p-1.5 glass-panel rounded-2xl border-white/10">
              {(['CH', 'DE', 'UK'] as MarketId[]).map(id => (
                <button
                  key={id}
                  onClick={() => setActiveMarket(id)}
                  className={`px-5 py-3 rounded-xl text-xs font-black tracking-widest uppercase transition-all duration-500 flex items-center gap-2 ${
                    activeMarket === id 
                      ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)]' 
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

        {/* Main Content Area */}
        <main className="relative mb-20">
          <SwissGoldSimulation 
            params={marketParams[activeMarket]} 
            setParams={updateParams} 
            marketId={activeMarket}
            isMuted={isMuted}
          />
        </main>

        <footer className="mt-20 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 opacity-60">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-white/5 rounded-lg border border-white/10">
                 <Sparkles size={16} className="text-slate-400" />
               </div>
               <p className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.3em]">
                 Proprietary Strategy Matrix • {marketNames[activeMarket]} Optimized
               </p>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Protocol: Layer 5</span>
              <div className="h-4 w-px bg-white/10" />
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Calculated in 8ms</span>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
