'use client'

import { useRef, useState } from 'react'
import { X, Camera, Image } from 'lucide-react'

export default function CameraScanner({ onClose, onCapture }) {
  const fileInputRef = useRef(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  // Trigger native camera
  const openCamera = () => {
    // Ensure the input has the correct attributes for camera
    if (fileInputRef.current) {
      fileInputRef.current.setAttribute('capture', 'environment')
      fileInputRef.current.setAttribute('accept', 'image/*')
      fileInputRef.current.click()
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
  }

  // Analyze image
  const analyzeImage = async () => {
    setIsAnalyzing(true)
    
    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      onCapture && onCapture(capturedImage)
    }, 2000)
  }

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
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

      {/* Hidden file input for camera */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
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
                {isAnalyzing ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
        ) : (
          // Show camera button
          <div className="text-center">
            <div className="mb-8">
              <Camera className="mx-auto text-white mb-4" size={64} />
              <h2 className="text-xl font-semibold text-white mb-2">
                Scan Ingredients
              </h2>
              <p className="text-gray-300 text-sm">
                Take a photo of the toothpaste ingredients
              </p>
            </div>

            <div className="space-y-4 w-full max-w-sm">
              <button
                onClick={openCamera}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold"
              >
                <Camera size={24} />
                <span>Open Camera</span>
              </button>

              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.removeAttribute('capture')
                    fileInputRef.current.setAttribute('accept', 'image/*')
                    fileInputRef.current.click()
                  }
                }}
                className="w-full bg-white/20 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold"
              >
                <Image size={24} />
                <span>Choose from Gallery</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}