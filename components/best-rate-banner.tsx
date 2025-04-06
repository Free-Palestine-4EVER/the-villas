"use client"

import { Button } from "@/components/ui/button"

export function BestRateBanner() {
  return (
    <section
      className="relative py-16 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/best-rate-bg-compressed.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative container mx-auto px-4 text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">BEST RATE GUARANTEE</h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Enjoy a 10% discount and the pleasure of knowing you're getting the best possible rate by booking through this
          official website.
        </p>
        <Button
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-xl"
          onClick={() => (window.location.href = "/contact-us")}
        >
          Book Now
        </Button>
      </div>
    </section>
  )
}

