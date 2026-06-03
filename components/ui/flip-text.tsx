import * as React from "react";

// Hover text roll — two stacked copies inside a clipped mask. The inner column
// slides up one line when an ancestor with the `flip` class is hovered.
// Pair with `className="flip"` (or `group`-style) on the parent button/link.
export function FlipText({ children }: { children: React.ReactNode }) {
  return (
    <span className="flip__mask">
      <span className="flip__inner">
        <span className="flip__line">{children}</span>
        <span className="flip__line" aria-hidden="true">
          {children}
        </span>
      </span>
    </span>
  );
}
