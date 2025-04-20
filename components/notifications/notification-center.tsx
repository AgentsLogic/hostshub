"use client"

import { useState, useEffect } from "react"
import { useNotifications, NotificationCategory } from "@/contexts/notification-context"
import { NotificationItem } from "./notification-item"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Bell, 
  CheckCircle, 
  Trash2, 
  RefreshCw, 
  Calendar, 
  AlertTriangle, 
  Settings 
} from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface NotificationCenterProps {
  maxHeight?: string
}

export function NotificationCenter({ maxHeight = "500px" }: NotificationCenterProps) {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    clearAllNotifications 
  } = useNotifications()
  
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"all" | NotificationCategory>("all")
  
  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest('[data-notification-center]')) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  
  // Filter notifications based on active tab
  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === "all") return true
    return notification.category === activeTab
  })
  
  // Count notifications by category
  const getCategoryCount = (category: NotificationCategory) => {
    return notifications.filter(n => n.category === category).length
  }
  
  // Count unread notifications by category
  const getUnreadCategoryCount = (category: NotificationCategory) => {
    return notifications.filter(n => n.category === category && !n.read).length
  }
  
  // Get total count for a tab (all or specific category)
  const getTabCount = (tab: "all" | NotificationCategory) => {
    if (tab === "all") return notifications.length
    return getCategoryCount(tab)
  }
  
  // Get unread count for a tab (all or specific category)
  const getUnreadTabCount = (tab: "all" | NotificationCategory) => {
    if (tab === "all") return unreadCount
    return getUnreadCategoryCount(tab)
  }
  
  return (
    <div data-notification-center className="relative">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="relative"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-[380px] p-0" 
          align="end"
          sideOffset={5}
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h3 className="font-medium">Notifications</h3>
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                title="Mark all as read"
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
              >
                <CheckCircle className="h-4 w-4" />
                <span className="sr-only">Mark all as read</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                title="Clear all notifications"
                onClick={clearAllNotifications}
                disabled={notifications.length === 0}
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Clear all</span>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8" 
                title="Notification settings"
              >
                <Settings className="h-4 w-4" />
                <span className="sr-only">Settings</span>
              </Button>
            </div>
          </div>
          
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={(value) => setActiveTab(value as "all" | NotificationCategory)}
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all" className="relative">
                All
                {getUnreadTabCount("all") > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1"
                  >
                    {getUnreadTabCount("all")}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="sync" className="relative">
                <RefreshCw className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Sync</span>
                {getUnreadTabCount("sync") > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1"
                  >
                    {getUnreadTabCount("sync")}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="booking" className="relative">
                <Calendar className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Bookings</span>
                {getUnreadTabCount("booking") > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1"
                  >
                    {getUnreadTabCount("booking")}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="conflict" className="relative">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Conflicts</span>
                {getUnreadTabCount("conflict") > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1"
                  >
                    {getUnreadTabCount("conflict")}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="system" className="relative">
                <Bell className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">System</span>
                {getUnreadTabCount("system") > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 min-w-[20px] px-1"
                  >
                    {getUnreadTabCount("system")}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              <ScrollArea className={cn("max-h-[500px]", maxHeight && `max-h-[${maxHeight}]`)}>
                {filteredNotifications.length > 0 ? (
                  <div className="divide-y">
                    {filteredNotifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={markAsRead}
                        onRemove={removeNotification}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h4 className="text-lg font-medium">No notifications</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {activeTab === "all"
                        ? "You don't have any notifications yet"
                        : `You don't have any ${activeTab} notifications`}
                    </p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  )
}
