"use client"

import { useState } from "react"
import { ApiService } from "@/utils/api"

interface ConjunctionScreeningRequest {
  primary_norad_id: number;
  time_window_hours?: number;
  screening_threshold_km?: number;
  probability_threshold?: number;
  include_debris?: boolean;
}

interface ConjunctionEvent {
  id: number;
  primary_norad_id: number;
  secondary_norad_id: number;
  tca_datetime: string;
  miss_distance_meters: number;
  probability: number;
  relative_velocity_mps: number;
  risk_level: string;
}

interface ConjunctionScreeningResult {
  primary_norad_id: number;
  screening_complete: boolean;
  total_candidates: number;
  conjunctions_found: number;
  high_risk_conjunctions: number;
  events: ConjunctionEvent[];
  analysis_duration_ms: number;
  processing_details: Record<string, unknown>;
}

export function useConjunctionScreening() {
  const [results, setResults] = useState<ConjunctionScreeningResult | null>(null)
  const [isScreening, setIsScreening] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runScreening = async (noradId: number) => {
    setIsScreening(true)
    setError(null)
    try {
      const response = await ApiService.screenConjunctions({
        primary_norad_id: noradId
      })
      setResults(response.data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
    } finally {
      setIsScreening(false)
    }
  }

  return { results, isScreening, error, runScreening }
}
