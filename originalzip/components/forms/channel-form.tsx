"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { channelConnectionSchema, type ChannelConnectionFormValues } from "@/lib/validations/channel-schema"
import { createChannelConnection, updateChannelConnection } from "@/lib/data-access/channels"

interface ChannelFormProps {
  propertyId?: string
  initialData?: ChannelConnectionFormValues
  properties?: { id: string; name: string }[]
  onSuccess?: (channel: any) => void
}

export function ChannelForm({ propertyId, initialData, properties = [], onSuccess }: ChannelFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<ChannelConnectionFormValues>({
    resolver: zodResolver(channelConnectionSchema),
    defaultValues: initialData || {
      propertyId: propertyId || "",
      channelType: "airbnb",
      accountId: "",
      listingId: "",
      apiKey: "",
      apiSecret: "",
      active: true,
      syncSettings: {
        syncAvailability: true,
        syncPricing: true,
        syncBookings: true,
        syncContent: false,
        autoAcceptBookings: false,
      },
    },
  })

  const onSubmit = async (data: ChannelConnectionFormValues) => {
    setIsLoading(true)
    try {
      if (initialData?.id) {
        // Update existing channel connection
        await updateChannelConnection(initialData.id, data)
        toast({
          title: "Channel updated",
          description: "The channel connection has been updated successfully.",
        })
      } else {
        // Create new channel connection
        const newChannel = await createChannelConnection(data)
        toast({
          title: "Channel connected",
          description: "The channel has been connected successfully.",
        })
        if (onSuccess) {
          onSuccess(newChannel)
        } else {
          router.push(`/dashboard/channel-manager`)
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Channel Connection</CardTitle>
            <CardDescription>Connect your property to an external booking channel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {!propertyId && properties.length > 0 && (
              <FormField
                control={form.control}
                name="propertyId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a property" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {properties.map((property) => (
                          <SelectItem key={property.id} value={property.id}>
                            {property.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="channelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Channel Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select channel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="airbnb">Airbnb</SelectItem>
                      <SelectItem value="vrbo">VRBO</SelectItem>
                      <SelectItem value="booking">Booking.com</SelectItem>
                      <SelectItem value="expedia">Expedia</SelectItem>
                      <SelectItem value="tripadvisor">TripAdvisor</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="accountId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Account ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Your account ID on the channel" {...field} />
                  </FormControl>
                  <FormDescription>This is your account identifier on the selected channel.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listingId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing ID</FormLabel>
                  <FormControl>
                    <Input placeholder="Your listing ID on the channel" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the unique identifier for your property on the selected channel.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Key (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="API key for channel access" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormDescription>Required for some channels to enable API access.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiSecret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API Secret (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="API secret for channel access"
                      {...field}
                      value={field.value || ""}
                    />
                  </FormControl>
                  <FormDescription>Required for some channels to enable API access.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Active</FormLabel>
                    <FormDescription>Enable or disable synchronization with this channel.</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-medium">Synchronization Settings</h3>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="syncSettings.syncAvailability"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Sync Availability</FormLabel>
                        <FormDescription>Synchronize calendar availability with this channel.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="syncSettings.syncPricing"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Sync Pricing</FormLabel>
                        <FormDescription>Synchronize pricing information with this channel.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="syncSettings.syncBookings"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Sync Bookings</FormLabel>
                        <FormDescription>Import bookings from this channel.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="syncSettings.syncContent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Sync Content</FormLabel>
                        <FormDescription>Synchronize property details and photos with this channel.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="syncSettings.autoAcceptBookings"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Auto-Accept Bookings</FormLabel>
                        <FormDescription>Automatically accept bookings from this channel.</FormDescription>
                      </div>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : initialData?.id ? "Update Channel" : "Connect Channel"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

