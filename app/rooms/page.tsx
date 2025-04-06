"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"

export default function RoomsPage() {
  return (
    <main className="pt-32 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-12">Rooms & Suites</h1>

        <p className="text-center max-w-4xl mx-auto text-gray-700 mb-16">
          The 5-star Villas Beduin Resort offers an unparalleled desert retreat—nestled in the serene heart of Wadi Rum.
          Its luxurious accommodations blend traditional Bedouin aesthetics with modern comforts, providing guests with
          an authentic yet indulgent experience in one of the world's most stunning desert landscapes.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {rooms.map((room) => (
            <div key={room.id} className="group">
              <div className="overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=400&width=600`}
                  alt={room.title}
                  width={600}
                  height={400}
                  className="object-cover h-64 w-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-red-600">{room.title}</h3>
              <div className="flex items-center mt-2 text-gray-600">
                <span>{room.capacity} Guests</span>
                <span className="mx-2">•</span>
                <span>{room.size} m²</span>
              </div>
              <p className="text-gray-600 mt-2">{room.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {room.amenities.map((amenity, index) => (
                  <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {amenity}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-bold text-red-600">
                  ${room.price} <span className="text-sm font-normal">/ night</span>
                </span>
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  Book Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}

const rooms = [
  {
    id: 1,
    title: "Luxury Desert Villa",
    capacity: 2,
    size: 40,
    price: 250,
    description: "Experience the magic of the desert with all modern amenities in our luxury villa.",
    amenities: ["Private Terrace", "Air Conditioning", "En-suite Bathroom", "Mountain View"],
  },
  {
    id: 2,
    title: "Premium Bedouin Tent",
    capacity: 2,
    size: 35,
    price: 200,
    description: "Traditional Bedouin tent with luxury amenities and stunning desert views.",
    amenities: ["Authentic Design", "Luxury Bedding", "Private Bathroom", "Panoramic Views"],
  },
  {
    id: 3,
    title: "Family Desert Suite",
    capacity: 4,
    size: 60,
    price: 350,
    description: "Spacious suite perfect for families, with separate sleeping areas and premium amenities.",
    amenities: ["Two Bedrooms", "Lounge Area", "Premium Toiletries", "Breakfast Included"],
  },
  {
    id: 4,
    title: "Honeymoon Bubble Tent",
    capacity: 2,
    size: 30,
    price: 300,
    description: "Romantic transparent bubble tent for stargazing and an unforgettable desert experience.",
    amenities: ["Stargazing Roof", "Private Hot Tub", "Champagne Service", "Romantic Setup"],
  },
  {
    id: 5,
    title: "Deluxe Mountain View Room",
    capacity: 2,
    size: 38,
    price: 220,
    description: "Comfortable room with stunning views of the Wadi Rum mountains and modern amenities.",
    amenities: ["King Bed", "Mountain Views", "Mini Bar", "Room Service"],
  },
  {
    id: 6,
    title: "Royal Desert Villa",
    capacity: 6,
    size: 90,
    price: 500,
    description: "Our most luxurious accommodation with multiple bedrooms and exclusive services.",
    amenities: ["Three Bedrooms", "Private Terrace", "Butler Service", "Private Dining"],
  },
]

