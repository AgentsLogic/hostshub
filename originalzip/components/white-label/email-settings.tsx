"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Mail, Send } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function EmailSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Email Sender Settings</CardTitle>
          <CardDescription>Customize the sender information for all outgoing emails</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="from-name">From Name</Label>
              <Input id="from-name" defaultValue="Vacation Rentals Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reply-to">Reply-To Email</Label>
              <Input id="reply-to" type="email" defaultValue="support@yourdomain.com" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="custom-email-domain">Use Custom Email Domain</Label>
              <Switch id="custom-email-domain" />
            </div>
            <p className="text-sm text-muted-foreground">
              Send emails from your own domain instead of our default domain
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="from-email">From Email</Label>
            <div className="flex items-center space-x-2">
              <Input id="from-email" defaultValue="bookings" />
              <span>@</span>
              <Select defaultValue="stayapp.com">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stayapp.com">stayapp.com</SelectItem>
                  <SelectItem value="yourdomain.com">yourdomain.com</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Domain Verification Required</AlertTitle>
            <AlertDescription>
              To use a custom email domain, you'll need to verify ownership by adding DNS records.
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button>Save Sender Settings</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Customize the email templates sent to your guests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="booking">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="booking">Booking</TabsTrigger>
              <TabsTrigger value="confirmation">Confirmation</TabsTrigger>
              <TabsTrigger value="reminder">Reminder</TabsTrigger>
              <TabsTrigger value="review">Review</TabsTrigger>
            </TabsList>

            <TabsContent value="booking" className="space-y-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Booking Request Email</h3>
                  <p className="text-sm text-muted-foreground">Sent when a guest requests a booking</p>
                </div>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  Active
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="booking-subject">Email Subject</Label>
                <Input id="booking-subject" defaultValue="Your booking request for {{property_name}}" />
                <p className="text-xs text-muted-foreground">
                  Available variables: {{ property_name }}, {{ guest_name }}, {{ check_in }}, {{ check_out }}
                </p>
              </div>

              <div className="rounded-md border">
                <div className="flex items-center justify-between bg-muted p-2">
                  <div className="text-sm font-medium">Email Preview</div>
                  <Button variant="ghost" size="sm">
                    Edit Template
                  </Button>
                </div>
                <div className="p-4">
                  <div className="rounded-md border p-4">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div className="text-sm font-medium">Your booking request for Seaside Villa</div>
                    </div>
                    <Separator className="my-2" />
                    <div className="space-y-2 text-sm">
                      <p>Dear John,</p>
                      <p>Thank you for your booking request for Seaside Villa.</p>
                      <p>Your stay details:</p>
                      <ul className="list-inside list-disc space-y-1">
                        <li>Check-in: June 1, 2023</li>
                        <li>Check-out: June 7, 2023</li>
                        <li>Guests: 4</li>
                        <li>Total: $1,200</li>
                      </ul>
                      <p>We'll confirm your booking shortly.</p>
                      <p>
                        Best regards,
                        <br />
                        Vacation Rentals Inc.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Button variant="outline">Send Test Email</Button>
                <Button>Save Template</Button>
              </div>
            </TabsContent>

            <TabsContent value="confirmation" className="pt-4">
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <h3 className="font-medium">Confirmation Email Template</h3>
                  <p className="text-sm text-muted-foreground">Click to customize the confirmation email template</p>
                  <Button variant="outline" className="mt-2">
                    Edit Template
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reminder" className="pt-4">
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <h3 className="font-medium">Reminder Email Template</h3>
                  <p className="text-sm text-muted-foreground">Click to customize the reminder email template</p>
                  <Button variant="outline" className="mt-2">
                    Edit Template
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="review" className="pt-4">
              <div className="flex h-40 items-center justify-center rounded-md border border-dashed">
                <div className="text-center">
                  <h3 className="font-medium">Review Request Email Template</h3>
                  <p className="text-sm text-muted-foreground">Click to customize the review request email template</p>
                  <Button variant="outline" className="mt-2">
                    Edit Template
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Email Delivery</CardTitle>
          <CardDescription>Configure email delivery settings and test your setup</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Email Delivery Status</h3>
                <Badge variant="outline" className="bg-green-100 text-green-800">
                  <Check className="mr-1 h-3 w-3" />
                  Active
                </Badge>
              </div>
              <Button variant="outline" size="sm">
                View Delivery Logs
              </Button>
            </div>

            <Separator className="my-4" />

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <div className="text-sm font-medium">Emails Sent (30 days)</div>
                <div className="text-2xl font-bold">1,245</div>
              </div>
              <div>
                <div className="text-sm font-medium">Delivery Rate</div>
                <div className="text-2xl font-bold">99.2%</div>
              </div>
              <div>
                <div className="text-sm font-medium">Open Rate</div>
                <div className="text-2xl font-bold">68.5%</div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test-email">Send Test Email</Label>
            <div className="flex space-x-2">
              <Input id="test-email" type="email" placeholder="Enter email address" />
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Send Test
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">Send a test email to verify your email delivery setup</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

