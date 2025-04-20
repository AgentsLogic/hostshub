"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Users, MapPin, Star } from "lucide-react"
import Link from "next/link"

interface Property {
  id: string
  name: string
  type: string
  location: string
  image: string
  bedrooms: number
  bathrooms: number
  maxGuests: number
  rating: number
  price: number
  status: "active" | "inactive" | "maintenance"
}

const properties: Property[] = [
  {
    id: "p1",
    name: "Seaside Villa",
    type: "Villa",
    location: "Miami, FL",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    rating: 4.8,
    price: 250,
    status: "active",
  },
  {
    id: "p2",
    name: "Mountain Cabin",
    type: "Cabin",
    location: "Aspen, CO",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    rating: 4.6,
    price: 180,
    status: "active",
  },
  {
    id: "p3",
    name: "Downtown Loft",
    type: "Apartment",
    location: "New York, NY",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    rating: 4.5,
    price: 150,
    status: "inactive",
  },
  {
    id: "p4",
    name: "Lakefront Cottage",
    type: "Cottage",
    location: "Lake Tahoe, CA",
    image: "/placeholder.svg?height=300&width=400",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 5,
    rating: 4.9,
    price: 220,
    status: "maintenance",
  },
]

export function PropertiesGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {properties.map((property) => (
        <Card key={property.id} className="overflow-hidden">
          <div className="relative">
            <img src={property.image || "/placeholder.jpg"} alt={property.name} className="h-48 w-full object-cover" />
            <Badge
              className="absolute right-2 top-2"
              variant={
                property.status === "active"
                  ? "default"
                  : property.status === "maintenance"
                    ? "destructive"
                    : "secondary"
              }
            >
              {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
            </Badge>
          </div>
          <CardHeader className="p-4 pb-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold">{property.name}</h3>
                <p className="text-sm text-muted-foreground">{property.type}</p>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 fill-primary text-primary" />
                <span className="text-sm font-medium">{property.rating}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="mr-1 h-4 w-4" />
              {property.location}
            </div>
            <div className="mt-2 flex space-x-4 text-sm">
              <div className="flex items-center">
                <Bed className="mr-1 h-4 w-4" />
                {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}
              </div>
              <div className="flex items-center">
                <Bath className="mr-1 h-4 w-4" />
                {property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"}
              </div>
              <div className="flex items-center">
                <Users className="mr-1 h-4 w-4" />
                {property.maxGuests} guests
              </div>
            </div>
            <div className="mt-2 text-lg font-bold">
              ${property.price} <span className="text-sm font-normal text-muted-foreground">/ night</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
