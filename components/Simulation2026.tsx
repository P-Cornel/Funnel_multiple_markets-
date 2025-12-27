import React from 'react';
import { GlassCard } from './GlassCard';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine 
} from 'recharts';
import { 
  Snowflake, 
  Flame, 
  TrendingDown, 
  Skull, 
  ShieldCheck, 
  Infinity, 
  Layers, 
  AlertTriangle,
  BarChart3,
  Video,
  Activity
} from 'lucide-react';
import { SimulationPhase, ForecastMetric } from '../types';

const phases: SimulationPhase[] = [
  {
    title: 'Phase 1: The "Snowball"',
    period: 'Jan 2026 - March 2026',
    state: 'Aggressive Growth',
    description: 'Algorithms are indexing your library. No follower fatigue yet. Platforms push to cold traffic.',
    behavior: [
      'IG: Floor rises to ~1,000 views/video',
      'TikTok: First 100k+ viral hit triggers follower spike'
    ],
    stats: {
      library: '~1,000 Videos',
      views: '~1.5 Million',
      followers: '5k - 8k',
      regression: '0% (Pure Growth)'
    },
    color: 'green'
  },
  {
    title: 'Phase 2: The "Saturation" Peak',
    period: 'April 2026 - August 2026',
    state: 'Peak Velocity / Golden Era',
    description: 'Passive traffic generates 20k-30k views/day. You become a Search dominant account.',
    behavior: [
      'IG: Recognized as "Red Cap" guy',
      'TikTok: High volatility (10k to 200k daily swings)'
    ],
    stats: {
      library: '~2,800 Videos',
      views: '~6 Million',
      followers: '25k - 40k',
      regression: 'Starts creeping in (Reach drops)'
    },
    color: 'gold'
  },
  {
    title: 'Phase 3: The "Great Regression"',
    period: 'Sept 2026 - Dec 2026',
    state: 'Diminishing Returns',
    description: 'Danger zone. Algorithm flags repetitive content. View cannibalization and follower fatigue set in.',
    behavior: [
      'View Cannibalization: Video A kills Video B',
      'Reach Threshold: Algorithm requires high-production hooks'
    ],
    stats: {
      library: '~7,000 Videos',
      views: '~10-12 Million',
      followers: '~60k (Growth flatlines)',
      regression: 'High (Avg view drops to 500)'
    },
    color: 'red'
  }
];

const forecastMetrics: ForecastMetric[] = [
  { label: 'Total Views', conservative: '8,500,000', optimistic: '15,000,000+' },
  { label: 'Followers', conservative: '35,000', optimistic: '100,000+' },
  { label: 'Library Size', conservative: '7,500 Videos', optimistic: '7,500 Videos' },
  { label: 'Status', conservative: '"Zombie" Channel', optimistic: 'Brand Channel' },
];

const chartData = [
  { month: 'Jan', views: 8000, phase: 'Snowball' },
  { month: 'Feb', views: 15000, phase: 'Snowball' },
  { month: 'Mar', views: 35000, phase: 'Snowball' },
  { month: 'Apr', views: 45000, phase: 'Saturation' },
  { month: 'May', views: 55000, phase: 'Saturation' },
  { month: 'Jun', views: 65000, phase: 'Saturation' },
  { month: 'Jul', views: 58000, phase: 'Saturation' },
  { month: 'Aug', views: 48000, phase: 'Saturation' },
  { month: 'Sep', views: 35000, phase: 'Regression' },
  { month: 'Oct', views: 25000, phase: 'Regression' },
  { month: 'Nov', views: 18000, phase: 'Regression' },
  { month: 'Dec', views: 12000, phase: 'Regression' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    let phaseColor = '#4ade80'; // green
    if (data.phase === 'Saturation') phaseColor = '#facc15'; // yellow
    if (data.phase === 'Regression') phaseColor = '#f87171'; // red

    return (
      <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-slate-400 text-xs mb-1">2026 • {label}</p>
        <p className="text-xl font-bold font-display text-white">
          {payload[0].value.toLocaleString()} <span className="text-xs font-normal text-slate-500">daily views</span>
        </p>
        <p className="text-xs font-bold uppercase mt-2" style={{ color: phaseColor }}>
            {data.phase} Phase
        </p>
      </div>
    );
  }
  return null;
};

