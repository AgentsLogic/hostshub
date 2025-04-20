"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ChannelDetails({ channelId = "ch_1" }) {
  // This would typically fetch channel data based on the ID
  const channel = {
    id: channelId,
    name: "Airbnb",
    type: "airbnb",
    properties: 12,
    status: "connected",
    lastSync: "2023-06-01T10:30:00Z",
    apiKey: "ak_***********************",
    autoSync: true,
    syncInterval: "hourly",
    connectedProperties: [
      { id: "p1", name: "Seaside Villa", status: "active" },
      { id: "p2", name: "Mountain Cabin", status: "active" },
      { id: "p3", name: "Downtown Loft", status: "inactive" },
    ],
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">{channel.name}</h2>
          <p className="text-muted-foreground">Channel ID: {channel.id}</p>
        </div>
        <Badge
          variant={channel.status === "connected" ? "default" : channel.status === "pending" ? "outline" : "secondary"}
        >
          {channel.status.charAt(0).toUpperCase() + channel.status.slice(1)}
        </Badge>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connected Properties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{channel.properties}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{new Date(channel.lastSync).toLocaleString()}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sync Interval</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold capitalize">{channel.syncInterval}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Auto Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{channel.autoSync ? "Enabled" : "Disabled"}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Channel Information</CardTitle>
              <CardDescription>Details about your {channel.name} channel connection.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Channel Type</div>
                  <div className="capitalize">{channel.type}</div>
                </div>
                <div>
                  <div className="text-sm font-medium">API Key</div>
                  <div>{channel.apiKey}</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Disconnect</Button>
              <Button>Sync Now</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="properties" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connected Properties</CardTitle>
              <CardDescription>Properties that are synced with this channel.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channel.connectedProperties.map((property) => (
                  <div key={property.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{property.name}</div>
                      <div className="text-sm text-muted-foreground">ID: {property.id}</div>
                    </div>
                    <Badge variant={property.status === "active" ? "default" : "secondary"}>
                      {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Connect New Property</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Channel Settings</CardTitle>
              <CardDescription>Configure how this channel syncs with your properties.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-sync">Auto Sync</Label>
                  <div className="text-sm text-muted-foreground">Automatically sync data with this channel</div>
                </div>
                <Switch id="auto-sync" checked={channel.autoSync} />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Sync Interval</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={channel.syncInterval === "hourly" ? "default" : "outline"}>Hourly</Button>
                  <Button variant={channel.syncInterval === "daily" ? "default" : "outline"}>Daily</Button>
                  <Button variant={channel.syncInterval === "weekly" ? "default" : "outline"}>Weekly</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

