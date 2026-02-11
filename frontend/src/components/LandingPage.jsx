import { useNavigate } from 'react-router-dom'

function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <div className="text-8xl mb-6 animate-bounce">🥭</div>
        <h1 className="text-5xl md:text-6xl font-bold text-green-700 dark:text-green-400 mb-6 transition-colors duration-300">
          MangoLeaf AI
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 transition-colors duration-300">
          Protect your mango harvest with AI-powered disease detection. 
          Upload a leaf image and get instant diagnosis with expert recommendations.
        </p>
        <button
          onClick={() => navigate('/detect')}
          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Start Detection →
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-5xl mb-4">🔬</div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
            AI Analysis
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Advanced deep learning models trained on thousands of mango leaf images
            for accurate disease identification.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
            Instant Results
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Get immediate diagnosis and treatment recommendations in seconds,
            not days or weeks.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="text-5xl mb-4">🌱</div>
          <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-3">
            Expert Guidance
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Receive detailed treatment plans and nutrient recommendations
            based on detected conditions.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-12 mb-16 transition-all duration-300">
        <h2 className="text-3xl font-bold text-center text-green-700 dark:text-green-400 mb-8">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">1</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Upload Image</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Take a photo of the affected leaf
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">2</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Analysis</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Our model analyzes the image
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">3</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Get Results</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Receive accurate diagnosis
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">4</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Take Action</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Follow treatment recommendations
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 rounded-xl shadow-lg p-12 text-center text-white transition-all duration-300">
        <h2 className="text-3xl font-bold mb-4">Ready to protect your mango crops?</h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of farmers using AI to maintain healthy orchards
        </p>
        <button
          onClick={() => navigate('/detect')}
          className="px-8 py-4 bg-white text-green-600 hover:bg-gray-100 font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          Get Started Now
        </button>
      </div>
    </div>
  )
}

export default LandingPage