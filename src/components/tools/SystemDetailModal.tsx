"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, Activity, Cpu } from "lucide-react"
import { SpaceSystem } from "@/lib/data/space-systems"


interface SystemDetailModalProps {
  system: SpaceSystem | null
  onClose: () => void
}

export default function SystemDetailModal({ system, onClose }: SystemDetailModalProps) {
  // Lock scroll when modal is open
  useEffect(() => {
    if (system) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [system])

  return (
    <AnimatePresence>
      {system && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:max-w-4xl bg-space-black border-l border-white/10 shadow-2xl overflow-y-auto"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="min-h-full flex flex-col">
              {/* Header Visual Area */}
              <div className="h-[40vh] relative bg-gradient-to-b from-zinc-900 to-space-black border-b border-white/5 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[url('/img/grid.svg')] opacity-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-space-black to-transparent" />
                
                {/* Dynamic Visualization Removed */}
                {/* <VisualContainer type={system.visualType} /> */}
                
                <div className="absolute bottom-8 left-8 md:left-12 z-10">
                   <div className="flex items-center space-x-3 mb-4">
                     <div className="p-2 bg-cosmic-blue/20 rounded-md border border-cosmic-blue/30 text-cosmic-blue">
                        <system.icon className="w-5 h-5" />
                     </div>
                     <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase">
                        SYSTEM ID: {system.id}
                     </span>
                     {system.status && (
                       <span className={`text-[10px] px-2 py-0.5 rounded-full border ${
                         system.status === "Active" ? "border-green-500/30 text-green-400 bg-green-500/10" : "border-amber-500/30 text-amber-400 bg-amber-500/10"
                       }`}>
                         {system.status.toUpperCase()}
                       </span>
                     )}
                   </div>
                   <h2 className="text-4xl md:text-5xl font-medium text-white mb-2">{system.title}</h2>
                   <p className="text-xl text-stellar-grey font-light">{system.tagline}</p>
                </div>
              </div>

              {/* Content Grid */}
              <div className="p-6 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                
                {/* Left Column: Metrics & Stats */}
                <div className="md:col-span-1 md:border-r border-white/5 md:pr-12 space-y-8 md:space-y-10">
                   <div>
                     <h4 className="text-technical mb-6 text-white/40">PERFORMANCE METRICS</h4>
                     <div className="space-y-6">
                       {system.metrics.map((metric, i) => (
                         <div key={i} className="group">
                           <div className="text-3xl font-mono text-white mb-1 group-hover:text-cosmic-blue transition-colors">
                             {metric.value}<span className="text-lg opacity-50">{metric.unit}</span>
                           </div>
                           <div className="text-xs uppercase tracking-wider text-zinc-500">
                             {metric.label}
                           </div>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div className="p-6 bg-white/[0.03] border border-white/5 rounded-lg">
                      <div className="flex items-center space-x-3 text-white mb-2">
                         <Activity className="w-5 h-5 text-cosmic-blue" />
                         <span className="font-medium">Live Status</span>
                      </div>
                      <div className="text-sm text-zinc-400 leading-relaxed">
                        System is currently operating within nominal parameters. Real-time data feed active.
                      </div>
                   </div>
                </div>

                {/* Right Column: Features */}
                <div className="md:col-span-2">
                   <h4 className="text-technical mb-8 text-white/40">SYSTEM CAPABILITIES</h4>
                   <div className="grid grid-cols-1 gap-8">
                     {system.features.map((feature, i) => (
                       <div key={i} className="flex items-start space-x-4">
                         <div className="mt-1 w-1.5 h-1.5 rounded-full bg-cosmic-blue shrink-0" />
                         <div>
                           <h5 className="text-lg font-medium text-white mb-2">{feature.title}</h5>
                           <p className="text-stellar-grey leading-relaxed text-sm font-light">
                             {feature.description}
                           </p>
                         </div>
                       </div>
                     ))}
                   </div>

                   <div className="mt-12 pt-12 border-t border-white/5">
                      <button className="btn-pill btn-primary w-full md:w-auto inline-flex justify-center items-center">
                        Request System Access
                        <ChevronRight className="ml-2 w-4 h-4" />
                      </button>
                   </div>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
