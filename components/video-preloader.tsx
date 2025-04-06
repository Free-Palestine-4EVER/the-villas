"use client"

import { useEffect } from "react"

interface VideoPreloaderProps {
  videoUrl: string
  onLoaded?: () => void
}

export function VideoPreloader({ videoUrl, onLoaded }: VideoPreloaderProps) {
  useEffect(() => {
    // Create a new video element
    const preloadVideo = document.createElement("video")

    // Set attributes for better mobile performance
    preloadVideo.src = videoUrl
    preloadVideo.muted = true
    preloadVideo.preload = "metadata" // Changed from "auto" to "metadata" for faster initial load
    preloadVideo.playsInline = true
    preloadVideo.style.display = "none"

    // Add event listeners
    preloadVideo.addEventListener("loadeddata", () => {
      console.log("Video preloaded:", videoUrl)
      if (onLoaded) onLoaded()

      // Clean up
      if (document.body.contains(preloadVideo)) {
        document.body.removeChild(preloadVideo)
      }
    })

    // Add to DOM to start loading
    preloadVideo.load()

    // Set a timeout to clean up even if loading takes too long
    const timeout = setTimeout(() => {
      console.log("Video preload timeout reached for:", videoUrl)
      if (document.body.contains(preloadVideo)) {
        document.body.removeChild(preloadVideo)
      }
      if (onLoaded) onLoaded()
    }, 5000)

    // Cleanup
    return () => {
      clearTimeout(timeout)
      if (document.body.contains(preloadVideo)) {
        document.body.removeChild(preloadVideo)
      }
    }
  }, [videoUrl, onLoaded])

  // This component doesn't render anything
  return null
}

