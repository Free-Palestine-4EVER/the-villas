"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"

interface LoadingScreenProps {
  onLoadComplete: () => void
  videoRef: React.RefObject<HTMLVideoElement>
}

export function LoadingScreen({ onLoadComplete, videoRef }: LoadingScreenProps) {
  const [loadingText, setLoadingText] = useState("Starting the fire...")
  const [progress, setProgress] = useState(0)

  // Cycle through loading messages
  useEffect(() => {
    const messages = ["Starting the fire...", "Preparing the tea...", "Pouring the tea..."]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % messages.length
      setLoadingText(messages[currentIndex])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Update the video loading logic to better handle the transition
  useEffect(() => {
    let progressInterval: NodeJS.Timeout

    const checkVideoLoaded = () => {
      if (!videoRef.current) return

      const video = videoRef.current

      // Add event listeners for video loading events
      const handleCanPlayThrough = () => {
        console.log("Video can play through")
        setProgress((prev) => Math.max(prev, 90))
      }

      const handleLoadedData = () => {
        console.log("Video data loaded")
        setProgress((prev) => Math.max(prev, 70))
      }

      const handleLoadedMetadata = () => {
        console.log("Video metadata loaded")
        setProgress((prev) => Math.max(prev, 40))
      }

      const handlePlaying = () => {
        console.log("Video is playing")
        setProgress(100)
        // Give a short delay to ensure video is visible and playing before hiding loading screen
        setTimeout(() => {
          onLoadComplete()
        }, 300)
      }

      // Add event listeners
      video.addEventListener("canplaythrough", handleCanPlayThrough)
      video.addEventListener("loadeddata", handleLoadedData)
      video.addEventListener("loadedmetadata", handleLoadedMetadata)
      video.addEventListener("playing", handlePlaying)

      // Simulate gradual loading progress up to 30%
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 30) {
            return prev + 1
          }
          return prev
        })
      }, 50)

      // Clean up event listeners
      return () => {
        video.removeEventListener("canplaythrough", handleCanPlayThrough)
        video.removeEventListener("loadeddata", handleLoadedData)
        video.removeEventListener("loadedmetadata", handleLoadedMetadata)
        video.removeEventListener("playing", handlePlaying)
      }
    }

    // Start checking after a short delay to allow video element to initialize
    const timeout = setTimeout(checkVideoLoaded, 100)

    return () => {
      clearTimeout(timeout)
      clearInterval(progressInterval)
    }
  }, [videoRef, onLoadComplete])

  useEffect(() => {
    // Force complete loading after 4 seconds
    const forceCompleteTimeout = setTimeout(() => {
      console.log("Force completing loading after 4 second timeout")
      onLoadComplete()
    }, 4000)

    return () => clearTimeout(forceCompleteTimeout)
  }, [onLoadComplete])

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[rgb(190,29,40)]">
      <div className="w-64 md:w-80">
        <Image
          src="/images/logo-white.png"
          alt="The Villas Logo"
          width={400}
          height={133}
          className="w-full h-auto"
          priority
        />
      </div>

      <div className="mt-12 w-64 md:w-80">
        <div className="text-white text-center mb-4 h-6">{loadingText}</div>
        <div className="w-full bg-white/20 rounded-full h-2.5">
          <div
            className="bg-white h-2.5 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

