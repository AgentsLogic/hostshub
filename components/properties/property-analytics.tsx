"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart } from "@/components/ui/chart"
import { CalendarDateRangePicker } from "@/components/date-range-picker"

export function PropertyAnalytics({ propertyId = "p1" }) {
  // This would typically fetch analytics data based on the property ID
  const revenueData = [
    { name: "Jan", total: 2500 },
    { name: "Feb", total: 3000 },
    { name: "Mar", total: 2800 },
    { name: "Apr", total: 3200 },
    { name: "May", total: 4000 },
    { name: "Jun", total: 4500 },
    { name: "Jul", total: 5200 },
    { name: "Aug", total: 5800 },
    { name: "Sep", total: 4800 },
    { name: "Oct", total: 4000 },
    { name: "Nov", total: 3500 },
    { name: "Dec", total: 4200 },
  ]

  const occupancyData = [
    { name: "Jan", total: 65 },
    { name: "Feb", total: 75 },
    { name: "Mar", total: 70 },
    { name: "Apr", total: 80 },
    { name: "May", total: 85 },
    { name: "Jun", total: 90 },
    { name: "Jul", total: 95 },
    { name: "Aug", total: 98 },
    { name: "Sep", total: 88 },
    { name: "Oct", total: 82 },
    { name: "Nov", total: 78 },
    { name: "Dec", total: 85 },
  ]

  const bookingSourceData = [
    { name: "Airbnb", total: 45 },
    { name: "Booking.com", total: 30 },
    { name: "VRBO", total: 15 },
    { name: "Direct", total: 10 },
  ]

  const seasonalityData = [
    { name: "Winter", total: 3500 },
    { name: "Spring", total: 4000 },
    { name: "Summer", total: 5500 },
    { name: "Fall", total: 4200 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between sm:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
        <CalendarDateRangePicker className="mt-4 sm:mt-0" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$48,500</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82%</div>
            <p className="text-xs text-muted-foreground">+5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$250</div>
            <p className="text-xs text-muted-foreground">+8% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">194</div>
            <p className="text-xs text-muted-foreground">+18% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="occupancy">Occupancy</TabsTrigger>
          <TabsTrigger value="sources">Booking Sources</TabsTrigger>
          <TabsTrigger value="seasonality">Seasonality</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue for the past year</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart data={revenueData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="occupancy">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Rate</CardTitle>
              <CardDescription>Monthly occupancy percentage</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <LineChart data={occupancyData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Booking Sources</CardTitle>
              <CardDescription>Distribution of bookings by source</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart data={bookingSourceData} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seasonality">
          <Card>
            <CardHeader>
              <CardTitle>Seasonal Performance</CardTitle>
              <CardDescription>Revenue by season</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <BarChart data={seasonalityData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

