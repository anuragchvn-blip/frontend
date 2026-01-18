"use client"

import dynamic from "next/dynamic"
import React, { useEffect, useState, useMemo } from "react"
import { useTracking } from "@/context/TrackingContext"

// Dynamically import Plot for client-side rendering
const Plot = dynamic(() => import("react-plotly.js"), { ssr: false })

interface GlobeProps {}

export default function Globe({}: GlobeProps) {
  const [isMounted, setIsMounted] = useState(false)
  const { satellites } = useTracking()

  // Memoize Earth surface generation
  const { earthX, earthY, earthZ, gridTrace } = useMemo(() => {
    const phi = Array.from({ length: 50 }, (_, i) => (i * Math.PI) / 25)
    const theta = Array.from({ length: 50 }, (_, i) => (i * 2 * Math.PI) / 50)
    
    const x: number[][] = []
    const y: number[][] = []
    const z: number[][] = []
    const r = 6371 // Earth radius in km

    for (let i = 0; i < phi.length; i++) {
        x[i] = []
        y[i] = []
        z[i] = []
        for (let j = 0; j < theta.length; j++) {
            x[i][j] = r * Math.sin(phi[i]) * Math.cos(theta[j])
            y[i][j] = r * Math.sin(phi[i]) * Math.sin(theta[j])
            z[i][j] = r * Math.cos(phi[i])
        }
    }

    // Create geodetic grid lines (simplified)
    const gridLines = []
    // Meridians
    for (let k = 0; k < 12; k++) {
        const theta_k = (k * Math.PI) / 6
        const mx = [], my = [], mz = []
        for (let l = 0; l <= 50; l++) {
            const phi_l = (l * Math.PI) / 50
            mx.push(r * 1.01 * Math.sin(phi_l) * Math.cos(theta_k))
            my.push(r * 1.01 * Math.sin(phi_l) * Math.sin(theta_k))
            mz.push(r * 1.01 * Math.cos(phi_l))
        }
        gridLines.push({
            type: "scatter3d",
            mode: "lines",
            x: mx, y: my, z: mz,
            line: { color: "rgba(255,255,255,0.05)", width: 1 },
            showlegend: false,
            hoverinfo: "none"
        })
    }
    
    return { earthX: x, earthY: y, earthZ: z, gridTrace: gridLines }
  }, [])

  // Memoize satellite traces to prevent re-creation on every render
  const satelliteTrace = useMemo(() => {
    // Split satellites by risk groups for color coding
    const nominal = satellites.filter(s => !s.risk || s.risk === "nominal")
    const warning = satellites.filter(s => s.risk === "warning" || s.risk === "critical")

    const traces = []

    // Nominal Satellites
    if (nominal.length > 0) {
        traces.push({
            type: "scatter3d",
            mode: "markers",
            x: nominal.map(s => s.x || 0),
            y: nominal.map(s => s.y || 0),
            z: nominal.map(s => s.z || 0),
            marker: {
                size: 3,
                color: "#00ff41", // Matrix Green for nominal
                symbol: "circle",
                opacity: 0.8
            },
            text: nominal.map(s => `${s.name} (NORAD: ${s.norad_id})`),
            hoverinfo: "text",
            showlegend: false
        })
    }

    // Warning/Critical Satellites
    if (warning.length > 0) {
        traces.push({
            type: "scatter3d",
            mode: "markers",
            x: warning.map(s => s.x || 0),
            y: warning.map(s => s.y || 0),
            z: warning.map(s => s.z || 0),
            marker: {
                size: 5,
                color: "#ff0000", // Alert Red
                symbol: "diamond",
                opacity: 1
            },
            text: warning.map(s => `WARNING: ${s.name}`),
            hoverinfo: "text",
            showlegend: false
        })
    }
    
    return traces
  }, [satellites])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return <div className="w-full h-full bg-space-black animate-pulse" />


  const data: any = [
    {
      type: "surface",
      x: earthX,
      y: earthY,
      z: earthZ,
      showscale: false,
      opacity: 0.9, // Higher opacity for "Real Space" feel
      colorscale: [
        [0, "#050510"],   // Deep ocean/space dark
        [0.2, "#0a0a20"], 
        [0.5, "#151530"], // Landmass approx color logic (very simplified here)
        [1, "#050510"]
      ],
      hoverinfo: "none",
      // Lighting effects for realism
      lighting: {
        ambient: 0.3,
        diffuse: 0.8,
        fresnel: 0.2,
        specular: 0.1,
        roughness: 0.9,
      },
      lightposition: {x: 10000, y: 10000, z: 0}
    },
    ...gridTrace,
    ...satelliteTrace
  ]

  return (
    <div className="w-full h-full min-h-[500px] border border-white/10 relative hud-corner group bg-black/40">
      <span className="hidden" />
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <span className="text-technical mb-1 block opacity-40">Spatial Matrix</span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-white">
          Real-time Visualization <span className="text-xs text-stellar-cyan ml-2 animate-pulse">● LIVE</span>
        </h3>
        <p className="text-[10px] text-white/30 font-mono mt-1">
          Tracking {satellites.length} objects
        </p>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-8 left-8 z-10 pointer-events-none flex flex-col gap-2">
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff41]"></span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Nominal</span>
         </div>
         <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff0000]"></span>
            <span className="text-[10px] text-white/50 uppercase tracking-widest">Critical</span>
         </div>
      </div>

      <Plot
        data={data}
        layout={{
          autosize: true,
          showlegend: false,
          margin: { l: 0, r: 0, b: 0, t: 0 },
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          scene: {
            xaxis: { visible: false, showgrid: false },
            yaxis: { visible: false, showgrid: false },
            zaxis: { visible: false, showgrid: false },
            aspectmode: "cube",
            camera: {
              eye: { x: 1.8, y: 1.8, z: 1.2 }
            },
            dragmode: "orbit"
          },
          hovermode: "closest"
        }}
        config={{
          responsive: true,
          displayModeBar: false,
          scrollZoom: true
        }}
        className="w-full h-full"
      />
    </div>
  )
}

