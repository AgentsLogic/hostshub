"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Calendar, DollarSign, ArrowUpDown, Save, RefreshCw, Info } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, Bar, BarChart } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"

// Mock data for properties
const mockProperties = [
  { id: "1", name: "Beach Villa", location: "Miami, FL", basePrice: 250, minPrice: 180, maxPrice: 450 },
  { id: "2", name: "Mountain Cabin", location: "Aspen, CO", basePrice: 200, minPrice: 150, maxPrice: 350 },
  { id: "3", name: "City Apartment", location: "New York, NY", basePrice: 180, minPrice: 120, maxPrice: 300 },
  { id: "4", name: "Lake House", location: "Lake Tahoe, CA", basePrice: 300, minPrice: 220, maxPrice: 500 },
]

// Mock data for pricing history
const mockPricingHistory = [
  { date: "2023-01", avgPrice: 220, occupancy: 65, revenue: 4290 },
  { date: "2023-02", avgPrice: 235, occupancy: 75, revenue: 5287 },
  { date: "2023-03", avgPrice: 245, occupancy: 80, revenue: 5880 },
  { date: "2023-04", avgPrice: 260, occupancy: 85, revenue: 6630 },
  { date: "2023-05", avgPrice: 280, occupancy: 90, revenue: 7560 },
  { date: "2023-06", avgPrice: 320, occupancy: 95, revenue: 9120 },
  { date: "2023-07", avgPrice: 350, occupancy: 98, revenue: 10290 },
  { date: "2023-08", avgPrice: 340, occupancy: 96, revenue: 9792 },
  { date: "2023-09", avgPrice: 300, occupancy: 85, revenue: 7650 },
  { date: "2023-10", avgPrice: 270, occupancy: 80, revenue: 6480 },
  { date: "2023-11", avgPrice: 250, occupancy: 70, revenue: 5250 },
  { date: "2023-12", avgPrice: 290, occupancy: 85, revenue: 7395 },
]

// Mock data for competitor pricing
const mockCompetitorPricing = [
  { property: "Similar Property 1", avgPrice: 265, minPrice: 190, maxPrice: 420, distance: 0.5 },
  { property: "Similar Property 2", avgPrice: 240, minPrice: 175, maxPrice: 380, distance: 0.8 },
  { property: "Similar Property 3", avgPrice: 255, minPrice: 185, maxPrice: 400, distance: 1.2 },
  { property: "Similar Property 4", avgPrice: 270, minPrice: 200, maxPrice: 430, distance: 1.5 },
]

// Mock data for seasonal pricing
const mockSeasonalPricing = [
  { month: "Jan", avgPrice: 220, demand: "Low" },
  { month: "Feb", avgPrice: 235, demand: "Low" },
  { month: "Mar", avgPrice: 245, demand: "Medium" },
  { month: "Apr", avgPrice: 260, demand: "Medium" },
  { month: "May", avgPrice: 280, demand: "Medium" },
  { month: "Jun", avgPrice: 320, demand: "High" },
  { month: "Jul", avgPrice: 350, demand: "High" },
  { month: "Aug", avgPrice: 340, demand: "High" },
  { month: "Sep", avgPrice: 300, demand: "Medium" },
  { month: "Oct", avgPrice: 270, demand: "Medium" },
  { month: "Nov", avgPrice: 250, demand: "Low" },
  { month: "Dec", avgPrice: 290, demand: "High" },
]

// Mock data for special events
const mockSpecialEvents = [
  { id: "1", name: "Local Festival", dates: "2023-07-15 to 2023-07-20", impact: "High", suggestedIncrease: 25 },
  { id: "2", name: "Sports Tournament", dates: "2023-08-05 to 2023-08-10", impact: "Medium", suggestedIncrease: 15 },
  { id: "3", name: "Conference", dates: "2023-09-22 to 2023-09-25", impact: "High", suggestedIncrease: 30 },
  { id: "4", name: "Holiday Season", dates: "2023-12-20 to 2023-12-31", impact: "Very High", suggestedIncrease: 40 },
]

