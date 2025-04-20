"use client"

import { useState, useEffect } from "react"
import { DashboardShell } from "@/app/dashboard/components/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PropertyMappingUI } from "@/components/channels/property-mapping-ui"
import { DynamicPricingTab } from "@/components/channels/dynamic-pricing-tab"
import { ConnectionSettings } from "@/components/channels/connection-settings"
import { SyncHistory } from "@/components/channels/sync-history"
import { 
  Plus, 
  RefreshCw, 
  Save, 
  X, 
  Plug, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Settings, 
  History as HistoryIcon, 
  TrendingUp,
  AlertCircle,
  Check,
  Info
} from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

// Mock channel data
const channelData: Record<string, {
  id: string;
  name: string;
  logo: string;
  color: string;
  apiEndpoint: string;
}> = {
  "1": {
    id: "1",
    name: "Airbnb",
    logo: "/placeholder.jpg",
    color: "#FF5A5F",
    apiEndpoint: "https://api.airbnb.com/v2",
  },
  "2": {
    id: "2",
    name: "VRBO",
    logo: "/placeholder.jpg",
    color: "#3D67FF",
    apiEndpoint: "https://api.vrbo.com/v2",
  },
  "3": {
    id: "3",
    name: "Booking.com",
    logo: "/placeholder.jpg",
    color: "#003580",
    apiEndpoint: "https://api.booking.com/v2",
  },
  "4": {
    id: "4",
    name: "Expedia",
    logo: "/placeholder.jpg",
    color: "#00355F",
    apiEndpoint: "https://api.expedia.com/v2",
  },
}

// Types
interface SyncHistoryItem {
  id: string
  timestamp: Date
  type: 'full' | 'incremental'
  status: 'success' | 'failed'
  duration: number
  propertiesSynced: number
  bookingsSynced: number
  error?: string
}

