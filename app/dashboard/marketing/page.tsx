"use client"; // Convert to Client Component

import { DashboardShell } from "@/app/dashboard/components/dashboard-shell";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BarChart, Calendar, Users, CheckCircle2 } from "lucide-react";

export default function MarketingPage() {
  // Placeholder data for campaign metrics
  const metrics = [
    { label: "Active Campaigns", value: "3", icon: <BarChart className="h-5 w-5 text-blue-500" /> },
    { label: "Scheduled", value: "2", icon: <Calendar className="h-5 w-5 text-green-500" /> },
    { label: "Completed", value: "8", icon: <CheckCircle2 className="h-5 w-5 text-purple-500" /> },
    { label: "Total Reach", value: "4,200", icon: <Users className="h-5 w-5 text-orange-500" /> },
  ];

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl font-bold">Marketing & Promotions</h1>
          <div className="flex gap-2 items-center">
            <DateRangePicker onUpdate={() => {}} />
            <Button variant="outline">Filter</Button>
            <Button>Create Promotion</Button>
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

        {/* Campaigns Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with real campaign list/table */}
              <div className="h-32 flex items-center justify-center text-muted-foreground">
                [Active Campaigns List]
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Scheduled Campaigns</CardTitle>
            </CardHeader>
            <CardContent>
              {/* TODO: Replace with real campaign list/table */}
              <div className="h-32 flex items-center justify-center text-muted-foreground">
                [Scheduled Campaigns List]
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Past Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with real campaign list/table */}
            <div className="h-32 flex items-center justify-center text-muted-foreground">
              [Past Campaigns List]
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}
