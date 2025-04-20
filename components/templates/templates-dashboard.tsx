"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TemplatesGrid } from "@/components/templates/templates-grid"
import { TemplateFilters } from "@/components/templates/template-filters"

export function TemplatesDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Website Templates</h2>
        <div className="flex items-center space-x-2">
          <Button>+ Create Template</Button>
        </div>
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Templates</TabsTrigger>
          <TabsTrigger value="modern">Modern</TabsTrigger>
          <TabsTrigger value="luxury">Luxury</TabsTrigger>
          <TabsTrigger value="rustic">Rustic</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
        <TemplateFilters />
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Websites</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">+3 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Most Popular</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Modern</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Custom Templates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
          </div>
          <TemplatesGrid />
        </TabsContent>
        <TabsContent value="modern" className="space-y-4">
          {/* Modern templates content */}
        </TabsContent>
        <TabsContent value="luxury" className="space-y-4">
          {/* Luxury templates content */}
        </TabsContent>
        <TabsContent value="rustic" className="space-y-4">
          {/* Rustic templates content */}
        </TabsContent>
        <TabsContent value="custom" className="space-y-4">
          {/* Custom templates content */}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default TemplatesDashboard

