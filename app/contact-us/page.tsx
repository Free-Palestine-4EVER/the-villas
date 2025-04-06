"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Clock, Plus, Minus, MessageCircle, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Villa prices
const VILLA_PRICES = {
  doubleRoom: 250,
  twinRoom: 250,
  tripleRoom: 320,
}

// Experience options and prices
const EXPERIENCES = [
  { name: "None", price: 0 },
  { name: "Camel Riding", price: 45 },
  { name: "Full Day Jeep Tour", price: 150 },
  { name: "Horse Riding", price: 100 },
  { name: "Hot Air Balloon", price: 200 },
  { name: "Sandboarding", price: 50 },
  { name: "Half Day Jeep Tour", price: 80 },
]

export default function ContactUsPage() {
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    arrivalDate: "",
    guests: 1,
    villas: {
      doubleRoom: 0,
      twinRoom: 0,
      tripleRoom: 0,
    },
    experiences: [] as { name: string; price: number }[],
    message: "",
  })

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [responseMessage, setResponseMessage] = useState("")
  const [totalPrice, setTotalPrice] = useState(0)
  const [experiencePrice, setExperiencePrice] = useState(0)

  // Calculate total price whenever relevant form fields change
  useEffect(() => {
    // Calculate villa costs
    const villaCost =
      formState.villas.doubleRoom * VILLA_PRICES.doubleRoom +
      formState.villas.twinRoom * VILLA_PRICES.twinRoom +
      formState.villas.tripleRoom * VILLA_PRICES.tripleRoom

    // Calculate experience cost (price per person * number of guests for each experience)
    const experienceCost = formState.experiences.reduce((total, exp) => total + exp.price * formState.guests, 0)

    // Set total price
    setTotalPrice(villaCost + experienceCost)
  }, [formState.villas, formState.experiences, formState.guests])

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Handle select changes
  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  // Handle number input changes
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const numValue = Number.parseInt(value) || 1
    setFormState((prev) => ({ ...prev, [name]: Math.max(1, numValue) }))
  }

  // Handle villa quantity changes
  const handleVillaChange = (villa: keyof typeof VILLA_PRICES, change: number) => {
    setFormState((prev) => ({
      ...prev,
      villas: {
        ...prev.villas,
        [villa]: Math.max(0, prev.villas[villa] + change),
      },
    }))
  }

  const handleAddExperience = (experienceName: string) => {
    if (experienceName === "None") return

    // Find the experience in the EXPERIENCES array
    const experience = EXPERIENCES.find((exp) => exp.name === experienceName)
    if (!experience) return

    // Check if this experience is already added
    const isAlreadyAdded = formState.experiences.some((exp) => exp.name === experienceName)
    if (isAlreadyAdded) return

    // Add the experience to the array
    setFormState((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { name: experienceName, price: experience.price }],
    }))
  }

  const handleRemoveExperience = (experienceName: string) => {
    setFormState((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.name !== experienceName),
    }))
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted", formState)
    setIsSubmitting(true)
    setResponseMessage("Processing your booking request...")

    try {
      // Check if at least one villa is selected
      if (!hasSelectedVilla) {
        setResponseMessage("Please select at least one room to continue")
        setIsSubmitting(false)
        return
      }

      // Use fetch to call the API route instead of the server action
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formState,
          totalPrice: totalPrice,
        }),
      })

      const result = await response.json()
      console.log("API response:", result)

      if (response.ok) {
        setResponseMessage(result.message)
        setIsSubmitted(true)
      } else {
        setResponseMessage(result.message || "Failed to send booking request. Please try again later.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      const errorMessage = error instanceof Error ? error.message : String(error)
      setResponseMessage(`Failed to send booking request. Error: ${errorMessage}`)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Reset form
  const resetForm = () => {
    setFormState({
      name: "",
      email: "",
      phone: "",
      country: "",
      arrivalDate: "",
      guests: 1,
      villas: {
        doubleRoom: 0,
        twinRoom: 0,
        tripleRoom: 0,
      },
      experiences: [] as { name: string; price: number }[],
      message: "",
    })
    setIsSubmitted(false)
  }

  // Check if any villa is selected
  const hasSelectedVilla =
    formState.villas.doubleRoom > 0 || formState.villas.twinRoom > 0 || formState.villas.tripleRoom > 0

  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src="/images/contact-us-hero.jpeg"
          alt="Contact Us - Wadi Rum Resort"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 md:p-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center mb-4">Contact Us</h1>
          <p className="text-xl text-white text-center max-w-3xl">
            We're here to help plan your perfect desert experience
          </p>
        </div>
      </div>

      <section className="py-16 px-0 md:px-6 bg-white">
        <div className="container mx-auto">
          {/* Responsive grid layout - stacked on mobile, side-by-side on desktop */}
          <div className="flex flex-col md:grid md:grid-cols-3 gap-8 md:gap-12 items-start mb-16">
            {/* Info section - now visible on mobile and appears first */}
            <div className="md:col-span-1 w-full order-1 md:order-1">
              <h2 className="text-2xl font-semibold mb-6">Get In Touch</h2>
              <p className="text-gray-700 mb-8">
                Have questions about our resort, tours, or booking? We're here to help! Fill out the form and our team
                will get back to you as soon as possible.
              </p>

              <div className="grid gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Location</h3>
                    <p className="text-gray-600">Wadi Rum Protected Area, Jordan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+962 7 7526 3333</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">thevillaswr@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <Clock className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Office Hours</h3>
                    <p className="text-gray-600">24/7 - We're always available for our guests</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Button - below contact info */}
              <div className="mt-8 mb-8 md:mb-0">
                <a
                  href="https://wa.me/962775263333"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Contact us via WhatsApp</span>
                </a>
                <p className="text-sm text-gray-500 mt-2 text-center">Quick response during business hours</p>
              </div>
            </div>

            {/* Booking Form Section */}
            <div className="md:col-span-2 bg-[rgb(185,28,28)] p-8 rounded-lg shadow-md w-full order-2 md:order-2">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-[rgb(185,28,28)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">Thank You!</h3>
                  <p className="text-white mb-6">{responseMessage}</p>
                  <Button
                    onClick={resetForm}
                    className="bg-white text-[rgb(185,28,28)] hover:bg-white hover:text-[rgb(185,28,28)]"
                  >
                    Make Another Booking
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 text-white">
                  <h2 className="text-2xl font-semibold mb-6">Book Your Stay</h2>

                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-white/30 pb-2">Personal Information</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name" className="text-white">
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="email" className="text-white">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formState.phone}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="country" className="text-white">
                          Country
                        </Label>
                        <Input
                          id="country"
                          name="country"
                          value={formState.country}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-white/30 pb-2">Booking Details</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="arrivalDate" className="text-white">
                          Arrival Date
                        </Label>
                        <Input
                          id="arrivalDate"
                          name="arrivalDate"
                          type="date"
                          value={formState.arrivalDate}
                          onChange={handleChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="guests" className="text-white">
                          Number of Guests
                        </Label>
                        <Input
                          id="guests"
                          name="guests"
                          type="number"
                          min="1"
                          value={formState.guests}
                          onChange={handleNumberChange}
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Villa Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-white/30 pb-2">Choose Your Accommodation</h3>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
                        <div>
                          <p className="font-medium">Double Room</p>
                          <p className="text-sm text-white/80">{VILLA_PRICES.doubleRoom} JOD per night</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent border-white text-white hover:bg-white/20"
                            onClick={() => handleVillaChange("doubleRoom", -1)}
                            disabled={formState.villas.doubleRoom === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">{formState.villas.doubleRoom}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent border-white text-white hover:bg-white/20"
                            onClick={() => handleVillaChange("doubleRoom", 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
                        <div>
                          <p className="font-medium">Twin Room</p>
                          <p className="text-sm text-white/80">{VILLA_PRICES.twinRoom} JOD per night</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent border-white text-white hover:bg-white/20"
                            onClick={() => handleVillaChange("twinRoom", -1)}
                            disabled={formState.villas.twinRoom === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">{formState.villas.twinRoom}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent border-white text-white hover:bg-white/20"
                            onClick={() => handleVillaChange("twinRoom", 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-white/10 rounded-md">
                        <div>
                          <p className="font-medium">Triple Room</p>
                          <p className="text-sm text-white/80">{VILLA_PRICES.tripleRoom} JOD per night</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent border-white text-white hover:bg-white/20"
                            onClick={() => handleVillaChange("tripleRoom", -1)}
                            disabled={formState.villas.tripleRoom === 0}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-6 text-center">{formState.villas.tripleRoom}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-full bg-transparent border-white text-white hover:bg-white/20"
                            onClick={() => handleVillaChange("tripleRoom", 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Experience Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-white/30 pb-2">Choose Your Experiences</h3>

                    <div className="grid gap-2">
                      <Label htmlFor="experience" className="text-white">
                        Desert Experiences
                      </Label>
                      <div className="flex gap-2">
                        <Select onValueChange={(value) => handleAddExperience(value)}>
                          <SelectTrigger className="bg-white/10 border-white/20 text-white flex-1">
                            <SelectValue placeholder="Add an experience" />
                          </SelectTrigger>
                          <SelectContent>
                            {EXPERIENCES.map((exp) => (
                              <SelectItem key={exp.name} value={exp.name}>
                                {exp.name} {exp.price > 0 && `(${exp.price} JOD per person)`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Selected Experiences */}
                      <div className="mt-2 space-y-2">
                        {formState.experiences.length === 0 ? (
                          <p className="text-white/70 italic text-sm">No experiences selected</p>
                        ) : (
                          formState.experiences.map((exp) => (
                            <div key={exp.name} className="flex items-center justify-between">
                              <span className="text-white">
                                {exp.name} ({exp.price} JOD per person)
                              </span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 text-white hover:text-white/70"
                                onClick={() => handleRemoveExperience(exp.name)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium border-b border-white/30 pb-2">Special Requests</h3>

                    <div className="grid gap-2">
                      <Label htmlFor="message" className="text-white">
                        Message to Host
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="Any special requests or questions?"
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="border border-white/30 rounded-md overflow-hidden">
                    <div className="p-4 bg-white/10">
                      <h3 className="text-lg font-medium">Booking Summary</h3>
                    </div>

                    <div className="p-4 space-y-4">
                      {/* Accommodation Summary */}
                      <div>
                        <h4 className="font-medium mb-2">Accommodation:</h4>
                        {!hasSelectedVilla && <p className="text-white/70 italic">No rooms selected</p>}
                        <ul className="space-y-1">
                          {formState.villas.doubleRoom > 0 && (
                            <li className="flex justify-between">
                              <span>{formState.villas.doubleRoom} × Double Room</span>
                              <span>{formState.villas.doubleRoom * VILLA_PRICES.doubleRoom} JOD</span>
                            </li>
                          )}
                          {formState.villas.twinRoom > 0 && (
                            <li className="flex justify-between">
                              <span>{formState.villas.twinRoom} × Twin Room</span>
                              <span>{formState.villas.twinRoom * VILLA_PRICES.twinRoom} JOD</span>
                            </li>
                          )}
                          {formState.villas.tripleRoom > 0 && (
                            <li className="flex justify-between">
                              <span>{formState.villas.tripleRoom} × Triple Room</span>
                              <span>{formState.villas.tripleRoom * VILLA_PRICES.tripleRoom} JOD</span>
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Experience Summary */}
                      <div>
                        <h4 className="font-medium mb-2">Experiences:</h4>
                        {formState.experiences.length === 0 ? (
                          <p className="text-white/70 italic">No experiences selected</p>
                        ) : (
                          <ul className="space-y-1">
                            {formState.experiences.map((exp) => (
                              <li key={exp.name} className="flex justify-between">
                                <span>
                                  {exp.name} ({exp.price} JOD × {formState.guests} guests)
                                </span>
                                <span>{exp.price * formState.guests} JOD</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Total */}
                      <div className="pt-4 border-t border-white/30">
                        <div className="flex justify-between font-bold">
                          <span>Total:</span>
                          <span>{totalPrice} JOD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-white hover:bg-white text-[rgb(185,28,28)] py-3 font-bold"
                    disabled={isSubmitting || !hasSelectedVilla}
                  >
                    {isSubmitting ? "Processing..." : "Book Now"}
                  </Button>

                  {!hasSelectedVilla && (
                    <p className="text-sm text-white/80 text-center">Please select at least one room to continue</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Separate Map Section */}
          <div className="w-full mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6">How to Find Us</h2>
            <div className="w-full rounded-lg overflow-hidden">
              {/* Google Maps Embed */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.5498833236394!2d35.43!3d29.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xa7283b7bf3702b04!2sThe%20Villas%20-%20Bedouin%20Boutique%20Resort!5e0!3m2!1sen!2sus!4v1712188800000!5m2!1sen!2sus"
                width="100%"
                height="700"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="The Villas - Bedouin Boutique Resort Location"
              ></iframe>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-2">From Aqaba</h3>
                <p className="text-gray-600">
                  Take the Desert Highway north for approximately 40 minutes, then follow signs to Wadi Rum Village. Our
                  resort is located 10km inside the protected area. Transportation from the village can be arranged.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">From Amman</h3>
                <p className="text-gray-600">
                  Take the Desert Highway south for approximately 4 hours, then follow signs to Wadi Rum Village. We
                  recommend arranging transportation in advance for the most comfortable journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

