import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Search } from "lucide-react";

export default function GuestsPage() {
  // Placeholder guest data
  const guests = [
    { name: "John Smith", email: "john@example.com", bookings: 3, lastStay: "2025-03-15" },
    { name: "Sarah Johnson", email: "sarah@example.com", bookings: 1, lastStay: "2025-04-01" },
    { name: "Michael Brown", email: "michael@example.com", bookings: 2, lastStay: "2025-02-20" },
  ];

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Guests</h1>
          <div className="flex gap-2 items-center">
            <div className="relative">
              <Input placeholder="Search guests..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button variant="outline">Filter</Button>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Guest
            </Button>
          </div>
        </div>

        {/* Guests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Guest List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-4 font-medium">Name</th>
                    <th className="text-left py-2 px-4 font-medium">Email</th>
                    <th className="text-left py-2 px-4 font-medium">Bookings</th>
                    <th className="text-left py-2 px-4 font-medium">Last Stay</th>
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest) => (
                    <tr key={guest.email} className="border-b hover:bg-muted/50">
                      <td className="py-2 px-4">{guest.name}</td>
                      <td className="py-2 px-4">{guest.email}</td>
                      <td className="py-2 px-4">{guest.bookings}</td>
                      <td className="py-2 px-4">{guest.lastStay}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
