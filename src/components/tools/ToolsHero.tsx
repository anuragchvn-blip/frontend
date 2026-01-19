"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ToolsHero() {
  return (
    <section className="relative pt-40 pb-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-cosmic-blue/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col max-w-4xl">
           <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
           >
              <h3 className="text-technical text-cosmic-blue mb-6 tracking-[0.2em]">
                System Capabilities
              </h3>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium text-white mb-8 tracking-tighter leading-[0.9]">
                Space Domain <br />
                <span className="text-zinc-500">Awareness Solutions</span>
              </h1>

              <p className="text-xl text-stellar-grey max-w-2xl leading-relaxed mb-10 font-light">
                A comprehensive suite of operational modules designed to detect, track, and characterize objects in all orbital regimes. 
                Deployed for mission-critical reliability.
              </p>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.4, duration: 0.8 }}
             className="flex flex-wrap gap-4"
           >
              <div className="flex items-center space-x-2 text-sm font-mono text-zinc-400 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm bg-white/5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>ALL SYSTEMS OPERATIONAL</span>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  )
}
