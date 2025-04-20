import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import { createServerClient, type CookieOptions } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "./database.types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Create a Supabase client for use in the browser
export const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)

// Create a Supabase client for use in server components
export const createClient = () => {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            console.error("Error setting cookie:", error)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options })
          } catch (error) {
            console.error("Error removing cookie:", error)
          }
        },
      },
    },
  )
}

// Auth functions
export async function signUp(email: string, password: string, name: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  return { data, error }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Property functions
export type Property = {
  id: string
  name: string
  location: string
  description?: string
  bedrooms?: number
  bathrooms?: number
  price_per_night?: number
  status: "draft" | "published"
  template?: string
  airbnb_id?: string
  vrbo_id?: string
  custom_domain?: string
  subdomain?: string
  visitors?: number
  bookings?: number
  revenue?: number
  created_at: string
  updated_at: string
  owner_id: string
}

export type PropertyImage = {
  id: string
  property_id: string
  url: string
  is_cover: boolean
  created_at: string
}

export async function getProperties() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("properties")
    .select(`*, property_images(*)`)
    .order("created_at", { ascending: false })

  return { data, error }
}

export async function getProperty(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("properties").select(`*, property_images(*)`).eq("id", id).single()

  return { data, error }
}

export async function createProperty(propertyData: Partial<Property>) {
  const supabase = createClient()
  const { data, error } = await supabase.from("properties").insert([propertyData]).select().single()

  return { data, error }
}

export async function updateProperty(id: string, propertyData: Partial<Property>) {
  const supabase = createClient()
  const { data, error } = await supabase.from("properties").update(propertyData).eq("id", id).select().single()

  return { data, error }
}

export async function deleteProperty(id: string) {
  const supabase = createClient()
  const { error } = await supabase.from("properties").delete().eq("id", id)

  return { error }
}

export async function uploadPropertyImage(propertyId: string, file: File, isCover = false) {
  const supabase = createClient()
  // Generate a unique file name
  const fileExt = file.name.split(".").pop()
  const fileName = `${propertyId}/${Date.now()}.${fileExt}`

  // Upload the file to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage.from("property-images").upload(fileName, file)

  if (uploadError) {
    return { error: uploadError }
  }

  // Get the public URL
  const { data: urlData } = supabase.storage.from("property-images").getPublicUrl(fileName)

  // Insert the image record in the database
  const { data, error } = await supabase
    .from("property_images")
    .insert([
      {
        property_id: propertyId,
        url: urlData.publicUrl,
        is_cover: isCover,
      },
    ])
    .select()
    .single()

  return { data, error }
}

export type WhiteLabelSettings = {
  id: string
  user_id: string
  custom_domain: string
  logo_url: string
  primary_color: string
  secondary_color: string
  font: string
  created_at: string
  updated_at: string
}

export async function getWhiteLabelSettings(userId: string) {
  const supabase = createClient()
  const { data, error } = await supabase.from("white_label_settings").select("*").eq("user_id", userId).single()

  return { data, error }
}

export async function updateWhiteLabelSettings(userId: string, settings: Partial<WhiteLabelSettings>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("white_label_settings")
    .upsert({
      user_id: userId,
      ...settings,
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()

  return { data, error }
}

export async function getWhiteLabelSettingsByDomain(domain: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("white_label_settings")
    .select("*, users(*)")
    .eq("custom_domain", domain)
    .single()

  return { data, error }
}

export async function getBookings(propertyId: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("property_id", propertyId)
    .order("check_in", { ascending: true })

  return { data, error }
}

export async function updateBooking(bookingId: string, updates: any) {
  const supabase = createClient()
  const { data, error } = await supabase.from("bookings").update(updates).eq("id", bookingId).select().single()

  return { data, error }
}

export async function createBooking(bookingData: any) {
  const supabase = createClient()
  const { data, error } = await supabase.from("bookings").insert([bookingData]).select().single()

  return { data, error }
}

export async function createBlockedDates(blockedDateData: any) {
  const supabase = createClient()
  const { data, error } = await supabase.from("blocked_dates").insert([blockedDateData]).select().single()

  return { data, error }
}

