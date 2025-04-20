"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Check, ExternalLink, Globe, RefreshCw } from "lucide-react"

export function DomainSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Custom Domain</CardTitle>
          <CardDescription>Connect your own domain to your property websites</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup defaultValue="subdomain">
            <div className="flex items-start space-x-3 rounded-md border p-3">
              <RadioGroupItem value="subdomain" id="subdomain" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="subdomain" className="font-medium">
                  Use a Subdomain
                </Label>
                <div className="mt-2 flex items-center space-x-2">
                  <Input defaultValue="myproperties" />
                  <span>.stayapp.com</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Quick and easy setup with no additional configuration required.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 rounded-md border p-3">
              <RadioGroupItem value="custom" id="custom" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="custom" className="font-medium">
                  Use a Custom Domain
                </Label>
                <div className="mt-2">
                  <Input placeholder="yourdomain.com" />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Use your own domain for a fully branded experience. Requires DNS configuration.
                </p>
              </div>
            </div>
          </RadioGroup>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Domain Verification Required</AlertTitle>
            <AlertDescription>
              After adding your custom domain, you'll need to verify ownership by adding DNS records.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button>Save Domain Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>DNS Configuration</CardTitle>
          <CardDescription>Configure your DNS settings to connect your custom domain</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">yourdomain.com</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Pending Verification</Badge>
                  <Button variant="ghost" size="sm" className="h-auto p-0">
                    <RefreshCw className="mr-1 h-3 w-3" />
                    Check Status
                  </Button>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Globe className="mr-2 h-4 w-4" />
                Visit Site
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Required DNS Records</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>A</TableCell>
                    <TableCell>@</TableCell>
                    <TableCell>76.76.21.21</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Pending
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>CNAME</TableCell>
                    <TableCell>www</TableCell>
                    <TableCell>cname.stayapp.com</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-100 text-green-800">
                        <Check className="mr-1 h-3 w-3" />
                        Verified
                      </Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>TXT</TableCell>
                    <TableCell>@</TableCell>
                    <TableCell>stayapp-verification=abc123</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                        Pending
                      </Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-sm">
              <p>
                Need help with DNS configuration?{" "}
                <Button variant="link" className="h-auto p-0">
                  View DNS Guide
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>SSL Certificate</CardTitle>
          <CardDescription>Secure your website with HTTPS encryption</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">SSL Certificate Status</h3>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  Active
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                Renew Certificate
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <div className="text-sm font-medium">Issued To</div>
                <div className="text-sm">*.yourdomain.com, yourdomain.com</div>
              </div>
              <div>
                <div className="text-sm font-medium">Issuer</div>
                <div className="text-sm">Let's Encrypt Authority X3</div>
              </div>
              <div>
                <div className="text-sm font-medium">Valid From</div>
                <div className="text-sm">June 1, 2023</div>
              </div>
              <div>
                <div className="text-sm font-medium">Valid Until</div>
                <div className="text-sm">August 30, 2023</div>
              </div>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Automatic Renewal</AlertTitle>
            <AlertDescription>
              SSL certificates are automatically renewed 30 days before expiration. No action is required.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

