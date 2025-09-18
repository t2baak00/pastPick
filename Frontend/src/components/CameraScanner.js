'use client'

import { useRef, useState, useEffect } from 'react'
import { X, Camera, Image, Smartphone } from 'lucide-react'

export default function CameraScanner({ onClose, onCapture }) {
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect if user is on mobile
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
    setIsMobile(mobile)
  }, [])

  // Open camera (different approaches for different devices)
  const openCamera = () => {
    if (cameraInputRef.current) {
      // Force camera on mobile devices
      if (isMobile) {
        cameraInputRef.current.click()
      } else {
        // For desktop, show a message
        alert('Camera access is best on mobile devices. Please use "Choose from Gallery" on desktop.')
      }
    }
  }

  // Open gallery
  const openGallery = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click()
    }
  }

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCapturedImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
    
    // Reset input
    event.target.value = ''
  }

  // Analyze image
  const analyzeImage = async () => {
    setIsAnalyzing(true)
    
    setTimeout(() => {
      setIsAnalyzing(false)
      onCapture && onCapture(capturedImage)
    }, 2000)
  }

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null)
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onClose}
            className="p-2 bg-white/20 rounded-full text-white"
          >
            <X size={24} />
          </button>
          <h1 className="text-white font-semibold">Scan Toothpaste</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Camera input - specifically for camera */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Gallery input - specifically for gallery */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-full p-6">
        {capturedImage ? (
          // Show captured image
          <div className="w-full max-w-sm">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            
            <div className="flex space-x-4">
              <button
                onClick={retakePhoto}
                className="flex-1 py-3 px-4 bg-white/20 text-white rounded-lg font-medium"
              >
                Retake
              </button>
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze'
                )}
              </button>
            </div>
          </div>
        ) : (
          // Show camera options
          <div className="text-center w-full max-w-sm">
            <div className="mb-8">
              <Camera className="mx-auto text-white mb-4" size={64} />
              <h2 className="text-xl font-semibold text-white mb-2">
                Scan Ingredients
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Take a photo of the toothpaste ingredients
              </p>
              
              {/* Mobile indicator */}
              {isMobile && (
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Smartphone className="text-green-400" size={16} />
                  <span className="text-green-400 text-sm">Mobile device detected</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              {/* Camera Button */}
              <button
                onClick={openCamera}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold transition-colors"
              >
                <Camera size={24} />
                <span>{isMobile ? 'Open Camera' : 'Take Photo'}</span>
              </button>

              {/* Gallery Button */}
              <button
                onClick={openGallery}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold transition-colors"
              >
                <Image size={24} />
                <span>Choose from Gallery</span>
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2 text-sm">📱 Camera Tips:</h3>
              <ul className="text-white/80 text-xs space-y-1 text-left">
                <li>• Make sure you're using a mobile device</li>
                <li>• Allow camera permissions when prompted</li>
                <li>• Point camera at ingredients list</li>
                <li>• Ensure good lighting and focus</li>
                {!isMobile && (
                  <li className="text-yellow-300">• Camera works best on mobile devices</li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}