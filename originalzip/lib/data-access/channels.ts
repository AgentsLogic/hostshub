import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/lib/database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export async function getChannels() {
  const { data, error } = await supabase.from("channels").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching channels:", error)
    throw error
  }

  return data || []
}

export async function connectChannel(channelData: any) {
  const { data, error } = await supabase.from("channels").insert([channelData]).select().single()

  if (error) {
    console.error("Error connecting channel:", error)
    throw error
  }

  return data
}

export async function updateChannel(id: string, channelData: any) {
  const { data, error } = await supabase.from("channels").update(channelData).eq("id", id).select().single()

  if (error) {
    console.error("Error updating channel:", error)
    throw error
  }

  return data
}

export async function disconnectChannel(id: string) {
  const { error } = await supabase.from("channels").delete().eq("id", id)

  if (error) {
    console.error("Error disconnecting channel:", error)
    throw error
  }

  return true
}

export async function getPropertyChannels(propertyId: string) {
  const { data, error } = await supabase
    .from("property_channels")
    .select("*")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching property channels:", error)
    throw error
  }

  return data || []
}

export async function connectPropertyChannel(propertyChannelData: any) {
  const { data, error } = await supabase.from("property_channels").insert([propertyChannelData]).select().single()

  if (error) {
    console.error("Error connecting property channel:", error)
    throw error
  }

  return data
}

export async function updatePropertyChannel(id: string, propertyChannelData: any) {
  const { data, error } = await supabase
    .from("property_channels")
    .update(propertyChannelData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating property channel:", error)
    throw error
  }

  return data
}

export async function disconnectPropertyChannel(id: string) {
  const { error } = await supabase.from("property_channels").delete().eq("id", id)

  if (error) {
    console.error("Error disconnecting property channel:", error)
    throw error
  }

  return true
}

// Aliases for the missing exports
export const createChannelConnection = connectChannel
export const updateChannelConnection = updateChannel

