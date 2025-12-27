import React from 'react';
import { GlassCard } from './GlassCard';
import { Play, Users, Ghost, ArrowRight } from 'lucide-react';
import { ComparisonMetric } from '../types';

const metrics: ComparisonMetric[] = [
  {
    metric: "New Normal Baseline",
    today: "400",
    future: "4,000",
    unit: "views/hr",
    icon: Play,
    description: "Dec 31 expectation: Post a video and hit thousands within the first hour due to acquired follower momentum."
  },
  {
    metric: "Passive Traffic",
    today: "Active-only",
    future: "15,000+",
    unit: "views/day",
    icon: Ghost,
    description: "The 'Zombie' views: ~400 videos in your library generate massive passive numbers via Search and Explore."
  },
  {
    metric: "Follower Conversion",
    today: "~7",
    future: "3,000",
    unit: "followers",
    icon: Users,
    description: "Estimated 0.5% conversion on ~600k-800k total views. Your 'Engine' will look completely different."
  }
];

export const InertiaStats: React.FC = () => {
  return (
    <div className="mb-16">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-white mb-2">The "Inertia" Statistics</h2>
        <p className="text-slate-400 font-medium italic">Momentum of the account on Dec 31, 2025 vs Today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((item, index) => (
          <GlassCard key={index} delay={0.3 + (index * 0.1)} className="flex flex-col h-full hover:bg-white/[0.03]">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-xl bg-slate-800 text-slate-300 border border-white/5`}>
                <item.icon size={24} />
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.metric}</span>
            </div>

            <div className="flex-1 flex items-center justify-between gap-4 mb-6">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 mb-1 uppercase font-bold">Now</div>
                <div className="text-2xl font-bold text-slate-300 font-display">{item.today}</div>
              </div>
              
              <div className="text-slate-600">
                <ArrowRight size={20} className="animate-pulse" />
              </div>

              <div className="text-center">
                <div className="text-[10px] text-cyan-400 mb-1 font-bold uppercase tracking-wider">Dec 31</div>
                <div className="text-4xl font-bold text-white font-display glow-text">
                  {item.future}
                </div>
              </div>
            </div>
            
            <div className="mt-auto pt-4 border-t border-white/5">
                <p className="text-[11px] text-slate-400 leading-relaxed text-center font-medium italic">
                    {item.description}
                </p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};