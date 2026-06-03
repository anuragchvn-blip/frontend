"use client";

import * as React from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// the line, split into 2-3 word chunks; each chunk reveals on scroll
// grouped into 2 lines; each inner item is a 2-3 word chunk that reveals
const LINES = [
  ["Satellites still", "struggle"],
  ["to navigate", "independently."],
];
const TOTAL_CHUNKS = LINES.reduce((n, line) => n + line.length, 0);

const REVEAL_START = 0.06;
const REVEAL_END = 0.62;

function Chunk({
  children,
  index,
  total,
  progress,
}: {
  children: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const span = REVEAL_END - REVEAL_START;
  const step = span / total;
  const start = REVEAL_START + index * step;
  const end = start + step;

  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  const y = useTransform(progress, [start, end], [16, 0]);

  return (
    <motion.span style={{ opacity, y }} className="mr-[0.3em] inline-block">
      {children}
    </motion.span>
  );
}

// planets that keep entering from alternating sides as you scroll
const SCROLL_PLANETS: {
  src: string;
  pos: string;
  size: string;
  range: [number, number];
  fromX: number;
  py: number;
}[] = [
  {
    src: "/images/585f94d0cb11b227491c3587.png",
    pos: "left-[6%] top-[14%]",
    size: "w-28 md:w-48",
    range: [0.0, 0.34],
    fromX: -300,
    py: 24,
  },
  {
    src: "/images/585f9640cb11b227491c358a.png",
    pos: "right-[5%] top-[32%]",
    size: "w-36 md:w-64",
    range: [0.1, 0.45],
    fromX: 340,
    py: 30,
  },
  {
    src: "/images/585f967bcb11b227491c3591.png",
    pos: "left-[10%] bottom-[20%]",
    size: "w-24 md:w-40",
    range: [0.22, 0.55],
    fromX: -260,
    py: 18,
  },
  {
    src: "/images/58bf1fa0e443f41d77c734c2.png",
    pos: "right-[8%] bottom-[10%]",
    size: "w-32 md:w-56",
    range: [0.34, 0.62],
    fromX: 320,
    py: 26,
  },
];

function ScrollPlanet({
  planet,
  progress,
}: {
  planet: (typeof SCROLL_PLANETS)[number];
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, planet.range, [planet.fromX, 0]);
  const opacity = useTransform(
    progress,
    [planet.range[0], planet.range[0] + 0.12],
    [0, 1],
  );
  // subtle continuous parallax drift across the whole scroll
  const y = useTransform(progress, [0, 1], [planet.py, -planet.py]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ x, y, opacity }}
      className={`pointer-events-none absolute ${planet.pos} ${planet.size}`}
    >
      <Image
        src={planet.src}
        alt=""
        width={384}
        height={384}
        className="h-auto w-full select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
      />
    </motion.div>
  );
}

export function ScrollReveal() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // parallax on the grain texture
  const grainPos = useTransform(scrollYProgress, [0, 1], ["0px", "160px"]);

  return (
    <section ref={ref} className="relative -mt-[14vh] h-[280vh] bg-cream text-black">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        {/* noisy grain background with parallax */}
        <motion.div
          aria-hidden="true"
          className="grain-overlay pointer-events-none absolute inset-0"
          style={{ backgroundPositionY: grainPos }}
        />

        {/* planets keep coming in from the sides */}
        {SCROLL_PLANETS.map((p) => (
          <ScrollPlanet key={p.src} planet={p} progress={scrollYProgress} />
        ))}

        {/* scroll-revealed line, locked to 2 lines */}
        <div className="relative z-10 max-w-5xl text-center font-display text-3xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl md:text-6xl">
          {(() => {
            let idx = -1;
            return LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((chunk) => {
                  idx += 1;
                  const i = idx;
                  return (
                    <Chunk
                      key={i}
                      index={i}
                      total={TOTAL_CHUNKS}
                      progress={scrollYProgress}
                    >
                      {chunk}
                    </Chunk>
                  );
                })}
              </span>
            ));
          })()}
        </div>
      </div>
    </section>
  );
}
