"use client"

import { CardFooter } from "@/components/ui/card"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/app/dashboard/components/dashboard-header"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  RefreshCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Calendar,
  DollarSign,
  Home,
  Settings,
  Clock,
  Loader2,
} from "lucide-react"
import { useSyncLogs } from "@/hooks/use-sync"
import { useSyncSettings } from "@/hooks/use-sync"

export default function ChannelManagerSyncPage() {
  const { toast } = useToast()
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState("all")
  const {
    syncLogs,
    isLoading: syncLogsLoading,
    error: syncLogsError,
    addSyncLog,
  } = useSyncLogs(undefined, selectedProperty !== "all" ? selectedProperty : undefined)
  const {
    syncSettings,
    isLoading: syncSettingsLoading,
    error: syncSettingsError,
    updateSyncSettings,
  } = useSyncSettings()

  const isLoading = syncLogsLoading || syncSettingsLoading
  const error = syncLogsError || syncSettingsError

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "calendar":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "rates":
        return <DollarSign className="h-4 w-4 text-green-500" />
      case "availability":
        return <Clock className="h-4 w-4 text-purple-500" />
      case "bookings":
        return <Calendar className="h-4 w-4 text-orange-500" />
      case "property":
        return <Home className="h-4 w-4 text-gray-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-muted-foreground" />
    }
  }

  const getChannelBadge = (channel: string) => {
    switch (channel) {
      case "Airbnb":
        return <Badge className="bg-[#FF5A5F] text-white">Airbnb</Badge>
      case "VRBO":
        return <Badge className="bg-[#3D67FF] text-white">VRBO</Badge>
      case "Booking.com":
        return <Badge className="bg-[#003580] text-white">Booking.com</Badge>
      default:
        return <Badge variant="outline">{channel}</Badge>
    }
  }

  const handleRefreshSync = () => {
    setIsRefreshing(true)

    // Simulate API call to external channels
    setTimeout(() => {
      // Add a success sync log
      addSyncLog({
        channel_id: "airbnb", // Example channel ID
        property_id: selectedProperty !== "all" ? selectedProperty : null,
        type: "calendar",
        status: "success",
        message: `Successfully synced calendar for Airbnb`,
      }).then(() => {
        setIsRefreshing(false)
        toast({
          title: "Sync Complete",
          description: "All channels have been synchronized successfully.",
        })
      })
    }, 2000)
  }

  const handleSyncSettingsChange = (field: string, value: any) => {
    if (!syncSettings) return

    const updatedSettings = {
      ...syncSettings,
      [field]: value,
    }

    // Remove id, user_id, created_at, and updated_at before updating
    const { id, user_id, created_at, updated_at, ...settingsToUpdate } = updatedSettings

    updateSyncSettings(settingsToUpdate)
  }

  if (isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Channel Synchronization"
          text="Manage and monitor synchronization between your properties and external booking platforms"
        >
          <div className="flex items-center gap-2">
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="beach-villa">Beach Villa</SelectItem>
                <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
                <SelectItem value="city-apartment">City Apartment</SelectItem>
              </SelectContent>
            </Select>
            <Button disabled={true}>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Syncing...
            </Button>
          </div>
        </DashboardHeader>
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </DashboardShell>
    )
  }

  if (error) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Channel Synchronization"
          text="Manage and monitor synchronization between your properties and external booking platforms"
        >
          <div className="flex items-center gap-2">
            <Select value={selectedProperty} onValueChange={setSelectedProperty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select property" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="beach-villa">Beach Villa</SelectItem>
                <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
                <SelectItem value="city-apartment">City Apartment</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleRefreshSync} disabled={isRefreshing}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Sync Now
            </Button>
          </div>
        </DashboardHeader>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Error loading synchronization data</h2>
            <p className="text-muted-foreground">{error.message}</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Channel Synchronization"
        text="Manage and monitor synchronization between your properties and external booking platforms"
      >
        <div className="flex items-center gap-2">
          <Select value={selectedProperty} onValueChange={setSelectedProperty}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Properties</SelectItem>
              <SelectItem value="beach-villa">Beach Villa</SelectItem>
              <SelectItem value="mountain-cabin">Mountain Cabin</SelectItem>
              <SelectItem value="city-apartment">City Apartment</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleRefreshSync} disabled={isRefreshing}>
            {isRefreshing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Syncing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sync Now
              </>
            )}
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Activity
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="mr-2 h-4 w-4" />
            Sync Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync Activity Log</CardTitle>
              <CardDescription>Recent synchronization activity across all channels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {syncLogs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 pb-4 border-b last:border-0">
                    <div className="mt-0.5">{getStatusIcon(log.status)}</div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        {getChannelBadge(log.channel?.name || "Unknown")}
                        <span className="font-medium">{log.property?.name || "All Properties"}</span>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          {getTypeIcon(log.type)}
                          <span>{log.type}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.message}</p>
                      <p className="text-xs text-muted-foreground">{new Date(log.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Synchronization Settings</CardTitle>
              <CardDescription>Configure how your properties synchronize with external platforms</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-sync" className="text-base">
                    Automatic Synchronization
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync your properties with external platforms
                  </p>
                </div>
                <Switch
                  id="auto-sync"
                  checked={syncSettings?.auto_sync || false}
                  onCheckedChange={(checked) => handleSyncSettingsChange("auto_sync", checked)}
                />
              </div>

              {syncSettings?.auto_sync && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="sync-frequency">Sync Frequency (minutes)</Label>
                  <Select
                    value={syncSettings.sync_frequency?.toString() || "15"}
                    onValueChange={(value) => handleSyncSettingsChange("sync_frequency", Number.parseInt(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Every 5 minutes</SelectItem>
                      <SelectItem value="15">Every 15 minutes</SelectItem>
                      <SelectItem value="30">Every 30 minutes</SelectItem>
                      <SelectItem value="60">Every hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">What to Synchronize</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-calendar" className="text-base">
                      Calendar
                    </Label>
                    <p className="text-sm text-muted-foreground">Sync bookings and blocked dates</p>
                  </div>
                  <Switch
                    id="sync-calendar"
                    checked={syncSettings?.sync_calendar || false}
                    onCheckedChange={(checked) => handleSyncSettingsChange("sync_calendar", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-rates" className="text-base">
                      Rates
                    </Label>
                    <p className="text-sm text-muted-foreground">Sync pricing and special offers</p>
                  </div>
                  <Switch
                    id="sync-rates"
                    checked={syncSettings?.sync_rates || false}
                    onCheckedChange={(checked) => handleSyncSettingsChange("sync_rates", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-availability" className="text-base">
                      Availability
                    </Label>
                    <p className="text-sm text-muted-foreground">Sync minimum stay and booking window</p>
                  </div>
                  <Switch
                    id="sync-availability"
                    checked={syncSettings?.sync_availability || false}
                    onCheckedChange={(checked) => handleSyncSettingsChange("sync_availability", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-bookings" className="text-base">
                      Bookings
                    </Label>
                    <p className="text-sm text-muted-foreground">Sync booking details and guest information</p>
                  </div>
                  <Switch
                    id="sync-bookings"
                    checked={syncSettings?.sync_bookings || false}
                    onCheckedChange={(checked) => handleSyncSettingsChange("sync_bookings", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sync-property-details" className="text-base">
                      Property Details
                    </Label>
                    <p className="text-sm text-muted-foreground">Sync property information and photos</p>
                  </div>
                  <Switch
                    id="sync-property-details"
                    checked={syncSettings?.sync_property_details || false}
                    onCheckedChange={(checked) => handleSyncSettingsChange("sync_property_details", checked)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-sm font-medium">Error Handling</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="notify-on-error" className="text-base">
                      Notify on Error
                    </Label>
                    <p className="text-sm text-muted-foreground">Send email notifications when sync fails</p>
                  </div>
                  <Switch
                    id="notify-on-error"
                    checked={syncSettings?.notify_on_error || false}
                    onCheckedChange={(checked) => handleSyncSettingsChange("notify_on_error", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="retry-on-error" className="text-base">
                      Retry on Error
                    </Label>
                    <p className="text-sm text-muted-foreground">Automatically retry failed synchronizations</p>
                  </div>
                  <Switch
                    id="retry-on-error"
                    checked={syncSettings?.retry_on_error || false}
                    onCheckedChange={(checked) => handleSyncSettingsChange("retry_on_error", checked)}
                  />
                </div>

                {syncSettings?.retry_on_error && (
                  <div className="space-y-2 ml-6">
                    <Label htmlFor="max-retries">Maximum Retries</Label>
                    <Input
                      id="max-retries"
                      type="number"
                      value={syncSettings.max_retries || 3}
                      onChange={(e) => handleSyncSettingsChange("max_retries", Number.parseInt(e.target.value))}
                      min="1"
                      max="10"
                      className="w-20"
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  if (!syncSettings) return

                  // Remove id, user_id, created_at, and updated_at before updating
                  const { id, user_id, created_at, updated_at, ...settingsToUpdate } = syncSettings

                  updateSyncSettings(settingsToUpdate).then(() => {
                    toast({
                      title: "Settings Saved",
                      description: "Your synchronization settings have been updated.",
                    })
                  })
                }}
              >
                Save Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

