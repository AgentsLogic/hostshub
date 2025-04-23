import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserPlus, Search } from "lucide-react";
import { cn } from "@/lib/utils"; // Import cn

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
          <CardContent className="p-0"> {/* Remove card content padding */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-muted/50"> {/* Lighter head */}
                  <tr className="border-b">
                    <th className="text-left px-3 py-2 font-semibold">Name</th> {/* Adjusted padding */}
                    <th className="text-left px-3 py-2 font-semibold">Email</th> {/* Adjusted padding */}
                    <th className="text-left px-3 py-2 font-semibold">Bookings</th> {/* Adjusted padding */}
                    <th className="text-left px-3 py-2 font-semibold">Last Stay</th> {/* Adjusted padding */}
                  </tr>
                </thead>
                <tbody>
                  {guests.map((guest, index) => ( // Added index
                    <tr key={guest.email} className={cn("border-b", index % 2 === 0 ? "" : "bg-muted/20")}> {/* Alternating rows */}
                      <td className="px-3 py-1.5">{guest.name}</td> {/* Adjusted padding */}
                      <td className="px-3 py-1.5">{guest.email}</td> {/* Adjusted padding */}
                      <td className="px-3 py-1.5">{guest.bookings}</td> {/* Adjusted padding */}
                      <td className="px-3 py-1.5">{guest.lastStay}</td> {/* Adjusted padding */}
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
