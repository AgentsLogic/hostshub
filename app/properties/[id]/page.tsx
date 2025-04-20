import type { Metadata } from "next"
import { PropertyDetails } from "@/components/properties/property-details"

export const metadata: Metadata = {
  title: "Property Details",
  description: "View and edit property details",
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  return <PropertyDetails propertyId={params.id} />
}

