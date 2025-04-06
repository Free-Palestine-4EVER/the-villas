"use client"

import { useState, useEffect } from "react"

export function useMediaQuery(query: string): boolean {
  // Default to false (desktop) for server-side rendering
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window !== "undefined") {
      const media = window.matchMedia(query)

      // Update the state with the current value
      const updateMatches = () => {
        setMatches(media.matches)
      }

      // Set the initial value
      updateMatches()

      // Add the callback as a listener
      media.addEventListener("change", updateMatches)

      // Remove the listener on cleanup
      return () => {
        media.removeEventListener("change", updateMatches)
      }
    }
  }, [query])

  return matches
}

