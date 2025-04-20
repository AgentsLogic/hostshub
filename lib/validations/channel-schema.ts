import * as z from "zod"

// Validation schema for channel connection
export const channelConnectionSchema = z.object({
  id: z.string().optional(),
  propertyId: z.string().min(1, "Property is required"),
  channelType: z.enum(["airbnb", "vrbo", "booking", "expedia", "tripadvisor", "other"], {
    required_error: "Channel type is required",
  }),
  accountId: z.string().min(1, "Account ID is required"),
  listingId: z.string().min(1, "Listing ID is required"),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  active: z.boolean().optional(),
  lastSynced: z.date().optional(),
  syncSettings: z
    .object({
      syncAvailability: z.boolean().optional(),
      syncPricing: z.boolean().optional(),
      syncBookings: z.boolean().optional(),
      syncContent: z.boolean().optional(),
      autoAcceptBookings: z.boolean().optional(),
    })
    .optional(),
})

// Schema for channel sync settings
export const channelSyncSettingsSchema = z.object({
  id: z.string().optional(),
  propertyId: z.string().min(1, "Property is required"),
  syncFrequency: z.enum(["realtime", "hourly", "daily", "manual"], {
    required_error: "Sync frequency is required",
  }),
  syncAvailability: z.boolean().optional(),
  syncPricing: z.boolean().optional(),
  syncBookings: z.boolean().optional(),
  syncContent: z.boolean().optional(),
  autoAcceptBookings: z.boolean().optional(),
  notifyOnSync: z.boolean().optional(),
  notifyOnError: z.boolean().optional(),
})

export type ChannelConnectionFormValues = z.infer<typeof channelConnectionSchema>
export type ChannelSyncSettingsFormValues = z.infer<typeof channelSyncSettingsSchema>

