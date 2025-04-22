"use client"; // Make this a Client Component

import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "lucide-react";

// Define generateStaticParams to ensure the page gets pre-rendered properly
export function generateStaticParams() {
  return []
}

export default function SmartInsightsPage() {
  // Placeholder data for widgets and charts
  const metrics = [
    { label: "Occupancy Rate", value: "78%", icon: <PieChart className="h-5 w-5 text-blue-500" /> },
    { label: "Total Revenue", value: "$12,400", icon: <BarChart className="h-5 w-5 text-green-500" /> },
    { label: "Bookings", value: "120", icon: <LineChart className="h-5 w-5 text-purple-500" /> },
    { label: "Cancellations", value: "5", icon: <BarChart className="h-5 w-5 text-red-500" /> },
  ];

  // Define the handler function here since it's now a Client Component
  const handleDateUpdate = (dateRange) => {
    console.log("Smart Insights Date range updated:", dateRange);
    // Add logic to handle date updates if needed
  };

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Smart Insights</h1>
          <div className="flex gap-2 items-center">
            {/* Pass the handler function */}
            <DateRangePicker onUpdate={handleDateUpdate} />
            <Button variant="outline">Export</Button>
          </div>
        </div>

        {/* Metrics Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((metric) => (
            <Card key={metric.label}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                {metric.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Occupancy Trend</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with real chart component and data */}
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                [Occupancy Trend Chart]
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with real chart component and data */}
              <div className="h-48 flex items-center justify-center text-muted-foreground">
                [Revenue Chart]
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Insights Table/List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with real table/list component and data */}
            <div className="text-muted-foreground">No recent activity to display.</div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
