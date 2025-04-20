"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { getProperty, type Property, type PropertyImage } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ModernTemplate } from "@/app/templates/components/modern-template"
import { LuxuryTemplate } from "@/app/templates/components/luxury-template"
import { RusticTemplate } from "@/app/templates/components/rustic-template"

export default function PropertyWebsitePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [property, setProperty] = useState<(Property & { property_images: PropertyImage[] }) | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error } = await getProperty(params.id)

        if (error) {
          throw error
        }

        if (data) {
          if (data.status !== "published") {
            throw new Error("This property website is not published yet.")
          }

          setProperty(data)
        }
      } catch (error: any) {
        setError(error.message || "Failed to load property")
        toast({
          title: "Error",
          description: error.message || "Failed to load property",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [params.id, toast])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error || "Property not found"}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  // Render the appropriate template based on the property's template setting
  switch (property.template) {
    case "luxury":
      return <LuxuryTemplate property={property} />
    case "rustic":
      return <RusticTemplate property={property} />
    case "modern":
    default:
      return <ModernTemplate property={property} />
  }
}

