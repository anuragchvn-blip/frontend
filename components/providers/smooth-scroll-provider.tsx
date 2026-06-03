"use client"

import * as React from "react"
import Lenis from "lenis"

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  React.useEffect(() => {
    const lenis = new Lenis({
      duration: 3.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7, // More weighted feel to counteract jitter
      touchMultiplier: 0, // Disable smooth scroll on touch for better mobile performance
    })

    // Handle internal anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        // Prevent crash on empty or invalid hash selectors
        if (anchor.hash === '#') return
        
        try {
          const targetElement = document.querySelector(anchor.hash) as HTMLElement
          if (targetElement) {
            e.preventDefault()
            lenis.scrollTo(targetElement)
          }
        } catch (err) {
          console.error('Invalid selector:', anchor.hash)
        }
      }
    }

    document.addEventListener('click', handleAnchorClick)

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}
