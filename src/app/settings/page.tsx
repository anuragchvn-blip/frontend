"use client"

import Navbar from "@/components/Navbar"
import { Settings, Server, Globe, Database, ToggleLeft, ToggleRight, Save, Activity } from "lucide-react"

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black">
      <div className="atmospheric-bg fixed inset-0 pointer-events-none" />
      <Navbar />

      <div className="pt-24 px-6 max-w-[1200px] mx-auto relative z-10">
        <header className="mb-12 border-b border-white/10 pb-8">
            <span className="text-technical mb-2 block opacity-40">System Configuration</span>
            <h1 className="text-4xl font-medium text-cinematic uppercase tracking-tight">
              Platform Settings
            </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
             {/* Navigation Sidebar */}
             <div className="col-span-1">
                <nav className="flex flex-col space-y-1">
                    {["General", "Coverage Areas", "Data Sources", "Alert Thresholds", "API Access", "System Logs"].map((item, i) => (
                        <button 
                            key={item}
                            className={`text-left px-4 py-3 text-xs uppercase font-bold tracking-widest border-l-2 transition-all ${
                                i === 0 
                                ? "border-stellar-cyan text-white bg-white/[0.03]" 
                                : "border-transparent text-white/40 hover:text-white hover:border-white/20"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>
             </div>

             {/* Main Content */}
             <div className="col-span-1 md:col-span-3 space-y-8">
                
                {/* Section: Operational Mode */}
                <section className="bg-white/[0.02] border border-white/10 p-8 hud-corner relative">
                     <span className="hidden"/>
                     <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-white mb-1 uppercase tracking-wider">Operational Mode</h3>
                            <p className="text-xs text-white/40 max-w-md">Configure global system behavior and data retention policies.</p>
                        </div>
                        <Settings className="h-5 w-5 text-white/20" />
                     </div>
                     
                     <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 border border-white/5 bg-black/20">
                            <div>
                                <span className="block text-sm font-bold text-white mb-1">Real-time Propagation</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest">Update Frequency: 1000ms</span>
                            </div>
                            <ToggleRight className="h-6 w-6 text-stellar-cyan cursor-pointer" />
                        </div>
                        
                        <div className="flex items-center justify-between p-4 border border-white/5 bg-black/20">
                             <div>
                                <span className="block text-sm font-bold text-white mb-1">High-Fidelity Ephemeris</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-widest">Uses SGP4-XP / 24h prediction</span>
                            </div>
                            <ToggleLeft className="h-6 w-6 text-white/20 cursor-pointer hover:text-white/40" />
                        </div>
                     </div>
                </section>

                {/* Section: Data Ingestion */}
                <section className="bg-white/[0.02] border border-white/10 p-8 hud-corner relative">
                     <span className="hidden"/>
                     <div className="flex items-start justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-medium text-white mb-1 uppercase tracking-wider">Data Sources</h3>
                            <p className="text-xs text-white/40 max-w-md">Manage connections to external TLE providers.</p>
                        </div>
                        <Database className="h-5 w-5 text-white/20" />
                     </div>
                     
                     <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 border border-white/10 bg-black/20 hover:border-stellar-cyan/30 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-center mb-4">
                                     <span className="text-xs font-bold uppercase tracking-widest text-white">Space-Track.org</span>
                                     <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                </div>
                                <p className="text-[10px] text-white/40 font-mono">Last Sync: 14s ago</p>
                                <p className="text-[10px] text-white/40 font-mono">Records: 24,102</p>
                            </div>
                            
                            <div className="p-4 border border-white/10 bg-black/20 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="flex justify-between items-center mb-4">
                                     <span className="text-xs font-bold uppercase tracking-widest text-white">Celestrak API</span>
                                     <div className="w-2 h-2 rounded-full bg-white/20" />
                                </div>
                                <p className="text-[10px] text-white/40 font-mono">Status: Disabled</p>
                                <div className="h-4" />
                            </div>
                        </div>
                     </div>
                </section>

                <div className="flex justify-end pt-4">
                    <button className="btn-pill btn-primary flex items-center px-8">
                        <Save className="mr-2 h-4 w-4" /> Save Configuration
                    </button>
                </div>
             </div>
        </div>
      </div>
    </main>
  )
}
