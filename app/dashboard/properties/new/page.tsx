"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PropertyForm } from "@/components/forms/property-form"

export default function NewPropertyPage() {
  const router = useRouter()

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold">Add New Property</h1>
        </div>
      </div>

      <PropertyForm
        onSuccess={(property) => {
          router.push(`/dashboard/properties/${property.id}`)
        }}
      />
    </div>
  )
}