// Mock data for price recommendations
const mockPriceRecommendations = [
  { date: "2023-11-01", dayOfWeek: "Wednesday", basePrice: 250, recommendedPrice: 225, reason: "Low season, mid-week" },
  {
    date: "2023-11-02",
    dayOfWeek: "Thursday",
    basePrice: 250,
    recommendedPrice: 235,
    reason: "Low season, approaching weekend",
  },
  { date: "2023-11-03", dayOfWeek: "Friday", basePrice: 250, recommendedPrice: 275, reason: "Weekend premium" },
  { date: "2023-11-04", dayOfWeek: "Saturday", basePrice: 250, recommendedPrice: 295, reason: "Weekend premium" },
  { date: "2023-11-05", dayOfWeek: "Sunday", basePrice: 250, recommendedPrice: 265, reason: "Weekend premium" },
  {
    date: "2023-11-06",
    dayOfWeek: "Monday",
    basePrice: 250,
    recommendedPrice: 225,
    reason: "Low season, beginning of week",
  },
  { date: "2023-11-07", dayOfWeek: "Tuesday", basePrice: 250, recommendedPrice: 225, reason: "Low season, mid-week" },
  { date: "2023-11-08", dayOfWeek: "Wednesday", basePrice: 250, recommendedPrice: 225, reason: "Low season, mid-week" },
  {
    date: "2023-11-09",
    dayOfWeek: "Thursday",
    basePrice: 250,
    recommendedPrice: 235,
    reason: "Low season, approaching weekend",
  },
  { date: "2023-11-10", dayOfWeek: "Friday", basePrice: 250, recommendedPrice: 275, reason: "Weekend premium" },
  { date: "2023-11-11", dayOfWeek: "Saturday", basePrice: 250, recommendedPrice: 295, reason: "Weekend premium" },
  { date: "2023-11-12", dayOfWeek: "Sunday", basePrice: 250, recommendedPrice: 265, reason: "Weekend premium" },
  {
    date: "2023-11-13",
    dayOfWeek: "Monday",
    basePrice: 250,
    recommendedPrice: 225,
    reason: "Low season, beginning of week",
  },
  { date: "2023-11-14", dayOfWeek: "Tuesday", basePrice: 250, recommendedPrice: 225, reason: "Low season, mid-week" },
]

