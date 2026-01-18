"use client";

import { useState, useEffect } from "react";
import { Activity, Target, Zap, Shield, Eye, AlertTriangle } from "lucide-react";
import { ApiService } from "@/utils/api";

interface IntelligenceSummary {
  active_threats: number;
  conjunction_events_24h: number;
  high_risk_events: number;
  maneuver_detections: number;
  tracked_objects: number;
  system_integrity: string;
  global_coverage: string;
  threat_level: string;
}

interface PriorityTarget {
  id: string;
  norad_id: number;
  name: string;
  interest_level: string;
  last_contact: string;
  orbit: string;
  risk_score: number;
}

interface ConjunctionEvent {
  id: number;
  primary_norad_id: number;
  secondary_norad_id: number;
  tca_datetime: string;
  miss_distance_meters: number;
  probability: number;
  relative_velocity_mps: number;
}

interface ConjunctionSummary {
  active_conjunctions: number;
  total_events_24h: number;
  high_risk_events: number;
  events: ConjunctionEvent[];
}

export default function IntelligenceDashboard() {
  const [intelSummary, setIntelSummary] = useState<IntelligenceSummary | null>(null);
  const [priorityTargets, setPriorityTargets] = useState<PriorityTarget[]>([]);
  const [conjunctionSummary, setConjunctionSummary] = useState<ConjunctionSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [intelRes, targetsRes, conjRes] = await Promise.all([
          ApiService.getIntelligenceSummary(),
          ApiService.getPriorityTargets(),
          ApiService.getConjunctionsSummary()
        ]);

        setIntelSummary(intelRes.data);
        setPriorityTargets(targetsRes.data.targets);
        setConjunctionSummary(conjRes.data);
      } catch (error) {
        console.error("Failed to fetch intelligence data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Poll every 60 seconds
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !intelSummary) {
    return (
      <div className="border border-white/10 bg-black/20 p-6 relative hud-corner">
        <div className="animate-pulse space-y-6">
          <div className="h-6 bg-white/10 rounded w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-white/5 rounded"></div>
            ))}
          </div>
          <div className="space-y-4">
            <div className="h-6 bg-white/10 rounded w-1/4"></div>
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-white/5 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const threatLevelColors = {
    ELEVATED: "text-red-400",
    NORMAL: "text-green-400",
    HIGH: "text-orange-400"
  };

  return (
    <div className="border border-white/10 bg-black/20 p-6 relative hud-corner">
      <div className="mb-6">
        <span className="text-technical mb-2 block opacity-40">Predictive Analysis</span>
        <h2 className="text-sm font-bold uppercase tracking-widest text-white">
          Intelligence Dashboard
        </h2>
      </div>

      {/* Threat Level and Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 border border-white/10 hover:bg-white/[0.02] transition-all relative hud-corner">
          <span className="hidden" />
          <p className="text-technical mb-2 opacity-40">Threat Level</p>
          <div className="flex items-center space-x-3">
            <Shield className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
            <p className={`text-xl font-medium tracking-tight ${threatLevelColors[intelSummary.threat_level as keyof typeof threatLevelColors] || 'text-white'}`}>
              {intelSummary.threat_level}
            </p>
          </div>
        </div>

        <div className="p-4 border border-white/10 hover:bg-white/[0.02] transition-all relative hud-corner">
          <span className="hidden" />
          <p className="text-technical mb-2 opacity-40">Active Conjunctions</p>
          <div className="flex items-center space-x-3">
            <Zap className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
            <p className="text-xl font-medium tracking-tight">
              {intelSummary.high_risk_events} <span className="text-xs opacity-60">&lt; 1km</span>
            </p>
          </div>
        </div>

        <div className="p-4 border border-white/10 hover:bg-white/[0.02] transition-all relative hud-corner">
          <span className="hidden" />
          <p className="text-technical mb-2 opacity-40">Maneuver Detection</p>
          <div className="flex items-center space-x-3">
            <Activity className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
            <p className="text-xl font-medium tracking-tight">
              {intelSummary.maneuver_detections}
            </p>
          </div>
        </div>

        <div className="p-4 border border-white/10 hover:bg-white/[0.02] transition-all relative hud-corner">
          <span className="hidden" />
          <p className="text-technical mb-2 opacity-40">System Integrity</p>
          <div className="flex items-center space-x-3">
            <Eye className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
            <p className="text-xl font-medium tracking-tight">
              {intelSummary.system_integrity}
            </p>
          </div>
        </div>
      </div>

      {/* Priority Targets */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-technical mb-2 block opacity-40">Priority Targets</span>
          <button className="text-[10px] font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            Add Target
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {priorityTargets.map((target, index) => (
          <div key={index} className="p-3 border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Target className="h-3 w-3 text-stellar-cyan" />
                  <span className="text-sm font-bold text-white">{target.name}</span>
                </div>
                <p className="text-[10px] text-white/60 uppercase tracking-widest">{target.interest_level}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-white/40 uppercase tracking-tight mb-1">Last Contact</p>
                <p className="text-[10px] text-white/80 font-mono">{target.last_contact}</p>
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div>
                <p className="text-[9px] text-white/40 uppercase tracking-tight mb-1">Orbit</p>
                <p className="text-[10px] text-white/80">{target.orbit}</p>
              </div>
              <div className="flex items-center">
                <AlertTriangle className="h-3 w-3 text-orange-400 mr-1" />
                <span className="text-[10px] text-orange-400">RISK</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Status Indicator */}
      <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
        <span className="text-[9px] text-white/40 font-mono">All Nodes Operational</span>
        <span className="text-[9px] text-white/40 font-mono">Events in last 24h</span>
      </div>
    </div>
  );
}