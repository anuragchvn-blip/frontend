"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

// how much of a planet may leave the screen when dragged (the rest stays visible)
const MAX_OUT = 0.65;

// Decorative planets framing the hero. Corner-anchored with a strong size
// hierarchy and a warm/cool diagonal balance. Each slides in from its nearest
// side with its own speed + timing, then is draggable with momentum.
const PLANETS = [
  {
    src: "/planets/planet-3.png", // cool blue — top left, medium
    pos: "left-[5%] top-[15%]",
    size: "w-16 md:w-28 lg:w-32",
    from: -170,
    durationIn: 0.95,
    delayIn: 0.25,
  },
  {
    src: "/planets/planet-1.png", // warm red — top right, tiny accent
    pos: "right-[7%] top-[13%]",
    size: "w-11 md:w-14 lg:w-20",
    from: 150,
    durationIn: 0.7,
    delayIn: 0.6,
  },
  {
    src: "/planets/planet-4.png", // olive — bottom left, small
    pos: "left-[9%] bottom-[14%]",
    size: "w-14 md:w-20 lg:w-24",
    from: -150,
    durationIn: 1.15,
    delayIn: 0.45,
  },
  {
    src: "/planets/planet-2.png", // teal/orange — bottom right, big anchor
    pos: "right-[3%] bottom-[8%]",
    size: "w-28 md:w-48 lg:w-64",
    from: 230,
    durationIn: 1.5,
    delayIn: 0.9,
  },
];

type DragBounds = { left: number; right: number; top: number; bottom: number };

function Planet({ p }: { p: (typeof PLANETS)[number] }) {
  const outerRef = React.useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = React.useState<DragBounds | undefined>();

  React.useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    // offsetLeft/Top read the layout box, ignoring the entrance transform
    const compute = () => {
      const left = el.offsetLeft;
      const top = el.offsetTop;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      setBounds({
        left: -(left + MAX_OUT * w),
        right: vw - left - (1 - MAX_OUT) * w,
        top: -(top + MAX_OUT * h),
        bottom: vh - top - (1 - MAX_OUT) * h,
      });
    };

    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return (
    // outer: slide-in entrance (own transform, never touched by drag)
    <motion.div
      ref={outerRef}
      initial={{ opacity: 0, x: p.from }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: p.durationIn, ease: EASE, delay: p.delayIn }}
      className={`absolute ${p.pos} ${p.size}`}
    >
      {/* inner: draggable with momentum, kept partly on-screen */}
      <motion.div
        drag
        dragConstraints={bounds}
        dragElastic={0.1}
        dragMomentum
        dragTransition={{
          power: 0.2,
          timeConstant: 200,
          bounceStiffness: 320,
          bounceDamping: 26,
        }}
        whileHover={{ scale: 1.05 }}
        whileDrag={{ scale: 1.12, zIndex: 50 }}
        className="pointer-events-auto w-full cursor-grab touch-none active:cursor-grabbing"
      >
        <Image
          src={p.src}
          alt=""
          width={384}
          height={384}
          draggable={false}
          className="h-auto w-full select-none drop-shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
        />
      </motion.div>
    </motion.div>
  );
}

export function FloatingPlanets() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
      {PLANETS.map((p) => (
        <Planet key={p.src} p={p} />
      ))}
    </div>
  );
}
