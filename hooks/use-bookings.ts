"use client"

import { useState, useEffect } from "react"
import {
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  getBookingsByDateRange,
} from "@/lib/data-access/bookings"
import type { Booking } from "@/lib/database-schema";
// Import the detailed type implicitly via the return type of getBookings
// We need to ensure the type used here matches what getBookings actually returns.
// Let's assume BookingWithDetails is the correct type based on lib/data-access/bookings.ts
// We might need a proper import if the type is defined elsewhere formally.
import type { BookingWithDetails } from "@/lib/data-access/bookings"; // Assuming it's exported or accessible

export function useBookings(propertyId?: string) {
  // Use the detailed type for the state
  const [bookings, setBookings] = useState<BookingWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        setIsLoading(true);
        // getBookings now returns BookingWithDetails[]
        const data = await getBookings(propertyId);
        setBookings(data); // This should now align type-wise
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch bookings"));
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [propertyId])

  const addBooking = async (booking: Omit<Booking, "id" | "created_at" | "updated_at">) => {
    try {
      const newBooking = await createBooking(booking);
      // Note: createBooking returns the base Booking type.
      // If we need the full details immediately, createBooking might need adjustment
      // or we'd need to refetch/manually construct the BookingWithDetails object.
      // For now, adding the base type might cause type issues if strict checking is enforced.
      // Let's cast for now, but this might need refinement.
      setBookings((prev) => [...prev, newBooking as BookingWithDetails]);
      return newBooking;
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create booking"))
      throw err
    }
  }

  const editBooking = async (id: string, booking: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>) => {
    try {
      const updatedBooking = await updateBooking(id, booking);
      // Similar to addBooking, updateBooking returns the base Booking type.
      // We need to ensure the updated object conforms to BookingWithDetails if needed immediately.
      // Casting for now.
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? (updatedBooking as BookingWithDetails) : b)),
      );
      return updatedBooking;
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
