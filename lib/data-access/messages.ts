import { supabase } from "../supabase"
import type { Message } from "../database-schema"

export async function getMessages(bookingId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("booking_id", bookingId)
    .order("created_at", { ascending: true })

  if (error) {
    console.error("Error fetching messages:", error)
    throw error
  }

  return data as Message[]
}

export async function createMessage(message: Omit<Message, "id" | "created_at">): Promise<Message> {
  const { data, error } = await supabase.from("messages").insert(message).select().single()

  if (error) {
    console.error("Error creating message:", error)
    throw error
  }

  return data as Message
}

export async function markMessageAsRead(id: string): Promise<void> {
  const { error } = await supabase.from("messages").update({ read: true }).eq("id", id)

  if (error) {
    console.error("Error marking message as read:", error)
    throw error
  }
}

export async function getUnreadMessageCount(bookingId: string, senderId: string): Promise<number> {
  const { count, error } = await supabase
    .from("messages")
    .select("*", { count: "exact", head: true })
    .eq("booking_id", bookingId)
    .eq("read", false)
    .neq("sender_id", senderId)

  if (error) {
    console.error("Error getting unread message count:", error)
    throw error
  }

  return count || 0
}

