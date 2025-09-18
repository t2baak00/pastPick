'use client'

import { useRef, useState, useEffect } from 'react'
import { X, Camera, Image, Smartphone, Zap, ZapOff } from 'lucide-react'
import { analyzeIngredients, sampleIngredientTexts } from '../services/mockAnalysisService'
import { useLanguage } from '../contexts/LanguageContext'
import { useToast } from '../components/ToastProvider'

export default function SimpleCameraScanner({ onClose, onCapture }) {
  const cameraInputRef = useRef(null)
  const galleryInputRef = useRef(null)
  
  // State management
  const [capturedImage, setCapturedImage] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [currentStep, setCurrentStep] = useState('select') // 'select', 'captured', 'analyzing', 'complete'
  
  // Hooks
  const { t, translateIngredients } = useLanguage()
  const { showSuccess, showError, showInfo, showWarning } = useToast()

  // Detect mobile device on component mount
  useEffect(() => {
    const detectMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ['android', 'webos', 'iphone', 'ipad', 'ipod', 'blackberry', 'iemobile', 'opera mini']
      const isMobileDevice = mobileKeywords.some(keyword => userAgent.includes(keyword))
      const isSmallScreen = window.innerWidth <= 768
      
      setIsMobile(isMobileDevice || isSmallScreen)
    }

    detectMobile()
    window.addEventListener('resize', detectMobile)
    return () => window.removeEventListener('resize', detectMobile)
  }, [])

  // Open device camera
  const openCamera = () => {
    if (!cameraInputRef.current) return

    try {
      if (isMobile) {
        // Set camera attributes for mobile
        cameraInputRef.current.setAttribute('capture', 'environment')
        cameraInputRef.current.setAttribute('accept', 'image/*')
        cameraInputRef.current.click()
        showInfo(t('scanningInProgress'))
      } else {
        showWarning(t('cameraWorksBesetMobile'))
        // Still allow desktop users to select files
        cameraInputRef.current.click()
      }
    } catch (error) {
      console.error('Camera error:', error)
      showError(t('cameraError'))
    }
  }

  // Open gallery/file picker
  const openGallery = () => {
    if (!galleryInputRef.current) return

    try {
      galleryInputRef.current.click()
      showInfo(t('chooseFromGallery'))
    } catch (error) {
      console.error('Gallery error:', error)
      showError('Unable to open gallery')
    }
  }

  // Handle file selection from camera or gallery
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    
    if (!file) {
      showWarning('No file selected')
      return
    }

    if (!file.type.startsWith('image/')) {
      showError('Please select a valid image file')
      return
    }

    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      showError('Image too large. Please select an image smaller than 10MB')
      return
    }

    const reader = new FileReader()
    
    reader.onload = (e) => {
      setCapturedImage(e.target.result)
      setCurrentStep('captured')
      showSuccess(t('scanSuccessful'))
    }
    
    reader.onerror = () => {
      showError('Error reading image file')
    }

    reader.readAsDataURL(file)
    
    // Reset input value to allow selecting the same file again
    event.target.value = ''
  }

  // Simulate OCR and analyze ingredients
  const analyzeImage = async () => {
    if (!capturedImage) {
      showError('No image to analyze')
      return
    }

    setIsAnalyzing(true)
    setCurrentStep('analyzing')
    showInfo(t('analyzingImage'))
    
    try {
      // Simulate different ingredient texts including foreign languages
      const mockIngredientTexts = [
        // English ingredients
        "INGREDIENTS: Potassium Nitrate, Sodium Fluoride, Hydrated Silica, Titanium Dioxide, SLS, Natural Mint Flavor, Xylitol",
        "Ingredients: Water, Calcium Carbonate, Glycerin, Sodium Lauryl Sulfate, Natural Flavors, Cellulose Gum, Sodium Saccharin",
        
        // Finnish ingredients
        "AINESOSAT: Natriumfluoridi, Kalsiumkarbonaatti, Natriumlauryylisulfaatti, Luonnolliset aromit, Mentoli, Ksylitoli, Glyseriini",
        "Ainesosat: Vesi, Hydratoitu piidioksidi, Kaliumnitraatti, Titaanidioksidi, Sorbitoli, Selluloosakumi",
        
        // German ingredients
        "INHALTSSTOFFE: Natriumfluorid, Kalziumkarbonat, Natriumlaurylsulfat, Titandioxid, Glyzerin, Natürliche Aromen",
        
        // Mixed/challenging cases
        "Ingredients: Potassium Nitrate 5%, SLS, Titanium Dioxide, Natural Flavors, Preservatives",
        "AINESOSAT: Natriumfluoridi 0.32%, Kalsiumkarbonaatti, Mentoli, Artificial Colors"
      ]
      
      // Select random sample for demo
      const randomSample = mockIngredientTexts[Math.floor(Math.random() * mockIngredientTexts.length)]
      
      // Show which text was "detected"
      console.log('Mock OCR detected:', randomSample)
      
      // Translate ingredients from foreign languages to English
      const translatedText = translateIngredients(randomSample)
      console.log('Translated to:', translatedText)
      
      showInfo(t('processingResults'))
      
      // Simulate OCR processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Analyze the translated ingredients
      const result = await analyzeIngredients(translatedText)
      
      if (result.success) {
        setAnalysisResult(result.analysis)
        setCurrentStep('complete')
        
        // Show success message with score
        const scoreMessage = `${t('analysisComplete')} - ${t('overallScore')}: ${result.analysis.overallScore}/10`
        showSuccess(scoreMessage, 6000) // Show longer for important result
        
        // Create complete product data object
        const productData = {
          // Basic info
          name: "Scanned Toothpaste Product",
          brand: "Unknown Brand",
          image: "📷",
          
          // Analysis results
          overallScore: result.analysis.overallScore,
          totalIngredients: result.analysis.totalIngredients,
          overallAssessment: result.analysis.overallAssessment,
          keyIngredients: result.analysis.keyIngredients,
          primaryConcerns: result.analysis.primaryConcerns,
          primaryBenefits: result.analysis.primaryBenefits,
          scoreBreakdown: result.analysis.scoreBreakdown,
          ingredients: result.analysis.ingredients,
          
          // Debug info
          rawText: randomSample,
          translatedText: translatedText,
          capturedImage: capturedImage,
          analysisTimestamp: new Date().toISOString()
        }
        
        // Pass complete data to parent component
        setTimeout(() => {
          onCapture && onCapture(productData)
        }, 1000) // Small delay to show success message
        
      } else {
        // Handle analysis failure
        setCurrentStep('captured')
        const errorMessage = result.error || t('scanError')
        showError(errorMessage)
        console.error('Analysis failed:', result.error)
      }
      
    } catch (error) {
      setCurrentStep('captured')
      const errorMessage = `${t('scanError')}: ${error.message}`
      showError(errorMessage)
      console.error('Analysis error:', error)
    } finally {
      setIsAnalyzing(false)
    }
  }

  // Retake photo - reset to selection state
  const retakePhoto = () => {
    setCapturedImage(null)
    setAnalysisResult(null)
    setCurrentStep('select')
    setIsAnalyzing(false)
    showInfo('Ready to scan again')
  }

  // Demo function for testing without camera
  const runDemo = () => {
    // Create mock image data
    const mockImageData = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y4ZmFmYyIvPjx0ZXh0IHg9IjE1MCIgeT0iNzAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzM3NDE1MSIgdGV4dC1hbmNob3I9Im1pZGRsZSI+SW5ncmVkaWVudHMgTGlzdDwvdGV4dD48dGV4dCB4PSIxNTAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjNmI3Mjg0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5Tb2RpdW0gRmx1b3JpZGU8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSIxMjAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4NCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+Q2FsY2l1bSBDYXJib25hdGU8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSIxNDAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzZiNzI4NCIgdGV4dC1hbmNob3I9Im1pZGRsZSI+UG90YXNzaXVtIE5pdHJhdGU8L3RleHQ+PHRleHQgeD0iMTUwIiB5PSIxNzAiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMCIgZmlsbD0iIzllYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+RGVtbyBJbWFnZTwvdGV4dD48L3N2Zz4='
    
    setCapturedImage(mockImageData)
    setCurrentStep('captured')
    showSuccess('Demo: ' + t('scanSuccessful'))
  }

  // Render different UI based on current step
  const renderContent = () => {
    switch (currentStep) {
      case 'select':
        return renderSelectionScreen()
      case 'captured':
        return renderCapturedScreen()
      case 'analyzing':
        return renderAnalyzingScreen()
      case 'complete':
        return renderCompleteScreen()
      default:
        return renderSelectionScreen()
    }
  }

  // Initial selection screen
  const renderSelectionScreen = () => (
    <div className="text-center w-full max-w-sm">
      <div className="mb-8">
        <Camera className="mx-auto text-white mb-4" size={64} />
        <h2 className="text-xl font-semibold text-white mb-2">
          {t('scanIngredients')}
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          {t('analyzeIngredients')}
        </p>
        
        {/* Mobile detection indicator */}
        {isMobile && (
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Smartphone className="text-green-400" size={16} />
            <span className="text-green-400 text-sm">{t('mobileDetected')}</span>
          </div>
        )}
      </div>

      {/* Main action buttons */}
      <div className="space-y-4 mb-8">
        <button
          onClick={openCamera}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold transition-colors shadow-lg"
        >
          <Camera size={24} />
          <span>{isMobile ? t('openCamera') : t('takePhoto')}</span>
        </button>

        <button
          onClick={openGallery}
          className="w-full bg-white/20 hover:bg-white/30 text-white py-4 px-6 rounded-lg flex items-center justify-center space-x-3 font-semibold transition-colors border border-white/30"
        >
          <Image size={24} />
          <span>{t('chooseFromGallery')}</span>
        </button>
      </div>

      {/* Demo button */}
      <div className="mb-8">
        <button
          onClick={runDemo}
          className="text-white/60 text-sm underline hover:text-white/80 transition-colors"
        >
          🧪 Demo: Skip to Analysis
        </button>
      </div>

      {/* Helpful instructions */}
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        <h3 className="text-white font-medium mb-2 text-sm">📱 {t('scanningTips')}:</h3>
        <ul className="text-white/80 text-xs space-y-1 text-left">
          <li>• {t('scanTip1')}</li>
          <li>• {t('scanTip2')}</li>
          <li>• {t('scanTip3')}</li>
          <li>• {t('scanTip4')}</li>
          <li>• {t('scanTip5')}</li>
          {!isMobile && (
            <li className="text-yellow-300">• {t('cameraWorksBesetMobile')}</li>
          )}
        </ul>
      </div>
    </div>
  )

  // Screen showing captured image with action buttons
  const renderCapturedScreen = () => (
    <div className="w-full max-w-sm">
      <div className="mb-6">
        <img
          src={capturedImage}
          alt="Captured ingredients"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </div>
      
      <div className="flex space-x-3 mb-4">
        <button
          onClick={retakePhoto}
          className="flex-1 py-3 px-4 bg-white/20 hover:bg-white/30 text-white rounded-lg font-medium transition-colors border border-white/30"
        >
          {t('retake')}
        </button>
        <button
          onClick={analyzeImage}
          disabled={isAnalyzing}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors shadow-lg"
        >
          {t('analyzeIngredientsCTA')}
        </button>
      </div>
      
      <p className="text-white/80 text-sm text-center">
        Review your image and click analyze to get ingredient safety scores
      </p>
    </div>
  )

  // Analysis in progress screen
  const renderAnalyzingScreen = () => (
    <div className="text-center w-full max-w-sm">
      <div className="mb-8">
        {/* Animated analysis icon */}
        <div className="relative mx-auto mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto"></div>
          <Camera className="absolute inset-0 m-auto text-white" size={24} />
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">
          {t('analyzing')}
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          {t('processingResults')}
        </p>
      </div>

      {/* Progress steps */}
      <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
        <div className="space-y-3 text-sm text-white/80">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Reading ingredient text...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Translating foreign ingredients...</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span>Calculating safety scores...</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Analysis complete screen
  const renderCompleteScreen = () => (
    <div className="text-center w-full max-w-sm">
      <div className="mb-6">
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2">
          {t('analysisComplete')}
        </h2>
        
        {analysisResult && (
          <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg mb-4">
            <div className="text-3xl font-bold text-blue-400 mb-1">
              {analysisResult.overallScore}/10
            </div>
            <div className="text-white/80 text-sm">
              {analysisResult.overallAssessment}
            </div>
          </div>
        )}
      </div>
      
      <p className="text-gray-300 text-sm">
        Redirecting to detailed analysis...
      </p>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black z-50">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent">
        <div className="flex items-center justify-between p-4 pt-12">
          <button
            onClick={onClose}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors"
            disabled={isAnalyzing}
          >
            <X size={24} />
          </button>
          <h1 className="text-white font-semibold">{t('scanToothpaste')}</h1>
          <div className="w-10"></div>
        </div>
      </div>

      {/* Hidden file inputs */}
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

      {/* Main content area */}
      <div className="flex flex-col items-center justify-center h-full p-6">
        {renderContent()}
      </div>

      {/* Footer info */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="text-center">
          <p className="text-white/60 text-xs">
            Supports: English, Finnish, German, French ingredients
          </p>
        </div>
      </div>
    </div>
  )
}