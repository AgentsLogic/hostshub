# HostsHub Database Schema Diagram

## Core Entities

### profiles
- id (PK, UUID) - References auth.users(id)
- email (TEXT, NOT NULL, UNIQUE)
- full_name (TEXT, NOT NULL)
- avatar_url (TEXT)
- phone_number (TEXT)
- company_name (TEXT)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### properties
- id (PK, UUID)
- owner_id (FK, UUID) - References profiles(id)
- name (TEXT, NOT NULL)
- description (TEXT, NOT NULL)
- address (TEXT, NOT NULL)
- city (TEXT, NOT NULL)
- state (TEXT, NOT NULL)
- zip_code (TEXT, NOT NULL)
- country (TEXT, NOT NULL)
- property_type (TEXT, NOT NULL)
- bedrooms (INTEGER, NOT NULL)
- bathrooms (NUMERIC, NOT NULL)
- max_guests (INTEGER, NOT NULL)
- amenities (TEXT[], NOT NULL)
- images (TEXT[], NOT NULL)
- base_price (NUMERIC, NOT NULL)
- cleaning_fee (NUMERIC, NOT NULL)
- service_fee (NUMERIC, NOT NULL)
- tax_rate (NUMERIC, NOT NULL)
- min_nights (INTEGER, NOT NULL)
- max_nights (INTEGER, NOT NULL)
- check_in_time (TEXT, NOT NULL)
- check_out_time (TEXT, NOT NULL)
- house_rules (TEXT, NOT NULL)
- cancellation_policy (TEXT, NOT NULL)
- status (TEXT, NOT NULL) - 'active', 'inactive', 'maintenance'
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### channels
- id (PK, UUID)
- name (TEXT, NOT NULL)
- logo_url (TEXT, NOT NULL)
- api_key (TEXT)
- api_secret (TEXT)
- user_id (TEXT)
- status (TEXT, NOT NULL) - 'connected', 'disconnected', 'error'
- last_sync (TIMESTAMPTZ)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### property_channels
- id (PK, UUID)
- property_id (FK, UUID) - References properties(id)
- channel_id (FK, UUID) - References channels(id)
- external_id (TEXT, NOT NULL)
- external_url (TEXT, NOT NULL)
- sync_calendar (BOOLEAN, NOT NULL)
- sync_pricing (BOOLEAN, NOT NULL)
- sync_availability (BOOLEAN, NOT NULL)
- sync_details (BOOLEAN, NOT NULL)
- status (TEXT, NOT NULL) - 'active', 'inactive', 'error'
- last_sync (TIMESTAMPTZ)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### guests
- id (PK, UUID)
- first_name (TEXT, NOT NULL)
- last_name (TEXT, NOT NULL)
- email (TEXT, NOT NULL)
- phone (TEXT, NOT NULL)
- address (TEXT)
- city (TEXT)
- state (TEXT)
- zip_code (TEXT)
- country (TEXT)
- notes (TEXT)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

## Booking Management

### bookings
- id (PK, UUID)
- property_id (FK, UUID) - References properties(id)
- guest_id (FK, UUID) - References guests(id)
- channel_id (FK, UUID) - References channels(id)
- external_id (TEXT)
- check_in (DATE, NOT NULL)
- check_out (DATE, NOT NULL)
- adults (INTEGER, NOT NULL)
- children (INTEGER, NOT NULL)
- infants (INTEGER, NOT NULL)
- total_price (NUMERIC, NOT NULL)
- base_price (NUMERIC, NOT NULL)
- cleaning_fee (NUMERIC, NOT NULL)
- service_fee (NUMERIC, NOT NULL)
- taxes (NUMERIC, NOT NULL)
- status (TEXT, NOT NULL) - 'inquiry', 'pending', 'confirmed', 'cancelled', 'completed'
- payment_status (TEXT, NOT NULL) - 'pending', 'partial', 'paid', 'refunded'
- special_requests (TEXT)
- is_business_trip (BOOLEAN, NOT NULL)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### blocked_dates
- id (PK, UUID)
- property_id (FK, UUID) - References properties(id)
- start_date (DATE, NOT NULL)
- end_date (DATE, NOT NULL)
- reason (TEXT, NOT NULL)
- notes (TEXT)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### custom_pricing
- id (PK, UUID)
- property_id (FK, UUID) - References properties(id)
- start_date (DATE, NOT NULL)
- end_date (DATE, NOT NULL)
- price (NUMERIC, NOT NULL)
- min_nights (INTEGER)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

