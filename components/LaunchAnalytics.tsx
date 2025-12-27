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
  ReferenceLine,
  Label
} from 'recharts';
import { 
  Zap, 
  TrendingUp, 
  Target, 
  Rocket, 
  Activity, 
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';

const dayData = [
  { day: 'Day 1', views: 500, state: 'Testing', efficiency: 20 },
  { day: 'Day 2', views: 850, state: 'Testing', efficiency: 25 },
  { day: 'Day 3', views: 1200, state: 'Testing', efficiency: 32 },
  { day: 'Day 4', views: 3200, state: 'Optimization', efficiency: 58 },
  { day: 'Day 5', views: 5800, state: 'Scaling', efficiency: 75 },
  { day: 'Day 6', views: 8400, state: 'Scaling', efficiency: 88 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-slate-900/95 border border-amber-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
        <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">{label}</p>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl font-display font-bold text-white">
            {data.views.toLocaleString()}
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20 font-bold">
            {data.state}
          </span>
        </div>
        <div className="text-[10px] text-slate-500 font-medium">
          Efficiency: <span className="text-emerald-400">{data.efficiency}%</span>
        </div>
      </div>
    );
  }
  return null;
};

export const LaunchAnalytics: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Momentum Inflection Card */}
        <GlassCard delay={0.1} className="lg:col-span-2 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <TrendingUp size={160} />
          </div>
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                <Rocket className="text-amber-400" size={20} />
                Momentum Inflection
              </h3>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mt-1">The Day 4 Breakout</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                <span className="text-[10px] text-slate-500 font-bold uppercase">Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
                <span className="text-[10px] text-amber-400 font-bold uppercase">Scaling</span>
              </div>
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="Day 3" stroke="#fbbf24" strokeDasharray="5 5" strokeOpacity={0.5}>
                  <Label value="INFLECTION" position="insideTopRight" fill="#fbbf24" fontSize={10} fontWeight={900} />
                </ReferenceLine>
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#fbbf24" 
                  strokeWidth={3} 
                  fillOpacity={1} 
                  fill="url(#colorViews)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Shift Stats */}
        <div className="space-y-4">
          <GlassCard delay={0.2} className="border-l-4 border-l-emerald-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Growth Velocity</span>
              <div className="p-1.5 bg-emerald-500/20 rounded-lg text-emerald-400">
                <ArrowUpRight size={14} />
              </div>
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">+680%</div>
            <p className="text-[10px] text-slate-400 italic">Impressions increase since Day 3 baseline shift.</p>
          </GlassCard>

          <GlassCard delay={0.3} className="border-l-4 border-l-amber-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Engine Status</span>
              <div className="p-1.5 bg-amber-500/20 rounded-lg text-amber-400">
                <Activity size={14} />
              </div>
            </div>
            <div className="text-xl font-display font-bold text-white mb-1 uppercase tracking-tight">System: Scaling</div>
            <p className="text-[10px] text-slate-400 italic">Algorithm has successfully indexed the Tier-1 node.</p>
          </GlassCard>

          <GlassCard delay={0.4} className="border-l-4 border-l-cyan-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Efficiency Lock</span>
              <div className="p-1.5 bg-cyan-500/20 rounded-lg text-cyan-400">
                <ShieldCheck size={14} />
              </div>
            </div>
            <div className="text-3xl font-display font-bold text-white mb-1">88%</div>
            <p className="text-[10px] text-slate-400 italic">Target profile engagement consistency across Day 6.</p>
          </GlassCard>
        </div>
      </div>

      <GlassCard delay={0.5} className="bg-gradient-to-r from-slate-900 to-amber-900/10 border-amber-500/20">
        <div className="flex flex-col md:flex-row items-center gap-8 py-2">
          <div className="h-16 w-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 shrink-0 border border-amber-500/30">
            <Zap size={32} />
          </div>
          <div>
            <h4 className="text-lg font-bold text-white mb-1">The "Gold" Signal Found</h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Your data confirms the pivot from <span className="text-white font-bold">Cold Testing</span> to <span className="text-amber-400 font-bold">Algorithmic Push</span>. 
              The shift on Day 4 indicates the platform has identified your core audience segment. High-volume consistency is now the primary lever for exponential growth.
            </p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};