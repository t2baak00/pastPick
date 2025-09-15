import { Clock, Shield, AlertTriangle, CheckCircle } from 'lucide-react'

export default function RecentPage({ onProductScanned }) {
  const recentScans = [
    {
      id: 1,
      name: "Crest 3D White",
      brand: "Crest",
      scannedAt: "2 hours ago",
      safetyScore: 78,
      status: "warning",
      concerns: 2
    },
    {
      id: 2,
      name: "Sensodyne Repair",
      brand: "Sensodyne",
      scannedAt: "1 day ago",
      safetyScore: 95,
      status: "safe",
      concerns: 0
    },
    {
      id: 3,
      name: "Colgate Whitening",
      brand: "Colgate",
      scannedAt: "2 days ago",
      safetyScore: 85,
      status: "good",
      concerns: 1
    },
    {
      id: 4,
      name: "Tom's Natural Clean",
      brand: "Tom's of Maine",
      scannedAt: "3 days ago",
      safetyScore: 98,
      status: "excellent",
      concerns: 0
    }
  ]

  const getStatusColor = (status) => {
    switch(status) {
      case 'excellent':
      case 'safe': return 'text-green-600 bg-green-50 border-green-200'
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200'
      case 'warning': return 'text-amber-600 bg-amber-50 border-amber-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'excellent':
      case 'safe': return <CheckCircle size={16} />
      case 'good': return <Shield size={16} />
      case 'warning': return <AlertTriangle size={16} />
      default: return <Clock size={16} />
    }
  }

  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Recent Scans</h1>
        <p className="text-gray-600 text-sm">Your scanning history</p>
      </header>

      {/* Recent Scans List */}
      {recentScans.length > 0 ? (
        <div className="space-y-4">
          {recentScans.map((scan) => (
            <div key={scan.id} className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900">{scan.name}</h3>
                  <p className="text-sm text-gray-600">{scan.brand}</p>
                </div>
                <span className="text-xs text-gray-500">{scan.scannedAt}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getStatusColor(scan.status)}`}>
                    {getStatusIcon(scan.status)}
                    <span>{scan.safetyScore}% Safe</span>
                  </div>
                  
                  {scan.concerns > 0 && (
                    <div className="text-xs text-amber-600">
                      {scan.concerns} concern{scan.concerns > 1 ? 's' : ''}
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => onProductScanned && onProductScanned()}
                  className="text-blue-600 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Clock className="mx-auto text-gray-300 mb-4" size={48} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No recent scans</h3>
          <p className="text-gray-600 text-sm">Your scan history will appear here</p>
        </div>
      )}
    </div>
  )
}