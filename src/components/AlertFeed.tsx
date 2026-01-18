"use client"

import { useTracking } from "@/context/TrackingContext"
import { ShieldAlert, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export default function AlertFeed() {
  const { alerts } = useTracking()

  return (
    <div className="border border-white/10 relative hud-corner h-full flex flex-col">
      <span className="hidden" />
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        <div>
          <span className="text-technical mb-1 block opacity-40">System Signals</span>
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">
            Registry Alerts
          </h2>
        </div>
        <span className="text-[9px] font-bold text-white px-3 py-1 border border-white/20 rounded-full animate-pulse uppercase tracking-widest">
          Active Feed
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {alerts.map((alert) => {
          return (
            <div 
              key={alert.id}
              className="group border-b border-white/5 pb-6 last:border-0"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    alert.severity === "critical" ? "bg-white" : "bg-white/40"
                  )} />
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-40">
                    {alert.severity}
                  </span>
                </div>
                <div className="flex items-center text-[9px] text-white/30 uppercase tracking-tight">
                  <Clock className="h-3 w-3 mr-1" />
                  {new Date(alert.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <p className="text-xs text-white leading-relaxed font-sans">
                {alert.message}
              </p>
              
              <div className="mt-4 flex space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-[9px] uppercase font-bold text-white hover:underline tracking-widest">
                  Resolve
                </button>
                <button className="text-[9px] uppercase font-bold text-white/40 hover:text-white transition-colors tracking-widest">
                  Investigate
                </button>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-4 border-t border-white/5 bg-white/[0.01]">
        <button className="w-full py-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white transition-colors">
          View Archive
        </button>
      </div>
    </div>
  )
}

