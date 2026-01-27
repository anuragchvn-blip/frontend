"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FileText, ExternalLink, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import Image from "next/image"
import { createPortal } from "react-dom"

const GWD_IMAGES = [
  {
    src: "/images/gwd/improved_gw150914_q_transform.png",
    title: "Q-Transform Analysis",
    caption: "Time-frequency representation of the GW150914 signal showing the characteristic 'chirp' profile as the black holes merge."
  },
  {
    src: "/images/gwd/improved_gw150914_matched_filter_snr.png",
    title: "Matched Filter SNR",
    caption: "Signal-to-Noise Ratio (SNR) peaks corresponding to the detection of the gravitational wave event across LIGO detectors."
  },
  {
    src: "/images/gwd/improved_gw150914_waveform_comparison.png",
    title: "Waveform Comparison",
    caption: "Comparison between the observed data and numerical relativity templates for a binary black hole merger."
  },
  {
    src: "/images/gwd/improved_gw150914_sky_localization.png",
    title: "Sky Localization",
    caption: "Bayesian posterior probability maps for the source location of the GW150914 event."
  },
  {
    src: "/images/gwd/improved_gw150914_corner_plot.png",
    title: "Parameter Estimation",
    caption: "Posterior distributions for the masses and spins of the merging black holes."
  },
  {
    src: "/images/gwd/improved_gw150914_energy_release.png",
    title: "Energy Quantification",
    caption: "Analysis of the total energy radiated as gravitational waves during the final milliseconds of the merger."
  },
  {
    src: "/images/gwd/improved_gw150914_imr_phases.png",
    title: "IMR Phases",
    caption: "Inspiral-Merger-Ringdown (IMR) phase decomposition of the gravitational waveform."
  }
]

