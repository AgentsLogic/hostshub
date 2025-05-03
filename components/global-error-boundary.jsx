"use client"

import { ErrorBoundary } from "react-error-boundary"
import { useRouter } from "next/navigation"

function ErrorFallback({ error, resetErrorBoundary }) {
  const router = useRouter()
  
  return (
    <div role="alert" className="p-4 bg-red-50 text-red-700 rounded-lg">
      <h2 className="font-bold">Something went wrong</h2>
      <p className="mb-2">{error.message}</p>
      <div className="flex gap-2">
        <button 
          onClick={resetErrorBoundary}
          className="px-3 py-1 bg-red-100 hover:bg-red-200 rounded"
        >
          Try again
        </button>
        <button
          onClick={() => router.refresh()}
          className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded"
        >
          Refresh page
        </button>
      </div>
    </div>
  )
}

export function GlobalErrorBoundary({ children }) {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error('Error caught by boundary:', error)
        // You could also log errors to an error tracking service here
      }}
    >
      {children}
    </ErrorBoundary>
  )
}
