"use client"

import { useState } from "react"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Clock, Search } from "lucide-react"

// Mock data for upcoming check-ins and check-outs
// Mock check-ins data
const checkIns = [
  {
    id: "1",
    guest: "John Smith",
    property: "Luxury Beach House",
    date: "2023-09-20",
    time: "15:00",
    status: "upcoming",
    notes: "Guest requested early check-in if possible",
  },
  {
    id: "2",
    guest: "Sarah Johnson",
    property: "Downtown Loft",
    date: "2023-09-22",
    time: "14:00",
    status: "upcoming",
    notes: "",
  },
]

// Mock check-outs data
const checkOuts = [
  {
    id: "3",
    guest: "Michael Brown",
    property: "Mountain Cabin",
    date: "2023-09-18",
    time: "11:00",
    status: "completed",
    notes: "Cleaning service scheduled for 12:00",
  },
  {
    id: "4",
    guest: "Emily Davis",
    property: "Luxury Beach House",
    date: "2023-09-19",
    time: "10:00",
    status: "completed",
    notes: "",
  },
]

const upcomingCheckIns = [
  {
    id: "ci1",
    guestName: "Emma Thompson",
    propertyName: "Oceanview Villa",
    checkInDate: "2023-11-25",
    checkInTime: "15:00",
    nights: 5,
    guests: 3,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ci2",
    guestName: "Michael Chen",
    propertyName: "Downtown Loft",
    checkInDate: "2023-11-26",
    checkInTime: "14:00",
    nights: 3,
    guests: 2,
    status: "confirmed",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "ci3",
    guestName: "Sophia Rodriguez",
    propertyName: "Mountain Cabin",
    checkInDate: "2023-11-27",
    checkInTime: "16:00",
    nights: 7,
    guests: 4,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

const upcomingCheckOuts = [
  {
    id: "co1",
    guestName: "James Wilson",
    propertyName: "Beachfront Condo",
    checkOutDate: "2023-11-25",
    checkOutTime: "11:00",
    nights: 4,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "co2",
    guestName: "Olivia Martinez",
    propertyName: "Luxury Apartment",
    checkOutDate: "2023-11-26",
    checkOutTime: "10:00",
    nights: 6,
    status: "pending",
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

// Mock data for properties
const properties = [
  { id: "p1", name: "Oceanview Villa" },
  { id: "p2", name: "Downtown Loft" },
  { id: "p3", name: "Mountain Cabin" },
  { id: "p4", name: "Beachfront Condo" },
  { id: "p5", name: "Luxury Apartment" },
]

export default function CheckInPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upcoming")
  const [selectedCheckIn, setSelectedCheckIn] = useState<string | null>(null)
  const [selectedCheckOut, setSelectedCheckOut] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [checkInNotes, setCheckInNotes] = useState("")
  const [checkOutNotes, setCheckOutNotes] = useState("")
  const [checklistItems, setChecklistItems] = useState({
    idVerified: false,
    paymentConfirmed: false,
    houseRulesReviewed: false,
    keysProvided: false,
    wifiShared: false,
  })
  const [checkOutChecklist, setCheckOutChecklist] = useState({
    keysReturned: false,
    propertyInspected: false,
    damagesReported: false,
    cleaningScheduled: false,
    reviewRequested: false,
  })
  const [newInstructionText, setNewInstructionText] = useState("")
  const [customInstructions, setCustomInstructions] = useState<string[]>([])

  // Filter check-ins based on search query
  const filteredCheckIns = upcomingCheckIns.filter(
    (checkIn) =>
      checkIn.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkIn.propertyName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Filter check-outs based on search query
  const filteredCheckOuts = upcomingCheckOuts.filter(
    (checkOut) =>
      checkOut.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      checkOut.propertyName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCheckInComplete = () => {
    toast({
      title: "Check-in completed",
      description: "The guest has been successfully checked in.",
    })
    setSelectedCheckIn(null)
    setCheckInNotes("")
    setChecklistItems({
      idVerified: false,
      paymentConfirmed: false,
      houseRulesReviewed: false,
      keysProvided: false,
      wifiShared: false,
    })
  }

  const handleCheckOutComplete = () => {
    toast({
      title: "Check-out completed",
      description: "The guest has been successfully checked out.",
    })
    setSelectedCheckOut(null)
    setCheckOutNotes("")
    setCheckOutChecklist({
      keysReturned: false,
      propertyInspected: false,
      damagesReported: false,
      cleaningScheduled: false,
      reviewRequested: false,
    })
  }

  const addCustomInstruction = () => {
    if (newInstructionText.trim()) {
      setCustomInstructions([...customInstructions, newInstructionText.trim()])
      setNewInstructionText("")
    }
  }

  const removeCustomInstruction = (index: number) => {
    setCustomInstructions(customInstructions.filter((_, i) => i !== index))
  }

  const sendCheckInInstructions = () => {
    toast({
      title: "Instructions sent",
      description: "Check-in instructions have been sent to the guest.",
    })
  }

  return (
    <DashboardShell>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Check-in/out</h1>
          <p className="text-muted-foreground">Manage guest arrivals and departures</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search guests..." className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="check-in">
        <TabsList>
          <TabsTrigger value="check-in">Check-in</TabsTrigger>
          <TabsTrigger value="check-out">Check-out</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="check-in" className="space-y-4">
          <h2 className="text-lg font-medium mt-4">Today's Check-ins</h2>
          {checkIns.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No check-ins scheduled for today</p>
          ) : (
            checkIns.map((checkIn) => (
              <Card key={checkIn.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div>
                    <CardTitle className="text-lg">{checkIn.guest}</CardTitle>
                    <p className="text-sm text-muted-foreground">{checkIn.property}</p>
                  </div>
                  <Badge
                    variant={
                      checkIn.status === "completed"
                        ? "default"
                        : checkIn.status === "upcoming"
                          ? "outline"
                          : "secondary"
                    }
                  >
                    {checkIn.status}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Date</p>
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{checkIn.date}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Time</p>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <p className="text-sm">{checkIn.time}</p>
                      </div>
                    </div>
                    {checkIn.notes && (
                      <div className="col-span-2">
                        <p className="text-sm font-medium">Notes</p>
                        <p className="text-sm">{checkIn.notes}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Send Instructions
                    </Button>
                    <Button size="sm">Complete Check-in</Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
        <TabsContent value="check-out" className="space-y-4">
          <h2 className="text-lg font-medium mt-4">Today's Check-outs</h2>
          {checkOuts.map((checkOut) => (
            <Card key={checkOut.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-lg">{checkOut.guest}</CardTitle>
                  <p className="text-sm text-muted-foreground">{checkOut.property}</p>
                </div>
                <Badge
                  variant={
                    checkOut.status === "completed"
                      ? "default"
                      : checkOut.status === "upcoming"
                        ? "outline"
                        : "secondary"
                  }
                >
                  {checkOut.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Date</p>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{checkOut.date}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Time</p>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <p className="text-sm">{checkOut.time}</p>
                    </div>
                  </div>
                  {checkOut.notes && (
                    <div className="col-span-2">
                      <p className="text-sm font-medium">Notes</p>
                      <p className="text-sm">{checkOut.notes}</p>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    Schedule Cleaning
                  </Button>
                  <Button size="sm" disabled={checkOut.status === "completed"}>
                    {checkOut.status === "completed" ? "Completed" : "Complete Check-out"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="history">
          <p className="text-center py-8 text-muted-foreground">Check-in/out history will be displayed here</p>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

