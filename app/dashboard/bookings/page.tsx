import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Plus, Filter, Users, DollarSign } from "lucide-react" // Added Users, DollarSign
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils" // Added cn import

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

export default function BookingsPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground">Manage your bookings and reservations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Link href="/dashboard/bookings/new">
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
              <Card key={booking.id} className="border"> {/* Added border */}
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 pt-4"> {/* Adjusted pt */}
                  <div>
                    <CardTitle className="text-lg">{booking.guest}</CardTitle>
                    <p className="text-sm text-muted-foreground">{booking.property}</p>
                  </div>
                  <Badge
                    variant={
                      booking.status === "confirmed"
                        ? "default" // Confirmed
                        : booking.status === "pending"
                          ? "outline" // Keep outline but add color class below
                          : "destructive" // Cancelled
                    }
                    className={cn(
                      booking.status === "pending" && "border-orange-400 text-orange-500 dark:border-orange-600 dark:text-orange-500" // Added color for pending
                    )}
                  >
                    {booking.status}
                  </Badge>
                </CardHeader>
                <CardContent className="pt-2 pb-4"> {/* Adjusted padding */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2"> {/* Adjusted gap */}
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Check-in</p> {/* Lighter label */}
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{booking.checkIn}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Check-out</p> {/* Lighter label */}
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{booking.checkOut}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Guests</p> {/* Lighter label */}
                      <div className="flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" /> {/* Added icon */}
                        <p className="text-sm">{booking.guests}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total</p> {/* Lighter label */}
                      <div className="flex items-center">
                        <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" /> {/* Added icon */}
                        <p className="text-sm">${booking.total}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex justify-end space-x-2"> {/* Adjusted margin */}
                    <Link href={`/dashboard/bookings/${booking.id}`}>
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
