import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Download, Clock } from "lucide-react"

// Mock subscription data
const subscription = {
  plan: "Professional",
  status: "active",
  nextBilling: "2023-10-15",
  amount: 49,
  features: [
    "Up to 10 properties",
    "Channel manager",
    "Website builder",
    "Guest communication tools",
    "Analytics and reporting",
    "Priority support",
  ],
}

// Mock payment methods
const paymentMethods = [
  {
    id: "1",
    type: "card",
    last4: "4242",
    expiry: "04/25",
    brand: "Visa",
    isDefault: true,
  },
]

// Mock invoices
const invoices = [
  {
    id: "1",
    date: "2023-09-15",
    amount: 49,
    status: "paid",
  },
  {
    id: "2",
    date: "2023-08-15",
    amount: 49,
    status: "paid",
  },
  {
    id: "3",
    date: "2023-07-15",
    amount: 49,
    status: "paid",
  },
]

export default function BillingPage() {
  return (
    <DashboardShell>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and payment methods</p>
      </div>

      <Tabs defaultValue="subscription">
        <TabsList>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payment-methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>
        <TabsContent value="subscription" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your current subscription plan and details</CardDescription>
                </div>
                <Badge variant="default">{subscription.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-bold">{subscription.plan} Plan</h3>
                <p className="text-sm text-muted-foreground">${subscription.amount}/month</p>
              </div>
              <div>
                <p className="text-sm font-medium">Next billing date:</p>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{subscription.nextBilling}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Features included:</p>
                <ul className="space-y-1">
                  {subscription.features.map((feature, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-primary"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel Subscription</Button>
              <Button>Upgrade Plan</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="payment-methods" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <div className="mr-4 p-2 rounded-full bg-muted">
                      <CreditCard className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {method.brand} •••• {method.last4}
                      </p>
                      <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {method.isDefault && (
                      <Badge variant="outline" className="mr-2">
                        Default
                      </Badge>
                    )}
                    <Button variant="ghost" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button>Add Payment Method</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Invoices</CardTitle>
              <CardDescription>View and download your invoices</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium border-b">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div className="text-right">Actions</div>
                </div>
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-4 p-4 border-b last:border-0">
                    <div>{invoice.date}</div>
                    <div>${invoice.amount}</div>
                    <div>
                      <Badge variant={invoice.status === "paid" ? "default" : "outline"}>{invoice.status}</Badge>
                    </div>
                    <div className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

