"use client"

import { useState, useEffect } from "react"
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsByDateRange,
} from "@/lib/data-access/bookings"
import type { Booking } from "@/lib/database-schema"

export function useBookings(propertyId?: string) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchBookings() {
      try {
        setIsLoading(true)
        const data = await getBookings(propertyId)
        setBookings(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch bookings"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [propertyId])

  const addBooking = async (booking: Omit<Booking, "id" | "created_at" | "updated_at">) => {
    try {
      const newBooking = await createBooking(booking)
      setBookings((prev) => [...prev, newBooking])
      return newBooking
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create booking"))
      throw err
    }
  }

  const editBooking = async (id: string, booking: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>) => {
    try {
      const updatedBooking = await updateBooking(id, booking)
      setBookings((prev) => prev.map((b) => (b.id === id ? updatedBooking : b)))
      return updatedBooking
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update booking"))
      throw err
    }
  }

  const removeBooking = async (id: string) => {
    try {
      await deleteBooking(id)
      setBookings((prev) => prev.filter((b) => b.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete booking"))
      throw err
    }
  }

  const fetchBookingsByDateRange = async (propertyId: string, startDate: string, endDate: string) => {
    try {
      setIsLoading(true)
      const data = await getBookingsByDateRange(propertyId, startDate, endDate)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch bookings by date range"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    bookings,
    isLoading,
    error,
    addBooking,
    editBooking,
    removeBooking,
    fetchBookingsByDateRange,
  }
}

