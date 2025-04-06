"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function OurCampPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image src="/images/our-camp-hero-new.jpeg" alt="Our Camp in Wadi Rum" fill className="object-cover" priority />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">Our Camp</h1>
          <p className="text-xl text-white text-center max-w-3xl">
            Experience authentic Bedouin hospitality in the heart of Wadi Rum
          </p>
        </div>
      </div>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-red-600 mb-6">Welcome to Our Bedouin Camp</h2>
              <p className="text-gray-700 mb-4">
                The Villas Bedouin Boutique Resort is a unique desert retreat nestled in the heart of Wadi Rum's
                protected area. Our camp offers an authentic Bedouin experience combined with modern comforts, allowing
                you to immerse yourself in the stunning desert landscape while enjoying luxurious amenities.
              </p>
              <p className="text-gray-700 mb-4">
                Our camp is designed to blend harmoniously with the natural surroundings, using traditional Bedouin
                architecture and sustainable practices. Each accommodation unit is carefully positioned to offer privacy
                and spectacular views of the desert and mountains.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're seeking adventure, relaxation, or cultural experiences, our camp provides the perfect
                base for exploring the wonders of Wadi Rum.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  Book Your Stay
                </Button>
              </div>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/welcome-to-bedouin-camp.jpeg"
                alt="Bedouin Camp Overview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-red-600 text-center mb-8">Camp Facilities</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 19V13H5V19H11ZM11 11V5H5V11H11ZM13 5V11H19V5H13ZM13 19H19V13H13V19Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Comfortable Accommodations</h3>
                <p className="text-gray-600 text-center">
                  Our camp features spacious tents and villas with comfortable beds, private bathrooms, and traditional
                  Bedouin decor.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Traditional Dining</h3>
                <p className="text-gray-600 text-center">
                  Experience authentic Bedouin cuisine prepared using traditional methods, including the famous
                  underground zarb.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Desert Activities</h3>
                <p className="text-gray-600 text-center">
                  Enjoy a range of activities including jeep tours, camel rides, hiking, sandboarding, and stargazing.
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="order-2 md:order-1 relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/images/unforgettable-experiences.jpeg"
                alt="Bedouin Camp at Night"
                fill
                className="object-cover"
              />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-red-600 mb-6">Unforgettable Experiences</h2>
              <p className="text-gray-700 mb-4">
                At The Villas Bedouin Boutique Resort, we offer more than just accommodation – we provide unforgettable
                experiences that connect you with the rich culture and stunning natural beauty of Wadi Rum.
              </p>
              <p className="text-gray-700 mb-4">
                Gather around the campfire in the evening to enjoy traditional Bedouin music and storytelling under a
                canopy of stars. Wake up to breathtaking desert sunrises and witness the changing colors of the
                sandstone mountains throughout the day.
              </p>
              <p className="text-gray-700 mb-6">
                Our experienced guides, many of whom are from local Bedouin families, share their deep knowledge of the
                desert, its history, and traditions, enriching your stay with authentic cultural insights.
              </p>
              <div className="flex justify-center md:justify-start">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => (window.location.href = "/desert-tours")}
                >
                  Explore Activities
                </Button>
              </div>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-red-600 text-center mb-8">Sustainability Commitment</h2>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 text-center mb-6">
                We are committed to preserving the pristine desert environment and supporting the local Bedouin
                community. Our camp operates with sustainable practices including:
              </p>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-center mb-2">Solar Power</h3>
                  <p className="text-gray-600 text-sm text-center">
                    Our camp is powered by solar energy, reducing our carbon footprint while providing modern comforts.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-center mb-2">Water Conservation</h3>
                  <p className="text-gray-600 text-sm text-center">
                    We implement water-saving technologies and practices to preserve this precious resource in the
                    desert.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="font-semibold text-center mb-2">Local Employment</h3>
                  <p className="text-gray-600 text-sm text-center">
                    We employ staff from local Bedouin communities and source products locally whenever possible.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Ready to Experience Wadi Rum?</h2>
            <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
              Book your stay at The Villas Bedouin Boutique Resort and immerse yourself in the magic of the desert. Our
              team is ready to help you plan an unforgettable journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-red-600 hover:bg-red-700 text-white px-8"
                onClick={() => (window.location.href = "/contact-us")}
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-50 px-8"
                onClick={() => (window.location.href = "/contact-us")}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

