import { User, Bell, Shield, HelpCircle, Info, ChevronRight, Moon, Globe } from 'lucide-react'
import { useLanguage } from '../../contexts/LanguageContext'
import { DetailedLanguageSelector } from '../LanguageSelector'

export default function SettingsPage() {
  const { t } = useLanguage()

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
        { icon: Moon, label: t('darkMode'), value: t('systemTheme') },
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
    <div className="pb-20 px-4 py-6 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">
          {t('settings')}
        </h1>
        <p className="text-sm text-gray-600">
          Manage your PastPick experience
        </p>
      </header>

      {/* Language Selector */}
      <div className="mb-6">
        <DetailedLanguageSelector />
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              {section.title}
            </h2>
            <div className="bg-white rounded-lg border shadow-sm overflow-hidden border-gray-200">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <button 
                    key={itemIndex}
                    className={`
                      w-full p-4 flex items-center space-x-3 transition-colors hover:bg-gray-50
                      ${itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''}
                    `}
                  >
                    <div className="p-2 rounded-lg bg-gray-100">
                      <Icon className="text-gray-600" size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">
                        {item.label}
                      </div>
                      <div className="text-sm text-gray-600">
                        {item.value}
                      </div>
                    </div>
                    <ChevronRight className="text-gray-400" size={16} />
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* App Info */}
      <div className="mt-8 text-center">
        <div className="bg-blue-50 border-blue-200 text-blue-900 p-4 rounded-lg border mb-4">
          <h3 className="font-semibold mb-2">🦷 {t('appName')}</h3>
          <p className="text-sm">
            Making toothpaste ingredient analysis simple and accessible for everyone.
          </p>
        </div>
        <p className="text-xs text-gray-500">
          © 2024 {t('appName')}. Made with care for your oral health.
        </p>
      </div>
    </div>
  )
}
