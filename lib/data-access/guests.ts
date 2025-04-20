import { supabase } from "../supabase"
import type { Guest } from "../database-schema"

export async function getGuests(): Promise<Guest[]> {
  const { data, error } = await supabase.from("guests").select("*").order("last_name", { ascending: true })

  if (error) {
    console.error("Error fetching guests:", error)
    throw error
  }

  return data as Guest[]
}

export async function getGuest(id: string): Promise<Guest | null> {
  const { data, error } = await supabase.from("guests").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching guest:", error)
    throw error
  }

  return data as Guest
}

export async function createGuest(guest: Omit<Guest, "id" | "created_at" | "updated_at">): Promise<Guest> {
  const { data, error } = await supabase.from("guests").insert(guest).select().single()

  if (error) {
    console.error("Error creating guest:", error)
    throw error
  }

  return data as Guest
}

export async function updateGuest(
  id: string,
  guest: Partial<Omit<Guest, "id" | "created_at" | "updated_at">>,
): Promise<Guest> {
  const { data, error } = await supabase.from("guests").update(guest).eq("id", id).select().single()

  if (error) {
    console.error("Error updating guest:", error)
    throw error
  }

  return data as Guest
}

export async function findGuestByEmail(email: string): Promise<Guest | null> {
  const { data, error } = await supabase.from("guests").select("*").eq("email", email).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error finding guest by email:", error)
    throw error
  }

  return data as Guest
}

