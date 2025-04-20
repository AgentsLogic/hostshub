"use client"

import { useState, useEffect } from "react"

// Define the Property type
export interface Property {
  id: string
  title: string
  description: string
  location: {
    address: string
    city: string
    state: string
    zip: string
    country: string
  }
  price: number
  bedrooms: number
  bathrooms: number
  maxGuests: number
  amenities: string[]
  images: string[]
  status: "active" | "inactive" | "pending"
  rating: number
  reviews: number
}

// Mock properties data
const mockProperties: Property[] = [
  {
    id: "1",
    title: "Luxury Beach House",
    description: "Beautiful beachfront property with stunning ocean views",
    location: {
      address: "123 Ocean Drive",
      city: "Malibu",
      state: "CA",
      zip: "90210",
      country: "USA",
    },
    price: 350,
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    amenities: ["Wi-Fi", "Pool", "Beach Access", "Kitchen", "Air Conditioning"],
    images: ["/placeholder.svg?height=300&width=500"],
    status: "active",
    rating: 4.9,
    reviews: 124,
  },
  {
    id: "2",
    title: "Downtown Loft",
    description: "Modern loft in the heart of the city",
    location: {
      address: "456 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    price: 200,
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    amenities: ["Wi-Fi", "Gym", "Parking", "Kitchen", "Air Conditioning"],
    images: ["/placeholder.svg?height=300&width=500"],
    status: "active",
    rating: 4.7,
    reviews: 89,
  },
  {
    id: "3",
    title: "Mountain Cabin",
    description: "Cozy cabin with mountain views",
    location: {
      address: "789 Pine Road",
      city: "Aspen",
      state: "CO",
      zip: "81611",
      country: "USA",
    },
    price: 180,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: ["Wi-Fi", "Fireplace", "Hot Tub", "Kitchen", "Heating"],
    images: ["/placeholder.svg?height=300&width=500"],
    status: "active",
    rating: 4.8,
    reviews: 56,
  },
]

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Use mock data for testing
        setProperties(mockProperties)
      } catch (error) {
        console.error("Error fetching properties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return { properties, isLoading }
}

