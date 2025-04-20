"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function PropertySettings({ propertyId = "p1" }) {
  // This would typically fetch property data based on the ID
  const property = {
    id: propertyId,
    name: "Seaside Villa",
    type: "Villa",
    address: "123 Ocean Drive",
    city: "Miami",
    state: "FL",
    zipCode: "33139",
    country: "USA",
    description:
      "A beautiful seaside villa with stunning ocean views. Perfect for family vacations or romantic getaways. Enjoy the private pool, spacious terrace, and direct beach access.",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    squareFeet: 2200,
    price: 250,
    cleaningFee: 100,
    securityDeposit: 500,
    checkInTime: "15:00",
    checkOutTime: "11:00",
    instantBooking: true,
    minStay: 2,
    maxStay: 14,
    amenities: ["Wi-Fi", "Air Conditioning", "Heating", "Kitchen", "TV", "Free Parking", "Pool", "Beach Access"],
    status: "active",
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="policies">Policies</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic details about your property</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Property Name</Label>
                  <Input id="name" defaultValue={property.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Property Type</Label>
                  <Select defaultValue={property.type.toLowerCase()}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="cabin">Cabin</SelectItem>
                      <SelectItem value="cottage">Cottage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" defaultValue={property.description} rows={4} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={property.address} />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue={property.city} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue={property.state} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code</Label>
                  <Input id="zipCode" defaultValue={property.zipCode} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" defaultValue={property.country} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" type="number" defaultValue={property.bedrooms} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bathrooms">Bathrooms</Label>
                  <Input id="bathrooms" type="number" defaultValue={property.bathrooms} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxGuests">Max Guests</Label>
                  <Input id="maxGuests" type="number" defaultValue={property.maxGuests} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="squareFeet">Square Feet</Label>
                <Input id="squareFeet" type="number" defaultValue={property.squareFeet} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
              <CardDescription>Set your rates and fees</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="price">Nightly Rate ($)</Label>
                  <Input id="price" type="number" defaultValue={property.price} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cleaningFee">Cleaning Fee ($)</Label>
                  <Input id="cleaningFee" type="number" defaultValue={property.cleaningFee} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="securityDeposit">Security Deposit ($)</Label>
                <Input id="securityDeposit" type="number" defaultValue={property.securityDeposit} />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Policies</CardTitle>
              <CardDescription>Set your booking rules and policies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="checkInTime">Check-in Time</Label>
                  <Input id="checkInTime" defaultValue={property.checkInTime} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkOutTime">Check-out Time</Label>
                  <Input id="checkOutTime" defaultValue={property.checkOutTime} />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="minStay">Minimum Stay (nights)</Label>
                  <Input id="minStay" type="number" defaultValue={property.minStay} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxStay">Maximum Stay (nights)</Label>
                  <Input id="maxStay" type="number" defaultValue={property.maxStay} />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="instantBooking" checked={property.instantBooking} />
                <Label htmlFor="instantBooking">Allow Instant Booking</Label>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="amenities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
              <CardDescription>Select the amenities available at your property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  "Wi-Fi",
                  "Air Conditioning",
                  "Heating",
                  "Kitchen",
                  "TV",
                  "Free Parking",
                  "Pool",
                  "Beach Access",
                  "Washer",
                  "Dryer",
                  "Dishwasher",
                  "Gym",
                  "Hot Tub",
                  "Balcony",
                  "Fireplace",
                  "BBQ Grill",
                  "Pets Allowed",
                  "Wheelchair Accessible",
                ].map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Switch
                      id={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`}
                      checked={property.amenities.includes(amenity)}
                    />
                    <Label htmlFor={`amenity-${amenity.toLowerCase().replace(/\s+/g, "-")}`}>{amenity}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

