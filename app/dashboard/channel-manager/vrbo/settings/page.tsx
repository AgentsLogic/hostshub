"use client"

import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, RefreshCw, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

export default function VrboSettingsPage() {
  const { toast } = useToast()
  const router = useRouter()

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your VRBO settings have been updated",
    })
    router.refresh()
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">VRBO Settings</h1>
          <p className="text-muted-foreground">
            Configure how your properties sync with VRBO
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Now
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sync" className="mt-6">
        <TabsList>
          <TabsTrigger value="sync">Sync Settings</TabsTrigger>
          <TabsTrigger value="pricing">Pricing Rules</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="sync" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sync Settings</CardTitle>
              <CardDescription>
                Control how often your listings sync with VRBO
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Sync Frequency</h3>
                  <p className="text-sm text-muted-foreground">
                    How often your listings update on VRBO
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <select className="w-full rounded-md border p-2">
                    <option>Every 15 minutes</option>
                    <option>Every hour</option>
                    <option>Every 6 hours</option>
                    <option>Every 24 hours</option>
                    <option>Manual only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Instant Booking</h3>
                  <p className="text-sm text-muted-foreground">
                    Allow guests to book without approval
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="instant-booking" className="h-4 w-4" />
                  <label htmlFor="instant-booking" className="text-sm">
                    Enable Instant Booking
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Base Pricing</CardTitle>
              <CardDescription>
                Set your default nightly rates and currency
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <select className="w-full rounded-md border p-2">
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nightly Rate</label>
                <input type="number" className="w-full rounded-md border p-2" placeholder="100" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Pricing</CardTitle>
              <CardDescription>
                Adjust prices for specific date ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input type="date" className="w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input type="date" className="w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price Adjustment</label>
                    <div className="flex">
                      <select className="rounded-l-md border p-2">
                        <option>+</option>
                        <option>-</option>
                      </select>
                      <input type="number" className="w-full rounded-r-md border p-2" placeholder="20" />
                      <select className="rounded-r-md border p-2">
                        <option>%</option>
                        <option>$</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Seasonal Pricing
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Length-of-Stay Discounts</CardTitle>
              <CardDescription>
                Offer discounts for longer bookings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Minimum Nights</label>
                  <input type="number" className="w-full rounded-md border p-2" placeholder="7" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Type</label>
                  <select className="w-full rounded-md border p-2">
                    <option>Percentage</option>
                    <option>Fixed Amount</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Value</label>
                  <input type="number" className="w-full rounded-md border p-2" placeholder="10" />
                </div>
              </div>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Discount
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Fees</CardTitle>
              <CardDescription>
                Set cleaning fees and other charges
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cleaning Fee</label>
                <input type="number" className="w-full rounded-md border p-2" placeholder="50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Security Deposit</label>
                <input type="number" className="w-full rounded-md border p-2" placeholder="200" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Availability Settings</CardTitle>
              <CardDescription>
                Control how your availability syncs with VRBO
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Availability settings configuration will go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Configure advanced VRBO integration options
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced settings configuration will go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
