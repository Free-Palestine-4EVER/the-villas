"use client"

import type React from "react"

import { useEffect } from "react"

interface ChatWidgetProps {
  // You can add specific props for different chat providers
  provider: "tawkto" | "chaport" | "chatra" | "hubspot" | "freshchat" | "jivochat" | "smartsupp" | "kommunicate"
  widgetId?: string
  customStyle?: React.CSSProperties
}

export function FreeChatWidget({ provider, widgetId, customStyle }: ChatWidgetProps) {
  useEffect(() => {
    // Create a script element
    const script = document.createElement("script")
    script.async = true

    // Set the appropriate script source based on the provider
    switch (provider) {
      case "tawkto":
        // Tawk.to implementation
        window.Tawk_API = window.Tawk_API || {}
        window.Tawk_LoadStart = new Date()

        script.src = `https://embed.tawk.to/${widgetId || "default-widget-id"}`

        // Apply custom styling if provided
        if (customStyle) {
          window.Tawk_API.customStyle = {
            widget: {
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
              ...customStyle,
            },
          }
        }
        break

      case "chaport":
        // Chaport implementation
        window.chaportConfig = {
          appId: widgetId || "default-app-id",
        }
        script.src = "https://app.chaport.com/javascripts/insert.js"
        break

      case "chatra":
        // Chatra implementation
        window.ChatraID = widgetId || "default-chatra-id"
        window.ChatraSetup = {
          colors: {
            buttonText: "#ffffff",
            buttonBg: "#BE1D28",
          },
        }
        script.src = "https://call.chatra.io/chatra.js"
        break

      case "hubspot":
        // HubSpot implementation
        script.src = "//js.hs-scripts.com/YOUR_PORTAL_ID.js"
        script.id = "hs-script-loader"
        break

      case "freshchat":
        // Freshchat implementation
        window.fcSettings = {
          token: widgetId || "default-token",
          host: "https://wchat.freshchat.com",
        }
        script.src = "https://wchat.freshchat.com/js/widget.js"
        break

      case "jivochat":
        // JivoChat implementation
        window.jivo_api_key = widgetId || "default-jivo-key"
        script.src = "//code.jivosite.com/widget/YOUR_WIDGET_ID"
        break

      case "smartsupp":
        // Smartsupp implementation
        window._smartsupp = window._smartsupp || {}
        window._smartsupp.key = widgetId || "default-smartsupp-key"
        script.src = "https://www.smartsuppchat.com/loader.js"
        break

      case "kommunicate":
        // Kommunicate implementation
        window.kommunicate = window.kommunicate || {}
        window.kommunicate._globals = {
          appId: widgetId || "default-kommunicate-id",
        }
        script.src = "https://widget.kommunicate.io/v2/kommunicate.app"
        break

      default:
        console.error("Unknown chat provider")
        return
    }

    // Append the script to the document
    document.body.appendChild(script)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }

      // Clean up any global objects created by the chat widgets
      switch (provider) {
        case "tawkto":
          window.Tawk_API = undefined
          break
        case "chaport":
          window.chaportConfig = undefined
          break
        case "chatra":
          window.ChatraID = undefined
          window.ChatraSetup = undefined
          break
        // Add cleanup for other providers as needed
      }

      // Remove any elements created by the chat widgets
      const chatElements = document.querySelectorAll(`[id^="${provider}-"]`)
      chatElements.forEach((el) => {
        if (el.parentNode) {
          el.parentNode.removeChild(el)
        }
      })
    }
  }, [provider, widgetId, customStyle])

  return null // This component doesn't render anything visible
}

