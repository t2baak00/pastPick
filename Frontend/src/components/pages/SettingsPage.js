import { User, Bell, Shield, HelpCircle, Info, ChevronRight, Moon, Globe } from 'lucide-react'

export default function SettingsPage() {
  const settingSections = [
    {
      title: "Account",
      items: [
        { icon: User, label: "Profile", value: "Update your information" },
        { icon: Bell, label: "Notifications", value: "Manage alerts" },
      ]
    },
    {
      title: "Preferences",
      items: [
        { icon: Shield, label: "Safety Threshold", value: "High sensitivity" },
        { icon: Moon, label: "Dark Mode", value: "System default" },
        { icon: Globe, label: "Language", value: "English" },
      ]
    },
    {
      title: "Support",
      items: [
        { icon: HelpCircle, label: "Help Center", value: "Get support" },
        { icon: Info, label: "About PastPick", value: "Version 1.0.0" },
      ]
    }
  ]

  return (
    <div className="pb-20 px-4 py-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600 text-sm">Manage your PastPick experience</p>
      </header>

      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h2>
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {section.items.map((item, itemIndex) => {
                const Icon = item.icon
                return (
                  <button 
                    key={itemIndex}
                    className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 transition-colors ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                    }`}
                  >
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="text-gray-600" size={18} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-gray-900">{item.label}</div>
                      <div className="text-sm text-gray-600">{item.value}</div>
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
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
          <h3 className="font-semibold text-blue-900 mb-2">🦷 PastPick</h3>
          <p className="text-sm text-blue-800">
            Making toothpaste ingredient analysis simple and accessible for everyone.
          </p>
        </div>
        <p className="text-xs text-gray-500">
          © 2024 PastPick. Made with care for your oral health.
        </p>
      </div>
    </div>
  )
}