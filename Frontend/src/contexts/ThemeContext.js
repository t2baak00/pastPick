'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system') // 'light', 'dark', or 'system'
  const [actualTheme, setActualTheme] = useState('light') // The actual theme being used

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('pastpick-theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
  }, [])

  useEffect(() => {
    const updateTheme = () => {
      let newActualTheme = theme
      
      if (theme === 'system') {
        // Use system preference
        newActualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }
      
      setActualTheme(newActualTheme)
      
      // Update DOM
      if (newActualTheme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }

    updateTheme()

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        updateTheme()
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const changeTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('pastpick-theme', newTheme)
  }

  const toggleTheme = () => {
    const newTheme = actualTheme === 'dark' ? 'light' : 'dark'
    changeTheme(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      actualTheme, 
      changeTheme,
      toggleTheme,
      isDark: actualTheme === 'dark',
      isLight: actualTheme === 'light',
      availableThemes: ['light', 'dark', 'system']
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}