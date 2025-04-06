"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

import { Button } from "@/components/ui/button"
import { TripAdvisorReviews } from "@/components/tripadvisor-reviews"
import { LoadingScreen } from "@/components/loading-screen"
import { HomeVirtualTour } from "@/components/home-virtual-tour"

export default function Home() {
  const [showWhyBookPopup, setShowWhyBookPopup] = useState(false)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoPlaying, setVideoPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const isMobile = useMediaQuery("(max-width: 767px)")

  const taglines = [
    "In the heart of Wadi Rum with best service",
    "5 star camp in wadi rum",
    "Experience wadi rum with our jeep tours",
    "Hot air balloon available with us",
    "Luxury desert experience awaits you",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      // Start transition out
      setIsTransitioning(true)

      // After transition out completes, change text and transition in
      setTimeout(() => {
        setTaglineIndex((prevIndex) => (prevIndex + 1) % taglines.length)
        setIsTransitioning(false)
      }, 500)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Use the first frame of the video as the poster image
  const posterImage = isMobile
    ? "https://res.cloudinary.com/dtcebnrl5/video/upload/so_0/v1743755675/homepage_hero_mobile_online-video-cutter.com_qsupno.jpg"
    : "https://res.cloudinary.com/dtcebnrl5/video/upload/so_0/v1743585501/homepage_hero_pc_rinkbo.jpg"

  // Use optimized videos for faster loading
  // Mobile video URL with optimization
  const mobileVideoUrl =
    "https://res.cloudinary.com/dtcebnrl5/video/upload/q_auto:low,f_auto/v1743755675/homepage_hero_mobile_online-video-cutter.com_qsupno.mp4"

  // Desktop video URL with optimization
  const desktopVideoUrl =
    "https://res.cloudinary.com/dtcebnrl5/video/upload/q_auto,f_auto,vc_auto/v1743585501/homepage_hero_pc_rinkbo.mp4"

  // Enhanced video loading and autoplay handling
  useEffect(() => {
    if (!videoRef.current) return

    const video = videoRef.current

    // Function to handle successful video loading
    const handleVideoLoaded = () => {
      console.log("Video loaded successfully")
      setVideoLoaded(true)
    }

    // Function to handle video playing
    const handleVideoPlaying = () => {
      console.log("Video is now playing")
      setVideoPlaying(true)
      // Hide loading screen after a short delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }

    // Function to handle video errors
    const handleVideoError = (e: Event) => {
      console.error("Video error occurred:", e)
      setVideoError(true)
      setIsLoading(false)
    }

    // Function to attempt playing the video with various fallbacks
    const attemptPlay = async () => {
      try {
        // Try to play the video
        const playPromise = video.play()

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Autoplay successful")
            })
            .catch((err) => {
              console.warn("Autoplay prevented:", err)

              // If autoplay is prevented, we'll try with muted (which is more likely to be allowed)
              video.muted = true

              // Try again with muted
              video
                .play()
                .then(() => {
                  console.log("Muted autoplay successful")
                })
                .catch((err2) => {
                  console.error("Even muted autoplay failed:", err2)
                  // If even muted autoplay fails, we'll show the poster image
                  setVideoError(true)
                  setIsLoading(false)
                })
            })
        }
      } catch (err) {
        console.error("Error during play attempt:", err)
        setVideoError(true)
        setIsLoading(false)
      }
    }

    // Add event listeners
    video.addEventListener("loadeddata", handleVideoLoaded)
    video.addEventListener("playing", handleVideoPlaying)
    video.addEventListener("error", handleVideoError)

    // Set video attributes for better mobile performance
    video.playsInline = true
    video.muted = true
    video.setAttribute("playsinline", "")
    video.setAttribute("muted", "")
    video.setAttribute("preload", "metadata")

    // For iOS, we need to ensure the video is ready to play
    video.load()

    // Try to play the video after it's loaded
    if (video.readyState >= 2) {
      attemptPlay()
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true })
    }

    // Cleanup
    return () => {
      video.removeEventListener("loadeddata", handleVideoLoaded)
      video.removeEventListener("playing", handleVideoPlaying)
      video.removeEventListener("error", handleVideoError)
      video.removeEventListener("loadeddata", attemptPlay)
    }
  }, [])

  // Add a fallback timeout to hide the loading screen after a maximum time
  useEffect(() => {
    // Maximum loading time - 4 seconds
    const maxLoadingTime = 4000

    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        console.log("Maximum loading time reached, showing page anyway")
        setIsLoading(false)
      }
    }, maxLoadingTime)

    return () => clearTimeout(fallbackTimer)
  }, [isLoading])

  // Handle loading complete
  const handleLoadComplete = () => {
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadComplete={handleLoadComplete} videoRef={videoRef} />}

      {/* Hero Image Section with video */}
      <div className="relative w-full" style={{ height: isMobile ? "100vh" : "100vh" }}>
        <div className="absolute inset-0 bg-black">
          {!videoError ? (
            <>
              {/* Always show the poster image until video is playing */}
              {!videoPlaying && (
                <Image
                  src={posterImage || "/placeholder.svg"}
                  alt="Desert Resort"
                  fill
                  className="object-cover z-10"
                  priority
                />
              )}
              <video
                ref={videoRef}
                className={`w-full h-full object-cover ${videoPlaying ? "z-20" : "z-0"}`}
                autoPlay
                muted
                playsInline
                loop
                poster={posterImage}
                preload="metadata"
                onError={() => {
                  console.error("Video error occurred")
                  setVideoError(true)
                  setIsLoading(false)
                }}
              >
                <source src={isMobile ? mobileVideoUrl : desktopVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </>
          ) : (
            <Image src={posterImage || "/placeholder.svg"} alt="Desert Resort" fill className="object-cover" priority />
          )}
        </div>

        {/* Rest of the component remains unchanged */}
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 p-6 md:p-12">
          {/* The Villas text - positioned at top for mobile, bottom right for desktop */}
          <div
            className={`${isMobile ? "absolute bottom-20 left-0 right-0 text-center" : "absolute bottom-8 right-12 text-right"}`}
          >
            <div className="relative">
              <h1 className="text-white text-3xl font-semibold">The Villas - Bedouin Boutique Resort</h1>
              <div className="h-6 overflow-hidden">
                <p
                  className={`text-white text-base transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-0 -translate-y-3" : "opacity-100 translate-y-0"}`}
                >
                  {taglines[taglineIndex]}
                </p>
              </div>

              {/* Vertical red line - only on desktop */}
              {!isMobile && (
                <div className="absolute top-0 bottom-0 border-r border-red-600 w-0" style={{ right: "-5px" }}></div>
              )}
            </div>
          </div>
        </div>

        {/* Why Book With Us Button - positioned at bottom left, only on desktop */}
        {!isMobile && (
          <div className="absolute left-0 bottom-0 z-10">
            <Button
              className="bg-[rgb(190,29,40)] hover:bg-[rgb(170,25,35)] text-white px-8 py-8 rounded-none text-xl font-medium"
              style={{ backgroundColor: "rgb(190, 29, 40)" }}
              onClick={() => setShowWhyBookPopup(true)}
            >
              Why book with us?
            </Button>
          </div>
        )}

        {/* Why Book With Us Popup - positioned at bottom left */}
        {showWhyBookPopup && (
          <div className="absolute left-0 bottom-0 z-20 max-w-md w-full">
            <div className="relative bg-white p-8 shadow-xl">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowWhyBookPopup(false)}
              >
                <X className="h-6 w-6" />
              </button>

              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Why book with us?</h2>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span>The best rate guaranteed through our website</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span>BOOK DIRECTLY and enjoy a 10% discount on your room (no hidden fees)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span>10% discount on our restaurant and desert activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span>Our team is available to assist you personally 24/7</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-500 mr-2">★</span>
                  <span>Free cancellation up to 7 days before arrival</span>
                </li>
              </ul>

              <Button
                className="w-full bg-[rgb(190,29,40)] hover:bg-[rgb(170,25,35)] text-white py-3 mt-8 rounded-none"
                style={{ backgroundColor: "rgb(190, 29, 40)" }}
                onClick={() => {
                  setShowWhyBookPopup(false)
                  window.location.href = "/contact-us"
                }}
              >
                BOOK NOW
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Rest of the component remains unchanged */}
      {/* 360 Virtual Tour Section - NOW FIRST */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-6">360° VIRTUAL TOUR</h2>

        {/* Added gray text description */}
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Experience what our camp looks like in 360 virtual reality. From the common area to the restaurant and your
          room. Feel The Villas camp on your device
        </p>

        <div className="max-w-4xl mx-auto relative mb-12">
          {/* Only render after component is mounted */}
          {typeof window !== "undefined" && <HomeVirtualTour />}
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded"
            onClick={() => (window.location.href = "/contact-us")}
          >
            BOOK NOW
          </Button>
        </div>
      </section>

      {/* Our Villas Section - NOW SECOND */}
      <section className="py-16 px-6 bg-white relative overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 1,
          }}
        ></div>

        <div className="max-w-full md:max-w-[80%] mx-auto relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-red-600 text-center mb-8">Our Villas</h2>

          <p className="text-center max-w-4xl mx-auto mb-12 text-gray-700 px-4 text-sm md:text-base">
            The 5-star Villas Beduin Resort offers an unparalleled desert retreat—nestled in the serene heart of Wadi
            Rum. Its unique blend of traditional Bedouin charm and modern luxury creates an authentic escape, where
            breathtaking landscapes meet world-class service. Indulge in exquisite cuisine, unwind in elegantly designed
            accommodations, and immerse yourself in the tranquility of the desert, all while being welcomed by our warm
            and attentive staff, ready to make your stay unforgettable.
          </p>

          <div className="flex justify-center mb-8 px-4 overflow-x-auto py-2 w-full">
            <div className="flex space-x-4 md:space-x-8 min-w-min">
              <div className="text-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span className="mt-1 text-xs md:text-sm text-gray-600 whitespace-nowrap">Luxury Villas</span>
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M2 9V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5"></path>
                    <path d="M1 16a1 1 0 0 1 1 1h20a1 1 0 0 1 1-1v-7a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v7z"></path>
                    <path d="M4 11h16"></path>
                  </svg>
                  <span className="mt-1 text-xs md:text-sm text-gray-600 whitespace-nowrap">Comfy Beds</span>
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                    <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                    <line x1="12" y1="20" x2="12" y2="20"></line>
                  </svg>
                  <span className="mt-1 text-xs md:text-sm text-gray-600 whitespace-nowrap">Free Wi-Fi</span>
                </div>
              </div>
              <div className="text-center flex-shrink-0">
                <div className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-8 md:w-10 md:h-10 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                  <span className="mt-1 text-xs md:text-sm text-gray-600 whitespace-nowrap">Desert Views</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col h-full">
              <div className="relative h-[33rem] rounded-lg overflow-hidden shadow-lg mb-4 max-w-[90%] mx-auto w-full flex-grow">
                <Image
                  src="/images/double-room-new.jpeg"
                  alt="Double Room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute inset-0 flex flex-col items-center">
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg mt-8">Double Room</h3>
                </div>
              </div>
              <div className="text-center mt-auto">
                <Button
                  className="bg-red-700 hover:bg-red-800 text-white w-full max-w-[90%] mx-auto"
                  onClick={() => (window.location.href = "/rooms/double-room")}
                >
                  LEARN MORE
                </Button>
              </div>
            </div>

            <div className="flex flex-col h-full">
              <div className="relative h-[33rem] rounded-lg overflow-hidden shadow-lg mb-4 max-w-[90%] mx-auto w-full flex-grow">
                <Image
                  src="/images/twin-room-new.jpeg"
                  alt="Twin Room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute inset-0 flex flex-col items-center">
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg mt-8">Twin Room</h3>
                </div>
              </div>
              <div className="text-center mt-auto">
                <Button
                  className="bg-red-700 hover:bg-red-800 text-white w-full max-w-[90%] mx-auto"
                  onClick={() => (window.location.href = "/rooms/twin-room")}
                >
                  LEARN MORE
                </Button>
              </div>
            </div>

            <div className="flex flex-col h-full">
              <div className="relative h-[33rem] rounded-lg overflow-hidden shadow-lg mb-4 max-w-[90%] mx-auto w-full flex-grow">
                <Image
                  src="/images/triple-room-new.jpeg"
                  alt="Triple Room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute inset-0 flex flex-col items-center">
                  <h3 className="text-4xl font-bold text-white drop-shadow-lg mt-8">Triple Room</h3>
                </div>
              </div>
              <div className="text-center mt-auto">
                <Button
                  className="bg-red-700 hover:bg-red-800 text-white w-full max-w-[90%] mx-auto"
                  onClick={() => (window.location.href = "/rooms/triple-room")}
                >
                  LEARN MORE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the sections remain unchanged */}
      {/* Culinary Delights Section */}
      <section className="py-16 px-6 bg-white overflow-hidden">
        <div className="max-w-full md:max-w-[85%] mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-8">Exclusive Culinary Delights</h2>

          <p className="text-center max-w-4xl mx-auto mb-12 px-4">
            Gather around a traditional Bedouin zarb, slow-cooked beneath the desert sands, and savor the rich flavors
            of authentic Arabian cuisine. As the night unfolds under a sky full of stars, indulge in delicious Arabic
            desserts and wake up to a wholesome, freshly prepared breakfast—an experience that makes every evening at
            Muhammed Mutlak Camp truly unforgettable.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-[95%] mx-auto w-full">
              <div className="relative h-64">
                <Image
                  src="/images/healthy-breakfast.jpeg"
                  alt="Healthy Breakfast"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-3">Healthy Brekfast</h3>
                <p className="text-gray-700 mb-4">
                  Start your day with a traditional Bedouin-inspired breakfast featuring fresh local ingredients,
                  organic produce, and authentic Arabian flavors.
                </p>

                <h4 className="font-semibold mb-2">Featured Dishes:</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Fresh-baked Arabic bread</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Hummus and labneh</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Seasonal fruits</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Traditional tea and coffee</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-[95%] mx-auto w-full">
              <div className="relative h-64">
                <Image
                  src="/images/delicious-sweets.jpeg"
                  alt="Delicious Sweets"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-3">Delicious Sweets</h3>
                <p className="text-gray-700 mb-4">
                  Indulge in a selection of exquisite Arabic desserts, carefully prepared to showcase the rich culinary
                  heritage of the region.
                </p>

                <h4 className="font-semibold mb-2">Featured Dishes:</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Kunafa</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Umm Ali</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Dates with nuts</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Arabic coffee with sweets</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-[95%] mx-auto w-full">
              <div className="relative h-64">
                <Image
                  src="/images/traditional-zarb-dinner.jpeg"
                  alt="Traditional Zarb Dinner"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-red-600 mb-3">Traditional Zarb Dinner</h3>
                <p className="text-gray-700 mb-4">
                  Experience the authentic Bedouin zarb - a traditional underground cooking method that infuses meats
                  and vegetables with unique, smoky flavors.
                </p>

                <h4 className="font-semibold mb-2">Featured Dishes:</h4>
                <ul className="space-y-1">
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Slow-cooked lamb</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Roasted seasonal vegetables</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Traditional rice</span>
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-4 h-4 text-red-600 mr-2 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Bedouin-style salads</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Desert Experiences Section */}
      <section className="py-16 px-6 bg-white relative overflow-hidden">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            opacity: 1,
          }}
        ></div>

        <div className="max-w-full md:max-w-[70%] mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-8">DESERT EXPERIENCES</h2>

          <p className="text-center max-w-4xl mx-auto mb-12 px-4">
            Experience the magic of Wadi Rum at The Villas Desert through a selection of Bedouin tours. From camel rides
            to jeep adventures, our experienced guides offer something for everyone. Each tour provides insight into the
            breathtaking desert landscape, ancient traditions, and the rich cultural heritage of the Bedouin people.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 px-4">
            {/* First card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/camel-riding.jpeg"
                  alt="Camel Riding"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Duration: 1 hour
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-red-600 text-center mb-3">Camel Riding</h3>
                <p className="text-gray-700 text-sm mb-4 text-center flex-grow">
                  Ride back in time and experience the desert like the Bedouins did for centuries. This sunset camel
                  ride takes you through the beautiful dunes of Wadi Rum.
                </p>
                <div className="text-center font-bold text-red-600 mb-4">45 JOD per person</div>
                <Button
                  className="w-full bg-red-700 hover:bg-red-800 text-white mt-auto rounded-none"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  BOOK NOW
                </Button>
              </div>
            </div>

            {/* Second card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/full-day-jeep.png"
                  alt="Full Day Jeep Tour"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Duration: 7 hours
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-red-600 text-center mb-3">Full Day Jeep Tour</h3>
                <p className="text-gray-700 text-sm mb-4 text-center flex-grow">
                  Embark on a thrilling full-day tour that covers all major sites in Wadi Rum. Explore hidden canyons,
                  ancient rock drawings, and enjoy lunch cooked in the traditional Bedouin way.
                </p>
                <div className="text-center font-bold text-red-600 mb-4">150 JOD per person</div>
                <Button
                  className="w-full bg-red-700 hover:bg-red-800 text-white mt-auto rounded-none"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  BOOK NOW
                </Button>
              </div>
            </div>

            {/* Third card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/horse-riding.jpeg"
                  alt="Horse Riding"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Duration: 1 hour
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-red-600 text-center mb-3">Horse Riding</h3>
                <p className="text-gray-700 text-sm mb-4 text-center flex-grow">
                  Gallop through the pristine landscapes of Wadi Rum on our well-trained Arabian horses. An exhilarating
                  ride for beginners and experienced riders alike.
                </p>
                <div className="text-center font-bold text-red-600 mb-4">100 JOD per person</div>
                <Button
                  className="w-full bg-red-700 hover:bg-red-800 text-white mt-auto rounded-none"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  BOOK NOW
                </Button>
              </div>
            </div>

            {/* Fourth card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/hot-air-balloon.jpeg"
                  alt="Hot Air Balloon Adventure"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Duration: 1 hour
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-red-600 text-center mb-3">Hot Air Balloon Adventure</h3>
                <p className="text-gray-700 text-sm mb-4 text-center flex-grow">
                  Soar over the majestic Wadi Rum desert at sunrise for a breathtaking panoramic view of the vast
                  wilderness and towering sandstone mountains.
                </p>
                <div className="text-center font-bold text-red-600 mb-4">200 JOD per person</div>
                <Button
                  className="w-full bg-red-700 hover:bg-red-800 text-white mt-auto rounded-none"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  BOOK NOW
                </Button>
              </div>
            </div>

            {/* Fifth card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/sandboarding.jpeg"
                  alt="Sandboarding"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Duration: 1 hour
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-red-600 text-center mb-3">Sandboarding</h3>
                <p className="text-gray-700 text-sm mb-4 text-center flex-grow">
                  Slide down the golden dunes of Wadi Rum on a sandboard for an exhilarating adventure. No experience
                  needed to enjoy this desert surfing experience.
                </p>
                <div className="text-center font-bold text-red-600 mb-4">50 JOD per person</div>
                <Button
                  className="w-full bg-red-700 hover:bg-red-800 text-white mt-auto rounded-none"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  BOOK NOW
                </Button>
              </div>
            </div>

            {/* Sixth card */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/half-day-jeep.webp"
                  alt="Half Day Jeep Tour"
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                  Duration: 4 hours
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-red-600 text-center mb-3">Half Day Jeep Tour</h3>
                <p className="text-gray-700 text-sm mb-4 text-center flex-grow">
                  Experience the magic of Wadi Rum on a 4-hour jeep tour, visiting iconic sites including sand dunes,
                  natural arches, and historical sites. A perfect introduction to the desert.
                </p>
                <div className="text-center font-bold text-red-600 mb-4">80 JOD per person</div>
                <Button
                  className="w-full bg-red-700 hover:bg-red-800 text-white mt-auto rounded-none"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  BOOK NOW
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TripAdvisor Reviews Section */}
      <TripAdvisorReviews />
    </main>
  )
}

