import { supabase } from "../supabase"
import type { Review } from "../database-schema"

export async function getReviews(propertyId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      guest:guests(id, first_name, last_name)
    `)
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching reviews:", error)
    throw error
  }

  return data as unknown as Review[]
}

export async function getReview(id: string): Promise<Review | null> {
  const { data, error } = await supabase
    .from("reviews")
    .select(`
      *,
      guest:guests(id, first_name, last_name)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching review:", error)
    throw error
  }

  return data as unknown as Review
}

export async function createReview(review: Omit<Review, "id" | "created_at" | "updated_at">): Promise<Review> {
  const { data, error } = await supabase.from("reviews").insert(review).select().single()

  if (error) {
    console.error("Error creating review:", error)
    throw error
  }

  return data as Review
}

export async function updateReviewResponse(id: string, response: string): Promise<Review> {
  const { data, error } = await supabase
    .from("reviews")
    .update({ response, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating review response:", error)
    throw error
  }

  return data as Review
}

export async function getReviewByBooking(bookingId: string): Promise<Review | null> {
  const { data, error } = await supabase.from("reviews").select("*").eq("booking_id", bookingId).single()

  if (error && error.code !== "PGRST116") {
    // PGRST116 is "no rows returned" error
    console.error("Error fetching review by booking:", error)
    throw error
  }

  return data as Review
}

