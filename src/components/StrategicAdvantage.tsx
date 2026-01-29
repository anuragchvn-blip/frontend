"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, CornerDownRight } from "lucide-react"

const DATA_CORE = [
  {
    category: "MARKET DYNAMICS",
    ref: "REF: SSA-PRB-2026",
    title: "The Congestion Breach",
    summary: "Current infrastructure is approaching a physical limit.",
    detail: "With 3,000 active satellites today scaling to 50,000+ by 2028, the orbital environment is reaching a critical density threshold. A single collision event represents a $1B systemic risk to global communications, yet current detection systems rely on fragmented, legacy data silos that are too slow to mitigate real-time threats.",
    metrics: [
      { label: "ASSET VELOCITY", value: "400% GROWTH" },
      { label: "SINGLE EVENT GAIN", value: "$1.2B LIABILITY" },
      { label: "RECOVERY TIME", value: "SYSTEMIC FAILURE" }
    ]
  },
  {
    category: "MISSION ARCHITECTURE",
    ref: "REF: SSA-SOL-ALPHA",
    title: "Orbital Shield Protocol",
    summary: "API-driven decision intelligence at global scale.",
    detail: "Cryptik's Orbital Shield replaces manual conjunction screening with an automated, high-throughput intelligence layer. We deliver collision risk detection 10x faster than traditional pipelines while reducing operational overhead by 40%. Our engine is purpose-built as the modular backbone for the next generation of autonomous satellite operations.",
    metrics: [
      { label: "LATENCY REDUCTION", value: "10X THROUGHPUT" },
      { label: "OP-EX OPTIMIZATION", value: "-42% COST" },
      { label: "DECISION FIDELITY", value: "INSTITUTIONAL" }
    ]
  },
  {
    category: "ECONOMIC FRONTIER",
    ref: "REF: SSA-MKT-GLOBAL",
    title: "The $2.4B Opportunity",
    summary: "Positioned at the center of the shared operating picture.",
    detail: "As mega-constellations become the primary model for orbital assets, the demand for high-fidelity situational awareness is expanding at 12% annually. Cryptik captures this value by providing the essential data fusion layer that sovereign and commercial operators require to ensure mission continuity in contested or congested space.",
    metrics: [
      { label: "MARKET CAP", value: "$2.4B SECTOR" },
      { label: "ANNUAL EXPANSION", value: "12% CAGR" },
      { label: "MARKET NICHE", value: "DATA FUSION" }
    ]
  },
  {
    category: "COMPETITIVE DIFFERENTIATION",
    ref: "REF: SSA-ADV-CORE",
    title: "The Strategic Advantage",
    summary: "Outperforming legacy silos through transparent API depth.",
    detail: "While legacy providers like LeoLabs and ExoAnalytic operate closed ecosystems, Cryptik focuses on developer-first API depth and real-time telemetry processing. We win by enabling seamless integration into existing mission control stacks, providing higher data transparency and sub-15ms processing latency for critical decision-making.",
    metrics: [
      { label: "INTEGRATION TIME", value: "INSTANT API" },
      { label: "DATA TRANSPARENCY", value: "100% AUDITED" },
      { label: "TECH STACK", value: "SOVEREIGN-GRADE" }
    ]
  }
]

