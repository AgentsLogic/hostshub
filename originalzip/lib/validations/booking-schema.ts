import * as z from "zod"

// Validation schema for guest information
export const guestSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
})

// Validation schema for booking
export const bookingSchema = z.object({
  id: z.string().optional(),
  propertyId: z.string().min(1, "Property is required"),
  checkIn: z.date({
    required_error: "Check-in date is required",
  }),
  checkOut: z
    .date({
      required_error: "Check-out date is required",
    })
    .refine((date) => date > new Date(), {
      message: "Check-out date must be in the future",
    }),
  guests: z.number().min(1, "At least 1 guest is required"),
  adults: z.number().min(1, "At least 1 adult is required"),
  children: z.number().min(0, "Children cannot be negative"),
  infants: z.number().min(0, "Infants cannot be negative"),
  pets: z.number().min(0, "Pets cannot be negative"),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]).optional(),
  totalPrice: z.number().min(0, "Total price cannot be negative"),
  paymentStatus: z.enum(["pending", "partial", "paid"]).optional(),
  source: z.enum(["direct", "airbnb", "vrbo", "booking", "other"]).optional(),
  notes: z.string().optional(),
  guestInfo: guestSchema,
})

// Schema for booking search/filter
export const bookingFilterSchema = z.object({
  propertyId: z.string().optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  status: z.enum(["all", "pending", "confirmed", "cancelled", "completed"]).optional(),
  source: z.enum(["all", "direct", "airbnb", "vrbo", "booking", "other"]).optional(),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
export type BookingFilterValues = z.infer<typeof bookingFilterSchema>

