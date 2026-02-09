import React, { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext(null)

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const push = useCallback((message, options = {}) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type: options.type || 'info' }
    setToasts((t) => [...t, toast])
  
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, options.duration || 4000)
  }, [])

  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  return (
    <ToastContext.Provider value={{ toasts, push, remove }}>
      {children}
      <div aria-live="polite" aria-atomic="true" style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
        {toasts.map((t) => (
          <div key={t.id} role="status" style={{ marginBottom: 8 }}>
            <div style={{ background: '#333', color: 'white', padding: '10px 14px', borderRadius: 8, minWidth: 200 }}>
              {t.message}
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
