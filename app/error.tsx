"use client"

import { useEffect } from "react"
import { ErrorMessage } from "@/components/ui/error-message"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-var(--header-height))] p-4">
      <div className="w-full max-w-md">
        <ErrorMessage
          title="Something went wrong"
          description="We're sorry, but an unexpected error occurred. Our team has been notified."
          error={error}
          retry={reset}
        />
      </div>
    </div>
  )
}
