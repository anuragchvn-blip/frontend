"use client";

import { motion } from "framer-motion";
import { ButtonBlue } from "@/components/ui/button-blue";
import { ButtonGrain } from "@/components/ui/button-grain";
import { FloatingPlanets } from "@/components/ui/floating-planets";
import { GrainOverlay } from "@/components/ui/grain-overlay";
import { HeroBackground } from "@/components/ui/hero-background";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section className="relative z-10 flex min-h-screen flex-col items-center justify-center overflow-hidden rounded-b-[2.5rem] bg-cream px-6 text-center text-black">
      <HeroBackground />
      <GrainOverlay />
      <FloatingPlanets />

      <div className="relative z-10 flex flex-col items-center">
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="font-display text-3xl font-bold leading-[1.05] tracking-[-0.02em] text-black sm:text-5xl md:text-6xl"
        >
          A Better Way To <br /> Navigate In Space.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.25 }}
          className="mt-6 max-w-xl text-base leading-7 text-black/70 sm:text-lg"
        >
          Cryptik develops onboard systems for orbit determination, perception, and state estimation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.42 }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
        >
          <ButtonBlue href="#cta">explore cryptik</ButtonBlue>
          <ButtonGrain href="#features" containerClassName="p-1" className="px-5 py-2">
            read the brief
          </ButtonGrain>
        </motion.div>
      </div>
    </section>
  );
}
