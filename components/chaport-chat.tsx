"use client"

import { useEffect } from "react"

export function ChaportChat() {
  useEffect(() => {
    // Create chaportConfig object
    if (typeof window !== "undefined") {
      window.chaportConfig = {
        appId: "67f19a830acaa453cb0dcecf",
      }

      // Initialize Chaport
      if (!window.chaport) {
        const v3 = (window.chaport = {})
        v3._q = []
        v3._l = {}
        v3.q = () => {
          v3._q.push(arguments)
        }
        v3.on = (e, fn) => {
          if (!v3._l[e]) v3._l[e] = []
          v3._l[e].push(fn)
        }
      }

      // Load the Chaport script
      const script = document.createElement("script")
      script.type = "text/javascript"
      script.async = true
      script.src = "https://app.chaport.com/javascripts/insert.js"

      // Append the script to the document
      const firstScript = document.getElementsByTagName("script")[0]
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript)
      } else {
        document.head.appendChild(script)
      }
    }

    // Cleanup function
    return () => {
      // Remove the script when component unmounts
      const chaportScript = document.querySelector('script[src*="chaport.com"]')
      if (chaportScript && chaportScript.parentNode) {
        chaportScript.parentNode.removeChild(chaportScript)
      }

      // Remove any Chaport elements
      const chaportElements = document.querySelectorAll('[id^="chaport-"]')
      chaportElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })

      // Reset Chaport global objects
      if (typeof window !== "undefined") {
        window.chaportConfig = undefined
        window.chaport = undefined
      }
    }
  }, [])

  return null // This component doesn't render anything visible
}

