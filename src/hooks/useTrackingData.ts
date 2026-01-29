"use client"

import { useState, useEffect } from "react"
import { ApiService } from "@/utils/api"

interface SystemStatus {
  system_status: string;
  database_connected: boolean;
  active_satellites: number;
  tle_records: number;
  conjunctions_today: number;
  high_risk_conjunctions_today: number;
  last_data_ingestion: string;
  uptime_minutes: number;
}

export function useTrackingData() {
  const [data, setData] = useState<SystemStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ApiService.getSystemStatus()
        setData(response.data)
        setLoading(false)
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
        setLoading(false)
      }
    }

    fetchData()
    // Poll every 30 seconds
    const interval = setInterval(fetchData, 30000)
    return () => clearInterval(interval)
  }, [])

  return { data, loading, error }
}
