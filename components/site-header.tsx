"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Phone } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-mobile"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 767px)")

  // Add effect to toggle body scroll lock when menu opens/closes
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      // Disable scrolling on body when menu is open on mobile
      document.body.style.overflow = "hidden"
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = ""
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen, isMobile])

  const openMenu = () => {
    setIsMenuOpen(true)
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <div className="w-full px-4 py-4 flex items-center justify-between bg-black bg-opacity-30">
          {/* Logo - moved left and reduced size by 20% for mobile */}
          <div className="flex flex-col items-start">
            <Link href="/" className="flex flex-col items-start">
              <Image
                src="/images/logo-white.png"
                alt="The Villas Logo"
                width={isMobile ? 144 : 207} // Reduced by 20% from 180 to 144 for mobile
                height={isMobile ? 48 : 69} // Reduced by 20% from 60 to 48 for mobile
                className="h-auto"
              />
            </Link>
          </div>

          {/* Right side elements */}
          <div className="flex items-center gap-6">
            {/* Menu button */}
            <div className="flex items-center gap-2 cursor-pointer self-center" onClick={openMenu}>
              <span className="text-white text-sm font-medium uppercase tracking-wide">Menu</span>
              <div className="flex flex-col justify-center items-center">
                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white mb-1.5"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </div>

            {/* Book Now button - only show on desktop */}
            {!isMobile && (
              <div className="flex flex-col">
                <Link href="/contact-us">
                  <Button
                    className="bg-[rgb(190,29,40)] hover:bg-[rgb(170,25,35)] text-white font-medium px-8 py-3 w-full uppercase tracking-wide text-sm rounded-none"
                    style={{
                      backgroundColor: "rgb(190, 29, 40)",
                      overflow: "visible",
                    }}
                  >
                    Book Now
                  </Button>
                  <div className="w-full text-center mt-1">
                    <span className="text-white text-xs uppercase tracking-wide block whitespace-nowrap">
                      Best Rate Guaranteed
                    </span>
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Side Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop - semi-transparent to show website behind */}
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsMenuOpen(false)}></div>

          {/* Menu Panel - Now with left padding and not full width */}
          <div
            className="relative w-[85%] max-w-sm h-full overflow-y-auto shadow-xl animate-in slide-in-from-right fixed"
            style={{ backgroundColor: "rgb(190, 29, 40)" }}
          >
            <div className="flex flex-col h-full p-4 pl-[1.5cm]">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-[rgb(170,25,35)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="space-y-3 flex-grow">
                <Link
                  href="/"
                  className="block text-lg font-medium text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/our-camp"
                  className="block text-lg font-medium text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Our Camp
                </Link>

                <div className="space-y-2">
                  <p className="text-lg font-medium text-white">Rooms</p>
                  <div className="pl-3 space-y-2 border-l-2 border-white/30">
                    <Link
                      href="/rooms/double-room"
                      className="block text-base text-white/90 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Double Room
                    </Link>
                    <Link
                      href="/rooms/twin-room"
                      className="block text-base text-white/90 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Twin Room
                    </Link>
                    <Link
                      href="/rooms/triple-room"
                      className="block text-base text-white/90 hover:text-white transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Triple Room
                    </Link>
                  </div>
                </div>

                <Link
                  href="/virtual-tour"
                  className="block text-lg font-medium text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Virtual Tour
                </Link>
                <Link
                  href="/desert-tours"
                  className="block text-lg font-medium text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Desert Tours
                </Link>
                <Link
                  href="/contact-us"
                  className="block text-lg font-medium text-white hover:text-gray-200 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact Us
                </Link>

                {/* View our Gallery link - now shown on both mobile and desktop */}
                <Link
                  href="/virtual-tour#gallery"
                  className="block text-lg font-medium text-white hover:text-gray-200 transition-colors border border-white py-2 px-4 text-center rounded-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  View our Gallery
                </Link>
              </nav>

              <div className="mt-auto pt-4 border-t border-white/30">
                {/* Book Now button */}
                <Link href="/contact-us" onClick={() => setIsMenuOpen(false)}>
                  <Button className="w-full py-4 rounded-[3%] bg-white hover:bg-gray-100 text-[rgb(190,29,40)]">
                    Book Now
                  </Button>
                  <div className="w-full text-center mt-1">
                    <span className="text-white text-xs uppercase tracking-wide block whitespace-nowrap">
                      Best Rate Guaranteed
                    </span>
                  </div>
                </Link>

                {/* WhatsApp button - now shown on both mobile and desktop */}
                <Link
                  href="https://wa.me/962775263333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 mt-3 bg-green-600 hover:bg-green-700 text-white rounded-[3%]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact via WhatsApp</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

