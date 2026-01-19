"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { useMemo } from "react"

// Dynamically import Plotly with no SSR to avoid window not found errors
const Plot = dynamic(() => import("react-plotly.js"), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center text-zinc-600 font-mono text-xs animate-pulse">
      INITIALIZING VISUAL CORE...
    </div>
  )
})

interface VisualContainerProps {
  type: string
}

export default function VisualContainer({ type }: VisualContainerProps) {
  
  // 3D Orbital Globe Config
  const orbitData = useMemo<any[]>(() => {
    // Generate some random satellite paths
    const paths = Array.from({ length: 8 }).map((_, i) => {
        const t = Array.from({ length: 100 }, (_, k) => k / 10);
        const x = t.map(val => Math.cos(val + i) * (5 + Math.sin(val/5)));
        const y = t.map(val => Math.sin(val + i) * (5 + Math.cos(val/5)));
        const z = t.map(val => Math.sin(val * 2 + i) * 3);
        
        return {
            type: 'scatter3d',
            mode: 'lines',
            x: x,
            y: y,
            z: z,
            line: { 
                width: 2, 
                color: i % 2 === 0 ? '#557099' : '#ffffff' // Cosmic Blue & White
            },
            showlegend: false,
            hoverinfo: 'none'
        };
    });

    // Central Earth-like Sphere
    const sphere: any = {
        type: 'mesh3d',
        x: [0], y: [0], z: [0], // Simplification, in reality would use a proper mesh
        alphahull: 0,
        opacity: 0.1,
        color: '#557099'
    };

    return [...paths]
  }, []);

  const orbitLayout: any = {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    margin: { t: 0, b: 0, l: 0, r: 0 },
    scene: {
        xaxis: { showgrid: false, zeroline: false, showticklabels: false, visible: false },
        yaxis: { showgrid: false, zeroline: false, showticklabels: false, visible: false },
        zaxis: { showgrid: false, zeroline: false, showticklabels: false, visible: false },
        camera: {
            eye: { x: 1.5, y: 1.5, z: 1.5 }
        },
        dragmode: 'orbit'
    },
    showlegend: false
  }

  // Network Graph Config
  const networkLayout: any = {
    ...orbitLayout,
    scene: undefined, // 2D 
    xaxis: { showgrid: false, zeroline: false, showticklabels: false },
    yaxis: { showgrid: false, zeroline: false, showticklabels: false },
  }

  // Render logic based on type
  if (type === 'orb' || type === 'satellite' || type === 'pde') {
      return (
        <div className="w-full h-full relative z-0">
             <Plot
                data={orbitData}
                layout={orbitLayout}
                config={{ displayModeBar: false, responsive: true }}
                style={{ width: '100%', height: '100%' }}
             />
             <div className="absolute inset-0 bg-space-black/20 pointer-events-none" />
        </div>
      )
  }

  // Fallback / Other visualizations using Abstract Motion
  return (
    <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Abstract Grid Animation for Network/Chart types */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 p-12 opacity-30">
            {Array.from({ length: 36 }).map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.5, 0.1] }}
                    transition={{ 
                        duration: 3, 
                        repeat: Infinity, 
                        delay: Math.random() * 2,
                        ease: "easeInOut" 
                    }}
                    className="border border-cosmic-blue/30 rounded-full"
                />
            ))}
        </div>
        
        <div className="relative z-10 text-center">
            <motion.div 
               animate={{ rotate: 360 }}
               transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
               className="w-32 h-32 border border-dashed border-white/20 rounded-full flex items-center justify-center"
            >
               <div className="w-24 h-24 border border-white/10 rounded-full" />
            </motion.div>
            <p className="mt-4 text-xs font-mono text-zinc-500 tracking-widest">VISUALIZING FLUX DATA</p>
        </div>
    </div>
  )
}
