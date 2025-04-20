"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Users, Bed, Bath, Coffee, Wifi, Car, Tv, Snowflake } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { DatePickerWithRange } from "./components/date-picker"
import { PropertyGallery } from "./components/property-gallery"

// This is a template preview page for the Modern template
export default function ModernTemplatePage() {
  const [guests, setGuests] = useState(2)

  // Mock property data
  const property = {
    name: "Luxury Beach Villa",
    location: "Malibu, California",
    description:
      "Experience the ultimate beachfront luxury in this stunning villa with panoramic ocean views. This spacious property features modern design, high-end amenities, and direct beach access.",
    price: 450,
    rating: 4.9,
    reviews: 124,
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    amenities: [
      { name: "Wi-Fi", icon: Wifi },
      { name: "Air Conditioning", icon: Snowflake },
      { name: "Parking", icon: Car },
      { name: "TV", icon: Tv },
      { name: "Coffee Maker", icon: Coffee },
    ],
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800",
    ],
    host: {
      name: "Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      response: "100%",
      responseTime: "within an hour",
    },
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            {property.name}
          </Link>
          <nav className="hidden md:flex gap-6">
            <a href="#overview" className="text-sm font-medium hover:underline underline-offset-4">
              Overview
            </a>
            <a href="#amenities" className="text-sm font-medium hover:underline underline-offset-4">
              Amenities
            </a>
            <a href="#location" className="text-sm font-medium hover:underline underline-offset-4">
              Location
            </a>
            <a href="#reviews" className="text-sm font-medium hover:underline underline-offset-4">
              Reviews
            </a>
          </nav>
          <div>
            <Button>Book Now</Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Gallery */}
      <PropertyGallery images={property.images} />

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Property Header */}
            <div>
              <h1 className="text-3xl font-bold">{property.name}</h1>
              <div className="flex items-center mt-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{property.location}</span>
              </div>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium">{property.rating}</span>
                  <span className="mx-1">·</span>
                  <span className="underline">{property.reviews} reviews</span>
                </div>
              </div>
            </div>

            {/* Property Details */}
            <div id="overview" className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                  <Bed className="h-4 w-4" />
                  {property.bedrooms} Bedrooms
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                  <Bath className="h-4 w-4" />
                  {property.bathrooms} Bathrooms
                </Badge>
                <Badge variant="outline" className="flex items-center gap-1 text-sm py-1.5">
                  <Users className="h-4 w-4" />
                  Up to {property.maxGuests} guests
                </Badge>
              </div>

              <Separator />

              <div>
                <h2 className="text-xl font-semibold mb-2">About this property</h2>
                <p className="text-muted-foreground">{property.description}</p>
              </div>
            </div>

            {/* Amenities */}
            <div id="amenities" className="space-y-4">
              <h2 className="text-xl font-semibold">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <amenity.icon className="h-5 w-5 text-primary" />
                    <span>{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div id="location" className="space-y-4">
              <h2 className="text-xl font-semibold">Location</h2>
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src="/placeholder.svg?height=400&width=800&text=Map"
                  alt="Property location map"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-muted-foreground">
                Located in the heart of Malibu, this property offers easy access to beaches, restaurants, and local
                attractions.
              </p>
            </div>

            {/* Host */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Hosted by {property.host.name}</h2>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={property.host.image || "/placeholder.svg"}
                    alt={property.host.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium">Response rate: {property.host.response}</p>
                  <p className="text-muted-foreground">Response time: {property.host.responseTime}</p>
                </div>
              </div>
            </div>

            {/* Reviews */}
            <div id="reviews" className="space-y-4">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold">Reviews</h2>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="ml-1 font-medium">{property.rating}</span>
                  <span className="mx-1">·</span>
                  <span>{property.reviews} reviews</span>
                </div>
              </div>

              <Tabs defaultValue="recent">
                <TabsList>
                  <TabsTrigger value="recent">Most Recent</TabsTrigger>
                  <TabsTrigger value="positive">Highest Rated</TabsTrigger>
                </TabsList>
                <TabsContent value="recent" className="space-y-4 mt-4">
                  {/* Mock reviews */}
                  {[1, 2, 3].map((review) => (
                    <Card key={review}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                              <img
                                src="/placeholder.svg?height=40&width=40"
                                alt="Reviewer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">John Doe</p>
                              <p className="text-xs text-muted-foreground">March 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1">5.0</span>
                          </div>
                        </div>
                        <p className="mt-2">
                          Amazing property with stunning views! The host was very responsive and accommodating. Would
                          definitely stay here again.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </TabsContent>
                <TabsContent value="positive" className="space-y-4 mt-4">
                  {/* Mock positive reviews */}
                  {[1, 2, 3].map((review) => (
                    <Card key={review}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-muted overflow-hidden">
                              <img
                                src="/placeholder.svg?height=40&width=40"
                                alt="Reviewer"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="font-medium">Jane Smith</p>
                              <p className="text-xs text-muted-foreground">February 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1">5.0</span>
                          </div>
                        </div>
                        <p className="mt-2">
                          One of the best vacation rentals I've ever stayed in! The location is perfect and the
                          amenities are top-notch.
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                  <Button variant="outline" className="w-full">
                    Load More Reviews
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold">${property.price}</span>
                      <span className="text-muted-foreground"> / night</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 font-medium">{property.rating}</span>
                      <span className="mx-1">·</span>
                      <span className="text-sm text-muted-foreground">{property.reviews} reviews</span>
                    </div>
                  </div>

                  <DatePickerWithRange className="mb-4" />

                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="text-sm font-medium">Guests</label>
                      <div className="flex items-center mt-1">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          disabled={guests <= 1}
                        >
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
                            className="h-4 w-4"
                          >
                            <path d="M5 12h14" />
                          </svg>
                        </Button>
                        <span className="mx-4 font-medium">{guests}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setGuests(Math.min(property.maxGuests, guests + 1))}
                          disabled={guests >= property.maxGuests}
                        >
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
                            className="h-4 w-4"
                          >
                            <path d="M5 12h14" />
                            <path d="M12 5v14" />
                          </svg>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>${property.price} x 7 nights</span>
                      <span>${property.price * 7}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$150</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$120</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${property.price * 7 + 150 + 120}</span>
                  </div>

                  <Button className="w-full mt-4">Reserve</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:underline">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Newsroom
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Investors
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:underline">
                    Accessibility
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Referrals
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Gift cards
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Host</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:underline">
                    Host your home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Host an experience
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Responsible hosting
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-muted-foreground mb-4 md:mb-0">
              © 2023 {property.name}. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

