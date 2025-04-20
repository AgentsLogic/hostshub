import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { WhiteLabelNav } from "@/app/dashboard/components/white-label-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function WhiteLabelAnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Client Analytics" text="Track performance across all your white-label clients." />
      <div className="grid gap-8">
        <WhiteLabelNav />

        <div className="flex justify-end">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="client1">Mountain Retreats</SelectItem>
              <SelectItem value="client2">Beach Villas</SelectItem>
              <SelectItem value="client3">Urban Apartments</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="usage">Platform Usage</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm" style={{ color: "#4682B4" }}>
                    Total Clients
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+2 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm" style={{ color: "#4682B4" }}>
                    Total Properties
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87</div>
                  <p className="text-xs text-muted-foreground">+5 this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm" style={{ color: "#4682B4" }}>
                    Total Revenue
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$24,890</div>
                  <p className="text-xs text-muted-foreground">+12% from last month</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#4682B4" }}>Client Performance</CardTitle>
                <CardDescription style={{ color: "#4A5568" }}>
                  Compare performance across all your white-label clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  [Client Performance Chart]
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#4682B4" }}>Booking Analytics</CardTitle>
                <CardDescription style={{ color: "#4A5568" }}>
                  Track booking performance across all clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  [Booking Analytics Chart]
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#4682B4" }}>Revenue Analytics</CardTitle>
                <CardDescription style={{ color: "#4A5568" }}>
                  Track revenue performance across all clients.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">
                  [Revenue Analytics Chart]
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle style={{ color: "#4682B4" }}>Platform Usage</CardTitle>
                <CardDescription style={{ color: "#4A5568" }}>
                  Track how clients are using the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center border rounded">[Platform Usage Chart]</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  )
}

