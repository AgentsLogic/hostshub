"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Toast = {
  id: string
  title: string
  description?: string
}

type ToastContextType = {
  toasts: Toast[]
  toast: (props: { title: string; description?: string }) => void
  dismiss: (id: string) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description }: { title: string; description?: string }) => {
    // Ensure title and description are strings
    const safeTitle = typeof title === "string" ? title : title instanceof Error ? title.message : String(title)
    const safeDescription = description
      ? typeof description === "string"
        ? description
        : description instanceof Error
          ? description.message
          : String(description)
      : undefined

    const id = Math.random().toString(36).slice(2, 9)
    setToasts((prev) => [...prev, { id, title: safeTitle, description: safeDescription }])

    setTimeout(() => {
      dismiss(id)
    }, 3000)
  }

  const dismiss = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      {toasts.length > 0 && (
        <div className="fixed bottom-0 right-0 z-50 p-4 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="bg-white rounded-lg shadow-lg p-4 border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
              onClick={() => dismiss(toast.id)}
            >
              <h3 className="font-medium">{toast.title}</h3>
              {toast.description && <p className="text-sm text-gray-500 dark:text-gray-400">{toast.description}</p>}
            </div>
          ))}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

