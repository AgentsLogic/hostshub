import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { PropertyCard } from "@/components/property-card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

// Mock properties data
const properties = [
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

export default function PropertiesPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Manage your properties and listings</p>
        </div>
        <Link href="/dashboard/properties/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </DashboardShell>
  )
}

