"use client"

import { useEffect } from "react"

export function TawktoChat() {
  useEffect(() => {
    // Create a global Tawk_API object if it doesn't exist
    if (typeof window !== "undefined") {
      window.Tawk_API = window.Tawk_API || {}
      window.Tawk_LoadStart = new Date()

      // Configure widget position
      window.Tawk_API.customStyle = {
        // Ensure the widget appears in the bottom right corner
        // These settings work on both mobile and desktop
        widget: {
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        },
      }

      // Load the tawk.to script
      const s1 = document.createElement("script")
      const s0 = document.getElementsByTagName("script")[0]

      s1.async = true
      s1.src = "https://embed.tawk.to/67f1968b439ba4190c8f436e/1io3r84gf"
      s1.charset = "UTF-8"
      s1.setAttribute("crossorigin", "*")

      if (s0 && s0.parentNode) {
        s0.parentNode.insertBefore(s1, s0)
      } else {
        document.head.appendChild(s1)
      }
    }

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const tawkScript = document.querySelector('script[src*="tawk.to"]')
      if (tawkScript && tawkScript.parentNode) {
        tawkScript.parentNode.removeChild(tawkScript)
      }

      // Remove any tawk.to elements
      const tawkElements = document.querySelectorAll('[id^="tawk-"]')
      tawkElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })

      // Reset Tawk_API
      if (typeof window !== "undefined") {
        window.Tawk_API = undefined
      }
    }
  }, [])

  return null // This component doesn't render anything visible
}

