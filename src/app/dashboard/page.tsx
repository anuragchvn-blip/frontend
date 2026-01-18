"use client"

import Navbar from "@/components/Navbar"
import StarField from "@/components/StarField"
import Globe from "@/components/Globe"
import SatelliteTable from "@/components/SatelliteTable"
import AlertFeed from "@/components/AlertFeed"
import MetricsPanel from "@/components/MetricsPanel"
import ConjunctionPanel from "@/components/ConjunctionPanel"
import IntelligenceDashboard from "@/components/IntelligenceDashboard"
import { motion } from "framer-motion"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-space-black text-white selection:bg-white selection:text-space-black scroll-smooth">
      <StarField />
      <div className="atmospheric-bg" />
      <Navbar />

      <div className="pt-32 pb-10 px-4 sm:px-10 max-w-[1800px] mx-auto">
        {/* Header Stats */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <span className="text-technical tracking-[0.4em] mb-2 block">Orbital Operations Center</span>
              <h1 className="text-4xl font-medium text-cinematic uppercase tracking-tight">
                Live <span className="italic">Telemetry</span> Feed
              </h1>
            </div>
            <div className="flex items-center space-x-6 text-[10px] font-mono opacity-50 uppercase tracking-widest">
              <span>Station: NORTH_VALLEY_A</span>
              <span className="h-4 w-[1px] bg-white/20" />
              <div className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                <span>Uplink Active</span>
              </div>
            </div>
          </div>
          
          <MetricsPanel />
        </motion.div>

        {/* Intelligence Dashboard */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <IntelligenceDashboard />
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-10">
          {/* Main Visualization Area */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-12 xl:col-span-8 space-y-10"
          >
            {/* 3D Globe */}
            <div className="h-[700px] relative">
              <Globe />
            </div>

            {/* Catalog Table */}
            <div className="relative">
              <SatelliteTable />
            </div>
          </motion.div>

          {/* Side Panels */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-12 xl:col-span-4 space-y-10 flex flex-col"
          >
            {/* Conjunction Analysis */}
            <div className="h-[450px]">
              <ConjunctionPanel />
            </div>

            {/* Alert Feed */}
            <div className="flex-1 min-h-[500px]">
              <AlertFeed />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}

