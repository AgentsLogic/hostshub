"use client"

import { useState, useEffect } from "react"
import {
  getChannels,
  connectChannel,
  updateChannel,
  disconnectChannel,
  getPropertyChannels,
  connectPropertyChannel,
  updatePropertyChannel,
  disconnectPropertyChannel,
} from "@/lib/data-access/channels"
import type { Channel, PropertyChannel } from "@/lib/database-schema"

export function useChannels() {
  const [channels, setChannels] = useState<Channel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchChannels() {
      try {
        setIsLoading(true)
        const data = await getChannels()
        setChannels(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch channels"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchChannels()
  }, [])

  const addChannel = async (channel: Omit<Channel, "id" | "created_at" | "updated_at">) => {
    try {
      const newChannel = await connectChannel(channel)
      setChannels((prev) => [...prev, newChannel])
      return newChannel
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to connect channel"))
      throw err
    }
  }

  const editChannel = async (id: string, channel: Partial<Omit<Channel, "id" | "created_at" | "updated_at">>) => {
    try {
      const updatedChannel = await updateChannel(id, channel)
      setChannels((prev) => prev.map((c) => (c.id === id ? updatedChannel : c)))
      return updatedChannel
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update channel"))
      throw err
    }
  }

  const removeChannel = async (id: string) => {
    try {
      await disconnectChannel(id)
      setChannels((prev) => prev.map((c) => (c.id === id ? { ...c, status: "disconnected" } : c)))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to disconnect channel"))
      throw err
    }
  }

  return {
    channels,
    isLoading,
    error,
    addChannel,
    editChannel,
    removeChannel,
  }
}

export function usePropertyChannels(propertyId: string) {
  const [propertyChannels, setPropertyChannels] = useState<PropertyChannel[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchPropertyChannels() {
      try {
        setIsLoading(true)
        const data = await getPropertyChannels(propertyId)
        setPropertyChannels(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch property channels"))
      } finally {
        setIsLoading(false)
      }
    }

    if (propertyId) {
      fetchPropertyChannels()
    }
  }, [propertyId])

  const addPropertyChannel = async (propertyChannel: Omit<PropertyChannel, "id" | "created_at" | "updated_at">) => {
    try {
      const newPropertyChannel = await connectPropertyChannel(propertyChannel)
      setPropertyChannels((prev) => [...prev, newPropertyChannel])
      return newPropertyChannel
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to connect property channel"))
      throw err
    }
  }

  const editPropertyChannel = async (
    id: string,
    propertyChannel: Partial<Omit<PropertyChannel, "id" | "created_at" | "updated_at">>,
  ) => {
    try {
      const updatedPropertyChannel = await updatePropertyChannel(id, propertyChannel)
      setPropertyChannels((prev) => prev.map((pc) => (pc.id === id ? updatedPropertyChannel : pc)))
      return updatedPropertyChannel
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update property channel"))
      throw err
    }
  }

  const removePropertyChannel = async (id: string) => {
    try {
      await disconnectPropertyChannel(id)
      setPropertyChannels((prev) => prev.map((pc) => (pc.id === id ? { ...pc, status: "inactive" } : pc)))
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to disconnect property channel"))
      throw err
    }
  }

  return {
    propertyChannels,
    isLoading,
    error,
    addPropertyChannel,
    editPropertyChannel,
    removePropertyChannel,
  }
}

