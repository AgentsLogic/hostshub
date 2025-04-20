import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PencilIcon, BarChart3Icon, Globe } from "lucide-react"

interface PropertyCardProps {
  property: {
    id: string
    name: string
    location: string
    imageUrl: string
    status: string
    visitors: number
    bookings: number
    revenue: number
  }
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 w-full overflow-hidden">
        <img
          src={property.imageUrl || "/placeholder.svg"}
          alt={property.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold" style={{ color: "#4682B4" }}>
              {property.name}
            </h3>
            <p className="text-sm" style={{ color: "#4A5568" }}>
              {property.location}
            </p>
          </div>
          <Badge variant={property.status === "published" ? "default" : "outline"}>
            {property.status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col">
            <span style={{ color: "#4A5568" }}>Visitors</span>
            <span className="font-medium">{property.visitors}</span>
          </div>
          <div className="flex flex-col">
            <span style={{ color: "#4A5568" }}>Bookings</span>
            <span className="font-medium">{property.bookings}</span>
          </div>
          <div className="flex flex-col">
            <span style={{ color: "#4A5568" }}>Revenue</span>
            <span className="font-medium">${property.revenue}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex flex-wrap gap-2">
        <Link href={`/dashboard/properties/${property.id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            <PencilIcon className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </Link>
        <Link href={`/dashboard/properties/${property.id}/analytics`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">
            <BarChart3Icon className="h-4 w-4 mr-2" />
            Analytics
          </Button>
        </Link>
        {property.status === "published" && (
          <Link href={`/property/${property.id}`} target="_blank" className="flex-1">
            <Button className="w-full" size="sm" style={{ backgroundColor: "#2E8B57", color: "white" }}>
              <Globe className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  )
}

