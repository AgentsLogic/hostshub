"use client"

import { Input } from "@/components/ui/input"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Tablet,
  Monitor,
  Share2,
  QrCode,
  Copy,
  Check,
  RefreshCw,
  Home,
  MessageSquare,
  Calendar,
  User,
  Settings,
  ChevronLeft,
  Star,
  MapPin,
  DollarSign,
  Clock,
  Info,
  Send,
} from "lucide-react"

export default function MobilePreviewPage() {
  const { toast } = useToast()
  const [selectedProperty, setSelectedProperty] = useState("beach-villa")
  const [selectedDevice, setSelectedDevice] = useState("smartphone")
  const [selectedScreen, setSelectedScreen] = useState("guest-app")
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock data for properties
  const properties = [
    { id: "beach-villa", name: "Beach Villa" },
    { id: "mountain-cabin", name: "Mountain Cabin" },
    { id: "city-apartment", name: "City Apartment" },
  ]

  // Mock data for property details
  const propertyDetails = {
    "beach-villa": {
      name: "Beach Villa",
      location: "Miami, FL",
      rating: 4.9,
      reviews: 28,
      price: 250,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "Stunning beachfront villa with panoramic ocean views. This luxurious 3-bedroom property features a private pool, modern amenities, and direct beach access.",
      checkInTime: "3:00 PM",
      checkOutTime: "11:00 AM",
      amenities: ["Pool", "WiFi", "Kitchen", "Beach Access", "Air Conditioning", "Free Parking"],
    },
    "mountain-cabin": {
      name: "Mountain Cabin",
      location: "Aspen, CO",
      rating: 4.8,
      reviews: 42,
      price: 180,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "Cozy mountain retreat surrounded by nature. This charming 2-bedroom cabin offers a fireplace, hot tub, and breathtaking mountain views.",
      checkInTime: "4:00 PM",
      checkOutTime: "10:00 AM",
      amenities: ["Hot Tub", "WiFi", "Fireplace", "Mountain View", "Heating", "Free Parking"],
    },
    "city-apartment": {
      name: "City Apartment",
      location: "New York, NY",
      rating: 4.7,
      reviews: 36,
      price: 220,
      image: "/placeholder.svg?height=300&width=500",
      description:
        "Modern apartment in the heart of the city. This stylish 1-bedroom unit features high-end finishes, city views, and is walking distance to major attractions.",
      checkInTime: "2:00 PM",
      checkOutTime: "11:00 AM",
      amenities: ["WiFi", "Kitchen", "City View", "Air Conditioning", "Gym Access", "Public Transit"],
    },
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://hostshub.ai/guest/${selectedProperty}`)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)

    toast({
      title: "Link Copied",
      description: "Guest portal link has been copied to clipboard.",
    })
  }

  const handleGenerateQR = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)

      toast({
        title: "QR Code Generated",
        description: "QR code has been generated and downloaded.",
      })
    }, 1500)
  }

  const getDeviceWidth = () => {
    switch (selectedDevice) {
      case "smartphone":
        return "w-[375px]"
      case "tablet":
        return "w-[768px]"
      case "desktop":
        return "w-[1024px]"
      default:
        return "w-[375px]"
    }
  }

  const getDeviceHeight = () => {
    switch (selectedDevice) {
      case "smartphone":
        return "h-[667px]"
      case "tablet":
        return "h-[1024px]"
      case "desktop":
        return "h-[768px]"
      default:
        return "h-[667px]"
    }
  }

  const getPropertyDetail = (propertyId: string) => {
    return propertyDetails[propertyId as keyof typeof propertyDetails] || propertyDetails["beach-villa"]
  }

  const currentProperty = getPropertyDetail(selectedProperty)

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Mobile Preview"
        text="Preview your property website and guest portal on different devices."
      >
        <div className="flex items-center gap-2">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {properties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Device Settings</CardTitle>
              <CardDescription>Choose device type and screen to preview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Device Type</h3>
                <div className="flex gap-2">
                  <Button
                    variant={selectedDevice === "smartphone" ? "default" : "outline"}
                    onClick={() => setSelectedDevice("smartphone")}
                    className="flex-1"
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    Phone
                  </Button>
                  <Button
                    variant={selectedDevice === "tablet" ? "default" : "outline"}
                    onClick={() => setSelectedDevice("tablet")}
                    className="flex-1"
                  >
                    <Tablet className="mr-2 h-4 w-4" />
                    Tablet
                  </Button>
                  <Button
                    variant={selectedDevice === "desktop" ? "default" : "outline"}
                    onClick={() => setSelectedDevice("desktop")}
                    className="flex-1"
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    Desktop
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Screen</h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedScreen === "guest-app" ? "default" : "outline"}
                    onClick={() => setSelectedScreen("guest-app")}
                    size="sm"
                  >
                    Guest App
                  </Button>
                  <Button
                    variant={selectedScreen === "property-details" ? "default" : "outline"}
                    onClick={() => setSelectedScreen("property-details")}
                    size="sm"
                  >
                    Property Details
                  </Button>
                  <Button
                    variant={selectedScreen === "booking" ? "default" : "outline"}
                    onClick={() => setSelectedScreen("booking")}
                    size="sm"
                  >
                    Booking
                  </Button>
                  <Button
                    variant={selectedScreen === "check-in" ? "default" : "outline"}
                    onClick={() => setSelectedScreen("check-in")}
                    size="sm"
                  >
                    Check-in
                  </Button>
                  <Button
                    variant={selectedScreen === "messages" ? "default" : "outline"}
                    onClick={() => setSelectedScreen("messages")}
                    size="sm"
                  >
                    Messages
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Share with Guests</CardTitle>
              <CardDescription>Share your guest portal with your guests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between border rounded-md p-3">
                <div className="text-sm truncate">https://hostshub.ai/guest/{selectedProperty}</div>
                <Button variant="ghost" size="icon" onClick={handleCopyLink}>
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" onClick={handleGenerateQR} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <QrCode className="mr-2 h-4 w-4" />
                      Generate QR
                    </>
                  )}
                </Button>
                <Button variant="outline">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share Link
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guest Portal Features</CardTitle>
              <CardDescription>Features available in your guest portal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Property Details</span>
                  </div>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Booking Management</span>
                  </div>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Messaging</span>
                  </div>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Local Guide</span>
                  </div>
                  <Badge>Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium">Payments</span>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 flex justify-center">
          <div
            className={`border-4 border-gray-800 rounded-[32px] ${getDeviceWidth()} ${getDeviceHeight()} overflow-hidden bg-white relative`}
          >
            {/* Phone Header with Notch */}
            {selectedDevice === "smartphone" && (
              <div className="absolute top-0 left-0 right-0 h-6 bg-black flex justify-center">
                <div className="w-40 h-6 bg-black rounded-b-xl"></div>
              </div>
            )}

            {/* App Content */}
            <div className="h-full overflow-y-auto pb-16">
              {/* Guest App Home Screen */}
              {selectedScreen === "guest-app" && (
                <div className="h-full">
                  {/* App Header */}
                  <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                    <div className="flex items-center">
                      <h1 className="text-lg font-bold">HostsHub</h1>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <MessageSquare className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <User className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Welcome Section */}
                  <div className="p-4 bg-primary/10">
                    <h2 className="text-lg font-medium">Welcome, Guest!</h2>
                    <p className="text-sm text-muted-foreground">Your stay at {currentProperty.name} is coming up.</p>
                  </div>

                  {/* Property Card */}
                  <div className="p-4">
                    <div className="rounded-lg border overflow-hidden">
                      <div className="aspect-video w-full relative">
                        <img
                          src={currentProperty.image || "/placeholder.svg"}
                          alt={currentProperty.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{currentProperty.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 mr-1" />
                              {currentProperty.location}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm ml-1">{currentProperty.rating}</span>
                          </div>
                        </div>

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          <Button size="sm">View Details</Button>
                          <Button size="sm" variant="outline">
                            Message Host
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" className="flex flex-col h-auto py-4 px-2">
                        <Calendar className="h-5 w-5 mb-1" />
                        <span className="text-xs">Check-in</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-auto py-4 px-2">
                        <Info className="h-5 w-5 mb-1" />
                        <span className="text-xs">House Info</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col h-auto py-4 px-2">
                        <MapPin className="h-5 w-5 mb-1" />
                        <span className="text-xs">Local Guide</span>
                      </Button>
                    </div>
                  </div>

                  {/* Upcoming Stay */}
                  <div className="p-4">
                    <h3 className="text-sm font-medium mb-3">Your Stay</h3>
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">Dec 15-20, 2023</div>
                        <Badge>Confirmed</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-4">5 nights • 2 guests</div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            Check-in
                          </div>
                          <div>{currentProperty.checkInTime}</div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                            Check-out
                          </div>
                          <div>{currentProperty.checkOutTime}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Home className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-xs">Booking</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-xs">Messages</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Settings className="h-5 w-5 mb-1" />
                      <span className="text-xs">Settings</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Property Details Screen */}
              {selectedScreen === "property-details" && (
                <div className="h-full">
                  {/* App Header */}
                  <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="mr-1">
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <h1 className="text-lg font-medium">Property Details</h1>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Property Images */}
                  <div className="aspect-video w-full relative">
                    <img
                      src={currentProperty.image || "/placeholder.svg"}
                      alt={currentProperty.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Property Info */}
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{currentProperty.name}</h2>
                    <div className="flex items-center mt-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {currentProperty.location}
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm ml-1">{currentProperty.rating}</span>
                      </div>
                      <span className="mx-2 text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">{currentProperty.reviews} reviews</span>
                    </div>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">Description</h3>
                        <p className="text-sm text-muted-foreground">{currentProperty.description}</p>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Amenities</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {currentProperty.amenities.map((amenity, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <Check className="h-4 w-4 mr-2 text-green-500" />
                              {amenity}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-2">Check-in & Check-out</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              Check-in
                            </div>
                            <div>{currentProperty.checkInTime}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                              Check-out
                            </div>
                            <div>{currentProperty.checkOutTime}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button className="w-full">Book Now</Button>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Home className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-xs">Booking</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-xs">Messages</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Settings className="h-5 w-5 mb-1" />
                      <span className="text-xs">Settings</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Booking Screen */}
              {selectedScreen === "booking" && (
                <div className="h-full">
                  {/* App Header */}
                  <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="mr-1">
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <h1 className="text-lg font-medium">Your Booking</h1>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Booking Details */}
                  <div className="p-4">
                    <div className="rounded-lg border overflow-hidden mb-4">
                      <div className="aspect-video w-full relative">
                        <img
                          src={currentProperty.image || "/placeholder.svg"}
                          alt={currentProperty.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-2 right-2">Confirmed</Badge>
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{currentProperty.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {currentProperty.location}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-3">Reservation Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Dates</div>
                            <div>Dec 15-20, 2023</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Guests</div>
                            <div>2 guests</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Check-in</div>
                            <div>{currentProperty.checkInTime}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Check-out</div>
                            <div>{currentProperty.checkOutTime}</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-3">Price Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">${currentProperty.price} x 5 nights</div>
                            <div>${currentProperty.price * 5}</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Cleaning fee</div>
                            <div>$75</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Service fee</div>
                            <div>$50</div>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-medium">
                            <div>Total</div>
                            <div>${currentProperty.price * 5 + 75 + 50}</div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-3">Payment</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Payment Method</div>
                            <div>Visa •••• 4242</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Status</div>
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Paid
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <Button className="w-full">Modify Booking</Button>
                      <Button variant="outline" className="w-full">
                        Contact Host
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Home className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-xs">Booking</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-xs">Messages</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Settings className="h-5 w-5 mb-1" />
                      <span className="text-xs">Settings</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Check-in Screen */}
              {selectedScreen === "check-in" && (
                <div className="h-full">
                  {/* App Header */}
                  <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="mr-1">
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <h1 className="text-lg font-medium">Check-in</h1>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Info className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* Check-in Content */}
                  <div className="p-4">
                    <div className="bg-primary/10 rounded-lg p-4 mb-4">
                      <h2 className="font-medium">Your check-in is tomorrow!</h2>
                      <p className="text-sm text-muted-foreground mt-1">Check-in time: {currentProperty.checkInTime}</p>
                    </div>

                    <div className="rounded-lg border overflow-hidden mb-4">
                      <div className="aspect-video w-full relative">
                        <img
                          src={currentProperty.image || "/placeholder.svg"}
                          alt={currentProperty.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-medium">{currentProperty.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {currentProperty.location}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-3">Check-in Instructions</h3>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <span className="text-xs font-bold">1</span>
                            </div>
                            <div>
                              <p>Arrive at the property after {currentProperty.checkInTime}.</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <span className="text-xs font-bold">2</span>
                            </div>
                            <div>
                              <p>
                                Enter the following code on the keypad at the main entrance:{" "}
                                <span className="font-bold">1234</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <span className="text-xs font-bold">3</span>
                            </div>
                            <div>
                              <p>
                                The keys to your unit will be in a lockbox to the right of the door. Code:{" "}
                                <span className="font-bold">5678</span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <div className="bg-primary/10 rounded-full p-1 mt-0.5">
                              <span className="text-xs font-bold">4</span>
                            </div>
                            <div>
                              <p>Once inside, please review the house manual on the kitchen counter.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h3 className="font-medium mb-3">WiFi Information</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Network</div>
                            <div className="font-medium">PropertyWiFi</div>
                          </div>
                          <div className="flex justify-between">
                            <div className="text-muted-foreground">Password</div>
                            <div className="font-medium">Vacation2023</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-2">
                      <Button className="w-full">I've Arrived</Button>
                      <Button variant="outline" className="w-full">
                        Contact Host
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Home className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-xs">Booking</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-xs">Messages</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Settings className="h-5 w-5 mb-1" />
                      <span className="text-xs">Settings</span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages Screen */}
              {selectedScreen === "messages" && (
                <div className="h-full">
                  {/* App Header */}
                  <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between z-10">
                    <div className="flex items-center">
                      <Button variant="ghost" size="icon" className="mr-1">
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                      <h1 className="text-lg font-medium">Messages</h1>
                    </div>
                  </div>

                  {/* Messages Content */}
                  <div className="p-4 space-y-4">
                    <div className="flex justify-center mb-2">
                      <Badge variant="outline" className="text-xs">
                        Today
                      </Badge>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          Hi! I'm arriving tomorrow. Is there anything I should know before check-in?
                        </p>
                        <p className="text-xs opacity-70 mt-1">10:30 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          Hello! Looking forward to hosting you. Everything is ready for your arrival. The check-in
                          instructions are in the app, but let me know if you have any specific questions!
                        </p>
                        <p className="text-xs opacity-70 mt-1">10:45 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Great, thanks! Is there parking available at the property?</p>
                        <p className="text-xs opacity-70 mt-1">11:02 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-start">
                      <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">
                          Yes, there's a dedicated parking spot for you. It's spot #5 right in front of the villa.
                          You'll see the number painted on the ground.
                        </p>
                        <p className="text-xs opacity-70 mt-1">11:10 AM</p>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Perfect! Thanks for the information.</p>
                        <p className="text-xs opacity-70 mt-1">11:15 AM</p>
                      </div>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="fixed bottom-16 left-0 right-0 bg-white border-t p-2">
                    <div className="flex gap-2">
                      <Input placeholder="Type a message..." className="flex-1" />
                      <Button size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Home className="h-5 w-5 mb-1" />
                      <span className="text-xs">Home</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Calendar className="h-5 w-5 mb-1" />
                      <span className="text-xs">Booking</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <MessageSquare className="h-5 w-5 mb-1" />
                      <span className="text-xs">Messages</span>
                    </Button>
                    <Button variant="ghost" className="flex flex-col h-auto py-2">
                      <Settings className="h-5 w-5 mb-1" />
                      <span className="text-xs">Settings</span>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}

