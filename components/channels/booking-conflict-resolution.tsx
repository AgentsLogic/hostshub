"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  AlertTriangle, 
  Calendar, 
  Check, 
  Clock, 
  Info, 
  RefreshCw, 
  Shield, 
  Users, 
  X,
  ArrowRight
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// Types
interface Booking {
  id: string;
  channelId: string;
  channelName: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  guestCount: number;
  checkIn: Date;
  checkOut: Date;
  totalAmount: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  createdAt: Date;
}

interface BookingConflict {
  id: string;
  propertyId: string;
  propertyName: string;
  conflictType: 'overlap' | 'same-day' | 'buffer-violation';
  severity: 'high' | 'medium' | 'low';
  status: 'unresolved' | 'resolved' | 'ignored';
  bookings: Booking[];
  detectedAt: Date;
  resolvedAt?: Date;
}

// Mock data for booking conflicts
const mockConflicts: BookingConflict[] = [
  {
    id: "conflict-1",
    propertyId: "prop-1",
    propertyName: "Beach Villa",
    conflictType: "overlap",
    severity: "high",
    status: "unresolved",
    bookings: [
      {
        id: "booking-1",
        channelId: "1",
        channelName: "Airbnb",
        propertyId: "prop-1",
        propertyName: "Beach Villa",
        guestName: "John Smith",
        guestCount: 2,
        checkIn: new Date("2025-05-10"),
        checkOut: new Date("2025-05-15"),
        totalAmount: 750,
        status: "confirmed",
        createdAt: new Date("2025-04-01T10:30:00")
      },
      {
        id: "booking-2",
        channelId: "2",
        channelName: "Booking.com",
        propertyId: "prop-1",
        propertyName: "Beach Villa",
        guestName: "Jane Doe",
        guestCount: 3,
        checkIn: new Date("2025-05-12"),
        checkOut: new Date("2025-05-18"),
        totalAmount: 900,
        status: "confirmed",
        createdAt: new Date("2025-04-02T14:45:00")
      }
    ],
    detectedAt: new Date("2025-04-02T15:00:00")
  },
  {
    id: "conflict-2",
    propertyId: "prop-2",
    propertyName: "Mountain Cabin",
    conflictType: "same-day",
    severity: "medium",
    status: "unresolved",
    bookings: [
      {
        id: "booking-3",
        channelId: "1",
        channelName: "Airbnb",
        propertyId: "prop-2",
        propertyName: "Mountain Cabin",
        guestName: "Robert Johnson",
        guestCount: 4,
        checkIn: new Date("2025-06-01"),
        checkOut: new Date("2025-06-05"),
        totalAmount: 600,
        status: "confirmed",
        createdAt: new Date("2025-04-01T09:15:00")
      },
      {
        id: "booking-4",
        channelId: "3",
        channelName: "VRBO",
        propertyId: "prop-2",
        propertyName: "Mountain Cabin",
        guestName: "Sarah Williams",
        guestCount: 2,
        checkIn: new Date("2025-06-05"),
        checkOut: new Date("2025-06-10"),
        totalAmount: 750,
        status: "confirmed",
        createdAt: new Date("2025-04-02T11:30:00")
      }
    ],
    detectedAt: new Date("2025-04-02T12:00:00")
  },
  {
    id: "conflict-3",
    propertyId: "prop-3",
    propertyName: "City Apartment",
    conflictType: "buffer-violation",
    severity: "low",
    status: "resolved",
    bookings: [
      {
        id: "booking-5",
        channelId: "1",
        channelName: "Airbnb",
        propertyId: "prop-3",
        propertyName: "City Apartment",
        guestName: "Michael Brown",
        guestCount: 2,
        checkIn: new Date("2025-07-10"),
        checkOut: new Date("2025-07-15"),
        totalAmount: 500,
        status: "confirmed",
        createdAt: new Date("2025-04-01T14:20:00")
      },
      {
        id: "booking-6",
        channelId: "2",
        channelName: "Booking.com",
        propertyId: "prop-3",
        propertyName: "City Apartment",
        guestName: "Emily Davis",
        guestCount: 1,
        checkIn: new Date("2025-07-16"),
        checkOut: new Date("2025-07-20"),
        totalAmount: 400,
        status: "confirmed",
        createdAt: new Date("2025-04-02T09:45:00")
      }
    ],
    detectedAt: new Date("2025-04-02T10:00:00"),
    resolvedAt: new Date("2025-04-02T16:30:00")
  }
];

