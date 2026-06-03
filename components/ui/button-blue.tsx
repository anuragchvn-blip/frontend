import * as React from "react";
import { cn } from "@/lib/utils";
import { FlipText } from "@/components/ui/flip-text";
import { ArrowIcon } from "@/components/ui/arrow-icon";

interface ButtonBlueProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  withArrow?: boolean;
}

// Primary CTA — solid cryptik blue with an inset 3d highlight (see `.btn-blue`
// in globals.css). Label rolls on hover via `.flip`.
export function ButtonBlue({
  children,
  href = "#",
  className,
  withArrow = false,
}: ButtonBlueProps) {
  return (
    <a
      href={href}
      className={cn(
        "btn-blue flip group inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium leading-none",
        className,
      )}
    >
      <FlipText>{children}</FlipText>
      {withArrow && (
        <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </a>
  );
}
