"use client"

import { useState } from "react"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Filter, Plus } from "lucide-react"
import { BarChart } from "@/components/charts"

// Mock data for financial reports
const monthlyRevenue = [
  { month: "Jan", revenue: 4200, expenses: 1800, profit: 2400 },
  { month: "Feb", revenue: 4500, expenses: 1900, profit: 2600 },
  { month: "Mar", revenue: 5100, expenses: 2100, profit: 3000 },
  { month: "Apr", revenue: 5700, expenses: 2300, profit: 3400 },
  { month: "May", revenue: 6200, expenses: 2500, profit: 3700 },
  { month: "Jun", revenue: 7100, expenses: 2800, profit: 4300 },
  { month: "Jul", revenue: 8200, expenses: 3100, profit: 5100 },
  { month: "Aug", revenue: 8900, expenses: 3300, profit: 5600 },
  { month: "Sep", revenue: 8400, expenses: 3200, profit: 5200 },
  { month: "Oct", revenue: 7800, expenses: 3000, profit: 4800 },
  { month: "Nov", revenue: 7200, expenses: 2900, profit: 4300 },
  { month: "Dec", revenue: 6800, expenses: 2700, profit: 4100 },
]

const propertyRevenue = [
  { name: "Oceanview Villa", value: 28000, color: "#8884d8" },
  { name: "Downtown Loft", value: 22000, color: "#83a6ed" },
  { name: "Mountain Cabin", value: 18000, color: "#8dd1e1" },
  { name: "Beachfront Condo", value: 25000, color: "#82ca9d" },
  { name: "Luxury Apartment", value: 19000, color: "#a4de6c" },
]

const expenseCategories = [
  { name: "Cleaning", value: 8500, color: "#0088FE" },
  { name: "Maintenance", value: 6200, color: "#00C49F" },
  { name: "Utilities", value: 4800, color: "#FFBB28" },
  { name: "Property Management", value: 7300, color: "#FF8042" },
  { name: "Insurance", value: 3600, color: "#8884d8" },
  { name: "Taxes", value: 5100, color: "#82ca9d" },
]

const recentTransactions = [
  {
    id: "t1",
    date: "2023-11-20",
    description: "Booking: Oceanview Villa",
    amount: 1250,
    type: "income",
    property: "Oceanview Villa",
    platform: "Airbnb",
  },
  {
    id: "t2",
    date: "2023-11-18",
    description: "Cleaning Service",
    amount: 120,
    type: "expense",
    property: "Downtown Loft",
    category: "Cleaning",
  },
  {
    id: "t3",
    date: "2023-11-15",
    description: "Booking: Mountain Cabin",
    amount: 850,
    type: "income",
    property: "Mountain Cabin",
    platform: "VRBO",
  },
  {
    id: "t4",
    date: "2023-11-12",
    description: "Plumbing Repair",
    amount: 275,
    type: "expense",
    property: "Beachfront Condo",
    category: "Maintenance",
  },
  {
    id: "t5",
    date: "2023-11-10",
    description: "Booking: Luxury Apartment",
    amount: 920,
    type: "income",
    property: "Luxury Apartment",
    platform: "Booking.com",
  },
  {
    id: "t6",
    date: "2023-11-08",
    description: "Electricity Bill",
    amount: 145,
    type: "expense",
    property: "Oceanview Villa",
    category: "Utilities",
  },
  {
    id: "t7",
    date: "2023-11-05",
    description: "Booking: Downtown Loft",
    amount: 780,
    type: "income",
    property: "Downtown Loft",
    platform: "Airbnb",
  },
]

// Financial summary data
const financialSummary = {
  totalRevenue: 112000,
  totalExpenses: 35500,
  netProfit: 76500,
  occupancyRate: 78,
  averageDailyRate: 195,
  revenueGrowth: 12.5,
}

// Mock transactions data
const transactions = [
  {
    id: "1",
    date: "2023-09-15",
    description: "Booking payment - John Smith",
    property: "Luxury Beach House",
    amount: 1750,
    type: "income",
  },
  {
    id: "2",
    date: "2023-09-14",
    description: "Cleaning service",
    property: "Downtown Loft",
    amount: -120,
    type: "expense",
  },
  {
    id: "3",
    date: "2023-09-12",
    description: "Booking payment - Sarah Johnson",
    property: "Downtown Loft",
    amount: 400,
    type: "income",
  },
  {
    id: "4",
    date: "2023-09-10",
    description: "Plumbing repair",
    property: "Luxury Beach House",
    amount: -250,
    type: "expense",
  },
  {
    id: "5",
    date: "2023-09-08",
    description: "Booking payment - Michael Brown",
    property: "Mountain Cabin",
    amount: 900,
    type: "income",
  },
]

export default function FinancialPage() {
  const [timeframe, setTimeframe] = useState("year")
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Financial</h1>
          <p className="text-muted-foreground">Track revenue, expenses, and financial performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,890</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8,455</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="taxes">Tax Information</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
              <CardDescription>Revenue vs. Expenses for the past 12 months</CardDescription>
            </CardHeader>
            <CardContent className="h-96">
              <BarChart />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">Recent Transactions</h2>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
          <div className="rounded-md border">
            <div className="grid grid-cols-5 p-4 font-medium border-b">
              <div>Date</div>
              <div className="col-span-2">Description</div>
              <div>Property</div>
              <div className="text-right">Amount</div>
            </div>
            {transactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-5 p-4 border-b last:border-0">
                <div>{transaction.date}</div>
                <div className="col-span-2">{transaction.description}</div>
                <div>{transaction.property}</div>
                <div className={`text-right ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.type === "income" ? "+" : "-"}${Math.abs(transaction.amount)}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reports">
          <p className="text-center py-8 text-muted-foreground">Financial reports will be displayed here</p>
        </TabsContent>
        <TabsContent value="taxes">
          <p className="text-center py-8 text-muted-foreground">Tax information and documents will be displayed here</p>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

