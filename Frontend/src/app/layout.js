'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '../contexts/ThemeContext'
import { LanguageProvider } from '../contexts/LanguageContext'
import { ToastProvider } from '../components/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>PastePick - Smart Toothpaste Analyzer</title>
        <meta name="description" content="Analyze toothpaste ingredients for safer, smarter choices with PastePick" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}