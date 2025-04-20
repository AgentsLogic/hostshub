"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Filter, Plus, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useBookings } from "@/hooks/use-bookings"
import { useBlockedDates } from "@/hooks/use-blocked-dates"
import { Loader2 } from "lucide-react"

export default function BookingCalendarPage() {
  const [selectedProperty, setSelectedProperty] = useState("all")
  const [selectedView, setSelectedView] = useState("month")
  const {
    bookings,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useBookings(selectedProperty !== "all" ? selectedProperty : undefined)
  const {
    blockedDates,
    isLoading: blockedDatesLoading,
    error: blockedDatesError,
  } = useBlockedDates(
    selectedProperty !== "all" ? selectedProperty : "beach-villa", // Default to first property if "all" is selected
  )
  const isLoading = bookingsLoading || blockedDatesLoading
  const error = bookingsError || blockedDatesError

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-500 border-yellow-500">
            Pending
          </Badge>
        )
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPlatformBadge = (platform: string) => {
    switch (platform) {
      case "Airbnb":
        return <Badge className="bg-[#FF5A5F] text-white">Airbnb</Badge>
      case "VRBO":
        return <Badge className="bg-[#3D67FF] text-white">VRBO</Badge>
      case "Booking.com":
        return <Badge className="bg-[#003580] text-white">Booking.com</Badge>
      case "Direct":
        return <Badge variant="outline">Direct</Badge>
      default:
        return <Badge variant="outline">{platform}</Badge>
    }
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Booking Calendar" text="Manage your property bookings and availability">
          <div className="flex items-center gap-2">
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="beach-villa">Beach Villa</SelectItem>
                <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
                <SelectItem value="city-apartment">City Apartment</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Block Dates
            </Button>
          </div>
        </DashboardHeader>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader heading="Booking Calendar" text="Manage your property bookings and availability">
          <div className="flex items-center gap-2">
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="beach-villa">Beach Villa</SelectItem>
                <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
                <SelectItem value="city-apartment">City Apartment</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Block Dates
            </Button>
          </div>
        </DashboardHeader>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error loading calendar data</h2>
            <p className="text-muted-foreground">{error.message}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Booking Calendar" text="Manage your property bookings and availability">
        <div className="flex items-center gap-2">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="beach-villa">Beach Villa</SelectItem>
              <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
              <SelectItem value="city-apartment">City Apartment</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Block Dates
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex justify-between items-center mb-4">
        <Tabs value={selectedView} onValueChange={setSelectedView} className="w-[400px]">
          <TabsList>
            <TabsTrigger value="month">
              <Calendar className="mr-2 h-4 w-4" />
              Month
            </TabsTrigger>
            <TabsTrigger value="week">
              <Calendar className="mr-2 h-4 w-4" />
              Week
            </TabsTrigger>
            <TabsTrigger value="day">
              <Calendar className="mr-2 h-4 w-4" />
              Day
            </TabsTrigger>
            <TabsTrigger value="list">
              <Calendar className="mr-2 h-4 w-4" />
              List
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button variant="outline" size="sm">
            Today
          </Button>
          <Button variant="outline" size="icon" size="sm">
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
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </Button>
          <Button variant="outline" size="icon" size="sm">
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
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Button>
          <div className="text-sm font-medium">November 2023</div>
        </div>
      </div>

      <Card className="mb-4">
        <CardHeader className="pb-2">
          <CardTitle>Calendar Legend</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500"></div>
              <span className="text-sm">Confirmed Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
              <span className="text-sm">Pending Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-red-500"></div>
              <span className="text-sm">Blocked Dates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <span className="text-sm">Owner Stay</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-gray-500"></div>
              <span className="text-sm">Maintenance</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <TabsContent value="month" className="mt-0">
        <Card>
          <CardContent className="p-0">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Calendar view will be implemented here</p>
              <p className="text-muted-foreground">
                This would include a full month view with color-coded bookings and blocked dates
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="list" className="mt-0">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Bookings</CardTitle>
            <CardDescription>All upcoming bookings across your properties</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {bookings.filter((booking) => booking.status === "confirmed").length > 0 ? (
                bookings
                  .filter((booking) => booking.status === "confirmed")
                  .map((booking) => (
                    <div
                      key={booking.id}
                      className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="space-y-2 mb-4 md:mb-0">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{booking.property.name}</h3>
                          {getStatusBadge(booking.status)}
                          {getPlatformBadge(booking.channel?.name || "Direct")}
                        </div>
                        <p className="text-sm">
                          {booking.guest.first_name} {booking.guest.last_name}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(booking.check_in).toLocaleDateString()} -{" "}
                              {new Date(booking.check_out).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{booking.guests} guests</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                              {Math.round(
                                (new Date(booking.check_out).getTime() - new Date(booking.check_in).getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )}{" "}
                              nights
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-lg font-bold">${booking.total_price}</div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No upcoming bookings</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Blocked Dates</CardTitle>
            <CardDescription>Dates that are blocked for bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blockedDates.length > 0 ? (
                blockedDates.map((block) => (
                  <div
                    key={block.id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="space-y-2 mb-4 md:mb-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{block.property_id}</h3>
                        <Badge variant="destructive">Blocked</Badge>
                      </div>
                      <p className="text-sm">{block.reason}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(block.start_date).toLocaleDateString()} -{" "}
                          {new Date(block.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No blocked dates</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="week" className="mt-0">
        <Card>
          <CardContent className="p-0">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Week view will be implemented here</p>
              <p className="text-muted-foreground">
                This would include a full week view with color-coded bookings and blocked dates
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="day" className="mt-0">
        <Card>
          <CardContent className="p-0">
            <div className="p-4 text-center">
              <p className="text-muted-foreground">Day view will be implemented here</p>
              <p className="text-muted-foreground">
                This would include a full day view with color-coded bookings and blocked dates
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </DashboardShell>
  )
}

