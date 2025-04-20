"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function PropertyChannels({ propertyId = "p1" }) {
  // This would typically fetch channel data based on the property ID
  const channels = [
    {
      id: "ch_1",
      name: "Airbnb",
      status: "connected",
      lastSync: "2023-06-01T10:30:00Z",
      autoSync: true,
    },
    {
      id: "ch_2",
      name: "Booking.com",
      status: "connected",
      lastSync: "2023-06-01T09:45:00Z",
      autoSync: true,
    },
    {
      id: "ch_3",
      name: "VRBO",
      status: "disconnected",
      lastSync: "2023-05-28T14:20:00Z",
      autoSync: false,
    },
    {
      id: "ch_4",
      name: "Expedia",
      status: "pending",
      lastSync: "-",
      autoSync: false,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Connected Channels</CardTitle>
          <CardDescription>Manage distribution channels for this property</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Auto Sync</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {channels.map((channel) => (
                <TableRow key={channel.id}>
                  <TableCell className="font-medium">{channel.name}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        channel.status === "connected"
                          ? "default"
                          : channel.status === "pending"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {channel.status.charAt(0).toUpperCase() + channel.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{channel.lastSync === "-" ? "-" : new Date(channel.lastSync).toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch id={`auto-sync-${channel.id}`} checked={channel.autoSync} />
                      <Label htmlFor={`auto-sync-${channel.id}`}>{channel.autoSync ? "On" : "Off"}</Label>
                    </div>
                  </TableCell>
                  <TableCell>
                    {channel.status === "connected" ? (
                      <Button variant="outline" size="sm">
                        Sync Now
                      </Button>
                    ) : channel.status === "disconnected" ? (
                      <Button size="sm">Reconnect</Button>
                    ) : (
                      <Button size="sm">Complete Setup</Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Connect New Channel</Button>
      </div>
    </div>
  )
}

