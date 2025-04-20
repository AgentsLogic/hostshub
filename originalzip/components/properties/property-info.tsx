"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Bed, Bath, Users, MapPin, Wifi, Car, Tv, Utensils } from "lucide-react"

export function PropertyInfo({ propertyId = "p1" }) {
  // This would typically fetch property data based on the ID
  const property = {
    id: propertyId,
    name: "Seaside Villa",
    type: "Villa",
    address: "123 Ocean Drive",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    country: "USA",
    description:
      "A beautiful seaside villa with stunning ocean views. Perfect for family vacations or romantic getaways. Enjoy the private pool, spacious terrace, and direct beach access.",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    squareFeet: 2200,
    price: 250,
    cleaningFee: 100,
    securityDeposit: 500,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    amenities: ["Wi-Fi", "Air Conditioning", "Heating", "Kitchen", "TV", "Free Parking", "Pool", "Beach Access"],
    status: "active",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{property.name}</h2>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-1 h-4 w-4" />
            {property.address}, {property.city}, {property.state} {property.zipCode}
          </div>
        </div>
        <Badge variant={property.status === "active" ? "default" : "secondary"}>
          {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Basic information about the property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Type</div>
                <div>{property.type}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Size</div>
                <div>{property.squareFeet} sq ft</div>
              </div>
            </div>
            <Separator />
            <div className="flex justify-between">
              <div className="flex items-center">
                <Bed className="mr-2 h-5 w-5" />
                <div>
                  <div className="text-sm font-medium">Bedrooms</div>
                  <div>{property.bedrooms}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Bath className="mr-2 h-5 w-5" />
                <div>
                  <div className="text-sm font-medium">Bathrooms</div>
                  <div>{property.bathrooms}</div>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                <div>
                  <div className="text-sm font-medium">Max Guests</div>
                  <div>{property.maxGuests}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pricing Information</CardTitle>
            <CardDescription>Rates and fees for this property</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Nightly Rate</div>
                <div className="text-2xl font-bold">${property.price}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Cleaning Fee</div>
                <div>${property.cleaningFee}</div>
              </div>
            </div>
            <Separator />
            <div>
              <div className="text-sm font-medium">Security Deposit</div>
              <div>${property.securityDeposit}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Check-in</div>
                <div>{property.checkInTime}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Check-out</div>
                <div>{property.checkOutTime}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{property.description}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Amenities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {property.amenities.map((amenity) => (
              <div key={amenity} className="flex items-center">
                {amenity === "Wi-Fi" ? (
                  <Wifi className="mr-2 h-4 w-4" />
                ) : amenity === "Free Parking" ? (
                  <Car className="mr-2 h-4 w-4" />
                ) : amenity === "TV" ? (
                  <Tv className="mr-2 h-4 w-4" />
                ) : amenity === "Kitchen" ? (
                  <Utensils className="mr-2 h-4 w-4" />
                ) : (
                  <div className="mr-2 h-4 w-4" />
                )}
                {amenity}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

