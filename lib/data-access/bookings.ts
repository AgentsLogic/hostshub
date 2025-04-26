import { supabase } from "../supabase";
import type { Booking, Property, Guest, Channel } from "../database-schema";

// Define and export a type that includes the nested relations fetched by the query
// Use Pick<> to select only the fields actually queried
export type BookingWithDetails = Booking & {
  property: Pick<Property, "id" | "name"> | null;
  guest: Pick<Guest, "id" | "first_name" | "last_name" | "email"> | null;
  channel: Pick<Channel, "id" | "name"> | null;
};

// Export type for the single booking fetch, includes guest phone
export type SingleBookingWithDetails = Booking & {
  property: Pick<Property, "id" | "name"> | null;
  guest: Pick<Guest, "id" | "first_name" | "last_name" | "email" | "phone"> | null;
  channel: Pick<Channel, "id" | "name"> | null;
};

// Export type for date range fetch (doesn't include property details in this query)
export type BookingWithGuestChannel = Booking & {
  guest: Pick<Guest, "id" | "first_name" | "last_name"> | null;
  channel: Pick<Channel, "id" | "name"> | null;
};


export async function getBookings(propertyId?: string): Promise<BookingWithDetails[]> {
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
    throw error;
  }

  // Use the more specific type here
  return data as unknown as BookingWithDetails[];
}

export async function getBooking(id: string): Promise<SingleBookingWithDetails | null> {
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
    throw error;
  }

  // Use the more specific type here
  return data as unknown as SingleBookingWithDetails;
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
): Promise<BookingWithGuestChannel[]> {
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
    throw error;
  }

  // Use the more specific type here
  return data as unknown as BookingWithGuestChannel[];
}
