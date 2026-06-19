"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { FlipText } from "@/components/ui/flip-text";
import { ButtonBlue } from "@/components/ui/button-blue";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "company", href: "/#cta" },
  { label: "mission", href: "/#features" },
  { label: "careers", href: "/careers" },
  { label: "contact", href: "mailto:anurag@cryptik.space" },
];

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [isVisible, setIsVisible] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const lastScrollY = React.useRef(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 100) {
        setIsVisible(currentScrollY <= lastScrollY.current);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: isVisible ? 0 : -120, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
      className="fixed left-0 right-0 top-3 z-50 flex w-full justify-center px-3 md:top-4 md:px-4"
    >
      {/* glassmorphic capsule */}
      <div
        className="relative flex h-12 w-full max-w-5xl items-center justify-between overflow-hidden rounded-xl border px-4 md:h-13 md:px-5"
        style={{
          backgroundColor: "#EDEADF",
          borderColor: "rgba(0, 0, 0, 0.08)",
          boxShadow:
            "inset 0 1px 0px rgba(255,255,255,0.75), 0 0 9px rgba(0,0,0,0.05), 0 3px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* subtle inner highlight gradient overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-70" />

        {/* wordmark */}
        <a
          href="/"
          className="relative z-20 flex items-center"
        >
          <Image src="/logos/cryptik-logo-light.svg" alt="Cryptik Logo" width={160} height={150} className="h-9 w-auto" />
        </a>

        {/* right items */}
        <div className="relative z-20 flex items-center gap-3 md:gap-8">
          <nav className="hidden items-center gap-8 text-sm text-black/70 md:flex">
            {NAV_LINKS.map((link) => {
              const href = isHome && link.href.startsWith("/#") ? link.href.substring(1) : link.href;
              return (
                <a
                  key={link.label}
                  href={href}
                  className="flip font-medium transition-colors hover:text-black"
                >
                  <FlipText>{link.label}</FlipText>
                </a>
              );
            })}
          </nav>

          {/* primary blue CTA */}
          <ButtonBlue href="https://calendly.com/anurag-cryptik/30min" className="hidden px-5 py-2 md:inline-flex">
            get in touch
          </ButtonBlue>

          {/* mobile menu toggle */}
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-white/65 text-black backdrop-blur-md md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              className="h-4 w-4"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6l12 12M18 6L6 18"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 7h16M4 12h16M4 17h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-3 right-3 top-[56px] rounded-xl border border-white/55 bg-white/80 p-4 shadow-xl backdrop-blur-xl md:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const href = isHome && link.href.startsWith("/#") ? link.href.substring(1) : link.href;
              return (
                <a
                  key={link.label}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-black/80"
                >
                  {link.label}
                </a>
              );
            })}
            <a
              href="https://calendly.com/anurag-cryptik/30min"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 rounded-full bg-blue px-4 py-2.5 text-center text-sm font-semibold text-cream"
            >
              get in touch
            </a>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
