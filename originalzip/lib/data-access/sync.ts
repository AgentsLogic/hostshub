import { supabase } from "../supabase"
import type { SyncLog, ChannelSyncSettings } from "../database-schema"

export async function getSyncLogs(channelId?: string, propertyId?: string, limit = 50): Promise<SyncLog[]> {
  let query = supabase
    .from("sync_logs")
    .select(`
      *,
      property:properties(id, name),
      channel:channels(id, name)
    `)
    .order("created_at", { ascending: false })
    .limit(limit)

  if (channelId) {
    query = query.eq("channel_id", channelId)
  }

  if (propertyId) {
    query = query.eq("property_id", propertyId)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching sync logs:", error)
    throw error
  }

  return data as unknown as SyncLog[]
}

export async function createSyncLog(syncLog: Omit<SyncLog, "id" | "created_at">): Promise<SyncLog> {
  const { data, error } = await supabase.from("sync_logs").insert(syncLog).select().single()

  if (error) {
    console.error("Error creating sync log:", error)
    throw error
  }

  return data as SyncLog
}

export async function getSyncSettings(userId: string): Promise<ChannelSyncSettings | null> {
  const { data, error } = await supabase.from("channel_sync_settings").select("*").eq("user_id", userId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error fetching sync settings:", error)
    throw error
  }

  return data as ChannelSyncSettings
}

export async function createOrUpdateSyncSettings(
  userId: string,
  settings: Omit<ChannelSyncSettings, "id" | "user_id" | "created_at" | "updated_at">,
): Promise<ChannelSyncSettings> {
  // First check if settings exist
  const { data: existingSettings } = await supabase
    .from("channel_sync_settings")
    .select("id")
    .eq("user_id", userId)
    .single()

  if (existingSettings) {
    // Update existing settings
    const { data, error } = await supabase
      .from("channel_sync_settings")
      .update(settings)
      .eq("user_id", userId)
      .select()
      .single()

    if (error) {
      console.error("Error updating sync settings:", error)
      throw error
    }

    return data as ChannelSyncSettings
  } else {
    // Create new settings
    const { data, error } = await supabase
      .from("channel_sync_settings")
      .insert({
        user_id: userId,
        ...settings,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating sync settings:", error)
      throw error
    }

    return data as ChannelSyncSettings
  }
}

