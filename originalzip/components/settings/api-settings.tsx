"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Copy, Key, RefreshCw } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ApiSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>API Access</CardTitle>
          <CardDescription>Manage your API keys and access to the platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="warning">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Your API keys grant full access to your account. Never share them publicly or in client-side code.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="keys">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="keys">API Keys</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>

            <TabsContent value="keys" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Production API Key</div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center rounded-md bg-muted p-2">
                      <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                      <code className="text-sm">sk_live_*****************************</code>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Created on June 12, 2023 • Last used 2 hours ago
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">Test API Key</div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Regenerate
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center rounded-md bg-muted p-2">
                      <Key className="mr-2 h-4 w-4 text-muted-foreground" />
                      <code className="text-sm">sk_test_*****************************</code>
                    </div>
                    <div className="text-sm text-muted-foreground">Created on June 12, 2023 • Last used 5 days ago</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4 pt-4">
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Booking Webhook</div>
                      <div className="text-sm text-muted-foreground">Receive notifications for booking events</div>
                    </div>
                    <Switch id="booking-webhook" />
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Label htmlFor="booking-webhook-url">Webhook URL</Label>
                    <div className="flex space-x-2">
                      <Input id="booking-webhook-url" defaultValue="https://example.com/webhooks/bookings" />
                      <Button variant="outline">Test</Button>
                    </div>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Channel Webhook</div>
                      <div className="text-sm text-muted-foreground">Receive notifications for channel events</div>
                    </div>
                    <Switch id="channel-webhook" />
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <Label htmlFor="channel-webhook-url">Webhook URL</Label>
                    <div className="flex space-x-2">
                      <Input id="channel-webhook-url" defaultValue="https://example.com/webhooks/channels" />
                      <Button variant="outline">Test</Button>
                    </div>
                  </div>
                </div>

                <Button>Add New Webhook</Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Usage</CardTitle>
          <CardDescription>Monitor your API usage and rate limits</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium">Requests Today</div>
                <div className="mt-1 text-2xl font-bold">1,245</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium">Requests This Month</div>
                <div className="mt-1 text-2xl font-bold">28,492</div>
              </div>
              <div className="rounded-md border p-4">
                <div className="text-sm font-medium">Rate Limit</div>
                <div className="mt-1 text-2xl font-bold">100/min</div>
              </div>
            </div>

            <div className="rounded-md border p-4">
              <div className="font-medium">Recent API Requests</div>
              <div className="mt-2 text-sm">
                <div className="text-muted-foreground">View detailed API logs in the developer dashboard</div>
                <Button variant="link" className="h-auto p-0 text-sm">
                  Open Developer Dashboard
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

