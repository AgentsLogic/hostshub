import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Lightbulb, TrendingUp, DollarSign, Calendar } from "lucide-react"

// Mock insights data
const insights = [
  {
    id: "1",
    title: "Price Optimization",
    description:
      'Your "Luxury Beach House" is priced 15% below market average for similar properties in your area during peak season.',
    impact: "high",
    category: "pricing",
    recommendation: "Consider increasing your nightly rate by 10-15% for bookings between June and August.",
  },
  {
    id: "2",
    title: "Booking Pattern",
    description:
      'Most of your bookings for "Downtown Loft" are made 2-3 weeks in advance, shorter than the market average of 4-6 weeks.',
    impact: "medium",
    category: "bookings",
    recommendation: "Offer early booking discounts to encourage guests to book further in advance.",
  },
  {
    id: "3",
    title: "Amenity Impact",
    description: "Properties with hot tubs in your area see 25% higher occupancy rates and 15% higher nightly rates.",
    impact: "medium",
    category: "amenities",
    recommendation: 'Consider adding a hot tub to your "Mountain Cabin" property to increase appeal and revenue.',
  },
  {
    id: "4",
    title: "Seasonal Trend",
    description: "October-November bookings are trending up 30% in your area compared to last year.",
    impact: "high",
    category: "trends",
    recommendation:
      "Ensure your properties are well-marketed for fall bookings and consider seasonal pricing adjustments.",
  },
]

export default function SmartInsightsPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Smart Insights</h1>
        <p className="text-muted-foreground">AI-powered insights and recommendations to optimize your properties</p>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Insights</TabsTrigger>
          <TabsTrigger value="pricing">Pricing</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="trends">Market Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          {insights.map((insight) => (
            <Card key={insight.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center">
                  <div className="mr-2 p-2 rounded-full bg-primary/10">
                    <Lightbulb className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{insight.title}</CardTitle>
                    <CardDescription>{insight.category} insight</CardDescription>
                  </div>
                </div>
                <Badge
                  variant={
                    insight.impact === "high" ? "default" : insight.impact === "medium" ? "secondary" : "outline"
                  }
                >
                  {insight.impact} impact
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{insight.description}</p>
                <div className="bg-muted p-3 rounded-md mb-4">
                  <div className="flex items-start">
                    <div className="mr-2 mt-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium">Recommendation:</p>
                  </div>
                  <p className="text-sm mt-1 ml-6">{insight.recommendation}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Dismiss
                  </Button>
                  <Button size="sm">Apply Recommendation</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="pricing" className="space-y-4">
          {insights
            .filter((i) => i.category === "pricing")
            .map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    <div className="mr-2 p-2 rounded-full bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription>{insight.category} insight</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">{insight.impact} impact</Badge>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{insight.description}</p>
                  <div className="bg-muted p-3 rounded-md mb-4">
                    <div className="flex items-start">
                      <div className="mr-2 mt-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Recommendation:</p>
                    </div>
                    <p className="text-sm mt-1 ml-6">{insight.recommendation}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                    <Button size="sm">Apply Recommendation</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="bookings" className="space-y-4">
          {insights
            .filter((i) => i.category === "bookings")
            .map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    <div className="mr-2 p-2 rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription>{insight.category} insight</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{insight.impact} impact</Badge>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{insight.description}</p>
                  <div className="bg-muted p-3 rounded-md mb-4">
                    <div className="flex items-start">
                      <div className="mr-2 mt-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Recommendation:</p>
                    </div>
                    <p className="text-sm mt-1 ml-6">{insight.recommendation}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                    <Button size="sm">Apply Recommendation</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="trends" className="space-y-4">
          {insights
            .filter((i) => i.category === "trends")
            .map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center">
                    <div className="mr-2 p-2 rounded-full bg-primary/10">
                      <TrendingUp className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                      <CardDescription>{insight.category} insight</CardDescription>
                    </div>
                  </div>
                  <Badge variant="default">{insight.impact} impact</Badge>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{insight.description}</p>
                  <div className="bg-muted p-3 rounded-md mb-4">
                    <div className="flex items-start">
                      <div className="mr-2 mt-1">
                        <TrendingUp className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm font-medium">Recommendation:</p>
                    </div>
                    <p className="text-sm mt-1 ml-6">{insight.recommendation}</p>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                    <Button size="sm">Apply Recommendation</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

