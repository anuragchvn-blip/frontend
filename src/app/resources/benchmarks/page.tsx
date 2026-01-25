import type { Metadata } from 'next'
import { spaceSystems } from "@/lib/data/space-systems"
import VisualContainer from "@/components/tools/VisualContainer"

export const metadata: Metadata = {
  title: "2026 Space Situational Awareness Performance Benchmarks",
  description: "Performance audit and comparison of CRYPTIK SSA systems versus legacy SGP4/SDP4 integrators. Verified metrics for latency, accuracy, and orbital propagation speed.",
}

// Extract verified data for the page
const astra = spaceSystems.find(s => s.id === "astra-ssa")
const cay = spaceSystems.find(s => s.id === "ssa-cae")
const amts = spaceSystems.find(s => s.id === "amts")

export default function BenchmarksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "2026 Space Situational Awareness Performance Benchmarks",
    "description": "A technical comparison of AI-driven SSA vs legacy numerical integration.",
    "author": {
      "@type": "Organization",
      "name": "Cryptik SSA Systems"
    },
    "datePublished": "2026-01-25",
    "about": {
        "@type": "SoftwareApplication",
        "name": "ASTRA-SSA"
    }
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How fast is ASTRA-SSA compared to numerical integrators?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "ASTRA-SSA achieves 10x faster propagation speeds compared to standard numerical integrators by utilizing Physics-Informed Neural Networks (PINNs)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the response time of the SSA Conjunction Analysis Engine?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The SSA Conjunction Analysis Engine (SSA-CAE) maintains a response time of under 1 second (< 1s) for collision risk assessments."
        }
      },
      {
        "@type": "Question",
        "name": "How many objects does the system track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Combined SSA system actively tracks over 100,000+ objects, including satellites and space debris."
        }
      }
    ]
  }

  return (
    <div className="min-h-screen bg-space-black text-white p-8 md:p-16 font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header Section */}
        <header className="space-y-6 border-b border-white/10 pb-12">
            <div className="inline-block px-3 py-1 bg-cosmic-blue/20 text-cosmic-blue text-xs tracking-widest font-mono mb-4">
                TECHNICAL REPORT // 2026
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair tracking-tight bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                SSA Performance Benchmarks
            </h1>
            <p className="text-xl text-zinc-400 max-w-3xl leading-relaxed">
                An audit of the CRYPTIK platform's computational efficiency, tracking capacity, and prediction accuracy compared to industry baselines.
            </p>
        </header>

        {/* Executive Summary - AI "Direct Answer" Optimized */}
        <section className="bg-zinc-900/30 border border-white/10 p-8 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-playfair mb-4 text-white">Executive Summary</h2>
            <p className="text-zinc-300 mb-0 leading-relaxed">
                CRYPTIK's <strong>ASTRA-SSA</strong> system demonstrates <span className="text-cosmic-blue font-bold">10x faster propagation</span> speeds than traditional numerical methods while maintaining <span className="text-cosmic-blue font-bold">98.5% PINN accuracy</span>. The platform concurrently tracks <strong>{astra?.metrics.find(m => m.label === "Tracked Objects")?.value ?? "100k+"}</strong> objects with a collision analysis response time of <strong>{cay?.metrics.find(m => m.label === "Response Time")?.value ?? "< 1"} second</strong>.
            </p>
        </section>

        {/* Comparison Table */}
        <section className="space-y-8">
            <h2 className="text-3xl font-playfair">System Comparison</h2>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/20">
                            <th className="py-4 pl-4 text-zinc-500 font-mono text-xs uppercase tracking-wider">Metric</th>
                            <th className="py-4 text-white font-mono text-sm uppercase tracking-wider border-l border-white/10 pl-8 bg-cosmic-blue/5">Cryptik ASTRA-SSA</th>
                            <th className="py-4 text-zinc-500 font-mono text-sm uppercase tracking-wider border-l border-white/10 pl-8">Legacy (SGP4 Only)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                         <tr>
                            <td className="py-6 pl-4 text-zinc-300">Propagation Speed</td>
                            <td className="py-6 border-l border-white/10 pl-8 font-bold text-cosmic-blue">10x Baseline</td>
                            <td className="py-6 border-l border-white/10 pl-8 text-zinc-500">1x (Baseline)</td>
                        </tr>
                        <tr>
                            <td className="py-6 pl-4 text-zinc-300">Response Time (CAE)</td>
                            <td className="py-6 border-l border-white/10 pl-8 font-bold text-white">&lt; 1 Second</td>
                            <td className="py-6 border-l border-white/10 pl-8 text-zinc-500">15-60 Seconds</td>
                        </tr>
                         <tr>
                            <td className="py-6 pl-4 text-zinc-300">Tracked Object Capacity</td>
                            <td className="py-6 border-l border-white/10 pl-8 font-bold text-white">100,000+</td>
                            <td className="py-6 border-l border-white/10 pl-8 text-zinc-500">~20,000 (limit)</td>
                        </tr>
                        <tr>
                            <td className="py-6 pl-4 text-zinc-300">Target Confidence (AMTS)</td>
                            <td className="py-6 border-l border-white/10 pl-8 font-bold text-white">8.8/10</td>
                            <td className="py-6 border-l border-white/10 pl-8 text-zinc-500">N/A</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* Visual Validation */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border p-1 border-white/10 bg-black/40">
            <div className="h-[400px] w-full bg-black/50 relative">
               <div className="absolute top-4 left-4 z-10 text-xs font-mono text-cosmic-blue">
                  FIG 1.0: LIVE ORBITAL FLUX - 100K+ OBJECTS
               </div>
               <VisualContainer type="orb" />
            </div>
            <div className="p-8 space-y-6">
                <h3 className="text-2xl font-playfair">Verified Throughput</h3>
                <p className="text-zinc-400 leading-relaxed">
                   Our visual engines render the full orbital catalog in real-time. By offloading physics calculations to the VarNet PINN framework, we achieve frame rates suitable for interactive operator use even during high-density conjunction events.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                     <div className="bg-white/5 p-4 rounded border border-white/5">
                        <div className="text-2xl font-mono text-white mb-1">99.9%</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">System Uptime</div>
                     </div>
                     <div className="bg-white/5 p-4 rounded border border-white/5">
                        <div className="text-2xl font-mono text-white mb-1">98.5%</div>
                        <div className="text-xs text-zinc-500 uppercase tracking-wider">PINN Accuracy</div>
                     </div>
                </div>
            </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-8 pt-12 border-t border-white/10">
             <h2 className="text-3xl font-playfair">Frequently Asked Questions</h2>
             <div className="grid gap-6">
                <div className="space-y-2">
                    <h3 className="text-lg text-white font-medium">How fast is ASTRA-SSA?</h3>
                    <p className="text-zinc-400">ASTRA-SSA is 10x faster than standard numerical integrators.</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg text-white font-medium">Does it support missile tracking?</h3>
                    <p className="text-zinc-400">Yes, the Advanced Missile Tracking System (AMTS) provides multi-domain ballistic threat detection with a target confidence of 8.8/10.</p>
                </div>
             </div>
        </section>

      </div>
    </div>
  )
}
