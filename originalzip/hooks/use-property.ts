"use client"

import { useState, useEffect } from "react"
import { getProperty, updateProperty } from "@/lib/data-access/properties"
import type { Property } from "@/lib/database-schema"

export function useProperty(id: string) {
  const [property, setProperty] = useState<Property | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchProperty() {
      try {
        setIsLoading(true)
        const data = await getProperty(id)
        setProperty(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch property"))
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchProperty()
    }
  }, [id])

  const editProperty = async (updates: Partial<Omit<Property, "id" | "created_at" | "updated_at">>) => {
    if (!id) return

    try {
      const updatedProperty = await updateProperty(id, updates)
      setProperty(updatedProperty)
      return updatedProperty
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to update property"))
      throw err
    }
  }

  return {
    property,
    isLoading,
    error,
    editProperty,
  }
}

