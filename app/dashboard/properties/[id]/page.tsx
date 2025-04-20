"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle, Edit, Globe, BarChart3, Calendar, MessageSquare } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useProperty } from "@/hooks/use-property"

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const { property, isLoading, error } = useProperty(params.id)

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardShell>
    )
  }

  if (error && !property) {
    return (
      <DashboardShell>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading={property?.name || "Property Details"} text={property?.location || ""}>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.push(`/dashboard/properties/${params.id}/edit`)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Property
          </Button>
          {property?.status === "published" && (
            <Button onClick={() => window.open(`/property/${params.id}`, "_blank")}>
              <Globe className="mr-2 h-4 w-4" />
              View Website
            </Button>
          )}
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Property Preview */}
        <Card className="md:col-span-2">
          <CardContent className="p-0">
            <div className="aspect-video w-full overflow-hidden">
              {property?.property_images && property.property_images.length > 0 ? (
                <img
                  src={property.property_images.find((img) => img.is_cover)?.url || property.property_images[0].url}
                  alt={property.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground">No images available</p>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold">{property?.name}</h2>
                  <p className="text-muted-foreground">{property?.location}</p>
                </div>
                <Badge variant={property?.status === "published" ? "default" : "outline"}>
                  {property?.status === "published" ? "Published" : "Draft"}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M2 12h20" />
                    <path d="M2 12v8a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-8" />
                    <path d="M7 12v-6a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v6" />
                    <path d="M6 20v-4" />
                    <path d="M18 20v-4" />
                  </svg>
                  <span>{property?.bedrooms} Bedrooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M9 6 A3 3 0 0 1 12 3 A3 3 0 0 1 15 6 A3 3 0 0 1 12 9 A3 3 0 0 1 9 6 z" />
                    <path d="M9 18 A3 3 0 0 1 12 15 A3 3 0 0 1 15 18 A3 3 0 0 1 12 21 A3 3 0 0 1 9 18 z" />
                    <path d="M6 12 A3 3 0 0 1 3 9 A3 3 0 0 1 0 12 A3 3 0 0 1 3 15 A3 3 0 0 1 6 12 z" />
                    <path d="M18 12 A3 3 0 0 1 15 9 A3 3 0 0 1 12 12 A3 3 0 0 1 15 15 A3 3 0 0 1 18 12 z" />
                  </svg>
                  <span>{property?.bathrooms} Bathrooms</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4 text-muted-foreground"
                  >
                    <path d="M12 2v20" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                  <span>${property?.price_per_night} per night</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground">{property?.description || "No description provided."}</p>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-semibold mb-2">Website</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Template:</span>
                    <span className="capitalize">{property?.template || "Modern"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subdomain:</span>
                    <span>{property?.subdomain}.hosthub.com</span>
                  </div>
                  {property?.custom_domain && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Custom Domain:</span>
                      <span>{property?.custom_domain}</span>
                    </div>
                  )}
                </div>
              </div>

              <Separator className="my-4" />

              <div>
                <h3 className="font-semibold mb-2">Integrations</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Airbnb:</span>
                    <span>{property?.airbnb_id ? "Connected" : "Not connected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VRBO:</span>
                    <span>{property?.vrbo_id ? "Connected" : "Not connected"}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your property website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push(`/dashboard/properties/${params.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Property
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push(`/dashboard/properties/${params.id}/analytics`)}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push(`/dashboard/properties/${params.id}/calendar`)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Calendar
                </Button>
                <Button
                  variant="outline"
                  className="justify-start"
                  onClick={() => router.push(`/dashboard/properties/${params.id}/messages`)}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Guest Messages
                </Button>
                {property?.status === "published" ? (
                  <Button className="justify-start" onClick={() => window.open(`/property/${params.id}`, "_blank")}>
                    <Globe className="mr-2 h-4 w-4" />
                    View Website
                  </Button>
                ) : (
                  <Button className="justify-start">
                    <Globe className="mr-2 h-4 w-4" />
                    Publish Website
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Visitors</span>
                  <span className="font-medium">245</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Page Views</span>
                  <span className="font-medium">789</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bookings</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-medium">${property?.price_per_night ? property.price_per_night * 12 : 0}</span>
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(`/dashboard/properties/${params.id}/analytics`)}
                >
                  View Full Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-6">
        <Tabs defaultValue="images" className="space-y-4">
          <TabsList>
            <TabsTrigger value="images">Images</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Property Images</CardTitle>
                <CardDescription>Manage your property images</CardDescription>
              </CardHeader>
              <CardContent>
                {property?.property_images && property.property_images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.property_images.map((image) => (
                      <div key={image.id} className="relative aspect-square rounded-md overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt="Property"
                          className="w-full h-full object-cover"
                        />
                        {image.is_cover && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                            Cover
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No images available</p>
                    <Button className="mt-4" onClick={() => router.push(`/dashboard/properties/${params.id}/edit`)}>
                      Add Images
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Bookings</CardTitle>
                <CardDescription>Manage your property bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No bookings available</p>
                  <Button className="mt-4" variant="outline">
                    View Calendar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Reviews</CardTitle>
                <CardDescription>Manage your property reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No reviews available</p>
                  {property?.airbnb_id && (
                    <Button className="mt-4" variant="outline">
                      Import Reviews from Airbnb
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

