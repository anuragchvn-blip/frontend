"use client"

import Navbar from "@/components/Navbar"
import { Search, Filter, Download, ChevronLeft, ChevronRight, CheckCircle, AlertTriangle } from "lucide-react"
import { useState, useEffect, useMemo } from "react"
import { ApiService } from "@/utils/api"

interface Satellite {
  norad_id: number;
  common_name: string;
  type: string;
  inclination_deg: number;
  apogee_km: number;
  perigee_km: number;
  period_minutes: number;
  rcs_m2: number;
  status: string;
}

export default function CatalogPage() {
  const [satellites, setSatellites] = useState<Satellite[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [filterType, setFilterType] = useState<string | null>(null)
  
  useEffect(() => {
    const fetchCatalog = async () => {
      try {
        const response = await ApiService.getInstitutionalCatalog({
          search: search || undefined,
          type_filter: filterType || undefined,
          limit: 100
        });
        setSatellites(response.data.satellites);
      } catch (error) {
        console.error("Failed to fetch catalog:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCatalog();
  }, [search, filterType]);
  
  const filteredData = useMemo(() => {
    return satellites.filter(s => {
      const matchesSearch = s.common_name.toLowerCase().includes(search.toLowerCase()) || 
                           s.norad_id.toString().includes(search)
      const matchesType = filterType ? s.type === filterType : true
      return matchesSearch && matchesType
    })
  }, [satellites, search, filterType])

  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black">
      <div className="atmospheric-bg fixed inset-0 pointer-events-none" />
      <Navbar />
      
      <div className="pt-24 px-6 max-w-[1600px] mx-auto relative z-10">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-technical mb-2 block opacity-40">Institutional Database</span>
            <h1 className="text-4xl font-medium text-cinematic uppercase tracking-tight">
              Global Object Catalog
            </h1>
            <p className="text-stellar-grey mt-2 max-w-xl font-light">
              Complete registry of tracked orbital objects including payloads, rocket bodies, and debris.
              Synchronized with 18th Space Defense Squadron data.
            </p>
          </div>
          
          <div className="flex gap-4">
            <button className="btn-pill btn-secondary flex items-center">
              <Download className="mr-2 h-4 w-4" /> Export CSV
            </button>
          </div>
        </header>

        {/* Controls */}
        <div className="bg-white/[0.02] border border-white/10 p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between hud-corner relative">
             <span className="hidden"/>
             <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <input 
                  type="text" 
                  placeholder="Search via Name or NORAD ID..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-full pl-12 pr-4 py-3 text-xs uppercase tracking-widest text-white focus:border-white/30 outline-none transition-colors"
                />
             </div>
             
             <div className="flex gap-2">
                {["PAYLOAD", "ROCKET BODY", "DEBRIS"].map(type => (
                    <button 
                        key={type}
                        onClick={() => setFilterType(filterType === type ? null : type)}
                        className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest border rounded-full transition-all ${
                            filterType === type 
                            ? "bg-white text-space-black border-white" 
                            : "border-white/10 text-white/50 hover:border-white/30 hover:text-white"
                        }`}
                    >
                        {type}
                    </button>
                ))}
             </div>
        </div>

        {/* Data Table */}
        <div className="border border-white/10 bg-black/20 min-h-[600px]">
          <table className="w-full text-left">
            <thead className="bg-white/[0.03] text-white/40 text-[10px] uppercase tracking-widest font-bold">
              <tr>
                <th className="px-6 py-4">NORAD ID</th>
                <th className="px-6 py-4">Common Name</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Inclination</th>
                <th className="px-6 py-4">Apogee/Perigee</th>
                <th className="px-6 py-4">Period</th>
                <th className="px-6 py-4 text-right">RCS (m²)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono text-xs">
              {filteredData.slice(0, 50).map((sat: Satellite) => (
                <tr key={sat.norad_id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 text-stellar-cyan">{sat.norad_id}</td>
                  <td className="px-6 py-4 font-bold text-white group-hover:text-stellar-cyan transition-colors">{sat.common_name}</td>
                  <td className="px-6 py-4 opacity-60">{sat.type}</td>
                  <td className="px-6 py-4 opacity-60">{sat.inclination_deg.toFixed(2)}°</td>
                  <td className="px-6 py-4 opacity-60">{sat.apogee_km.toFixed(0)}/{sat.perigee_km.toFixed(0)} km</td>
                  <td className="px-6 py-4 opacity-60">{sat.period_minutes.toFixed(1)} min</td>
                  <td className="px-6 py-4 text-right opacity-60">
                    {sat.rcs_m2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredData.length === 0 && (
            <div className="p-20 text-center text-white/30 uppercase tracking-widest text-sm">
                No objects found matching criteria
            </div>
          )}
        </div>
        
        <div className="py-6 flex justify-between items-center text-[10px] text-white/40 uppercase tracking-widest font-bold">
            <span>Showing {Math.min(filteredData.length, 50)} of {filteredData.length} objects</span>
            <div className="flex gap-2">
                <button disabled className="px-4 py-2 border border-white/10 hover:bg-white/5 disabled:opacity-50">Previous</button>
                <button className="px-4 py-2 border border-white/10 hover:bg-white/5">Next</button>
            </div>
        </div>
      </div>
    </main>
  )
}
