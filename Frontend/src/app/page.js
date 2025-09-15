'use client'

import { useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import HomePage from '../components/pages/HomePage'
import FavoritesPage from '../components/pages/FavoritesPage'
import ScanPage from '../components/pages/ScanPage'
import RecentPage from '../components/pages/RecentPage'
import SettingsPage from '../components/pages/SettingsPage'
import ProductPage from '../components/pages/ProductPage'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentView, setCurrentView] = useState('main') // 'main' or 'product'
  const [scannedProduct, setScannedProduct] = useState(null)

  const handleProductScanned = (product = null) => {
    setScannedProduct(product)
    setCurrentView('product')
  }

  const handleBackToMain = () => {
    setCurrentView('main')
    setScannedProduct(null)
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onProductScanned={handleProductScanned} />
      case 'favorites':
        return <FavoritesPage />
      case 'scan':
        return <ScanPage onProductScanned={handleProductScanned} />
      case 'recent':
        return <RecentPage onProductScanned={handleProductScanned} />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage onProductScanned={handleProductScanned} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {currentView === 'product' ? (
        <>
          <ProductPage 
            product={scannedProduct} 
            onBack={handleBackToMain} 
          />
          {/* Bottom Navigation - Always visible */}
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      ) : (
        <>
          {/* Page Content */}
          <main className="pt-safe-area">
            {renderPage()}
          </main>

          {/* Bottom Navigation */}
          <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}
    </div>
  )
}