export default function GWDAnalysis() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll locking, Navbar hiding, and keyboard navigation
  useEffect(() => {
    const nav = document.querySelector('nav')
    
    if (!isOpen) {
      document.body.style.overflow = 'unset'
      if (nav) {
        nav.style.opacity = '1'
        nav.style.pointerEvents = 'auto'
      }
      return
    }
    
    document.body.style.overflow = 'hidden'
    if (nav) {
      nav.style.opacity = '0'
      nav.style.pointerEvents = 'none'
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCurrentIndex((prev) => (prev + 1) % GWD_IMAGES.length)
      if (e.key === "ArrowLeft") setCurrentIndex((prev) => (prev - 1 + GWD_IMAGES.length) % GWD_IMAGES.length)
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = 'unset'
      if (nav) {
        nav.style.opacity = '1'
        nav.style.pointerEvents = 'auto'
      }
    }
  }, [isOpen])

  return (
    <div className="border-t border-white/10 pt-12 md:pt-20 mt-12 md:mt-20">
      <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
        {/* Left Side: Journal Content */}
        <div className="lg:col-span-12 mb-4 md:mb-8">
           <div className="flex items-center space-x-3 mb-4 md:mb-6">
             <span className="text-[9px] md:text-[10px] font-mono font-bold tracking-[0.2em] md:tracking-[0.3em] text-blue-400 uppercase">
               Cryptik Scientific Journal • Vol. 04
             </span>
             <div className="h-px flex-1 bg-white/10" />
           </div>
        </div>

        <div className="lg:col-span-5 space-y-6 md:space-y-8">
          <div className="relative">
            <h3 className="text-3xl md:text-5xl font-serif font-medium text-white leading-[1.1] tracking-tight mb-4 md:mb-6">
              Cosmic Ripples: <br className="hidden md:block" />
              <span className="italic text-cosmic-blue">Cryptik GWD</span> Analysis of GW150914
            </h3>
            <div className="absolute -top-4 -left-4 w-12 h-12 md:w-16 md:h-16 border-t-2 border-l-2 border-white/10 pointer-events-none" />
          </div>

          <div className="columns-1 md:columns-2 gap-8 space-y-4 md:space-y-6 text-stellar-grey text-xs md:text-sm leading-relaxed font-light font-sans text-justify">
             <p className="first-letter:text-4xl md:first-letter:text-5xl first-letter:font-serif first-letter:float-left first-letter:mr-2 md:first-letter:mr-3 first-letter:text-white">
                Cryptik GWD (Gravitational Wave Detector) is a professional analysis platform that processes real gravitational wave data from LIGO/Virgo detectors. It transforms complex astrophysical signals into publication-quality visualizations, performing signal detection, time-frequency analysis, and parameter estimation.
             </p>
             <p>
                Using data from the Gravitational Wave Open Science Center (GWOSC), Cryptik GWD generates comprehensive scientific reports - from matched filter detection to energy quantification - with results validated against official LIGO findings.
             </p>
             <p>
                The system features a modular architecture with dedicated processing engines for whitening, filtering, and Q-transform analysis, revealing cosmic events like black hole collisions billions of light-years away with unprecedented clarity.
             </p>
          </div>

          <div className="pt-4 md:pt-6 flex flex-wrap gap-3 md:gap-4">
            <a 
                href="/documents/GW150914_Cryptik_GWD_Analysis.pdf" 
                target="_blank"
                className="group flex items-center space-x-3 px-5 md:px-6 py-2.5 md:py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all flex-1 md:flex-none"
            >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <FileText className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                </div>
                <div className="text-left">
                    <span className="block text-[8px] md:text-[10px] font-mono font-bold text-white uppercase tracking-widest">Scientific Report</span>
                    <span className="block text-[7px] md:text-[9px] text-stellar-grey uppercase tracking-widest">GW150914_ANALYSIS.PDF • 4.2MB</span>
                </div>
            </a>
            
            <div className="flex items-center space-x-2 px-3 md:px-4 py-2 border border-blue-500/20 rounded-full bg-blue-500/5 items-center flex-1 md:flex-none justify-center">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[8px] md:text-[10px] font-mono font-bold text-blue-400 uppercase tracking-widest">Classified Intel</span>
            </div>
          </div>
        </div>

        {/* Right Side: Collage Thumbnail */}
        <div className="lg:col-span-7">
           <div 
             className="relative cursor-pointer group rounded-2xl overflow-hidden border border-white/10 bg-white/[0.02]"
             onClick={() => {
                setIsOpen(true);
                setCurrentIndex(0);
             }}
           >
              {/* Main Grid Layout - Responsive gaps and padding */}
              <div className="grid grid-cols-12 grid-rows-6 gap-2 md:gap-3 p-3 md:p-4 aspect-square md:aspect-[16/10]">
                 {/* Large Hero Image */}
                 <div className="col-span-12 md:col-span-8 row-span-3 md:row-span-4 relative overflow-hidden rounded-lg border border-white/5 hover:border-blue-500/30 transition-all duration-500">
                    <Image 
                      src={GWD_IMAGES[0].src}
                      alt={GWD_IMAGES[0].title}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 brightness-75 group-hover:brightness-100 scale-105 group-hover:scale-100"
                    />
                    <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-black/60 backdrop-blur-md border border-white/10 px-2 md:px-3 py-1 rounded text-[8px] md:text-[10px] font-mono text-white/70 uppercase">
                       Ref: Q-TRANSFORM_V4
                    </div>
                 </div>

                 {/* Secondary Images - Adjusted for mobile grid */}
                 <div className="col-span-4 md:col-span-4 row-span-2 md:row-span-3 relative overflow-hidden rounded-lg border border-white/5">
                    <Image 
                      src={GWD_IMAGES[1].src}
                      alt={GWD_IMAGES[1].title}
                      fill
                      className="object-cover grayscale brightness-50 group-hover:brightness-90 transition-all duration-700"
                    />
                 </div>

                 <div className="col-span-4 md:col-span-4 row-span-2 md:row-span-3 relative overflow-hidden rounded-lg border border-white/5">
                    <Image 
                      src={GWD_IMAGES[2].src}
                      alt={GWD_IMAGES[2].title}
                      fill
                      className="object-cover grayscale brightness-50 group-hover:brightness-90 transition-all duration-700"
                    />
                 </div>

                 <div className="col-span-4 md:col-span-4 row-span-2 md:row-span-2 relative overflow-hidden rounded-lg border border-white/5 hidden md:block">
                    <Image 
                      src={GWD_IMAGES[3].src}
                      alt={GWD_IMAGES[3].title}
                      fill
                      className="object-cover grayscale brightness-50 group-hover:brightness-90 transition-all duration-700"
                    />
                 </div>

                 <div className="col-span-4 md:col-span-4 row-span-1 md:row-span-2 relative overflow-hidden rounded-lg border border-white/5">
                    <Image 
                      src={GWD_IMAGES[4].src}
                      alt={GWD_IMAGES[4].title}
                      fill
                      className="object-cover grayscale brightness-50 group-hover:brightness-90 transition-all duration-700"
                    />
                 </div>

                 <div className="col-span-8 md:col-span-4 row-span-1 md:row-span-2 relative overflow-hidden rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
                    <div className="text-center group-hover:scale-110 transition-transform flex items-center space-x-2 md:block md:space-x-0">
                       <Maximize2 className="w-5 h-5 md:w-8 md:h-8 text-white/20 mb-0 md:mb-2 mx-auto group-hover:text-blue-400 transition-colors" />
                       <p className="text-[8px] md:text-[10px] font-mono font-bold text-white/30 uppercase tracking-[0.1em] md:tracking-[0.2em]">Launch Analysis</p>
                    </div>
                 </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-cosmic-blue/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
           </div>

           <div className="mt-4 md:mt-6 flex justify-between items-end border-b border-white/10 pb-4">
              <div className="space-y-1 text-left">
                 <h4 className="text-lg md:text-xl font-serif text-white italic">Evidence Portfolio #15-09-14</h4>
                 <p className="text-[8px] md:text-[10px] font-mono text-stellar-grey uppercase tracking-widest">Confirmed: 2015-09-14 UTC</p>
              </div>
              <p className="text-[7px] md:text-[9px] font-mono text-white/30 uppercase text-right max-w-[120px] md:max-w-[200px]">
                 Verified LIGO strain data via GWOSC.
              </p>
           </div>
        </div>
      </div>

      {/* Lightbox / Carousel Overlay - Rendered in Portal */}
      {mounted && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99999] bg-black/98 backdrop-blur-3xl flex flex-col items-center overflow-hidden"
            >
              {/* Close Button - Top Right - Responsive placement */}
              <div className="absolute top-4 md:top-8 right-4 md:right-8 z-[100001]">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-3 md:p-5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 hover:scale-110 active:scale-95 shadow-2xl group"
                  aria-label="Close Lightbox"
                >
                  <X className="w-6 h-6 md:w-8 md:h-8 group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              {/* Main Content Area - Flex Column to separate Image and Caption */}
              <div className="flex-1 w-full flex flex-col items-center justify-between py-8 md:py-12 px-4 md:px-20 min-h-0">
                
                 {/* Image Container - Grows but is constrained by flex */}
                 <div className="relative w-full flex-1 flex items-center justify-center min-h-0 group/gallery pt-12 md:pt-0">
                    {/* Navigation buttons - Responsive visibility and sizing */}
                    <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex((prev) => (prev - 1 + GWD_IMAGES.length) % GWD_IMAGES.length);
                      }}
                      className="absolute left-[-10px] md:left-0 w-16 md:w-20 h-full flex items-center justify-center text-white/30 md:text-white/10 hover:text-white transition-all z-50 hover:bg-white/5 opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100"
                    >
                      <ChevronLeft className="w-8 h-8 md:w-12 md:h-12" />
                    </button>

                    <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          setCurrentIndex((prev) => (prev + 1) % GWD_IMAGES.length);
                      }}
                      className="absolute right-[-10px] md:right-0 w-16 md:w-20 h-full flex items-center justify-center text-white/30 md:text-white/10 hover:text-white transition-all z-50 hover:bg-white/5 opacity-100 md:opacity-0 md:group-hover/gallery:opacity-100"
                    >
                      <ChevronRight className="w-8 h-8 md:w-12 md:h-12" />
                    </button>

                    <motion.div 
                      key={currentIndex}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className="relative w-full h-full"
                    >
                       <Image 
                         src={GWD_IMAGES[currentIndex].src}
                         alt={GWD_IMAGES[currentIndex].title}
                         fill
                         className="object-contain"
                         priority
                       />
                    </motion.div>
                 </div>

                 {/* Caption / Title Area - Responsive spacing and sizing */}
                 <motion.div 
                   key={`meta-${currentIndex}`}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   className="w-full max-w-5xl mt-4 md:mt-8 mb-4 md:mb-12"
                 >
                    <div className="bg-white/[0.03] backdrop-blur-xl p-5 md:p-8 rounded-2xl md:rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
                       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-4 md:mb-6">
                          <div>
                             <span className="text-blue-400 font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold block mb-1 md:mb-2 text-left">Scientific Analysis Brief</span>
                             <h3 className="text-white font-serif text-xl md:text-5xl italic tracking-tight leading-snug md:leading-none text-left">
                                {GWD_IMAGES[currentIndex].title}
                             </h3>
                          </div>
                          <div className="text-left md:text-right flex items-center md:block border-t border-white/5 md:border-0 pt-3 md:pt-0">
                             <span className="text-white/20 font-mono text-[8px] uppercase tracking-[0.2em] block md:mb-1 mr-3 md:mr-0 shrink-0">Asset Info</span>
                             <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest shrink-0">Asset {currentIndex + 1}/{GWD_IMAGES.length} • CCGWD</span>
                          </div>
                       </div>
                       
                       <div className="overflow-y-auto max-h-[120px] md:max-h-none pr-2 scrollbar-hide">
                          <p className="text-stellar-grey text-sm md:text-xl font-light leading-relaxed border-t border-white/5 md:border-t-0 pt-4 md:pt-6 md:pt-0 text-left">
                             {GWD_IMAGES[currentIndex].caption}
                          </p>
                       </div>
                    </div>

                    {/* Thumbnail Strip - Optimized spacing */}
                    <div className="flex justify-center space-x-2 md:space-x-3 mt-6 md:mt-8">
                        {GWD_IMAGES.map((_, i) => (
                            <button 
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`h-1 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-400 w-10 md:w-16' : 'bg-white/10 hover:bg-white/30 w-4 md:w-8'}`}
                                aria-label={`Go to image ${i + 1}`}
                            />
                        ))}
                    </div>
                 </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
