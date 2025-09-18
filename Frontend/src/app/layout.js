import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '../components/Providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'PastPick - Smart Toothpaste Analyzer',
  description: 'Analyze toothpaste ingredients for safer, smarter choices',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}