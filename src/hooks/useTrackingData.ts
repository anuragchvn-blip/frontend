"use client"

import { useState, useEffect } from "react"
import axios from "axios"

const API_BASE = "https://web-production-e4e27.up.railway.app/"

export function useTrackingData() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE}/status`, {
          headers: { Authorization: "Bearer test-token" }
        })
        setData(response.data)
        setLoading(false)
      } catch (err: any) {
        setError(err.message)
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
