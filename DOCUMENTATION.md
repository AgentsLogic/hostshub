# HostsHub.ai — Project Documentation

---

## Overview
HostsHub.ai is a **Next.js 15** + **React 19** web application for property management and multi-channel integration, leveraging **Supabase** as the backend. It features dashboards for bookings, guests, pricing, marketing, team management, and synchronization with platforms like Airbnb and VRBO.

---

## 1. Tech Stack
- **Framework:** Next.js 15 (App Router, server actions enabled)
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom themes, dark mode, animations
- **UI Libraries:** Radix UI, Lucide Icons, Embla Carousel, React Hook Form, TanStack Table, Chart.js
- **Backend:** Supabase (auth, database, storage)
- **Validation:** Zod
- **State/Context:** React Context API
- **Other:** Next Themes, Sonner (notifications), UUID, date-fns

---

## 2. Environment Variables
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase public anon key

---

## 3. Next.js Configuration
- **Strict Mode:** Enabled
- **Images:** Allows all HTTPS sources + localhost, SVGs allowed
- **Experimental:** Server Actions enabled

---

## 4. Tailwind CSS
- **Dark Mode:** Class-based
- **Content Paths:** `app/`, `components/`, `pages/`, `src/`
- **Theme:**
  - Dynamic colors via CSS variables
  - Airbnb brand palette
  - Accent red
  - Custom border radius
  - Accordion animations
- **Plugins:** `tailwindcss-animate`

---

## 5. Database Schema (Supabase/Postgres)

### Core Entities
- **profiles:** User profiles linked to Supabase Auth
- **properties:** Rental properties with details, amenities, pricing
- **channels:** External platforms (Airbnb, VRBO, etc.)
- **property_channels:** Mapping properties to channels
- **guests:** Guest information

### Booking Management
- **bookings:** Reservations linked to properties, guests, channels
- **blocked_dates:** Unavailable dates for properties
- **custom_pricing:** Special pricing rules

### Synchronization
- **sync_logs:** Logs of sync operations
- **channel_sync_settings:** User preferences for sync behavior

### Settings
- **user_settings:** User preferences (currency, timezone, notifications)
- **booking_workflow_settings:** Booking rules, policies, notifications

### Communication & Transactions
- **messages:** Guest-host communication
- **transactions:** Payments, refunds, payouts
- **reviews:** Guest reviews and host responses

---

## 6. Project Structure

### Pages (`app/`)
- **Landing:** `/app/page.tsx`
- **Auth:** `/app/auth/login/`, `/app/auth/callback/`
- **Dashboard:** `/app/dashboard/`
  - **Analytics:** `/analytics/`
  - **Bookings:** `/bookings/`
  - **Calendar:** `/calendar/`
  - **Channel Manager:** `/channel-manager/` (Airbnb, VRBO, property mapping, sync history)
  - **Communications:** `/communications/`
  - **Documents:** `/documents/`
  - **Dynamic Pricing:** `/dynamic-pricing/`
  - **Guests:** `/guests/`
  - **Maintenance:** `/maintenance/`
  - **Marketing:** `/marketing/`
  - **Pricing:** `/pricing/`
  - **Properties:** `/properties/`
  - **Smart Insights:** `/smart-insights/`
  - **Team:** `/team/`
- **Help:** `/help/`
- **Careers:** `/careers/`
- **Beautiful Websites:** `/beautiful-websites/`
- **Settings:** `/settings/`
- **Templates:** `/templates/`

### Components (`components/`)
- **UI Elements:** Buttons, forms, dialogs, icons, sidebar, headers, footers
- **Channels:** Channel analytics, property mapping UI, sync history, connection settings, pricing settings, availability, advanced settings, booking conflict resolution, calendar view
- **Communications:** Message list, compose message, thread list, communications panel
- **Notifications:** Notification center, notification item
- **Properties:** Property card, properties grid
- **Templates:** Templates grid
- **White Label:** Header, footer
- **Auth:** Login form
- **Dashboard:** Dashboard header
- **Client Layout:** Client-side layout wrapper
- **UI:** Date range picker, toast provider, theme switch, user avatar, user menu

### Contexts (`contexts/`)
- **Auth Context:** Authentication state
- **Mock Auth Context:** For development/testing
- **Notification Context:** Global notifications
- **White Label Context:** Branding customization

### Hooks (`hooks/`)
- `useBookings`, `useGuests`, `useProperties`, `useProperty`, `useChannels`, `useSync`, `useToast`, `useBlockedDates`, `useMobile`

### Libraries (`lib/`)
- **supabase.ts / supabase-server.ts:** Supabase client setup
- **notification-service.ts:** Notification logic
- **image-optimization.ts:** Image handling
- **types.ts:** Shared TypeScript types
- **database.types.ts:** Supabase-generated types
- **utils.ts:** Utility functions

---

## 7. Features

- **Multi-channel management:** Connect Airbnb, VRBO, and more
- **Property management:** CRUD for properties, amenities, pricing, images
- **Booking system:** Manage reservations, blocked dates, custom pricing
- **Guest management:** View and edit guest info
- **Messaging:** Host-guest communication
- **Dynamic pricing:** Adjust rates based on rules
- **Calendar sync:** Keep availability up-to-date
- **Team collaboration:** Manage team members
- **Marketing tools:** Promote listings
- **Analytics & insights:** Visualize performance
- **White-labeling:** Custom branding support
- **Responsive design:** Mobile-friendly UI
- **Dark mode:** User theme preference

---

## 8. Security & Best Practices

- **Supabase Auth:** User authentication and authorization
- **Environment variables:** Secrets managed via `.env.local`
- **Strict mode:** React strict mode enabled
- **Server actions:** Experimental Next.js feature for server-side logic
- **SVG handling:** `dangerouslyAllowSVG` enabled, ensure trusted sources
- **Validation:** Zod schemas for data validation
- **Form handling:** React Hook Form with resolvers

---

## 9. Deployment & Scripts

- **Development:** `npm run dev`
- **Build:** `npm run build`
- **Start:** `npm run start`
- **Lint:** `npm run lint`
- **Hosting:** Likely Vercel or similar (vercel.json present)

---

## 10. Additional Notes

- **Middleware:** Present, likely for auth or redirects
- **API Routes:** Under `/app/api/` (not yet reviewed)
- **Testing:** No explicit test setup found
- **Monorepo:** Contains `originalzip/` with similar structure, possibly a backup or template

---

# End of Documentation
