import * as z from "zod"

// Validation schema for property address
export const propertyAddressSchema = z.object({
  street: z.string().min(1, "Street address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State/Province is required"),
  zipCode: z.string().min(1, "Postal/Zip code is required"),
  country: z.string().min(1, "Country is required"),
})

// Validation schema for property amenities
export const propertyAmenitiesSchema = z.object({
  wifi: z.boolean().optional(),
  kitchen: z.boolean().optional(),
  washer: z.boolean().optional(),
  dryer: z.boolean().optional(),
  ac: z.boolean().optional(),
  heating: z.boolean().optional(),
  workspace: z.boolean().optional(),
  tv: z.boolean().optional(),
  hairDryer: z.boolean().optional(),
  iron: z.boolean().optional(),
  pool: z.boolean().optional(),
  hotTub: z.boolean().optional(),
  freeParking: z.boolean().optional(),
  gym: z.boolean().optional(),
  bbqGrill: z.boolean().optional(),
  fireplace: z.boolean().optional(),
  jacuzzi: z.boolean().optional(),
  balcony: z.boolean().optional(),
  backyard: z.boolean().optional(),
  outdoorDiningArea: z.boolean().optional(),
})

// Validation schema for property details
export const propertyDetailsSchema = z.object({
  type: z.enum(["apartment", "house", "condo", "villa", "cabin", "other"], {
    required_error: "Property type is required",
  }),
  bedrooms: z.number().min(0, "Bedrooms must be 0 or more"),
  beds: z.number().min(1, "At least 1 bed is required"),
  bathrooms: z
    .number()
    .min(0.5, "Bathrooms must be 0.5 or more")
    .multipleOf(0.5, "Bathrooms must be in 0.5 increments"),
  maxGuests: z.number().min(1, "At least 1 guest must be accommodated"),
  squareFeet: z.number().optional(),
})

// Main property validation schema
export const propertySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Property name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  address: propertyAddressSchema,
  details: propertyDetailsSchema,
  amenities: propertyAmenitiesSchema.optional(),
  basePrice: z.number().min(1, "Base price must be greater than 0"),
  cleaningFee: z.number().min(0, "Cleaning fee cannot be negative"),
  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL"),
        alt: z.string().optional(),
      }),
    )
    .min(1, "At least one image is required"),
  published: z.boolean().optional(),
})

// Schema for property search/filter
export const propertyFilterSchema = z.object({
  search: z.string().optional(),
  type: z.enum(["apartment", "house", "condo", "villa", "cabin", "other", "all"]).optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  amenities: z.array(z.string()).optional(),
})

export type PropertyFormValues = z.infer<typeof propertySchema>
export type PropertyFilterValues = z.infer<typeof propertyFilterSchema>

