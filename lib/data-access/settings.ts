import { supabase } from "../supabase"
import type { UserSettings, BookingWorkflowSettings } from "../database-schema"

export async function getUserSettings(userId: string): Promise<UserSettings | null> {
  const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error fetching user settings:", error)
    throw error
  }

  return data as UserSettings
}

export async function createOrUpdateUserSettings(
  userId: string,
  settings: Omit<UserSettings, "id" | "user_id" | "created_at" | "updated_at">,
): Promise<UserSettings> {
  // First check if settings exist
  const { data: existingSettings } = await supabase.from("user_settings").select("id").eq("user_id", userId).single()

  if (existingSettings) {
    // Update existing settings
    const { data, error } = await supabase
      .from("user_settings")
      .update(settings)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating user settings:", error)
      throw error
    }

    return data as UserSettings
  } else {
    // Create new settings
    const { data, error } = await supabase
      .from("user_settings")
      .insert({
        user_id: userId,
        ...settings,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating user settings:", error)
      throw error
    }

    return data as UserSettings
  }
}

export async function getBookingWorkflowSettings(userId: string): Promise<BookingWorkflowSettings | null> {
  const { data, error } = await supabase.from("booking_workflow_settings").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error fetching booking workflow settings:", error)
    throw error
  }

  return data as BookingWorkflowSettings
}

export async function createOrUpdateBookingWorkflowSettings(
  userId: string,
  settings: Omit<BookingWorkflowSettings, "id" | "user_id" | "created_at" | "updated_at">,
): Promise<BookingWorkflowSettings> {
  // First check if settings exist
  const { data: existingSettings } = await supabase
    .from("booking_workflow_settings")
    .select("id")
    .eq("user_id", userId)
    .single()

  if (existingSettings) {
    // Update existing settings
    const { data, error } = await supabase
      .from("booking_workflow_settings")
      .update(settings)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating booking workflow settings:", error)
      throw error
    }

    return data as BookingWorkflowSettings
  } else {
    // Create new settings
    const { data, error } = await supabase
      .from("booking_workflow_settings")
      .insert({
        user_id: userId,
        ...settings,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating booking workflow settings:", error)
      throw error
    }

    return data as BookingWorkflowSettings
  }
}

