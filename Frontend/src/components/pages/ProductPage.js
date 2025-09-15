'use client'

import { useState } from 'react'
import { ArrowLeft, Heart, Share, Star, Shield, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'

export default function ProductPage({ product, onBack }) {
  const [activeTab, setActiveTab] = useState('ingredients')

  // Sample product data - you'll replace this with real data
  const sampleProduct = product || {
    name: "Sensodyne Pronamel Gentle Whitening",
    brand: "Sensodyne",
    image: "🦷",
    overallScore: 85,
    scores: {
      dailyUse: { score: 92, status: "excellent", label: "Daily Use" },
      sensitivity: { score: 95, status: "excellent", label: "Sensitivity" },
      formula: { score: 78, status: "good", label: "Formula" }
    }
  }

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-50 border-green-200'
    if (score >= 75) return 'text-blue-600 bg-blue-50 border-blue-200'
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200'
    return 'text-red-600 bg-red-50 border-red-200'
  }

  const getScoreIcon = (score) => {
    if (score >= 90) return <CheckCircle size={16} />
    if (score >= 75) return <Shield size={16} />
    if (score >= 60) return <AlertTriangle size={16} />
    return <XCircle size={16} />
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'ingredients':
        return <IngredientsTab />
      case 'summary':
        return <SummaryTab product={sampleProduct} />
      case 'claims':
        return <ClaimsTab />
      case 'sources':
        return <SourcesTab />
      default:
        return <IngredientsTab />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="font-semibold text-gray-900">Product Analysis</h1>
          <div className="flex space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart size={20} />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Product Overview */}
      <div className="bg-white p-6">
        {/* Product Image and Basic Info */}
        <div className="flex items-start space-x-4 mb-6">
          <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
            {sampleProduct.image}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">{sampleProduct.name}</h2>
            <p className="text-gray-600 mb-3">{sampleProduct.brand}</p>
            <div className="flex items-center space-x-2">
              <Star className="text-yellow-500" size={16} />
              <span className="text-sm font-medium">4.5/5</span>
              <span className="text-sm text-gray-500">(1,234 reviews)</span>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="text-center mb-6">
          <div className="inline-flex flex-col items-center">
            <div className="text-4xl font-bold text-blue-600 mb-1">{sampleProduct.overallScore}</div>
            <div className="text-sm text-gray-600">Overall Safety Score</div>
            <div className="w-32 h-2 bg-gray-200 rounded-full mt-2">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${sampleProduct.overallScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="space-y-3">
          {Object.entries(sampleProduct.scores).map(([key, scoreData]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg border ${getScoreColor(scoreData.score)}`}>
                  {getScoreIcon(scoreData.score)}
                </div>
                <span className="font-medium text-gray-900">{scoreData.label}</span>
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900">{scoreData.score}</div>
                <div className="text-xs text-gray-500 capitalize">{scoreData.status}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="flex overflow-x-auto">
          {[
            { id: 'ingredients', label: 'Ingredients' },
            { id: 'summary', label: 'Summary' },
            { id: 'claims', label: 'Claims' },
            { id: 'sources', label: 'Sources' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 pb-20">
        {renderTabContent()}
      </div>
    </div>
  )
}

// Ingredients Tab Component
function IngredientsTab() {
  const ingredients = [
    {
      name: "Potassium Nitrate",
      purpose: "Desensitizing agent",
      safetyScore: 95,
      status: "safe",
      description: "Helps reduce tooth sensitivity by blocking pain signals"
    },
    {
      name: "Sodium Fluoride",
      purpose: "Anticavity agent",
      safetyScore: 90,
      status: "safe",
      description: "Prevents tooth decay and strengthens enamel"
    },
    {
      name: "Hydrated Silica",
      purpose: "Mild abrasive",
      safetyScore: 85,
      status: "good",
      description: "Helps remove plaque and surface stains gently"
    },
    {
      name: "Titanium Dioxide",
      purpose: "Whitening agent",
      safetyScore: 65,
      status: "caution",
      description: "Provides whitening effect but has some safety concerns"
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'safe': return 'bg-green-100 text-green-800'
      case 'good': return 'bg-blue-100 text-blue-800'
      case 'caution': return 'bg-amber-100 text-amber-800'
      case 'avoid': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Found {ingredients.length} ingredients • Analysis complete
      </div>
      
      {ingredients.map((ingredient, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{ingredient.name}</h3>
              <p className="text-sm text-gray-600">{ingredient.purpose}</p>
            </div>
            <div className="text-right">
              <div className="font-bold text-sm">{ingredient.safetyScore}/100</div>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(ingredient.status)}`}>
                {ingredient.status.charAt(0).toUpperCase() + ingredient.status.slice(1)}
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-700">{ingredient.description}</p>
        </div>
      ))}
    </div>
  )
}

