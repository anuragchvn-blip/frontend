"use client"

import { useState } from "react"
import axios from "axios"

const API_BASE = "https://web-production-e4e27.up.railway.app/"

export function useConjunctionScreening() {
  const [results, setResults] = useState<any>(null)
  const [isScreening, setIsScreening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runScreening = async (noradId: number) => {
    setIsScreening(true)
    setError(null)
    try {
      const response = await axios.post(
        `${API_BASE}/conjunctions/screen`,
        { primary_norad_id: noradId },
        { headers: { Authorization: "Bearer test-token" } }
      )
      setResults(response.data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setIsScreening(false)
    }
  }

  return { results, isScreening, error, runScreening }
}
