import { useTranslation } from 'react-i18next'  // Add this import

function AboutSection() {
  const { t } = useTranslation()  // Add this hook

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-6 transition-colors duration-300">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 mb-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
            {t('about.ourMission')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            {t('about.missionText1')}
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            {t('about.missionText2')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 mb-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
            {t('about.ourTechnology')}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t('about.deepLearning')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.deepLearningDesc')}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t('about.computerVision')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.computerVisionDesc')}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {t('about.userFriendly')}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {t('about.userFriendlyDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 mb-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-8 text-center">
            {t('about.meetTeam')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg transition-colors duration-300">
                👨‍💻
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">Gurajala Laasyapriya</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">{t('about.teamRole')}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.teamDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg transition-colors duration-300">
                🌾
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">Katta Teena Reddy</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">{t('about.teamRole')}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.teamDesc')}
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg transition-colors duration-300">
                💻
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">Kovvuri Srivalli</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">{t('about.teamRole')}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.teamDesc')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
            {t('about.detectedConditions')}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Anthracnose',
              'Bacterial Canker',
              'Cutting Weevil',
              'Die Back',
              'Gall Midge',
              'Powdery Mildew',
              'Sooty Mould',
              'Healthy Leaves'
            ].map((disease, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 bg-green-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 dark:text-green-400 text-2xl mr-4">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {disease}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection