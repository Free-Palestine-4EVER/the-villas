"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { RoomVirtualTour } from "@/components/room-virtual-tour"

export default function DoubleRoomPage() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image src="/images/double-room-new.jpeg" alt="Double Room" fill className="object-cover" priority />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">Double Room</h1>
          <p className="text-xl text-white text-center max-w-3xl">Luxurious comfort in the heart of the desert</p>
        </div>
      </div>

      <section className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
            <div>
              <h2 className="text-3xl font-bold text-red-600 mb-6">Room Overview</h2>
              <p className="text-gray-700 mb-4">
                Our Double Room offers a perfect blend of traditional Bedouin design and modern comfort. Featuring a
                spacious layout with a comfortable double bed, the room provides a cozy retreat after a day of desert
                adventures.
              </p>
              <p className="text-gray-700 mb-6">
                Each room is uniquely decorated with authentic Bedouin textiles and handcrafted furnishings, creating a
                warm and inviting atmosphere that reflects the rich cultural heritage of Wadi Rum.
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Room Features</h3>
                <ul className="grid grid-cols-2 gap-3">
                  {[
                    "Comfortable Double Bed",
                    "Private Bathroom",
                    "Hot Shower",
                    "Air Conditioning",
                    "Bedouin Decor",
                    "Desert Views",
                    "Seating Area",
                    "Daily Housekeeping",
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-red-600 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Room Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600 font-medium">Size:</p>
                    <p>25 m²</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Occupancy:</p>
                    <p>2 Adults</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">Bed Type:</p>
                    <p>1 Double Bed</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-medium">View:</p>
                    <p>Desert/Mountain</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="bg-red-600 hover:bg-red-700 text-white"
                  onClick={() => (window.location.href = "/contact-us")}
                >
                  Book This Room
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image src="/images/double-room-new.jpeg" alt="Double Room Interior" fill className="object-cover" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image src="/images/room-exterior.png" alt="Desert Villas Exterior" fill className="object-cover" />
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image src="/images/room-bathroom.png" alt="Double Room Bathroom" fill className="object-cover" />
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image src="/images/room-interior.jpeg" alt="Double Room View" fill className="object-cover" />
                </div>
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <Image src="/images/room-amenities.jpeg" alt="Double Room Amenities" fill className="object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Virtual Tour Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-red-600 text-center mb-8">360° Virtual Tour</h2>

            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Experience what our Double Room looks like in 360 virtual reality. Explore every corner of your
              accommodation before you arrive and get a feel for the space and amenities.
            </p>

            <div className="max-w-4xl mx-auto relative mb-12">
              <RoomVirtualTour />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-red-600 text-center mb-8">Included Services</h2>
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
                      d="M11 9H9V2H7V9H5V2H3V9C3 11.12 4.66 12.84 6.75 12.97V22H9.25V12.97C11.34 12.84 13 11.12 13 9V2H11V9ZM16 6V14H18.5V22H21V2C18.24 2 16 4.24 16 6Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Breakfast Included</h3>
                <p className="text-gray-600 text-center">
                  Start your day with a delicious traditional Bedouin breakfast included in your stay.
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
                      d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19.5C7.86 19.5 4.5 16.14 4.5 12C4.5 7.86 7.86 4.5 12 4.5C16.14 4.5 19.5 7.86 19.5 12C19.5 16.14 16.14 19.5 12 19.5ZM12.75 7.5H11.25V12.75L15.75 15.45L16.5 14.25L12.75 12V7.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">24/7 Reception</h3>
                <p className="text-gray-600 text-center">
                  Our friendly staff is available around the clock to assist with any requests or information.
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
                      d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM9 6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8H9V6ZM18 20H6V10H18V20ZM12 17C13.1 17 14 16.1 14 15C14 13.9 13.1 13 12 13C10.9 13 10 13.9 10 15C10 16.1 10.9 17 12 17Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">Free Wi-Fi</h3>
                <p className="text-gray-600 text-center">
                  Stay connected with complimentary Wi-Fi available throughout our resort.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg mb-16 w-full">
            <h2 className="text-3xl font-bold text-red-600 text-center mb-6">Room Policies</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Check-in & Check-out</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <span>Check-in: From 2:00 PM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <span>Check-out: Until 11:00 AM</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <span>Early check-in and late check-out available upon request (subject to availability)</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Cancellation Policy</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <span>Free cancellation up to 7 days before arrival</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <span>Cancellations made within 7 days of arrival are subject to a one-night charge</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-red-600 mr-2 mt-0.5" />
                    <span>No-shows will be charged the full amount of the first night</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-red-600 mb-6">Book Your Desert Retreat</h2>
            <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
              Experience the magic of Wadi Rum in our comfortable Double Room. Book now to secure your stay at The
              Villas Bedouin Boutique Resort.
            </p>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-none"
              onClick={() => (window.location.href = "/contact-us")}
            >
              Book Now
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}