interface BookingConflictResolutionProps {
  channelId?: string;
}

export function BookingConflictResolution({ channelId }: BookingConflictResolutionProps) {
  const [conflicts, setConflicts] = useState<BookingConflict[]>(
    channelId 
      ? mockConflicts.filter(conflict => 
          conflict.bookings.some(booking => booking.channelId === channelId)
        )
      : mockConflicts
  );
  
  const [statusFilter, setStatusFilter] = useState<'all' | 'unresolved' | 'resolved' | 'ignored'>('all');
  const [severityFilter, setSeverityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedConflict, setSelectedConflict] = useState<BookingConflict | null>(null);
  const [isResolvingConflict, setIsResolvingConflict] = useState(false);
  const [selectedBookingToKeep, setSelectedBookingToKeep] = useState<string | null>(null);
  
  // Filter conflicts based on status and severity
  const filteredConflicts = conflicts.filter(conflict => {
    const statusMatch = statusFilter === 'all' || conflict.status === statusFilter;
    const severityMatch = severityFilter === 'all' || conflict.severity === severityFilter;
    return statusMatch && severityMatch;
  });
  
  // Handle resolving a conflict
  const handleResolveConflict = (conflict: BookingConflict) => {
    setSelectedConflict(conflict);
    setIsResolvingConflict(true);
    setSelectedBookingToKeep(null);
  };
  
  // Handle ignoring a conflict
  const handleIgnoreConflict = (conflictId: string) => {
    setConflicts(conflicts.map(conflict => 
      conflict.id === conflictId 
        ? { ...conflict, status: 'ignored' as const } 
        : conflict
    ));
  };
  
  // Handle confirming conflict resolution
  const handleConfirmResolution = () => {
    if (!selectedConflict || !selectedBookingToKeep) return;
    
    setConflicts(conflicts.map(conflict => 
      conflict.id === selectedConflict.id 
        ? { 
            ...conflict, 
            status: 'resolved' as const,
            resolvedAt: new Date()
          } 
        : conflict
    ));
    
    setIsResolvingConflict(false);
    setSelectedConflict(null);
    setSelectedBookingToKeep(null);
  };
  
  // Get conflict type display text
  const getConflictTypeText = (type: string) => {
    switch (type) {
      case 'overlap':
        return 'Booking Overlap';
      case 'same-day':
        return 'Same-Day Turnover';
      case 'buffer-violation':
        return 'Buffer Violation';
      default:
        return type;
    }
  };
  
  // Get severity badge
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-100 text-amber-800">Medium</Badge>;
      case 'low':
        return <Badge className="bg-blue-100 text-blue-800">Low</Badge>;
      default:
        return <Badge variant="outline">{severity}</Badge>;
    }
  };
  
  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unresolved':
        return <Badge variant="destructive">Unresolved</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'ignored':
        return <Badge variant="outline">Ignored</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Format date range
  const formatDateRange = (checkIn: Date, checkOut: Date) => {
    return `${checkIn.toLocaleDateString()} - ${checkOut.toLocaleDateString()}`;
  };
  
  // Calculate number of nights
  const calculateNights = (checkIn: Date, checkOut: Date) => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Booking Conflicts</CardTitle>
              <CardDescription>
                Detect and resolve booking conflicts across channels
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Select 
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value as any)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="unresolved">Unresolved</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="ignored">Ignored</SelectItem>
                </SelectContent>
              </Select>
              
              <Select 
                value={severityFilter}
                onValueChange={(value) => setSeverityFilter(value as any)}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Filter by severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Severities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredConflicts.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-medium">No conflicts found</h3>
              <p className="text-muted-foreground mt-1">
                {statusFilter !== 'all' || severityFilter !== 'all' 
                  ? 'Try adjusting your filters to see more results' 
                  : 'All your bookings are properly synchronized'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredConflicts.map((conflict) => (
                <Card key={conflict.id} className={`border ${
                  conflict.status === 'resolved' ? 'border-green-200' :
                  conflict.status === 'ignored' ? 'border-gray-200' :
                  conflict.severity === 'high' ? 'border-red-200' :
                  conflict.severity === 'medium' ? 'border-amber-200' :
                  'border-blue-200'
                }`}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-base">{conflict.propertyName}</CardTitle>
                          {getSeverityBadge(conflict.severity)}
                          {getStatusBadge(conflict.status)}
                        </div>
                        <CardDescription>
                          {getConflictTypeText(conflict.conflictType)} • Detected {conflict.detectedAt.toLocaleString()}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        {conflict.status === 'unresolved' && (
                          <>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleIgnoreConflict(conflict.id)}
                            >
                              Ignore
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleResolveConflict(conflict)}
                            >
                              Resolve
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {conflict.bookings.map((booking, index) => (
                          <div 
                            key={booking.id} 
                            className={`p-4 rounded-md ${
                              booking.channelId === '1' ? 'bg-red-50' :
                              booking.channelId === '2' ? 'bg-blue-50' :
                              booking.channelId === '3' ? 'bg-green-50' :
                              'bg-gray-50'
                            }`}
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <span className={`font-medium ${
                                  booking.channelId === '1' ? 'text-red-600' :
                                  booking.channelId === '2' ? 'text-blue-600' :
                                  booking.channelId === '3' ? 'text-green-600' :
                                  'text-gray-600'
                                }`}>
                                  {booking.channelName}
                                </span>
                                <Badge variant="outline">{booking.status}</Badge>
                              </div>
                              <span className="text-sm font-medium">
                                ${booking.totalAmount}
                              </span>
                            </div>
                            
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{booking.guestName} • {booking.guestCount} guests</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span>{formatDateRange(booking.checkIn, booking.checkOut)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span>{calculateNights(booking.checkIn, booking.checkOut)} nights</span>
                              </div>
                            </div>
                            
                            {index < conflict.bookings.length - 1 && (
                              <div className="hidden md:flex justify-center my-4">
                                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                      
                      {conflict.status === 'resolved' && conflict.resolvedAt && (
                        <div className="flex items-center gap-2 text-sm text-green-600 mt-2">
                          <Check className="h-4 w-4" />
                          <span>Resolved on {conflict.resolvedAt.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Conflict Prevention</CardTitle>
          <CardDescription>
            Configure settings to prevent booking conflicts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Automatic Conflict Resolution</h3>
                <p className="text-xs text-muted-foreground">
                  Automatically resolve conflicts based on booking creation time
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Minimum Buffer Between Bookings</h3>
                <p className="text-xs text-muted-foreground">
                  Require a minimum time between guest check-out and next check-in
                </p>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  className="w-16 rounded-md border p-2"
                  defaultValue={1}
                  min={0}
                />
                <span className="text-sm">days</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Block Calendar After Booking</h3>
                <p className="text-xs text-muted-foreground">
                  Automatically block calendar on all channels after a booking is confirmed
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Conflict Notifications</h3>
                <p className="text-xs text-muted-foreground">
                  Receive notifications when booking conflicts are detected
                </p>
              </div>
              <Select defaultValue="email">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Notification method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="both">Email & SMS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Resolution Dialog */}
      <Dialog open={isResolvingConflict} onOpenChange={setIsResolvingConflict}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Resolve Booking Conflict</DialogTitle>
            <DialogDescription>
              Select which booking to keep. The other booking will be cancelled.
            </DialogDescription>
          </DialogHeader>
          
          {selectedConflict && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {selectedConflict.bookings.map((booking) => (
                  <div 
                    key={booking.id} 
                    className={`p-4 rounded-md border-2 cursor-pointer ${
                      selectedBookingToKeep === booking.id 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedBookingToKeep(booking.id)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{booking.channelName}</span>
                        <Badge variant="outline">{booking.status}</Badge>
                      </div>
                      {selectedBookingToKeep === booking.id && (
                        <Badge className="bg-green-100 text-green-800">Keep</Badge>
                      )}
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium">{booking.guestName}</h4>
                        <p className="text-sm text-muted-foreground">{booking.guestCount} guests</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{formatDateRange(booking.checkIn, booking.checkOut)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{calculateNights(booking.checkIn, booking.checkOut)} nights</span>
                      </div>
                      
                      <div className="text-lg font-bold">${booking.totalAmount}</div>
                      
                      <div className="text-xs text-muted-foreground">
                        Created: {booking.createdAt.toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4 flex gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-amber-800">Important</h3>
                  <p className="text-xs text-amber-700 mt-1">
                    The cancelled booking will be automatically cancelled on the channel. 
                    The guest will be notified of the cancellation according to the channel's policies.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsResolvingConflict(false);
                setSelectedConflict(null);
                setSelectedBookingToKeep(null);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleConfirmResolution}
              disabled={!selectedBookingToKeep}
            >
              Confirm Resolution
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
