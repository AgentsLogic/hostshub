"use client"

import * as React from "react"
import {
  Bar,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
} from "recharts"
import { cn } from "@/lib/utils"

// Define proper types for the tooltip props
type TooltipPayload = {
  dataKey: string
  name: string
  value: number
  payload: any
  color: string
}

interface ChartContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  config?: Record<string, { label: string; color: string }>
}

export function ChartContainer({ children, config, className, ...props }: ChartContainerProps) {
  // Create CSS variables for the chart colors
  const style = React.useMemo(() => {
    if (!config) return {}

    return Object.entries(config).reduce(
      (acc, [key, value]) => {
        acc[`--color-${key}`] = value.color
        return acc
      },
      {} as Record<string, string>,
    )
  }, [config])

  return (
    <div className={cn("w-full", className)} style={style} {...props}>
      {children}
    </div>
  )
}

interface ChartTooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
  config?: Record<string, { label: string; color: string }>
  formatter?: (value: number, name: string) => React.ReactNode
}

export function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  config,
  formatter,
  ...props
}: ChartTooltipContentProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div className={cn("rounded-lg border bg-background p-2 shadow-sm", className)} {...props}>
      <div className="grid gap-2">
        <div className="flex items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">{label}</div>
        </div>
        <div className="grid gap-1">
          {payload.map((item, index) => {
            const dataKey = item.dataKey
            const color = config?.[dataKey]?.color || item.color || "hsl(var(--primary))"
            const name = config?.[dataKey]?.label || item.name || dataKey
            const value = formatter ? formatter(item.value, name) : item.value

            return (
              <div key={index} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  <div className="text-sm font-medium">{name}</div>
                </div>
                <div className="text-sm font-medium">{value}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Add the ChartTooltip component
export function ChartTooltip(props: React.ComponentProps<typeof RechartsTooltip>) {
  return (
    <RechartsTooltip
      content={({ active, payload, label }) => (
        <ChartTooltipContent active={active} payload={payload} label={label} {...props} />
      )}
      {...props}
    />
  )
}

// Export BarChart component
export function BarChart({
  data = [],
  xAxis,
  yAxis,
  categories,
  index,
  colors,
  valueFormatter,
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  showAnimation = true,
  ...props
}: {
  data?: any[]
  xAxis?: React.ComponentProps<typeof XAxis>
  yAxis?: React.ComponentProps<typeof YAxis>
  categories?: string[]
  index?: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  startEndOnly?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  showTooltip?: boolean
  showAnimation?: boolean
} & Omit<React.ComponentProps<typeof RechartsBarChart>, "data">) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : []
  const indexKey = index || "name"
  const categoryKeys = categories || (safeData.length > 0 ? Object.keys(safeData[0]).filter((key) => key !== indexKey) : [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={safeData} {...props}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && <XAxis dataKey={indexKey} tickLine={false} axisLine={false} tickMargin={8} {...xAxis} />}
        {showYAxis && (
          <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={valueFormatter} {...yAxis} />
        )}
        {showTooltip && (
          <RechartsTooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                formatter={(value) => (valueFormatter ? valueFormatter(value) : value)}
              />
            )}
          />
        )}
        {showLegend && <Legend />}
        {categoryKeys.map((key, index) => (
          <Bar
            key={key}
            dataKey={key}
            fill={colors?.[index] || `var(--chart-${index + 1})`}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

// Export LineChart component
export function LineChart({
  data = [],
  xAxis,
  yAxis,
  categories,
  index,
  colors,
  valueFormatter,
  startEndOnly = false,
  showXAxis = true,
  showYAxis = true,
  showLegend = true,
  showGridLines = true,
  showTooltip = true,
  showAnimation = true,
  ...props
}: {
  data?: any[]
  xAxis?: React.ComponentProps<typeof XAxis>
  yAxis?: React.ComponentProps<typeof YAxis>
  categories?: string[]
  index?: string
  colors?: string[]
  valueFormatter?: (value: number) => string
  startEndOnly?: boolean
  showXAxis?: boolean
  showYAxis?: boolean
  showLegend?: boolean
  showGridLines?: boolean
  showTooltip?: boolean
  showAnimation?: boolean
} & Omit<React.ComponentProps<typeof RechartsLineChart>, "data">) {
  // Ensure data is an array
  const safeData = Array.isArray(data) ? data : []
  const indexKey = index || "name"
  const categoryKeys = categories || (safeData.length > 0 ? Object.keys(safeData[0]).filter((key) => key !== indexKey) : [])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={safeData} {...props}>
        {showGridLines && <CartesianGrid strokeDasharray="3 3" />}
        {showXAxis && <XAxis dataKey={indexKey} tickLine={false} axisLine={false} tickMargin={8} {...xAxis} />}
        {showYAxis && (
          <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={valueFormatter} {...yAxis} />
        )}
        {showTooltip && (
          <RechartsTooltip
            content={({ active, payload, label }) => (
              <ChartTooltipContent
                active={active}
                payload={payload}
                label={label}
                formatter={(value) => (valueFormatter ? valueFormatter(value) : value)}
              />
            )}
          />
        )}
        {showLegend && <Legend />}
        {categoryKeys.map((key, index) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={colors?.[index] || `var(--chart-${index + 1})`}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

