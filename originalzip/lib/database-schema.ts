/**
 * Database Schema for HostsHub - Airbnb Property Management Platform
 *
 * This file defines the TypeScript types that correspond to our Supabase database tables.
 * It serves as documentation for the database schema and provides type safety for our application.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

// User profile information
export interface Profile {
  id: string // UUID from auth.users
  email: string
  full_name: string
  avatar_url?: string
  phone_number?: string
  company_name?: string
  created_at: string
  updated_at: string
}

// Property information
export interface Property {
  id: string // UUID
  owner_id: string // References profiles.id
  name: string
  description: string
  address: string
  city: string
  state: string
  zip_code: string
  country: string
  property_type: string // apartment, house, villa, etc.
  bedrooms: number
  bathrooms: number
  max_guests: number
  amenities: string[] // Array of amenity strings
  images: string[] // Array of image URLs
  base_price: number
  cleaning_fee: number
  service_fee: number
  tax_rate: number
  min_nights: number
  max_nights: number
  check_in_time: string // HH:MM format
  check_out_time: string // HH:MM format
  house_rules: string
  cancellation_policy: string // flexible, moderate, strict, custom
  status: "active" | "inactive" | "maintenance"
  created_at: string
  updated_at: string
}

// Channel information (Airbnb, VRBO, Booking.com, etc.)
export interface Channel {
  id: string // UUID
  name: string // Airbnb, VRBO, Booking.com, etc.
  logo_url: string
  api_key?: string
  api_secret?: string
  user_id?: string // Channel-specific user ID
  status: "connected" | "disconnected" | "error"
  last_sync: string | null
  created_at: string
  updated_at: string
}

// Property-Channel mapping
export interface PropertyChannel {
  id: string // UUID
  property_id: string // References properties.id
  channel_id: string // References channels.id
  external_id: string // ID of the property on the external channel
  external_url: string // URL to the property on the external channel
  sync_calendar: boolean
  sync_pricing: boolean
  sync_availability: boolean
  sync_details: boolean
  status: "active" | "inactive" | "error"
  last_sync: string | null
  created_at: string
  updated_at: string
}

// Guest information
export interface Guest {
  id: string // UUID
  first_name: string
  last_name: string
  email: string
  phone: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  country?: string
  notes?: string
  created_at: string
  updated_at: string
}

// Booking information
export interface Booking {
  id: string // UUID
  property_id: string // References properties.id
  guest_id: string // References guests.id
  channel_id: string | null // References channels.id, null for direct bookings
  external_id?: string // Booking ID on the external channel
  check_in: string // YYYY-MM-DD
  check_out: string // YYYY-MM-DD
  adults: number
  children: number
  infants: number
  total_price: number
  base_price: number
  cleaning_fee: number
  service_fee: number
  taxes: number
  status: "inquiry" | "pending" | "confirmed" | "cancelled" | "completed"
  payment_status: "pending" | "partial" | "paid" | "refunded"
  special_requests?: string
  is_business_trip: boolean
  created_at: string
  updated_at: string
}

// Blocked dates (for maintenance, owner stays, etc.)
export interface BlockedDate {
  id: string // UUID
  property_id: string // References properties.id
  start_date: string // YYYY-MM-DD
  end_date: string // YYYY-MM-DD
  reason: string
  notes?: string
  created_at: string
  updated_at: string
}

// Custom pricing for specific dates
export interface CustomPricing {
  id: string // UUID
  property_id: string // References properties.id
  start_date: string // YYYY-MM-DD
  end_date: string // YYYY-MM-DD
  price: number
  min_nights?: number
  created_at: string
  updated_at: string
}

// Sync logs for tracking channel synchronization
export interface SyncLog {
  id: string // UUID
  property_id: string | null // References properties.id
  channel_id: string // References channels.id
  sync_type: "calendar" | "pricing" | "availability" | "details" | "bookings"
  status: "success" | "error" | "warning"
  message: string
  details?: Json
  created_at: string
}

// User settings for the platform
export interface UserSettings {
  id: string // UUID
  user_id: string // References profiles.id
  default_currency: string
  timezone: string
  email_notifications: boolean
  sms_notifications: boolean
  language: string
  created_at: string
  updated_at: string
}

// Booking workflow settings
export interface BookingWorkflowSettings {
  id: string // UUID
  user_id: string // References profiles.id
  instant_booking: boolean
  require_approval: boolean
  min_advance_booking_days: number
  max_advance_booking_days: number
  min_nights: number
  max_nights: number
  allow_same_day_booking: boolean
  allow_partial_payment: boolean
  deposit_percentage: number
  send_booking_confirmation: boolean
  send_payment_confirmation: boolean
  send_check_in_instructions: boolean
  send_pre_arrival_reminder: boolean
  pre_arrival_reminder_days: number
  send_post_stay_thank_you: boolean
  send_review_request: boolean
  review_request_days: number
  cancellation_policy: "flexible" | "moderate" | "strict" | "custom"
  full_refund_days: number
  partial_refund_days: number
  partial_refund_percentage: number
  created_at: string
  updated_at: string
}

// Channel sync settings
export interface ChannelSyncSettings {
  id: string // UUID
  user_id: string // References profiles.id
  auto_sync: boolean
  sync_frequency: number // in minutes
  sync_calendar: boolean
  sync_rates: boolean
  sync_availability: boolean
  sync_bookings: boolean
  sync_property_details: boolean
  notify_on_error: boolean
  retry_on_error: boolean
  max_retries: number
  created_at: string
  updated_at: string
}

// Messages between hosts and guests
export interface Message {
  id: string // UUID
  booking_id: string // References bookings.id
  sender_id: string // References profiles.id or guests.id
  sender_type: "host" | "guest"
  content: string
  read: boolean
  created_at: string
}

// Financial transactions
export interface Transaction {
  id: string // UUID
  booking_id: string // References bookings.id
  amount: number
  type: "payment" | "refund" | "payout"
  status: "pending" | "completed" | "failed"
  payment_method?: string
  transaction_id?: string
  notes?: string
  created_at: string
}

// Reviews from guests
export interface Review {
  id: string // UUID
  booking_id: string // References bookings.id
  property_id: string // References properties.id
  guest_id: string // References guests.id
  rating: number // 1-5
  content: string
  response?: string
  created_at: string
  updated_at: string
}

