"use client"

import type React from "react"

import { useCallback } from "react"
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string | Error
  description?: string | Error
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export function useToast() {
  const toast = useCallback(({ title, description, action, variant = "default" }: ToastProps) => {
    // Convert Error objects to strings
    const titleString = title instanceof Error ? title.message : title
    const descriptionString = description instanceof Error ? description.message : description

    return sonnerToast[variant === "destructive" ? "error" : "success"]({
      title: titleString,
      description: descriptionString,
      action,
    })
  }, [])

  return { toast }
}

// Named export for direct import
export { useToast as toast }

