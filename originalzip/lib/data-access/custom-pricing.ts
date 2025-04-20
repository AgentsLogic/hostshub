import { supabase } from "../supabase"
import type { CustomPricing } from "../database-schema"

export async function getCustomPricing(propertyId: string): Promise<CustomPricing[]> {
  const { data, error } = await supabase
    .from("custom_pricing")
    .select("*")
    .eq("property_id", propertyId)
    .order("start_date", { ascending: true })

  if (error) {
    console.error("Error fetching custom pricing:", error)
    throw error
  }

  return data as CustomPricing[]
}

export async function getCustomPricingById(id: string): Promise<CustomPricing | null> {
  const { data, error } = await supabase.from("custom_pricing").select("*").eq("id", id).single()

  if (error) {
    console.error("Error fetching custom pricing:", error)
    throw error
  }

  return data as CustomPricing
}

export async function createCustomPricing(
  customPricing: Omit<CustomPricing, "id" | "created_at" | "updated_at">,
): Promise<CustomPricing> {
  const { data, error } = await supabase.from("custom_pricing").insert(customPricing).select().single()

  if (error) {
    console.error("Error creating custom pricing:", error)
    throw error
  }

  return data as CustomPricing
}

export async function updateCustomPricing(
  id: string,
  customPricing: Partial<Omit<CustomPricing, "id" | "created_at" | "updated_at">>,
): Promise<CustomPricing> {
  const { data, error } = await supabase.from("custom_pricing").update(customPricing).eq("id", id).select().single()

  if (error) {
    console.error("Error updating custom pricing:", error)
    throw error
  }

  return data as CustomPricing
}

export async function deleteCustomPricing(id: string): Promise<void> {
  const { error } = await supabase.from("custom_pricing").delete().eq("id", id)

  if (error) {
    console.error("Error deleting custom pricing:", error)
    throw error
  }
}

export async function getCustomPricingByDate(propertyId: string, date: string): Promise<CustomPricing | null> {
  const { data, error } = await supabase
    .from("custom_pricing")
    .select("*")
    .eq("property_id", propertyId)
    .lte("start_date", date)
    .gte("end_date", date)
    .single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error fetching custom pricing by date:", error)
    throw error
  }

  return data as CustomPricing
}

