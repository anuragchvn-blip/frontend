"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NoiseBackground } from "@/components/ui/noise-background";

const EASE = [0.22, 1, 0.36, 1] as const;

const FEATURES = [
  {
    title: "Orbit determination",
    desc: "Estimate the full orbital state — position and velocity — directly from onboard sensor data, with no ground station in the loop.",
  },
  {
    title: "Drift correction",
    desc: "Continuously bound the error that accumulates in the inertial solution during GNSS dropouts, keeping the estimate honest.",
  },
  {
    title: "Navigation through eclipse",
    desc: "Fuse optical and thermal imagery to hold a fix through eclipse, when sun sensors and visible cameras lose the target.",
  },
  {
    title: "Richer state sharing",
    desc: "Share position, velocity, and calibrated uncertainty between spacecraft, instead of stale, static orbital elements.",
  },
];

function FeatureCard({
  f,
  i,
}: {
  f: (typeof FEATURES)[number];
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 38 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.12 }}
      className="group relative h-full"
    >
      <NoiseBackground
        containerClassName="w-full h-full p-1 rounded-2xl flex flex-col"
        className="flex flex-1 flex-col h-full"
        gradientColors={["rgba(43,91,224,1)", "rgba(74,122,240,1)", "rgba(43,91,224,1)"]}
        noiseIntensity={0.15}
        speed={0.15}
      >
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-xl border border-white/60 bg-[#FDFCFB] p-6 shadow-[0_16px_38px_rgba(0,0,0,0.07)] md:p-7">
          <h3 className="relative font-display text-lg font-bold leading-tight tracking-[-0.02em] text-black sm:text-xl md:text-[1.55rem]">
            {f.title}
          </h3>
          <p className="relative mt-2 text-sm leading-relaxed text-black/60">
            {f.desc}
          </p>
        </div>
      </NoiseBackground>
    </motion.div>
  );
}

export function Features() {
  return (
    <section id="features" className="relative z-30 -mt-[100vh] h-[200vh] text-black">
      <div className="sticky top-0 flex min-h-screen w-full flex-col items-center justify-start overflow-hidden px-6 pt-24 pb-12" style={{ background: "#EDEADF" }}>
        <div className="grain-overlay pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center">
        {/* logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.82, y: 36 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-8 md:mb-12"
        >
          <Image
            src="/logos/cryptik-logo-light.svg"
            alt="cryptik"
            width={600}
            height={480}
            className="h-auto w-28 sm:w-32 md:w-40"
          />
        </motion.div>

        {/* subtitle */}
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
          className="mb-10 text-xs font-medium uppercase tracking-[0.25em] text-black/40"
        >
          onboard capabilities
        </motion.span>

        <div className="grid w-full grid-cols-1 gap-5 pb-16 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
