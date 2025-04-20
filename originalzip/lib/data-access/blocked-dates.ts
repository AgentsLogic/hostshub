import { supabase } from "../supabase"
import type { BlockedDate } from "../database-schema"

export async function getBlockedDates(propertyId: string): Promise<BlockedDate[]> {
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .eq("property_id", propertyId)
    .order("start_date", { ascending: true })

  if (error) {
    console.error("Error fetching blocked dates:", error)
    throw error
  }

  return data as BlockedDate[]
}

export async function getBlockedDate(id: string): Promise<BlockedDate | null> {
  const { data, error } = await supabase.from("blocked_dates").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching blocked date:", error)
    throw error
  }

  return data as BlockedDate
}

export async function createBlockedDate(
  blockedDate: Omit<BlockedDate, "id" | "created_at" | "updated_at">,
): Promise<BlockedDate> {
  const { data, error } = await supabase.from("blocked_dates").insert(blockedDate).select().single()

  if (error) {
    console.error("Error creating blocked date:", error)
    throw error
  }

  return data as BlockedDate
}

export async function updateBlockedDate(
  id: string,
  blockedDate: Partial<Omit<BlockedDate, "id" | "created_at" | "updated_at">>,
): Promise<BlockedDate> {
  const { data, error } = await supabase.from("blocked_dates").update(blockedDate).eq("id", id).select().single()

  if (error) {
    console.error("Error updating blocked date:", error)
    throw error
  }

  return data as BlockedDate
}

export async function deleteBlockedDate(id: string): Promise<void> {
  const { error } = await supabase.from("blocked_dates").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blocked date:", error)
    throw error
  }
}

export async function getBlockedDatesByDateRange(
  propertyId: string,
  startDate: string,
  endDate: string,
): Promise<BlockedDate[]> {
  const { data, error } = await supabase
    .from("blocked_dates")
    .select("*")
    .eq("property_id", propertyId)
    .or(`start_date.gte.${startDate},end_date.lte.${endDate}`)
    .or(`start_date.lte.${startDate},end_date.gte.${startDate}`)
    .or(`start_date.lte.${endDate},end_date.gte.${endDate}`)
    .or(`start_date.gte.${startDate},start_date.lte.${endDate}`)
    .or(`end_date.gte.${startDate},end_date.lte.${endDate}`)

  if (error) {
    console.error("Error fetching blocked dates by date range:", error)
    throw error
  }

  return data as BlockedDate[]
}

