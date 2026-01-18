"use client"

import { useTracking } from "@/context/TrackingContext"
import { Search, Filter, ArrowUpDown, ChevronLeft, ChevronRight, Activity } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ApiService } from "@/utils/api";

interface SatelliteData {
  norad_id: number;
  name: string;
  lat: number;
  lon: number;
  alt: number;
  velocity: number;
  type: string;
  last_updated: string;
  x?: number;
  y?: number;
  z?: number;
  risk?: "nominal" | "warning" | "critical";
}

export default function SatelliteTable() {
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    const fetchSatellites = async () => {
      try {
        const response = await ApiService.getSatelliteCatalog();
        setSatellites(response.data.satellites);
      } catch (error) {
        console.error("Failed to fetch satellite catalog:", error);
        // Fallback to context data if API fails
        // This is a workaround since we don't have a direct catalog endpoint
        // In a real implementation, we would handle this differently
      } finally {
        setLoading(false);
      }
    };
    
    fetchSatellites();
    
    // Set up polling to refresh data every 30 seconds
    const interval = setInterval(fetchSatellites, 30000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Use data from context as fallback or combine with API data
  const { satellites: contextSatellites } = useTracking();
  
  // Combine context satellites with catalog data
  // Priority: Use position data from context when available, fall back to catalog data
  const combinedSatellitesMap = new Map<number, SatelliteData>();
  
  // Add catalog satellites first (base data)
  satellites.forEach((s: SatelliteData) => {
    combinedSatellitesMap.set(s.norad_id, s);
  });
  
  // Override with context satellites (real-time position data)
  contextSatellites.forEach((s: SatelliteData) => {
    const existing = combinedSatellitesMap.get(s.norad_id);
    if (existing) {
      // Merge: keep catalog metadata but use real position data
      combinedSatellitesMap.set(s.norad_id, {
        ...existing,  // catalog data (name, type, etc.)
        ...s         // position data (lat, lon, alt, x, y, z)
      });
    } else {
      // Add new satellite from context
      combinedSatellitesMap.set(s.norad_id, s);
    }
  });
  
  const combinedSatellites = Array.from(combinedSatellitesMap.values());

  const filteredSatellites = combinedSatellites.filter((s: SatelliteData) => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.norad_id.toString().includes(searchQuery)
  );

  if (loading) return <div className="h-64 flex items-center justify-center text-white/50 animate-pulse">Synchronizing Catalog...</div>;

  return (
    <div className="border border-white/10 relative hud-corner group">
      <span className="hidden" />
      <div className="p-8 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-technical mb-2 block opacity-40">Orbital Assets</span>
          <h2 className="text-2xl font-medium text-cinematic uppercase tracking-tight text-white flex items-center">
            Integrated Catalog
          </h2>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3 w-3 text-white/30" />
            <input
              type="text"
              placeholder="Search assets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/[0.03] border border-white/10 rounded-full pl-10 pr-6 py-2 text-[10px] text-white uppercase tracking-widest focus:outline-none focus:border-white/30 transition-all w-64 font-bold"
            />
          </div>
          <button className="p-2 border border-white/10 rounded-full hover:bg-white/5 text-white/40">
            <Filter className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left font-sans">
          <thead>
            <tr className="bg-white/[0.02] text-white/30 text-[9px] uppercase tracking-[0.2em] font-bold">
              <th className="px-8 py-4">ID <ArrowUpDown className="inline h-2 w-2 ml-1" /></th>
              <th className="px-8 py-4">Designation</th>
              <th className="px-8 py-4">Classification</th>
              <th className="px-8 py-4">Lat/Lon</th>
              <th className="px-8 py-4">Alt (km)</th>
              <th className="px-8 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="text-[11px] divide-y divide-white/5 font-mono">
            {filteredSatellites.map((sat: SatelliteData) => (
              <tr 
                key={sat.norad_id} 
                className="hover:bg-white/[0.03] transition-colors cursor-pointer group/row"
              >
                <td className="px-8 py-5 text-white/40">{sat.norad_id}</td>
                <td className="px-8 py-5 text-white font-medium group-hover/row:text-white transition-colors">{sat.name}</td>
                <td className="px-8 py-5 text-white/40 uppercase tracking-tighter">{sat.type}</td>
                <td className="px-8 py-5 text-white/60">{sat.lat.toFixed(2)} / {sat.lon.toFixed(2)}</td>
                <td className="px-8 py-5 text-white/60">{sat.alt.toLocaleString()}</td>
                <td className="px-8 py-5 text-right">
                  <span className="inline-flex items-center space-x-2">
                    <span className="w-1 h-1 rounded-full bg-white opacity-40" />
                    <span className="text-[9px] font-bold uppercase tracking-widest opacity-40">Observed</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-6 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-widest font-bold">
        <p>Telemetry synchronization complete ({filteredSatellites.length} objects)</p>
        <div className="flex items-center space-x-4">
          <button className="hover:text-white disabled:opacity-30" disabled>PREV</button>
          <span className="text-white">01</span>
          <button className="hover:text-white disabled:opacity-30" disabled>NEXT</button>
        </div>
      </div>
    </div>
  )
}

