"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { VirtualTourEmbed } from "@/components/virtual-tour-embed"

export default function VirtualTourPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState(0)
  const [isTourLoaded, setIsTourLoaded] = useState(false)

  // Force tour to initialize after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTourLoaded(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const galleryImages = [
    {
      src: "/images/gallery/resort-sign.png",
      alt: "The Villas Bedouin Boutique Resort entrance sign with desert mountains in the background",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/sunset-villas.png",
      alt: "Luxury villas against the stunning backdrop of Wadi Rum mountains at sunset",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/aerial-panorama.jpeg",
      alt: "Aerial view of our resort showcasing the layout of luxury tents in the heart of the desert",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/welcome-staff.jpeg",
      alt: "Our friendly staff welcoming guests at the entrance of the resort",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/cave-dining.jpeg",
      alt: "Intimate dining experience in our unique cave setting with natural rock formations",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/dining-tent.jpeg",
      alt: "Elegant dining tent with traditional decor and ambient lighting",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/group-dining.jpeg",
      alt: "Group dining experience with panoramic views of the desert landscape",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/night-view.jpeg",
      alt: "Night view of the resort with illuminated pathways and palm trees",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/moonlight-lounge.jpeg",
      alt: "Lounge area with the moon visible between the majestic rock formations",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/desert-tent.jpeg",
      alt: "Traditional Bedouin tent with wooden walkway and stunning sunset views",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/luxury-tent.jpeg",
      alt: "Close-up view of our luxury tent with private wooden walkway and palm tree",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/cave-lounge.jpeg",
      alt: "Cozy lounge area inside a natural cave with comfortable seating around a fire pit",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/cave-night.jpeg",
      alt: "Dramatic night view of our cave lounge with illuminated rock formations",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/room-amenities.jpeg",
      alt: "In-room amenities with a view of the stunning desert landscape",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/aerial-view.jpeg",
      alt: "Aerial view of our resort showing the luxury tents against the red desert landscape",
      width: 1200,
      height: 800,
    },
    {
      src: "/images/gallery/tent-view.jpeg",
      alt: "View from inside a luxury tent looking out at the breathtaking desert landscape",
      width: 1200,
      height: 800,
    },
  ]

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const openLightbox = (index: number) => {
    setLightboxImage(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "" // Restore scrolling
  }

  const nextLightboxImage = () => {
    setLightboxImage((prev) => (prev + 1) % galleryImages.length)
  }

  const prevLightboxImage = () => {
    setLightboxImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src="/images/gallery/luxury-tent.jpeg"
          alt="Luxury desert villa with wooden walkways at The Villas Bedouin Boutique Resort"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">Virtual Tour</h1>
          <p className="text-xl text-white text-center max-w-3xl">
            Experience our desert paradise from anywhere in the world
          </p>
        </div>
      </div>

      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-6">360° VIRTUAL TOUR</h2>

        {/* Using the same text as on the homepage */}
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Experience what our camp looks like in 360 virtual reality. From the common area to the restaurant and your
          room. Feel The Villas camp on your device
        </p>

        <div className="max-w-5xl mx-auto relative mb-12">
          {/* Only render the tour component after the page has mounted */}
          {isTourLoaded && <VirtualTourEmbed />}
          <p className="text-center text-sm text-gray-500 mt-4">
            Use your mouse or touch to look around. Click on hotspots to navigate between areas.
          </p>
        </div>

        <div className="flex justify-center">
          <Button
            className="bg-red-700 hover:bg-red-800 text-white px-8 py-2 rounded-none"
            onClick={() => (window.location.href = "/contact-us")}
          >
            BOOK NOW
          </Button>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-16 px-6 bg-gray-100">
        <h2 className="text-5xl font-bold text-red-600 text-center mb-12">OUR GALLERY</h2>

        {/* Hero Gallery Image */}
        <div className="max-w-5xl mx-auto relative mb-12">
          <div
            className="aspect-[16/9] relative rounded-lg overflow-hidden shadow-xl cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={galleryImages[0].src || "/placeholder.svg"}
              alt={galleryImages[0].alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <p className="text-center text-gray-600 mt-4 italic">{galleryImages[0].alt}</p>
        </div>

        {/* Gallery Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.slice(1).map((image, index) => (
            <div
              key={index + 1}
              className="relative aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => openLightbox(index + 1)}
            >
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-center px-4 text-sm md:text-base font-medium drop-shadow-lg">
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button onClick={closeLightbox} className="absolute top-4 right-4 text-white hover:text-gray-300 z-50">
            <X className="h-8 w-8" />
          </button>

          <button onClick={prevLightboxImage} className="absolute left-4 text-white hover:text-gray-300 z-50">
            <ChevronLeft className="h-10 w-10" />
          </button>

          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image
              src={galleryImages[lightboxImage].src || "/placeholder.svg"}
              alt={galleryImages[lightboxImage].alt}
              fill
              className="object-contain"
            />
          </div>

          <button onClick={nextLightboxImage} className="absolute right-4 text-white hover:text-gray-300 z-50">
            <ChevronRight className="h-10 w-10" />
          </button>

          <div className="absolute bottom-4 text-white text-center w-full">
            <p className="text-lg">{galleryImages[lightboxImage].alt}</p>
            <p className="text-sm mt-1">
              {lightboxImage + 1} of {galleryImages.length}
            </p>
          </div>
        </div>
      )}
    </main>
  )
}

