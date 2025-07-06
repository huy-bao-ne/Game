import { useState } from "react"

interface User {
  name: string
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)

  const login = (name: string) => {
    const userData = { name: name.trim() }
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return {
    user,
    login,
    logout
  }
}
