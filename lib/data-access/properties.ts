import { supabase } from "../supabase"
import type { Property } from "../database-schema"

export async function getProperties(userId: string): Promise<Property[]> {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .eq("owner_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching properties:", error)
    throw error
  }

  return data as Property[]
}

export async function getProperty(id: string): Promise<Property | null> {
  const { data, error } = await supabase.from("properties").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching property:", error)
    throw error
  }

  return data as Property
}

export async function createProperty(property: Omit<Property, "id" | "created_at" | "updated_at">): Promise<Property> {
  const { data, error } = await supabase.from("properties").insert(property).select().single()

  if (error) {
    console.error("Error creating property:", error)
    throw error
  }

  return data as Property
}

export async function updateProperty(
  id: string,
  property: Partial<Omit<Property, "id" | "created_at" | "updated_at">>,
): Promise<Property> {
  const { data, error } = await supabase.from("properties").update(property).eq("id", id).select().single()

  if (error) {
    console.error("Error updating property:", error)
    throw error
  }

  return data as Property
}

export async function deleteProperty(id: string): Promise<void> {
  const { error } = await supabase.from("properties").delete().eq("id", id)

  if (error) {
    console.error("Error deleting property:", error)
    throw error
  }
}

