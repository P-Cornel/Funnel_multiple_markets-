import React from 'react';
import { 
  Calculator, 
  Target, 
  Layers,
  ArrowRight
} from 'lucide-react';

interface ReportProps {
  data: {
    totalViews: number;
    targetShare: number;
    profileVisitRate: number;
    linkClickRate: number;
    registrationRate: number;
    ftdRate: number;
    marketName: string;
  };
}

export const SimulationReport: React.FC<ReportProps> = ({ data }) => {
  const { 
    totalViews, 
    targetShare, 
    profileVisitRate, 
    linkClickRate, 
    registrationRate, 
    ftdRate,
    marketName 
  } = data;

  // Calculations
  const targetViews = Math.floor(totalViews * (targetShare / 100));
  const profileVisits = Math.floor(targetViews * (profileVisitRate / 100));
  const linkClicks = Math.floor(profileVisits * (linkClickRate / 100));
  const registrations = Math.floor(linkClicks * (registrationRate / 100));
  const ftds = Math.floor(registrations * (ftdRate / 100));

  return (
    <div id="simulation-report" className="w-[800px] bg-[#020617] text-white p-12 font-sans border border-white/10">
      {/* Header */}
      <div className="flex justify-between items-start border-b border-white/10 pb-8 mb-8">
        <div>
          <div className="text-slate-400 font-mono text-xs font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
            <Target size={14} /> {marketName} Funnel Logistics
          </div>
          <h1 className="text-4xl font-display font-bold">Market Conversion Forecast</h1>
          <p className="text-slate-400 mt-1">Tier 1 Analytics • Player Flow Mapping</p>
        </div>
        <div className="text-right">
          <div className="text-slate-500 text-[10px] uppercase font-bold tracking-tighter">Generated</div>
          <div className="text-sm font-mono text-white">{new Date().toLocaleDateString()}</div>
        </div>
      </div>

      {/* Primary Funnel Summary */}
      <div className="bg-white/5 border border-white/10 p-10 rounded-3xl mb-12 flex items-center justify-between">
         <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Initial Reach</div>
            <div className="text-3xl font-display font-bold">{totalViews.toLocaleString()}</div>
         </div>
         <ArrowRight className="text-slate-700" size={24} />
         <div className="space-y-1 text-center">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Final Success</div>
            <div className="text-5xl font-display font-bold text-white glow-text">{ftds.toLocaleString()}</div>
         </div>
         <ArrowRight className="text-slate-700" size={24} />
         <div className="space-y-1 text-right">
            <div className="text-[10px] uppercase font-bold text-slate-500 tracking-widest">Net Efficiency</div>
            <div className="text-3xl font-display font-bold">{((ftds/totalViews)*100).toFixed(4)}%</div>
         </div>
      </div>

      {/* Detailed Step Breakdown */}
      <div className="mb-12">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
          <Layers size={16} /> Process Nodes
        </h3>
        <div className="space-y-4">
          {[
            { label: 'Gross Impressions', val: totalViews, pct: '100%', color: 'text-slate-500' },
            { label: `${marketName} Capture`, val: targetViews, pct: `${targetShare}%`, color: 'text-slate-400' },
            { label: 'Profile Visits', val: profileVisits, pct: `${profileVisitRate}%`, color: 'text-slate-400' },
            { label: 'Click Flow', val: linkClicks, pct: `${linkClickRate}%`, color: 'text-slate-400' },
            { label: 'Registrations', val: registrations, pct: `${registrationRate}%`, color: 'text-slate-400' },
            { label: 'FTD Event (Success)', val: ftds, pct: `${ftdRate}%`, color: 'text-white' },
          ].map((step, i) => (
            <div key={i} className="flex items-center gap-4 bg-white/5 border border-white/5 rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-xs font-bold text-slate-400">
                0{i + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-bold uppercase tracking-wider text-slate-200">{step.label}</span>
                  <span className="text-lg font-mono font-bold text-white">{step.val.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className={`text-[10px] font-bold ${step.color} tracking-widest uppercase`}>{step.pct} Conversion Step</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-white/10 text-center">
        <p className="text-[9px] text-slate-500 leading-relaxed uppercase tracking-[0.4em]">
          End of Report • {marketName} Optimization Terminal V5.0
        </p>
      </div>
    </div>
  );
};