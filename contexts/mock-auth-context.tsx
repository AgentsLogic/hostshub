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
  login: (user: MockUser) => void
  logout: () => void
}

const MockAuthContext = createContext<MockAuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: () => {},
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

  const login = (userData: MockUser) => {
    localStorage.setItem("mockLoggedIn", "true")
    localStorage.setItem("mockUser", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("mockLoggedIn")
    localStorage.removeItem("mockUser")
    setUser(null)
    router.push("/")
  }

  return (
    <MockAuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </MockAuthContext.Provider>
  )
}

export const useMockAuth = () => useContext(MockAuthContext)
