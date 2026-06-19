"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoiseBackground } from "@/components/ui/noise-background";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { FlipText } from "@/components/ui/flip-text";
import { ArrowIcon } from "@/components/ui/arrow-icon";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function CareersClient() {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    role: "system-engineer",
    coolestThing: "",
    workLink: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [formError, setFormError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          role: formData.role,
          coolestThing: formData.coolestThing,
          workLink: formData.workLink,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        setIsSubmitting(false);
        setFormError(result.message || "Submission failed. Please verify your environment configurations.");
      }
    } catch (err) {
      setIsSubmitting(false);
      setFormError("Network error. Please check your internet link and try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      role: "system-engineer",
      coolestThing: "",
      workLink: "",
    });
    setFormError(null);
    setIsSubmitted(false);
  };

  return (
    <>
      <Header />
      <main className="relative min-h-screen w-full bg-cream pt-32 pb-24 px-4 sm:px-6 flex flex-col items-center overflow-hidden">
        <GrainOverlay />
        
        {/* Ambient atmospheric glows */}
        <div className="absolute top-[15%] left-[-15%] w-[60vw] h-[60vw] rounded-full bg-blue/5 blur-[130px] pointer-events-none" />
        <div className="absolute bottom-[25%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-red/5 blur-[130px] pointer-events-none" />

        <div className="w-full max-w-4xl z-10">
          
          {/* Header & Intro Section */}
          <div className="text-center mb-16 sm:mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-black/40"
            >
              Careers at Cryptik
            </motion.span>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-black mb-6 leading-tight"
            >
              Build the future of <br className="hidden sm:inline" /> satellite navigation.
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="max-w-2xl mx-auto text-base text-black/70 leading-relaxed"
            >
              We are assembling a tight, highly focused team to solve precision orbit determination and payload state estimation. We value raw curiosity, engineering speed, and robust builds.
            </motion.p>
          </div>

          {/* Villa and Team Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            {/* Card 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE }}
              className="group relative h-full"
            >
              <NoiseBackground
                containerClassName="w-full h-full p-1 rounded-2xl flex flex-col"
                className="flex flex-1 flex-col h-full"
                gradientColors={["rgba(43,91,224,0.15)", "rgba(74,122,240,0.15)", "rgba(43,91,224,0.1)"]}
                noiseIntensity={0.15}
                speed={0.15}
              >
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/60 bg-[#FDFCFB] p-6 shadow-[0_16px_38px_rgba(0,0,0,0.07)] md:p-8">
                  <h3 className="font-display text-lg font-bold leading-tight tracking-[-0.02em] text-black sm:text-xl">
                    The Villa Workspace
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/60">
                    We ditched generic corporate offices for a beautiful, sunlit villa base. It is designed for deep creative focus, equipped with testing labs, backyard brainstorm decks, and unlimited redbull and coffee. A workspace built for builders.
                  </p>
                </div>
              </NoiseBackground>
            </motion.div>

            {/* Card 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.12 }}
              className="group relative h-full"
            >
              <NoiseBackground
                containerClassName="w-full h-full p-1 rounded-2xl flex flex-col"
                className="flex flex-1 flex-col h-full"
                gradientColors={["rgba(230,57,70,0.15)", "rgba(240,120,130,0.15)", "rgba(230,57,70,0.1)"]}
                noiseIntensity={0.15}
                speed={0.15}
              >
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/60 bg-[#FDFCFB] p-6 shadow-[0_16px_38px_rgba(0,0,0,0.07)] md:p-8">
                  <h3 className="font-display text-lg font-bold leading-tight tracking-[-0.02em] text-black sm:text-xl">
                    Our Culture Brief
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-black/60">
                    No status slides, no overhead processes. We are a lean group of speed-driven engineers who build to deploy. High trust, complete autonomy, and a shared focus on delivering millimeter-level precision on orbits.
                  </p>
                </div>
              </NoiseBackground>
            </motion.div>

          </div>

          {/* Villa Gallery & Installation Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-16 sm:mb-20 bg-white/40 border border-black/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 border-b border-black/5 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">HQ SETUP STATUS</span>
                <h3 className="font-display text-xl font-bold text-black mt-1">Villa Installation Phase</h3>
              </div>
              
              {/* Premium Status Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-black/10 bg-[#FDFCFB] text-black text-xs font-semibold uppercase tracking-wider shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
                <span>Lock-In: July 15th</span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-black/60 mb-8 max-w-2xl">
              We are currently in the final integration phase of our villa headquarters. By <span className="font-semibold text-black">July 15th</span>, we lock in all system installations: hardware testing benches, custom sensor validation platforms, complete CubeSat and satellite structures, logic analyzers, and developer workstations. Work starts immediately after.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/60 bg-cream/35 shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-md transition-all duration-300">
                  <img 
                    src={`/villa/villa-${num}.jpg`} 
                    alt={`Cryptik Villa Room ${num}`} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-100 group-hover:opacity-0 transition-opacity pointer-events-none" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Orbits / Roles Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="font-display text-2xl font-bold text-black">Choose Your Orbit</h2>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mt-1 block">open positions</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* System Engineer (Spacecraft & CubeSats) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="group relative h-full"
              >
                <NoiseBackground
                  containerClassName="w-full h-full p-1 rounded-2xl flex flex-col"
                  className="flex flex-1 flex-col h-full"
                  gradientColors={["rgba(230,57,70,0.15)", "rgba(240,120,130,0.15)", "rgba(230,57,70,0.1)"]}
                  noiseIntensity={0.12}
                  speed={0.1}
                >
                  <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/60 bg-[#FDFCFB] p-6 shadow-[0_16px_38px_rgba(0,0,0,0.07)] md:p-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-display text-lg font-bold text-black">
                        System Engineer
                      </h3>
                      
                      {/* Premium Badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-black/5 bg-white/50 text-[10px] font-bold text-black/60 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-red" />
                        Spacecraft & CubeSats
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-black/60 mb-6">
                      For engineers focused on physical satellite structures and full mechanical integration. You will design, build, and test complete CubeSat chassis, structural frames, and power systems.
                    </p>
                    
                    <ul className="space-y-3 mt-auto text-sm text-black/70">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red mt-2 shrink-0" />
                        <span>Solder, wire, and integrate satellite subsystems, solar cells, and physical components.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red mt-2 shrink-0" />
                        <span>Design CubeSat mechanical CAD structural assemblies, thermal shielding, and electrical power buses (EPS).</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red mt-2 shrink-0" />
                        <span>Execute physical vibration, thermal-vacuum chamber (TVAC), and flight-readiness test sequences.</span>
                      </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-black/5 text-xs text-black/40 italic">
                      * Experience is relative. We look for builders with strong electronics and mechanical foundations who love physical prototyping.
                    </div>
                  </div>
                </NoiseBackground>
              </motion.div>

              {/* Hardware Researcher (Satellite Hardware) */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="group relative h-full"
              >
                <NoiseBackground
                  containerClassName="w-full h-full p-1 rounded-2xl flex flex-col"
                  className="flex flex-1 flex-col h-full"
                  gradientColors={["rgba(43,91,224,0.15)", "rgba(74,122,240,0.15)", "rgba(43,91,224,0.1)"]}
                  noiseIntensity={0.12}
                  speed={0.1}
                >
                  <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/60 bg-[#FDFCFB] p-6 shadow-[0_16px_38px_rgba(0,0,0,0.07)] md:p-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-display text-lg font-bold text-black">
                        Hardware Researcher
                      </h3>
                      
                      {/* Premium Badge */}
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-black/5 bg-white/50 text-[10px] font-bold text-black/60 uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue" />
                        Satellite Hardware
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-black/60 mb-6">
                      For builders focused on custom circuit design and physical prototyping. You will research, design, and debug custom board layouts and high-speed sensor interfaces.
                    </p>
                    
                    <ul className="space-y-3 mt-auto text-sm text-black/70">
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                        <span>Solder, assemble, and hardware-debug custom boards and electrical systems.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                        <span>Integrate high-precision timing references and synchronize multi-sensor signals.</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 shrink-0" />
                        <span>Design custom test enclosures and calibration setups to validate sensor telemetry.</span>
                      </li>
                    </ul>

                    <div className="mt-8 pt-6 border-t border-black/5 text-xs text-black/40 italic">
                      * If you enjoy hands-on prototyping, board debugging, and precision hardware integration, apply here.
                    </div>
                  </div>
                </NoiseBackground>
              </motion.div>

            </div>
          </div>

          {/* Form Container */}
          <div id="apply" className="w-full max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="font-display text-2xl font-bold text-black">Application Terminal</h2>
              <p className="text-xs text-black/40 font-semibold uppercase tracking-wider mt-1">Submit your details below</p>
            </div>
            
            <div className="w-full bg-[#FDFCFB]/85 border border-black/5 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden backdrop-blur-md">
              <AnimatePresence mode="wait">
                {!isSubmitting && !isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Error display */}
                    {formError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs font-semibold text-red bg-red/5 border border-red/25 px-4 py-3 rounded-xl"
                      >
                        {formError}
                      </motion.div>
                    )}

                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Orion Miller"
                        className="w-full bg-white/70 border border-black/10 rounded-xl px-4 py-3 text-sm text-black placeholder-black/35 outline-none transition-all focus:border-blue focus:bg-white focus:ring-1 focus:ring-blue"
                      />
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="orion@cryptik.space"
                        className="w-full bg-white/70 border border-black/10 rounded-xl px-4 py-3 text-sm text-black placeholder-black/35 outline-none transition-all focus:border-blue focus:bg-white focus:ring-1 focus:ring-blue"
                      />
                    </div>

                    {/* Role selector */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                        Target Role
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, role: "system-engineer" })}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            formData.role === "system-engineer"
                              ? "bg-white border-red text-red font-semibold shadow-[0_2px_12px_rgba(230,57,70,0.08)]"
                              : "bg-white/55 border-black/10 text-black/60 hover:bg-white hover:text-black"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${formData.role === "system-engineer" ? "bg-red animate-pulse" : "bg-black/20"}`} />
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-black/40">Spacecraft</span>
                          </div>
                          <div className="text-[13px] tracking-wide font-medium">System Engineer</div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, role: "hardware-researcher" })}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            formData.role === "hardware-researcher"
                              ? "bg-white border-blue text-blue font-semibold shadow-[0_2px_12px_rgba(43,91,224,0.08)]"
                              : "bg-white/55 border-black/10 text-black/60 hover:bg-white hover:text-black"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${formData.role === "hardware-researcher" ? "bg-blue animate-pulse" : "bg-black/20"}`} />
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-black/40">Research</span>
                          </div>
                          <div className="text-[13px] tracking-wide font-medium">Hardware Researcher</div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, role: "other" })}
                          className={`text-left p-4 rounded-xl border transition-all ${
                            formData.role === "other"
                              ? "bg-white border-black text-black font-semibold shadow-[0_2px_12px_rgba(0,0,0,0.08)]"
                              : "bg-white/55 border-black/10 text-black/60 hover:bg-white hover:text-black"
                          }`}
                        >
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${formData.role === "other" ? "bg-black" : "bg-black/20"}`} />
                            <span className="text-[9px] font-semibold uppercase tracking-wider text-black/40">General</span>
                          </div>
                          <div className="text-[13px] tracking-wide font-medium">Other Build</div>
                        </button>

                      </div>
                    </div>

                    {/* Coolest thing built */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="coolestThing" className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                        Tell us about the coolest thing you've built or researched
                      </label>
                      <textarea
                        id="coolestThing"
                        name="coolestThing"
                        rows={4}
                        value={formData.coolestThing}
                        onChange={(e) => setFormData({ ...formData, coolestThing: e.target.value })}
                        placeholder="I designed custom circuit boards, debugged sensor communications, or constructed custom chassis brackets..."
                        className="w-full bg-white/70 border border-black/10 rounded-xl px-4 py-3 text-sm text-black placeholder-black/35 outline-none transition-all focus:border-blue focus:bg-white focus:ring-1 focus:ring-blue resize-y"
                      />
                    </div>

                    {/* Work links */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="workLink" className="text-xs font-semibold text-black/50 uppercase tracking-wider">
                        Link to your work (GitHub, site, or resume)
                      </label>
                      <input
                        type="text"
                        id="workLink"
                        name="workLink"
                        value={formData.workLink}
                        onChange={(e) => setFormData({ ...formData, workLink: e.target.value })}
                        placeholder="github.com/username or your portfolio url"
                        className="w-full bg-white/70 border border-black/10 rounded-xl px-4 py-3 text-sm text-black placeholder-black/35 outline-none transition-all focus:border-blue focus:bg-white focus:ring-1 focus:ring-blue"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="btn-blue flip group w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-sm font-semibold transition-all duration-100 active:scale-[0.98] border border-blue/45 mt-2"
                    >
                      <FlipText>Submit Application</FlipText>
                      <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </button>
                  </motion.form>
                ) : isSubmitting ? (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="py-16 flex flex-col items-center justify-center text-center"
                  >
                    <div className="relative w-16 h-16 mb-6">
                      <motion.div 
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                        className="absolute inset-0 rounded-full border-2 border-blue/30 border-t-blue"
                      />
                    </div>
                    
                    <h4 className="font-display font-semibold text-lg text-black mb-1">Submitting application</h4>
                    <p className="text-xs text-black/40 uppercase tracking-wider font-semibold">Transmitting coordinates to base...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="py-12 flex flex-col items-center text-center"
                  >
                    {/* Checkmark in blue/green circle */}
                    <div className="w-12 h-12 rounded-full bg-blue/10 flex items-center justify-center mb-6">
                      <svg className="w-6 h-6 text-blue" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>

                    <h3 className="font-display text-xl font-bold text-black mb-3">Application Transmitted</h3>
                    <p className="text-sm text-black/60 max-w-sm mb-8 leading-relaxed">
                      Thank you for applying. Your application telemetry has been successfully transmitted directly to <span className="font-bold text-black">anurag@cryptik.space</span>. We will review your build coordinates and reach out within 48 hours.
                    </p>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="text-xs text-black/40 hover:text-black font-semibold transition-colors uppercase tracking-wider border border-black/10 bg-white/40 hover:bg-white px-4 py-2 rounded-lg"
                    >
                      Reset Form
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
