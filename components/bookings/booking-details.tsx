"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, Home, CreditCard, Mail, Phone, MessageSquare } from "lucide-react"

export function BookingDetails({ bookingId = "B001" }) {
  // This would typically fetch booking data based on the ID
  const booking = {
    id: bookingId,
    propertyName: "Seaside Villa",
    propertyAddress: "123 Ocean Drive, Miami, FL",
    guestName: "John Smith",
    guestEmail: "john.smith@example.com",
    guestPhone: "+1 (555) 123-4567",
    checkIn: "June 1, 2023",
    checkOut: "June 7, 2023",
    guests: 4,
    status: "confirmed",
    total: 1200,
    paymentMethod: "Credit Card",
    specialRequests: "Late check-in, around 9 PM.",
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Booking #{booking.id}</h2>
        <Badge
          variant={
            booking.status === "confirmed" ? "default" : booking.status === "pending" ? "outline" : "destructive"
          }
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Home className="h-5 w-5" />
              Property Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="font-medium">{booking.propertyName}</div>
              <div className="text-sm text-muted-foreground">{booking.propertyAddress}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="font-medium">{booking.guestName}</div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                {booking.guestEmail}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {booking.guestPhone}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Reservation Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Check-in</div>
                <div>{booking.checkIn}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Check-out</div>
                <div>{booking.checkOut}</div>
              </div>
            </div>
            <div>
              <div className="text-sm font-medium">Guests</div>
              <div>{booking.guests} people</div>
            </div>
            {booking.specialRequests && (
              <div>
                <div className="text-sm font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Special Requests
                </div>
                <div className="text-sm">{booking.specialRequests}</div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Payment Method</span>
              <span>{booking.paymentMethod}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${booking.total.toFixed(2)}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Send Receipt</Button>
          </CardFooter>
        </Card>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel Booking</Button>
        <Button variant="outline">Edit Booking</Button>
        <Button>Message Guest</Button>
      </div>
    </div>
  )
}

