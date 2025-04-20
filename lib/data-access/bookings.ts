import { supabase } from "../supabase"
import type { Booking } from "../database-schema"

export async function getBookings(propertyId?: string): Promise<Booking[]> {
  let query = supabase
    .from("bookings")
    .select(`
      *,
      property:properties(id, name),
      guest:guests(id, first_name, last_name, email),
      channel:channels(id, name)
    `)
    .order("check_in", { ascending: true })

  if (propertyId) {
    query = query.eq("property_id", propertyId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching bookings:", error)
    throw error
  }

  return data as unknown as Booking[]
}

export async function getBooking(id: string): Promise<Booking | null> {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      property:properties(id, name),
      guest:guests(id, first_name, last_name, email, phone),
      channel:channels(id, name)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching booking:", error)
    throw error
  }

  return data as unknown as Booking
}

export async function createBooking(booking: Omit<Booking, "id" | "created_at" | "updated_at">): Promise<Booking> {
  const { data, error } = await supabase.from("bookings").insert(booking).select().single()

  if (error) {
    console.error("Error creating booking:", error)
    throw error
  }

  return data as Booking
}

export async function updateBooking(
  id: string,
  booking: Partial<Omit<Booking, "id" | "created_at" | "updated_at">>,
): Promise<Booking> {
  const { data, error } = await supabase.from("bookings").update(booking).eq("id", id).select().single()

  if (error) {
    console.error("Error updating booking:", error)
    throw error
  }

  return data as Booking
}

export async function deleteBooking(id: string): Promise<void> {
  const { error } = await supabase.from("bookings").delete().eq("id", id)

  if (error) {
    console.error("Error deleting booking:", error)
    throw error
  }
}

export async function getBookingsByDateRange(
  propertyId: string,
  startDate: string,
  endDate: string,
): Promise<Booking[]> {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      *,
      guest:guests(id, first_name, last_name),
      channel:channels(id, name)
    `)
    .eq("property_id", propertyId)
    .or(`check_in.gte.${startDate},check_out.lte.${endDate}`)
    .or(`check_in.lte.${startDate},check_out.gte.${startDate}`)
    .or(`check_in.lte.${endDate},check_out.gte.${endDate}`)
    .or(`check_in.gte.${startDate},check_in.lte.${endDate}`)
    .or(`check_out.gte.${startDate},check_out.lte.${endDate}`)
    .neq("status", "cancelled")

  if (error) {
    console.error("Error fetching bookings by date range:", error)
    throw error
  }

  return data as unknown as Booking[]
}

