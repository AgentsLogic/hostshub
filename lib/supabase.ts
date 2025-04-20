import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const requiredEnvVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
}

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`${key} environment variable is required`)
  }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL or Anon Key not configured')
}

export const supabase = createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey)

// Auth functions
export async function signUp(email: string, password: string, name: string) {
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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// Property functions
export type Property = Database['public']['Tables']['properties']['Row']
export type PropertyImage = Database['public']['Tables']['property_images']['Row']

export async function getProperties() {
  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .order('created_at', { ascending: false })
  return { data, error }
}

export async function getProperty(id: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*, property_images(*)')
    .eq('id', id)
    .single()
  return { data, error }
}

export async function createProperty(propertyData: Omit<Property, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('properties')
    .insert({
      ...propertyData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single()
  return { data, error }
}

export async function updateProperty(id: string, propertyData: Partial<Property>) {
  const { data, error } = await supabase
    .from('properties')
    .update({
      ...propertyData,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()
  return { data, error }
}

export async function deleteProperty(id: string) {
  const { error } = await supabase.from('properties').delete().eq('id', id)
  return { error }
}

export async function uploadPropertyImage(propertyId: string, file: File, isCover = false) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${propertyId}/${Date.now()}.${fileExt}`

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('property-images')
    .upload(fileName, file)

  if (uploadError) return { error: uploadError }

  const { data: urlData } = supabase.storage.from('property-images').getPublicUrl(fileName)

  const { data, error } = await supabase
    .from('property_images')
    .insert({
      property_id: propertyId,
      url: urlData.publicUrl,
      is_cover: isCover,
      created_at: new Date().toISOString()
    })
    .select()
    .single()

  return { data, error }
}

// White Label functions
export type WhiteLabelSettings = Database['public']['Tables']['white_label_settings']['Row']

export async function getWhiteLabelSettings(userId: string) {
  const { data, error } = await supabase
    .from('white_label_settings')
    .select('*')
    .eq('user_id', userId)
    .single()
  return { data, error }
}

export async function updateWhiteLabelSettings(
  userId: string, 
  settings: Partial<Omit<WhiteLabelSettings, 'id' | 'user_id' | 'created_at' | 'updated_at'>>
) {
  const { data, error } = await supabase
    .from('white_label_settings')
    .upsert({
      user_id: userId,
      custom_domain: settings.custom_domain || '',
      logo_url: settings.logo_url || '',
      primary_color: settings.primary_color || '',
      secondary_color: settings.secondary_color || '',
      font: settings.font || '',
      updated_at: new Date().toISOString(),
    })
    .select()
    .single()
  return { data, error }
}

export async function getWhiteLabelSettingsByDomain(domain: string) {
  const { data, error } = await supabase
    .from('white_label_settings')
    .select('*, users(*)')
    .eq('custom_domain', domain)
    .single()
  return { data, error }
}

// Booking functions
export type Booking = Database['public']['Tables']['bookings']['Row']

export async function getBookings(propertyId: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('property_id', propertyId)
    .order('check_in', { ascending: true })
  return { data, error }
}

export async function updateBooking(bookingId: string, updates: Partial<Booking>) {
  const { data, error } = await supabase
    .from('bookings')
    .update(updates)
    .eq('id', bookingId)
    .select()
    .single()
  return { data, error }
}

export async function createBooking(bookingData: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([{
      ...bookingData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single()
  return { data, error }
}

// Blocked Dates functions
export type BlockedDate = Database['public']['Tables']['blocked_dates']['Row']

export async function createBlockedDates(blockedDateData: Omit<BlockedDate, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('blocked_dates')
    .insert([{
      ...blockedDateData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single()
  return { data, error }
}
