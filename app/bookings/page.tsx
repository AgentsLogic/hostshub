import type { Metadata } from "next"
import { BookingsDashboard } from "@/components/bookings/bookings-dashboard"

export const metadata: Metadata = {
  title: "Bookings",
  description: "Manage your bookings",
}

export default function BookingsPage() {
  return <BookingsDashboard />
}

