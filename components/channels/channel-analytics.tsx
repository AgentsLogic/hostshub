"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from "chart.js"
import { Line, Bar, Pie, Doughnut } from "react-chartjs-2"
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  BarChart as BarChartIcon,
  PieChart as PieChartIcon
} from "lucide-react"

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement, 
  ArcElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
)

// Mock data for channel analytics
const generateMockData = (timeRange: string) => {
  // Generate labels based on time range
  let labels: string[] = []
  
  if (timeRange === "7d") {
    labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  } else if (timeRange === "30d") {
    labels = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)
  } else if (timeRange === "90d") {
    labels = Array.from({ length: 12 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (90 - i * 7))
      return `Week ${i + 1}`
    })
  }
  
  // Generate revenue data
  const revenueData = {
    labels,
    datasets: [
      {
        label: "Airbnb",
        data: labels.map(() => Math.floor(Math.random() * 1000) + 500),
        borderColor: "rgb(239, 68, 68)",
        backgroundColor: "rgba(239, 68, 68, 0.5)",
        tension: 0.3,
      },
      {
        label: "Booking.com",
        data: labels.map(() => Math.floor(Math.random() * 800) + 400),
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        tension: 0.3,
      },
      {
        label: "VRBO",
        data: labels.map(() => Math.floor(Math.random() * 600) + 300),
        borderColor: "rgb(34, 197, 94)",
        backgroundColor: "rgba(34, 197, 94, 0.5)",
        tension: 0.3,
      },
    ],
  }
  
  // Generate occupancy data
  const occupancyData = {
    labels,
    datasets: [
      {
        label: "Airbnb",
        data: labels.map(() => Math.floor(Math.random() * 40) + 60),
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
      {
        label: "Booking.com",
        data: labels.map(() => Math.floor(Math.random() * 30) + 50),
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "VRBO",
        data: labels.map(() => Math.floor(Math.random() * 35) + 55),
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  }
  
  // Generate distribution data
  const distributionData = {
    labels: ["Airbnb", "Booking.com", "VRBO"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          "rgba(239, 68, 68, 0.7)",
          "rgba(59, 130, 246, 0.7)",
          "rgba(34, 197, 94, 0.7)",
        ],
        borderColor: [
          "rgb(239, 68, 68)",
          "rgb(59, 130, 246)",
          "rgb(34, 197, 94)",
        ],
        borderWidth: 1,
      },
    ],
  }
  
  // Generate booking lead time data
  const leadTimeData = {
    labels: ["0-7 days", "8-14 days", "15-30 days", "31-60 days", "60+ days"],
    datasets: [
      {
        label: "Airbnb",
        data: [15, 25, 30, 20, 10],
        backgroundColor: "rgba(239, 68, 68, 0.7)",
      },
      {
        label: "Booking.com",
        data: [25, 30, 25, 15, 5],
        backgroundColor: "rgba(59, 130, 246, 0.7)",
      },
      {
        label: "VRBO",
        data: [10, 20, 35, 25, 10],
        backgroundColor: "rgba(34, 197, 94, 0.7)",
      },
    ],
  }
  
  // Generate price comparison data
  const priceComparisonData = {
    labels,
    datasets: [
      {
        label: "Your Average Price",
        data: labels.map(() => Math.floor(Math.random() * 50) + 150),
        borderColor: "rgb(99, 102, 241)",
        backgroundColor: "rgba(99, 102, 241, 0.5)",
        borderWidth: 2,
        type: "line" as const,
        yAxisID: "y",
      },
      {
        label: "Market Average",
        data: labels.map(() => Math.floor(Math.random() * 40) + 140),
        borderColor: "rgb(244, 114, 182)",
        backgroundColor: "rgba(244, 114, 182, 0.5)",
        borderWidth: 2,
        borderDash: [5, 5],
        type: "line" as const,
        yAxisID: "y",
      },
    ],
  }
  
  return {
    revenueData,
    occupancyData,
    distributionData,
    leadTimeData,
    priceComparisonData
  }
}

interface ChannelAnalyticsProps {
  channelId?: string // Optional channel ID to filter data for a specific channel
  timeRange?: "7d" | "30d" | "90d" // Default time range
}

export function ChannelAnalytics({ 
  channelId,
  timeRange: initialTimeRange = "7d" 
}: ChannelAnalyticsProps) {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">(initialTimeRange)
  const [chartData, setChartData] = useState(generateMockData(timeRange))
  
  // Update chart data when time range changes
  useEffect(() => {
    setChartData(generateMockData(timeRange))
  }, [timeRange])
  
  // Chart options
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => "$" + value,
        },
      },
    },
  }
  
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + "%";
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: any) => value + "%",
        },
      },
    },
  }
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value}%`;
          },
        },
      },
    },
  }
  
  const leadTimeOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + "%";
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: any) => value + "%",
        },
      },
    },
  }
  
  const priceComparisonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
              }).format(context.parsed.y);
            }
            return label;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value: any) => "$" + value,
        },
      },
    },
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Channel Analytics</CardTitle>
          <Select value={timeRange} onValueChange={(value: "7d" | "30d" | "90d") => setTimeRange(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription>
          Detailed analytics across all your connected booking channels
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="revenue" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Revenue</span>
            </TabsTrigger>
            <TabsTrigger value="occupancy" className="flex items-center gap-2">
              <BarChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Occupancy</span>
            </TabsTrigger>
            <TabsTrigger value="distribution" className="flex items-center gap-2">
              <PieChartIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Distribution</span>
            </TabsTrigger>
            <TabsTrigger value="lead-time" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Lead Time</span>
            </TabsTrigger>
            <TabsTrigger value="price-comparison" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Pricing</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="revenue" className="h-[400px]">
            <Line data={chartData.revenueData} options={lineOptions} />
          </TabsContent>
          
          <TabsContent value="occupancy" className="h-[400px]">
            <Bar data={chartData.occupancyData} options={barOptions} />
          </TabsContent>
          
          <TabsContent value="distribution" className="h-[400px]">
            <div className="flex justify-center items-center h-full">
              <div className="w-[300px] h-[300px]">
                <Doughnut data={chartData.distributionData} options={pieOptions} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="lead-time" className="h-[400px]">
            <Bar data={chartData.leadTimeData} options={leadTimeOptions} />
          </TabsContent>
          
          <TabsContent value="price-comparison" className="h-[400px]">
            <Line data={chartData.priceComparisonData} options={priceComparisonOptions} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
