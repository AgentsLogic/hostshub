"use client"

import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  BarChart3, 
  Settings, 
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function DynamicPricingPage() {
  const [activeTab, setActiveTab] = useState("overview")
  
  // Mock data for properties
  const properties = [
    {
      id: 1,
      name: "Beach Villa",
      location: "California",
      basePrice: 250,
      recommendedPrice: 295,
      occupancy: 78,
      trend: "up",
      image: "/placeholder.jpg"
    },
    {
      id: 2,
      name: "Mountain Cabin",
      location: "Colorado",
      basePrice: 180,
      recommendedPrice: 165,
      occupancy: 62,
      trend: "down",
      image: "/placeholder.jpg"
    },
    {
      id: 3,
      name: "City Apartment",
      location: "New York",
      basePrice: 200,
      recommendedPrice: 240,
      occupancy: 85,
      trend: "up",
      image: "/placeholder.jpg"
    },
    {
      id: 4,
      name: "Lakeside Cottage",
      location: "Michigan",
      basePrice: 150,
      recommendedPrice: 175,
      occupancy: 70,
      trend: "up",
      image: "/placeholder.jpg"
    }
  ]
  
  // Mock data for upcoming events
  const events = [
    {
      id: 1,
      name: "Summer Music Festival",
      date: "Jun 15-20, 2025",
      impact: "high",
      priceEffect: "+25%"
    },
    {
      id: 2,
      name: "Tech Conference",
      date: "Jul 8-10, 2025",
      impact: "medium",
      priceEffect: "+15%"
    },
    {
      id: 3,
      name: "Local Sports Tournament",
      date: "May 22-24, 2025",
      impact: "low",
      priceEffect: "+8%"
    }
  ]
  
  // Mock data for market insights
  const insights = [
    {
      id: 1,
      title: "Seasonal Trend",
      description: "Summer prices trending 18% higher than last year",
      action: "Consider increasing summer rates"
    },
    {
      id: 2,
      title: "Competitor Analysis",
      description: "Similar properties in your area are priced 5% higher",
      action: "Review your base pricing strategy"
    },
    {
      id: 3,
      title: "Booking Window",
      description: "Guests are booking 45 days in advance on average",
      action: "Adjust early booking discounts"
    }
  ]
  
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dynamic Pricing</h1>
          <p className="text-muted-foreground">
            Optimize your property rates based on market demand and trends
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Refresh Data</span>
          </Button>
          <Button className="gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Average Price Increase
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Revenue Impact
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,250</div>
            <p className="text-xs text-muted-foreground">
              Additional monthly revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Occupancy Rate
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              +5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Price Recommendations
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">
              New recommendations today
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview" className="gap-1">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="properties" className="gap-1">
            <DollarSign className="h-4 w-4" />
            Property Pricing
          </TabsTrigger>
          <TabsTrigger value="insights" className="gap-1">
            <TrendingUp className="h-4 w-4" />
            Market Insights
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Recommendations</CardTitle>
              <CardDescription>
                Review and apply dynamic pricing recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {properties.map((property) => (
                    <Card key={property.id} className="overflow-hidden">
                      <div className="aspect-video bg-muted">
                        <img
                          src={property.image}
                          alt={property.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-medium">{property.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {property.location}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Base Price</p>
                            <p className="text-lg">${property.basePrice}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium">Recommended</p>
                            <div className="flex items-center">
                              <p className="text-lg">${property.recommendedPrice}</p>
                              {property.trend === "up" ? (
                                <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />
                              ) : (
                                <ArrowDownRight className="ml-1 h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Button className="w-full">Apply Recommendation</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>
                Events that may impact pricing in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <h3 className="font-medium">{event.name}</h3>
                      <p className="text-sm text-muted-foreground">{event.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={
                        event.impact === "high" ? "bg-red-100 text-red-800" :
                        event.impact === "medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-blue-100 text-blue-800"
                      }>
                        {event.impact} impact
                      </Badge>
                      <span className="font-medium text-green-600">{event.priceEffect}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="properties" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Property Pricing Details</CardTitle>
              <CardDescription>
                Detailed pricing information for each property
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Property</th>
                      <th className="text-left p-2">Base Price</th>
                      <th className="text-left p-2">Current Price</th>
                      <th className="text-left p-2">Recommended</th>
                      <th className="text-left p-2">Occupancy</th>
                      <th className="text-left p-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map((property) => (
                      <tr key={property.id} className="border-b">
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded overflow-hidden">
                              <img
                                src={property.image}
                                alt={property.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{property.name}</div>
                              <div className="text-sm text-muted-foreground">{property.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-2">${property.basePrice}</td>
                        <td className="p-2">${property.basePrice}</td>
                        <td className="p-2">
                          <div className="flex items-center">
                            ${property.recommendedPrice}
                            {property.trend === "up" ? (
                              <ArrowUpRight className="ml-1 h-4 w-4 text-green-500" />
                            ) : (
                              <ArrowDownRight className="ml-1 h-4 w-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-full max-w-24 rounded-full bg-gray-200">
                              <div
                                className="h-full rounded-full bg-primary"
                                style={{ width: `${property.occupancy}%` }}
                              ></div>
                            </div>
                            <span>{property.occupancy}%</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <Button size="sm">Apply</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="insights" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Insights</CardTitle>
              <CardDescription>
                Data-driven insights to optimize your pricing strategy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {insights.map((insight) => (
                  <div key={insight.id} className="border-b pb-6 last:border-0 last:pb-0">
                    <h3 className="font-medium text-lg">{insight.title}</h3>
                    <p className="mt-1">{insight.description}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-primary">
                      <Info className="h-4 w-4" />
                      <span>Recommendation: {insight.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Competitor Analysis</CardTitle>
                <CardDescription>
                  How your prices compare to similar properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Price comparison chart</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Trends</CardTitle>
                <CardDescription>
                  Historical pricing patterns by season
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-60 flex items-center justify-center bg-muted rounded-md">
                  <p className="text-muted-foreground">Seasonal trend chart</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="mt-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 flex gap-3">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Dynamic Pricing Integration</h3>
              <p className="text-xs text-blue-700 mt-1">
                Connect your channel managers to automatically apply price recommendations.
                <Link href="/dashboard/channel-manager" className="ml-1 underline">
                  Manage channel connections
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
