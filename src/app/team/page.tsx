"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/Navbar"
import Image from "next/image"
import { useState } from "react"

interface TeamMember {
    name: string
    role: string
    description: string
    image: string
}

const teamMembers: TeamMember[] = [
    {
        name: "Anurag Chauhan",
        role: "Founder & Lead Engineer",
        description: "Designing and building orbital intelligence and space-safety software. Background in aerospace systems, satellite navigation, and real-time tracking algorithms with hands-on experience across mission-critical architectures.",
        image: "/team/anurag.png",
    },
    {
        name: "Amit Dey",
        role: "Co-Founder & CTO",
        description: "Leading core infrastructure and systems engineering. Focused on distributed systems, high-performance computing, and scalable backends for space-grade applications.",
        image: "/team/amit.png",
    },
    {
        name: "Tanisha Mangal",
        role: "Machine Learning Engineer",
        description: "PES University student working on machine learning model training and data pipelines. Contributes to applied ML workflows for space-domain data analysis and pattern recognition.",
        image: "/team/tanisha.png",
    },
]

function TeamCard({ member }: { member: TeamMember }) {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <motion.div
            className="relative overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
            onClick={() => setIsExpanded(!isExpanded)}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            {/* Image Container */}
            <div className="relative aspect-[4/5] w-full overflow-hidden">
                <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />

                {/* Dark overlay for better text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Glassmorphism Name Tag - Collapsed state (just name) */}
                <div
                    className={`absolute left-0 right-0 bottom-0 top-auto backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    style={{ background: "rgba(15, 15, 15, 0.7)" }}
                >
                    <div className="px-4 py-3">
                        <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                            {member.name}
                        </h3>
                    </div>
                </div>

                {/* Glassmorphism Expanded state (full card) */}
                <div
                    className={`absolute inset-0 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-end ${isExpanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                    style={{ background: "rgba(15, 15, 15, 0.88)" }}
                >
                    <div className="px-4 py-4">
                        {/* Name */}
                        <h3 className="text-lg md:text-xl font-medium text-white tracking-tight">
                            {member.name}
                        </h3>

                        {/* Role */}
                        <motion.p
                            className="text-[10px] md:text-xs font-mono uppercase tracking-widest text-cosmic-blue mt-2"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 8 }}
                            transition={{ duration: 0.3, delay: 0.05 }}
                        >
                            {member.role}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            className="text-sm text-white/70 leading-relaxed mt-3 font-sans"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isExpanded ? 1 : 0, y: isExpanded ? 0 : 10 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {member.description}
                        </motion.p>

                        {/* Decorative line */}
                        <motion.div
                            className="h-[1px] bg-white/20 mt-4"
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: isExpanded ? 1 : 0 }}
                            transition={{ duration: 0.4, delay: 0.15 }}
                            style={{ transformOrigin: "left" }}
                        />
                    </div>

                    {/* HUD Corner markers */}
                    <motion.div
                        className="absolute top-4 left-4 text-white/30 font-mono text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        +
                    </motion.div>
                    <motion.div
                        className="absolute top-4 right-4 text-white/30 font-mono text-xs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isExpanded ? 1 : 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        +
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default function TeamPage() {
    return (
        <main className="min-h-screen relative bg-space-black text-white selection:bg-white selection:text-space-black">
            <div className="atmospheric-bg" />
            <Navbar />

            {/* Hero Section with Group Photo */}
            <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Section Label */}
                    <motion.span
                        className="text-technical mb-4 md:mb-6 block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        THE CORE TEAM
                    </motion.span>

                    {/* Heading - Large and aligned */}
                    <motion.h1
                        className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 md:mb-8 leading-[1.05]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                    >
                        Building the future of <br className="hidden md:block" />
                        <span className="text-cosmic-blue">orbital intelligence</span>
                    </motion.h1>

                    {/* Subheading - aligned with heading */}
                    <motion.p
                        className="text-stellar-grey max-w-2xl text-base md:text-lg leading-relaxed mb-12 md:mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        A dedicated team of engineers, scientists, and visionaries committed to revolutionizing space situational awareness.
                    </motion.p>

                    {/* Group Photo - same max-width as text container */}
                    <motion.div
                        className="relative w-full overflow-hidden rounded-lg border border-white/10 shadow-2xl"
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative aspect-[16/10] md:aspect-[16/9]">
                            <Image
                                src="/team/group.png?v=2024"
                                alt="Cryptik Team"
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-space-black/40 via-transparent to-transparent pointer-events-none" />

                        {/* HUD corners */}
                        <div className="absolute top-3 left-3 text-white/30 font-mono text-xs">+</div>
                        <div className="absolute top-3 right-3 text-white/30 font-mono text-xs">+</div>
                        <div className="absolute bottom-3 left-3 text-white/30 font-mono text-xs">+</div>
                        <div className="absolute bottom-3 right-3 text-white/30 font-mono text-xs">+</div>
                    </motion.div>
                </div>
            </section>

            {/* Team Members Grid */}
            <section className="py-16 md:py-28 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Section Label */}
                    <motion.div
                        className="mb-12 md:mb-16 text-center md:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-technical mb-3 md:mb-4 block">PERSONNEL</span>
                        <h2 className="text-2xl md:text-4xl font-medium tracking-tight text-white">
                            Meet the team
                        </h2>
                    </motion.div>

                    {/* Team Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.15,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                            >
                                <TeamCard member={member} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="py-16 md:py-32 px-4 border-t border-white/5">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        className="text-2xl md:text-5xl font-medium tracking-tighter mb-4 md:mb-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Want to join our mission?
                    </motion.h2>
                    <motion.p
                        className="text-stellar-grey text-sm md:text-lg mb-8 md:mb-10 max-w-lg mx-auto px-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        We're always looking for exceptional talent to help us push the boundaries of space technology.
                    </motion.p>
                    <motion.a
                        href="mailto:anuragchvn1@gmail.com"
                        className="btn-pill btn-primary inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-sm md:text-base"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Get in Touch
                    </motion.a>
                </div>
            </section>
        </main>
    )
}
