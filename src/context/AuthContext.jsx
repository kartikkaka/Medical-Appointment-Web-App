import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../api/client'


const LS_USER = 'medi_user_v1'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const raw = localStorage.getItem(LS_USER)
    if (raw) {
      setUser(JSON.parse(raw))
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      const userData = await api.login(email, password)
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem(LS_USER, JSON.stringify(userData))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const register = async (name, email, password) => {
    try {
      const userData = await api.register(name, email, password)
      setUser(userData)
      setIsAuthenticated(true)
      localStorage.setItem(LS_USER, JSON.stringify(userData))
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem(LS_USER)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
