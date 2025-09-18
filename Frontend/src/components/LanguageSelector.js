'use client'

import { useState } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { useTheme } from '../contexts/ThemeContext'

// Main Language Selector Component
export default function LanguageSelector({ showLabel = true, size = 'default' }) {
  const { language, changeLanguage, t, getAvailableLanguages, getCurrentLanguageInfo } = useLanguage()
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  
  const availableLanguages = getAvailableLanguages()
  const currentLang = getCurrentLanguageInfo()

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  const sizeClasses = {
    small: 'text-sm p-2',
    default: 'text-base p-3',
    large: 'text-lg p-4'
  }

  const iconSizes = {
    small: 16,
    default: 20,
    large: 24
  }

  return (
    <div className="relative">
      {/* Language Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 rounded-lg border transition-colors
          ${sizeClasses[size]}
          ${isDark 
            ? 'bg-gray-800 border-gray-700 text-white hover:bg-gray-700' 
            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
          }
        `}
      >
        <Globe size={iconSizes[size]} />
        {showLabel && (
          <>
            <span>{currentLang.nativeName}</span>
            <ChevronDown size={iconSizes[size]} className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className={`
            absolute right-0 mt-2 w-48 rounded-lg border shadow-lg z-50 overflow-hidden
            ${isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
            }
          `}>
            {/* Header */}
            <div className={`px-4 py-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`font-semibold text-sm ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {t('selectLanguage')}
              </h3>
            </div>
            
            {/* Language Options */}
            <div className="py-1">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`
                    w-full px-4 py-3 text-left flex items-center justify-between transition-colors
                    ${isDark 
                      ? 'hover:bg-gray-700 text-white' 
                      : 'hover:bg-gray-50 text-gray-900'
                    }
                  `}
                >
                  <div>
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {lang.name}
                    </div>
                  </div>
                  
                  {language === lang.code && (
                    <Check size={16} className="text-blue-600" />
                  )}
                </button>
              ))}
            </div>
            
            {/* Footer */}
            <div className={`px-4 py-2 border-t text-xs ${isDark ? 'border-gray-700 text-gray-400' : 'border-gray-200 text-gray-500'}`}>
              {t('currentLanguage')}: {currentLang.nativeName}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Compact version for navigation bars
export function CompactLanguageSelector() {
  const { language, changeLanguage, getAvailableLanguages } = useLanguage()
  const { isDark } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  
  const availableLanguages = getAvailableLanguages()
  const currentLang = availableLanguages.find(lang => lang.code === language)

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* Compact Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          p-2 rounded-full transition-colors
          ${isDark 
            ? 'hover:bg-gray-700 text-gray-300' 
            : 'hover:bg-gray-100 text-gray-600'
          }
        `}
        title={currentLang?.nativeName}
      >
        <Globe size={18} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className={`
            absolute right-0 mt-2 w-32 rounded-lg border shadow-lg z-50 overflow-hidden
            ${isDark 
              ? 'bg-gray-800 border-gray-700' 
              : 'bg-white border-gray-200'
            }
          `}>
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`
                  w-full px-3 py-2 text-left text-sm transition-colors flex items-center justify-between
                  ${isDark 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-50 text-gray-900'
                  }
                `}
              >
                <span>{lang.nativeName}</span>
                {language === lang.code && (
                  <Check size={12} className="text-blue-600" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Settings page version with full details - ALWAYS WHITE THEME
export function DetailedLanguageSelector() {
  const { language, changeLanguage, t, getAvailableLanguages } = useLanguage()
  // Remove useTheme - always use light theme
  const availableLanguages = getAvailableLanguages()

  return (
    <div className="p-4 rounded-lg border bg-white border-gray-200">
      <h3 className="font-semibold mb-3 text-gray-900">
        {t('language')}
      </h3>
      
      <div className="space-y-2">
        {availableLanguages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`
              w-full p-3 rounded-lg border text-left transition-all
              ${language === lang.code
                ? 'border-blue-500 bg-blue-50 text-blue-600'
                : 'border-gray-300 hover:border-gray-400 text-gray-900 hover:bg-gray-50'
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{lang.nativeName}</div>
                <div className={`text-sm ${
                  language === lang.code ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {lang.name}
                </div>
              </div>
              
              {language === lang.code && (
                <div className="w-2 h-2 rounded-full bg-blue-600" />
              )}
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        {t('changeLanguage')} • {t('currentLanguage')}: {availableLanguages.find(l => l.code === language)?.nativeName}
      </div>
    </div>
  )
}

// Inline Language Switcher (for headers/toolbars)
export function InlineLanguageSelector() {
  const { language, changeLanguage, getAvailableLanguages } = useLanguage()
  const { isDark } = useTheme()
  const availableLanguages = getAvailableLanguages()

  return (
    <div className="flex items-center space-x-1">
      {availableLanguages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={`
            px-2 py-1 text-xs rounded font-medium transition-colors
            ${language === lang.code
              ? 'bg-blue-600 text-white'
              : isDark
                ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }
          `}
        >
          {lang.code.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

// Modal Language Selector (for first-time setup)
export function LanguageModal({ isOpen, onClose, onSelect }) {
  const { getAvailableLanguages, t } = useLanguage()
  const { isDark } = useTheme()
  const availableLanguages = getAvailableLanguages()

  const handleSelect = (langCode) => {
    onSelect(langCode)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className={`
        w-full max-w-md rounded-lg shadow-lg
        ${isDark ? 'bg-gray-800' : 'bg-white'}
      `}>
        {/* Header */}
        <div className={`p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Choose Your Language
          </h2>
          <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Select your preferred language for PastPick
          </p>
        </div>

        {/* Language Options */}
        <div className="p-6">
          <div className="space-y-3">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`
                  w-full p-4 rounded-lg border transition-all text-left
                  ${isDark
                    ? 'border-gray-600 hover:border-blue-500 text-white hover:bg-gray-700'
                    : 'border-gray-300 hover:border-blue-500 text-gray-900 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center space-x-3">
                  <Globe size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">{lang.nativeName}</div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lang.name}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// Language Badge (shows current language)
export function LanguageBadge() {
  const { getCurrentLanguageInfo } = useLanguage()
  const { isDark } = useTheme()
  const currentLang = getCurrentLanguageInfo()

  return (
    <div className={`
      inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs
      ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'}
    `}>
      <Globe size={12} />
      <span>{currentLang.code.toUpperCase()}</span>
    </div>
  )
}