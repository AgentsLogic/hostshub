/**
 * Shared app types for Guests, Bookings, Team, etc.
 */

export interface Guest {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  profile_image_url?: string;
  created_at: string;
  last_active_at?: string;
  total_bookings: number;
  notes?: string;
}

export interface Booking {
  id: string;
  guest_id: string;
  property_id: string;
  check_in: string;
  check_out: string;
  status: "confirmed" | "pending" | "cancelled";
  total_amount: number;
  paid_amount: number;
  created_at: string;
  updated_at: string;
  notes?: string;
}

export interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "manager" | "support" | "viewer";
  status: "active" | "invited" | "disabled";
  invited_at?: string;
  joined_at?: string;
}

export interface DocumentFile {
  id: string;
  name: string;
  url: string;
  type: "id" | "lease" | "contract" | "other";
  uploaded_at: string;
  property_id?: string;
  booking_id?: string;
}

export interface MarketingCampaign {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  channels: string[];
  status: "active" | "scheduled" | "completed";
}

export interface MessageThread {
  id: string;
  guest_id: string;
  channel?: string; // 'airbnb', 'vrbo', 'direct', etc.
  last_message: string;
  last_updated: string;
  unread_count: number;
}

export interface AnalyticsData {
  revenue: number;
  occupancy_rate: number;
  bookings_count: number;
  cancellations_count: number;
  average_daily_rate: number;
  date: string;
}

/** Messaging */

export interface MessageThread {
  id: string;
  guest_id: string;
  last_message: string;
  last_updated: string;
  unread_count: number;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  sender_type: "host" | "guest";
  content: string;
  created_at: string;
  read: boolean;
  attachments?: string[];
}

export interface CreateMessagePayload {
  thread_id?: string;
  guest_id: string;
  content: string;
  attachments?: string[];
}
