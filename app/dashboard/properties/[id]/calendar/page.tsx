"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { getProperty, type Property } from "@/lib/supabase"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle, ChevronLeft, ChevronRight, Plus, X, CalendarIcon, Users } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  addDays,
  format,
  isSameDay,
  isWithinInterval,
  startOfDay,
  endOfDay,
  addMonths,
  isBefore,
  isAfter,
} from "date-fns"

// Mock data for bookings
const mockBookings = [
  {
    id: "b1",
    guestName: "John Smith",
    checkIn: new Date("2023-12-15"),
    checkOut: new Date("2023-12-20"),
    status: "confirmed",
    guests: 4,
    totalPrice: 1250,
  },
  {
    id: "b2",
    guestName: "Sarah Johnson",
    checkIn: new Date("2023-12-22"),
    checkOut: new Date("2023-12-27"),
    status: "confirmed",
    guests: 2,
    totalPrice: 850,
  },
  {
    id: "b3",
    guestName: "Michael Brown",
    checkIn: new Date("2024-01-05"),
    checkOut: new Date("2024-01-10"),
    status: "confirmed",
    guests: 3,
    totalPrice: 1100,
  },
]

// Mock data for blocked dates
const mockBlockedDates = [
  {
    id: "bd1",
    startDate: new Date("2023-12-10"),
    endDate: new Date("2023-12-12"),
    reason: "Maintenance",
  },
  {
    id: "bd2",
    startDate: new Date("2024-01-15"),
    endDate: new Date("2024-01-20"),
    reason: "Personal use",
  },
]

interface CalendarPageProps {
  params: { id: string }
}

