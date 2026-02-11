import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { t, i18n } = useTranslation()
  const [showLangMenu, setShowLangMenu] = useState(false)

  const isActive = (path) => {
    if (path === '/detect') {
      return location.pathname === '/detect' || location.pathname === '/results'
    }
    return location.pathname === path
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('language', lang)
    setShowLangMenu(false)
  }

  const languages = {
    en: 'English',
    hi: 'हिंदी',
    te: 'తెలుగు'
  }

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            to="/"
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <span className="text-3xl">🥭</span>
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">MangoLeaf AI</h1>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/"
              className={`text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition font-medium px-3 py-2 rounded-lg ${
                isActive('/') ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : ''
              }`}
            >
              {t('nav.home')}
            </Link>
            
            <Link 
              to="/detect"
              className={`text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition font-medium px-3 py-2 rounded-lg ${
                isActive('/detect') ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : ''
              }`}
            >
              {t('nav.detection')}
            </Link>
            
            <Link 
              to="/about"
              className={`text-gray-700 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition font-medium px-3 py-2 rounded-lg ${
                isActive('/about') ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' : ''
              }`}
            >
              {t('nav.about')}
            </Link>

            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition flex items-center gap-2"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {i18n.language.toUpperCase()}
                </span>
                <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-50">
                  {Object.entries(languages).map(([code, name]) => (
                    <button
                      key={code}
                      onClick={() => changeLanguage(code)}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${
                        i18n.language === code ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition font-medium"
                >
                  {t('nav.logout')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-4 py-2 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-medium"
                >
                  {t('nav.register')}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar