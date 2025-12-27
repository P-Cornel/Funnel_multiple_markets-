
import React from 'react';

export interface PredictionData {
  label: string;
  value: number;
  description: string;
  color: string;
}

export interface ComparisonMetric {
  metric: string;
  today: string | number;
  future: string | number;
  unit: string;
  icon: React.ComponentType<any>;
  description: string;
}

// Fix: Added RoadmapPhase interface for Roadmap component
export interface RoadmapPhase {
  phase: string;
  dates: string;
  goal: string;
  expectedViews: string;
  risk?: string;
  color: string;
  catalyst?: string;
  strategy?: string;
}

// Fix: Added ChartDataPoint interface for growth trajectory charts
export interface ChartDataPoint {
  name: string;
  views: number;
  phase: string;
}

// Fix: Added SimulationPhase interface for 2026 velocity curve simulation
export interface SimulationPhase {
  title: string;
  period: string;
  state: string;
  description: string;
  behavior: string[];
  stats: {
    library: string;
    views: string;
    followers: string;
    regression: string;
  };
  color: 'green' | 'gold' | 'red';
}

// Fix: Added ForecastMetric interface for comparing conservative and optimistic scenarios
export interface ForecastMetric {
  label: string;
  conservative: string;
  optimistic: string;
}
