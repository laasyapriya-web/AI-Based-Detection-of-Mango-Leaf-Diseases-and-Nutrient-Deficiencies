import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'  // Add this import

function LandingPage() {
  const navigate = useNavigate()
  const { t } = useTranslation()  // Add this hook

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="text-8xl mb-6 animate-bounce">🥭</div>
        <h1 className="text-5xl md:text-6xl font-bold text-green-700 dark:text-green-400 mb-6 transition-colors duration-300">
          {t('landing.title')}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 transition-colors duration-300">
          {t('landing.subtitle')}
        </p>
        <button
          onClick={() => navigate('/detect')}
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {t('landing.startDetection')}
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-5xl mb-4">🔬</div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
            {t('landing.aiAnalysis')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('landing.aiAnalysisDesc')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
            {t('landing.instantResults')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('landing.instantResultsDesc')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-5xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
            {t('landing.expertGuidance')}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {t('landing.expertGuidanceDesc')}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 mb-16 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
          {t('landing.howItWorks')}
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('landing.step1')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('landing.step1Desc')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('landing.step2')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('landing.step2Desc')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('landing.step3')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('landing.step3Desc')}
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">4</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{t('landing.step4')}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('landing.step4Desc')}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-xl shadow-lg p-12 text-center text-white transition-all duration-300">
        <h2 className="text-3xl font-bold mb-4">{t('landing.ctaTitle')}</h2>
        <p className="text-lg mb-8 opacity-90">
          {t('landing.ctaSubtitle')}
        </p>
        <button
          onClick={() => navigate('/detect')}
          className="px-8 py-4 bg-white text-green-600 hover:bg-gray-100 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          {t('landing.getStarted')}
        </button>
      </div>
    </div>
  )
}

export default LandingPage