export default function StrategicAdvantage() {
  const [current, setCurrent] = useState(0)

  // Keyboard and Arrow Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") {
        setCurrent((prev) => (prev + 1) % DATA_CORE.length)
      }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
        setCurrent((prev) => (prev - 1 + DATA_CORE.length) % DATA_CORE.length)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const next = () => setCurrent((prev) => (prev + 1) % DATA_CORE.length)
  const prev = () => setCurrent((prev) => (prev - 1 + DATA_CORE.length) % DATA_CORE.length)

  return (
    <section className="py-24 bg-space-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        
        {/* Header - Aligned with About Section */}
        <div className="mb-20">
          <span className="text-technical mb-6 block text-cosmic-blue">Strategic Analysis</span>
          <h2 className="text-4xl md:text-5xl font-sans font-medium text-white tracking-tighter uppercase">
            Why Choose <span className="text-cosmic-blue">Cryptik</span>?
          </h2>
        </div>

        {/* Content Matrix */}
        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Navigation & Guide */}
          <div className="lg:col-span-4 space-y-6 flex flex-col">
            <div className="space-y-3 flex-1">
              {DATA_CORE.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-full text-left p-6 transition-all relative glass-panel hud-corner group ${
                    current === idx ? "bg-white/[0.04] border-white/30" : "bg-transparent border-transparent opacity-40 hover:opacity-100"
                  }`}
                >
                  <span className="hidden" /> {/* HUD Anchor */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-cosmic-blue block mb-2 uppercase">
                        {item.category}
                      </span>
                      <h4 className="text-lg font-medium text-white group-hover:text-white transition-colors">
                        {item.title}
                      </h4>
                    </div>
                    <ChevronRight className={`h-4 w-4 mt-1 transition-transform ${current === idx ? "translate-x-1 opacity-100" : "opacity-0"}`} />
                  </div>
                </button>
              ))}
            </div>

            {/* Operator Guide / Navigation Controls */}
            <div className="glass-panel p-6 border border-white/5 hud-corner relative overflow-hidden group">
               <span className="hidden" />
               <div className="flex items-center justify-between mb-4">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.2em]">Navigation Protocol</span>
                  <div className="flex space-x-2">
                     <button 
                        onClick={prev}
                        className="p-1.5 hover:bg-white/10 rounded border border-white/10 transition-colors text-white/60 hover:text-white"
                        title="Previous Module [↑]"
                     >
                        <ChevronLeft className="h-4 w-4" />
                     </button>
                     <button 
                        onClick={next}
                        className="p-1.5 hover:bg-white/10 rounded border border-white/10 transition-colors text-white/60 hover:text-white"
                        title="Next Module [↓]"
                     >
                        <ChevronRight className="h-4 w-4" />
                     </button>
                  </div>
               </div>
               <div className="flex items-start gap-4">
                  <div className="flex flex-col gap-1 items-center font-mono text-[10px] text-white/30 pt-1">
                     <div className="border border-white/10 px-1.5 py-0.5 rounded shadow-inner">↑</div>
                     <div className="border border-white/10 px-1.5 py-0.5 rounded shadow-inner">↓</div>
                  </div>
                  <p className="text-[11px] text-stellar-grey leading-tight font-sans">
                     Use <span className="text-white italic">Arrow Keys</span> or the <span className="text-white italic">Primary Selector</span> above to cycle through intelligence modules.
                  </p>
               </div>
            </div>
          </div>

          {/* Right Column: Detailed Intelligence Brief */}
          <div className="lg:col-span-8 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-1 glass-panel p-8 md:p-12 rounded-2xl border border-white/10 relative hud-corner flex flex-col justify-between"
              >
                <span className="hidden" /> {/* HUD Anchor */}
                
                <div className="space-y-10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                       <h3 className="text-3xl md:text-5xl font-serif text-white italic tracking-tight leading-none">
                         {DATA_CORE[current].title}
                       </h3>
                       <p className="text-stellar-grey text-lg font-light tracking-wide italic font-serif">
                         {DATA_CORE[current].summary}
                       </p>
                    </div>
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-[0.4em] pt-2">
                       {DATA_CORE[current].ref}
                    </span>
                  </div>

                  <div className="flex gap-8">
                     <CornerDownRight className="h-6 w-6 text-cosmic-blue shrink-0 mt-1 opacity-40" />
                     <p className="text-stellar-grey text-base md:text-lg leading-relaxed font-sans font-light max-w-2xl">
                       {DATA_CORE[current].detail}
                     </p>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-white/5">
                  {DATA_CORE[current].metrics.map((metric, i) => (
                    <div key={i} className="space-y-1">
                      <span className="text-technical text-[9px] text-white/30 block mb-1">
                        {metric.label}
                      </span>
                      <p className="text-xl font-sans font-medium text-white tracking-tighter">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Meta Bar */}
            <div className="mt-8 flex justify-between items-center text-[9px] font-mono text-white/15 uppercase tracking-[0.3em] px-4">
               <div className="flex items-center">
                  <div className="w-1 h-1 bg-cosmic-blue rounded-full mr-3 animate-pulse" />
                  INSTITUTIONAL GRADE VALIDATION • v2.4
               </div>
               <div className="hidden md:block">
                  AUTHORIZATION: CORE-SSA-942
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
