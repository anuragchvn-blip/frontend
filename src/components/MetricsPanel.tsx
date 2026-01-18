"use client"

import { useTracking } from "@/context/TrackingContext"
import { Cpu, Database, Network, Server } from "lucide-react"
import { useState, useEffect } from "react"
import { ApiService } from "@/utils/api"

export default function MetricsPanel() {
  const { systemStatus, satellites } = useTracking()
  const [systemStats, setSystemStats] = useState<any>(null)
  const [intelSummary, setIntelSummary] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, intelRes] = await Promise.all([
          ApiService.getSystemStatus(),
          ApiService.getIntelligenceSummary()
        ]);
        
        setSystemStats(statusRes.data);
        setIntelSummary(intelRes.data);
      } catch (error) {
        console.error("Failed to fetch metrics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // Use real data when available, fallback to mock data
  const metrics = [
    { 
      label: "Tracked Objects", 
      value: systemStats?.active_satellites || satellites.length || "--", 
      icon: Database 
    },
    { 
      label: "Active Threats", 
      value: intelSummary?.active_threats !== undefined ? intelSummary.active_threats : "2", 
      icon: Network 
    },
    { 
      label: "System Integrity", 
      value: systemStats?.system_status === "operational" ? "100%" : "98%", 
      icon: Cpu 
    },
    { 
      label: "Data Coverage", 
      value: intelSummary?.global_coverage || "94%", 
      icon: Server 
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {metrics.map((metric, i) => (
        <div 
          key={i}
          className="p-6 border border-white/10 hover:bg-white/[0.02] transition-all relative hud-corner group"
        >
          <span className="hidden" />
          <p className="text-technical mb-2 opacity-40">{metric.label}</p>
          <div className="flex items-center space-x-3">
            <metric.icon className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
            <p className="text-xl font-medium tracking-tight">{metric.value}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

