import { Camera, Search, Shield, Sparkles, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-6">
      {/* Header with PastPick Branding */}
      <header className="text-center mb-8">
        <div className="flex items-center justify-center mb-3">
          <div className="bg-blue-600 p-2 rounded-xl mr-3">
            <Sparkles className="text-white" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Past<span className="text-blue-600">Pick</span>
          </h1>
        </div>
        <p className="text-gray-600 text-sm max-w-sm mx-auto">
          Your smart companion for analyzing toothpaste ingredients and making healthier choices
        </p>
      </header>

      {/* Main Action Buttons */}
      <div className="space-y-4 mb-8">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-lg transition-colors">
          <Camera size={24} />
          <span className="text-lg font-semibold">Scan Ingredients</span>
        </button>
        
        <button className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-md border hover:shadow-lg transition-shadow">
          <Search size={24} />
          <span className="text-lg font-semibold">Search Products</span>
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start space-x-3">
            <Shield className="text-green-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Safety Analysis</h3>
              <p className="text-sm text-gray-600">Get detailed safety ratings and health impact analysis</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start space-x-3">
            <CheckCircle className="text-blue-600 mt-1" size={20} />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Smart Recommendations</h3>
              <p className="text-sm text-gray-600">Find better alternatives based on your preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <p className="text-xs text-gray-500 mb-4">
          Powered by AI-driven ingredient analysis
        </p>
        <button className="text-blue-600 text-sm font-medium">
          Learn how PastPick works →
        </button>
      </div>
    </div>
  )
}