"use client"

import { useState } from "react"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { LineChart, BarChart, PieChart } from "@/components/charts"
import { ChannelAnalytics } from "@/components/channels/channel-analytics"
import { 
  RefreshCw, 
  Settings, 
  AlertCircle, 
  Check, 
  TrendingUp, 
  Calendar, 
  DollarSign,
  BarChart as BarChartIcon,
  PieChart as PieChartIcon,
  Activity
} from "lucide-react"
import Link from "next/link"

// Mock channel data
const channels = [
  {
    id: "1",
    name: "Airbnb",
    logo: "/placeholder.svg?height=40&width=40",
    status: "connected",
    lastSync: "2 hours ago",
    properties: 3,
    color: "text-red-500",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
    syncStatus: "success",
    occupancyRate: 78,
    averageDailyRate: 149,
    revenuePerRoom: 116,
    pendingBookings: 2
  },
  {
    id: "2",
    name: "Booking.com",
    logo: "/placeholder.svg?height=40&width=40",
    status: "connected",
    lastSync: "1 hour ago",
    properties: 2,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    syncStatus: "success",
    occupancyRate: 65,
    averageDailyRate: 135,
    revenuePerRoom: 88,
    pendingBookings: 1
  },
  {
    id: "3",
    name: "VRBO",
    logo: "/placeholder.svg?height=40&width=40",
    status: "connected",
    lastSync: "3 hours ago",
    properties: 2,
    color: "text-green-500",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    syncStatus: "warning",
    occupancyRate: 72,
    averageDailyRate: 165,
    revenuePerRoom: 119,
    pendingBookings: 0
  },
  {
    id: "4",
    name: "Expedia",
    logo: "/placeholder.svg?height=40&width=40",
    status: "disconnected",
    lastSync: "Never",
    properties: 0,
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200",
    syncStatus: "error",
    occupancyRate: 0,
    averageDailyRate: 0,
    revenuePerRoom: 0,
    pendingBookings: 0
  },
]

// Mock sync history data
const syncHistory = [
  {
    id: "1",
    channel: "Airbnb",
    timestamp: "2025-04-03T22:30:00",
    status: "success",
    details: "Full sync completed successfully",
    color: "text-red-500"
  },
  {
    id: "2",
    channel: "Booking.com",
    timestamp: "2025-04-03T23:15:00",
    status: "success",
    details: "Incremental sync completed successfully",
    color: "text-blue-500"
  },
  {
    id: "3",
    channel: "VRBO",
    timestamp: "2025-04-03T21:45:00",
    status: "warning",
    details: "Sync completed with warnings: 1 property failed to update",
    color: "text-green-500"
  },
  {
    id: "4",
    channel: "Expedia",
    timestamp: "2025-04-03T20:30:00",
    status: "error",
    details: "Sync failed: API connection timeout",
    color: "text-yellow-500"
  },
]

// Calculate overall metrics
const calculateOverallMetrics = () => {
  const connectedChannels = channels.filter(c => c.status === "connected")
  const totalProperties = connectedChannels.reduce((sum, channel) => sum + channel.properties, 0)
  const totalPendingBookings = connectedChannels.reduce((sum, channel) => sum + channel.pendingBookings, 0)
  
  // Calculate weighted averages
  let weightedOccupancy = 0
  let weightedADR = 0
  let weightedRevPAR = 0
  
  connectedChannels.forEach(channel => {
    const weight = channel.properties / totalProperties
    weightedOccupancy += channel.occupancyRate * weight
    weightedADR += channel.averageDailyRate * weight
    weightedRevPAR += channel.revenuePerRoom * weight
  })
  
  return {
    connectedChannels: connectedChannels.length,
    totalChannels: channels.length,
    totalProperties,
    totalPendingBookings,
    averageOccupancy: Math.round(weightedOccupancy),
    averageADR: Math.round(weightedADR),
    averageRevPAR: Math.round(weightedRevPAR)
  }
}

