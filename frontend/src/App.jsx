import { useState } from 'react'
import LandingPage from './components/LandingPage'
import DetectionPage from './components/Detectionpage'
import ResultsPage from './components/ResultsPage'
import AboutSection from './components/AboutSection'

function App() {
  const [currentPage, setCurrentPage] = useState('landing')
  const [predictionResult, setPredictionResult] = useState(null)

  const navigateToDetection = () => {
    setCurrentPage('detection')
    setPredictionResult(null)
  }

  const navigateToResults = (result) => {
    setPredictionResult(result)
    setCurrentPage('results')
  }

  const navigateToLanding = () => {
    setCurrentPage('landing')
    setPredictionResult(null)
  }

  const navigateToAbout = () => {
    setCurrentPage('about')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition"
              onClick={navigateToLanding}
            >
              <span className="text-3xl">🥭</span>
              <h1 className="text-2xl font-bold text-green-700">MangoLeaf AI</h1>
            </div>
            <div className="flex space-x-6">
              <button 
                onClick={navigateToLanding}
                className={`text-gray-700 hover:text-green-600 transition font-medium ${
                  currentPage === 'landing' ? 'text-green-600 border-b-2 border-green-600' : ''
                }`}
              >
                Home
              </button>
              <button 
                onClick={navigateToDetection}
                className={`text-gray-700 hover:text-green-600 transition font-medium ${
                  currentPage === 'detection' || currentPage === 'results' ? 'text-green-600 border-b-2 border-green-600' : ''
                }`}
              >
                Detection
              </button>
              <button 
                onClick={navigateToAbout}
                className={`text-gray-700 hover:text-green-600 transition font-medium ${
                  currentPage === 'about' ? 'text-green-600 border-b-2 border-green-600' : ''
                }`}
              >
                About
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="animate-fadeIn">
        {currentPage === 'landing' && (
          <LandingPage onStartDetection={navigateToDetection} />
        )}
        {currentPage === 'detection' && (
          <DetectionPage onResultReceived={navigateToResults} />
        )}
        {currentPage === 'results' && (
          <ResultsPage 
            result={predictionResult} 
            onNewDetection={navigateToDetection}
          />
        )}
        {currentPage === 'about' && <AboutSection />}
      </main>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8 mt-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            {/* About */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="mr-2">🥭</span>
                MangoLeaf AI
              </h3>
              <p className="text-sm text-green-100">
                AI-powered disease detection system helping farmers protect their mango crops
                with instant diagnosis and expert recommendations.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button 
                    onClick={navigateToLanding}
                    className="text-green-100 hover:text-white transition"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button 
                    onClick={navigateToDetection}
                    className="text-green-100 hover:text-white transition"
                  >
                    Start Detection
                  </button>
                </li>
                <li>
                  <button 
                    onClick={navigateToAbout}
                    className="text-green-100 hover:text-white transition"
                  >
                    About Us
                  </button>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold mb-3">Technology</h3>
              <ul className="space-y-2 text-sm text-green-100">
                <li>• Deep Learning (TensorFlow)</li>
                <li>• Computer Vision (OpenCV)</li>
                <li>• React + Flask</li>
                <li>• Real-time Detection</li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-green-800 pt-6 text-center">
            <p className="text-sm">
              ©  MangoLeaf AI - Powered by Deep Learning
            </p>
            <p className="text-xs mt-2 text-green-300">
              Helping farmers detect mango leaf diseases and nutrient deficiencies
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App