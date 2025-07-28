import { useState, useEffect } from "react"

interface User {
  name: string
}

const USER_STORAGE_KEY = "tetris_user"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage when component mounts
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY)
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser)
          setUser(parsedUser)
        }
      } catch (error) {
        console.error("Error loading user:", error)
        // Clear invalid data
        localStorage.removeItem(USER_STORAGE_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    loadUser()
  }, [])

  const login = (name: string, password?: string) => {
    const userData: User = { 
      name: name.trim()
    }
    
    setUser(userData)
    
    // Save to localStorage
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData))
    } catch (error) {
      console.error("Error saving user:", error)
    }
  }

  const logout = () => {
    setUser(null)
    // Remove from localStorage
    localStorage.removeItem(USER_STORAGE_KEY)
  }

  // Check if user is logged in
  const isAuthenticated = !!user

  return {
    user,
    login,
    logout,
    isAuthenticated,
    isLoading
  }
}
