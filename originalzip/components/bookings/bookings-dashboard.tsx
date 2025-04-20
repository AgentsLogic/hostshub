"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import { BookingsTable } from "@/components/bookings/bookings-table"
import { BookingDetails } from "@/components/bookings/booking-details"

export function BookingsDashboard() {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Bookings</h2>
        <div className="flex items-center space-x-2">
          <CalendarDateRangePicker />
          <Button>+ New Booking</Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="current">Current Stays</TabsTrigger>
          <TabsTrigger value="past">Past Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,350</div>
                <p className="text-xs text-muted-foreground">+180 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">245</div>
                <p className="text-xs text-muted-foreground">+22% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Stays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancellations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">-8% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Manage your bookings across all properties</CardDescription>
              </CardHeader>
              <CardContent>
                <BookingsTable onSelectBooking={setSelectedBooking} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Booking Details</CardTitle>
                <CardDescription>
                  {selectedBooking ? "View and manage booking details" : "Select a booking to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedBooking ? (
                  <BookingDetails bookingId={selectedBooking} />
                ) : (
                  <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                    No booking selected
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          {/* Similar structure for upcoming bookings */}
        </TabsContent>
        <TabsContent value="current" className="space-y-4">
          {/* Similar structure for current stays */}
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          {/* Similar structure for past bookings */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BookingsDashboard

