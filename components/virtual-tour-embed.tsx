"use client"

import { useState, useEffect, useRef } from "react"
import { Loader2 } from "lucide-react"

export function VirtualTourEmbed() {
  const [isLoading, setIsLoading] = useState(true)
  const [height, setHeight] = useState("500px")
  const [hasError, setHasError] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Adjust height based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setHeight("300px") // Smaller height on mobile
      } else {
        setHeight("500px") // Height on desktop
      }
    }

    // Set initial height
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Clean up
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Handle iframe loading with retry mechanism
  useEffect(() => {
    if (!iframeRef.current) return

    const iframe = iframeRef.current

    // Function to handle successful loading
    const handleIframeLoad = () => {
      console.log("Virtual tour iframe loaded successfully")
      setIsLoading(false)
    }

    // Function to handle iframe error
    const handleIframeError = () => {
      console.error("Failed to load virtual tour iframe")

      if (retryCount < 3) {
        console.log(`Retrying iframe load (attempt ${retryCount + 1})`)
        setRetryCount((prev) => prev + 1)

        // Reload the iframe
        if (iframe.src) {
          const currentSrc = iframe.src
          iframe.src = ""
          setTimeout(() => {
            if (iframeRef.current) {
              iframeRef.current.src = currentSrc
            }
          }, 1000)
        }
      } else {
        setHasError(true)
        setIsLoading(false)
      }
    }

    // Add event listeners
    iframe.addEventListener("load", handleIframeLoad)
    iframe.addEventListener("error", handleIframeError)

    // Force iframe to load
    if (iframe.src) {
      // If src is already set, we can try to reload it
      if (retryCount > 0) {
        const currentSrc = iframe.src
        iframe.src = ""
        setTimeout(() => {
          if (iframeRef.current) {
            iframeRef.current.src = currentSrc
          }
        }, 100)
      }
    }

    // Clean up event listeners
    return () => {
      iframe.removeEventListener("load", handleIframeLoad)
      iframe.removeEventListener("error", handleIframeError)
    }
  }, [retryCount])

  // Add a fallback timeout to hide loading after maximum time
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        console.log("Maximum loading time reached for virtual tour")
        setIsLoading(false)
      }
    }, 10000) // 10 seconds max loading time

    return () => clearTimeout(timeout)
  }, [isLoading])

  // Add click handler to ensure iframe loads on user interaction
  // This helps with browsers that might block iframe loading until user interaction
  const handleContainerClick = () => {
    if (isLoading && iframeRef.current) {
      console.log("User interaction - forcing iframe reload")
      const currentSrc = iframeRef.current.src
      iframeRef.current.src = ""
      setTimeout(() => {
        if (iframeRef.current) {
          iframeRef.current.src = currentSrc
        }
      }, 100)
    }
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-lg overflow-hidden border border-gray-200 max-w-full"
      onClick={handleContainerClick}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
          <Loader2 className="h-10 w-10 text-red-600 animate-spin" />
          <span className="ml-2 text-gray-700">Loading virtual tour...</span>
        </div>
      )}

      {hasError ? (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100" style={{ height }}>
          <p className="text-gray-700 mb-4 text-center">
            Unable to load the virtual tour. Please try refreshing the page.
          </p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              setHasError(false)
              setIsLoading(true)
              setRetryCount(0)

              // Force reload
              if (iframeRef.current) {
                const currentSrc = iframeRef.current.src
                iframeRef.current.src = ""
                setTimeout(() => {
                  if (iframeRef.current) {
                    iframeRef.current.src = currentSrc
                  }
                }, 100)
              }
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          src="https://v0-360-virtual-tour-system.vercel.app/embed?data=%5B%7B%22id%22%3A%221743799629572%22%2C%22title%22%3A%22next%20to%20entrance%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743799629%2Fvirtual-tours%2Fguoizbfiljil2z1eoqge.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743799760058%22%2C%22pitch%22%3A2.8491399300892866%2C%22yaw%22%3A19.79507796854136%2C%22text%22%3A%22Main%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799642703%22%7D%2C%7B%22id%22%3A%221743799787842%22%2C%22pitch%22%3A-0.35194727975719436%2C%22yaw%22%3A-55.60932092765553%2C%22text%22%3A%22New%20Hotspot%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799707838%22%7D%2C%7B%22id%22%3A%221743799808450%22%2C%22pitch%22%3A0.7277063363890961%2C%22yaw%22%3A7.39275229684595%2C%22text%22%3A%22Sitting%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799737231%22%7D%5D%2C%22initialView%22%3A%7B%22pitch%22%3A2.1406381409476647%2C%22yaw%22%3A14.11687735092778%7D%7D%2C%7B%22id%22%3A%221743799642703%22%2C%22title%22%3A%22main%20area%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743799642%2Fvirtual-tours%2Fn8wdmyhh3xwokpepbgex.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743799853634%22%2C%22pitch%22%3A1.2485513864964772%2C%22yaw%22%3A-146.30127256165522%2C%22text%22%3A%22Sitting%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799737231%22%7D%2C%7B%22id%22%3A%221743799869882%22%2C%22pitch%22%3A-2.0611378406215497%2C%22yaw%22%3A-89.60248134901946%2C%22text%22%3A%22Restaurant%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799724335%22%7D%2C%7B%22id%22%3A%221743799887803%22%2C%22pitch%22%3A-6.657994460725542%2C%22yaw%22%3A8.096892824551276%2C%22text%22%3A%22Beduin%20Tent%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799692393%22%7D%5D%7D%2C%7B%22id%22%3A%221743799666282%22%2C%22title%22%3A%22sitting%20area%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743799666%2Fvirtual-tours%2Fvctsouhhpjwc6dmctw31.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743799920562%22%2C%22pitch%22%3A3.9058993350837152%2C%22yaw%22%3A60.48531040124899%2C%22text%22%3A%22New%20Hotspot%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799707838%22%7D%2C%7B%22id%22%3A%221743799929219%22%2C%22pitch%22%3A5.132982623530734%2C%22yaw%22%3A25.1269133618536%2C%22text%22%3A%22Restaurant%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799724335%22%7D%5D%7D%2C%7B%22id%22%3A%221743799692393%22%2C%22title%22%3A%22tent%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743799692%2Fvirtual-tours%2Filqvv44hpubjwqcuf8o3.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743799965626%22%2C%22pitch%22%3A-1.9826682537309184%2C%22yaw%22%3A-132.79707864330635%2C%22text%22%3A%22Main%20area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799642703%22%7D%2C%7B%22id%22%3A%221743800005434%22%2C%22pitch%22%3A0.520877720217946%2C%22yaw%22%3A-115.27049076857135%2C%22text%22%3A%22Restaurant%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799724335%22%7D%5D%2C%22initialView%22%3A%7B%22pitch%22%3A-3.0697572166748346%2C%22yaw%22%3A-136.13656843469556%7D%7D%2C%7B%22id%22%3A%221743799707838%22%2C%22title%22%3A%22palm%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743799707%2Fvirtual-tours%2Fd0rqljspcizcbvjc2tpx.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743800053505%22%2C%22pitch%22%3A-3.05989554010507%2C%22yaw%22%3A-174.21506544918896%2C%22text%22%3A%22Sitting%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799666282%22%7D%2C%7B%22id%22%3A%221743800068425%22%2C%22pitch%22%3A1.8653508160581247%2C%22yaw%22%3A-68.99020056808786%2C%22text%22%3A%22Sitting%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799737231%22%7D%5D%2C%22initialView%22%3A%7B%22pitch%22%3A2.9073098940014397%2C%22yaw%22%3A-159.52671792186118%7D%7D%2C%7B%22id%22%3A%221743799724335%22%2C%22title%22%3A%22restaurant%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743799724%2Fvirtual-tours%2Fn7iwzdymdykaxlfuc2qg.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743800103809%22%2C%22pitch%22%3A0.9457380711437782%2C%22yaw%22%3A101.57247555971708%2C%22text%22%3A%22Main%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799642703%22%7D%2C%7B%22id%22%3A%221743800175137%22%2C%22pitch%22%3A16.089205607086775%2C%22yaw%22%3A-78.95767206798416%2C%22text%22%3A%22Sitting%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799666282%22%7D%2C%7B%22id%22%3A%221743800234305%22%2C%22pitch%22%3A1.5287675832927952%2C%22yaw%22%3A-160.54284885717337%2C%22text%22%3A%22Sitting%20area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799737231%22%7D%5D%7D%2C%7B%22id%22%3A%221743799737231%22%2C%22title%22%3A%22second%20sitting%22%2C%22imageUrl%22%3A%22https%3A%2F%2Fres.cloudinary.com%2Fdtcebnrl5%2Fimage%2Fupload%2Fv1743799737%2Fvirtual-tours%2Froxsuqudyxjkqicwavrh.jpg%22%2C%22hotspots%22%3A%5B%7B%22id%22%3A%221743800265225%22%2C%22pitch%22%3A-1.302239020868501%2C%22yaw%22%3A139.48505933440313%2C%22text%22%3A%22Main%20Area%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799642703%22%7D%2C%7B%22id%22%3A%221743800284425%22%2C%22pitch%22%3A-1.7787156506033874%2C%22yaw%22%3A-20.2981018098991%2C%22text%22%3A%22Palm%22%2C%22type%22%3A%22scene%22%2C%22sceneId%22%3A%221743799707838%22%7D%5D%7D%5D"
          width="100%"
          height={height}
          style={{ border: "none" }}
          allowFullScreen
          title="The Villas Bedouin Resort Virtual Tour"
          loading="eager"
        />
      )}
    </div>
  )
}

