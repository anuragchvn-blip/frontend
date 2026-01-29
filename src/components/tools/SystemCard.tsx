"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Plus } from "lucide-react"
import { SpaceSystem } from "@/lib/data/space-systems"

interface SystemCardProps {
  system: SpaceSystem
  onSelect: (system: SpaceSystem) => void
  index: number
}

export default function SystemCard({ system, onSelect, index }: SystemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      viewport={{ once: true }}
      onClick={() => onSelect(system)}
      className="group relative h-[400px] border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 cursor-pointer overflow-hidden flex flex-col justify-between p-6 md:p-8"
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Top Section */}
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-6">
          <div className="p-3 bg-white/5 rounded-lg text-white group-hover:text-cosmic-blue transition-colors">
            <system.icon strokeWidth={1.5} className="w-6 h-6" />
          </div>
          <span className="text-zinc-500 font-mono text-xs tracking-widest group-hover:text-white transition-colors">
            {system.id.toUpperCase()}
          </span>
        </div>
        
        <h3 className="text-2xl font-medium text-white mb-3 group-hover:translate-x-2 transition-transform duration-300">
          {system.title}
        </h3>
        
        <p className="text-stellar-grey text-sm font-light leading-relaxed mb-6 group-hover:text-white/80 transition-colors">
          {system.tagline}
        </p>

        {/* Minimal Metrics Preview */}
        <div className="flex gap-4 border-t border-white/10 pt-4 opacity-60 group-hover:opacity-100 transition-opacity">
          {system.metrics.slice(0, 2).map((metric, i) => (
             <div key={i}>
               <div className="text-lg font-mono text-white">{metric.value}{metric.unit}</div>
               <div className="text-[10px] uppercase tracking-wider text-zinc-500">{metric.label}</div>
             </div>
          ))}
        </div>
      </div>

      {/* Bottom Action Area */}
      <div className="relative z-10 flex justify-between items-end">
        <div className="flex items-center gap-2 text-xs font-mono text-cosmic-blue opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span>VIEW MODULE</span>
          <ArrowUpRight className="w-3 h-3" />
        </div>

        {/* HUD Corner Decoration */}
        <div className="absolute bottom-[-32px] right-[-32px] w-24 h-24 border-t border-l border-white/10 group-hover:border-cosmic-blue/50 transition-colors" />
        <Plus className="absolute bottom-0 right-0 w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
      </div>
    </motion.div>
  )
}
