import React from 'react';
import { GlassCard } from './GlassCard';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { 
  Target, 
  Briefcase, 
  Coffee, 
  TrendingUp, 
  Users, 
  Crown, 
  Zap,
  PlayCircle,
  Eye
} from 'lucide-react';

const scenarios = [
  {
    name: 'Conservative',
    subtitle: 'The Grind / Hobby',
    icon: Coffee,
    color: 'text-slate-400',
    barColor: '#94a3b8',
    glow: 'none',
    premise: 'Creative Burnout. Drop to 3-4 videos/day. No innovation.',
    metrics: {
      uploads: '1,500',
      avgViews: '800',
      totalViews: '1.2M',
      followers: '5k'
    },
    verdict: 'Maintainable baseline. Channel remains a niche interest.'
  },
  {
    name: 'Realistic',
    subtitle: 'The Business',
    icon: Briefcase,
    color: 'text-emerald-400',
    barColor: '#34d399',
    glow: 'green',
    premise: 'Sustainable 6-8 videos/day. Consistent optimization. Mini-viral hits.',
    metrics: {
      uploads: '3,000',
      avgViews: '4,500',
      totalViews: '13.5M',
      followers: '45k'
    },
    verdict: 'High-authority status. Significant market influence.'
  },
  {
    name: 'Optimistic',
    subtitle: 'The Empire',
    icon: Crown,
    color: 'text-amber-400',
    barColor: '#fbbf24',
    glow: 'purple',
    premise: 'Domination. Team effort (20/day). Mega-viral waves & Algorithmic dominance.',
    metrics: {
      uploads: '7,000',
      avgViews: '12,000',
      totalViews: '84M',
      followers: '180k+'
    },
    verdict: 'Top 1% creator status. Massive media reach.'
  }
];

const chartData = [
  { name: 'Conservative', views: 1200000, label: '1.2M' },
  { name: 'Realistic', views: 13500000, label: '13.5M' },
  { name: 'Optimistic', views: 84000000, label: '84M' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-slate-400 text-xs mb-1">{label} Scenario</p>
        <p className="text-xl font-bold font-display text-white">
          {payload[0].value.toLocaleString()}
        </p>
        <p className="text-xs text-emerald-400 font-bold uppercase mt-1">
            Total Projected Views
        </p>
      </div>
    );
  }
  return null;
};