export default function PricingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedProperty, setSelectedProperty] = useState<string>("1")
  const [activeTab, setActiveTab] = useState("overview")
  const [basePrice, setBasePrice] = useState(250)
  const [minPrice, setMinPrice] = useState(180)
  const [maxPrice, setMaxPrice] = useState(450)
  const [weekendPremium, setWeekendPremium] = useState(20)
  const [seasonalAdjustment, setSeasonalAdjustment] = useState(15)
  const [lastMinuteDiscount, setLastMinuteDiscount] = useState(10)
  const [earlyBookingBonus, setEarlyBookingBonus] = useState(5)
  const [lengthOfStayDiscount, setLengthOfStayDiscount] = useState(15)
  const [autoAdjust, setAutoAdjust] = useState(true)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [pricingRules, setPricingRules] = useState([
    { id: "1", name: "Weekend Premium", enabled: true, value: 20, type: "percentage" },
    { id: "2", name: "Seasonal Adjustment", enabled: true, value: 15, type: "percentage" },
    { id: "3", name: "Last Minute Discount", enabled: true, value: 10, type: "percentage" },
    { id: "4", name: "Early Booking Bonus", enabled: true, value: 5, type: "percentage" },
    { id: "5", name: "Length of Stay Discount", enabled: true, value: 15, type: "percentage" },
    { id: "6", name: "Cleaning Fee", enabled: true, value: 75, type: "fixed" },
    { id: "7", name: "Special Event Premium", enabled: true, value: 25, type: "percentage" },
  ])

  useEffect(() => {
    // Simulate API call to fetch data
    setTimeout(() => {
      const property = mockProperties.find((p) => p.id === selectedProperty)
      if (property) {
        setBasePrice(property.basePrice)
        setMinPrice(property.minPrice)
        setMaxPrice(property.maxPrice)
      }
      setIsLoading(false)
    }, 1000)
  }, [selectedProperty])

  const handlePropertyChange = (value: string) => {
    setIsLoading(true)
    setSelectedProperty(value)
  }

  const handleSaveSettings = () => {
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Pricing settings saved successfully",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleApplyRecommendations = () => {
    setIsLoading(true)
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Price recommendations applied successfully",
      })
      setIsLoading(false)
    }, 1000)
  }

  const handleTogglePricingRule = (id: string) => {
    setPricingRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  const handleUpdatePricingRuleValue = (id: string, value: number) => {
    setPricingRules((prev) => prev.map((rule) => (rule.id === id ? { ...rule, value } : rule)))
  }

  const getPropertyById = (id: string) => {
    return mockProperties.find((p) => p.id === id) || mockProperties[0]
  }

  const formatCurrency = (value: number) => {
    return `$${value.toFixed(0)}`
  }

  const formatPercentage = (value: number) => {
    return `${value}%`
  }

  const getRevenueChange = () => {
    const lastMonth = mockPricingHistory[mockPricingHistory.length - 2].revenue
    const currentMonth = mockPricingHistory[mockPricingHistory.length - 1].revenue
    const change = ((currentMonth - lastMonth) / lastMonth) * 100
    return change.toFixed(1)
  }

  const getOccupancyChange = () => {
    const lastMonth = mockPricingHistory[mockPricingHistory.length - 2].occupancy
    const currentMonth = mockPricingHistory[mockPricingHistory.length - 1].occupancy
    const change = currentMonth - lastMonth
    return change.toFixed(1)
  }

  const getAveragePriceChange = () => {
    const lastMonth = mockPricingHistory[mockPricingHistory.length - 2].avgPrice
    const currentMonth = mockPricingHistory[mockPricingHistory.length - 1].avgPrice
    const change = ((currentMonth - lastMonth) / lastMonth) * 100
    return change.toFixed(1)
  }

  const getCompetitorPriceComparison = () => {
    const avgCompetitorPrice =
      mockCompetitorPricing.reduce((sum, item) => sum + item.avgPrice, 0) / mockCompetitorPricing.length
    const difference = ((basePrice - avgCompetitorPrice) / avgCompetitorPrice) * 100
    return difference.toFixed(1)
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Dynamic Pricing"
        text="Optimize your property pricing to maximize revenue and occupancy."
      />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Select value={selectedProperty} onValueChange={handlePropertyChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              {mockProperties.map((property) => (
                <SelectItem key={property.id} value={property.id}>
                  {property.name} - {property.location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Button onClick={handleSaveSettings}>
            <Save className="mr-2 h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">${mockPricingHistory[mockPricingHistory.length - 1].revenue}</CardTitle>
                <CardDescription>
                  Monthly Revenue
                  <span
                    className={`ml-2 ${Number.parseFloat(getRevenueChange()) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {Number.parseFloat(getRevenueChange()) >= 0 ? "↑" : "↓"} {getRevenueChange()}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPricingHistory.slice(-6)}>
                      <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">
                  {mockPricingHistory[mockPricingHistory.length - 1].occupancy}%
                </CardTitle>
                <CardDescription>
                  Occupancy Rate
                  <span
                    className={`ml-2 ${Number.parseFloat(getOccupancyChange()) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {Number.parseFloat(getOccupancyChange()) >= 0 ? "↑" : "↓"} {getOccupancyChange()}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPricingHistory.slice(-6)}>
                      <Line type="monotone" dataKey="occupancy" stroke="#3b82f6" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-2xl">
                  ${mockPricingHistory[mockPricingHistory.length - 1].avgPrice}
                </CardTitle>
                <CardDescription>
                  Average Nightly Rate
                  <span
                    className={`ml-2 ${Number.parseFloat(getAveragePriceChange()) >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {Number.parseFloat(getAveragePriceChange()) >= 0 ? "↑" : "↓"} {getAveragePriceChange()}%
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-10">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockPricingHistory.slice(-6)}>
                      <Line type="monotone" dataKey="avgPrice" stroke="#ec4899" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-2 md:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rules">Pricing Rules</TabsTrigger>
              <TabsTrigger value="calendar">Calendar View</TabsTrigger>
              <TabsTrigger value="competitors">Competitor Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Price Settings</CardTitle>
                    <CardDescription>
                      Configure base price and limits for {getPropertyById(selectedProperty).name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="base-price">Base Price</Label>
                        <span className="text-muted-foreground">${basePrice}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <Input
                          id="base-price"
                          type="number"
                          value={basePrice}
                          onChange={(e) => setBasePrice(Number.parseInt(e.target.value))}
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="min-price">Minimum Price</Label>
                        <span className="text-muted-foreground">${minPrice}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          id="min-price"
                          value={[minPrice]}
                          min={50}
                          max={basePrice}
                          step={5}
                          onValueChange={(value) => setMinPrice(value[0])}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="max-price">Maximum Price</Label>
                        <span className="text-muted-foreground">${maxPrice}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                        <Slider
                          id="max-price"
                          value={[maxPrice]}
                          min={basePrice}
                          max={basePrice * 2}
                          step={5}
                          onValueChange={(value) => setMaxPrice(value[0])}
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-2">
                      <Switch id="auto-adjust" checked={autoAdjust} onCheckedChange={setAutoAdjust} />
                      <Label htmlFor="auto-adjust">Enable automatic price adjustments</Label>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Price Performance</CardTitle>
                    <CardDescription>Historical pricing and occupancy data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          avgPrice: {
                            label: "Average Price",
                            color: "hsl(var(--chart-1))",
                          },
                          occupancy: {
                            label: "Occupancy Rate",
                            color: "hsl(var(--chart-2))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mockPricingHistory}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis yAxisId="left" orientation="left" />
                            <YAxis yAxisId="right" orientation="right" />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Line
                              yAxisId="left"
                              type="monotone"
                              dataKey="avgPrice"
                              stroke="var(--color-avgPrice)"
                              activeDot={{ r: 8 }}
                            />
                            <Line yAxisId="right" type="monotone" dataKey="occupancy" stroke="var(--color-occupancy)" />
                          </LineChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Seasonal Pricing Trends</CardTitle>
                    <CardDescription>Monthly price variations and demand levels</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          avgPrice: {
                            label: "Average Price",
                            color: "hsl(var(--chart-1))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={mockSeasonalPricing}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="avgPrice" fill="var(--color-avgPrice)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                    <div className="mt-4">
                      <h4 className="text-sm font-medium mb-2">Demand Levels</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {["Low", "Medium", "High"].map((level) => (
                          <div key={level} className="flex items-center gap-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                level === "Low" ? "bg-blue-400" : level === "Medium" ? "bg-yellow-400" : "bg-red-400"
                              }`}
                            ></div>
                            <span className="text-sm">{level}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Special Events</CardTitle>
                    <CardDescription>Upcoming events that may affect pricing</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockSpecialEvents.map((event) => (
                        <div key={event.id} className="flex justify-between items-start border-b pb-3">
                          <div>
                            <h4 className="font-medium">{event.name}</h4>
                            <p className="text-sm text-muted-foreground">{event.dates}</p>
                          </div>
                          <div className="text-right">
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs ${
                                event.impact === "High" || event.impact === "Very High"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {event.impact} Impact
                            </span>
                            <p className="text-sm mt-1">+{event.suggestedIncrease}% suggested</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <Calendar className="mr-2 h-4 w-4" />
                      Add Special Event
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="rules" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Rules</CardTitle>
                  <CardDescription>Configure rules that automatically adjust your base price</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {pricingRules.map((rule) => (
                      <div key={rule.id} className="flex flex-col space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id={`rule-${rule.id}`}
                              checked={rule.enabled}
                              onCheckedChange={() => handleTogglePricingRule(rule.id)}
                            />
                            <Label htmlFor={`rule-${rule.id}`} className="font-medium">
                              {rule.name}
                            </Label>
                            <TooltipProvider>
                              <UITooltip>
                                <TooltipTrigger asChild>
                                  <Info className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="max-w-xs">
                                    {rule.name === "Weekend Premium" &&
                                      "Increase prices for Friday, Saturday, and Sunday nights."}
                                    {rule.name === "Seasonal Adjustment" &&
                                      "Adjust prices based on seasonal demand patterns."}
                                    {rule.name === "Last Minute Discount" &&
                                      "Offer discounts for bookings made within 7 days of check-in."}
                                    {rule.name === "Early Booking Bonus" &&
                                      "Increase prices for bookings made more than 90 days in advance."}
                                    {rule.name === "Length of Stay Discount" &&
                                      "Offer discounts for bookings of 7 nights or longer."}
                                    {rule.name === "Cleaning Fee" &&
                                      "Fixed fee added to each booking to cover cleaning costs."}
                                    {rule.name === "Special Event Premium" &&
                                      "Increase prices during local events, holidays, or high-demand periods."}
                                  </p>
                                </TooltipContent>
                              </UITooltip>
                            </TooltipProvider>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Input
                              id={`rule-value-${rule.id}`}
                              type="number"
                              className="w-20"
                              value={rule.value}
                              onChange={(e) => handleUpdatePricingRuleValue(rule.id, Number.parseInt(e.target.value))}
                              disabled={!rule.enabled}
                            />
                            <span className="text-sm text-muted-foreground">
                              {rule.type === "percentage" ? "%" : "$"}
                            </span>
                          </div>
                        </div>
                        <div className="pl-7">
                          <p className="text-sm text-muted-foreground">
                            {rule.name === "Weekend Premium" &&
                              "Increases prices for Friday, Saturday, and Sunday nights."}
                            {rule.name === "Seasonal Adjustment" && "Adjusts prices based on seasonal demand patterns."}
                            {rule.name === "Last Minute Discount" &&
                              "Offers discounts for bookings made within 7 days of check-in."}
                            {rule.name === "Early Booking Bonus" &&
                              "Increases prices for bookings made more than 90 days in advance."}
                            {rule.name === "Length of Stay Discount" &&
                              "Offers discounts for bookings of 7 nights or longer."}
                            {rule.name === "Cleaning Fee" && "Fixed fee added to each booking to cover cleaning costs."}
                            {rule.name === "Special Event Premium" &&
                              "Increases prices during local events, holidays, or high-demand periods."}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">Reset to Defaults</Button>
                  <Button onClick={handleSaveSettings}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Rules
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="calendar" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Price Recommendations</CardTitle>
                  <CardDescription>Optimized pricing for upcoming dates</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Day</TableHead>
                        <TableHead>Base Price</TableHead>
                        <TableHead>Recommended</TableHead>
                        <TableHead>Adjustment</TableHead>
                        <TableHead>Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockPriceRecommendations.map((rec) => (
                        <TableRow key={rec.date}>
                          <TableCell>{rec.date}</TableCell>
                          <TableCell>{rec.dayOfWeek}</TableCell>
                          <TableCell>${rec.basePrice}</TableCell>
                          <TableCell>${rec.recommendedPrice}</TableCell>
                          <TableCell>
                            <span
                              className={`${rec.recommendedPrice > rec.basePrice ? "text-green-500" : "text-red-500"}`}
                            >
                              {rec.recommendedPrice > rec.basePrice ? "+" : ""}
                              {(((rec.recommendedPrice - rec.basePrice) / rec.basePrice) * 100).toFixed(0)}%
                            </span>
                          </TableCell>
                          <TableCell>{rec.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleApplyRecommendations}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Apply All Recommendations
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="competitors" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Competitor Analysis</CardTitle>
                  <CardDescription>Compare your pricing with similar properties in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                      <div>
                        <h3 className="font-medium">Your Price vs. Competitors</h3>
                        <p className="text-sm text-muted-foreground">
                          Your base price is{" "}
                          {Number.parseFloat(getCompetitorPriceComparison()) >= 0 ? "above" : "below"} the average
                          competitor price
                        </p>
                      </div>
                      <div className="text-2xl font-bold">
                        <span
                          className={`${Number.parseFloat(getCompetitorPriceComparison()) >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {Number.parseFloat(getCompetitorPriceComparison()) >= 0 ? "+" : ""}
                          {getCompetitorPriceComparison()}%
                        </span>
                      </div>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Property</TableHead>
                          <TableHead>Avg. Price</TableHead>
                          <TableHead>Min Price</TableHead>
                          <TableHead>Max Price</TableHead>
                          <TableHead>Distance</TableHead>
                          <TableHead>Difference</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow className="bg-muted/50">
                          <TableCell className="font-medium">
                            {getPropertyById(selectedProperty).name} (Your Property)
                          </TableCell>
                          <TableCell>${basePrice}</TableCell>
                          <TableCell>${minPrice}</TableCell>
                          <TableCell>${maxPrice}</TableCell>
                          <TableCell>-</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        {mockCompetitorPricing.map((comp) => (
                          <TableRow key={comp.property}>
                            <TableCell>{comp.property}</TableCell>
                            <TableCell>${comp.avgPrice}</TableCell>
                            <TableCell>${comp.minPrice}</TableCell>
                            <TableCell>${comp.maxPrice}</TableCell>
                            <TableCell>{comp.distance} miles</TableCell>
                            <TableCell>
                              <span className={`${basePrice > comp.avgPrice ? "text-green-500" : "text-red-500"}`}>
                                {basePrice > comp.avgPrice ? "+" : ""}
                                {(((basePrice - comp.avgPrice) / comp.avgPrice) * 100).toFixed(0)}%
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>

                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          avgPrice: {
                            label: "Average Price",
                            color: "hsl(var(--chart-1))",
                          },
                          minPrice: {
                            label: "Minimum Price",
                            color: "hsl(var(--chart-2))",
                          },
                          maxPrice: {
                            label: "Maximum Price",
                            color: "hsl(var(--chart-3))",
                          },
                        }}
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={[
                              { name: "Your Property", avgPrice: basePrice, minPrice, maxPrice },
                              ...mockCompetitorPricing.map((comp) => ({
                                name: comp.property,
                                avgPrice: comp.avgPrice,
                                minPrice: comp.minPrice,
                                maxPrice: comp.maxPrice,
                              })),
                            ]}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Legend />
                            <Bar dataKey="avgPrice" fill="var(--color-avgPrice)" />
                            <Bar dataKey="minPrice" fill="var(--color-minPrice)" />
                            <Bar dataKey="maxPrice" fill="var(--color-maxPrice)" />
                          </BarChart>
                        </ResponsiveContainer>
                      </ChartContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      )}
    </DashboardShell>
  )
}

