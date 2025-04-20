import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock bookings data
const bookings = [
  {
    id: "1",
    guest: "John Smith",
    property: "Luxury Beach House",
    checkIn: "2023-09-20",
    checkOut: "2023-09-25",
    guests: 4,
    status: "confirmed",
    total: 1750,
  },
  {
    id: "2",
    guest: "Sarah Johnson",
    property: "Downtown Loft",
    checkIn: "2023-09-22",
    checkOut: "2023-09-24",
    guests: 2,
    status: "pending",
    total: 400,
  },
  {
    id: "3",
    guest: "Michael Brown",
    property: "Mountain Cabin",
    checkIn: "2023-10-05",
    checkOut: "2023-10-10",
    guests: 6,
    status: "confirmed",
    total: 900,
  },
  {
    id: "4",
    guest: "Emily Davis",
    property: "Luxury Beach House",
    checkIn: "2023-10-15",
    checkOut: "2023-10-20",
    guests: 3,
    status: "cancelled",
    total: 1750,
  },
]

export default function BookingSystemPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Booking System</h1>
          <p className="text-muted-foreground">Manage your bookings and reservations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Link href="/dashboard/booking-system/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Booking
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          {bookings
            .filter((b) => b.status !== "cancelled")
            .map((booking) => (
              <Card key={booking.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">{booking.guest}</CardTitle>
                    <p className="text-sm text-muted-foreground">{booking.property}</p>
                  </div>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default"
                        : booking.status === "pending"
                          ? "outline"
                          : "destructive"
                    }
                  >
                    {booking.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Check-in</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{booking.checkIn}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Check-out</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{booking.checkOut}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Guests</p>
                      <p className="text-sm">{booking.guests}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Total</p>
                      <p className="text-sm">${booking.total}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Link href={`/dashboard/booking-system/${booking.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="past">
          <p className="text-center py-8 text-muted-foreground">No past bookings to display</p>
        </TabsContent>
        <TabsContent value="all">
          <p className="text-center py-8 text-muted-foreground">All bookings will be displayed here</p>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

