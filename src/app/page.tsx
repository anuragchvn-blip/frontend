"use client"

import { motion } from "framer-motion"
import { Satellite, Shield, Zap, Target, Globe, ChevronRight, Activity, ArrowRight, FileText, Eye, Cpu, Lock, ExternalLink, Play, Pause } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/Navbar"
// import StarField from "@/components/StarField"
import HeroVideo from "@/components/HeroVideo"

import { useState, useRef } from "react"

export default function LandingPage() {
  return (
    <main className="min-h-screen relative bg-space-black text-white selection:bg-white selection:text-space-black scroll-smooth overflow-hidden">
      {/* <StarField /> */} 
      <div className="atmospheric-bg" />
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section */}
      <section className="relative min-h-[100dvh] flex flex-col justify-end pb-0 overflow-hidden bg-space-black">
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
      <section className="py-32 px-4 bg-space-black relative overflow-hidden mt-[-1px]">
        <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-technical mb-4 block">Platform Core</span>
          <h2 className="text-4xl md:text-5xl font-medium text-white uppercase tracking-tight">
            Integrated Intelligence
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-0">
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
        </div>
      </section>

      {/* About Section - Relocated & Resized */}
      <section id="about" className="py-32 bg-space-black relative mt-[-1px]">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-12 mb-12">
              <span className="text-technical mb-6 block">Organization</span>
              <h2 className="text-6xl md:text-8xl lg:text-9xl font-sans font-medium text-white mb-8 tracking-tighter leading-[0.85]">
                About SSA Systems
              </h2>
            </div>
            <div className="lg:col-span-12">
              <div className="space-y-16">
                <p className="text-stellar-grey text-xl md:text-3xl leading-tight font-sans font-light border-l-4 border-white/20 pl-10 max-w-5xl">
                  SSA Systems is an institutional-grade platform dedicated to comprehensive Space Situational Awareness. 
                  We provide high-precision tracking, collision avoidance, and strategic monitoring services to sovereign 
                  and commercial space operators globally.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pt-16 border-t border-white/10">
                  {[
                    { title: "Orbital Safety", desc: "Automated conjunction assessment and path prediction using multi-source sensor fusion." },
                    { title: "Defense Assets", desc: "Specialized monitoring and threat assessment for high-value governmental infrastructure." },
                    { title: "Technical R&D", desc: "In-house development of multi-spectral image processing and autonomous vision tools." },
                    { title: "Precision State", desc: "Centimeter-level accuracy in state-vector estimation and orbital propagation." }
                  ].map((item, idx) => (
                    <div key={idx} className="group space-y-4">
                      <h4 className="text-sm font-mono font-bold text-white uppercase tracking-[0.3em]">{item.title}</h4>
                      <p className="text-base text-stellar-grey leading-relaxed font-light">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Findings - Tsuki Image Processing Showcase */}
      <section className="py-32 bg-space-black relative overflow-hidden mt-[-1px]">
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-technical mb-4 block">Operational Excellence</span>
              <h2 className="text-4xl md:text-5xl font-medium text-white uppercase tracking-tight">
                Recent Findings
              </h2>
              <p className="mt-6 text-stellar-grey text-sm md:text-base leading-relaxed">
                Experience the precision of our proprietary <span className="text-white font-semibold">Tsuki Image Processing Tool</span>. 
                Below is a demonstration of our automated debris detection and comprehensive data reporting.
              </p>
            </div>
            
            {/* Report Cards */}
            <div className="flex flex-col md:flex-row gap-6">
                <motion.a
                    href="/documents/orbital_debris_comprehensive_report.pdf"
                    target="_blank"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group flex items-center space-x-6 p-6 md:p-10 glass-panel rounded-2xl hover:bg-white/[0.08] transition-all hover:border-white/20 shrink-0 relative hud-corner"
                >
                    <span className="hidden" /> {/* HUD Corner Anchor */}
                    <div className="w-16 h-16 rounded-xl bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                        <FileText className="w-8 h-8 text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-1 flex items-center uppercase tracking-wider">
                            NASA Comprehensive Report
                            <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-technical">PDF • 8.84 MB • RELEASE V2.4</p>
                    </div>
                </motion.a>

                <motion.a
                    href="/documents/drone_detection_report.pdf"
                    target="_blank"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="group flex items-center space-x-6 p-6 md:p-10 glass-panel rounded-2xl hover:bg-white/[0.08] transition-all hover:border-white/20 shrink-0 relative hud-corner"
                >
                    <span className="hidden" /> {/* HUD Corner Anchor */}
                    <div className="w-16 h-16 rounded-xl bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                        <FileText className="w-8 h-8 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium mb-1 flex items-center uppercase tracking-wider">
                            BLUE Drone Detection
                            <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-technical">PDF • 4.34 MB • CLASSIFIED</p>
                    </div>
                </motion.a>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Detection Showcase 1 - LEO */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-technical">LEO Orbit Detection</h3>
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-[0.2em]">TSUKI PROCESSED</span>
                </div>
                <div className="grid grid-cols-2 gap-6 aspect-video">
                    <div className="relative group hud-corner overflow-hidden rounded-lg">
                        <span className="hidden" />
                        <img 
                            src="/images/detection/leo_raw.jpg" 
                            alt="Raw LEO Input" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                            <span className="text-technical text-white">RAW INPUT DATA</span>
                        </div>
                    </div>
                    <div className="relative group border border-cosmic-blue/30 rounded-lg overflow-hidden hud-corner">
                        <span className="hidden" />
                        <img 
                            src="/images/detection/leo_processed.jpg" 
                            alt="Tsuki Processed LEO" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-4 bg-cosmic-blue/80 backdrop-blur-md border-t border-white/10">
                             <p className="text-[10px] font-mono text-white text-center tracking-[0.25em] font-bold">DETECTED 142 DEBRIS OBJECTS</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detection Showcase 2 - GEO */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-technical">GEO Orbit Detection</h3>
                    <span className="text-[9px] font-mono bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full border border-emerald-500/20 uppercase tracking-[0.2em]">TSUKI PROCESSED</span>
                </div>
                <div className="grid grid-cols-2 gap-6 aspect-video">
                    <div className="relative group hud-corner overflow-hidden rounded-lg">
                        <span className="hidden" />
                        <img 
                            src="/images/detection/geo_raw.jpg" 
                            alt="Raw GEO Input" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                            <span className="text-technical text-white">RAW INPUT DATA</span>
                        </div>
                    </div>
                    <div className="relative group border border-cosmic-blue/30 rounded-lg overflow-hidden hud-corner">
                        <span className="hidden" />
                        <img 
                            src="/images/detection/geo_processed.jpg" 
                            alt="Tsuki Processed GEO" 
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-4 bg-cosmic-blue/80 backdrop-blur-md border-t border-white/10">
                             <p className="text-[10px] font-mono text-white text-center tracking-[0.25em] font-bold">DETECTED 89 DEBRIS OBJECTS</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* New Section: Aerial Surveillance */}
          <div className="border-t border-white/10 pt-16">
            <div className="mb-12 max-w-3xl">
               <span className="text-technical mb-2 block text-blue-400">Expanded Capabilities</span>
               <h3 className="text-3xl font-medium text-white uppercase tracking-tight mb-6">Aerial Surveillance</h3>
               <p className="text-stellar-grey text-base leading-relaxed">
                 <strong className="text-white">System:</strong> Custom YOLOv8 Neural Network. <br />
                 <strong className="text-white">Methodology:</strong> Multi-factor heuristic evaluation (Size, Shape, Altitude) with 122m operational ceiling. <br />
                 <strong className="text-white">Result:</strong> Positive identification of <strong>LARGE</strong> class drone (ITU Standard) with <strong>0.80 confidence</strong>.
               </p>
            </div>
            
            {/* Detection Showcase 3 - BLUE Drone */}
            <div className="max-w-5xl">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-technical">Drone Threat Detection</h3>
                    <span className="text-[9px] font-mono bg-blue-500/10 text-blue-500 px-3 py-1 rounded-full border border-blue-500/20 uppercase tracking-[0.2em]">BLUE PROCESSED</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group hud-corner overflow-hidden rounded-lg">
                        <span className="hidden" />
                        <img 
                            src="/images/detection/drone_raw.png" 
                            alt="Raw Drone Input" 
                            className="w-full h-auto"
                        />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                            <span className="text-technical text-white">RAW INPUT DATA</span>
                        </div>
                    </div>
                    <div className="relative group border border-blue-500/30 rounded-lg overflow-hidden hud-corner">
                        <span className="hidden" />
                        <img 
                            src="/images/detection/drone_processed.png" 
                            alt="BLUE Processed Drone" 
                            className="w-full h-auto"
                        />
                        <div className="absolute bottom-0 inset-x-0 p-4 bg-blue-600/80 backdrop-blur-md border-t border-white/10">
                             <p className="text-[10px] font-mono text-white text-center tracking-[0.25em] font-bold">DETECTED 1 AERIAL THREAT</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Operational Feedback */}
      <section className="py-32 bg-space-black relative mt-[-1px]">
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <div className="mb-20">
            <span className="text-technical mb-4 block">Operational Verification</span>
            <h2 className="text-5xl md:text-7xl font-sans font-medium text-white tracking-tighter uppercase">
              Mission <span className="text-cosmic-blue font-serif italic lowercase font-light">Feedback</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-stretch">
            {/* Video Testimonial Card */}
            <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="group relative glass-panel rounded-3xl overflow-hidden hud-corner h-full min-h-[400px]"
            >
              <span className="hidden" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10 pointer-events-none" />
              
              <video 
                className="w-full h-full object-cover filter brightness-[1.1] contrast-[1.05] saturate-[1.1] shadow-2xl"
                src="/testimonials/d2fc4c04-bf13-4bc1-837f-2a81b712588f.mp4"
                poster="/testimonials/ChatGPT Image Jan 21, 2026, 12_58_02 AM.png"
                loop
                muted={false}
                playsInline
                controls
              />
              
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                <p className="text-technical text-white mb-2 text-[10px]">Reference: VID-OP-001</p>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-white/80">Active Operational Log</span>
                </div>
              </div>
            </motion.div>

            {/* PDF Testimonial Card */}
            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="flex flex-col space-y-8"
            >
              <div className="flex-1 flex flex-col justify-between p-10 glass-panel border border-white/10 rounded-3xl relative hud-corner">
                <span className="hidden" />
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-xl bg-cosmic-blue/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-cosmic-blue" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-sans font-medium text-white tracking-tight leading-tight uppercase">
                    Platform <br />
                    Technical <br />
                    Testimonial
                  </h3>
                  <p className="text-stellar-grey text-lg leading-relaxed font-light">
                    Institutional validation report detailing the performance metrics and cross-correlation accuracy of the Cryptik infrastructure.
                  </p>
                </div>

                <div className="pt-10">
                  <a 
                    href="/testimonials/Testimonial for SSA Ops Platform.pdf"
                    target="_blank"
                    className="inline-flex items-center space-x-4 group/btn"
                  >
                    <div className="btn-pill bg-white text-black flex items-center group-hover/btn:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all">
                      Review Documentation
                      <ExternalLink className="ml-3 w-4 h-4" />
                    </div>
                  </a>
                </div>
              </div>

              {/* Security Badge HUD Style */}
              <div className="p-6 border border-white/5 rounded-2xl bg-white/[0.02]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Lock className="w-4 h-4 text-white/40" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.3em] text-white/40 uppercase">Classified Institutional Record</span>
                  </div>
                  <div className="text-[10px] font-mono text-white/20">Ref: TEST-2026-SSA</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats - Cinematic Style - Properly Middle Aligned */}
      <section className="py-40 bg-white/[0.02] relative overflow-hidden mt-[-1px]">
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
      <footer className="relative pt-32 pb-10 px-4 bg-space-black text-white overflow-hidden mt-[-1px]">
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
                <span className="font-mono font-bold tracking-widest text-sm text-white/80">CRYPTIK</span>
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
               © 2026 CRYPTIK.
             </div>

          </div>
        </div>
      </footer>
    </main>
  )
}
