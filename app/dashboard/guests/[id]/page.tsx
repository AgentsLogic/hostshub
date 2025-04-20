import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, User, Mail, Phone, Home } from "lucide-react";

export default function GuestDetailPage() {
  // Placeholder guest data
  const guest = {
    name: "John Smith",
    email: "john@example.com",
    phone: "(555) 123-4567",
    avatar: "/placeholder-user.jpg",
    status: "Active",
    totalBookings: 3,
    lastStay: "2025-03-15",
    notes: "Prefers early check-in. Allergic to pets.",
  };

  const bookingHistory = [
    {
      id: "B001",
      property: "Luxury Beach House",
      checkIn: "2025-03-10",
      checkOut: "2025-03-15",
      status: "Completed",
    },
    {
      id: "B002",
      property: "Mountain Cabin",
      checkIn: "2024-12-20",
      checkOut: "2024-12-25",
      status: "Completed",
    },
    {
      id: "B003",
      property: "City Apartment",
      checkIn: "2024-08-05",
      checkOut: "2024-08-10",
      status: "Cancelled",
    },
  ];

  const messages = [
    {
      id: 1,
      from: "Host",
      date: "2025-03-09",
      content: "Hi John, your check-in is tomorrow. Let us know if you need anything!",
    },
    {
      id: 2,
      from: "John Smith",
      date: "2025-03-09",
      content: "Thanks! Is early check-in possible?",
    },
    {
      id: 3,
      from: "Host",
      date: "2025-03-09",
      content: "Yes, you can check in after 1:00 PM.",
    },
  ];

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Guest Details</h1>
          <Badge variant="default">{guest.status}</Badge>
        </div>

        {/* Guest Profile */}
        <Card>
          <CardHeader>
            <CardTitle>
              <User className="h-5 w-5 mr-2 inline" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={guest.avatar} alt={guest.name} />
                <AvatarFallback>{guest.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-lg">{guest.name}</div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Mail className="h-4 w-4" />
                  {guest.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Phone className="h-4 w-4" />
                  {guest.phone}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-medium">Total Bookings</div>
                <div className="text-sm">{guest.totalBookings}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Last Stay</div>
                <div className="text-sm">{guest.lastStay}</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm font-medium mb-1">Notes</div>
              <div className="text-sm text-muted-foreground">{guest.notes}</div>
            </div>
          </CardContent>
        </Card>

        {/* Booking History */}
        <Card>
          <CardHeader>
            <CardTitle>
              <Calendar className="h-5 w-5 mr-2 inline" />
              Booking History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookingHistory.length === 0 ? (
              <div className="text-center text-muted-foreground py-4 border border-dashed rounded-md">
                No bookings found for this guest.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-medium">Booking ID</th>
                      <th className="text-left py-2 px-4 font-medium">Property</th>
                      <th className="text-left py-2 px-4 font-medium">Check-in</th>
                      <th className="text-left py-2 px-4 font-medium">Check-out</th>
                      <th className="text-left py-2 px-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingHistory.map((b) => (
                      <tr key={b.id} className="border-b hover:bg-muted/50">
                        <td className="py-2 px-4">{b.id}</td>
                        <td className="py-2 px-4">{b.property}</td>
                        <td className="py-2 px-4">{b.checkIn}</td>
                        <td className="py-2 px-4">{b.checkOut}</td>
                        <td className="py-2 px-4">
                          <Badge variant={b.status === "Completed" ? "default" : "outline"}>
                            {b.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Communication Log */}
        <Card>
          <CardHeader>
            <CardTitle>
              <MessageSquare className="h-5 w-5 mr-2 inline" />
              Communication Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-4 border border-dashed rounded-md">
                No messages found for this guest.
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{msg.from[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{msg.from}</div>
                      <div className="text-xs text-muted-foreground">{msg.date}</div>
                      <div className="text-sm mt-1">{msg.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
