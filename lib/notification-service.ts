import { NotificationType, NotificationCategory } from "@/contexts/notification-context"

// Interface for notification creation parameters
export interface CreateNotificationParams {
  type: NotificationType
  category: NotificationCategory
  title: string
  message: string
  actionUrl?: string
  actionLabel?: string
  channelId?: string
  channelName?: string
  propertyId?: string
  propertyName?: string
}

// Channel sync notification templates
export function createSyncStartedNotification(channelName: string, channelId: string) {
  return {
    type: "info" as NotificationType,
    category: "sync" as NotificationCategory,
    title: `${channelName} Sync Started`,
    message: `Synchronization with ${channelName} has been initiated.`,
    channelId,
    channelName,
    actionUrl: `/dashboard/channel-manager/${channelId}/settings`,
    actionLabel: "View Channel Settings",
  }
}

export function createSyncCompletedNotification(
  channelName: string, 
  channelId: string, 
  propertiesSynced: number,
  bookingsSynced: number
) {
  return {
    type: "success" as NotificationType,
    category: "sync" as NotificationCategory,
    title: `${channelName} Sync Completed`,
    message: `Successfully synchronized ${propertiesSynced} properties and ${bookingsSynced} bookings with ${channelName}.`,
    channelId,
    channelName,
    actionUrl: `/dashboard/channel-manager/${channelId}/settings`,
    actionLabel: "View Channel Settings",
  }
}

export function createSyncFailedNotification(
  channelName: string, 
  channelId: string, 
  errorMessage: string
) {
  return {
    type: "error" as NotificationType,
    category: "sync" as NotificationCategory,
    title: `${channelName} Sync Failed`,
    message: `Synchronization with ${channelName} failed: ${errorMessage}`,
    channelId,
    channelName,
    actionUrl: `/dashboard/channel-manager/${channelId}/settings`,
    actionLabel: "View Channel Settings",
  }
}

export function createSyncWarningNotification(
  channelName: string, 
  channelId: string, 
  warningMessage: string
) {
  return {
    type: "warning" as NotificationType,
    category: "sync" as NotificationCategory,
    title: `${channelName} Sync Warning`,
    message: `Synchronization with ${channelName} completed with warnings: ${warningMessage}`,
    channelId,
    channelName,
    actionUrl: `/dashboard/channel-manager/${channelId}/settings`,
    actionLabel: "View Channel Settings",
  }
}

// Booking notification templates
export function createNewBookingNotification(
  channelName: string,
  channelId: string,
  propertyName: string,
  propertyId: string,
  guestName: string,
  checkInDate: Date,
  checkOutDate: Date
) {
  const checkInFormatted = checkInDate.toLocaleDateString()
  const checkOutFormatted = checkOutDate.toLocaleDateString()
  
  return {
    type: "success" as NotificationType,
    category: "booking" as NotificationCategory,
    title: `New Booking from ${channelName}`,
    message: `${guestName} booked ${propertyName} from ${checkInFormatted} to ${checkOutFormatted}.`,
    channelId,
    channelName,
    propertyId,
    propertyName,
    actionUrl: `/dashboard/bookings`,
    actionLabel: "View Booking",
  }
}

export function createBookingCancelledNotification(
  channelName: string,
  channelId: string,
  propertyName: string,
  propertyId: string,
  guestName: string,
  checkInDate: Date,
  checkOutDate: Date
) {
  const checkInFormatted = checkInDate.toLocaleDateString()
  const checkOutFormatted = checkOutDate.toLocaleDateString()
  
  return {
    type: "warning" as NotificationType,
    category: "booking" as NotificationCategory,
    title: `Booking Cancelled on ${channelName}`,
    message: `${guestName} cancelled their booking for ${propertyName} from ${checkInFormatted} to ${checkOutFormatted}.`,
    channelId,
    channelName,
    propertyId,
    propertyName,
    actionUrl: `/dashboard/bookings`,
    actionLabel: "View Booking",
  }
}

export function createBookingModifiedNotification(
  channelName: string,
  channelId: string,
  propertyName: string,
  propertyId: string,
  guestName: string,
  oldCheckInDate: Date,
  oldCheckOutDate: Date,
  newCheckInDate: Date,
  newCheckOutDate: Date
) {
  const oldCheckInFormatted = oldCheckInDate.toLocaleDateString()
  const oldCheckOutFormatted = oldCheckOutDate.toLocaleDateString()
  const newCheckInFormatted = newCheckInDate.toLocaleDateString()
  const newCheckOutFormatted = newCheckOutDate.toLocaleDateString()
  
  return {
    type: "info" as NotificationType,
    category: "booking" as NotificationCategory,
    title: `Booking Modified on ${channelName}`,
    message: `${guestName} modified their booking for ${propertyName} from ${oldCheckInFormatted}-${oldCheckOutFormatted} to ${newCheckInFormatted}-${newCheckOutFormatted}.`,
    channelId,
    channelName,
    propertyId,
    propertyName,
    actionUrl: `/dashboard/bookings`,
    actionLabel: "View Booking",
  }
}

