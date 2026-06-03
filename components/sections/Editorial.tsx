"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

type Chunk = { text: string; hl?: boolean };

// editorial copy, split into small chunks; `hl` marks the words highlighted blue
const PARAGRAPHS: Chunk[][] = [
  [
    { text: "Modern spacecraft carry" },
    { text: "GNSS receivers,", hl: true },
    { text: "IMUs,", hl: true },
    { text: "cameras, and" },
    { text: "onboard computers.", hl: true },
  ],
  [
    { text: "But navigation still" },
    { text: "relies heavily on" },
    { text: "ground-generated orbital data,", hl: true },
    { text: "intermittent GNSS fixes,", hl: true },
    { text: "and sensors that" },
    { text: "degrade over time.", hl: true },
  ],
  [
    { text: "When GNSS drops out," },
    { text: "IMUs drift.", hl: true },
  ],
  [
    { text: "When eclipse begins," },
    { text: "optical systems", hl: true },
    { text: "lose visibility.", hl: true },
  ],
  [
    { text: "Reliable onboard navigation" },
    { text: "remains an" },
    { text: "unsolved problem.", hl: true },
  ],
];

const TOTAL = PARAGRAPHS.reduce((n, p) => n + p.length, 0);

// highlight sweeps across the copy, then holds fully visible to the end
const REVEAL_START = 0.24;
const REVEAL_END = 0.8;

const DULL = "rgba(11, 11, 15, 0.25)"; // gray — not yet highlighted
const DARK = "rgba(11, 11, 15, 1)"; // highlighted (normal word)
const BLUE = "rgba(43, 91, 224, 1)"; // highlighted (key word)

function Word({
  chunk,
  index,
  progress,
}: {
  chunk: Chunk;
  index: number;
  progress: MotionValue<number>;
}) {
  const span = REVEAL_END - REVEAL_START;
  const step = span / TOTAL;
  const start = REVEAL_START + index * step;
  const end = start + step * 1.3;

  // color interpolates from gray to final shade and CLAMPS — stays highlighted
  const color = useTransform(
    progress,
    [start, end],
    [DULL, chunk.hl ? BLUE : DARK],
  );

  return (
    <motion.span
      style={{ color }}
      className={`mr-[0.28em] inline-block ${chunk.hl ? "font-semibold" : ""}`}
    >
      {chunk.text}
    </motion.span>
  );
}

export function Editorial() {
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // cream sheet rises from the bottom to cover the previous section, so the
  // headline holds and is covered rather than visibly scrolling away
  const sheetY = useTransform(scrollYProgress, [0, 0.18], ["100%", "0%"]);

  let idx = -1;

  return (
    // pulled up a full viewport to overlap the previous section's exit; extra
    // height keeps the sheet pinned + visible all the way to the page bottom
    <section ref={ref} className="relative z-20 -mt-[100vh] h-[300vh] text-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div style={{ y: sheetY }} className="absolute inset-0 bg-cream">
          <div className="grain-overlay pointer-events-none absolute inset-0" />

          <div className="relative flex h-full items-center justify-center px-6">
            <div className="w-full max-w-3xl text-left font-sans text-xl font-medium leading-[1.4] tracking-[-0.01em] sm:text-2xl md:text-[1.7rem]">
              {PARAGRAPHS.map((para, pi) => (
                <p key={pi} className="mb-6 last:mb-0">
                  {para.map((chunk) => {
                    idx += 1;
                    return (
                      <Word
                        key={idx}
                        chunk={chunk}
                        index={idx}
                        progress={scrollYProgress}
                      />
                    );
                  })}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
