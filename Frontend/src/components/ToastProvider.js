'use client'

import { createContext, useContext, useState } from 'react'
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ToastContext = createContext()

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const { isDark } = useTheme()

  const addToast = (message, type = 'info', duration = 4000) => {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, duration }
    
    setToasts(prev => [...prev, toast])
    
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }
    
    return id
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (message, duration) => addToast(message, 'success', duration)
  const showError = (message, duration) => addToast(message, 'error', duration)
  const showWarning = (message, duration) => addToast(message, 'warning', duration)
  const showInfo = (message, duration) => addToast(message, 'info', duration)

  return (
    <ToastContext.Provider value={{ 
      addToast, 
      removeToast, 
      showSuccess, 
      showError, 
      showWarning, 
      showInfo 
    }}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
        {toasts.map(toast => (
          <Toast 
            key={toast.id} 
            toast={toast} 
            onClose={() => removeToast(toast.id)}
            isDark={isDark}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

const Toast = ({ toast, onClose, isDark }) => {
  const getIcon = () => {
    switch (toast.type) {
      case 'success': return <CheckCircle size={20} />
      case 'error': return <XCircle size={20} />
      case 'warning': return <AlertTriangle size={20} />
      default: return <Info size={20} />
    }
  }

  const getColors = () => {
    switch (toast.type) {
      case 'success': 
        return isDark 
          ? 'bg-green-800 border-green-700 text-green-100' 
          : 'bg-green-50 border-green-200 text-green-800'
      case 'error': 
        return isDark 
          ? 'bg-red-800 border-red-700 text-red-100' 
          : 'bg-red-50 border-red-200 text-red-800'
      case 'warning': 
        return isDark 
          ? 'bg-amber-800 border-amber-700 text-amber-100' 
          : 'bg-amber-50 border-amber-200 text-amber-800'
      default: 
        return isDark 
          ? 'bg-gray-800 border-gray-700 text-gray-100' 
          : 'bg-white border-gray-200 text-gray-800'
    }
  }

  return (
    <div className={`
      max-w-sm p-4 rounded-lg border shadow-lg pointer-events-auto
      animate-in slide-in-from-right-full duration-300
      ${getColors()}
    `}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 pt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-black/10 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}