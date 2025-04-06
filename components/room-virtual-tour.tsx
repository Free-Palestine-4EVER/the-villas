"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"

export function RoomVirtualTour() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Handle iframe loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-gray-200">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <Loader2 className="h-10 w-10 text-red-600 animate-spin" />
          <span className="ml-2 text-gray-700">Loading virtual tour...</span>
        </div>
      )}

      <iframe
        src="https://v0-360-virtual-tour-system-fjrdgu.vercel.app/embed?data=%5B%7B%22id%22%3A%221743796464264%22%2C%22title%22%3A%22WhatsApp%20Image%202025-04-04%20at%2010%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743796462%2Fvirtual-tours%2Ffza2kfhavtjq7t5hg48j.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743796521428%22%2C%22pitch%22%3A-3.811414574532468%2C%22yaw%22%3A-156.64445052687134%2C%22text%22%3A%22Enter%20Villa%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743796497133%22%7D%5D%2C%22initialView%22%3A%7B%22pitch%22%3A-10.3130426591782%2C%22yaw%22%3A-163.3594987578266%7D%7D%2C%7B%22id%22%3A%221743796497133%22%2C%22title%22%3A%22WhatsApp%20Image%202025-04-04%20at%2010%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743796496%2Fvirtual-tours%2Fwcjme3tkdwbqrgw7cdr6.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743796542115%22%2C%22pitch%22%3A-8.942059078918808%2C%22yaw%22%3A95.16134972663167%2C%22text%22%3A%22Exit%20villa%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743796464264%22%7D%5D%2C%22initialView%22%3A%7B%22pitch%22%3A-10.623088188493641%2C%22yaw%22%3A-121.48357830403103%7D%7D%5D"
        width="100%"
        height="500px"
        frameBorder="0"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setHasError(true)
          setIsLoading(false)
        }}
      />

      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100">
          <p className="text-gray-700 mb-4">Unable to load the virtual tour. Please try refreshing the page.</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  )
}

