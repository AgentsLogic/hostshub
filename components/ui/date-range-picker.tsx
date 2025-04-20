"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"
import type { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  initialDateFrom?: Date
  initialDateTo?: Date
  onUpdate: (values: { range: DateRange | undefined }) => void
  align?: "center" | "start" | "end"
  triggerClassName?: string
  triggerIcon?: React.ReactNode
}

export function DateRangePicker({
  initialDateFrom,
  initialDateTo,
  onUpdate,
  align = "center",
  triggerClassName,
  triggerIcon = <CalendarIcon className="mr-2 h-4 w-4" />
}: DateRangePickerProps) {
  const [date, setDate] = React.useState<DateRange | undefined>(
    initialDateFrom || initialDateTo
      ? {
          from: initialDateFrom || undefined,
          to: initialDateTo || undefined,
        }
      : undefined
  )

  // Update parent component when date changes
  React.useEffect(() => {
    onUpdate({ range: date })
  }, [date, onUpdate])

  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date?.from && "text-muted-foreground",
              triggerClassName
            )}
          >
            {triggerIcon}
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align={align}>
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
