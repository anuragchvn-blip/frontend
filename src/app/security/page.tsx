"use client"

import Navbar from "@/components/Navbar"
import { Shield, Target, AlertOctagon, Activity, Lock, Eye } from "lucide-react"

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black">
      <div className="atmospheric-bg fixed inset-0 pointer-events-none" />
      <Navbar />

      <div className="pt-24 px-6 max-w-[1600px] mx-auto relative z-10">
        <header className="mb-12">
            <span className="text-technical mb-2 block opacity-40">Predictive Analysis</span>
            <h1 className="text-4xl font-medium text-cinematic uppercase tracking-tight">
              Intelligence Dashboard
            </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* High Level Metrics */}
            <div className="p-8 border border-white/10 bg-white/[0.02] hud-corner relative">
                 <span className="hidden"/>
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">Threat Level</h3>
                    <AlertOctagon className="h-5 w-5 text-red-500 animate-pulse" />
                 </div>
                 <p className="text-5xl font-mono mb-2 text-white">ELEVATED</p>
                 <p className="text-xs text-white/40 uppercase tracking-widest">3 Active Conjunctions &lt; 1km</p>
            </div>
            
            <div className="p-8 border border-white/10 bg-white/[0.02] hud-corner relative">
                 <span className="hidden"/>
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">Maneuver Detection</h3>
                    <Activity className="h-5 w-5 text-stellar-cyan" />
                 </div>
                 <p className="text-5xl font-mono mb-2 text-white">02</p>
                 <p className="text-xs text-white/40 uppercase tracking-widest">Events in last 24h</p>
            </div>

            <div className="p-8 border border-white/10 bg-white/[0.02] hud-corner relative">
                 <span className="hidden"/>
                 <div className="flex items-center justify-between mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white/70">System Integrity</h3>
                    <Lock className="h-5 w-5 text-green-500" />
                 </div>
                 <p className="text-5xl font-mono mb-2 text-white">100%</p>
                 <p className="text-xs text-white/40 uppercase tracking-widest">All Nodes Operational</p>
            </div>
        </div>

        {/* Main Intelligence View */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[600px]">
             {/* Left Column: Priority Targets */}
             <div className="col-span-1 border border-white/10 bg-black/40 flex flex-col">
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
                    <h3 className="text-sm font-bold uppercase tracking-widest">Priority Targets</h3>
                    <button className="text-[10px] uppercase font-bold text-stellar-cyan tracking-widest border border-stellar-cyan/30 px-3 py-1 hover:bg-stellar-cyan/10">Add Target</button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="p-6 border-b border-white/5 hover:bg-white/[0.03] group cursor-pointer transition-colors">
                            <div className="flex justify-between items-start mb-2">
                                <span className="font-mono text-lg text-white group-hover:text-stellar-cyan">OBJ-{24000 + i}</span>
                                <span className="text-[10px] px-2 py-0.5 border border-red-500/30 text-red-400 bg-red-500/10 uppercase tracking-widest font-bold">High Interest</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-[10px] text-white/40 uppercase tracking-widest">
                                <div>
                                    <span className="block mb-1">Last Contact</span>
                                    <span className="text-white">14:22:01 Z</span>
                                </div>
                                <div>
                                    <span className="block mb-1">Orbit</span>
                                    <span className="text-white">LEO / 98.2°</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
             </div>

             {/* Center/Right: Data Visualization Placeholder */}
             <div className="col-span-1 lg:col-span-2 border border-white/10 bg-black/40 relative flex items-center justify-center p-12">
                  <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
                  <div className="text-center">
                    <Target className="h-16 w-16 text-white/10 mx-auto mb-6" />
                    <h3 className="text-xl font-medium text-white mb-2 uppercase tracking-widest">Orbital Analysis Interface</h3>
                    <p className="text-white/40 max-w-md mx-auto text-sm font-light">
                        Select a target object to view detailed maneuver history, conjunction probability evolution, and pattern of life analysis.
                    </p>
                  </div>
             </div>
        </div>
      </div>
    </main>
  )
}