export const Simulation2026: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Parameters */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Daily Input', value: '10 Videos/Day', icon: Video, color: 'text-cyan-400' },
          { label: 'Total 2026', value: '~7,000 Uploads', icon: Layers, color: 'text-purple-400' },
          { label: 'Content Type', value: '"Red Cap" Head', icon: Activity, color: 'text-pink-400' },
          { label: 'Key Variable', value: 'Algo Decay', icon: TrendingDown, color: 'text-rose-400' },
        ].map((item, i) => (
          <GlassCard key={i} delay={0.1 * i} className="flex flex-col items-center justify-center text-center p-4">
            <div className={`p-2 rounded-lg bg-white/5 mb-2 ${item.color}`}>
              <item.icon size={20} />
            </div>
            <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{item.label}</div>
            <div className="text-sm md:text-lg font-bold text-white font-display">{item.value}</div>
          </GlassCard>
        ))}
      </div>

      {/* Simulation Graph */}
      <GlassCard delay={0.15} className="flex flex-col h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <TrendingDown className="text-yellow-400" /> Velocity Curve 2026
          </h2>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400"></div>Snowball</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400"></div>Saturation</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-red-400"></div>Regression</div>
          </div>
        </div>
        
        <div className="flex-1 w-full min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSimulation" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="month" 
                stroke="#64748b" 
                fontSize={12} 
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748b" 
                fontSize={12} 
                tickFormatter={(value) => `${value / 1000}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine x="Mar" stroke="rgba(74, 222, 128, 0.5)" strokeDasharray="3 3" label={{ value: 'Q1', fill: '#4ade80', fontSize: 10, position: 'insideTopLeft' }} />
              <ReferenceLine x="Aug" stroke="rgba(250, 204, 21, 0.5)" strokeDasharray="3 3" label={{ value: 'Peak', fill: '#facc15', fontSize: 10, position: 'insideTopLeft' }} />
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#facc15" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorSimulation)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* 3 Phases */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Activity size={20} className="text-neon-blue" />
          <h2 className="text-2xl font-display font-bold text-white">The 2026 Timeline</h2>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {phases.map((phase, idx) => {
             const glowMap = {
                 green: 'neon-glow-blue border-t-cyan-500/50',
                 gold: 'neon-glow-purple border-t-yellow-500/50',
                 red: 'border-t-red-500/50 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]'
             };
             const iconMap = {
                 green: Snowflake,
                 gold: Flame,
                 red: TrendingDown
             };
             const Icon = iconMap[phase.color];
             
             return (
              <GlassCard key={idx} delay={0.2 + (idx * 0.1)} className={`flex flex-col h-full relative overflow-hidden ${glowMap[phase.color]}`}>
                 <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Icon size={100} />
                 </div>
                 
                 <div className="mb-4">
                    <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${
                        phase.color === 'green' ? 'text-cyan-400' : 
                        phase.color === 'gold' ? 'text-yellow-400' : 'text-red-400'
                    }`}>{phase.period}</div>
                    <h3 className="text-xl font-display font-bold text-white">{phase.title}</h3>
                    <div className="inline-block px-2 py-0.5 rounded bg-white/10 text-xs text-white mt-2 border border-white/10">
                        {phase.state}
                    </div>
                 </div>

                 <p className="text-sm text-slate-400 mb-6 flex-grow">{phase.description}</p>

                 <div className="bg-slate-900/50 rounded-lg p-3 mb-4 space-y-2 border border-white/5">
                    {phase.behavior.map((b, i) => (
                        <div key={i} className="flex gap-2 text-xs text-slate-300">
                            <span className="text-white/40">•</span> {b}
                        </div>
                    ))}
                 </div>

                 <div className="grid grid-cols-2 gap-2 text-xs border-t border-white/10 pt-4 mt-auto">
                    <div>
                        <span className="text-slate-500 block">Library</span>
                        <span className="text-white font-bold">{phase.stats.library}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Views</span>
                        <span className="text-white font-bold">{phase.stats.views}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Followers</span>
                        <span className="text-white font-bold">{phase.stats.followers}</span>
                    </div>
                    <div>
                        <span className="text-slate-500 block">Regression</span>
                        <span className={`${phase.color === 'red' ? 'text-red-400' : 'text-green-400'} font-bold`}>{phase.stats.regression}</span>
                    </div>
                 </div>
              </GlassCard>
             );
          })}
        </div>
      </div>

      {/* Forecast & Risk Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Statistical Forecast Table */}
          <GlassCard delay={0.5} className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
                <BarChart3 className="text-purple-400" />
                <h3 className="text-xl font-display font-bold text-white">Year-End Forecast</h3>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10">
                            <th className="py-3 px-4 text-xs font-bold text-slate-500 uppercase">Metric</th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase bg-red-500/10 rounded-t-lg">Conservative</th>
                            <th className="py-3 px-4 text-xs font-bold text-slate-400 uppercase bg-green-500/10 rounded-t-lg">Optimistic</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {forecastMetrics.map((row, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <td className="py-3 px-4 text-slate-300 font-medium">{row.label}</td>
                                <td className="py-3 px-4 text-slate-400 font-mono bg-red-500/5">{row.conservative}</td>
                                <td className="py-3 px-4 text-white font-mono font-bold bg-green-500/5 shadow-[inset_0_0_10px_rgba(34,197,94,0.1)]">{row.optimistic}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </GlassCard>

          {/* Risk & Strategy Column */}
          <div className="flex flex-col gap-6">
             {/* Death Scenario */}
             <GlassCard delay={0.6} className="border-red-500/30 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-600/5 animate-pulse"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3 text-red-400">
                        <Skull size={20} />
                        <h4 className="font-bold uppercase tracking-wider text-sm">Death Scenario</h4>
                    </div>
                    <div className="text-3xl font-display font-bold text-white mb-2">30% Risk</div>
                    <p className="text-xs text-slate-300 mb-3">
                        Total Shadowban by June 2026.
                        <br/>Symptoms: 200 view cap per video.
                    </p>
                    <div className="text-xs bg-red-950/50 text-red-200 p-2 rounded border border-red-500/20">
                        Trigger: 10/day volume with no quality improvement.
                    </div>
                </div>
             </GlassCard>

             {/* Strategy Pivot */}
             <GlassCard delay={0.7} className="border-cyan-500/30">
                <div className="flex items-center gap-2 mb-3 text-cyan-400">
                    <ShieldCheck size={20} />
                    <h4 className="font-bold uppercase tracking-wider text-sm">Strategic Pivot</h4>
                </div>
                <p className="text-xs text-slate-400 mb-2">To avoid Phase 3 Regression, execute in <span className="text-white font-bold">July 2026</span>:</p>
                <ul className="space-y-2">
                    <li className="flex gap-2 text-xs text-slate-200">
                        <AlertTriangle size={12} className="text-yellow-400 mt-0.5 shrink-0" />
                        <span><span className="text-red-400 font-bold">Cut Volume 50%:</span> Drop to 3-4 videos/day.</span>
                    </li>
                    <li className="flex gap-2 text-xs text-slate-200">
                        <AlertTriangle size={12} className="text-green-400 mt-0.5 shrink-0" />
                        <span><span className="text-green-400 font-bold">Quality+:</span> Captions, B-roll, focus on high-engagement hooks.</span>
                    </li>
                </ul>
             </GlassCard>
          </div>
      </div>

      {/* Final Inertia */}
      <GlassCard delay={0.8} className="flex items-center gap-6 border-t-purple-500/30 bg-gradient-to-r from-slate-900 to-purple-900/20">
        <div className="p-4 bg-purple-500/20 rounded-full text-purple-400 hidden sm:block">
            <Infinity size={32} />
        </div>
        <div>
            <h3 className="text-lg font-bold text-white mb-1">Final Verdict: The Inertia</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
                If you stop posting completely on <span className="text-white font-bold">Dec 31, 2026</span>, your library of 7,000 indexed videos will generate <span className="text-green-400 font-bold">50k - 100k views/month</span> for years on autopilot due to deep platform indexing.
            </p>
        </div>
      </GlassCard>

    </div>
  );
};
