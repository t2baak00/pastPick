'use client'

import { useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import HomePage from '../components/pages/HomePage'
import FavoritesPage from '../components/pages/FavoritesPage'
import ScanPage from '../components/pages/ScanPage'
import RecentPage from '../components/pages/RecentPage'
import SettingsPage from '../components/pages/SettingsPage'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage />
      case 'favorites':
        return <FavoritesPage />
      case 'scan':
        return <ScanPage />
      case 'recent':
        return <RecentPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Page Content */}
      <main className="pt-safe-area">
        {renderPage()}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  )
}