// Conflict notification templates
export function createBookingConflictNotification(
  channelName1: string,
  channelId1: string,
  channelName2: string,
  channelId2: string,
  propertyName: string,
  propertyId: string,
  checkInDate: Date,
  checkOutDate: Date
) {
  const checkInFormatted = checkInDate.toLocaleDateString()
  const checkOutFormatted = checkOutDate.toLocaleDateString()
  
  return {
    type: "error" as NotificationType,
    category: "conflict" as NotificationCategory,
    title: `Booking Conflict Detected`,
    message: `Conflicting bookings detected for ${propertyName} from ${checkInFormatted} to ${checkOutFormatted} between ${channelName1} and ${channelName2}.`,
    propertyId,
    propertyName,
    actionUrl: `/dashboard/channel-manager/conflicts`,
    actionLabel: "Resolve Conflict",
  }
}

export function createRateConflictNotification(
  channelName1: string,
  channelId1: string,
  channelName2: string,
  channelId2: string,
  propertyName: string,
  propertyId: string,
  dateRange: string,
  rate1: number,
  rate2: number
) {
  return {
    type: "warning" as NotificationType,
    category: "conflict" as NotificationCategory,
    title: `Rate Discrepancy Detected`,
    message: `Different rates detected for ${propertyName} during ${dateRange}: ${channelName1} ($${rate1}) vs ${channelName2} ($${rate2}).`,
    propertyId,
    propertyName,
    actionUrl: `/dashboard/channel-manager/dynamic-pricing`,
    actionLabel: "Review Pricing",
  }
}

export function createAvailabilityConflictNotification(
  channelName1: string,
  channelId1: string,
  channelName2: string,
  channelId2: string,
  propertyName: string,
  propertyId: string,
  dateRange: string
) {
  return {
    type: "warning" as NotificationType,
    category: "conflict" as NotificationCategory,
    title: `Availability Conflict Detected`,
    message: `Conflicting availability settings detected for ${propertyName} during ${dateRange} between ${channelName1} and ${channelName2}.`,
    propertyId,
    propertyName,
    actionUrl: `/dashboard/channel-manager/availability`,
    actionLabel: "Review Availability",
  }
}

// System notification templates
export function createChannelConnectedNotification(
  channelName: string,
  channelId: string
) {
  return {
    type: "success" as NotificationType,
    category: "system" as NotificationCategory,
    title: `${channelName} Connected`,
    message: `Successfully connected to ${channelName}. You can now sync your properties and bookings.`,
    channelId,
    channelName,
    actionUrl: `/dashboard/channel-manager/${channelId}/settings`,
    actionLabel: "Configure Channel",
  }
}

export function createChannelDisconnectedNotification(
  channelName: string,
  channelId: string
) {
  return {
    type: "warning" as NotificationType,
    category: "system" as NotificationCategory,
    title: `${channelName} Disconnected`,
    message: `Connection to ${channelName} has been terminated. Your properties will no longer sync with this channel.`,
    channelId,
    channelName,
    actionUrl: `/dashboard/channel-manager/${channelId}/settings`,
    actionLabel: "Reconnect Channel",
  }
}

export function createApiErrorNotification(
  channelName: string,
  channelId: string,
  errorMessage: string
) {
  return {
    type: "error" as NotificationType,
    category: "system" as NotificationCategory,
    title: `${channelName} API Error`,
    message: `An error occurred with the ${channelName} API: ${errorMessage}`,
    channelId,
    channelName,
    actionUrl: `/dashboard/channel-manager/${channelId}/settings`,
    actionLabel: "Check API Settings",
  }
}

export function createSystemMaintenanceNotification(
  maintenanceTime: string,
  duration: string
) {
  return {
    type: "info" as NotificationType,
    category: "system" as NotificationCategory,
    title: "Scheduled Maintenance",
    message: `System maintenance scheduled for ${maintenanceTime} (duration: approximately ${duration}). Channel synchronization may be temporarily unavailable.`,
  }
}
