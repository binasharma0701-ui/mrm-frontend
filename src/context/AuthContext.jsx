import { createContext, useState, useCallback, useEffect } from 'react'
import AuthService from '../services/auth.service'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (AuthService.isLoggedIn()) {
      loadCurrentUser()
    } else {
      setLoading(false)
    }
  }, [])

  const loadCurrentUser = async () => {
    try {
      const userData = await AuthService.getCurrentUser()
      setUser(userData)
    } catch (err) {
      console.error('Failed to load user:', err)
    } finally {
      setLoading(false)
    }
  }

  const login = useCallback(async (email, password) => {
    try {
      setLoading(true)
      setError(null)
      const data = await AuthService.login(email, password)
      setUser(data.user)
      return data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const register = useCallback(async (userData) => {
    try {
      setLoading(true)
      setError(null)
      const data = await AuthService.register(userData)
      setUser(data.user)
      return data
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      setLoading(true)
      await AuthService.logout()
      setUser(null)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [])

  const isLoggedIn = user !== null

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        isLoggedIn,
        refetch: loadCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