// Summary Tab Component  
function SummaryTab({ product }) {
  return (
    <div className="p-4 space-y-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-3">Analysis Summary</h3>
        <p className="text-gray-700 text-sm leading-relaxed mb-4">
          {product.name} scores well overall with an {product.overallScore}/100 safety rating. 
          This toothpaste is particularly effective for sensitivity relief while providing 
          good cavity protection.
        </p>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-600" size={16} />
            <span className="text-sm">Excellent for daily use and sensitive teeth</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="text-green-600" size={16} />
            <span className="text-sm">Contains effective desensitizing ingredients</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="text-amber-600" size={16} />
            <span className="text-sm">Contains some ingredients requiring caution</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-3">Key Benefits</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Reduces tooth sensitivity within 2 weeks</li>
          <li>• Strengthens enamel and prevents cavities</li>
          <li>• Gentle whitening action</li>
          <li>• Suitable for daily use</li>
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <h3 className="font-semibold text-gray-900 mb-3">Recommendations</h3>
        <p className="text-sm text-gray-700">
          This product is recommended for people with sensitive teeth who want effective 
          cavity protection. Use twice daily for best results.
        </p>
      </div>
    </div>
  )
}

// Claims Tab Component
function ClaimsTab() {
  const claims = [
    {
      claim: "Clinically proven to relieve sensitivity",
      verified: true,
      evidence: "Multiple clinical studies support this claim"
    },
    {
      claim: "Gentle whitening",
      verified: true,
      evidence: "Contains mild abrasives for safe whitening"
    },
    {
      claim: "24/7 sensitivity protection",
      verified: false,
      evidence: "Limited evidence for continuous protection"
    },
    {
      claim: "Strengthens enamel",
      verified: true,
      evidence: "Fluoride content supports enamel strengthening"
    }
  ]

  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Analyzing {claims.length} product claims
      </div>
      
      {claims.map((item, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start space-x-3 mb-2">
            <div className={`w-3 h-3 rounded-full mt-1 ${item.verified ? 'bg-green-500' : 'bg-amber-500'}`}></div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.claim}</h3>
              <p className="text-sm text-gray-600 mt-1">{item.evidence}</p>
            </div>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${
              item.verified ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
            }`}>
              {item.verified ? 'Verified' : 'Limited Evidence'}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Sources Tab Component
function SourcesTab() {
  const sources = [
    {
      title: "FDA Approved Ingredients Database",
      type: "Government Database",
      reliability: "High",
      lastUpdated: "2024-01-15"
    },
    {
      title: "Journal of Clinical Dentistry",
      type: "Peer-reviewed Research",
      reliability: "High", 
      lastUpdated: "2023-12-08"
    },
    {
      title: "American Dental Association Guidelines",
      type: "Professional Guidelines",
      reliability: "High",
      lastUpdated: "2023-11-20"
    },
    {
      title: "Consumer Product Safety Database",
      type: "Safety Database",
      reliability: "Medium",
      lastUpdated: "2024-01-10"
    }
  ]

  const getReliabilityColor = (reliability) => {
    switch(reliability) {
      case 'High': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-amber-100 text-amber-800'
      case 'Low': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="p-4 space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Analysis based on {sources.length} reliable sources
      </div>
      
      {sources.map((source, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-medium text-gray-900 flex-1">{source.title}</h3>
            <span className={`text-xs px-2 py-1 rounded-full font-medium ${getReliabilityColor(source.reliability)}`}>
              {source.reliability} Reliability
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">{source.type}</p>
          <p className="text-xs text-gray-500">Last updated: {source.lastUpdated}</p>
        </div>
      ))}
      
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
        <p className="text-sm text-blue-800">
          Our analysis combines data from multiple trusted sources to provide 
          comprehensive ingredient safety assessments.
        </p>
      </div>
    </div>
  )
}