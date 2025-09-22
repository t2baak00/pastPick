import { Home, Heart, Scan, Clock, Settings } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'

export default function BottomNavigation({ activeTab, onTabChange, onStartCamera }) {
  const { t } = useLanguage()
  const { isDark } = useTheme()
  
  const tabs = [
    { id: 'home', label: t('home'), icon: Home },
    { id: 'favorites', label: t('favorites'), icon: Heart },
    { id: 'scan', label: t('scan'), icon: Scan },
    { id: 'recent', label: t('recent'), icon: Clock },
    { id: 'settings', label: t('settings'), icon: Settings },
  ]

  return (
    <div className={`fixed bottom-0 left-0 right-0 border-t px-2 py-2 safe-area-pb transition-colors duration-300 ${
      isDark 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
    }`}>
      <div className="flex justify-around items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          const isScan = tab.id === 'scan'
          
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (isScan && onStartCamera) {
                  onStartCamera()
                } else {
                  onTabChange(tab.id)
                }
              }}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-all duration-200 ${
                isScan 
                  ? 'transform -translate-y-2' 
                  : ''
              }`}
            >
              {/* Special styling for scan button */}
              {isScan ? (
                <div className={`p-3 rounded-full shadow-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  <Icon size={24} />
                </div>
              ) : (
                <div className={`p-2 rounded-lg transition-colors ${
                  isActive 
                    ? isDark
                      ? 'text-blue-400 bg-blue-900/50' 
                      : 'text-blue-600 bg-blue-50'
                    : isDark
                      ? 'text-gray-400 hover:text-gray-300'
                      : 'text-gray-500 hover:text-gray-700'
                }`}>
                  <Icon size={20} />
                </div>
              )}
              
              {/* Label */}
              <span className={`text-xs mt-1 font-medium transition-colors ${
                isActive 
                  ? isDark
                    ? 'text-blue-400' 
                    : 'text-blue-600'
                  : isDark
                    ? 'text-gray-400'
                    : 'text-gray-500'
              } ${isScan ? 'text-blue-600' : ''}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}