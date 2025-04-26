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

const sampleData = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 400 },
  { name: "May", value: 500 },
  { name: "Jun", value: 600 },
]

function ChartTooltipContent({
  active,
  payload,
  label,
  className,
  config,
  formatter,
  ...props
}) {
  if (!active || !payload?.length) return null

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

export function SafeBarChart({
  data = sampleData,
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
}) {
  const chartData = (!data || !data.length) ? sampleData : data
  const indexKey = index || "name"
  const categoryKeys = categories ||
    (chartData.length > 0 ? Object.keys(chartData[0]).filter(key => key !== indexKey) : ["value"])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={chartData} {...props}>
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
            fill={colors?.[index] || `var(--chart-${index + 1}, #1f77b4)`}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export function SafeLineChart({
  data = sampleData,
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
}) {
  const chartData = (!data || !data.length) ? sampleData : data
  const indexKey = index || "name"
  const categoryKeys = categories ||
    (chartData.length > 0 ? Object.keys(chartData[0]).filter(key => key !== indexKey) : ["value"])

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={chartData} {...props}>
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
            stroke={colors?.[index] || `var(--chart-${index + 1}, #1f77b4)`}
            isAnimationActive={showAnimation}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}
