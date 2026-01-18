"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import { Cpu, Database, Network, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TechnicalSpecsPage() {
  return (
    <main className="min-h-screen bg-space-black text-white relative selection:bg-white selection:text-space-black">
      <div className="atmospheric-bg fixed inset-0 z-0 pointer-events-none" />
      <Navbar />

      <div className="pt-32 pb-20 px-4 max-w-5xl mx-auto relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="mb-20"
        >
          <Link href="/" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8 text-sm tracking-wide font-mono uppercase">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Orbit
          </Link>
          <h1 className="text-5xl md:text-7xl font-medium text-white mb-6 tracking-tighter">System Architecture</h1>
          <p className="text-xl text-zinc-300 font-light leading-relaxed max-w-3xl border-l-[1px] border-white/20 pl-6">
            A breakdown of the computational engines, astrodynamics algorithms, and data pipelines 
            that power our Conjunction Assessment (CA) and Space Situational Awareness (SSA) capabilities.
          </p>
        </motion.div>

        <div className="space-y-24">
          
          {/* Section 1: Propagation */}
          <section className="group">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <Cpu className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-medium text-white tracking-tight">Orbital Propagation Layer</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 text-zinc-300 font-light leading-relaxed">
              <div>
                <h3 className="text-white text-lg font-medium mb-3">SGP4/SDP4 Implementation</h3>
                <p className="mb-6">
                  Our baseline propagator utilizes the <span className="text-white font-normal">Simplified General Perturbations-4 (SGP4)</span> algorithm 
                  for specialized calculation of satellite state vectors from Two-Line Elements (TLEs). 
                  For deep-space objects (period &gt; 225 minutes), the system automatically switches to 
                  <span className="text-white font-normal"> SDP4 (Deep Space)</span>, accounting for lunar-solar gravitational resonance 
                  and earth tesseral harmonics. This ensures compliance with established USSPACECOM standards 
                  for TLE propagation.
                </p>
              </div>
              <div>
                <h3 className="text-white text-lg font-medium mb-3">High-Fidelity Force Models (Orekit)</h3>
                <p>
                  For precision conjunction screening, we employ a Java-Python bridge to the <span className="text-white font-normal">Orekit</span> astrodynamics 
                  library. This allows for numerical propagation incorporating:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-zinc-400 text-sm">
                  <li>EGM96 Earth Gravity Field (up to 70x70 degree/order)</li>
                  <li>NRLMSISE-00 Atmospheric Drag Modeling</li>
                  <li>Third-body gravity (Sun & Moon)</li>
                  <li>Solar Radiation Pressure (SRP) with spherical spacecraft modeling</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: Conjunction Assessment */}
          <section className="group">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <Network className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-medium text-white tracking-tight">Conjunction Assessment (CA)</h2>
            </div>
            
            <div className="border-l border-white/10 pl-8 ml-3 space-y-8">
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Screening Volume & Filters</h3>
                <p className="text-zinc-300 font-light leading-relaxed max-w-3xl">
                  We utilize a pre-filter stage ("All-vs-All") based on apogee/perigee filters to eliminate 
                  geometrically impossible collision pairs. Candidate pairs then undergo a 
                  <span className="text-white font-normal"> Smart Sieve</span> process using a 3D Euclidean distance check 
                  promoted over the entire screening interval (typically 7 days), reducing computational load by 98% 
                  compared to brute-force methods.
                </p>
              </div>
              <div>
                <h3 className="text-white text-lg font-medium mb-2">Probability of Collision ($P_c$)</h3>
                <p className="text-zinc-300 font-light leading-relaxed max-w-3xl">
                  For objects violating the miss distance threshold, $P_c$ is calculated using the 
                  <span className="text-white font-normal"> Foster-1992</span> method. This involves projecting 
                  the covariance ellipsoids of both the primary and secondary object into the 2D conjunction 
                  plane (B-plane) at the Time of Closest Approach (TCA).
                </p>
                <div className="bg-white/5 p-4 mt-4 rounded-sm font-mono text-xs text-zinc-400 border border-white/5">
                  Algorithm: 2D integration of the combined probability density function (PDF) over the hard-body radius area.
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Data Architecture */}
          <section className="group">
             <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <Database className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-medium text-white tracking-tight">Data Ingestion & Provenance</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 text-sm text-zinc-300">
               <div className="bg-white/[0.02] p-6 border border-white/10">
                 <h4 className="text-white font-medium mb-2 uppercase tracking-wider text-xs">Ingestion</h4>
                 <p className="leading-relaxed">
                   Direct API integration with <span className="text-white">Space-Track.org</span>. 
                   Automated cron jobs fetch incremental TLE updates every 6 hours. 
                   Data is parsed, identifying catalog ID changes and launch pieces.
                 </p>
               </div>
               <div className="bg-white/[0.02] p-6 border border-white/10">
                 <h4 className="text-white font-medium mb-2 uppercase tracking-wider text-xs">Validation</h4>
                 <p className="leading-relaxed">
                   Incoming state vectors undergo consistency checks (e.g., eccentricity &lt; 1 for LEO). 
                   Anomalous decay rates or mean motion derivatives are flagged for human analyst review.
                 </p>
               </div>
               <div className="bg-white/[0.02] p-6 border border-white/10">
                 <h4 className="text-white font-medium mb-2 uppercase tracking-wider text-xs">Storage</h4>
                 <p className="leading-relaxed">
                   PostgreSQL with <span className="text-white">PostGIS</span> extension for spatial indexing. 
                   Ephemerides are stored as BLOBs with full audit trails (timestamp, source, original TLE line).
                 </p>
               </div>
            </div>
          </section>

          {/* Section 4: Security */}
          <section className="group">
            <div className="flex items-center space-x-4 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-sm">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-medium text-white tracking-tight">Security & Compliance</h2>
            </div>
             <p className="text-zinc-300 font-light leading-relaxed max-w-4xl">
               The system implements a strict Role-Based Access Control (RBAC) model. 
               Route protection is enforced via JWT (JSON Web Tokens) with short-lived expiration. 
               All backend traffic is encrypted via TLS 1.3. Conjunction Data Messages (CDMs) are 
               generated in CCSDS compliant XML format, ensuring interoperability with major catalog providers.
             </p>
          </section>

        </div>
        
        {/* Footer Note */}
        <div className="mt-32 pt-8 border-t border-white/10 text-center">
            <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
              System Specification Document v2.4 &bull; INTERNAL USE ONLY
            </p>
        </div>
      </div>
    </main>
  )
}
