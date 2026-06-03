"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// same turbulence grain used by the .grain-overlay component, applied to the text
const GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E")`;

const MESSAGES = [
  { text: "Miniaturized IMUs track rapid acceleration but drift without correction", side: "left", top: "15%", range: [0.1, 0.2] },
  { text: "Space-grade GNSS receivers lock onto multiple constellations in LEO", side: "right", top: "28%", range: [0.3, 0.4] },
  { text: "Star trackers use onboard catalogs to determine absolute attitude", side: "left", top: "42%", range: [0.5, 0.6] },
  { text: "Thermal sensors hold navigational locks even through deep eclipses", side: "right", top: "55%", range: [0.7, 0.8] },
];

function MessageBubble({ msg, progress }: { msg: any; progress: MotionValue<number> }) {
  // Add explicit clamping so they NEVER extrapolate or fade away once they appear
  const opacity = useTransform(progress, [msg.range[0] - 0.05, msg.range[0]], [0, 1], { clamp: true });
  const scale = useTransform(progress, [msg.range[0] - 0.05, msg.range[0]], [0.8, 1], { clamp: true });
  const y = useTransform(progress, [msg.range[0] - 0.05, msg.range[0]], [20, 0], { clamp: true });

  const positionClass = msg.side === "left" ? "left-[5%] md:left-[15%]" : "right-[5%] md:right-[15%]";
  const bubbleRadius = msg.side === "left" ? "rounded-2xl rounded-bl-sm" : "rounded-2xl rounded-br-sm";

  return (
    <motion.div
      style={{ top: msg.top, opacity, scale, y }}
      className={`absolute ${positionClass} z-20 max-w-[160px] md:max-w-[220px]`}
    >
      <div className={`btn-blue ${bubbleRadius} px-4 py-3 text-sm md:text-base font-medium shadow-xl leading-tight`}>
        {msg.text}
      </div>
    </motion.div>
  );
}

export function CubeSat() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section ref={ref} id="cubesat" className="relative z-40 -mt-[100vh] h-[400vh] text-black">
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-clip px-6 py-12 shadow-[0_-30px_60px_rgba(0,0,0,0.08)]" style={{ background: "#EDEADF" }}>
        <div className="grain-overlay pointer-events-none absolute inset-0" />

        {MESSAGES.map((msg, i) => (
          <MessageBubble key={i} msg={msg} progress={scrollYProgress} />
        ))}

        <div className="relative flex w-full flex-col items-center">
          {/* 1U cubesat structure */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 60 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
            className="relative z-10 flex w-full justify-center"
          >
            <Image
              src="/cubesat-structure.png"
              alt="1U CubeSat structure"
              width={1000}
              height={969}
              priority
              className="h-auto w-[46%] max-w-[440px] drop-shadow-[0_34px_55px_rgba(0,0,0,0.25)]"
            />
          </motion.div>

          {/* faded, grainy vintage word — tucked just below the image */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 0.4, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            aria-label="CubeSat"
            className="pointer-events-none relative z-0 -mt-[3px] select-none whitespace-nowrap font-display font-bold uppercase leading-none tracking-[-0.04em]"
            style={{
              fontSize: "clamp(2.25rem, 11vw, 9rem)",
              color: "transparent",
              backgroundImage: `${GRAIN}, linear-gradient(#26262c, #26262c)`,
              backgroundBlendMode: "soft-light",
              backgroundSize: "150px 150px, 100% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            CubeSat
          </motion.h2>
        </div>
      </div>
    </section>
  );
}
