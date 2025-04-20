"use client"

import { useState, useEffect } from "react"
import {
  getBlockedDates,
  createBlockedDate,
  updateBlockedDate,
  deleteBlockedDate,
  getBlockedDatesByDateRange,
} from "@/lib/data-access/blocked-dates"
import type { BlockedDate } from "@/lib/database-schema"

export function useBlockedDates(propertyId: string) {
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchBlockedDates() {
      try {
        setIsLoading(true)
        const data = await getBlockedDates(propertyId)
        setBlockedDates(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch blocked dates"))
      } finally {
        setIsLoading(false)
      }
    }

    if (propertyId) {
      fetchBlockedDates()
    }
  }, [propertyId])

  const addBlockedDate = async (blockedDate: Omit<BlockedDate, "id" | "created_at" | "updated_at">) => {
    try {
      const newBlockedDate = await createBlockedDate(blockedDate)
      setBlockedDates((prev) => [...prev, newBlockedDate])
      return newBlockedDate
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create blocked date"))
      throw err
    }
  }

  const editBlockedDate = async (
    id: string,
    blockedDate: Partial<Omit<BlockedDate, "id" | "created_at" | "updated_at">>,
  ) => {
    try {
      const updatedBlockedDate = await updateBlockedDate(id, blockedDate)
      setBlockedDates((prev) => prev.map((bd) => (bd.id === id ? updatedBlockedDate : bd)))
      return updatedBlockedDate
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update blocked date"))
      throw err
    }
  }

  const removeBlockedDate = async (id: string) => {
    try {
      await deleteBlockedDate(id)
      setBlockedDates((prev) => prev.filter((bd) => bd.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to delete blocked date"))
      throw err
    }
  }

  const fetchBlockedDatesByDateRange = async (startDate: string, endDate: string) => {
    try {
      setIsLoading(true)
      const data = await getBlockedDatesByDateRange(propertyId, startDate, endDate)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch blocked dates by date range"))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return {
    blockedDates,
    isLoading,
    error,
    addBlockedDate,
    editBlockedDate,
    removeBlockedDate,
    fetchBlockedDatesByDateRange,
  }
}

