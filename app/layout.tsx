import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import Image from "next/image"
import { Instagram, Phone, Mail } from "lucide-react"

import { SiteHeader } from "@/components/site-header"
import { BestRateBanner } from "@/components/best-rate-banner"
import { VideoPreloader } from "@/components/video-preloader"
import { TidioChat } from "@/components/tidio-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "The Villas Bedouin Boutique Resort",
  description: "Experience the magic of Wadi Rum at our luxury desert resort",
  icons: {
    icon: [{ url: "/favicon.ico" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "The Villas Bedouin Boutique Resort",
    description: "Experience the magic of Wadi Rum at our luxury desert resort",
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "The Villas Bedouin Boutique Resort - Luxury desert villas with stunning sunset view",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Villas Bedouin Boutique Resort",
    description: "Experience the magic of Wadi Rum at our luxury desert resort",
    images: ["/og-image.jpeg"],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Video URLs with lower quality for faster loading
  // Mobile video URL - lower quality for faster loading
  const mobileVideoUrl =
    "https://res.cloudinary.com/dtcebnrl5/video/upload/q_auto:low,f_auto/v1743585363/homepage_hero_mobile_gk8j3v.mp4"

  // Desktop video URL - lower quality for faster loading
  const desktopVideoUrl =
    "https://res.cloudinary.com/dtcebnrl5/video/upload/q_auto:low,f_auto/v1743585501/homepage_hero_pc_rinkbo.mp4"

  // We'll use Cloudinary's ability to extract the first frame directly

  return (
    <html lang="en">
      <head>
        {/* Favicons - comprehensive approach */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="msapplication-TileImage" content="/favicon.ico" />

        {/* Preload video files with optimized parameters */}
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/dtcebnrl5/video/upload/q_auto,f_auto,vc_auto/v1743755675/homepage_hero_mobile_online-video-cutter.com_qsupno.mp4"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="video"
          href="https://res.cloudinary.com/dtcebnrl5/video/upload/q_auto,f_auto,vc_auto/v1743585501/homepage_hero_pc_rinkbo.mp4"
          media="(min-width: 768px)"
        />

        {/* Preload the first frame images */}
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dtcebnrl5/video/upload/so_0/v1743755675/homepage_hero_mobile_online-video-cutter.com_qsupno.jpg"
          media="(max-width: 767px)"
        />
        <link
          rel="preload"
          as="image"
          href="https://res.cloudinary.com/dtcebnrl5/video/upload/so_0/v1743585501/homepage_hero_pc_rinkbo.jpg"
          media="(min-width: 768px)"
        />
      </head>
      <body className={inter.className}>
        <SiteHeader />
        {children}
        <BestRateBanner />

        {/* Client-side video preloader */}
        <VideoPreloader videoUrl={mobileVideoUrl} />
        <VideoPreloader videoUrl={desktopVideoUrl} />

        {/* Tidio Chat Integration */}
        <TidioChat />

        {/* New Professional Footer */}
        <footer className="bg-[#BE1D28] text-white">
          {/* Main Footer Content */}
          <div className="container mx-auto px-4 py-12">
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-3 gap-8">
              {/* Left Column - Contact Info & Social */}
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <p className="mb-2">Wadi Rum Protected Area, Jordan</p>
                <p className="mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +962 7 7526 3333
                </p>
                <p className="mb-4 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  thevillaswr@gmail.com
                </p>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-2">
                  <Link
                    href="https://www.instagram.com/thevillaswr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#9E1A22] p-2 rounded-full hover:bg-[#7D1419] transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Middle Column - Logo */}
              <div className="flex flex-col items-center justify-center">
                <Image src="/images/logo-white.png" alt="The Villas Logo" width={260} height={95} className="h-auto" />
              </div>

              {/* Right Column - Gallery Button & Text */}
              <div className="flex flex-col items-end">
                <h3 className="text-xl font-bold mb-4">Explore Our Resort</h3>
                <p className="mb-4 text-right">
                  Discover the beauty and luxury of our Bedouin resort through our stunning photo gallery.
                </p>

                <Link
                  href="/virtual-tour#gallery"
                  className="bg-white text-[#BE1D28] px-6 py-3 text-center font-medium hover:bg-[#f8f8f8] transition-colors rounded-none"
                  style={{ overflow: "visible" }}
                >
                  VIEW OUR GALLERY
                </Link>
              </div>
            </div>

            {/* Mobile Layout - Rearranged */}
            <div className="flex flex-col items-start md:hidden">
              {/* Logo - Now on top */}
              <div className="flex flex-col items-start mb-8 w-full">
                <Image src="/images/logo-white.png" alt="The Villas Logo" width={260} height={95} className="h-auto" />
              </div>

              {/* Gallery Button & Text - Now second */}
              <div className="flex flex-col items-start mb-8">
                <h3 className="text-xl font-bold mb-4">Explore Our Resort</h3>
                <p className="mb-4 text-left">
                  Discover the beauty and luxury of our Bedouin resort through our stunning photo gallery.
                </p>

                <Link
                  href="/virtual-tour#gallery"
                  className="bg-white text-[#BE1D28] px-6 py-3 text-center font-medium hover:bg-[#f8f8f8] transition-colors rounded-none"
                  style={{ overflow: "visible" }}
                >
                  VIEW OUR GALLERY
                </Link>
              </div>

              {/* Contact Info & Social - Now third */}
              <div className="flex flex-col items-start">
                <h3 className="text-xl font-bold mb-4">Contact Us</h3>
                <p className="mb-2">Wadi Rum Protected Area, Jordan</p>
                <p className="mb-2 flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +962 7 7526 3333
                </p>
                <p className="mb-4 flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  thevillaswr@gmail.com
                </p>

                {/* Social Media Icons */}
                <div className="flex space-x-4 mt-2">
                  <Link
                    href="https://www.instagram.com/thevillaswr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#9E1A22] p-2 rounded-full hover:bg-[#7D1419] transition-colors"
                  >
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-[#9E1A22] py-4">
            <div className="container mx-auto px-4 flex flex-col text-sm">
              <p>© {new Date().getFullYear()} The Villas Bedouin Boutique Resort. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}



import './globals.css'