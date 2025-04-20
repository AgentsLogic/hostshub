"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { useToast } from "@/hooks/use-toast"
import {
  Loader2,
  Search,
  Filter,
  MessageSquare,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Home,
  Star,
  AlertTriangle,
  UserPlus,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data for guests
const mockGuests = [
  {
    id: "1",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "New York, USA",
    totalBookings: 3,
    totalSpent: 1250,
    lastStay: "2023-08-15",
    nextStay: "2023-12-10",
    status: "returning",
    notes: "Prefers early check-in. Allergic to pets.",
    tags: ["VIP", "Business"],
    favoriteProperty: "Beach Villa",
    averageRating: 4.8,
    bookingHistory: [
      {
        id: "b1",
        property: "Beach Villa",
        checkIn: "2023-08-10",
        checkOut: "2023-08-15",
        amount: 500,
        status: "completed",
      },
      {
        id: "b2",
        property: "Mountain Cabin",
        checkIn: "2023-05-20",
        checkOut: "2023-05-25",
        amount: 450,
        status: "completed",
      },
      {
        id: "b3",
        property: "Beach Villa",
        checkIn: "2022-12-24",
        checkOut: "2022-12-31",
        amount: 800,
        status: "completed",
      },
      {
        id: "b4",
        property: "Beach Villa",
        checkIn: "2023-12-10",
        checkOut: "2023-12-17",
        amount: 750,
        status: "upcoming",
      },
    ],
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Los Angeles, USA",
    totalBookings: 1,
    totalSpent: 600,
    lastStay: "2023-07-22",
    nextStay: null,
    status: "one-time",
    notes: "Celebrating anniversary. Left a great review.",
    tags: ["Couple"],
    favoriteProperty: "Mountain Cabin",
    averageRating: 5.0,
    bookingHistory: [
      {
        id: "b5",
        property: "Mountain Cabin",
        checkIn: "2023-07-18",
        checkOut: "2023-07-22",
        amount: 600,
        status: "completed",
      },
    ],
  },
  {
    id: "3",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Chicago, USA",
    totalBookings: 2,
    totalSpent: 900,
    lastStay: "2023-06-10",
    nextStay: "2023-11-15",
    status: "returning",
    notes: "Complained about heating issues during last stay.",
    tags: ["Family"],
    favoriteProperty: "Lake House",
    averageRating: 3.5,
    bookingHistory: [
      {
        id: "b6",
        property: "Mountain Cabin",
        checkIn: "2023-06-05",
        checkOut: "2023-06-10",
        amount: 450,
        status: "completed",
      },
      {
        id: "b7",
        property: "Lake House",
        checkIn: "2023-11-15",
        checkOut: "2023-11-20",
        amount: 550,
        status: "upcoming",
      },
    ],
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 789-0123",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "San Francisco, USA",
    totalBookings: 4,
    totalSpent: 2200,
    lastStay: "2023-09-05",
    nextStay: "2024-01-20",
    status: "returning",
    notes: "Repeat guest. Always leaves the property very clean.",
    tags: ["VIP", "Solo Traveler"],
    favoriteProperty: "City Apartment",
    averageRating: 4.9,
    bookingHistory: [
      {
        id: "b8",
        property: "City Apartment",
        checkIn: "2023-09-01",
        checkOut: "2023-09-05",
        amount: 500,
        status: "completed",
      },
      {
        id: "b9",
        property: "Beach Villa",
        checkIn: "2023-06-15",
        checkOut: "2023-06-20",
        amount: 600,
        status: "completed",
      },
      {
        id: "b10",
        property: "City Apartment",
        checkIn: "2023-03-10",
        checkOut: "2023-03-15",
        amount: 500,
        status: "completed",
      },
      {
        id: "b11",
        property: "Mountain Cabin",
        checkIn: "2024-01-20",
        checkOut: "2024-01-25",
        amount: 600,
        status: "upcoming",
      },
    ],
  },
  {
    id: "5",
    name: "David Wilson",
    email: "david.wilson@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "/placeholder.svg?height=40&width=40",
    location: "Miami, USA",
    totalBookings: 1,
    totalSpent: 700,
    lastStay: "2023-08-30",
    nextStay: null,
    status: "flagged",
    notes: "Left property in poor condition. Noise complaints from neighbors.",
    tags: ["Problem Guest"],
    favoriteProperty: "Beach Villa",
    averageRating: 2.0,
    bookingHistory: [
      {
        id: "b12",
        property: "Beach Villa",
        checkIn: "2023-08-25",
        checkOut: "2023-08-30",
        amount: 700,
        status: "completed",
      },
    ],
  },
]

// Mock properties for filtering
const mockProperties = [
  { id: "1", name: "Beach Villa" },
  { id: "2", name: "Mountain Cabin" },
  { id: "3", name: "City Apartment" },
  { id: "4", name: "Lake House" },
]

export default function GuestsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [guests, setGuests] = useState<any[]>([])
  const [filteredGuests, setFilteredGuests] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [propertyFilter, setPropertyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tagFilter, setTagFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")
  const [sortField, setSortField] = useState("name")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [selectedGuest, setSelectedGuest] = useState<any>(null)
  const [isGuestDialogOpen, setIsGuestDialogOpen] = useState(false)
  const [expandedGuest, setExpandedGuest] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API call to fetch guests
    setTimeout(() => {
      setGuests(mockGuests)
      setFilteredGuests(mockGuests)
      setIsLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    // Apply filters and search
    let filtered = [...guests]

    // Apply tab filter
    if (activeTab === "returning") {
      filtered = filtered.filter((guest) => guest.status === "returning")
    } else if (activeTab === "one-time") {
      filtered = filtered.filter((guest) => guest.status === "one-time")
    } else if (activeTab === "upcoming") {
      filtered = filtered.filter((guest) => guest.nextStay !== null)
    } else if (activeTab === "flagged") {
      filtered = filtered.filter((guest) => guest.status === "flagged")
    }

    // Apply property filter
    if (propertyFilter !== "all") {
      filtered = filtered.filter((guest) =>
        guest.bookingHistory.some((booking: any) => booking.property === propertyFilter),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((guest) => guest.status === statusFilter)
    }

    // Apply tag filter
    if (tagFilter !== "all") {
      filtered = filtered.filter((guest) => guest.tags.includes(tagFilter))
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (guest) =>
          guest.name.toLowerCase().includes(query) ||
          guest.email.toLowerCase().includes(query) ||
          guest.phone.toLowerCase().includes(query) ||
          guest.location.toLowerCase().includes(query),
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const valueA = a[sortField]
      const valueB = b[sortField]

      // Handle numeric values
      if (typeof valueA === "number" && typeof valueB === "number") {
        return sortDirection === "asc" ? valueA - valueB : valueB - valueA
      }

      // Handle string values
      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortDirection === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA)
      }

      // Handle dates
      if (sortField === "lastStay" || sortField === "nextStay") {
        // Handle null values for nextStay
        if (valueA === null) return sortDirection === "asc" ? 1 : -1
        if (valueB === null) return sortDirection === "asc" ? -1 : 1

        const dateA = new Date(valueA)
        const dateB = new Date(valueB)
        return sortDirection === "asc" ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime()
      }

      return 0
    })

    setFilteredGuests(filtered)
  }, [guests, activeTab, propertyFilter, statusFilter, tagFilter, searchQuery, sortField, sortDirection])

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const handleViewGuest = (guest: any) => {
    setSelectedGuest(guest)
    setIsGuestDialogOpen(true)
  }

  const handleAddNote = (guestId: string, note: string) => {
    if (!note.trim()) {
      toast({
        title: "Error",
        description: "Note cannot be empty",
        variant: "destructive",
      })
      return
    }

    // Simulate API call to add note
    setIsLoading(true)
    setTimeout(() => {
      setGuests((prev) =>
        prev.map((guest) =>
          guest.id === guestId ? { ...guest, notes: guest.notes ? `${guest.notes}\n${note}` : note } : guest,
        ),
      )

      toast({
        title: "Success",
        description: "Note added successfully",
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleAddTag = (guestId: string, tag: string) => {
    if (!tag.trim()) {
      toast({
        title: "Error",
        description: "Tag cannot be empty",
        variant: "destructive",
      })
      return
    }

    // Simulate API call to add tag
    setIsLoading(true)
    setTimeout(() => {
      setGuests((prev) =>
        prev.map((guest) => (guest.id === guestId ? { ...guest, tags: [...guest.tags, tag] } : guest)),
      )

      toast({
        title: "Success",
        description: "Tag added successfully",
      })

      setIsLoading(false)
    }, 1000)
  }

  const handleFlagGuest = (guestId: string) => {
    // Simulate API call to flag guest
    setIsLoading(true)
    setTimeout(() => {
      setGuests((prev) =>
        prev.map((guest) =>
          guest.id === guestId ? { ...guest, status: guest.status === "flagged" ? "returning" : "flagged" } : guest,
        ),
      )

      toast({
        title: "Success",
        description: "Guest status updated",
      })

      setIsLoading(false)
    }, 1000)
  }

  const toggleExpandGuest = (guestId: string) => {
    setExpandedGuest(expandedGuest === guestId ? null : guestId)
  }

  const getAllTags = () => {
    const tags = new Set<string>()
    guests.forEach((guest) => {
      guest.tags.forEach((tag: string) => {
        tags.add(tag)
      })
    })
    return Array.from(tags)
  }

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "returning":
        return <Badge className="bg-green-500">Returning</Badge>
      case "one-time":
        return <Badge variant="outline">One-time</Badge>
      case "flagged":
        return <Badge className="bg-red-500">Flagged</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const renderBookingStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "upcoming":
        return <Badge className="bg-blue-500">Upcoming</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Guest Management" text="Manage your guests and their booking history.">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add Guest
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Guest</DialogTitle>
              <DialogDescription>Enter the details of the new guest.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">
                  Name
                </label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">
                  Email
                </label>
                <Input id="email" type="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right">
                  Phone
                </label>
                <Input id="phone" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="location" className="text-right">
                  Location
                </label>
                <Input id="location" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="notes" className="text-right">
                  Notes
                </label>
                <Input id="notes" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Guest</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </DashboardHeader>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search guests..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={propertyFilter} onValueChange={setPropertyFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              {mockProperties.map((property) => (
                <SelectItem key={property.id} value={property.name}>
                  {property.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="returning">Returning</SelectItem>
              <SelectItem value="one-time">One-time</SelectItem>
              <SelectItem value="flagged">Flagged</SelectItem>
            </SelectContent>
          </Select>

          <Select value={tagFilter} onValueChange={setTagFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by tag" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tags</SelectItem>
              {getAllTags().map((tag) => (
                <SelectItem key={tag} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="all">All Guests</TabsTrigger>
          <TabsTrigger value="returning">Returning</TabsTrigger>
          <TabsTrigger value="one-time">One-time</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Stays</TabsTrigger>
          <TabsTrigger value="flagged">Flagged</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <Filter className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No guests found</h3>
              <p className="text-muted-foreground">Try adjusting your filters or search query</p>
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]"></TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("name")}>
                        <div className="flex items-center">
                          Guest
                          {sortField === "name" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                        <div className="flex items-center">
                          Location
                          {sortField === "location" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("totalBookings")}>
                        <div className="flex items-center">
                          Bookings
                          {sortField === "totalBookings" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("totalSpent")}>
                        <div className="flex items-center">
                          Total Spent
                          {sortField === "totalSpent" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("lastStay")}>
                        <div className="flex items-center">
                          Last Stay
                          {sortField === "lastStay" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead className="cursor-pointer" onClick={() => handleSort("nextStay")}>
                        <div className="flex items-center">
                          Next Stay
                          {sortField === "nextStay" &&
                            (sortDirection === "asc" ? (
                              <ChevronUp className="ml-1 h-4 w-4" />
                            ) : (
                              <ChevronDown className="ml-1 h-4 w-4" />
                            ))}
                        </div>
                      </TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGuests.map((guest) => (
                      <>
                        <TableRow key={guest.id} className={guest.status === "flagged" ? "bg-red-50" : ""}>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => toggleExpandGuest(guest.id)}>
                              {expandedGuest === guest.id ? (
                                <ChevronUp className="h-4 w-4" />
                              ) : (
                                <ChevronDown className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={guest.avatar} alt={guest.name} />
                                <AvatarFallback>{guest.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{guest.name}</div>
                                <div className="text-sm text-muted-foreground">{guest.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
                              {guest.location}
                            </div>
                          </TableCell>
                          <TableCell>{guest.totalBookings}</TableCell>
                          <TableCell>${guest.totalSpent}</TableCell>
                          <TableCell>
                            {guest.lastStay ? new Date(guest.lastStay).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell>
                            {guest.nextStay ? new Date(guest.nextStay).toLocaleDateString() : "N/A"}
                          </TableCell>
                          <TableCell>{renderStatusBadge(guest.status)}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => router.push("/dashboard/messages")}
                                    >
                                      <MessageSquare className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Message Guest</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleFlagGuest(guest.id)}
                                      className={guest.status === "flagged" ? "text-red-500" : ""}
                                    >
                                      <AlertTriangle className="h-4 w-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{guest.status === "flagged" ? "Unflag Guest" : "Flag Guest"}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>

                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onClick={() => handleViewGuest(guest)}>
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => router.push("/dashboard/messages")}>
                                    Send Message
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={() => handleAddTag(guest.id, "VIP")}>
                                    Add VIP Tag
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleFlagGuest(guest.id)}>
                                    {guest.status === "flagged" ? "Unflag Guest" : "Flag Guest"}
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>

                        {expandedGuest === guest.id && (
                          <TableRow>
                            <TableCell colSpan={9} className="bg-muted/50">
                              <div className="p-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                  <div>
                                    <h4 className="font-medium mb-2">Contact Information</h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center">
                                        <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>{guest.email}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>{guest.phone}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>{guest.location}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Guest Information</h4>
                                    <div className="space-y-2">
                                      <div className="flex items-center">
                                        <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Favorite Property: {guest.favoriteProperty}</span>
                                      </div>
                                      <div className="flex items-center">
                                        <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Average Rating: {guest.averageRating}</span>
                                      </div>
                                      <div className="flex flex-wrap gap-1 mt-2">
                                        {guest.tags.map((tag: string) => (
                                          <Badge key={tag} variant="outline">
                                            {tag}
                                          </Badge>
                                        ))}
                                      </div>
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="font-medium mb-2">Notes</h4>
                                    <p className="text-sm text-muted-foreground whitespace-pre-line">
                                      {guest.notes || "No notes available."}
                                    </p>
                                    <div className="mt-2">
                                      <Input
                                        placeholder="Add a note..."
                                        className="text-sm"
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            handleAddNote(guest.id, e.currentTarget.value)
                                            e.currentTarget.value = ""
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="font-medium mb-2">Booking History</h4>
                                  <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                      <thead>
                                        <tr className="border-b">
                                          <th className="text-left py-2">Property</th>
                                          <th className="text-left py-2">Check-in</th>
                                          <th className="text-left py-2">Check-out</th>
                                          <th className="text-left py-2">Amount</th>
                                          <th className="text-left py-2">Status</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {guest.bookingHistory.map((booking: any) => (
                                          <tr key={booking.id} className="border-b">
                                            <td className="py-2">{booking.property}</td>
                                            <td className="py-2">{new Date(booking.checkIn).toLocaleDateString()}</td>
                                            <td className="py-2">{new Date(booking.checkOut).toLocaleDateString()}</td>
                                            <td className="py-2">${booking.amount}</td>
                                            <td className="py-2">{renderBookingStatusBadge(booking.status)}</td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={isGuestDialogOpen} onOpenChange={setIsGuestDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedGuest && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src={selectedGuest.avatar} alt={selectedGuest.name} />
                    <AvatarFallback>{selectedGuest.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span>{selectedGuest.name}</span>
                  {renderStatusBadge(selectedGuest.status)}
                </DialogTitle>
                <DialogDescription>Guest details and booking history</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedGuest.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedGuest.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedGuest.location}</span>
                    </div>
                  </div>

                  <h4 className="font-medium mt-4 mb-2">Guest Information</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Favorite Property: {selectedGuest.favoriteProperty}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Total Bookings: {selectedGuest.totalBookings}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Average Rating: {selectedGuest.averageRating}</span>
                    </div>
                  </div>

                  <h4 className="font-medium mt-4 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedGuest.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Notes</h4>
                  <div className="bg-muted p-3 rounded-md min-h-[100px] whitespace-pre-line">
                    {selectedGuest.notes || "No notes available."}
                  </div>

                  <h4 className="font-medium mt-4 mb-2">Booking Summary</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Spent:</span>
                      <span className="font-medium">${selectedGuest.totalSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Stay:</span>
                      <span>
                        {selectedGuest.lastStay ? new Date(selectedGuest.lastStay).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next Stay:</span>
                      <span>
                        {selectedGuest.nextStay ? new Date(selectedGuest.nextStay).toLocaleDateString() : "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className="font-medium mt-4 mb-2">Booking History</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Property</th>
                      <th className="text-left py-2">Check-in</th>
                      <th className="text-left py-2">Check-out</th>
                      <th className="text-left py-2">Amount</th>
                      <th className="text-left py-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedGuest.bookingHistory.map((booking: any) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-2">{booking.property}</td>
                        <td className="py-2">{new Date(booking.checkIn).toLocaleDateString()}</td>
                        <td className="py-2">{new Date(booking.checkOut).toLocaleDateString()}</td>
                        <td className="py-2">${booking.amount}</td>
                        <td className="py-2">{renderBookingStatusBadge(booking.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <DialogFooter className="flex justify-between">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleFlagGuest(selectedGuest.id)}
                    className={selectedGuest.status === "flagged" ? "text-red-500" : ""}
                  >
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    {selectedGuest.status === "flagged" ? "Unflag Guest" : "Flag Guest"}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => router.push("/dashboard/messages")}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                  <Button onClick={() => setIsGuestDialogOpen(false)}>Close</Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardShell>
  )
}

