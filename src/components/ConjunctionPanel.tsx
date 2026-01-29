"use client"

import { Crosshair } from "lucide-react"

import { useState, useEffect } from "react";
import { ApiService } from "@/utils/api";

interface ConjunctionEvent {
  id: number;
  primary_norad_id: number;
  secondary_norad_id: number;
  tca_datetime: string;
  miss_distance_meters: number;
  probability: number;
  relative_velocity_mps: number;
  risk_level: string;
}

export default function ConjunctionPanel() {
  const [events, setEvents] = useState<ConjunctionEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConjunctionEvents = async () => {
      try {
        // Get recent conjunction events from the backend
        const response = await ApiService.getConjunctionEvents({
          hours_back: 24,
          min_probability: 1e-6,
          limit: 50
        });
        
        // Transform the response to our ConjunctionEvent format
        const events: ConjunctionEvent[] = response.data.events.map((event: {
          id: number;
          primary_norad_id: number;
          secondary_norad_id: number;
          tca_datetime: string;
          miss_distance_meters: number;
          probability: number;
          relative_velocity_mps: number;
          risk_level: string;
        }) => ({
          id: event.id,
          primary_norad_id: event.primary_norad_id,
          secondary_norad_id: event.secondary_norad_id,
          tca_datetime: event.tca_datetime,
          miss_distance_meters: event.miss_distance_meters,
          probability: event.probability,
          relative_velocity_mps: event.relative_velocity_mps,
          risk_level: event.risk_level.toLowerCase()
        }));
        
        setEvents(events);
      } catch (error) {
        console.error("Failed to fetch conjunction events:", error);
        
        // Fallback to mock data if API call fails
        const mockEvents: ConjunctionEvent[] = [
          { 
            id: 1,
            primary_norad_id: 25544, 
            secondary_norad_id: 12345, 
            tca_datetime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
            miss_distance_meters: 1200,
            probability: 2.4e-6,
            relative_velocity_mps: 7500,
            risk_level: "medium" 
          },
          { 
            id: 2,
            primary_norad_id: 49044, 
            secondary_norad_id: 28096, 
            tca_datetime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
            miss_distance_meters: 800,
            probability: 1.2e-4,
            relative_velocity_mps: 7200,
            risk_level: "high" 
          },
        ];
        setEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };

    fetchConjunctionEvents();
    
    // Set up polling to refresh data every 30 seconds
    const interval = setInterval(fetchConjunctionEvents, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const formatRiskLevel = (risk: string) => {
    const riskMap: Record<string, string> = {
      "low": "LOW",
      "medium": "MEDIUM",
      "high": "HIGH",
      "critical": "CRITICAL",
    };
    return riskMap[risk] || risk.toUpperCase();
  };

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${meters.toFixed(0)}m`;
    }
    return `${(meters / 1000).toFixed(2)}km`;
  };

  const formatProbability = (prob: number) => {
    return prob.toExponential(1);
  };

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="border border-white/10 relative hud-corner h-full flex flex-col">
        <span className="hidden" />
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <span className="text-technical mb-1 block opacity-40">Proximity Monitor</span>
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">
              Conjunction Screening
            </h2>
          </div>
          <Crosshair className="h-4 w-4 text-white/20 cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <p className="text-white/50 text-center">Synchronizing conjunction data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-white/10 relative hud-corner h-full flex flex-col">
      <span className="hidden" />
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-technical mb-1 block opacity-40">Proximity Monitor</span>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Conjunction Screening
          </h2>
        </div>
        <Crosshair className="h-4 w-4 text-white/20 cursor-pointer hover:text-white transition-colors" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {events.length > 0 ? (
          events.map((event) => (
            <div 
              key={event.id}
              className="p-5 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[11px] font-bold text-white mb-1 uppercase tracking-tight">SAT-{event.primary_norad_id} (Primary)</p>
                  <div className="flex items-center text-[9px] text-white/40 uppercase tracking-widest font-bold">
                    <span className="w-1.5 h-[1px] bg-white/40 mr-2" />
                    VS SAT-{event.secondary_norad_id} (Secondary)
                  </div>
                </div>
                <span className={`text-[8px] px-2 py-0.5 border text-white font-bold uppercase tracking-widest ${
                  event.risk_level === 'high' || event.risk_level === 'critical' 
                    ? 'border-red-500' 
                    : event.risk_level === 'medium' 
                      ? 'border-yellow-500' 
                      : 'border-green-500'
                }`}>
                  {formatRiskLevel(event.risk_level)}
                </span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-4">
                <div>
                  <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">Miss Dist</p>
                  <p className="text-[10px] font-mono text-white">{formatDistance(event.miss_distance_meters)}</p>
                </div>
                <div>
                  <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">Probability</p>
                  <p className="text-[10px] font-mono text-white">{formatProbability(event.probability)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold mb-1">TCA</p>
                  <p className="text-[10px] font-mono text-white">{formatTime(event.tca_datetime)}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-white/50">
            <p>No conjunction events detected in the monitoring window.</p>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5">
        <button 
          className="btn-pill btn-secondary w-full py-2 text-[9px] font-bold uppercase tracking-[0.2em]"
          onClick={() => window.location.reload()}
        >
          Refresh Scan
        </button>
      </div>
    </div>
  )
}

