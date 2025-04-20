"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { format, addDays } from "date-fns"
import { Plus, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function PricingRulesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState("all")

  // Sample Data - Would come from the database in production
  const [seasonalRates, setSeasonalRates] = useState([
    {
      id: "sr1",
      name: "Summer Season",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      adjustment: "+25%",
      status: "active",
    },
    {
      id: "sr2",
      name: "Winter Holidays",
      startDate: "2023-12-15",
      endDate: "2024-01-05",
      adjustment: "+40%",
      status: "active",
    },
    {
      id: "sr3",
      name: "Low Season",
      startDate: "2023-11-01",
      endDate: "2023-11-30",
      adjustment: "-15%",
      status: "active",
    },
  ])

  const [lengthRules, setLengthRules] = useState([
    {
      id: "lr1",
      nights: 7,
      adjustment: "-10%",
      status: "active",
    },
    {
      id: "lr2",
      nights: 14,
      adjustment: "-15%",
      status: "active",
    },
    {
      id: "lr3",
      nights: 30,
      adjustment: "-25%",
      status: "active",
    },
  ])

  const [dayOfWeekRules, setDayOfWeekRules] = useState([
    {
      id: "dw1",
      days: ["Friday", "Saturday"],
      adjustment: "+15%",
      status: "active",
    },
  ])

  const [lastMinuteRules, setLastMinuteRules] = useState([
    {
      id: "lm1",
      days: 3,
      adjustment: "-10%",
      status: "active",
    },
  ])

  // State for new rules
  const [newSeasonalRate, setNewSeasonalRate] = useState({
    name: "",
    startDate: format(new Date(), "yyyy-MM-dd"),
    endDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
    adjustmentType: "percentage",
    adjustmentValue: "",
    adjustmentDirection: "increase",
  })

  const [newLengthRule, setNewLengthRule] = useState({
    nights: "",
    adjustmentType: "percentage",
    adjustmentValue: "",
    adjustmentDirection: "decrease",
  })

  const [newDayOfWeekRule, setNewDayOfWeekRule] = useState({
    days: [] as string[],
    adjustmentType: "percentage",
    adjustmentValue: "",
    adjustmentDirection: "increase",
  })

  const [newLastMinuteRule, setNewLastMinuteRule] = useState({
    days: "",
    adjustmentType: "percentage",
    adjustmentValue: "",
    adjustmentDirection: "decrease",
  })

  // Dialog states
  const [addSeasonalOpen, setAddSeasonalOpen] = useState(false)
  const [addLengthOpen, setAddLengthOpen] = useState(false)
  const [addDayOfWeekOpen, setAddDayOfWeekOpen] = useState(false)
  const [addLastMinuteOpen, setAddLastMinuteOpen] = useState(false)

  const handleAddSeasonalRate = () => {
    if (
      !newSeasonalRate.name ||
      !newSeasonalRate.startDate ||
      !newSeasonalRate.endDate ||
      !newSeasonalRate.adjustmentValue
    ) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const adjustment = `${newSeasonalRate.adjustmentDirection === "increase" ? "+" : "-"}${newSeasonalRate.adjustmentValue}${newSeasonalRate.adjustmentType === "percentage" ? "%" : ""}`

    setSeasonalRates([
      ...seasonalRates,
      {
        id: `sr${seasonalRates.length + 1}`,
        name: newSeasonalRate.name,
        startDate: newSeasonalRate.startDate,
        endDate: newSeasonalRate.endDate,
        adjustment,
        status: "active",
      },
    ])

    setAddSeasonalOpen(false)
    setNewSeasonalRate({
      name: "",
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(addDays(new Date(), 30), "yyyy-MM-dd"),
      adjustmentType: "percentage",
      adjustmentValue: "",
      adjustmentDirection: "increase",
    })

    toast({
      title: "Success",
      description: "Seasonal rate rule added successfully",
    })
  }

  const handleAddLengthRule = () => {
    if (!newLengthRule.nights || !newLengthRule.adjustmentValue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const adjustment = `${newLengthRule.adjustmentDirection === "increase" ? "+" : "-"}${newLengthRule.adjustmentValue}${newLengthRule.adjustmentType === "percentage" ? "%" : ""}`

    setLengthRules([
      ...lengthRules,
      {
        id: `lr${lengthRules.length + 1}`,
        nights: Number.parseInt(newLengthRule.nights),
        adjustment,
        status: "active",
      },
    ])

    setAddLengthOpen(false)
    setNewLengthRule({
      nights: "",
      adjustmentType: "percentage",
      adjustmentValue: "",
      adjustmentDirection: "decrease",
    })

    toast({
      title: "Success",
      description: "Length of stay rule added successfully",
    })
  }

  const handleAddDayOfWeekRule = () => {
    if (newDayOfWeekRule.days.length === 0 || !newDayOfWeekRule.adjustmentValue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const adjustment = `${newDayOfWeekRule.adjustmentDirection === "increase" ? "+" : "-"}${newDayOfWeekRule.adjustmentValue}${newDayOfWeekRule.adjustmentType === "percentage" ? "%" : ""}`

    setDayOfWeekRules([
      ...dayOfWeekRules,
      {
        id: `dw${dayOfWeekRules.length + 1}`,
        days: newDayOfWeekRule.days,
        adjustment,
        status: "active",
      },
    ])

    setAddDayOfWeekOpen(false)
    setNewDayOfWeekRule({
      days: [],
      adjustmentType: "percentage",
      adjustmentValue: "",
      adjustmentDirection: "increase",
    })

    toast({
      title: "Success",
      description: "Day of week rule added successfully",
    })
  }

  const handleAddLastMinuteRule = () => {
    if (!newLastMinuteRule.days || !newLastMinuteRule.adjustmentValue) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const adjustment = `${newLastMinuteRule.adjustmentDirection === "increase" ? "+" : "-"}${newLastMinuteRule.adjustmentValue}${newLastMinuteRule.adjustmentType === "percentage" ? "%" : ""}`

    setLastMinuteRules([
      ...lastMinuteRules,
      {
        id: `lm${lastMinuteRules.length + 1}`,
        days: Number.parseInt(newLastMinuteRule.days),
        adjustment,
        status: "active",
      },
    ])

    setAddLastMinuteOpen(false)
    setNewLastMinuteRule({
      days: "",
      adjustmentType: "percentage",
      adjustmentValue: "",
      adjustmentDirection: "decrease",
    })

    toast({
      title: "Success",
      description: "Last minute rule added successfully",
    })
  }

  const toggleRuleStatus = (ruleType: string, id: string) => {
    if (ruleType === "seasonal") {
      setSeasonalRates(
        seasonalRates.map((rule) =>
          rule.id === id ? { ...rule, status: rule.status === "active" ? "inactive" : "active" } : rule,
        ),
      )
    } else if (ruleType === "length") {
      setLengthRules(
        lengthRules.map((rule) =>
          rule.id === id ? { ...rule, status: rule.status === "active" ? "inactive" : "active" } : rule,
        ),
      )
    } else if (ruleType === "dayOfWeek") {
      setDayOfWeekRules(
        dayOfWeekRules.map((rule) =>
          rule.id === id ? { ...rule, status: rule.status === "active" ? "inactive" : "active" } : rule,
        ),
      )
    } else if (ruleType === "lastMinute") {
      setLastMinuteRules(
        lastMinuteRules.map((rule) =>
          rule.id === id ? { ...rule, status: rule.status === "active" ? "inactive" : "active" } : rule,
        ),
      )
    }

    toast({
      title: "Success",
      description: "Rule status updated successfully",
    })
  }

  const deleteRule = (ruleType: string, id: string) => {
    if (ruleType === "seasonal") {
      setSeasonalRates(seasonalRates.filter((rule) => rule.id !== id))
    } else if (ruleType === "length") {
      setLengthRules(lengthRules.filter((rule) => rule.id !== id))
    } else if (ruleType === "dayOfWeek") {
      setDayOfWeekRules(dayOfWeekRules.filter((rule) => rule.id !== id))
    } else if (ruleType === "lastMinute") {
      setLastMinuteRules(lastMinuteRules.filter((rule) => rule.id !== id))
    }

    toast({
      title: "Success",
      description: "Rule deleted successfully",
    })
  }

  const toggleDaySelection = (day: string) => {
    if (newDayOfWeekRule.days.includes(day)) {
      setNewDayOfWeekRule({
        ...newDayOfWeekRule,
        days: newDayOfWeekRule.days.filter((d) => d !== day),
      })
    } else {
      setNewDayOfWeekRule({
        ...newDayOfWeekRule,
        days: [...newDayOfWeekRule.days, day],
      })
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Pricing Rules" text="Configure dynamic pricing rules for your properties">
        <Select value={selectedProperty} onValueChange={setSelectedProperty}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select property" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="beach-villa">Beach Villa</SelectItem>
            <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
            <SelectItem value="city-apartment">City Apartment</SelectItem>
          </SelectContent>
        </Select>
      </DashboardHeader>

      <Tabs defaultValue="seasonal" className="space-y-4">
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
          <TabsTrigger value="length">Length of Stay</TabsTrigger>
          <TabsTrigger value="days">Days of Week</TabsTrigger>
          <TabsTrigger value="lastMinute">Last Minute</TabsTrigger>
        </TabsList>

        <TabsContent value="seasonal" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Seasonal Rates</h2>
              <p className="text-muted-foreground">Adjust prices based on seasonal demand</p>
            </div>

            <Dialog open={addSeasonalOpen} onOpenChange={setAddSeasonalOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Seasonal Rate
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Seasonal Rate</DialogTitle>
                  <DialogDescription>Create a pricing rule based on season dates</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="season-name">Season Name</Label>
                    <Input
                      id="season-name"
                      value={newSeasonalRate.name}
                      onChange={(e) => setNewSeasonalRate((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Summer Season"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="season-start">Start Date</Label>
                      <Input
                        id="season-start"
                        type="date"
                        value={newSeasonalRate.startDate}
                        onChange={(e) => setNewSeasonalRate((prev) => ({ ...prev, startDate: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="season-end">End Date</Label>
                      <Input
                        id="season-end"
                        type="date"
                        value={newSeasonalRate.endDate}
                        onChange={(e) => setNewSeasonalRate((prev) => ({ ...prev, endDate: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Price Adjustment</Label>
                    <div className="flex space-x-2">
                      <Select
                        value={newSeasonalRate.adjustmentDirection}
                        onValueChange={(value) =>
                          setNewSeasonalRate((prev) => ({ ...prev, adjustmentDirection: value }))
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="increase">Increase</SelectItem>
                          <SelectItem value="decrease">Decrease</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="number"
                        value={newSeasonalRate.adjustmentValue}
                        onChange={(e) => setNewSeasonalRate((prev) => ({ ...prev, adjustmentValue: e.target.value }))}
                        placeholder="10"
                      />

                      <Select
                        value={newSeasonalRate.adjustmentType}
                        onValueChange={(value) => setNewSeasonalRate((prev) => ({ ...prev, adjustmentType: value }))}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddSeasonalOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddSeasonalRate}>Add Rule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Season Name</TableHead>
                    <TableHead>Date Range</TableHead>
                    <TableHead>Adjustment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {seasonalRates.length > 0 ? (
                    seasonalRates.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.name}</TableCell>
                        <TableCell>
                          {new Date(rule.startDate).toLocaleDateString()} -{" "}
                          {new Date(rule.endDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>{rule.adjustment}</TableCell>
                        <TableCell>
                          <Badge variant={rule.status === "active" ? "default" : "outline"}>
                            {rule.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => toggleRuleStatus("seasonal", rule.id)}>
                              {rule.status === "active" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye-off"
                                >
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              )}
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => deleteRule("seasonal", rule.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No seasonal rates configured yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="length" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Length of Stay Discounts</h2>
              <p className="text-muted-foreground">Offer discounts for longer stays</p>
            </div>

            <Dialog open={addLengthOpen} onOpenChange={setAddLengthOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Length Rule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Length of Stay Discount</DialogTitle>
                  <DialogDescription>Create a pricing rule based on minimum nights booked</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="min-nights">Minimum Nights</Label>
                    <Input
                      id="min-nights"
                      type="number"
                      value={newLengthRule.nights}
                      onChange={(e) => setNewLengthRule((prev) => ({ ...prev, nights: e.target.value }))}
                      placeholder="7"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price Adjustment</Label>
                    <div className="flex space-x-2">
                      <Select
                        value={newLengthRule.adjustmentDirection}
                        onValueChange={(value) => setNewLengthRule((prev) => ({ ...prev, adjustmentDirection: value }))}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="increase">Increase</SelectItem>
                          <SelectItem value="decrease">Decrease</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="number"
                        value={newLengthRule.adjustmentValue}
                        onChange={(e) => setNewLengthRule((prev) => ({ ...prev, adjustmentValue: e.target.value }))}
                        placeholder="10"
                      />

                      <Select
                        value={newLengthRule.adjustmentType}
                        onValueChange={(value) => setNewLengthRule((prev) => ({ ...prev, adjustmentType: value }))}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddLengthOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddLengthRule}>Add Rule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Minimum Nights</TableHead>
                    <TableHead>Adjustment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lengthRules.length > 0 ? (
                    lengthRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.nights} nights or more</TableCell>
                        <TableCell>{rule.adjustment}</TableCell>
                        <TableCell>
                          <Badge variant={rule.status === "active" ? "default" : "outline"}>
                            {rule.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="icon" onClick={() => toggleRuleStatus("length", rule.id)}>
                              {rule.status === "active" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye-off"
                                >
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              )}
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => deleteRule("length", rule.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No length of stay discounts configured yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="days" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Day of Week Adjustments</h2>
              <p className="text-muted-foreground">Adjust prices for specific days of the week</p>
            </div>

            <Dialog open={addDayOfWeekOpen} onOpenChange={setAddDayOfWeekOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Day Rule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Day of Week Rule</DialogTitle>
                  <DialogDescription>Create a pricing rule for specific days of the week</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Select Days</Label>
                    <div className="grid grid-cols-7 gap-2">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                        <Button
                          key={day}
                          type="button"
                          variant={newDayOfWeekRule.days.includes(day) ? "default" : "outline"}
                          className="h-10"
                          onClick={() => toggleDaySelection(day)}
                        >
                          {day.substring(0, 3)}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Price Adjustment</Label>
                    <div className="flex space-x-2">
                      <Select
                        value={newDayOfWeekRule.adjustmentDirection}
                        onValueChange={(value) =>
                          setNewDayOfWeekRule((prev) => ({ ...prev, adjustmentDirection: value }))
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="increase">Increase</SelectItem>
                          <SelectItem value="decrease">Decrease</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="number"
                        value={newDayOfWeekRule.adjustmentValue}
                        onChange={(e) => setNewDayOfWeekRule((prev) => ({ ...prev, adjustmentValue: e.target.value }))}
                        placeholder="10"
                      />

                      <Select
                        value={newDayOfWeekRule.adjustmentType}
                        onValueChange={(value) => setNewDayOfWeekRule((prev) => ({ ...prev, adjustmentType: value }))}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddDayOfWeekOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddDayOfWeekRule}>Add Rule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Days</TableHead>
                    <TableHead>Adjustment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dayOfWeekRules.length > 0 ? (
                    dayOfWeekRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">{rule.days.join(", ")}</TableCell>
                        <TableCell>{rule.adjustment}</TableCell>
                        <TableCell>
                          <Badge variant={rule.status === "active" ? "default" : "outline"}>
                            {rule.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => toggleRuleStatus("dayOfWeek", rule.id)}
                            >
                              {rule.status === "active" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye-off"
                                >
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              )}
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => deleteRule("dayOfWeek", rule.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No day of week rules configured yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lastMinute" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Last Minute Discounts</h2>
              <p className="text-muted-foreground">Offer discounts for bookings made close to check-in date</p>
            </div>

            <Dialog open={addLastMinuteOpen} onOpenChange={setAddLastMinuteOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Last Minute Rule
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Last Minute Discount</DialogTitle>
                  <DialogDescription>Create a pricing rule for bookings made shortly before check-in</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="days-before">Days Before Check-in</Label>
                    <Input
                      id="days-before"
                      type="number"
                      value={newLastMinuteRule.days}
                      onChange={(e) => setNewLastMinuteRule((prev) => ({ ...prev, days: e.target.value }))}
                      placeholder="3"
                    />
                    <p className="text-sm text-muted-foreground">
                      Apply discount when booking is made within this many days of check-in
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Price Adjustment</Label>
                    <div className="flex space-x-2">
                      <Select
                        value={newLastMinuteRule.adjustmentDirection}
                        onValueChange={(value) =>
                          setNewLastMinuteRule((prev) => ({ ...prev, adjustmentDirection: value }))
                        }
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="increase">Increase</SelectItem>
                          <SelectItem value="decrease">Decrease</SelectItem>
                        </SelectContent>
                      </Select>

                      <Input
                        type="number"
                        value={newLastMinuteRule.adjustmentValue}
                        onChange={(e) => setNewLastMinuteRule((prev) => ({ ...prev, adjustmentValue: e.target.value }))}
                        placeholder="10"
                      />

                      <Select
                        value={newLastMinuteRule.adjustmentType}
                        onValueChange={(value) => setNewLastMinuteRule((prev) => ({ ...prev, adjustmentType: value }))}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setAddLastMinuteOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddLastMinuteRule}>Add Rule</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Days Before Check-in</TableHead>
                    <TableHead>Adjustment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {lastMinuteRules.length > 0 ? (
                    lastMinuteRules.map((rule) => (
                      <TableRow key={rule.id}>
                        <TableCell className="font-medium">Within {rule.days} days</TableCell>
                        <TableCell>{rule.adjustment}</TableCell>
                        <TableCell>
                          <Badge variant={rule.status === "active" ? "default" : "outline"}>
                            {rule.status === "active" ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => toggleRuleStatus("lastMinute", rule.id)}
                            >
                              {rule.status === "active" ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye-off"
                                >
                                  <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                                  <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                                  <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                                  <line x1="2" x2="22" y1="2" y2="22" />
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="15"
                                  height="15"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="lucide lucide-eye"
                                >
                                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                                  <circle cx="12" cy="12" r="3" />
                                </svg>
                              )}
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => deleteRule("lastMinute", rule.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4">
                        No last minute discounts configured yet
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

