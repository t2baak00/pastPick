'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, Type, Zap, X } from 'lucide-react'

export default function ScanPage({ onProductScanned }) {
  const [showCamera, setShowCamera] = useState(false)
  const [showTextInput, setShowTextInput] = useState(false)
  const [ingredients, setIngredients] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  // Camera Functions
  const requestCameraPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment' // Use back camera on mobile
        } 
      })
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setShowCamera(true)
      }
    } catch (error) {
      alert('Camera permission denied or not available. Please allow camera access to scan ingredients.')
      console.error('Camera error:', error)
    }
  }

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject
      const tracks = stream.getTracks()
      tracks.forEach(track => track.stop())
    }
    setShowCamera(false)
  }

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      const context = canvas.getContext('2d')
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      context.drawImage(video, 0, 0)
      
      // Simulate processing
      setIsProcessing(true)
      stopCamera()
      
      // Simulate API call delay
      setTimeout(() => {
        setIsProcessing(false)
        onProductScanned && onProductScanned()
      }, 2000)
    }
  }

  // Gallery Functions
  const openGallery = () => {
    if (fileInputRef.current) {
      fileInputRef.current.accept = 'image/*'
      fileInputRef.current.click()
    }
  }

  const handleImageSelect = (event) => {
    const file = event.target.files[0]
    if (file && file.type.startsWith('image/')) {
      // Simulate processing
      setIsProcessing(true)
      
      // Simulate API call delay
      setTimeout(() => {
        setIsProcessing(false)
        onProductScanned && onProductScanned()
      }, 2000)
    } else {
      alert('Please select a valid image file')
    }
  }

  // Text Input Functions
  const handleTextSubmit = () => {
    if (ingredients.trim()) {
      setIsProcessing(true)
      
      // Simulate API call delay
      setTimeout(() => {
        setIsProcessing(false)
        setShowTextInput(false)
        setIngredients('')
        onProductScanned && onProductScanned()
      }, 1500)
    } else {
      alert('Please enter some ingredients')
    }
  }

  if (isProcessing) {
    return (
      <div className="pb-20 px-4 py-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Ingredients...</h2>
          <p className="text-gray-600 text-sm">This may take a few seconds</p>
        </div>
      </div>
    )
  }

  if (showTextInput) {
    return (
      <div className="pb-20 px-4 py-6">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Type Ingredients</h1>
          <button 
            onClick={() => setShowTextInput(false)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={24} />
          </button>
        </header>

        {/* Text Input Area */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Enter ingredients list:
            </label>
            <textarea
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Type the ingredients here, separated by commas or line breaks..."
              className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              autoFocus
            />
          </div>

          <button
            onClick={handleTextSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
          >
            Analyze Ingredients
          </button>
        </div>

        {/* Tips */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-start space-x-3">
            <Type className="text-blue-600 mt-1" size={16} />
            <div>
              <h3 className="font-semibold text-blue-900 text-sm mb-1">Typing Tips</h3>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Separate ingredients with commas or new lines</li>
                <li>• Include exact names as written on packaging</li>
                <li>• Do not worry about spelling - we will match similar names</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showCamera) {
    return (
      <div className="pb-20 relative">
        {/* Camera View */}
        <div className="relative h-screen">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          
          {/* Camera Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-20">
            {/* Header */}
            <div className="absolute top-6 left-4 right-4 flex items-center justify-between">
              <button
                onClick={stopCamera}
                className="p-3 bg-black bg-opacity-50 text-white rounded-full"
              >
                <X size={24} />
              </button>
              <h1 className="text-white font-semibold">Position ingredients list in frame</h1>
              <div className="w-12"></div>
            </div>

            {/* Scanning Frame */}
            <div className="absolute inset-x-8 top-1/2 transform -translate-y-1/2">
              <div className="border-2 border-white rounded-lg h-48 relative">
                <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded">
                    Align ingredients list here
                  </p>
                </div>
              </div>
            </div>

            {/* Capture Button */}
            <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
              <button
                onClick={capturePhoto}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg border-4 border-white"
              >
                <div className="w-16 h-16 bg-blue-600 rounded-full"></div>
              </button>
            </div>

            {/* Instructions */}
            <div className="absolute bottom-8 left-4 right-4">
              <div className="bg-black bg-opacity-50 p-3 rounded-lg">
                <p className="text-white text-sm text-center">
                  Hold steady and tap the button to capture
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden canvas for image capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    )
  }

  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Scan Product</h1>
        <p className="text-gray-600 text-sm">Analyze toothpaste ingredients instantly</p>
      </header>

      {/* Camera Preview Area */}
      <div className="mb-8">
        <div className="bg-gray-100 rounded-xl h-64 flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center">
            <Camera className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-500 text-sm">Ready to scan ingredients</p>
          </div>
        </div>
      </div>

      {/* Scan Options */}
      <div className="space-y-4 mb-6">
        <button 
          onClick={requestCameraPermission}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-lg transition-colors"
        >
          <Camera size={24} />
          <span className="text-lg font-semibold">Start Camera Scan</span>
        </button>
        
        <button 
          onClick={openGallery}
          className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-md border hover:shadow-lg transition-shadow"
        >
          <Upload size={24} />
          <span className="text-lg font-semibold">Upload from Gallery</span>
        </button>
        
        <button 
          onClick={() => setShowTextInput(true)}
          className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-md border hover:shadow-lg transition-shadow"
        >
          <Type size={24} />
          <span className="text-lg font-semibold">Type Ingredients</span>
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden"
      />

      {/* Quick Tips */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-start space-x-3">
          <Zap className="text-blue-600 mt-1" size={16} />
          <div>
            <h3 className="font-semibold text-blue-900 text-sm mb-1">Scanning Tips</h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>• Ensure good lighting</li>
              <li>• Hold camera steady</li>
              <li>• Focus on ingredients list</li>
              <li>• Keep text clear and readable</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}