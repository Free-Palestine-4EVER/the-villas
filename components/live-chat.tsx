"use client"

import type React from "react"

import { useState } from "react"
import { MessageCircle, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! How can we help you today?", isUser: false },
  ])
  const [inputValue, setInputValue] = useState("")

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    // Add user message
    setMessages([...messages, { text: inputValue, isUser: true }])
    setInputValue("")

    // Simulate response after a short delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our team will respond shortly. For immediate assistance, please use our WhatsApp button or call us directly.",
          isUser: false,
        },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      <Button
        onClick={toggleChat}
        className={`rounded-full w-14 h-14 shadow-lg ${isOpen ? "bg-red-700" : "bg-red-600"} hover:bg-red-700 transition-all`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 text-white p-4">
            <h3 className="font-semibold">The Villas Resort Chat</h3>
            <p className="text-xs opacity-80">We typically reply within minutes</p>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.isUser ? "bg-red-100 ml-auto rounded-br-none" : "bg-gray-100 rounded-bl-none"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700 px-3">
              <Send className="h-5 w-5" />
            </Button>
          </form>

          {/* App download info */}
          <div className="bg-gray-50 p-3 text-xs text-gray-600 border-t border-gray-200">
            <p>Download our app to continue this conversation:</p>
            <div className="flex gap-2 mt-1">
              <a href="#" className="text-red-600 hover:underline">
                iOS App
              </a>
              <span>•</span>
              <a href="#" className="text-red-600 hover:underline">
                Android App
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

