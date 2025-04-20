import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, CreditCard, FileText, Clock } from "lucide-react";

export default function BookingDetailPage() {
  // Placeholder booking data
  const booking = {
    id: "1",
    guest: {
      name: "John Smith",
      email: "john@example.com",
      phone: "(555) 123-4567",
    },
    property: "Luxury Beach House",
    checkIn: "2023-09-20",
    checkOut: "2023-09-25",
    guests: 4,
    status: "confirmed",
    total: 1750,
    payment: {
      method: "Credit Card",
      status: "Paid",
      date: "2023-09-15",
      amount: 1750,
    },
    notes: "Guest requested early check-in.",
    timeline: [
      { label: "Booking Created", date: "2023-09-10" },
      { label: "Payment Received", date: "2023-09-15" },
      { label: "Check-in", date: "2023-09-20" },
      { label: "Check-out", date: "2023-09-25" },
    ],
  };

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Booking Details</h1>
          <Badge variant={booking.status === "confirmed" ? "default" : booking.status === "pending" ? "outline" : "destructive"}>
            {booking.status}
          </Badge>
        </div>

        {/* Guest Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              <User className="h-5 w-5 mr-2 inline" />
              Guest Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-sm">{booking.guest.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm">{booking.guest.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm">{booking.guest.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Guests</p>
                <p className="text-sm">{booking.guests}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stay Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Calendar className="h-5 w-5 mr-2 inline" />
              Stay Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Property</p>
                <p className="text-sm">{booking.property}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Check-in</p>
                <p className="text-sm">{booking.checkIn}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Check-out</p>
                <p className="text-sm">{booking.checkOut}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Total</p>
                <p className="text-sm">${booking.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card>
          <CardHeader>
            <CardTitle>
              <CreditCard className="h-5 w-5 mr-2 inline" />
              Payment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Method</p>
                <p className="text-sm">{booking.payment.method}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-sm">{booking.payment.status}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Date</p>
                <p className="text-sm">{booking.payment.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Amount</p>
                <p className="text-sm">${booking.payment.amount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader>
            <CardTitle>
              <FileText className="h-5 w-5 mr-2 inline" />
              Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{booking.notes}</p>
          </CardContent>
        </Card>

        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Clock className="h-5 w-5 mr-2 inline" />
              Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-1">
              {booking.timeline.map((event, idx) => (
                <li key={idx} className="text-sm">
                  <span className="font-medium">{event.label}:</span> {event.date}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
