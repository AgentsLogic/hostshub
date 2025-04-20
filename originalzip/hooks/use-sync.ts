"use client"

import { useState, useEffect } from "react"
import { getSyncLogs, createSyncLog, getSyncSettings, createOrUpdateSyncSettings } from "@/lib/data-access/sync"
import type { SyncLog, ChannelSyncSettings } from "@/lib/database-schema"

export function useSyncLogs(channelId?: string, propertyId?: string, limit = 50) {
  const [syncLogs, setSyncLogs] = useState<SyncLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSyncLogs() {
      try {
        setIsLoading(true)
        const data = await getSyncLogs(channelId, propertyId, limit)
        setSyncLogs(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch sync logs"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchSyncLogs()
  }, [channelId, propertyId, limit])

  const addSyncLog = async (syncLog: Omit<SyncLog, "id" | "created_at">) => {
    try {
      const newSyncLog = await createSyncLog(syncLog)
      setSyncLogs((prev) => [newSyncLog, ...prev])
      return newSyncLog
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to create sync log"))
      throw err
    }
  }

  return {
    syncLogs,
    isLoading,
    error,
    addSyncLog,
  }
}

export function useSyncSettings() {
  const [syncSettings, setSyncSettings] = useState<ChannelSyncSettings | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchSyncSettings() {
      try {
        setIsLoading(true)
        // In a real app, you'd get the user ID from auth context
        const userId = "current-user-id"
        const data = await getSyncSettings(userId)
        setSyncSettings(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch sync settings"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchSyncSettings()
  }, [])

  const updateSyncSettings = async (
    settings: Omit<ChannelSyncSettings, "id" | "user_id" | "created_at" | "updated_at">,
  ) => {
    try {
      // In a real app, you'd get the user ID from auth context
      const userId = "current-user-id"
      const updatedSettings = await createOrUpdateSyncSettings(userId, settings)
      setSyncSettings(updatedSettings)
      return updatedSettings
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update sync settings"))
      throw err
    }
  }

  return {
    syncSettings,
    isLoading,
    error,
    updateSyncSettings,
  }
}

