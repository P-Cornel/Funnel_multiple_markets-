import React from 'react';
import { motion } from 'framer-motion';
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
  Rocket, 
  TrendingUp, 
  Activity, 
  Cpu, 
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

const shiftData = [
  { day: 'Day 1', views: 420, phase: 'Testing', strength: 12 },
  { day: 'Day 2', views: 680, phase: 'Testing', strength: 18 },
  { day: 'Day 3', views: 910, phase: 'Testing', strength: 22 },
  { day: 'Day 4', views: 2800, phase: 'Alpha Scaling', strength: 55 },
  { day: 'Day 5', views: 5400, phase: 'Alpha Scaling', strength: 78 },
  { day: 'Day 6', views: 8900, phase: 'Alpha Scaling', strength: 94 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isScaling = data.phase === 'Alpha Scaling';
    return (
      <div className="bg-slate-900/95 border border-amber-500/30 p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
        <p className="text-slate-500 text-[9px] uppercase font-black tracking-widest mb-1">{label}</p>
        <div className="flex items-center gap-3 mb-2">
          <div className="text-2xl font-display font-bold text-white">
            {data.views.toLocaleString()} <span className="text-xs font-sans text-slate-500 font-normal">views</span>
          </div>
        </div>
        <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block border ${
          isScaling ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-slate-800 text-slate-400 border-white/5'
        }`}>
          {data.phase}
        </div>
      </div>
    );
  }
  return null;
};

export const DaySixShift: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Momentum Chart */}
        <GlassCard className="lg:col-span-2 relative overflow-hidden h-[450px]">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Rocket size={180} />
          </div>
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div>
              <h3 className="text-2xl font-display font-bold text-white flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400">
                  <TrendingUp size={20} />
                </div>
                The Day 6 Momentum Shift
              </h3>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em] mt-2">
                Real-world algorithmic indexing trajectory
              </p>
            </div>
            
            <div className="hidden sm:flex gap-4">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-slate-700"></div>
                 <span className="text-[9px] text-slate-500 font-bold uppercase">Testing Phase</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_8px_#fbbf24]"></div>
                 <span className="text-[9px] text-amber-400 font-bold uppercase tracking-widest">Alpha Scaling</span>
               </div>
            </div>
          </div>

          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={shiftData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMomentum" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#fbbf24" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.02)" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#475569', fontSize: 10, fontWeight: 800}}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="Day 3" stroke="#fbbf24" strokeDasharray="5 5" strokeOpacity={0.6}>
                  <Label value="INFLECTION" position="insideTopRight" fill="#fbbf24" fontSize={10} fontWeight={900} />
                </ReferenceLine>
                <Area 
                  type="monotone" 
                  dataKey="views" 
                  stroke="#fbbf24" 
                  strokeWidth={4} 
                  fillOpacity={1} 
                  fill="url(#colorMomentum)" 
                  animationDuration={2500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Intelligence Column */}
        <div className="space-y-4">
           <GlassCard className="border-l-4 border-l-amber-500 bg-amber-500/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                  <Zap size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yield Surge</span>
              </div>
              <div className="text-4xl font-display font-bold text-white mb-1">+878%</div>
              <p className="text-[11px] text-slate-500 italic">Day 6 volume relative to Day 3 baseline.</p>
           </GlassCard>

           <GlassCard className="border-l-4 border-l-cyan-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                  <Cpu size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Signal Clarity</span>
              </div>
              <div className="text-2xl font-display font-bold text-white mb-1 uppercase tracking-tighter">System Locked</div>
              <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '94%' }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="bg-cyan-400 h-full shadow-[0_0_8px_#22d3ee]"
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-[8px] font-bold text-slate-600 uppercase">Indexing Confidence</span>
                <span className="text-[10px] font-mono text-cyan-400">94.2%</span>
              </div>
           </GlassCard>

           <GlassCard className="border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tier-1 Status</span>
              </div>
              <div className="text-xl font-display font-bold text-white mb-1">PROFITABLE NODE</div>
              <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Algorithm has successfully categorized your content within the high-intent Swiss luxury niche.</p>
           </GlassCard>
        </div>
      </div>

      {/* Summary Narrative */}
      <GlassCard className="bg-gradient-to-r from-slate-900 to-amber-900/10 border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 text-amber-500/10 group-hover:text-amber-500/20 transition-colors">
          <Activity size={80} />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-8 py-4 relative z-10">
          <div className="h-20 w-20 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
            <Rocket size={40} className="animate-bounce" style={{ animationDuration: '3s' }} />
          </div>
          <div className="flex-1">
            <h4 className="text-xl font-display font-bold text-white mb-2">The Transition Verdict</h4>
            <p className="text-sm text-slate-400 leading-relaxed max-w-3xl">
              Your first 6 days confirm a classic <span className="text-white font-bold">Validation Cycle</span>. 
              The massive shift from Day 3 (Testing) to Day 4 (Alpha Scaling) indicates that the "Swiss Gold Engine" has moved from cold-start to active pushing. 
              The plateauing risk is gone; you are now in a high-velocity feedback loop.
            </p>
            <div className="flex gap-4 mt-6">
               <div className="flex items-center gap-2 text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                  <div className="w-1 h-1 bg-amber-500 rounded-full animate-ping" />
                  Algorithm: INDEXED
               </div>
               <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                  <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                  Velocity: SCALING
               </div>
            </div>
          </div>
          <button className="px-6 py-3 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-amber-400 transition-colors flex items-center gap-2 shrink-0">
             Next Phase <ArrowRight size={14} />
          </button>
        </div>
      </GlassCard>
    </div>
  );
};