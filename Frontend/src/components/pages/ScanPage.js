import { Camera, Upload, Type, Zap } from 'lucide-react'

export default function ScanPage() {
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
            <p className="text-gray-500 text-sm">Camera preview will appear here</p>
          </div>
        </div>
      </div>

      {/* Scan Options */}
      <div className="space-y-4 mb-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-lg transition-colors">
          <Camera size={24} />
          <span className="text-lg font-semibold">Start Camera Scan</span>
        </button>
        
        <button className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-md border hover:shadow-lg transition-shadow">
          <Upload size={24} />
          <span className="text-lg font-semibold">Upload from Gallery</span>
        </button>
        
        <button className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl flex items-center justify-center space-x-3 shadow-md border hover:shadow-lg transition-shadow">
          <Type size={24} />
          <span className="text-lg font-semibold">Type Ingredients</span>
        </button>
      </div>

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