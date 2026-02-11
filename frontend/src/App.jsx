import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import LandingPage from './components/LandingPage'
import DetectionPage from './components/DetectionPage'
import ResultsPage from './components/ResultsPage'
import AboutSection from './components/AboutSection'
import Login from './components/Login'
import Register from './components/Register'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Navbar />
      
      <main className="animate-fadeIn">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/detect" 
            element={
              <ProtectedRoute>
                <DetectionPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/results" 
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            } 
          />
          <Route path="/about" element={<AboutSection />} />
        </Routes>
      </main>

      <footer className="bg-green-900 dark:bg-gray-950 text-white py-8 mt-16 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center">
                <span className="mr-2">🥭</span>
                MangoLeaf AI
              </h3>
              <p className="text-sm text-green-100 dark:text-gray-300">
                AI-powered disease detection system helping farmers protect their mango crops
                with instant diagnosis and expert recommendations.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-green-100 dark:text-gray-300 hover:text-white transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/detect" className="text-green-100 dark:text-gray-300 hover:text-white transition">
                    Start Detection
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-green-100 dark:text-gray-300 hover:text-white transition">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-3">Technology</h3>
              <ul className="space-y-2 text-sm text-green-100 dark:text-gray-300">
                <li>• Deep Learning (TensorFlow)</li>
                <li>• Computer Vision (OpenCV)</li>
                <li>• React + Flask</li>
                <li>• Real-time Detection</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-800 dark:border-gray-800 pt-6 text-center">
            <p className="text-sm">
              © MangoLeaf AI - Powered by Deep Learning
            </p>
            <p className="text-xs mt-2 text-green-300 dark:text-gray-400">
              Helping farmers detect mango leaf diseases and nutrient deficiencies
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App