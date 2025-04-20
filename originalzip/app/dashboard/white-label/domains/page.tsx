import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { WhiteLabelNav } from "@/app/dashboard/components/white-label-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

export default function WhiteLabelDomainsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Custom Domains" text="Set up custom domains for your white-labeled platform." />
      <div className="grid gap-8">
        <WhiteLabelNav />

        <Card>
          <CardHeader>
            <CardTitle style={{ color: "#4682B4" }}>Domain Settings</CardTitle>
            <CardDescription style={{ color: "#4A5568" }}>
              Configure custom domains for your clients to access their branded platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primary-domain">Primary Domain</Label>
                <div className="flex gap-2">
                  <Input id="primary-domain" placeholder="yourbrand.com" />
                  <Button>Verify</Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  This is your main domain for your white-labeled platform.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="client-subdomain">Client Subdomain Pattern</Label>
                <div className="flex gap-2 items-center">
                  <Input id="client-subdomain" placeholder="client-name" className="max-w-[200px]" />
                  <span>.yourbrand.com</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each client will get their own subdomain based on this pattern.
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-medium">DNS Configuration</h3>
              <p className="text-sm text-muted-foreground">
                Add these DNS records to your domain provider to set up your custom domain.
              </p>

              <div className="rounded-md bg-muted p-4">
                <pre className="text-sm">
                  <code>
                    Type: CNAME
                    <br />
                    Host: @<br />
                    Value: hostshub-custom.vercel.app
                    <br />
                    TTL: 3600
                  </code>
                </pre>
              </div>
            </div>

            <Button className="w-full sm:w-auto">Save Domain Settings</Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

