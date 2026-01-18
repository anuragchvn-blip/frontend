"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from "react"
import { ApiService } from "@/utils/api"

interface Satellite {
  norad_id: number
  name: string
  lat: number
  lon: number
  alt: number
  velocity: number
  type: string
  last_updated: string
  // Added for Globe visualization
  x?: number
  y?: number
  z?: number
  risk?: "nominal" | "warning" | "critical"
}

interface Alert {
  id: string
  severity: "critical" | "high" | "medium" | "low"
  message: string
  timestamp: string
}

interface TrackingContextType {
  satellites: Satellite[]
  alerts: Alert[]
  systemStatus: "operational" | "warning" | "degraded"
  isLoading: boolean
}

const TrackingContext = createContext<TrackingContextType | undefined>(undefined)

export function TrackingProvider({ children }: { children: React.ReactNode }) {
  const [satellites, setSatellites] = useState<Satellite[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [systemStatus, setSystemStatus] = useState<"operational" | "warning" | "degraded">("operational")
  const [isLoading, setIsLoading] = useState(true)
  
  // Use a ref to prevent strict mode double-fetch issues if desired, 
  // though typically useEffect dependency array is enough.
  const isMounted = useRef(false)

  useEffect(() => {
    isMounted.current = true
    
    const fetchTelemetry = async () => {
      try {
// Fetch Positions
        const posResponse = await ApiService.getSatellitePositions();
        
        // Transform the position data into our Satellite interface
        // Note: The backend returns x,y,z in km, which is what we want for some views,
        // but passing it through is important.
        const newSatellites = posResponse.data.satellites.map((sat: any) => ({
          norad_id: sat.norad_id,
          name: sat.name,
          lat: sat.lat,
          lon: sat.lon,
          alt: sat.alt,
          velocity: 7.6, // Placeholder if not in endpoint, or derived
          type: "LEO",   // Placeholder
          last_updated: new Date().toISOString(),
          x: sat.x,
          y: sat.y,
          z: sat.z,
          risk: sat.risk
        }));

        setSatellites(newSatellites);

        // Fetch Status
        const statusResponse = await ApiService.getSystemStatus();
        
        if (statusResponse.data.system_status === "operational") {
            setSystemStatus("operational");
        } else {
            setSystemStatus("warning");
        }

        // Fetch Alerts
        try {
            const alertsResponse = await ApiService.getRecentAlerts();
            // Map backend alerts to frontend specific interface if needed
            // The backend returns: { alerts: [...], count: ... }
            if (alertsResponse.data && alertsResponse.data.alerts) {
                const mappedAlerts = alertsResponse.data.alerts.map((a: any) => ({
                    id: a.id.toString(),
                    severity: a.severity.toLowerCase(), 
                    message: `${a.alert_type.toUpperCase()}: ${a.primary_norad_id} vs ${a.secondary_norad_id}`,
                    timestamp: a.generated_at
                }));
                setAlerts(mappedAlerts);
            }
        } catch (e) {
            console.warn("Failed to fetch alerts", e);
        }
        
      } catch (err) {
        console.error("Failed to fetch tracking data", err)
        setSystemStatus("degraded")
      } finally {
        setIsLoading(false)
      }
    }

    // Initial fetch
    fetchTelemetry()

    // Poll every 5 seconds for positions (simulating real-time)
    const interval = setInterval(fetchTelemetry, 5000)

    return () => {
      isMounted.current = false
      clearInterval(interval)
    }
  }, [])

  return (
    <TrackingContext.Provider value={{ satellites, alerts, systemStatus, isLoading }}>
      {children}
    </TrackingContext.Provider>
  )
}

export function useTracking() {
  const context = useContext(TrackingContext)
  if (context === undefined) {
    throw new Error("useTracking must be used within a TrackingProvider")
  }
  return context
}
