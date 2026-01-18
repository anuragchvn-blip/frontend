import { motion } from "framer-motion"

export default function HeroVideo() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
      >
        <source src="/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Cinematic Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-space-black via-space-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-space-black/80 via-transparent to-transparent" />
    </div>
  )
}
