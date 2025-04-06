"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function DesertToursPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src="/images/desert-tours-hero.jpeg"
          alt="Desert Tours in Wadi Rum"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">Desert Tours</h1>
          <p className="text-xl text-white text-center max-w-3xl">
            Explore the magic of Wadi Rum with our expert Bedouin guides
          </p>
        </div>
      </div>

      <section className="py-16 px-6 bg-white relative">
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

        <div className="container mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 text-center mb-8">DESERT EXPERIENCES</h2>

          <p className="text-center max-w-4xl mx-auto mb-12 text-sm md:text-base">
            Experience the magic of Wadi Rum at The Villas Desert through a selection of Bedouin tours. From camel rides
            to jeep adventures, our experienced guides offer something for everyone. Each tour provides insight into the
            breathtaking desert landscape, ancient traditions, and the rich cultural heritage of the Bedouin people.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-8 max-w-[95%] mx-auto">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/camel-riding.jpeg"
                  alt="Camel Riding"
                  width={600}
                  height={400}
                  className="w-full h-[15rem] object-cover"
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

            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/full-day-jeep.png"
                  alt="Full Day Jeep Tour"
                  width={600}
                  height={400}
                  className="w-full h-[15rem] object-cover"
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

            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/horse-riding.jpeg"
                  alt="Horse Riding"
                  width={600}
                  height={400}
                  className="w-full h-[15rem] object-cover"
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

            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/hot-air-balloon.jpeg"
                  alt="Hot Air Balloon Adventure"
                  width={600}
                  height={400}
                  className="w-full h-[15rem] object-cover"
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

            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/sandboarding.jpeg"
                  alt="Sandboarding"
                  width={600}
                  height={400}
                  className="w-full h-[15rem] object-cover"
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

            <div className="bg-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
              <div className="relative">
                <Image
                  src="/images/half-day-jeep.webp"
                  alt="Half Day Jeep Tour"
                  width={600}
                  height={400}
                  className="w-full h-[15rem] object-cover"
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
    </main>
  )
}

