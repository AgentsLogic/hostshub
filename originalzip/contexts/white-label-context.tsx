"use client"

import { createContext, useContext, type ReactNode, useState, useEffect } from "react"
import type { WhiteLabelSettings } from "@/lib/types"

interface WhiteLabelContextType {
  settings: Partial<WhiteLabelSettings> | null
  isWhiteLabeled: boolean
  companyName: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  fontFamily: string
  logoUrl: string
}

const WhiteLabelContext = createContext<WhiteLabelContextType>({
  settings: null,
  isWhiteLabeled: false,
  companyName: "HostsHub.ai",
  primaryColor: "#2E9D4E",
  secondaryColor: "#4682B4",
  accentColor: "#F59E0B",
  fontFamily: "Inter, sans-serif",
  logoUrl: "",
})

export function useWhiteLabel() {
  return useContext(WhiteLabelContext)
}

interface WhiteLabelProviderProps {
  children: ReactNode
  initialSettings?: Partial<WhiteLabelSettings> | null
}

export function WhiteLabelProvider({ children, initialSettings = null }: WhiteLabelProviderProps) {
  const [settings, setSettings] = useState<Partial<WhiteLabelSettings> | null>(initialSettings)

  // In a real app, you might fetch settings based on the domain
  useEffect(() => {
    if (!initialSettings) {
      const hostname = window.location.hostname
      // You would fetch settings based on hostname here
      // For now, we'll just use the initialSettings
    }
  }, [initialSettings])

  const isWhiteLabeled = settings?.enable_white_label || false
  const companyName = isWhiteLabeled ? settings?.company_name || "HostsHub.ai" : "HostsHub.ai"
  const primaryColor = settings?.primary_color || "#2E9D4E"
  const secondaryColor = settings?.secondary_color || "#4682B4"
  const accentColor = settings?.accent_color || "#F59E0B"
  const fontFamily = settings?.font_family || "Inter, sans-serif"
  const logoUrl = settings?.logo_url || ""

  // Apply custom CSS if provided
  useEffect(() => {
    if (isWhiteLabeled && settings?.custom_css) {
      const styleElement = document.createElement("style")
      styleElement.textContent = settings.custom_css
      document.head.appendChild(styleElement)

      return () => {
        document.head.removeChild(styleElement)
      }
    }
  }, [isWhiteLabeled, settings?.custom_css])

  // Apply custom colors to CSS variables
  useEffect(() => {
    if (isWhiteLabeled) {
      document.documentElement.style.setProperty("--primary", primaryColor)
      document.documentElement.style.setProperty("--secondary", secondaryColor)
      document.documentElement.style.setProperty("--accent", accentColor)
      document.documentElement.style.setProperty("--font-family", fontFamily)
    }
  }, [isWhiteLabeled, primaryColor, secondaryColor, accentColor, fontFamily])

  return (
    <WhiteLabelContext.Provider
      value={{
        settings,
        isWhiteLabeled,
        companyName,
        primaryColor,
        secondaryColor,
        accentColor,
        fontFamily,
        logoUrl,
      }}
    >
      {children}
    </WhiteLabelContext.Provider>
  )
}

