export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          phone_number: string | null
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name: string
          avatar_url?: string | null
          phone_number?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          avatar_url?: string | null
          phone_number?: string | null
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      properties: {
        Row: {
          id: string
          owner_id: string
          name: string
          description: string
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          property_type: string
          bedrooms: number
          bathrooms: number
          max_guests: number
          amenities: string[]
          images: string[]
          base_price: number
          cleaning_fee: number
          service_fee: number
          tax_rate: number
          min_nights: number
          max_nights: number
          check_in_time: string
          check_out_time: string
          house_rules: string
          cancellation_policy: string
          status: "active" | "inactive" | "maintenance"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          owner_id: string
          name: string
          description: string
          address: string
          city: string
          state: string
          zip_code: string
          country: string
          property_type: string
          bedrooms: number
          bathrooms: number
          max_guests: number
          amenities: string[]
          images: string[]
          base_price: number
          cleaning_fee: number
          service_fee: number
          tax_rate: number
          min_nights: number
          max_nights: number
          check_in_time: string
          check_out_time: string
          house_rules: string
          cancellation_policy: string
          status?: "active" | "inactive" | "maintenance"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          owner_id?: string
          name?: string
          description?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          country?: string
          property_type?: string
          bedrooms?: number
          bathrooms?: number
          max_guests?: number
          amenities?: string[]
          images?: string[]
          base_price?: number
          cleaning_fee?: number
          service_fee?: number
          tax_rate?: number
          min_nights?: number
          max_nights?: number
          check_in_time?: string
          check_out_time?: string
          house_rules?: string
          cancellation_policy?: string
          status?: "active" | "inactive" | "maintenance"
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "properties_owner_id_fkey"
            columns: ["owner_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      channels: {
        Row: {
          id: string
          name: string
          logo_url: string
          api_key: string | null
          api_secret: string | null
          user_id: string | null
          status: "connected" | "disconnected" | "error"
          last_sync: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          logo_url: string
          api_key?: string | null
          api_secret?: string | null
          user_id?: string | null
          status?: "connected" | "disconnected" | "error"
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string
          api_key?: string | null
          api_secret?: string | null
          user_id?: string | null
          status?: "connected" | "disconnected" | "error"
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      property_channels: {
        Row: {
          id: string
          property_id: string
          channel_id: string
          external_id: string
          external_url: string
          sync_calendar: boolean
          sync_pricing: boolean
          sync_availability: boolean
          sync_details: boolean
          status: "active" | "inactive" | "error"
          last_sync: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          channel_id: string
          external_id: string
          external_url: string
          sync_calendar?: boolean
          sync_pricing?: boolean
          sync_availability?: boolean
          sync_details?: boolean
          status?: "active" | "inactive" | "error"
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          channel_id?: string
          external_id?: string
          external_url?: string
          sync_calendar?: boolean
          sync_pricing?: boolean
          sync_availability?: boolean
          sync_details?: boolean
          status?: "active" | "inactive" | "error"
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "property_channels_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "property_channels_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      guests: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address: string | null
          city: string | null
          state: string | null
          zip_code: string | null
          country: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          phone: string
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string
          address?: string | null
          city?: string | null
          state?: string | null
          zip_code?: string | null
          country?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          id: string
          property_id: string
          guest_id: string
          channel_id: string | null
          external_id: string | null
          check_in: string
          check_out: string
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
          special_requests: string | null
          is_business_trip: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          guest_id: string
          channel_id?: string | null
          external_id?: string | null
          check_in: string
          check_out: string
          adults: number
          children: number
          infants: number
          total_price: number
          base_price: number
          cleaning_fee: number
          service_fee: number
          taxes: number
          status?: "inquiry" | "pending" | "confirmed" | "cancelled" | "completed"
          payment_status?: "pending" | "partial" | "paid" | "refunded"
          special_requests?: string | null
          is_business_trip?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          guest_id?: string
          channel_id?: string | null
          external_id?: string | null
          check_in?: string
          check_out?: string
          adults?: number
          children?: number
          infants?: number
          total_price?: number
          base_price?: number
          cleaning_fee?: number
          service_fee?: number
          taxes?: number
          status?: "inquiry" | "pending" | "confirmed" | "cancelled" | "completed"
          payment_status?: "pending" | "partial" | "paid" | "refunded"
          special_requests?: string | null
          is_business_trip?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["guest_id"]
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      blocked_dates: {
        Row: {
          id: string
          property_id: string
          start_date: string
          end_date: string
          reason: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          start_date: string
          end_date: string
          reason: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          start_date?: string
          end_date?: string
          reason?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "blocked_dates_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      custom_pricing: {
        Row: {
          id: string
          property_id: string
          start_date: string
          end_date: string
          price: number
          min_nights: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          property_id: string
          start_date: string
          end_date: string
          price: number
          min_nights?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          property_id?: string
          start_date?: string
          end_date?: string
          price?: number
          min_nights?: number | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "custom_pricing_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      sync_logs: {
        Row: {
          id: string
          property_id: string | null
          channel_id: string
          sync_type: "calendar" | "pricing" | "availability" | "details" | "bookings"
          status: "success" | "error" | "warning"
          message: string
          details: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          property_id?: string | null
          channel_id: string
          sync_type: "calendar" | "pricing" | "availability" | "details" | "bookings"
          status: "success" | "error" | "warning"
          message: string
          details?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          property_id?: string | null
          channel_id?: string
          sync_type?: "calendar" | "pricing" | "availability" | "details" | "bookings"
          status?: "success" | "error" | "warning"
          message?: string
          details?: Json | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "sync_logs_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sync_logs_channel_id_fkey"
            columns: ["channel_id"]
            referencedRelation: "channels"
            referencedColumns: ["id"]
          },
        ]
      }
      user_settings: {
        Row: {
          id: string
          user_id: string
          default_currency: string
          timezone: string
          email_notifications: boolean
          sms_notifications: boolean
          language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          default_currency: string
          timezone: string
          email_notifications: boolean
          sms_notifications: boolean
          language: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          default_currency?: string
          timezone?: string
          email_notifications?: boolean
          sms_notifications?: boolean
          language?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      booking_workflow_settings: {
        Row: {
          id: string
          user_id: string
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
        Insert: {
          id?: string
          user_id: string
          instant_booking?: boolean
          require_approval?: boolean
          min_advance_booking_days?: number
          max_advance_booking_days?: number
          min_nights?: number
          max_nights?: number
          allow_same_day_booking?: boolean
          allow_partial_payment?: boolean
          deposit_percentage?: number
          send_booking_confirmation?: boolean
          send_payment_confirmation?: boolean
          send_check_in_instructions?: boolean
          send_pre_arrival_reminder?: boolean
          pre_arrival_reminder_days?: number
          send_post_stay_thank_you?: boolean
          send_review_request?: boolean
          review_request_days?: number
          cancellation_policy?: "flexible" | "moderate" | "strict" | "custom"
          full_refund_days?: number
          partial_refund_days?: number
          partial_refund_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          instant_booking?: boolean
          require_approval?: boolean
          min_advance_booking_days?: number
          max_advance_booking_days?: number
          min_nights?: number
          max_nights?: number
          allow_same_day_booking?: boolean
          allow_partial_payment?: boolean
          deposit_percentage?: number
          send_booking_confirmation?: boolean
          send_payment_confirmation?: boolean
          send_check_in_instructions?: boolean
          send_pre_arrival_reminder?: boolean
          pre_arrival_reminder_days?: number
          send_post_stay_thank_you?: boolean
          send_review_request?: boolean
          review_request_days?: number
          cancellation_policy?: "flexible" | "moderate" | "strict" | "custom"
          full_refund_days?: number
          partial_refund_days?: number
          partial_refund_percentage?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "booking_workflow_settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      channel_sync_settings: {
        Row: {
          id: string
          user_id: string
          auto_sync: boolean
          sync_frequency: number
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
        Insert: {
          id?: string
          user_id: string
          auto_sync?: boolean
          sync_frequency?: number
          sync_calendar?: boolean
          sync_rates?: boolean
          sync_availability?: boolean
          sync_bookings?: boolean
          sync_property_details?: boolean
          notify_on_error?: boolean
          retry_on_error?: boolean
          max_retries?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          auto_sync?: boolean
          sync_frequency?: number
          sync_calendar?: boolean
          sync_rates?: boolean
          sync_availability?: boolean
          sync_bookings?: boolean
          sync_property_details?: boolean
          notify_on_error?: boolean
          retry_on_error?: boolean
          max_retries?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "channel_sync_settings_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          id: string
          booking_id: string
          sender_id: string
          sender_type: "host" | "guest"
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          sender_id: string
          sender_type: "host" | "guest"
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          sender_id?: string
          sender_type?: "host" | "guest"
          content?: string
          read?: boolean
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_booking_id_fkey"
            columns: ["booking_id"]
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          id: string
          booking_id: string
          amount: number
          type: "payment" | "refund" | "payout"
          status: "pending" | "completed" | "failed"
          payment_method: string | null
          transaction_id: string | null
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          amount: number
          type: "payment" | "refund" | "payout"
          status?: "pending" | "completed" | "failed"
          payment_method?: string | null
          transaction_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          amount?: number
          type?: "payment" | "refund" | "payout"
          status?: "pending" | "completed" | "failed"
          payment_method?: string | null
          transaction_id?: string | null
          notes?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_booking_id_fkey"
            columns: ["booking_id"]
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          property_id: string
          guest_id: string
          rating: number
          content: string
          response: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          property_id: string
          guest_id: string
          rating: number
          content: string
          response?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          property_id?: string
          guest_id?: string
          rating?: number
          content?: string
          response?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_booking_id_fkey"
            columns: ["booking_id"]
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_property_id_fkey"
            columns: ["property_id"]
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_guest_id_fkey"
            columns: ["guest_id"]
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export interface Property {
  id: string
  name: string
  description: string
  location: string
  bedrooms: number
  bathrooms: number
  price_per_night: number
  created_at: string
  updated_at: string
  user_id: string
  status: "active" | "inactive" | "pending"
}

export interface PropertyImage {
  id: string
  property_id: string
  url: string
  created_at: string
  updated_at: string
  is_primary: boolean
}

export interface User {
  id: string
  email: string
  full_name: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  property_id: string
  user_id: string
  check_in_date: string
  check_out_date: string
  total_price: number
  status: "confirmed" | "pending" | "cancelled" | "completed"
  created_at: string
  updated_at: string
  guest_count: number
}

export interface Review {
  id: string
  property_id: string
  user_id: string
  booking_id: string
  rating: number
  comment: string
  created_at: string
  updated_at: string
}

