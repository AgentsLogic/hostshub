import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
          <Link href="/dashboard/channel-manager/overview">
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/channel-manager/property-mapping">
            <Button variant="outline">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="3" y1="9" x2="21" y2="9" />
                <line x1="9" y1="21" x2="9" y2="9" />
              </svg>
              Property Mapping
            </Button>
          </Link>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </DashboardShell>
  )
}
