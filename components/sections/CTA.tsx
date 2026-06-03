"use client";

import { motion } from "framer-motion";
import { ButtonBlue } from "@/components/ui/button-blue";

export function CTA() {
  return (
    <div className="relative z-50 bg-[#EDEADF]">
      <section id="cta" className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded-t-[1.5rem] bg-black px-6 py-16 md:rounded-t-[2rem] md:px-6 md:py-20">
        {/* Dynamic Background Image */}
        <div
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/28/d6/76/28d6761dcadd0483b1aa0d158b6fccd8.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Grain Overlay */}
        <div className="grain-overlay pointer-events-none absolute inset-0 z-[2] opacity-50" />

        <div className="relative z-20 flex max-w-3xl flex-col items-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 max-w-2xl font-display text-2xl font-bold tracking-tight text-cream md:mb-8 md:text-5xl"
          >
            Ready to redefine orbital operations?
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <ButtonBlue
              href="https://calendly.com/anurag-cryptik/30min"
              withArrow
              className="px-8 py-3.5 text-base"
            >
              Schedule a call
            </ButtonBlue>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-6 text-center text-xs font-semibold uppercase tracking-widest text-cream/40"
          >
            Speak directly to founders.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
