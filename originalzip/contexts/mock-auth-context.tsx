"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"

type MockUser = {
  id: string
  name: string
  email: string
  avatar: string
  provider: string
}

type MockAuthContextType = {
  user: MockUser | null
  isLoading: boolean
  isAuthenticated: boolean
  logout: () => void
}

const MockAuthContext = createContext<MockAuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  logout: () => {},
})

export const MockAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in via mock auth
    const checkAuth = () => {
      const mockLoggedIn = localStorage.getItem("mockLoggedIn")
      if (mockLoggedIn === "true") {
        const mockUserData = localStorage.getItem("mockUser")
        if (mockUserData) {
          setUser(JSON.parse(mockUserData))
        }
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const logout = () => {
    localStorage.removeItem("mockLoggedIn")
    localStorage.removeItem("mockUser")
    setUser(null)
    router.push("/login")
  }

  return (
    <MockAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  )
}

export const useMockAuth = () => useContext(MockAuthContext)

