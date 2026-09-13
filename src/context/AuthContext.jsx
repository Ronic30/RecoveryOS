import { createContext, useContext, useState, useEffect } from 'react'
import { safeFetchJson } from '../utils/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('token') || null)
  const [loading, setLoading] = useState(true)
  const [authError, setAuthError] = useState(null)

  // Verify stored token on initial load
  useEffect(() => {
    async function checkAuth() {
      if (!token) {
        setUser(null)
        setLoading(false)
        return
      }

      try {
        const res = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (res.ok) {
          const data = await safeFetchJson(res)
          setUser(data.user)
        } else {
          // Token expired or invalid
          localStorage.removeItem('token')
          setToken(null)
          setUser(null)
        }
      } catch (err) {
        console.error('Auth verification error:', err)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [token])

  const login = async (email, password) => {
    setAuthError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await safeFetchJson(res)

      if (!res.ok) {
        throw new Error(data.error || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      setToken(data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      setAuthError(err.message)
      return { success: false, error: err.message }
    }
  }

  const signup = async (name, email, password) => {
    setAuthError(null)
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })

      const data = await safeFetchJson(res)

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed')
      }

      localStorage.setItem('token', data.token)
      setToken(data.token)
      setUser(data.user)
      return { success: true }
    } catch (err) {
      setAuthError(err.message)
      return { success: false, error: err.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, authError, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
