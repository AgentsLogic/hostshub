import type { Metadata } from "next"
import { DashboardShell } from "./components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Home, Globe, Calendar, MessageSquare, BarChart } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your properties and bookings",
}

export default function DashboardPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your Airbnb host dashboard</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link href="/dashboard/properties/new">
              <Button variant="outline" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Add New Property
              </Button>
            </Link>
            <Link href="/dashboard/bookings/new">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Create New Booking
              </Button>
            </Link>
            <Link href="/dashboard/websites/new">
              <Button variant="outline" className="w-full justify-start">
                <Globe className="mr-2 h-4 w-4" />
                Create Property Website
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest property bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-muted-foreground">Luxury Beach House</p>
                </div>
                <p className="text-sm">Sep 20 - Sep 25</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Downtown Loft</p>
                </div>
                <p className="text-sm">Sep 22 - Sep 24</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-medium">Michael Brown</p>
                  <p className="text-xs text-muted-foreground">Mountain Cabin</p>
                </div>
                <p className="text-sm">Oct 5 - Oct 10</p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/dashboard/bookings">
                <Button variant="link" className="p-0">
                  View all bookings
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>Latest communications from guests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">John Smith</p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
                <p className="text-xs truncate">Hi, I was wondering if early check-in would be possible...</p>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground">Yesterday</p>
                </div>
                <p className="text-xs truncate">Thank you for the information. Is parking available nearby?</p>
              </div>
              <div>
                <div className="flex justify-between">
                  <p className="text-sm font-medium">Michael Brown</p>
                  <p className="text-xs text-muted-foreground">2 days ago</p>
                </div>
                <p className="text-xs truncate">
                  We're looking forward to our stay! Could you recommend some local restaurants?
                </p>
              </div>
            </div>
            <div className="mt-4">
              <Link href="/dashboard/communications">
                <Button variant="link" className="p-0">
                  View all messages
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

