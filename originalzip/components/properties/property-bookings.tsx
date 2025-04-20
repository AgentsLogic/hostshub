"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PropertyBookings({ propertyId = "p1" }) {
  // This would typically fetch booking data based on the property ID
  const bookings = [
    {
      id: "B001",
      guestName: "John Smith",
      checkIn: "2023-06-01",
      checkOut: "2023-06-07",
      guests: 4,
      status: "confirmed",
      total: 1200,
    },
    {
      id: "B002",
      guestName: "Jane Doe",
      checkIn: "2023-06-15",
      checkOut: "2023-06-20",
      guests: 2,
      status: "pending",
      total: 850,
    },
    {
      id: "B003",
      guestName: "Robert Johnson",
      checkIn: "2023-07-05",
      checkOut: "2023-07-12",
      guests: 6,
      status: "confirmed",
      total: 1500,
    },
  ]

  return (
    <div className="space-y-6">
      <Tabs defaultValue="calendar">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="list">Booking List</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Booking Calendar</CardTitle>
              <CardDescription>View and manage bookings for this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="range"
                  numberOfMonths={2}
                  disabled={{ before: new Date() }}
                  className="rounded-md border"
                />
              </div>
              <div className="mt-4 flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-green-500" />
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-yellow-500" />
                  <span className="text-sm">Pending</span>
                </div>
                <div className="flex items-center">
                  <div className="mr-2 h-4 w-4 rounded-full bg-red-500" />
                  <span className="text-sm">Blocked</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end">
            <Button>Create New Booking</Button>
          </div>
        </TabsContent>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>All scheduled bookings for this property</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Guests</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>{booking.id}</TableCell>
                      <TableCell>{booking.guestName}</TableCell>
                      <TableCell>{booking.checkIn}</TableCell>
                      <TableCell>{booking.checkOut}</TableCell>
                      <TableCell>{booking.guests}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            booking.status === "confirmed"
                              ? "default"
                              : booking.status === "pending"
                                ? "outline"
                                : "secondary"
                          }
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>${booking.total}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

