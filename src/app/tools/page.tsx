"use client"

import { useState } from "react"
import Navbar from "@/components/Navbar"
import ToolsHero from "@/components/tools/ToolsHero"
import SystemCard from "@/components/tools/SystemCard"
import SystemDetailModal from "@/components/tools/SystemDetailModal"
import { spaceSystems, SpaceSystem } from "@/lib/data/space-systems"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ToolsPage() {
  const [selectedSystem, setSelectedSystem] = useState<SpaceSystem | null>(null)

  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-cosmic-blue selection:text-white">
      <div className="atmospheric-bg" />
      <Navbar />

      <ToolsHero />
      
      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20 md:pb-32">
        {/* Filter/Status Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 border-b border-white/10 pb-4 md:pb-6 gap-4">
            <div className="flex flex-wrap gap-4 md:gap-8 text-xs md:text-sm font-mono text-zinc-500">
                <span className="text-white border-b-2 border-cosmic-blue pb-4 -mb-4 md:pb-6 md:-mb-6 cursor-pointer">ALL SYSTEMS (9)</span>
                <span className="hover:text-white cursor-pointer transition-colors">ACTIVE</span>
                <span className="hover:text-white cursor-pointer transition-colors">IN DEVELOPMENT</span>
            </div>
            
            <div className="hidden md:block text-xs font-mono text-zinc-600">
                SECURE CONNECTION // ENCRYPTED
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaceSystems.map((system, index) => (
                <SystemCard 
                    key={system.id} 
                    system={system} 
                    index={index}
                    onSelect={setSelectedSystem}
                />
            ))}
        </div>
      </section>

      {/* Footer (Simplified from Landing) */}
      <footer className="border-t border-white/10 bg-black/50 py-8 md:py-12">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
             <Link href="/" className="flex items-center text-xs md:text-sm text-zinc-500 hover:text-white transition-colors group">
                <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                RETURN TO COMMAND
             </Link>
             <div className="text-[9px] md:text-[10px] font-mono text-zinc-700">
                Authorized Use Only. System ID: SSA-099
             </div>
         </div>
      </footer>

      {/* Detail Modal */}
      <SystemDetailModal 
        system={selectedSystem} 
        onClose={() => setSelectedSystem(null)} 
      />
    </main>
  )
}
