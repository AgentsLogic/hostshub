"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Building, Clock } from "lucide-react"

export function BillingSettings() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Subscription Plan</CardTitle>
          <CardDescription>Manage your subscription and billing details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium">Professional Plan</h3>
                <p className="text-sm text-muted-foreground">$49.99 per month</p>
                <ul className="mt-2 text-sm text-muted-foreground">
                  <li>Up to 25 properties</li>
                  <li>Unlimited bookings</li>
                  <li>Channel management</li>
                  <li>Advanced analytics</li>
                </ul>
              </div>
              <Button variant="outline" size="sm">
                Change Plan
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-md border p-4">
            <div className="flex items-center space-x-4">
              <div className="rounded-full bg-primary/10 p-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Next Billing Date</h3>
                <p className="text-sm text-muted-foreground">July 15, 2023</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              Cancel Subscription
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs defaultValue="cards">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cards">Credit Cards</TabsTrigger>
              <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
            </TabsList>

            <TabsContent value="cards" className="space-y-4 pt-4">
              <div className="rounded-md border p-4">
                <RadioGroup defaultValue="card1">
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value="card1" id="card1" className="mt-1" />
                    <div className="flex-1">
                      <div className="flex items-center">
                        <Label htmlFor="card1" className="flex-1 font-medium">
                          Visa ending in 4242
                        </Label>
                        <span className="text-sm text-muted-foreground">Expires 04/24</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Default payment method</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button variant="outline" className="w-full">
                <CreditCard className="mr-2 h-4 w-4" />
                Add New Card
              </Button>
            </TabsContent>

            <TabsContent value="bank" className="space-y-4 pt-4">
              <div className="rounded-md border p-4">
                <RadioGroup defaultValue="bank1">
                  <div className="flex items-start space-x-4">
                    <RadioGroupItem value="bank1" id="bank1" className="mt-1" />
                    <div className="flex-1">
                      <Label htmlFor="bank1" className="font-medium">
                        Chase Bank Account
                      </Label>
                      <p className="text-sm text-muted-foreground">Checking account ending in 5678</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <Button variant="outline" className="w-full">
                <Building className="mr-2 h-4 w-4" />
                Add Bank Account
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Information</CardTitle>
          <CardDescription>Manage your billing address and information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="billingName">Name</Label>
              <Input id="billingName" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name (Optional)</Label>
              <Input id="companyName" defaultValue="Vacation Rentals Inc." />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingEmail">Email</Label>
            <Input id="billingEmail" type="email" defaultValue="john.doe@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingAddress">Address</Label>
            <Input id="billingAddress" defaultValue="123 Main St" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="billingCity">City</Label>
              <Input id="billingCity" defaultValue="New York" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingState">State</Label>
              <Select defaultValue="ny">
                <SelectTrigger id="billingState">
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                  <SelectItem value="fl">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingZip">Zip Code</Label>
              <Input id="billingZip" defaultValue="10001" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="billingCountry">Country</Label>
            <Select defaultValue="us">
              <SelectTrigger id="billingCountry">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button>Save Billing Information</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

