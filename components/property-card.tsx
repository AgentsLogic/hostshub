"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Edit, Eye, MapPin, Star, Bed, Bath, Users } from "lucide-react"
import type { Property } from "@/hooks/use-properties"

interface PropertyCardProps {
  property: Property
}

export function PropertyCard({ property }: PropertyCardProps) {
  // Create a formatted location string
  const location = `${property.location.city}, ${property.location.state}`

  // Use the first image or a placeholder
  const imageUrl =
    property.images && property.images.length > 0 ? property.images[0] : "/placeholder.svg?height=192&width=384"

  return (
    <Card className="overflow-hidden border"> {/* Added border */}
      <div className="relative h-48 w-full">
        <Image src={imageUrl || "/placeholder.jpg"} alt={property.title} fill className="object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant={property.status === "active" ? "default" : "secondary"}>
            {property.status === "active" ? "Active" : property.status === "inactive" ? "Inactive" : "Pending"}
          </Badge>
        </div>
      </div>
      <CardContent className="p-3"> {/* Adjusted padding */}
        <div className="space-y-1.5"> {/* Adjusted spacing */}
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg truncate">{property.title}</h3>
            {/* Removed rating display as 'rating' property doesn't exist on type */}
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="text-sm truncate">{location}</span>
          </div>
          {/* <p className="text-sm text-muted-foreground line-clamp-2">{property.description}</p> */} {/* Description commented out for brevity */}
          <div className="flex items-center justify-between text-sm text-muted-foreground pt-1"> {/* Adjusted pt */}
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span className="text-xs"> {/* Smaller text */}
                {property.bedrooms} {property.bedrooms === 1 ? "bed" : "beds"}
              </span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span className="text-xs"> {/* Smaller text */}
                {property.bathrooms} {property.bathrooms === 1 ? "bath" : "baths"}
              </span>
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              <span className="text-xs"> {/* Smaller text */}
                {property.maxGuests} {property.maxGuests === 1 ? "guest" : "guests"}
              </span>
            </div>
          </div>
          <div className="pt-1"> {/* Adjusted pt */}
            <p className="font-semibold">
              ${property.price}
              <span className="text-sm font-normal text-muted-foreground"> / night</span>
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-3 pt-0 flex justify-between"> {/* Adjusted padding */}
        <Link href={`/dashboard/properties/${property.id}`}>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
        </Link>
        <Link href={`/dashboard/properties/${property.id}/edit`}>
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
