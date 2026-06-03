import * as React from "react";
import { cn } from "@/lib/utils";
import { FlipText } from "@/components/ui/flip-text";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { NoiseBackground } from "@/components/ui/noise-background";

// on-brand grain gradient — cryptik blue / red / cream
const GRADIENT_COLORS = [
  "rgb(43, 91, 224)",
  "rgb(230, 57, 70)",
  "rgb(245, 236, 215)",
];

interface ButtonGrainProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  containerClassName?: string;
}

// Secondary CTA — a light pill framed by an animated noise/grain gradient ring.
export function ButtonGrain({
  children,
  href = "#",
  className,
  containerClassName,
}: ButtonGrainProps) {
  return (
    <NoiseBackground
      containerClassName={cn("w-fit rounded-2xl p-1.5", containerClassName)}
      gradientColors={GRADIENT_COLORS}
    >
      <a
        href={href}
        className={cn(
          "flip group flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-neutral-100 via-neutral-100 to-white px-6 py-3 text-sm font-semibold leading-none text-black shadow-[0px_2px_0px_0px_var(--color-neutral-50)_inset,0px_0.5px_1px_0px_var(--color-neutral-400)] transition-all duration-100 active:scale-95",
          className,
        )}
      >
        <FlipText>{children}</FlipText>
        <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </NoiseBackground>
  );
}
