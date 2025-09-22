import { User, Bell, Shield, HelpCircle, Info, ChevronRight, Moon, Sun, Monitor } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useTheme } from '../../contexts/ThemeContext'
import { DetailedLanguageSelector } from '../LanguageSelector'

// Theme Selector Component
function ThemeSelector() {
  const { theme, changeTheme, isDark } = useTheme()
  const { t } = useLanguage()

  const themes = [
    { 
      id: 'light', 
      name: t('lightTheme'), 
      icon: Sun, 
      description: 'Light appearance'
    },
    { 
      id: 'dark', 
      name: t('darkTheme'), 
      icon: Moon, 
      description: 'Dark appearance'
    },
    { 
      id: 'system', 
      name: t('systemTheme'), 
      icon: Monitor, 
      description: 'Follow system preference'
    }
  ]

  return (
    <div className={`p-4 rounded-lg border mb-6 transition-colors duration-300 ${
      isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    }`}>
      <h3 className={`font-semibold mb-3 transition-colors duration-300 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        {t('darkMode')}
      </h3>
      
      <div className="space-y-2">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          return (
            <button
              key={themeOption.id}
              onClick={() => changeTheme(themeOption.id)}
              className={`
                w-full p-3 rounded-lg border text-left transition-all
                ${theme === themeOption.id
                  ? 'border-blue-500 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:border-gray-400 text-gray-900 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon size={18} className={
                    theme === themeOption.id 
                      ? isDark ? 'text-blue-400' : 'text-blue-600'
                      : isDark ? 'text-gray-400' : 'text-gray-600'
                  } />
                  <div>
                    <div className="font-medium">{themeOption.name}</div>
                    <div className={`text-sm ${
                      theme === themeOption.id
                        ? isDark ? 'text-blue-300' : 'text-blue-600'
                        : isDark ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      {themeOption.description}
                    </div>
                  </div>
                </div>
                
                {theme === themeOption.id && (
                  <div className={`w-2 h-2 rounded-full ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`} />
                )}
              </div>
            </button>
          )
        })}
      </div>
      
      <div className={`mt-3 text-xs transition-colors duration-300 ${
        isDark ? 'text-gray-400' : 'text-gray-500'
      }`}>
        Current theme: {themes.find(t => t.id === theme)?.name}
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const { t } = useLanguage()
  const { isDark } = useTheme()

  const settingSections = [
    {
      title: t('account'),
      items: [
        { icon: User, label: t('profile'), value: t('updateInfo') },
        { icon: Bell, label: t('notifications'), value: t('manageAlerts') },
      ]
    },
    {
      title: t('preferences'),
      items: [
        { icon: Shield, label: t('safetyThreshold'), value: t('highSensitivity') },
      ]
    },
    {
      title: t('support'),
      items: [
        { icon: HelpCircle, label: t('helpCenter'), value: t('getSupport') },
        { icon: Info, label: t('aboutApp'), value: t('version') },
      ]
    }
  ]

  return (
    <div className={`pb-20 px-4 py-6 min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
      <header className="mb-6">
        <h1 className={`text-2xl font-bold mb-2 transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          {t('settings')}
        </h1>
        <p className={`text-sm transition-colors duration-300 ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Manage your PastePick experience
        </p>
      </header>

      {/* Theme Selector */}
      <ThemeSelector />

      {/* Language Selector */}
      <div className="mb-6">
        <DetailedLanguageSelector />
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className={`text-lg font-semibold mb-3 transition-colors duration-300 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {section.title}
            </h2>
            <div className={`rounded-lg border shadow-sm overflow-hidden transition-colors duration-300 ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <button 
                    key={itemIndex}
                    className={`
                      w-full p-4 flex items-center space-x-3 transition-colors
                      ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                      ${itemIndex !== section.items.length - 1 ? 
                        (isDark ? 'border-b border-gray-700' : 'border-b border-gray-100') : 
                        ''
                      }
                    `}
                  >
                    <div className={`p-2 rounded-lg transition-colors duration-300 ${
                      isDark ? 'bg-gray-700' : 'bg-gray-100'
                    }`}>
                      <Icon className={`transition-colors duration-300 ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`} size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className={`font-medium transition-colors duration-300 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.label}
                      </div>
                      <div className={`text-sm transition-colors duration-300 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {item.value}
                      </div>
                    </div>
                    <ChevronRight className={`transition-colors duration-300 ${
                      isDark ? 'text-gray-500' : 'text-gray-400'
                    }`} size={16} />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <div className={`p-4 rounded-lg border mb-4 transition-colors duration-300 ${
          isDark 
            ? 'bg-blue-900/20 border-blue-800 text-blue-300' 
            : 'bg-blue-50 border-blue-200 text-blue-900'
        }`}>
          <h3 className="font-semibold mb-2">🦷 {t('appName')}</h3>
          <p className="text-sm">
            Making toothpaste ingredient analysis simple and accessible for everyone.
          </p>
        </div>
        <p className={`text-xs transition-colors duration-300 ${
          isDark ? 'text-gray-500' : 'text-gray-500'
        }`}>
          © 2024 {t('appName')}. Made with care for your oral health.
        </p>
      </div>
    </div>
  )
}