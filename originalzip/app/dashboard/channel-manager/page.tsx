import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, RefreshCw, Settings } from "lucide-react"
import Link from "next/link"

// Mock channel data
const channels = [
  {
    id: "1",
    name: "Airbnb",
    logo: "/placeholder.svg?height=40&width=40",
    status: "connected",
    lastSync: "2 hours ago",
    properties: 3,
    color: "text-red-500",
  },
  {
    id: "2",
    name: "Booking.com",
    logo: "/placeholder.svg?height=40&width=40",
    status: "connected",
    lastSync: "1 hour ago",
    properties: 2,
    color: "text-blue-500",
  },
  {
    id: "3",
    name: "VRBO",
    logo: "/placeholder.svg?height=40&width=40",
    status: "disconnected",
    lastSync: "Never",
    properties: 0,
    color: "text-green-500",
  },
  {
    id: "4",
    name: "Expedia",
    logo: "/placeholder.svg?height=40&width=40",
    status: "disconnected",
    lastSync: "Never",
    properties: 0,
    color: "text-yellow-500",
  },
]

export default function ChannelManagerPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Channel Manager</h1>
          <p className="text-muted-foreground">Connect and manage your listings across multiple booking platforms</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync All
          </Button>
          <Link href="/dashboard/channel-manager/connect">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Connect Channel
            </Button>
          </Link>
        </div>
      </div>

      <Tabs defaultValue="connected">
        <TabsList>
          <TabsTrigger value="connected">Connected</TabsTrigger>
          <TabsTrigger value="all">All Channels</TabsTrigger>
        </TabsList>
        <TabsContent value="connected" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels
            .filter((channel) => channel.status === "connected")
            .map((channel) => (
              <Card key={channel.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="flex items-center space-x-2">
                    <div className="h-10 w-10 rounded-full overflow-hidden">
                      <img
                        src={channel.logo || "/placeholder.svg"}
                        alt={channel.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <CardTitle className={`text-lg ${channel.color}`}>{channel.name}</CardTitle>
                      <CardDescription>
                        {channel.properties} {channel.properties === 1 ? "property" : "properties"}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={channel.status === "connected" ? "default" : "outline"}>{channel.status}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-sm font-medium">Last Sync</p>
                      <p className="text-sm text-muted-foreground">{channel.lastSync}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <p className="text-sm text-muted-foreground">All systems operational</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="mr-2 h-3 w-3" />
                    Sync Now
                  </Button>
                  <Link href={`/dashboard/channel-manager/${channel.id}/settings`}>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-3 w-3" />
                      Settings
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
        </TabsContent>
        <TabsContent value="all" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Card key={channel.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img
                      src={channel.logo || "/placeholder.svg"}
                      alt={channel.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <CardTitle className={`text-lg ${channel.color}`}>{channel.name}</CardTitle>
                    <CardDescription>
                      {channel.properties} {channel.properties === 1 ? "property" : "properties"}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={channel.status === "connected" ? "default" : "outline"}>{channel.status}</Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <p className="text-sm font-medium">Last Sync</p>
                    <p className="text-sm text-muted-foreground">{channel.lastSync}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Status</p>
                    <p className="text-sm text-muted-foreground">
                      {channel.status === "connected" ? "All systems operational" : "Not connected"}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {channel.status === "connected" ? (
                  <>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="mr-2 h-3 w-3" />
                      Sync Now
                    </Button>
                    <Link href={`/dashboard/channel-manager/${channel.id}/settings`}>
                      <Button variant="outline" size="sm">
                        <Settings className="mr-2 h-3 w-3" />
                        Settings
                      </Button>
                    </Link>
                  </>
                ) : (
                  <Link href={`/dashboard/channel-manager/connect/${channel.id}`} className="w-full">
                    <Button className="w-full">
                      <Plus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

