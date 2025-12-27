import React from 'react';
import { GlassCard } from './GlassCard';
import { TrendingUp, ShieldAlert, Zap } from 'lucide-react';

export const GrandPrediction: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
      {/* Conservative Estimate */}
      <GlassCard delay={0.1} glowColor="blue" className="relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <ShieldAlert size={120} />
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
             <ShieldAlert size={24} />
          </div>
          <h3 className="text-xl font-display font-bold text-gray-300">Conservative Estimate</h3>
        </div>

        <div className="mb-6">
          <div className="text-5xl font-display font-bold text-white tracking-tight mb-2 glow-text">
            250,000
          </div>
          <span className="text-sm font-bold text-cyan-400 uppercase tracking-widest">Total Views (Dec 31, 2025)</span>
        </div>

        <div className="space-y-2">
          <div className="w-full bg-slate-800 rounded-full h-2">
            <div className="bg-cyan-500 h-2 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]" style={{ width: '31%' }}></div>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Linear growth assuming current levels and no viral spikes. Stacking ~400 view videos consistently.
          </p>
        </div>
      </GlassCard>

      {/* Exponential Estimate */}
      <GlassCard delay={0.2} glowColor="purple" className="relative overflow-hidden group border border-purple-500/20">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
          <Zap size={120} />
        </div>

        <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-white">Exponential Estimate</h3>
            <span className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded border border-purple-500/30 uppercase font-bold">Snowball</span>
            </div>

            <div className="mb-6">
            <div className="text-5xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                800,000
            </div>
            <span className="text-sm font-bold text-purple-400 uppercase tracking-widest">Total Views (The "Snowball" Effect)</span>
            </div>

            <div className="space-y-2">
            <div className="w-full bg-slate-800 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full shadow-[0_0_15px_rgba(236,72,153,0.7)]" style={{ width: '100%' }}></div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
                Assumes the <span className="text-white font-bold">1% Rule</span>: With ~350 total videos, 3-4 will hit 100k+ views, dragging the entire channel into algorithmic high-velocity.
            </p>
            </div>
        </div>
      </GlassCard>
    </div>
  );
};