"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertiesGrid } from "@/components/properties/properties-grid"
import { PropertiesTable } from "@/components/properties/properties-table"
import { PropertyFilters } from "@/components/properties/property-filters"

export function PropertiesDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Properties</h2>
        <div className="flex items-center space-x-2">
          <Button>+ Add Property</Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex justify-between">
          <TabsList>
            <TabsTrigger value="all">All Properties</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="flex space-x-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              Grid
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("table")}
            >
              Table
            </Button>
          </div>
        </div>
        <PropertyFilters />
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+4 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">38</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.2%</div>
                <p className="text-xs text-muted-foreground">+5.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Daily Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$249.99</div>
                <p className="text-xs text-muted-foreground">+$12 from last month</p>
              </CardContent>
            </Card>
          </div>
          {viewMode === "grid" ? (
            <PropertiesGrid />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>All Properties</CardTitle>
                <CardDescription>Manage your property portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <PropertiesTable />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="active" className="space-y-4">
          {/* Active properties content */}
        </TabsContent>
        <TabsContent value="inactive" className="space-y-4">
          {/* Inactive properties content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default PropertiesDashboard

