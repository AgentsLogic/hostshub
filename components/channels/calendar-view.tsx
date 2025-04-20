"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  X,
  Info
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Types
interface BlockedDate {
  id: string;
  startDate: Date;
  endDate: Date;
  reason: string;
}

interface Booking {
  id: string;
  channelId: string;
  channelName: string;
  guestName: string;
  checkIn: Date;
  checkOut: Date;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface CalendarViewProps {
  channelId?: string;
  propertyId?: string;
}

export function CalendarView({ channelId, propertyId }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isAddingBlock, setIsAddingBlock] = useState(false);
  const [blockStartDate, setBlockStartDate] = useState<Date | null>(null);
  const [blockEndDate, setBlockEndDate] = useState<Date | null>(null);
  const [blockReason, setBlockReason] = useState('');
  
  // Mock data for bookings
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "booking-1",
      channelId: "1",
      channelName: "Airbnb",
      guestName: "John Smith",
      checkIn: new Date(2025, 3, 10), // April 10, 2025
      checkOut: new Date(2025, 3, 15), // April 15, 2025
      status: "confirmed"
    },
    {
      id: "booking-2",
      channelId: "2",
      channelName: "Booking.com",
      guestName: "Jane Doe",
      checkIn: new Date(2025, 3, 20), // April 20, 2025
      checkOut: new Date(2025, 3, 25), // April 25, 2025
      status: "confirmed"
    },
    {
      id: "booking-3",
      channelId: "1",
      channelName: "Airbnb",
      guestName: "Robert Johnson",
      checkIn: new Date(2025, 4, 5), // May 5, 2025
      checkOut: new Date(2025, 4, 10), // May 10, 2025
      status: "pending"
    }
  ]);
  
  // Mock data for blocked dates
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([
    {
      id: "block-1",
      startDate: new Date(2025, 3, 1), // April 1, 2025
      endDate: new Date(2025, 3, 5), // April 5, 2025
      reason: "Maintenance"
    },
    {
      id: "block-2",
      startDate: new Date(2025, 4, 15), // May 15, 2025
      endDate: new Date(2025, 4, 20), // May 20, 2025
      reason: "Owner Stay"
    }
  ]);
  
  // Filter bookings by channel if channelId is provided
  const filteredBookings = channelId 
    ? bookings.filter(booking => booking.channelId === channelId)
    : bookings;
  
  // Get days in month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  // Check if date is in a booking
  const isDateInBooking = (date: Date) => {
    return filteredBookings.some(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return date >= checkIn && date < checkOut;
    });
  };
  
  // Get booking for a date
  const getBookingForDate = (date: Date) => {
    return filteredBookings.find(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return date >= checkIn && date < checkOut;
    });
  };
  
  // Check if date is blocked
  const isDateBlocked = (date: Date) => {
    return blockedDates.some(block => {
      const startDate = new Date(block.startDate);
      const endDate = new Date(block.endDate);
      return date >= startDate && date <= endDate;
    });
  };
  
  // Get block for a date
  const getBlockForDate = (date: Date) => {
    return blockedDates.find(block => {
      const startDate = new Date(block.startDate);
      const endDate = new Date(block.endDate);
      return date >= startDate && date <= endDate;
    });
  };
  
  // Check if date is check-in date
  const isCheckInDate = (date: Date) => {
    return filteredBookings.some(booking => {
      const checkIn = new Date(booking.checkIn);
      return date.getDate() === checkIn.getDate() && 
             date.getMonth() === checkIn.getMonth() && 
             date.getFullYear() === checkIn.getFullYear();
    });
  };
  
  // Check if date is check-out date
  const isCheckOutDate = (date: Date) => {
    return filteredBookings.some(booking => {
      const checkOut = new Date(booking.checkOut);
      return date.getDate() === checkOut.getDate() && 
             date.getMonth() === checkOut.getMonth() && 
             date.getFullYear() === checkOut.getFullYear();
    });
  };
  
  // Format month name
  const formatMonthName = (date: Date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };
  
  // Handle date click
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  // Handle add block
  const handleAddBlock = () => {
    if (blockStartDate && blockEndDate && blockReason) {
      const newBlock: BlockedDate = {
        id: `block-${Date.now()}`,
        startDate: blockStartDate,
        endDate: blockEndDate,
        reason: blockReason
      };
      
      setBlockedDates([...blockedDates, newBlock]);
      setIsAddingBlock(false);
      setBlockStartDate(null);
      setBlockEndDate(null);
      setBlockReason('');
    }
  };
  
  // Render calendar
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
    const days = [];
    
    // Add empty cells for days before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-24 border bg-gray-50"></div>);
    }
    
    // Add cells for each day in month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isBooked = isDateInBooking(date);
      const isBlocked = isDateBlocked(date);
      const isCheckIn = isCheckInDate(date);
      const isCheckOut = isCheckOutDate(date);
      const booking = getBookingForDate(date);
      const block = getBlockForDate(date);
      
      days.push(
        <div 
          key={`day-${day}`} 
          className={`h-24 border p-1 relative ${
            isBooked ? 'bg-blue-50' : 
            isBlocked ? 'bg-red-50' : 
            'hover:bg-gray-50 cursor-pointer'
          }`}
          onClick={() => handleDateClick(date)}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${
              isCheckIn ? 'text-green-600' : 
              isCheckOut ? 'text-red-600' : 
              ''
            }`}>
              {day}
            </span>
            {isCheckIn && (
              <Badge className="bg-green-100 text-green-800 text-xs">Check-in</Badge>
            )}
            {isCheckOut && (
              <Badge className="bg-red-100 text-red-800 text-xs">Check-out</Badge>
            )}
          </div>
          
          {isBooked && booking && (
            <div className="mt-1">
              <div className={`text-xs p-1 rounded ${
                booking.channelId === '1' ? 'bg-red-100 text-red-800' :
                booking.channelId === '2' ? 'bg-blue-100 text-blue-800' :
                booking.channelId === '3' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {booking.channelName}
              </div>
              <div className="text-xs mt-1 truncate">{booking.guestName}</div>
            </div>
          )}
          
          {isBlocked && block && (
            <div className="mt-1">
              <div className="text-xs p-1 rounded bg-red-100 text-red-800">
                {block.reason}
              </div>
            </div>
          )}
        </div>
      );
    }
    
    return days;
  };
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle>Availability Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">{formatMonthName(currentMonth)}</span>
              <Button variant="outline" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardDescription>
            View and manage property availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-px">
            {/* Day headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center font-medium p-2 bg-gray-50">
                {day}
              </div>
            ))}
            
            {/* Calendar days */}
            {renderCalendar()}
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-100 border border-blue-300"></div>
                <span className="text-sm">Booking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-100 border border-red-300"></div>
                <span className="text-sm">Blocked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-100 border border-green-300"></div>
                <span className="text-sm">Check-in</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-100 border border-red-300"></div>
                <span className="text-sm">Check-out</span>
              </div>
            </div>
            
            <Button onClick={() => setIsAddingBlock(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Block Dates
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Legend and info */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Channel Availability</CardTitle>
          <CardDescription>
            How availability is managed across channels
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-blue-800">Automatic Availability Sync</h3>
              <p className="text-sm text-blue-700 mt-1">
                When a booking is confirmed on any channel, the availability is automatically blocked on all other channels to prevent double bookings.
              </p>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h3 className="font-medium">Airbnb</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Last synced: 2 hours ago
              </p>
              <p className="text-sm text-muted-foreground">
                Sync frequency: Every hour
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <h3 className="font-medium">Booking.com</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Last synced: 1 hour ago
              </p>
              <p className="text-sm text-muted-foreground">
                Sync frequency: Every hour
              </p>
            </div>
            
            <div className="p-4 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <h3 className="font-medium">VRBO</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Last synced: 3 hours ago
              </p>
              <p className="text-sm text-muted-foreground">
                Sync frequency: Every hour
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Block Dialog */}
      <Dialog open={isAddingBlock} onOpenChange={setIsAddingBlock}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Block Dates</DialogTitle>
            <DialogDescription>
              Block dates to prevent bookings during this period
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Start Date</label>
                <input 
                  type="date" 
                  className="w-full rounded-md border p-2"
                  onChange={(e) => setBlockStartDate(e.target.value ? new Date(e.target.value) : null)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">End Date</label>
                <input 
                  type="date" 
                  className="w-full rounded-md border p-2"
                  onChange={(e) => setBlockEndDate(e.target.value ? new Date(e.target.value) : null)}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Reason</label>
              <select 
                className="w-full rounded-md border p-2"
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
              >
                <option value="">Select a reason</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Owner Stay">Owner Stay</option>
                <option value="Renovation">Renovation</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingBlock(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBlock} disabled={!blockStartDate || !blockEndDate || !blockReason}>
              Block Dates
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
