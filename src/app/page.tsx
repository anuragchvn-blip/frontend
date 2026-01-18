"use client"

import { motion } from "framer-motion"
import { Satellite, Shield, Zap, Target, Globe, ChevronRight, Activity, ArrowRight } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/Navbar"
// import StarField from "@/components/StarField"
import HeroVideo from "@/components/HeroVideo"

export default function LandingPage() {
  return (
    <main className="min-h-screen relative bg-space-black text-white selection:bg-white selection:text-space-black scroll-smooth">
      {/* <StarField /> */} 
      <div className="atmospheric-bg" />
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-end pb-0 overflow-hidden">
        <HeroVideo />
        
        {/* Unified Content Container - Flex Stacking for Layout Stability */}
        <div className="relative z-30 w-full max-w-[95%] md:max-w-[90%] mx-auto px-4 md:px-12 pb-12 md:pb-28 flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-0 pointer-events-none">
          
          {/* Text Overlay - Left Aligned */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-left pointer-events-auto max-w-3xl"
          >
              <h3 className="text-white/70 text-xs md:text-sm font-bold tracking-[0.25em] uppercase mb-4 font-mono">
                Operational Challenge
              </h3>
              
              <h1 className="text-6xl xs:text-7xl md:text-9xl font-sans font-medium text-white mb-6 md:mb-8 tracking-tighter leading-[0.85]">
                Orbital Congestion
              </h1>

              <div className="space-y-4 md:space-y-6 text-white/95 font-sans font-normal leading-relaxed text-sm md:text-lg border-l-2 border-white/20 pl-4 md:pl-6 max-w-xl">
                <p>
                  <span className="text-white font-bold">Why it matters:</span> Low Earth Orbit density has increased by 400% in the last decade. Critical assets face exponential collision risks.
                </p>
              </div>
          </motion.div>

          {/* Buttons - Right Aligned on Desktop, Stacked on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-6 pointer-events-auto"
          >
            <Link
              href="/dashboard"
              className="btn-pill btn-primary flex items-center group w-auto justify-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base backdrop-blur-md bg-white text-space-black font-medium hover:bg-white/90 transition-all rounded-full shadow-lg shadow-white/10"
            >
              Control Center
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
               href="/technical"
               className="btn-pill btn-secondary flex items-center w-auto justify-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base backdrop-blur-md bg-black/40 border border-white/20 text-white hover:bg-black/60 transition-all rounded-full"
            >
              Technical Specs
            </Link>
          </motion.div>
        
        </div>

        {/* HUD Decoration Removed as requested */}

      </section>

      {/* Core Capabilities - Technical Style */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-technical mb-4 block">Platform Core</span>
          <h2 className="text-4xl md:text-5xl font-medium text-white uppercase tracking-tight">
            Integrated Intelligence
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0 border border-white/10">
          {[
            {
              title: "Orbital Mapping",
              desc: "Dynamic 3D visualization of thousands of concurrent objects with high-fidelity path prediction.",
              icon: Globe,
            },
            {
              title: "Conjunction Logic",
              desc: "Automated screening for potential proximity events using standard SGP4 and advanced propagation.",
              icon: Target,
            },
            {
              title: "Asset Security",
              desc: "Continuous monitoring and threat weight assessment for high-value governmental and commercial assets.",
              icon: Shield,
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="p-12 border border-white/10 hover:bg-white/[0.02] transition-colors relative group hud-corner"
            >
              <span className="hidden" /> {/* HUD Corner Anchor */}
              <feature.icon className="h-10 w-10 text-white/40 mb-8 group-hover:text-white transition-colors" />
              <h3 className="text-xl font-medium mb-4 uppercase tracking-wider">{feature.title}</h3>
              <p className="text-stellar-grey leading-relaxed font-sans font-light text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats - Cinematic Style - Properly Middle Aligned */}
      <section className="py-40 bg-white/[0.02] border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Tracked Objects", value: "24,000+" },
              { label: "Daily Obs", value: "8.4M" },
              { label: "Latency", value: "14ms" },
              { label: "Global Nodes", value: "142" },
            ].map((stat, i) => (
              <div key={i} className="text-center flex flex-col items-center">
                <p className="text-4xl md:text-5xl font-medium text-cinematic mb-2 tracking-tighter">{stat.value}</p>
                <p className="text-technical text-[9px] opacity-40 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-full bg-cosmic-blue/5 blur-[100px] pointer-events-none" />
      </section>

      {/* Old Footer Removed */}
      {/* Footer - Invest In Us */ }
      {/* Footer - Invest In Us */ }
      <footer className="relative pt-32 pb-10 px-4 border-t border-white/10 bg-black text-white overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-blue-900/10 blur-[150px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Main Call to Action */}
          <div className="flex flex-col items-start mb-32">
             <h2 className="text-6xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9] mb-8">
               Why not <span className="text-zinc-500">Invest in us</span> <br />
               and make the <br />
               world <span className="text-cosmic-blue">stronger?</span>
             </h2>
             <div className="flex items-center space-x-6">
                <a 
                  href="mailto:anuragchvn1@gmail.com"
                  className="btn-pill px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-zinc-200 transition-colors inline-flex items-center"
                >
                  Contact Deployment Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
             </div>
          </div>

          {/* Bottom Bar - Socials & Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 gap-6 md:gap-0">
             
             {/* Brand */}
             <div className="flex items-center space-x-3">
                <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
                <span className="font-mono font-bold tracking-widest text-sm text-white/80">SSA OPS SYSTEM</span>
             </div>

             {/* Copyright */}
             <div className="hidden md:block text-zinc-600 text-[10px] font-mono tracking-widest uppercase">
               © 2026 Professional Satellite Tracking System. Institutional Grade SSA.
             </div>

             {/* Links */}
             <div className="flex items-center space-x-8 text-xs font-mono font-medium tracking-wider text-zinc-400">
               <span className="hover:text-white cursor-pointer transition-colors">PRIVACY</span>
               <a href="mailto:anuragchvn1@gmail.com" className="hover:text-white transition-colors">CONTACT</a>
               <a href="https://x.com/dev_anurag1" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                 X / TWITTER
               </a>
               <a href="https://github.com/anuragchvn-blip" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                 GITHUB
               </a>
             </div>
             
             {/* Mobile Copyright (Visible only on mobile) */}
             <div className="md:hidden text-zinc-600 text-[10px] font-mono tracking-widest uppercase text-center mt-4">
               © 2026 SSA OPS SYSTEM.
             </div>

          </div>
        </div>
      </footer>
    </main>
  )
}
