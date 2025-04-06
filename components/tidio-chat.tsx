"use client"

import { useEffect } from "react"

export function TidioChat() {
  useEffect(() => {
    // Tidio integration script
    const script = document.createElement("script")
    script.async = true
    script.src = "//code.tidio.co/wgx2jqj9buoiindjrjd9tmz3seqebh7d.js"
    document.body.appendChild(script)

    // Cleanup function to remove the script when component unmounts
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }
      // Also remove any elements Tidio might have added
      const tidioElements = document.querySelectorAll('[id^="tidio-"]')
      tidioElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    }
  }, [])

  return null // This component doesn't render anything visible
}

