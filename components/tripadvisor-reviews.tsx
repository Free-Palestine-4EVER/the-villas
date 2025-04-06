import Image from "next/image"
import Link from "next/link"
import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

// Real review data
const reviews = [
  {
    id: 1,
    name: "Trina M",
    location: "Cairo, Egypt",
    date: "Jan 2025",
    rating: 5,
    title: "Best Experience in Wadi Rum",
    content:
      "Incredible! The location is breathtaking, the food is delicious, and the staff are friendly. I've stayed here a few times, and every time is better than the last. The manager helped organize a hot-air balloon ride, camel ride, and jeep tour of the valley. Stay here for the most magical experience.",
    profileImage: "/images/trina-m.jpg",
    reviewImage: "/images/stars.jpg",
  },
  {
    id: 2,
    name: "onenil",
    location: "Brentwood, United Kingdom",
    date: "Sep 2024",
    rating: 5,
    title: "Unforgettable",
    content:
      "An unforgettable experience. The Villas is approx 20 minutes for Wadi Rum village but is located in the heart of Wadi Run (unlike many other camps). You are picked up in a truck and taken to the resort which is all part of the incredible desert experience. We were fortunate that we were the only guests so we essentially had a private chef and staff.",
    profileImage: "/images/onenil-profile.jpg",
    reviewImage: "/images/cave-seating.jpg",
  },
  {
    id: 3,
    name: "Mohammad A",
    location: "Dubai",
    date: "Nov 2023",
    rating: 5,
    title: "The villas resort wadi rum",
    content:
      "Fascinating place, the real meaning of silence you can get in such place, the rooms and facilities in the resort are magnificent, the view to the white desert one of the best meditation spot you can have, food are delicious and the Bedouin cuisine are fantastic, i recommend this resort for anyone want to get the desert experience in wadi rum.",
    profileImage: "/images/mohammed.jpg",
    reviewImage: "/images/mohammed-review-new.jpg",
  },
]

export function TripAdvisorReviews() {
  return (
    <section className="py-16 px-6 bg-white overflow-hidden">
      <div className="max-w-full md:max-w-[80%] mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-red-600">GUEST REVIEWS</h2>
        </div>

        <div className="flex flex-col items-center justify-center mb-8">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-6 w-6 text-[#00aa6c] fill-[#00aa6c]" />
            ))}
          </div>
          <p className="mt-2 text-lg font-semibold">
            Based on <span className="text-[#00aa6c]">our reviews on TripAdvisor</span>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col h-full mx-auto w-full max-w-[95%]"
            >
              <div className="flex items-start mb-4">
                <Image
                  src={review.profileImage || "/placeholder.svg"}
                  alt={review.name}
                  width={50}
                  height={50}
                  className="rounded-full mr-4 object-cover h-[50px] w-[50px]"
                />
                <div>
                  <h3 className="font-semibold">{review.name}</h3>
                  <p className="text-sm text-gray-600">
                    {review.location} • {review.date}
                  </p>
                </div>
              </div>

              <div className="flex mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-[#00aa6c] fill-[#00aa6c]" />
                ))}
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-gray-700 text-sm mb-4 flex-grow">{review.content}</p>

              <div className="mt-auto">
                {review.reviewImage && (
                  <div className="relative h-32 w-full rounded-lg overflow-hidden mt-4">
                    <Image
                      src={review.reviewImage || "/placeholder.svg"}
                      alt={`Photo from ${review.name}'s review`}
                      fill
                      className="object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="https://www.tripadvisor.com/Hotel_Review-g12908257-d25157244-Reviews-The_Villas_Bedouin_Boutique_Resort-Wadi_Rum_Village_Wadi_Rum_Al_Aqabah_Governorate.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#00aa6c] hover:bg-[#00885a] text-white px-8 py-3 rounded-none">
              READ ALL REVIEWS ON TRIPADVISOR
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

