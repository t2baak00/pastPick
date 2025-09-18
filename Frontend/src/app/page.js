'use client'

import { useState } from 'react'
import BottomNavigation from '../components/BottomNavigation'
import HomePage from '../components/pages/HomePage'
import FavoritesPage from '../components/pages/FavoritesPage'
import ScanPage from '../components/pages/ScanPage'
import RecentPage from '../components/pages/RecentPage'
import SettingsPage from '../components/pages/SettingsPage'
import ProductPage from '../components/pages/ProductPage'
import CameraScanner from '../components/CameraScanner'

export default function Home() {
  const [activeTab, setActiveTab] = useState('home')
  const [currentView, setCurrentView] = useState('main') // 'main', 'product', or 'camera'
  const [scannedProduct, setScannedProduct] = useState(null)

  const handleProductScanned = (product = null) => {
    setScannedProduct(product)
    setCurrentView('product')
  }

  const handleStartCamera = () => {
    setCurrentView('camera')
  }

  const handleCameraCapture = (imageData) => {
    // Here you would process the captured image
    // For now, we'll simulate the scan result
    const mockProduct = {
      name: "Scanned Toothpaste Product",
      brand: "Unknown Brand",
      image: "📷",
      overallScore: 78
    }
    setScannedProduct(mockProduct)
    setCurrentView('product')
  }

  const handleCameraClose = () => {
    setCurrentView('main')
  }

  const handleBackToMain = () => {
    setCurrentView('main')
    setScannedProduct(null)
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return <HomePage onProductScanned={handleProductScanned} onStartCamera={handleStartCamera} />
      case 'favorites':
        return <FavoritesPage />
      case 'scan':
        return <ScanPage onProductScanned={handleProductScanned} onStartCamera={handleStartCamera} />
      case 'recent':
        return <RecentPage onProductScanned={handleProductScanned} />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage onProductScanned={handleProductScanned} onStartCamera={handleStartCamera} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {currentView === 'product' ? (
        <ProductPage 
          product={scannedProduct} 
          onBack={handleBackToMain} 
        />
      ) : currentView === 'camera' ? (
        <CameraScanner 
          onClose={handleCameraClose}
          onCapture={handleCameraCapture}
        />
      ) : (
        <>
          {/* Page Content */}
          <main className="pt-safe-area">
            {renderPage()}
          </main>

          {/* Bottom Navigation */}
          <BottomNavigation 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
            onStartCamera={handleStartCamera}
          />
        </>
      )}
    </div>
  )
}