## Synchronization

### sync_logs
- id (PK, UUID)
- property_id (FK, UUID) - References properties(id)
- channel_id (FK, UUID) - References channels(id)
- sync_type (TEXT, NOT NULL) - 'calendar', 'pricing', 'availability', 'details', 'bookings'
- status (TEXT, NOT NULL) - 'success', 'error', 'warning'
- message (TEXT, NOT NULL)
- details (JSONB)
- created_at (TIMESTAMPTZ, NOT NULL)

## Settings

### user_settings
- id (PK, UUID)
- user_id (FK, UUID) - References profiles(id)
- default_currency (TEXT, NOT NULL)
- timezone (TEXT, NOT NULL)
- email_notifications (BOOLEAN, NOT NULL)
- sms_notifications (BOOLEAN, NOT NULL)
- language (TEXT, NOT NULL)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### booking_workflow_settings
- id (PK, UUID)
- user_id (FK, UUID) - References profiles(id)
- instant_booking (BOOLEAN, NOT NULL)
- require_approval (BOOLEAN, NOT NULL)
- min_advance_booking_days (INTEGER, NOT NULL)
- max_advance_booking_days (INTEGER, NOT NULL)
- min_nights (INTEGER, NOT NULL)
- max_nights (INTEGER, NOT NULL)
- allow_same_day_booking (BOOLEAN, NOT NULL)
- allow_partial_payment (BOOLEAN, NOT NULL)
- deposit_percentage (INTEGER, NOT NULL)
- send_booking_confirmation (BOOLEAN, NOT NULL)
- send_payment_confirmation (BOOLEAN, NOT NULL)
- send_check_in_instructions (BOOLEAN, NOT NULL)
- send_pre_arrival_reminder (BOOLEAN, NOT NULL)
- pre_arrival_reminder_days (INTEGER, NOT NULL)
- send_post_stay_thank_you (BOOLEAN, NOT NULL)
- send_review_request (BOOLEAN, NOT NULL)
- review_request_days (INTEGER, NOT NULL)
- cancellation_policy (TEXT, NOT NULL) - 'flexible', 'moderate', 'strict', 'custom'
- full_refund_days (INTEGER, NOT NULL)
- partial_refund_days (INTEGER, NOT NULL)
- partial_refund_percentage (INTEGER, NOT NULL)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

### channel_sync_settings
- id (PK, UUID)
- user_id (FK, UUID) - References profiles(id)
- auto_sync (BOOLEAN, NOT NULL)
- sync_frequency (INTEGER, NOT NULL)
- sync_calendar (BOOLEAN, NOT NULL)
- sync_rates (BOOLEAN, NOT NULL)
- sync_availability (BOOLEAN, NOT NULL)
- sync_bookings (BOOLEAN, NOT NULL)
- sync_property_details (BOOLEAN, NOT NULL)
- notify_on_error (BOOLEAN, NOT NULL)
- retry_on_error (BOOLEAN, NOT NULL)
- max_retries (INTEGER, NOT NULL)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

## Communication and Transactions

### messages
- id (PK, UUID)
- booking_id (FK, UUID) - References bookings(id)
- sender_id (UUID, NOT NULL)
- sender_type (TEXT, NOT NULL) - 'host', 'guest'
- content (TEXT, NOT NULL)
- read (BOOLEAN, NOT NULL)
- created_at (TIMESTAMPTZ, NOT NULL)

### transactions
- id (PK, UUID)
- booking_id (FK, UUID) - References bookings(id)
- amount (NUMERIC, NOT NULL)
- type (TEXT, NOT NULL) - 'payment', 'refund', 'payout'
- status (TEXT, NOT NULL) - 'pending', 'completed', 'failed'
- payment_method (TEXT)
- transaction_id (TEXT)
- notes (TEXT)
- created_at (TIMESTAMPTZ, NOT NULL)

### reviews
- id (PK, UUID)
- booking_id (FK, UUID) - References bookings(id)
- property_id (FK, UUID) - References properties(id)
- guest_id (FK, UUID) - References guests(id)
- rating (INTEGER, NOT NULL) - 1-5
- content (TEXT, NOT NULL)
- response (TEXT)
- created_at (TIMESTAMPTZ, NOT NULL)
- updated_at (TIMESTAMPTZ, NOT NULL)