export default function CalendarPage({ params }: CalendarPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [property, setProperty] = useState<Property | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [bookings, setBookings] = useState(mockBookings)
  const [blockedDates, setBlockedDates] = useState(mockBlockedDates)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedDateEvents, setSelectedDateEvents] = useState<any[]>([])
  const [month, setMonth] = useState<Date>(new Date())
  const [isBlockingDates, setIsBlockingDates] = useState(false)
  const [blockStartDate, setBlockStartDate] = useState<Date | undefined>(new Date())
  const [blockEndDate, setBlockEndDate] = useState<Date | undefined>(addDays(new Date(), 1))
  const [blockReason, setBlockReason] = useState("Maintenance")
  const [isAddingBooking, setIsAddingBooking] = useState(false)
  const [newBooking, setNewBooking] = useState({
    guestName: "",
    checkIn: new Date(),
    checkOut: addDays(new Date(), 5),
    guests: "2",
    totalPrice: "",
  })

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const { data, error } = await getProperty(params.id)

        if (error) {
          throw error
        }

        if (data) {
          setProperty(data)
        }
      } catch (error: any) {
        setError(error.message || "Failed to load property")
        toast({
          title: "Error",
          description: error.message || "Failed to load property",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProperty()
  }, [params.id, toast])

  useEffect(() => {
    if (selectedDate) {
      // Find bookings for the selected date
      const bookingsOnDate = bookings.filter((booking) =>
        isWithinInterval(selectedDate, {
          start: startOfDay(booking.checkIn),
          end: endOfDay(booking.checkOut),
        }),
      )

      // Find blocked dates for the selected date
      const blocksOnDate = blockedDates.filter((block) =>
        isWithinInterval(selectedDate, {
          start: startOfDay(block.startDate),
          end: endOfDay(block.endDate),
        }),
      )

      setSelectedDateEvents([...bookingsOnDate, ...blocksOnDate])
    }
  }, [selectedDate, bookings, blockedDates])

  const handlePreviousMonth = () => {
    setMonth((prev) => addMonths(prev, -1))
  }

  const handleNextMonth = () => {
    setMonth((prev) => addMonths(prev, 1))
  }

  const handleBlockDates = () => {
    if (!blockStartDate || !blockEndDate || !blockReason) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (isBefore(blockEndDate, blockStartDate)) {
      toast({
        title: "Error",
        description: "End date cannot be before start date",
        variant: "destructive",
      })
      return
    }

    // Check for overlapping bookings
    const hasOverlappingBooking = bookings.some(
      (booking) =>
        isWithinInterval(booking.checkIn, { start: blockStartDate, end: blockEndDate }) ||
        isWithinInterval(booking.checkOut, { start: blockStartDate, end: blockEndDate }) ||
        (isBefore(booking.checkIn, blockStartDate) && isAfter(booking.checkOut, blockEndDate)),
    )

    if (hasOverlappingBooking) {
      toast({
        title: "Error",
        description: "Cannot block dates that overlap with existing bookings",
        variant: "destructive",
      })
      return
    }

    const newBlockedDate = {
      id: `bd${blockedDates.length + 1}`,
      startDate: blockStartDate,
      endDate: blockEndDate,
      reason: blockReason,
    }

    setBlockedDates([...blockedDates, newBlockedDate])
    setIsBlockingDates(false)

    toast({
      title: "Success",
      description: "Dates blocked successfully",
    })
  }

  const handleAddBooking = () => {
    if (
      !newBooking.guestName ||
      !newBooking.checkIn ||
      !newBooking.checkOut ||
      !newBooking.guests ||
      !newBooking.totalPrice
    ) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (isBefore(newBooking.checkOut, newBooking.checkIn)) {
      toast({
        title: "Error",
        description: "Check-out date cannot be before check-in date",
        variant: "destructive",
      })
      return
    }

    // Check for overlapping bookings
    const hasOverlappingBooking = bookings.some(
      (booking) =>
        isWithinInterval(booking.checkIn, { start: newBooking.checkIn, end: newBooking.checkOut }) ||
        isWithinInterval(booking.checkOut, { start: newBooking.checkIn, end: newBooking.checkOut }) ||
        (isBefore(booking.checkIn, newBooking.checkIn) && isAfter(booking.checkOut, newBooking.checkOut)),
    )

    if (hasOverlappingBooking) {
      toast({
        title: "Error",
        description: "Cannot add booking that overlaps with existing bookings",
        variant: "destructive",
      })
      return
    }

    // Check for overlapping blocked dates
    const hasOverlappingBlock = blockedDates.some(
      (block) =>
        isWithinInterval(block.startDate, { start: newBooking.checkIn, end: newBooking.checkOut }) ||
        isWithinInterval(block.endDate, { start: newBooking.checkIn, end: newBooking.checkOut }) ||
        (isBefore(block.startDate, newBooking.checkIn) && isAfter(block.endDate, newBooking.checkOut)),
    )

    if (hasOverlappingBlock) {
      toast({
        title: "Error",
        description: "Cannot add booking that overlaps with blocked dates",
        variant: "destructive",
      })
      return
    }

    const newBookingObj = {
      id: `b${bookings.length + 1}`,
      guestName: newBooking.guestName,
      checkIn: newBooking.checkIn,
      checkOut: newBooking.checkOut,
      status: "confirmed",
      guests: Number.parseInt(newBooking.guests),
      totalPrice: Number.parseFloat(newBooking.totalPrice),
    }

    setBookings([...bookings, newBookingObj])
    setIsAddingBooking(false)

    toast({
      title: "Success",
      description: "Booking added successfully",
    })
  }

  const handleRemoveBlockedDate = (id: string) => {
    setBlockedDates(blockedDates.filter((block) => block.id !== id))

    toast({
      title: "Success",
      description: "Blocked dates removed",
    })
  }

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.map((booking) => (booking.id === id ? { ...booking, status: "cancelled" } : booking)))

    toast({
      title: "Success",
      description: "Booking cancelled",
    })
  }

  const getDayClassName = (date: Date) => {
    // Check if date is in a booking
    const isBooked = bookings.some((booking) =>
      isWithinInterval(date, { start: startOfDay(booking.checkIn), end: endOfDay(booking.checkOut) }),
    )

    // Check if date is blocked
    const isBlocked = blockedDates.some((block) =>
      isWithinInterval(date, { start: startOfDay(block.startDate), end: endOfDay(block.endDate) }),
    )

    // Check if date is a check-in date
    const isCheckIn = bookings.some((booking) => isSameDay(date, booking.checkIn))

    // Check if date is a check-out date
    const isCheckOut = bookings.some((booking) => isSameDay(date, booking.checkOut))

    if (isCheckIn && isCheckOut) {
      return "bg-gradient-to-r from-green-500 to-red-500 text-white"
    } else if (isCheckIn) {
      return "bg-green-500 text-white"
    } else if (isCheckOut) {
      return "bg-red-500 text-white"
    } else if (isBooked) {
      return "bg-blue-500/20 text-blue-700"
    } else if (isBlocked) {
      return "bg-gray-500/20 text-gray-700 line-through"
    }

    return ""
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardShell>
    )
  }

  if (error && !property) {
    return (
      <DashboardShell>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="mt-4">
          <Button onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading={`Calendar - ${property?.name || "Property"}`}
        text="Manage bookings and availability for your property."
      >
        <div className="flex items-center gap-2">
          <Dialog open={isBlockingDates} onOpenChange={setIsBlockingDates}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <X className="mr-2 h-4 w-4" />
                Block Dates
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Block Dates</DialogTitle>
                <DialogDescription>
                  Block dates to prevent bookings during maintenance, personal use, or other reasons.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <div className="relative">
                      <Input
                        id="start-date"
                        type="date"
                        value={blockStartDate ? format(blockStartDate, "yyyy-MM-dd") : ""}
                        onChange={(e) => setBlockStartDate(e.target.value ? new Date(e.target.value) : undefined)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <div className="relative">
                      <Input
                        id="end-date"
                        type="date"
                        value={blockEndDate ? format(blockEndDate, "yyyy-MM-dd") : ""}
                        onChange={(e) => setBlockEndDate(e.target.value ? new Date(e.target.value) : undefined)}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason</Label>
                  <Select value={blockReason} onValueChange={setBlockReason}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Personal use">Personal use</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsBlockingDates(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBlockDates}>Block Dates</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddingBooking} onOpenChange={setIsAddingBooking}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Booking
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Manual Booking</DialogTitle>
                <DialogDescription>Add a booking that was made outside of the platform.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Guest Name</Label>
                  <Input
                    id="guest-name"
                    value={newBooking.guestName}
                    onChange={(e) => setNewBooking({ ...newBooking, guestName: e.target.value })}
                    placeholder="John Smith"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="check-in">Check-in Date</Label>
                    <div className="relative">
                      <Input
                        id="check-in"
                        type="date"
                        value={format(newBooking.checkIn, "yyyy-MM-dd")}
                        onChange={(e) => setNewBooking({ ...newBooking, checkIn: new Date(e.target.value) })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-out">Check-out Date</Label>
                    <div className="relative">
                      <Input
                        id="check-out"
                        type="date"
                        value={format(newBooking.checkOut, "yyyy-MM-dd")}
                        onChange={(e) => setNewBooking({ ...newBooking, checkOut: new Date(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={newBooking.guests}
                      onChange={(e) => setNewBooking({ ...newBooking, guests: e.target.value })}
                      min="1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="total-price">Total Price</Label>
                    <Input
                      id="total-price"
                      type="number"
                      value={newBooking.totalPrice}
                      onChange={(e) => setNewBooking({ ...newBooking, totalPrice: e.target.value })}
                      min="0"
                      placeholder="$"
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddingBooking(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddBooking}>Add Booking</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </DashboardHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Availability Calendar</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="font-medium">{format(month, "MMMM yyyy")}</div>
                <Button variant="outline" size="icon" onClick={handleNextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mt-2">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  month={month}
                  onMonthChange={setMonth}
                  className="rounded-md border"
                  modifiers={{
                    booked: (date) =>
                      bookings.some((booking) =>
                        isWithinInterval(date, { start: startOfDay(booking.checkIn), end: endOfDay(booking.checkOut) }),
                      ),
                    blocked: (date) =>
                      blockedDates.some((block) =>
                        isWithinInterval(date, { start: startOfDay(block.startDate), end: endOfDay(block.endDate) }),
                      ),
                    checkIn: (date) => bookings.some((booking) => isSameDay(date, booking.checkIn)),
                    checkOut: (date) => bookings.some((booking) => isSameDay(date, booking.checkOut)),
                  }}
                  modifiersClassNames={{
                    booked: "bg-blue-500/20 text-blue-700",
                    blocked: "bg-gray-500/20 text-gray-700 line-through",
                    checkIn: "bg-green-500 text-white",
                    checkOut: "bg-red-500 text-white",
                  }}
                  styles={{
                    day: (date) => ({
                      className: getDayClassName(date),
                    }),
                  }}
                />
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-green-500"></div>
                  <span className="text-sm">Check-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-red-500"></div>
                  <span className="text-sm">Check-out</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-blue-500/20"></div>
                  <span className="text-sm">Booked</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full bg-gray-500/20"></div>
                  <span className="text-sm">Blocked</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <Tabs defaultValue="bookings" className="space-y-4">
              <TabsList>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="blocked">Blocked Dates</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>Manage your property bookings</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {bookings.filter((booking) => booking.status !== "cancelled").length > 0 ? (
                      <div className="space-y-4">
                        {bookings
                          .filter((booking) => booking.status !== "cancelled")
                          .map((booking) => (
                            <div
                              key={booking.id}
                              className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                            >
                              <div className="space-y-1 mb-4 md:mb-0">
                                <div className="flex items-center">
                                  <h3 className="font-medium">{booking.guestName}</h3>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <CalendarIcon className="mr-1 h-3 w-3" />
                                  <span>
                                    {format(booking.checkIn, "MMM d, yyyy")} - {format(booking.checkOut, "MMM d, yyyy")}
                                  </span>
                                </div>
                                <div className="flex items-center text-sm">
                                  <Users className="mr-1 h-3 w-3" />
                                  <span>{booking.guests} guests</span>
                                </div>
                              </div>
                              <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                                <div className="flex flex-col items-end">
                                  <span className="font-medium">${booking.totalPrice}</span>
                                  <Badge className="bg-green-500">{booking.status}</Badge>
                                </div>
                                <Button size="sm" variant="destructive" onClick={() => handleCancelBooking(booking.id)}>
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No upcoming bookings</p>
                        <Button className="mt-4" onClick={() => setIsAddingBooking(true)}>
                          Add Booking
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="blocked" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Blocked Dates</CardTitle>
                    <CardDescription>Manage your blocked dates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {blockedDates.length > 0 ? (
                      <div className="space-y-4">
                        {blockedDates.map((block) => (
                          <div
                            key={block.id}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="space-y-1 mb-4 md:mb-0">
                              <div className="flex items-center">
                                <h3 className="font-medium">{block.reason}</h3>
                              </div>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <CalendarIcon className="mr-1 h-3 w-3" />
                                <span>
                                  {format(block.startDate, "MMM d, yyyy")} - {format(block.endDate, "MMM d, yyyy")}
                                </span>
                              </div>
                            </div>
                            <Button size="sm" variant="destructive" onClick={() => handleRemoveBlockedDate(block.id)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No blocked dates</p>
                        <Button className="mt-4" onClick={() => setIsBlockingDates(true)}>
                          Block Dates
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Selected Date</CardTitle>
              <CardDescription>
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : "No date selected"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedDateEvents.length > 0 ? (
                <div className="space-y-4">
                  {selectedDateEvents.map((event) => (
                    <div key={event.id} className="p-4 border rounded-lg">
                      {"guestName" in event ? (
                        // It's a booking
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">{event.guestName}</h3>
                            <Badge className="bg-green-500">{event.status}</Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Check-in: {format(event.checkIn, "MMM d, yyyy")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Check-out: {format(event.checkOut, "MMM d, yyyy")}
                          </div>
                          <div className="text-sm">Guests: {event.guests}</div>
                          <div className="text-sm font-medium">Total: ${event.totalPrice}</div>
                        </div>
                      ) : (
                        // It's a blocked date
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium">Blocked: {event.reason}</h3>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            From: {format(event.startDate, "MMM d, yyyy")}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            To: {format(event.endDate, "MMM d, yyyy")}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No events on this date</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button variant="outline" onClick={() => setIsBlockingDates(true)}>
                      Block Date
                    </Button>
                    <Button onClick={() => setIsAddingBooking(true)}>Add Booking</Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Availability Settings</CardTitle>
              <CardDescription>Configure your booking preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="instant-booking">Instant Booking</Label>
                  <p className="text-sm text-muted-foreground">Allow guests to book without approval</p>
                </div>
                <Switch id="instant-booking" defaultChecked />
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="min-nights">Minimum Nights</Label>
                <Input id="min-nights" type="number" defaultValue="2" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-guests">Maximum Guests</Label>
                <Input id="max-guests" type="number" defaultValue="6" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="advance-notice">Advance Notice (days)</Label>
                <Input id="advance-notice" type="number" defaultValue="1" />
              </div>

              <Button className="w-full">Save Settings</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}

