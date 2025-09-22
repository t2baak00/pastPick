'use client'

import { useRef, useState, useEffect } from 'react'
import { X, Camera, Image, Smartphone } from 'lucide-react'
import { analyzeIngredients } from '../services/mockAnalysisService'
import { useLanguage } from '../contexts/LanguageContext'
import { useToast } from './ToastProvider'

export default function CameraScanner({ onClose, onCapture }) {
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  const [capturedImage, setCapturedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  
  const { t, translateIngredients } = useLanguage()
  const { 
    showSuccess, showError, showInfo, showWarning,
    showScanSuccess, showScanError, showBlurryImage, 
    showProductNotFound, showNetworkError, showAnalyzing,
    showCameraPermissionDenied
  } = useToast()

  // Detect if user is on mobile
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const mobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/.test(userAgent)
    setIsMobile(mobile)
  }, [])

  // Open camera with proper error handling
  const openCamera = () => {
    if (cameraInputRef.current) {
      try {
        if (isMobile) {
          cameraInputRef.current.click()
          showInfo('📷 Opening camera...')
        } else {
          showWarning('📱 Camera works best on mobile devices.')
          cameraInputRef.current.click()
        }
      } catch (error) {
        console.error('Camera error:', error)
        showCameraPermissionDenied()
      }
    } else {
      showError('❌ Camera not available. Please refresh the page.')
    }
  }

  // Open gallery
  const openGallery = () => {
    if (galleryInputRef.current) {
      galleryInputRef.current.click()
      showInfo('🖼️ Opening gallery...')
    } else {
      showError('❌ Gallery not available. Please refresh the page.')
    }
  }

  // Handle file selection with comprehensive validation
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    
    if (!file) {
      showWarning('⚠️ No file selected.')
      return
    }

    if (!file.type.startsWith('image/')) {
      showError('❌ Please select an image file (JPG, PNG, etc.)')
      return
    }

    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      showError('❌ Image too large. Please select a smaller image.')
      return
    }

    if (file.size < 1000) {
      showError('❌ Image appears corrupted. Please select a different image.')
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      setCapturedImage(e.target.result)
      showScanSuccess('✅ Image captured successfully!')
    }
    
    reader.onerror = () => {
      showError('❌ Failed to read image. Please try a different image.')
    }

    reader.readAsDataURL(file)
    event.target.value = ''
  }

  // Comprehensive analysis with all scenarios
  const analyzeImage = async () => {
    if (!capturedImage) {
      showError('❌ No image to analyze.')
      return
    }

    setIsAnalyzing(true)
    showAnalyzing()
    
    try {
      // Different scenarios with weights
      const scenarios = [
        { type: 'success', weight: 50, text: "INGREDIENTS: Potassium Nitrate, Sodium Fluoride, Hydrated Silica, Calcium Carbonate, Xylitol" },
        { type: 'success', weight: 10, text: "AINESOSAT: Natriumfluoridi, Kalsiumkarbonaatti, Ksylitoli, Mentoli" },
        { type: 'blurry', weight: 15 },
        { type: 'not_found', weight: 10 },
        { type: 'no_ingredients', weight: 5 },
        { type: 'network_error', weight: 5 },
        { type: 'ocr_failed', weight: 3 },
        { type: 'unknown_error', weight: 2 }
      ]

      // Weighted random selection
      const totalWeight = scenarios.reduce((sum, s) => sum + s.weight, 0)
      let random = Math.random() * totalWeight
      let selectedScenario = scenarios[0]

      for (const scenario of scenarios) {
        random -= scenario.weight
        if (random <= 0) {
          selectedScenario = scenario
          break
        }
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Handle different scenarios
      switch (selectedScenario.type) {
        case 'success':
          const translatedText = translateIngredients(selectedScenario.text)
          const result = await analyzeIngredients(translatedText)
          
          if (result.success) {
            showScanSuccess(`🎉 Analysis complete! Score: ${result.analysis.overallScore}/10`)
            
            const productData = {
              name: "Scanned Toothpaste Product",
              brand: "Unknown Brand",
              image: "📷",
              overallScore: result.analysis.overallScore,
              totalIngredients: result.analysis.totalIngredients,
              overallAssessment: result.analysis.overallAssessment,
              keyIngredients: result.analysis.keyIngredients,
              primaryConcerns: result.analysis.primaryConcerns,
              primaryBenefits: result.analysis.primaryBenefits,
              scoreBreakdown: result.analysis.scoreBreakdown,
              rawText: selectedScenario.text,
              translatedText: translatedText,
              capturedImage: capturedImage
            }
            
            setTimeout(() => onCapture && onCapture(productData), 1000)
          } else {
            showScanError('❌ Analysis failed. Please try again.')
          }
          break

        case 'blurry':
          showBlurryImage()
          break

        case 'not_found':
          showProductNotFound()
          break

        case 'no_ingredients':
          showError('❌ No ingredients found. Make sure to scan the ingredients list.')
          break

        case 'network_error':
          showNetworkError()
          break

        case 'ocr_failed':
          showError('❌ Could not read text. Please ensure text is clear.')
          break

        default:
          showScanError('❌ Unexpected error. Please try again.')
          break
      }

    } catch (error) {
      console.error('Analysis error:', error)
      showError('❌ System error. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null)
    showInfo('📷 Ready to scan again')
  }

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onClose}
            className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors"
          >
            <X size={24} />
          </button>
          <h1 className="text-white font-semibold">Scan Ingredients</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Hidden inputs */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

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
          // Captured image view
          <div className="w-full max-w-sm">
            <img
              src={capturedImage}
              alt="Captured ingredients"
              className="w-full h-64 object-cover rounded-lg mb-6 shadow-lg"
            />
            
            <div className="flex space-x-4">
              <button
                onClick={retakePhoto}
                disabled={isAnalyzing}
                className="flex-1 py-3 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Retake
              </button>
              <button
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
              >
                {isAnalyzing ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  'Analyze Ingredients'
                )}
              </button>
            </div>
          </div>
        ) : (
          // Camera selection view
          <div className="text-center w-full max-w-sm">
            <div className="mb-8">
              <Camera className="mx-auto text-white mb-4" size={64} />
              <h2 className="text-xl font-semibold text-white mb-2">
                Scan Ingredients
              </h2>
              <p className="text-gray-300 text-sm mb-4">
                Take a photo of the toothpaste ingredients list
              </p>
              
              {isMobile && (
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Smartphone className="text-green-400" size={16} />
                  <span className="text-green-400 text-sm">Mobile device detected</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <button
                onClick={openCamera}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold transition-colors shadow-lg"
              >
                <Camera size={24} />
                <span>{isMobile ? 'Open Camera' : 'Take Photo'}</span>
              </button>

              <button
                onClick={openGallery}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold transition-colors border border-white/30"
              >
                <Image size={24} />
                <span>Choose from Gallery</span>
              </button>
            </div>

            {/* Demo button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  setCapturedImage('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiMzNzQxNTEiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkRlbW8gSW1hZ2U8L3RleHQ+PC9zdmc+')
                  showInfo('🧪 Demo image loaded - try analyzing!')
                }}
                className="text-white/60 text-sm underline hover:text-white/80 transition-colors"
              >
                🧪 Demo: Test All Scenarios
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="text-white font-medium mb-2 text-sm">📱 Scanning Tips:</h3>
              <ul className="text-white/80 text-xs space-y-1 text-left">
                <li>• Ensure good lighting</li>
                <li>• Hold camera steady</li>
                <li>• Focus on ingredients list</li>
                <li>• Keep text clear and readable</li>
                <li>• Avoid shadows and glare</li>
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