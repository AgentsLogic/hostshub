import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function WhiteLabelNav() {
  return (
    <Card>
      <CardHeader>
        <CardTitle style={{ color: "#4682B4" }}>White-Label Navigation</CardTitle>
        <CardDescription style={{ color: "#4A5568" }}>Manage your white-label settings and clients</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/dashboard/white-label">
            <Button variant="outline" className="w-full justify-start">
              General Settings
            </Button>
          </Link>
          <Link href="/dashboard/white-label/clients">
            <Button variant="outline" className="w-full justify-start">
              Manage Clients
            </Button>
          </Link>
          <Link href="/dashboard/white-label/domains">
            <Button variant="outline" className="w-full justify-start">
              Custom Domains
            </Button>
          </Link>
          <Link href="/dashboard/white-label/preview">
            <Button variant="outline" className="w-full justify-start">
              Preview
            </Button>
          </Link>
          <Link href="/dashboard/white-label/templates">
            <Button variant="outline" className="w-full justify-start">
              Email Templates
            </Button>
          </Link>
          <Link href="/dashboard/white-label/analytics">
            <Button variant="outline" className="w-full justify-start">
              Client Analytics
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

