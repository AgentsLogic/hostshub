"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  image?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
  error: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: "1",
    name: "Test User",
    email: "test@example.com",
    image: "/placeholder.svg?height=40&width=40",
  })

  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const login = () => {
    try {
      setUser({
        id: "1",
        name: "Test User",
        email: "test@example.com",
        image: "/placeholder.svg?height=40&width=40",
      })
      setIsAuthenticated(true)
      setError(null)
    } catch (err) {
      // Convert any error to string
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const logout = () => {
    try {
      setUser(null)
      setIsAuthenticated(false)
      setError(null)
    } catch (err) {
      // Convert any error to string
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

