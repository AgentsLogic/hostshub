"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Check, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AirbnbIntegrationPage() {
  const { toast } = useToast()
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [airbnbId, setAirbnbId] = useState("")
  const [connectionError, setConnectionError] = useState<string | null>(null)

  // Mock property data that would be fetched from Airbnb API
  const [propertyData, setPropertyData] = useState<any>(null)

  const handleConnect = async () => {
    if (!airbnbId) {
      toast({
        title: "Error",
        description: "Please enter an Airbnb listing ID",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    setConnectionError(null)

    try {
      // Simulate API call to Airbnb
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful connection
      if (airbnbId === "12345678") {
        setIsConnected(true)
        setPropertyData({
          name: "Luxury Beach Villa",
          location: "Malibu, California",
          description: "Experience the ultimate beachfront luxury in this stunning villa with panoramic ocean views.",
          bedrooms: 3,
          bathrooms: 2,
          price: 450,
          rating: 4.9,
          reviews: 124,
          images: [
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
            "/placeholder.svg?height=600&width=800",
          ],
        })

        toast({
          title: "Success!",
          description: "Your Airbnb listing has been connected successfully.",
        })
      } else {
        // Mock error
        throw new Error("Could not find an Airbnb listing with this ID. Please check and try again.")
      }
    } catch (error: any) {
      setConnectionError(error.message)
      toast({
        title: "Connection failed",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleImport = async () => {
    setIsConnecting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Import successful!",
        description: "Your Airbnb listing data has been imported to your property.",
      })
    } catch (error: any) {
      toast({
        title: "Import failed",
        description: error.message || "Failed to import data from Airbnb",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleDisconnect = async () => {
    setIsConnecting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setIsConnected(false)
      setPropertyData(null)
      setAirbnbId("")

      toast({
        title: "Disconnected",
        description: "Your Airbnb listing has been disconnected.",
      })
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to disconnect Airbnb listing",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Airbnb Integration"
        text="Connect your Airbnb listings to automatically import data and sync bookings."
      />

      <Tabs defaultValue="connect" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connect">Connect Listing</TabsTrigger>
          <TabsTrigger value="settings" disabled={!isConnected}>
            Sync Settings
          </TabsTrigger>
          <TabsTrigger value="history" disabled={!isConnected}>
            Sync History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connect" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect your Airbnb Listing</CardTitle>
              <CardDescription>Enter your Airbnb listing ID to connect and import data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isConnected ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="airbnbId">Airbnb Listing ID</Label>
                    <div className="flex gap-2">
                      <Input
                        id="airbnbId"
                        placeholder="e.g. 12345678"
                        value={airbnbId}
                        onChange={(e) => setAirbnbId(e.target.value)}
                        disabled={isConnecting}
                      />
                      <Button onClick={handleConnect} disabled={isConnecting}>
                        {isConnecting ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          "Connect"
                        )}
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Find your listing ID in the URL of your Airbnb listing page
                    </p>
                  </div>

                  {connectionError && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{connectionError}</AlertDescription>
                    </Alert>
                  )}

                  <div className="bg-muted p-4 rounded-md mt-6">
                    <h3 className="text-sm font-medium mb-2">What will be imported?</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center">
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
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Property details (title, description, amenities)</span>
                      </li>
                      <li className="flex items-center">
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
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Property images</span>
                      </li>
                      <li className="flex items-center">
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
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Reviews and ratings</span>
                      </li>
                      <li className="flex items-center">
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
                          className="mr-2 h-4 w-4 text-primary"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Calendar availability</span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <Alert className="bg-green-50 border-green-200">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Connected</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Your Airbnb listing is connected and ready to sync.
                    </AlertDescription>
                  </Alert>

                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Connected Listing</h3>
                    <div className="flex gap-4 items-start">
                      <div className="h-24 w-24 rounded-md overflow-hidden">
                        <img
                          src={propertyData?.images[0] || "/placeholder.svg?height=100&width=100"}
                          alt={propertyData?.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{propertyData?.name}</h4>
                        <p className="text-sm text-muted-foreground">{propertyData?.location}</p>
                        <div className="flex items-center mt-1">
                          <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm">
                            {propertyData?.rating} · {propertyData?.reviews} reviews
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" onClick={handleImport} disabled={isConnecting}>
                            {isConnecting ? (
                              <>
                                <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                                Importing...
                              </>
                            ) : (
                              "Import Data"
                            )}
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleDisconnect} disabled={isConnecting}>
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div>
                    <h3 className="text-lg font-medium mb-2">Property Details</h3>
                    <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Bedrooms</dt>
                        <dd>{propertyData?.bedrooms}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Bathrooms</dt>
                        <dd>{propertyData?.bathrooms}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Price per Night</dt>
                        <dd>${propertyData?.price}</dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-muted-foreground">Rating</dt>
                        <dd>{propertyData?.rating} / 5</dd>
                      </div>
                    </dl>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>Configure how your Airbnb listing data syncs with your property website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-sync calendar</h3>
                    <p className="text-sm text-muted-foreground">
                      Automatically sync availability calendar between Airbnb and your website
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sync reviews</h3>
                    <p className="text-sm text-muted-foreground">Import and display reviews from your Airbnb listing</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sync pricing</h3>
                    <p className="text-sm text-muted-foreground">
                      Keep pricing in sync between Airbnb and your website
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sync frequency</h3>
                    <p className="text-sm text-muted-foreground">How often to check for updates from Airbnb</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync History</CardTitle>
              <CardDescription>View the history of data syncs between Airbnb and your property website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Full data import</h3>
                      <p className="text-sm text-muted-foreground">All property data imported from Airbnb</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Today, 2:30 PM</p>
                      <p className="text-xs text-muted-foreground">Successful</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Calendar sync</h3>
                      <p className="text-sm text-muted-foreground">Availability calendar updated</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Today, 12:15 PM</p>
                      <p className="text-xs text-muted-foreground">Successful</p>
                    </div>
                  </div>
                  <Separator />
                  <div className="p-4 flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">Reviews sync</h3>
                      <p className="text-sm text-muted-foreground">2 new reviews imported</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Yesterday, 9:45 AM</p>
                      <p className="text-xs text-muted-foreground">Successful</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View All History</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