export default function ChannelManagerOverviewPage() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("7d")
  const metrics = calculateOverallMetrics()
  
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Channel Manager Overview</h1>
          <p className="text-muted-foreground">
            Unified dashboard for all your connected booking channels
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All Channels
          </Button>
          <Link href="/dashboard/channel-manager">
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Manage Channels
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected Channels</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.connectedChannels}/{metrics.totalChannels}</div>
            <p className="text-xs text-muted-foreground">
              {metrics.connectedChannels === metrics.totalChannels 
                ? "All channels connected" 
                : `${metrics.totalChannels - metrics.connectedChannels} channels disconnected`}
            </p>
            <div className="mt-4">
              <Progress value={(metrics.connectedChannels / metrics.totalChannels) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <BarChartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.averageOccupancy}%</div>
            <p className="text-xs text-muted-foreground">
              Across {metrics.totalProperties} properties
            </p>
            <div className="mt-4">
              <Progress value={metrics.averageOccupancy} className="h-2" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Daily Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.averageADR}</div>
            <p className="text-xs text-muted-foreground">
              Weighted average across all channels
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+5.2% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RevPAR</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${metrics.averageRevPAR}</div>
            <p className="text-xs text-muted-foreground">
              Revenue per available room
            </p>
            <div className="mt-4 flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-xs text-green-500">+3.8% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Channel Status Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {channels.map((channel) => (
          <Card key={channel.id} className={`border ${channel.borderColor}`}>
            <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${channel.bgColor}`}>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full overflow-hidden">
                  <img
                    src={channel.logo || "/placeholder.svg"}
                    alt={channel.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardTitle className={`text-base ${channel.color}`}>{channel.name}</CardTitle>
              </div>
              <Badge variant={channel.status === "connected" ? "default" : "outline"}>
                {channel.status}
              </Badge>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="font-medium">Properties</p>
                  <p className="text-muted-foreground">{channel.properties}</p>
                </div>
                <div>
                  <p className="font-medium">Last Sync</p>
                  <p className="text-muted-foreground">{channel.lastSync}</p>
                </div>
                <div>
                  <p className="font-medium">Sync Status</p>
                  <div className="flex items-center">
                    {channel.syncStatus === "success" && (
                      <Check className="mr-1 h-3 w-3 text-green-500" />
                    )}
                    {channel.syncStatus === "warning" && (
                      <AlertCircle className="mr-1 h-3 w-3 text-amber-500" />
                    )}
                    {channel.syncStatus === "error" && (
                      <AlertCircle className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    <span className={
                      channel.syncStatus === "success" ? "text-green-500" :
                      channel.syncStatus === "warning" ? "text-amber-500" :
                      "text-red-500"
                    }>
                      {channel.syncStatus === "success" ? "OK" : 
                       channel.syncStatus === "warning" ? "Warning" : 
                       "Error"}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Pending</p>
                  <p className="text-muted-foreground">{channel.pendingBookings} bookings</p>
                </div>
              </div>
              {channel.status === "connected" && (
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" size="sm" className="w-[48%]">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Sync
                  </Button>
                  <Link href={`/dashboard/channel-manager/${channel.id}/settings`} className="w-[48%]">
                    <Button variant="outline" size="sm" className="w-full">
                      <Settings className="mr-2 h-3 w-3" />
                      Settings
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Advanced Channel Analytics */}
      <ChannelAnalytics timeRange={timeRange} />
      
      {/* Recent Sync Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Sync Activity</CardTitle>
          <CardDescription>
            Latest synchronization events across all channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {syncHistory.map((sync) => (
              <div key={sync.id} className="flex items-start space-x-4 pb-4 border-b last:border-0">
                <div className={`mt-0.5 h-4 w-4 rounded-full ${
                  sync.status === "success" ? "bg-green-500" :
                  sync.status === "warning" ? "bg-amber-500" :
                  "bg-red-500"
                }`} />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">
                      <span className={sync.color}>{sync.channel}</span> - {
                        sync.status === "success" ? "Sync Completed" :
                        sync.status === "warning" ? "Sync Warning" :
                        "Sync Failed"
                      }
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(sync.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{sync.details}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center">
            <Button variant="outline" size="sm">
              View All Activity
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Booking Calendar Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bookings</CardTitle>
          <CardDescription>
            Next 7 days of bookings across all channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border rounded-md">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Calendar className="h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-medium">Booking Calendar</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                View and manage all your upcoming bookings in one place with our integrated calendar view.
              </p>
              <Link href="/dashboard/calendar">
                <Button className="mt-2">
                  Open Calendar
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  )
}
