import React from 'react';
import { GlassCard } from './GlassCard';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Calendar, Zap, TrendingUp, Anchor } from 'lucide-react';
import { RoadmapPhase, ChartDataPoint } from '../types';

const phases: RoadmapPhase[] = [
  {
    phase: "Phase 1: The Grind",
    dates: "Dec 16 - 22",
    goal: "Consistency",
    expectedViews: "5k - 8k / day",
    risk: "Numbers look stable. Don't stop.",
    color: "#0ea5e9" // sky-500
  },
  {
    phase: "Phase 2: The Breakout",
    dates: "Dec 23 - 27",
    goal: "Viral Strike",
    expectedViews: "15k - 30k / day",
    catalyst: "Old video gets picked up delayed.",
    color: "#a855f7" // purple-500
  },
  {
    phase: "Phase 3: Holiday Spike",
    dates: "Dec 28 - 31",
    goal: "Domination",
    expectedViews: "50k+ / day",
    strategy: "Best clips when ad rates peak.",
    color: "#f43f5e" // rose-500
  }
];

const data: ChartDataPoint[] = [
  { name: '16', views: 5000, phase: 'Grind' },
  { name: '17', views: 5500, phase: 'Grind' },
  { name: '18', views: 6000, phase: 'Grind' },
  { name: '19', views: 5800, phase: 'Grind' },
  { name: '20', views: 7000, phase: 'Grind' },
  { name: '21', views: 7500, phase: 'Grind' },
  { name: '22', views: 8000, phase: 'Grind' },
  { name: '23', views: 15000, phase: 'Breakout' },
  { name: '24', views: 22000, phase: 'Breakout' },
  { name: '25', views: 28000, phase: 'Breakout' },
  { name: '26', views: 25000, phase: 'Breakout' },
  { name: '27', views: 30000, phase: 'Breakout' },
  { name: '28', views: 45000, phase: 'Spike' },
  { name: '29', views: 52000, phase: 'Spike' },
  { name: '30', views: 58000, phase: 'Spike' },
  { name: '31', views: 65000, phase: 'Spike' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md">
        <p className="text-slate-400 text-xs mb-1">Dec {label}</p>
        <p className="text-xl font-bold font-display text-white">
          {payload[0].value.toLocaleString()} <span className="text-xs font-normal text-slate-500">views</span>
        </p>
        <p className="text-xs font-bold uppercase mt-2" style={{ color: payload[0].stroke }}>
            {payload[0].payload.phase}
        </p>
      </div>
    );
  }
  return null;
};

export const Roadmap: React.FC = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Chart Section */}
      <GlassCard delay={0.6} className="xl:col-span-2 flex flex-col min-h-[400px]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            <TrendingUp className="text-neon-green" /> Growth Trajectory
          </h2>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-sky-500"></div>Grind</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-purple-500"></div>Breakout</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-500"></div>Spike</div>
          </div>
        </div>
        
        <div className="flex-1 w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis 
                dataKey="name" 
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
              <ReferenceLine x="22" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
              <ReferenceLine x="27" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
              <Area 
                type="monotone" 
                dataKey="views" 
                stroke="#00f3ff" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorViews)" 
                animationDuration={2000}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Phases Details */}
      <div className="flex flex-col gap-4">
        {phases.map((phase, idx) => (
          <GlassCard 
            key={idx} 
            delay={0.7 + (idx * 0.1)} 
            className={`flex-1 border-l-4`}
            style={{ borderLeftColor: phase.color }}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="font-display font-bold text-white text-lg">{phase.phase}</h4>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                   <Calendar size={12} /> {phase.dates}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold bg-white/5 px-2 py-1 rounded text-white border border-white/10">
                  {phase.expectedViews}
                </span>
              </div>
            </div>
            
            <div className="mt-3 text-sm text-slate-300">
               <span className="text-slate-500 font-bold text-xs uppercase block mb-1">Goal: {phase.goal}</span>
               {phase.risk && <p className="text-xs text-slate-400"><span className="text-rose-400 font-bold">RISK:</span> {phase.risk}</p>}
               {phase.catalyst && <p className="text-xs text-slate-400"><span className="text-purple-400 font-bold">CATALYST:</span> {phase.catalyst}</p>}
               {phase.strategy && <p className="text-xs text-slate-400"><span className="text-green-400 font-bold">STRATEGY:</span> {phase.strategy}</p>}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};