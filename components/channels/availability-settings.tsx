"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CalendarView } from "@/components/channels/calendar-view" // Assuming CalendarView is self-contained or takes props

interface AvailabilitySettingsProps {
  channelId: string; // Pass channelId if needed by CalendarView
}

export function AvailabilitySettings({ channelId }: AvailabilitySettingsProps) {
  // Moved state from parent component
  const [minStay, setMinStay] = useState(1)
  const [maxStay, setMaxStay] = useState(30)
  const [leadTime, setLeadTime] = useState(0) // Days before arrival booking is allowed
  const [bookingWindow, setBookingWindow] = useState(365) // How far in advance bookings can be made
  const [closedDates, setClosedDates] = useState<Date[]>([]) // Dates when the property is unavailable

  // Basic validation for numeric inputs
  const handleNumericChange = (setter: (value: number) => void, value: string, min = 0) => {
    const num = Number(value);
    if (!isNaN(num) && num >= min) {
      setter(num);
    }
  };

  return (
    <div className="space-y-6">
      {/* Calendar View for managing specific date availability */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Calendar</CardTitle>
          <CardDescription>
            View and manage availability, block dates, or set specific rules for dates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Assuming CalendarView handles its own data fetching/state based on channelId */}
          <CalendarView channelId={channelId} />
          {/* Add controls here if needed to interact with CalendarView, e.g., bulk update */}
        </CardContent>
      </Card>

      {/* Stay Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Stay Requirements</CardTitle>
          <CardDescription>
            Set default minimum and maximum stay lengths for bookings on this channel.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="minStay">Minimum Stay (nights)</Label>
            <Input
              id="minStay"
              type="number"
              className="mt-1"
              value={minStay}
              onChange={(e) => handleNumericChange(setMinStay, e.target.value, 1)}
              min="1"
              step="1"
              placeholder="e.g., 2"
            />
          </div>
          <div>
            <Label htmlFor="maxStay">Maximum Stay (nights)</Label>
            <Input
              id="maxStay"
              type="number"
              className="mt-1"
              value={maxStay}
              onChange={(e) => handleNumericChange(setMaxStay, e.target.value, 1)}
              min="1"
              step="1"
              placeholder="e.g., 30"
            />
          </div>
        </CardContent>
      </Card>

      {/* Booking Restrictions */}
      <Card>
        <CardHeader>
          <CardTitle>Booking Restrictions</CardTitle>
          <CardDescription>
            Control how far in advance guests can book and the required lead time.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="leadTime">Minimum Lead Time (days)</Label>
            <Input
              id="leadTime"
              type="number"
              className="mt-1"
              value={leadTime}
              onChange={(e) => handleNumericChange(setLeadTime, e.target.value, 0)}
              min="0"
              step="1"
              placeholder="e.g., 1 (book at least 1 day in advance)"
            />
             <p className="text-xs text-muted-foreground mt-1">
              Minimum days before arrival a booking can be made. 0 allows same-day booking.
            </p>
          </div>
          <div>
            <Label htmlFor="bookingWindow">Booking Window (days)</Label>
            <Input
              id="bookingWindow"
              type="number"
              className="mt-1"
              value={bookingWindow}
              onChange={(e) => handleNumericChange(setBookingWindow, e.target.value, 1)}
              min="1"
              step="1"
              placeholder="e.g., 365"
            />
             <p className="text-xs text-muted-foreground mt-1">
              How many days into the future guests can book.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
