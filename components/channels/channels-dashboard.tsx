"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChannelsTable } from "@/components/channels/channels-table"
import { ChannelDetails } from "@/components/channels/channel-details"
import { ConnectChannelDialog } from "@/components/channels/connect-channel-dialog"

export function ChannelsDashboard() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null)
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Channel Management</h2>
        <div className="flex items-center space-x-2">
          <Button onClick={() => setIsConnectDialogOpen(true)}>+ Connect Channel</Button>
        </div>
      </div>
      <Tabs defaultValue="connected" className="space-y-4">
        <TabsList>
          <TabsTrigger value="connected">Connected Channels</TabsTrigger>
          <TabsTrigger value="available">Available Channels</TabsTrigger>
          <TabsTrigger value="performance">Channel Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="connected" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Connected Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">+2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bookings via Channels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,245</div>
                <p className="text-xs text-muted-foreground">+18% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Channel Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$32,450</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Commission</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.5%</div>
                <p className="text-xs text-muted-foreground">-0.5% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Connected Channels</CardTitle>
                <CardDescription>Manage your connected distribution channels</CardDescription>
              </CardHeader>
              <CardContent>
                <ChannelsTable onSelectChannel={setSelectedChannel} />
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Channel Details</CardTitle>
                <CardDescription>
                  {selectedChannel ? "View and manage channel details" : "Select a channel to view details"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedChannel ? (
                  <ChannelDetails channelId={selectedChannel} />
                ) : (
                  <div className="flex h-[400px] items-center justify-center text-muted-foreground">
                    No channel selected
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="available" className="space-y-4">
          {/* Available channels content */}
        </TabsContent>
        <TabsContent value="performance" className="space-y-4">
          {/* Channel performance metrics */}
        </TabsContent>
      </Tabs>
      <ConnectChannelDialog open={isConnectDialogOpen} onOpenChange={setIsConnectDialogOpen} />
    </div>
  )
}

export default ChannelsDashboard

