"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Catalog", href: "/catalog" },
    { name: "Tools", href: "/tools" },
    // { name: "Intelligence", href: "/security" },
    // { name: "Systems", href: "/settings" },
    { name: "Team", href: "/team" },
    { name: "Whitepaper", href: "/resources/whitepaper" },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 py-6 px-4 sm:px-10 flex justify-between items-center bg-transparent backdrop-blur-sm sm:backdrop-blur-none transition-all duration-300">
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="relative w-8 h-8 group-hover:scale-110 transition-transform">
            <Image
              src="/team/ChatGPT Image Jan 22, 2026, 07_12_18 PM.png"
              alt="Cryptik Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-white">
            Cryptik
          </span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-12">
        <div className="flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-[10px] font-bold uppercase tracking-widest transition-all duration-300",
                pathname === item.href
                  ? "text-white"
                  : "text-stellar-grey hover:text-white"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Link
          href="/dashboard"
          className="btn-pill btn-secondary text-[10px] px-6 py-2 uppercase tracking-[0.15em] font-bold"
        >
          Access Beta
        </Link>
      </div>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white focus:outline-none"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-space-black flex flex-col items-center justify-center space-y-8 z-[-1]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl font-medium tracking-tight hover:text-stellar-grey transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/dashboard"
            className="btn-pill btn-primary px-8"
            onClick={() => setIsOpen(false)}
          >
            Launch app
          </Link>
        </div>
      )}
    </nav>
  )
}

