"use client"

import { SafeBarChart, SafeLineChart } from "./enhanced-chart"
import { ErrorBoundary } from "react-error-boundary"

function ChartErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="text-center text-muted-foreground">
        <p>Chart failed to load</p>
        <button 
          onClick={resetErrorBoundary}
          className="text-sm underline mt-2"
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export function SaferBarChart(props) {
  return (
    <ErrorBoundary FallbackComponent={ChartErrorFallback}>
      <SafeBarChart {...props} />
    </ErrorBoundary>
  )
}

export function SaferLineChart(props) {
  return (
    <ErrorBoundary FallbackComponent={ChartErrorFallback}>
      <SafeLineChart {...props} />
    </ErrorBoundary>
  )
}
