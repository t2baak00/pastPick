'use client'

import { ThemeProvider } from '../contexts/ThemeContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { ToastProvider } from './ToastProvider'

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}