export default function ChannelManagerSettingsPage() {
  const params = useParams()
  const channelId = params.id as string
  const channel = channelData[channelId] || { id: channelId, name: "Unknown Channel", logo: "/placeholder.jpg", color: "#666" }
  
  const { toast } = useToast()
  const router = useRouter()
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [syncFrequency, setSyncFrequency] = useState('Every hour')
  const [isConnected, setIsConnected] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  
  // Property Mapping state
  const [propertySelection, setPropertySelection] = useState('All Properties')
  const [selectedProperties, setSelectedProperties] = useState<number[]>([])
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false)
  const [isMappingModalOpen, setIsMappingModalOpen] = useState(false)
  const [roomTypeMapping, setRoomTypeMapping] = useState('Automatic Mapping')
  const [amenityMapping, setAmenityMapping] = useState('Automatic Mapping')
  const [imageSync, setImageSync] = useState('Sync All Images')
  const [isMappingLoading, setIsMappingLoading] = useState(false)
  
  // Rates & Pricing state
  const [currency, setCurrency] = useState('USD ($)')
  const [baseRate, setBaseRate] = useState(100)
  const [seasonalRates, setSeasonalRates] = useState([])
  const [discounts, setDiscounts] = useState([])
  const [fees, setFees] = useState({
    cleaning: 50,
    securityDeposit: 200
  })

  // Availability Rules state
  const [minStay, setMinStay] = useState(1)
  const [maxStay, setMaxStay] = useState(30)
  const [leadTime, setLeadTime] = useState(0)
  const [bookingWindow, setBookingWindow] = useState(365)
  const [closedDates, setClosedDates] = useState([])

  // Sync History state
  const [syncHistory, setSyncHistory] = useState<SyncHistoryItem[]>([
    {
      id: '1',
      timestamp: new Date('2025-04-02T10:30:00'),
      type: 'full',
      status: 'success',
      duration: 45,
      propertiesSynced: 5,
      bookingsSynced: 12
    },
    {
      id: '2',
      timestamp: new Date('2025-04-02T11:30:00'),
      type: 'incremental',
      status: 'success',
      duration: 12,
      propertiesSynced: 2,
      bookingsSynced: 3
    },
    {
      id: '3',
      timestamp: new Date('2025-04-02T12:30:00'),
      type: 'incremental',
      status: 'failed',
      duration: 8,
      propertiesSynced: 0,
      bookingsSynced: 0,
      error: 'Connection timeout'
    },
    // Add more mock data for pagination testing
    {
      id: '4',
      timestamp: new Date('2025-04-01T09:15:00'),
      type: 'full',
      status: 'success',
      duration: 38,
      propertiesSynced: 4,
      bookingsSynced: 8
    },
    {
      id: '5',
      timestamp: new Date('2025-04-01T14:45:00'),
      type: 'incremental',
      status: 'success',
      duration: 10,
      propertiesSynced: 1,
      bookingsSynced: 2
    },
    {
      id: '6',
      timestamp: new Date('2025-03-31T16:20:00'),
      type: 'incremental',
      status: 'failed',
      duration: 5,
      propertiesSynced: 0,
      bookingsSynced: 0,
      error: 'API rate limit exceeded'
    },
    {
      id: '7',
      timestamp: new Date('2025-03-30T08:10:00'),
      type: 'full',
      status: 'success',
      duration: 42,
      propertiesSynced: 6,
      bookingsSynced: 10
    }
  ])

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(5)
  
  // Filter state
  const [statusFilter, setStatusFilter] = useState<'all' | 'success' | 'failed'>('all')
  const [typeFilter, setTypeFilter] = useState<'all' | 'full' | 'incremental'>('all')
  const [dateRange, setDateRange] = useState<{start?: Date, end?: Date}>({})

  // Filtered and paginated data
  const filteredSyncHistory = syncHistory.filter(item => {
    const statusMatch = statusFilter === 'all' || item.status === statusFilter
    const typeMatch = typeFilter === 'all' || item.type === typeFilter
    const dateMatch = 
      !dateRange.start || 
      !dateRange.end || 
      (item.timestamp >= dateRange.start && item.timestamp <= dateRange.end)
    
    return statusMatch && typeMatch && dateMatch
  })

  const paginatedSyncHistory = filteredSyncHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredSyncHistory.length / itemsPerPage)
  
  const [selectedSync, setSelectedSync] = useState<SyncHistoryItem | null>(null)

  // Advanced Settings state
  const [syncBehavior, setSyncBehavior] = useState('full')
  const [errorHandling, setErrorHandling] = useState('strict')
  const [debugLogging, setDebugLogging] = useState(false)
  const [validateResponses, setValidateResponses] = useState(true)

  // Load channel-specific data
  useEffect(() => {
    // This would be an API call in a real application
    // For now, we'll just simulate loading data
    const loadChannelData = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Reset form state for the new channel
      setApiKey('')
      setApiSecret('')
      setIsConnected(false)
    }
    
    loadChannelData()
  }, [channelId])

  const testConnection = async () => {
    setIsTesting(true)
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsConnected(true)
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${channel.name} API`,
      })
    } catch (error) {
      setIsConnected(false)
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${channel.name} API`,
        variant: "destructive"
      })
    } finally {
      setIsTesting(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      // TODO: Replace with actual save implementation
      await new Promise(resolve => setTimeout(resolve, 500))
      toast({
        title: "Settings saved",
        description: `Your ${channel.name} settings have been updated`,
      })
      router.refresh()
    } catch (error) {
      toast({
        title: "Save failed",
        description: `Failed to save ${channel.name} settings`,
        variant: "destructive"
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSyncNow = async () => {
    toast({
      title: "Sync started",
      description: `Syncing with ${channel.name} has been initiated`,
    })
    
    // In a real app, this would trigger a background sync process
    // For now, we'll just add a new sync history item
    const newSyncItem: SyncHistoryItem = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: 'incremental',
      status: 'success',
      duration: Math.floor(Math.random() * 30) + 5,
      propertiesSynced: Math.floor(Math.random() * 5) + 1,
      bookingsSynced: Math.floor(Math.random() * 10) + 1
    }
    
    setSyncHistory([newSyncItem, ...syncHistory])
  }

  return (
    <DashboardShell>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Dashboard</span>
          <span>/</span>
          <span>Channel Manager</span>
          <span>/</span>
          <span className="font-medium text-foreground">Settings</span>
        </div>
        
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{channel.name} Settings</h1>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <p className="text-muted-foreground mt-1">
              Manage API connections, property mappings, and synchronization settings
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" onClick={handleSyncNow}>
              <RefreshCw className="h-4 w-4" />
              <span className="hidden sm:inline">Sync Now</span>
            </Button>
            <Link href="/dashboard/channel-manager/property-mapping">
              <Button variant="outline" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">Property Mapping</span>
              </Button>
            </Link>
            <Link href="/dashboard/dynamic-pricing">
              <Button variant="outline" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">Dynamic Pricing</span>
              </Button>
            </Link>
            <Button onClick={handleSave} className="gap-2" disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span className="hidden sm:inline">Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="connection" className="mt-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="connection" className="gap-1">
            <Plug className="h-4 w-4" />
            Connection
          </TabsTrigger>
          <TabsTrigger value="mapping" className="gap-1">
            <MapPin className="h-4 w-4" />
            Property Mapping
          </TabsTrigger>
          <TabsTrigger value="rates" className="gap-1">
            <DollarSign className="h-4 w-4" />
            Rates & Pricing
          </TabsTrigger>
          <TabsTrigger value="availability" className="gap-1">
            <Calendar className="h-4 w-4" />
            Availability
          </TabsTrigger>
          <TabsTrigger value="dynamic-pricing" className="gap-1">
            <TrendingUp className="h-4 w-4" />
            Dynamic Pricing
          </TabsTrigger>
          <TabsTrigger value="advanced" className="gap-1">
            <Settings className="h-4 w-4" />
            Advanced
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1">
            <HistoryIcon className="h-4 w-4" />
            Sync History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="connection" className="mt-6">
          <ConnectionSettings 
            channel={channel}
            onConnectionStatusChange={setIsConnected}
            onNotification={(notification) => {
              // In a real app, this would be handled by a notification system
              toast({
                title: notification.title,
                description: notification.message,
                variant: notification.type === "error" ? "destructive" : "default"
              })
            }}
          />
        </TabsContent>

        <TabsContent value="mapping" className="mt-6">
          <PropertyMappingUI />
        </TabsContent>

        <TabsContent value="rates" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Base Pricing</CardTitle>
              <CardDescription>
                Set your default nightly rates and currency
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Currency</label>
                <select 
                  className="w-full rounded-md border p-2"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nightly Rate</label>
                <input 
                  type="number" 
                  className="w-full rounded-md border p-2" 
                  value={baseRate}
                  onChange={(e) => setBaseRate(Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Seasonal Pricing</CardTitle>
              <CardDescription>
                Adjust prices for specific date ranges
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input type="date" className="w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input type="date" className="w-full rounded-md border p-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price Adjustment</label>
                    <div className="flex">
                      <select className="rounded-l-md border p-2">
                        <option>+</option>
                        <option>-</option>
                      </select>
                      <input type="number" className="w-full rounded-r-md border p-2" placeholder="20" />
                      <select className="rounded-r-md border p-2">
                        <option>%</option>
                        <option>$</option>
                      </select>
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Seasonal Pricing
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Fees</CardTitle>
              <CardDescription>
                Set cleaning fees and other charges
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cleaning Fee</label>
                <input 
                  type="number" 
                  className="w-full rounded-md border p-2" 
                  value={fees.cleaning}
                  onChange={(e) => setFees({...fees, cleaning: Number(e.target.value)})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Security Deposit</label>
                <input 
                  type="number" 
                  className="w-full rounded-md border p-2" 
                  value={fees.securityDeposit}
                  onChange={(e) => setFees({...fees, securityDeposit: Number(e.target.value)})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dynamic-pricing" className="mt-6">
          <DynamicPricingTab channelId={channelId} />
        </TabsContent>

        <TabsContent value="availability" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stay Requirements</CardTitle>
              <CardDescription>
                Set minimum and maximum stay lengths
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Minimum Stay (nights)</label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={minStay}
                  onChange={(e) => setMinStay(Number(e.target.value))}
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Maximum Stay (nights)</label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={maxStay}
                  onChange={(e) => setMaxStay(Number(e.target.value))}
                  min="1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Restrictions</CardTitle>
              <CardDescription>
                Set lead time and booking window
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Lead Time (days)</label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={leadTime}
                  onChange={(e) => setLeadTime(Number(e.target.value))}
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Booking Window (days)</label>
                <input
                  type="number"
                  className="w-full rounded-md border p-2"
                  value={bookingWindow}
                  onChange={(e) => setBookingWindow(Number(e.target.value))}
                  min="1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Closed Dates</CardTitle>
              <CardDescription>
                Block specific dates from being booked
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <input type="date" className="rounded-md border p-2" />
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Closed Date
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="mt-6 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sync Behavior</CardTitle>
              <CardDescription>
                Configure how data syncs with the channel manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Sync Mode</label>
                  <select
                    className="w-full rounded-md border p-2"
                    value={syncBehavior}
                    onChange={(e) => setSyncBehavior(e.target.value)}
                  >
                    <option value="full">Full Sync</option>
                    <option value="incremental">Incremental Sync</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Error Handling</CardTitle>
              <CardDescription>
                Configure how errors are handled during sync
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Error Handling Mode</label>
                  <select
                    className="w-full rounded-md border p-2"
                    value={errorHandling}
                    onChange={(e) => setErrorHandling(e.target.value)}
                  >
                    <option value="strict">Strict (fail on errors)</option>
                    <option value="lenient">Lenient (continue on errors)</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="validateResponses"
                    checked={validateResponses}
                    onChange={(e) => setValidateResponses(e.target.checked)}
                  />
                  <label htmlFor="validateResponses" className="text-sm font-medium">
                    Validate API Responses
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Debugging</CardTitle>
              <CardDescription>
                Configure debugging options for troubleshooting
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="debugLogging"
                  checked={debugLogging}
                  onChange={(e) => setDebugLogging(e.target.checked)}
                />
                <label htmlFor="debugLogging" className="text-sm font-medium">
                  Enable Debug Logging
                </label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <SyncHistory initialHistory={syncHistory} />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
