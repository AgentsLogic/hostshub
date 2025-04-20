"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyInfo } from "@/components/properties/property-info"
import { PropertyBookings } from "@/components/properties/property-bookings"
import { PropertyChannels } from "@/components/properties/property-channels"
import { PropertySettings } from "@/components/properties/property-settings"
import { PropertyAnalytics } from "@/components/properties/property-analytics"

export function PropertyDetails({ propertyId }: { propertyId: string }) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="flex-1 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Property Details</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Property"}</Button>
          {isEditing && <Button>Save Changes</Button>}
        </div>
      </div>
      <Tabs defaultValue="info" className="space-y-4">
        <TabsList>
          <TabsTrigger value="info">Property Info</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="channels">Channels</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="info" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
              <CardDescription>View and edit property details</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyInfo propertyId={propertyId} isEditing={isEditing} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Bookings</CardTitle>
              <CardDescription>Manage bookings for this property</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyBookings propertyId={propertyId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="channels" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Distribution Channels</CardTitle>
              <CardDescription>Manage where this property is listed</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyChannels propertyId={propertyId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Analytics</CardTitle>
              <CardDescription>View performance metrics for this property</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyAnalytics propertyId={propertyId} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Property Settings</CardTitle>
              <CardDescription>Configure property settings</CardDescription>
            </CardHeader>
            <CardContent>
              <PropertySettings propertyId={propertyId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertyDetails

