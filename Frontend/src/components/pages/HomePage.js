import { Camera, Search, Shield, Sparkles, CheckCircle, TrendingUp } from 'lucide-react'

export default function HomePage({ onProductScanned }) {
  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
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
          Your smart companion for analyzing toothpaste ingredients
        </p>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <div className="text-2xl font-bold text-blue-600">2,847</div>
          <div className="text-xs text-gray-500">Products Scanned</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border text-center">
          <div className="text-2xl font-bold text-green-600">94%</div>
          <div className="text-xs text-gray-500">Safe Ingredients</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3 mb-6">
        <button 
          onClick={() => onProductScanned && onProductScanned()}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg flex items-center justify-center space-x-3 shadow-md"
        >
          <Camera size={20} />
          <span className="font-semibold">Quick Scan</span>
        </button>
        
        <button className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg flex items-center justify-center space-x-3 shadow-sm border">
          <Search size={20} />
          <span className="font-semibold">Search Products</span>
        </button>
      </div>

      {/* Features */}
      <div className="space-y-3">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start space-x-3">
            <Shield className="text-green-600 mt-1" size={18} />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Safety Analysis</h3>
              <p className="text-xs text-gray-600">Detailed ingredient safety ratings</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start space-x-3">
            <TrendingUp className="text-blue-600 mt-1" size={18} />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Smart Recommendations</h3>
              <p className="text-xs text-gray-600">Better alternatives based on your needs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}