export const HotStreaksProjection: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* Header Context */}
      <GlassCard className="relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <Target size={150} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-display font-bold text-white mb-2">Ultimate Projection Model</h2>
            <p className="text-slate-400 text-sm">Forecasting "Hot Streaks Clips" from Dec 16, 2025 to Dec 31, 2026</p>
            <div className="flex gap-2 mt-4">
              <span className="bg-white/5 text-xs font-bold px-3 py-1 rounded-full border border-white/10 text-slate-300">
                ~12.5 Months
              </span>
              <span className="bg-white/5 text-xs font-bold px-3 py-1 rounded-full border border-white/10 text-slate-300">
                Channel Growth
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-cyan-500/10 rounded-lg text-cyan-400">
              <Zap size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold">Current Velocity</div>
              <div className="text-xl font-bold text-white font-display">4,500 views/day</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <div className="text-xs text-slate-500 uppercase font-bold">Growth Stage</div>
              <div className="text-xl font-bold text-white font-display">Day 6</div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario, idx) => (
          <GlassCard 
            key={idx} 
            delay={0.2 + (idx * 0.1)} 
            // @ts-ignore
            glowColor={scenario.glow}
            className="flex flex-col h-full relative group"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-xl bg-white/5 ${scenario.color}`}>
                <scenario.icon size={28} />
              </div>
              <div>
                <h3 className="text-xl font-display font-bold text-white">{scenario.name}</h3>
                <span className={`text-xs uppercase font-bold tracking-wider ${scenario.color}`}>
                  {scenario.subtitle}
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 mb-6 min-h-[60px]">
              {scenario.premise}
            </p>

            {/* Metrics Mini Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-slate-900/50 p-2 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 uppercase">Uploads</div>
                <div className="text-sm font-bold text-white">{scenario.metrics.uploads}</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 uppercase">Total Views</div>
                <div className="text-sm font-bold text-white">{scenario.metrics.totalViews}</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 uppercase">Followers</div>
                <div className="text-sm font-bold text-white">{scenario.metrics.followers}</div>
              </div>
              <div className="bg-slate-900/50 p-2 rounded border border-white/5">
                <div className="text-[10px] text-slate-500 uppercase">Avg Views</div>
                <div className="text-sm font-bold text-white">{scenario.metrics.avgViews}</div>
              </div>
            </div>

            <div className={`p-3 rounded-lg text-xs font-bold text-center border mt-auto ${
              scenario.name === 'Conservative' ? 'bg-slate-800/50 border-slate-700 text-slate-400' :
              scenario.name === 'Realistic' ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400' :
              'bg-amber-900/20 border-amber-500/30 text-amber-400'
            }`}>
              {scenario.verdict}
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Comparison Chart & Inertia */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Growth Chart */}
        <GlassCard delay={0.5} className="flex flex-col min-h-[300px]">
          <div className="flex items-center gap-2 mb-6">
            <Eye className="text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Total View Volume Comparison</h3>
          </div>
          <div className="flex-1 w-full h-[250px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickFormatter={(val) => `${val/1000000}M`} tickLine={false} axisLine={false} />
                  <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} content={<CustomTooltip />} />
                  <Bar dataKey="views" radius={[4, 4, 0, 0]} animationDuration={1500}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={scenarios[index].barColor} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Inertia Check */}
        <GlassCard delay={0.6} className="flex flex-col">
           <div className="flex items-center gap-2 mb-6">
            <PlayCircle className="text-purple-400" />
            <h3 className="text-lg font-bold text-white">The "Inertia" Check (Jan 1, 2027)</h3>
           </div>
           
           <div className="space-y-4">
             <div className="p-3 rounded-lg bg-slate-900/50 border border-white/5 flex gap-3">
                <div className="mt-1 min-w-[4px] h-full bg-slate-500 rounded-full"></div>
                <div>
                  <div className="text-xs text-slate-500 font-bold uppercase mb-1">Conservative Scenario</div>
                  <p className="text-sm text-slate-300">Channel reach decays quickly. Engagement becomes negligible in weeks.</p>
                </div>
             </div>
             <div className="p-3 rounded-lg bg-emerald-900/10 border border-emerald-500/20 flex gap-3">
                <div className="mt-1 min-w-[4px] h-full bg-emerald-500 rounded-full"></div>
                <div>
                  <div className="text-xs text-emerald-500 font-bold uppercase mb-1">Realistic Scenario</div>
                  <p className="text-sm text-slate-300">Maintains <span className="text-white font-bold">~50k monthly views</span> passively from the 3,000 video catalog.</p>
                </div>
             </div>
             <div className="p-3 rounded-lg bg-amber-900/10 border border-amber-500/20 flex gap-3">
                <div className="mt-1 min-w-[4px] h-full bg-amber-500 rounded-full"></div>
                <div>
                  <div className="text-xs text-amber-500 font-bold uppercase mb-1">Optimistic Scenario</div>
                  <p className="text-sm text-slate-300">Authority stays locked. Generates <span className="text-white font-bold">~500k views/month</span> for 2+ years on autopilot.</p>
                </div>
             </div>
           </div>
        </GlassCard>

      </div>

      {/* Final Prediction */}
      <GlassCard delay={0.7} className="border-t-cyan-500/50 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 pointer-events-none"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 p-2">
            <div className="p-4 bg-cyan-500/20 rounded-full text-cyan-400 shrink-0 animate-pulse">
               <Target size={40} />
            </div>
            <div className="flex-1 text-center md:text-left">
               <h3 className="text-xl font-bold text-white mb-2">My Prediction for You</h3>
               <p className="text-slate-300 leading-relaxed text-sm mb-2">
                 Based on your first 6 days (high volume, data-driven mindset), you are currently tracking toward the <span className="text-emerald-400 font-bold">Realistic Scenario</span>.
               </p>
               <p className="text-slate-400 text-xs">
                 <span className="text-white font-bold uppercase">Target:</span> Aim for Scenario 2 (Realistic). It guarantees a sustainable presence. Anything above is a bonus.
               </p>
            </div>
            <div className="hidden md:block">
               <div className="text-right">
                  <div className="text-xs text-slate-500 uppercase font-bold">Projected Status</div>
                  <div className="text-2xl font-display font-bold text-emerald-400">On Track</div>
               </div>
            </div>
         </div>
      </GlassCard>

    </div>
  );
};
