import { cn } from "@/lib/utils";

// Subtle film-grain texture. Drop into any `relative` container; sits above the
// background fill, below content. See `.grain-overlay` in globals.css.
export function GrainOverlay({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("grain-overlay pointer-events-none absolute inset-0 z-0", className)}
    />
  );
}
