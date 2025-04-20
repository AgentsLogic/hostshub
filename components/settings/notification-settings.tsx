"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage how and when you receive notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="email">Email</TabsTrigger>
            <TabsTrigger value="push">Push</TabsTrigger>
            <TabsTrigger value="sms">SMS</TabsTrigger>
          </TabsList>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-4 pt-4">
              <h3 className="font-medium">Bookings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-new-booking">New Booking</Label>
                  <Switch id="email-new-booking" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-booking-confirmation">Booking Confirmation</Label>
                  <Switch id="email-booking-confirmation" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-booking-cancellation">Booking Cancellation</Label>
                  <Switch id="email-booking-cancellation" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-booking-modification">Booking Modification</Label>
                  <Switch id="email-booking-modification" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Guests</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-guest-message">Guest Message</Label>
                  <Switch id="email-guest-message" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-guest-review">Guest Review</Label>
                  <Switch id="email-guest-review" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Channels</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-channel-sync">Channel Sync Issues</Label>
                  <Switch id="email-channel-sync" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-channel-connection">Channel Connection Status</Label>
                  <Switch id="email-channel-connection" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">System</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-system-updates">System Updates</Label>
                  <Switch id="email-system-updates" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="email-marketing">Marketing & Promotions</Label>
                  <Switch id="email-marketing" />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="push" className="space-y-4">
            <div className="space-y-4 pt-4">
              <h3 className="font-medium">Bookings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-new-booking">New Booking</Label>
                  <Switch id="push-new-booking" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-booking-cancellation">Booking Cancellation</Label>
                  <Switch id="push-booking-cancellation" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Guests</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-guest-message">Guest Message</Label>
                  <Switch id="push-guest-message" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">System</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="push-system-alerts">System Alerts</Label>
                  <Switch id="push-system-alerts" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sms" className="space-y-4">
            <div className="space-y-4 pt-4">
              <h3 className="font-medium">Bookings</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-new-booking">New Booking</Label>
                  <Switch id="sms-new-booking" />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-booking-cancellation">Booking Cancellation</Label>
                  <Switch id="sms-booking-cancellation" />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <h3 className="font-medium">Urgent Notifications</h3>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-urgent-issues">Urgent Property Issues</Label>
                  <Switch id="sms-urgent-issues" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="sms-security-alerts">Security Alerts</Label>
                  <Switch id="sms-security-alerts" defaultChecked />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button>Save Preferences</Button>
      </CardFooter>
    </Card>
  )
}

