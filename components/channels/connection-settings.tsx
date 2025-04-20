"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { 
  RefreshCw, 
  Plug, 
  Check,
  Info,
  AlertTriangle,
  X
} from "lucide-react"

// Types
interface ChannelInfo {
  id: string
  name: string
  logo: string
  color: string
  apiEndpoint: string
}

interface ConnectionSettingsProps {
  channel: ChannelInfo
  onConnectionStatusChange?: (isConnected: boolean) => void
  onNotification?: (notification: any) => void
}

export function ConnectionSettings({ 
  channel,
  onConnectionStatusChange,
  onNotification
}: ConnectionSettingsProps) {
  const { toast } = useToast()
  
  // Connection state
  const [apiKey, setApiKey] = useState('')
  const [apiSecret, setApiSecret] = useState('')
  const [syncFrequency, setSyncFrequency] = useState('Every hour')
  const [isConnected, setIsConnected] = useState(false)
  const [isTesting, setIsTesting] = useState(false)
  const [connectionDetails, setConnectionDetails] = useState<{
    connectedOn?: Date;
    lastSynced?: Date;
    status: 'connected' | 'disconnected' | 'error';
    errorMessage?: string;
  }>({
    status: 'disconnected'
  })
  
  // Test connection handler
  const testConnection = async () => {
    setIsTesting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Simulate successful connection
      const newConnectionStatus = true
      setIsConnected(newConnectionStatus)
      setConnectionDetails({
        connectedOn: new Date(),
        lastSynced: new Date(),
        status: 'connected'
      })
      
      // Notify parent component
      if (onConnectionStatusChange) {
        onConnectionStatusChange(newConnectionStatus)
      }
      
      // Show success toast
      toast({
        title: "Connection successful",
        description: `Successfully connected to ${channel.name} API`,
      })
      
      // Create a notification if handler provided
      if (onNotification) {
        onNotification({
          type: "success",
          category: "system",
          title: `${channel.name} Connected`,
          message: `Successfully connected to ${channel.name}. You can now sync your properties and bookings.`,
          channelId: channel.id,
          channelName: channel.name,
          actionUrl: `/dashboard/channel-manager/${channel.id}/settings`,
          actionLabel: "Configure Channel",
        })
      }
    } catch (error) {
      // Handle connection failure
      setIsConnected(false)
      setConnectionDetails({
        status: 'error',
        errorMessage: 'Failed to connect to API. Please check your credentials.'
      })
      
      // Notify parent component
      if (onConnectionStatusChange) {
        onConnectionStatusChange(false)
      }
      
      // Show error toast
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${channel.name} API`,
        variant: "destructive"
      })
      
      // Create a notification if handler provided
      if (onNotification) {
        onNotification({
          type: "error",
          category: "system",
          title: `${channel.name} Connection Failed`,
          message: `Failed to connect to ${channel.name} API. Please check your credentials and try again.`,
          channelId: channel.id,
          channelName: channel.name,
          actionUrl: `/dashboard/channel-manager/${channel.id}/settings`,
          actionLabel: "Check API Settings",
        })
      }
    } finally {
      setIsTesting(false)
    }
  }
  
  // Disconnect handler
  const handleDisconnect = () => {
    setIsConnected(false)
    setConnectionDetails({
      status: 'disconnected'
    })
    
    // Notify parent component
    if (onConnectionStatusChange) {
      onConnectionStatusChange(false)
    }
    
    // Show toast
    toast({
      title: "Disconnected",
      description: `Successfully disconnected from ${channel.name} API`,
    })
  }
  
  // Format date for display
  const formatDate = (date?: Date) => {
    if (!date) return 'Never';
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
  
  // Get time ago string
  const getTimeAgo = (date?: Date) => {
    if (!date) return 'Never';
    
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="bg-gray-50 border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <CardTitle className="text-lg">Connection Settings</CardTitle>
          <Badge 
            variant={isConnected ? "default" : "outline"} 
            className={isConnected ? "bg-green-100 text-green-800 hover:bg-green-100" : ""}
          >
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>
        <CardDescription className="mt-1">
          Connect your {channel.name} account to enable synchronization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {/* OAuth Connection for channel */}
        <div className="flex flex-col items-center justify-center py-6 px-4 border border-dashed rounded-lg">
          <div className="mb-4 p-3 rounded-full" style={{ backgroundColor: `${channel.color}20` }}>
            <img 
              src={channel.logo} 
              alt={`${channel.name} Logo`} 
              className="w-12 h-12 object-contain"
            />
          </div>
          
          <h3 className="text-lg font-medium mb-2">Connect with {channel.name}</h3>
          <p className="text-center text-muted-foreground mb-6 max-w-md">
            Authorize HostsHub to access your {channel.name} account to sync listings, 
            rates, availability, and bookings.
          </p>
          
          {isConnected ? (
            <div className="space-y-4 w-full max-w-md">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-md">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="font-medium">Connected to {channel.name}</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleDisconnect}
                >
                  <X className="mr-1 h-4 w-4" />
                  Disconnect
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground space-y-1">
                <p><span className="font-medium">Connected on:</span> {formatDate(connectionDetails.connectedOn)}</p>
                <p><span className="font-medium">Last synced:</span> {getTimeAgo(connectionDetails.lastSynced)}</p>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center gap-4">
              {connectionDetails.status === 'error' && (
                <div className="w-full max-w-md p-3 bg-red-50 border border-red-200 rounded-md flex items-start gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Connection Error</p>
                    <p className="text-sm text-red-700">{connectionDetails.errorMessage}</p>
                  </div>
                </div>
              )}
              
              <Button 
                className="w-64 py-6 text-white hover:opacity-90"
                style={{ 
                  backgroundColor: channel.color
                }}
                onClick={testConnection}
                disabled={isTesting}
              >
                {isTesting ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                    <span className="text-base">Connecting...</span>
                  </>
                ) : (
                  <>
                    <Plug className="mr-2 h-5 w-5" />
                    <span className="text-base">Connect with {channel.name}</span>
                  </>
                )}
              </Button>
            </div>
          )}
        </div>

        {/* API Credentials (optional for some channels) */}
        {!isConnected && (
          <div className="space-y-4 border-t pt-6">
            <h3 className="text-sm font-medium">API Credentials (Optional)</h3>
            <p className="text-sm text-muted-foreground">
              For direct API integration, enter your API credentials below.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input
                  id="apiKey"
                  type="text"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="apiSecret">API Secret</Label>
                <Input
                  id="apiSecret"
                  type="password"
                  value={apiSecret}
                  onChange={(e) => setApiSecret(e.target.value)}
                  placeholder="Enter your API secret"
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Sync Frequency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-6">
          <div>
            <Label htmlFor="syncFrequency">Sync Frequency</Label>
            <p className="text-sm text-muted-foreground">
              How often data syncs with {channel.name}
            </p>
          </div>
          <div>
            <Select
              value={syncFrequency}
              onValueChange={setSyncFrequency}
            >
              <SelectTrigger id="syncFrequency" className="mt-1">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Every 15 minutes">Every 15 minutes</SelectItem>
                <SelectItem value="Every hour">Every hour</SelectItem>
                <SelectItem value="Every 6 hours">Every 6 hours</SelectItem>
                <SelectItem value="Every 24 hours">Every 24 hours</SelectItem>
                <SelectItem value="Manual only">Manual only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* API Documentation */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-800">API Documentation</h3>
            <p className="text-sm text-blue-700 mt-1">
              You can find the {channel.name} API documentation and get your API credentials at{' '}
              <a 
                href={`https://developers.${channel.name.toLowerCase()}.com`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline"
              >
                developers.{channel.name.toLowerCase()}.com
              </a>
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
