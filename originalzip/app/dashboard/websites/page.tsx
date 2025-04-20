import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Plus } from "lucide-react"
import Link from "next/link"

// Mock websites data
const websites = [
  {
    id: "1",
    name: "Luxury Beach House",
    url: "beach-house.hostshub.com",
    template: "Modern",
    visitors: 245,
    lastUpdated: "2023-09-15",
  },
  {
    id: "2",
    name: "Downtown Loft",
    url: "downtown-loft.hostshub.com",
    template: "Luxury",
    visitors: 189,
    lastUpdated: "2023-09-10",
  },
  {
    id: "3",
    name: "Mountain Cabin",
    url: "mountain-cabin.hostshub.com",
    template: "Rustic",
    visitors: 132,
    lastUpdated: "2023-09-05",
  },
]

export default function WebsitesPage() {
  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Property Websites</h1>
          <p className="text-muted-foreground">Manage your property websites and templates</p>
        </div>
        <Link href="/dashboard/websites/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Website
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {websites.map((website) => (
          <Card key={website.id}>
            <CardHeader>
              <CardTitle>{website.name}</CardTitle>
              <CardDescription>{website.url}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Template:</span>
                  <span className="text-sm font-medium">{website.template}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Visitors:</span>
                  <span className="text-sm font-medium">{website.visitors}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Last Updated:</span>
                  <span className="text-sm font-medium">{website.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`https://${website.url}`} target="_blank">
                <Button variant="outline" size="sm">
                  <Globe className="mr-2 h-4 w-4" />
                  Visit
                </Button>
              </Link>
              <Link href={`/dashboard/websites/${website.id}/edit`}>
                <Button size="sm">Edit</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </DashboardShell>
  )
}

