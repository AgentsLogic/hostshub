import * as z from "zod"

export const propertyFormSchema = z.object({
  name: z.string().min(3, "Property name must be at least 3 characters"),
  location: z.string().min(3, "Location must be at least 3 characters"),
  description: z.string().optional(),
  bedrooms: z.coerce.number().int().min(0, "Bedrooms must be a positive number"),
  bathrooms: z.coerce.number().min(0, "Bathrooms must be a positive number"),
  price_per_night: z.coerce.number().min(0, "Price must be a positive number"),
  template: z.enum(["modern", "luxury", "rustic"]),
  airbnb_id: z.string().optional(),
  vrbo_id: z.string().optional(),
  custom_domain: z.string().optional(),
  status: z.enum(["draft", "published"]),
})

export type PropertyFormValues = z.infer<typeof propertyFormSchema>

