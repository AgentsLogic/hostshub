"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ErrorMessageProps {
  title?: string
  description?: string
  error?: Error | null
  retry?: () => void
  className?: string
}

export function ErrorMessage({
  title = "Something went wrong",
  description = "An error occurred while processing your request.",
  error,
  retry,
  className,
}: ErrorMessageProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive",
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-start gap-4">
        <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="font-medium text-base">{title}</h3>
          <p className="text-sm mt-1">{description}</p>
          
          {error && process.env.NODE_ENV !== "production" && (
            <div className="mt-2 rounded bg-destructive/20 p-2 text-xs font-mono overflow-x-auto">
              {error.message}
            </div>
          )}
          
          {retry && (
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
              onClick={retry}
            >
              <RefreshCw className="mr-2 h-3.5 w-3.5" />
              Try again
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export function InlineErrorMessage({
  message,
  className,
  id,
}: {
  message: string
  className?: string
  id?: string
}) {
  return (
    <div
      className={cn("flex items-center gap-2 text-destructive text-sm mt-1", className)}
      role="alert"
      aria-live="polite"
      id={id}
    >
      <AlertCircle className="h-3.5 w-3.5" />
      <span>{message}</span>
    </div>
  )
}
