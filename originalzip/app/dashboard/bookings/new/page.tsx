"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BookingForm } from "@/components/forms/booking-form"
import { getProperties } from "@/lib/data-access/properties"

export default function NewBookingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const propertyId = searchParams.get("propertyId")
  const [properties, setProperties] = useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties()
        setProperties(
          data.map((property: any) => ({
            id: property.id,
            name: property.name,
          })),
        )
      } catch (error) {
        console.error("Failed to load properties:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperties()
  }, [])

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Create New Booking</h1>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <BookingForm
          propertyId={propertyId || undefined}
          properties={properties}
          onSuccess={(booking) => {
            router.push(`/dashboard/bookings/${booking.id}`)
          }}
        />
      )}
    </div>
  )
}

