"use client"

import { useState } from "react"
import { Notification } from "@/contexts/notification-context"
import { formatDistanceToNow } from "date-fns"
import { 
  AlertCircle, 
  CheckCircle, 
  Info, 
  X, 
  ExternalLink, 
  Bell, 
  Calendar, 
  RefreshCw, 
  AlertTriangle 
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onRemove: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead, onRemove }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead(notification.id)
    }
  }
  
  const getCategoryIcon = () => {
    switch (notification.category) {
      case "sync":
        return <RefreshCw className="h-5 w-5" />
      case "booking":
        return <Calendar className="h-5 w-5" />
      case "conflict":
        return <AlertTriangle className="h-5 w-5" />
      case "system":
        return <Bell className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }
  
  const getTypeIcon = () => {
    switch (notification.type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }
  
  const getBackgroundColor = () => {
    if (!notification.read) {
      return "bg-muted/50"
    }
    return isHovered ? "bg-muted/30" : "bg-transparent"
  }
  
  return (
    <div
      className={cn(
        "relative flex items-start gap-4 p-4 transition-colors",
        getBackgroundColor(),
        !notification.read && "border-l-4",
        !notification.read && notification.type === "success" && "border-l-green-500",
        !notification.read && notification.type === "error" && "border-l-red-500",
        !notification.read && notification.type === "warning" && "border-l-amber-500",
        !notification.read && notification.type === "info" && "border-l-blue-500",
        notification.actionUrl && "cursor-pointer hover:bg-muted/50"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        handleClick();
        // If there's an action URL, navigate to it (externally)
        if (notification.actionUrl) {
          e.preventDefault();
          window.open(notification.actionUrl, '_blank');
        }
      }}
    >
      <div className="flex-shrink-0">
        {getTypeIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-sm font-medium truncate pr-8">{notification.title}</h4>
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        
        {(notification.channelName || notification.propertyName) && (
          <div className="mt-2 flex flex-wrap gap-2">
            {notification.channelName && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted">
                {getCategoryIcon()}
                <span className="ml-1">{notification.channelName}</span>
              </span>
            )}
            {notification.propertyName && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-muted">
                <span className="ml-1">{notification.propertyName}</span>
              </span>
            )}
          </div>
        )}
        
        {notification.actionUrl && notification.actionLabel && (
          <div className="mt-2">
            <Link 
              href={notification.actionUrl}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {notification.actionLabel}
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </div>
        )}
      </div>
      
      {isHovered && (
        <button
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation()
            onRemove(notification.id)
          }}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Dismiss</span>
        </button>
      )}
    </div>
  )
}
