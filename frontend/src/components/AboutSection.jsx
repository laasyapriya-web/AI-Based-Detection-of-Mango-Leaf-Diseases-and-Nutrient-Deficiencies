export default function AboutSection() {
  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">🥭</div>
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            About MangoLeaf AI
          </h1>
          <p className="text-xl text-gray-600">
            Empowering farmers with AI-driven plant health diagnostics
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            MangoLeaf AI is dedicated to revolutionizing agricultural health monitoring through 
            cutting-edge artificial intelligence. We believe that every farmer, regardless of their 
            location or resources, should have access to expert-level plant disease diagnostics.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our deep learning model has been trained on thousands of mango leaf images to accurately 
            identify diseases, pest damage, and nutrient deficiencies, helping farmers take timely 
            action to protect their crops and maximize yields. With an accuracy rate exceeding 92%, 
            our system provides reliable, instant diagnoses that can save crops and improve agricultural outcomes.
          </p>
        </div>

        {/* Technology Stack */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
            <span className="mr-2">🔬</span>
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Backend */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">⚙️</span>
                Backend & AI
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Python Flask</strong> - REST API framework
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>TensorFlow 2.15</strong> - Deep learning framework
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Keras</strong> - Neural network API
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>OpenCV</strong> - Image processing and preprocessing
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>CNN Architecture</strong> - Convolutional Neural Networks
                  </div>
                </li>
              </ul>
            </div>

            {/* Frontend */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">💻</span>
                Frontend
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>React 18</strong> - Modern UI framework with hooks
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Vite</strong> - Fast build tool and dev server
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Tailwind CSS</strong> - Utility-first styling
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Axios</strong> - HTTP client for API communication
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">•</span>
                  <div>
                    <strong>Responsive Design</strong> - Mobile-first approach
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-8 text-center flex items-center justify-center">
            <span className="mr-2">👥</span>
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
                👨‍💻
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Dr. AI Researcher</h3>
              <p className="text-sm text-green-600 font-semibold mb-2">ML Engineer & Researcher</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                PhD in Deep Learning & Computer Vision. 10+ years of experience in agricultural AI solutions.
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
                🌾
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Agricultural Expert</h3>
              <p className="text-sm text-green-600 font-semibold mb-2">Plant Pathologist</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                15+ years in mango cultivation and disease management. Certified agricultural consultant.
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg">
                💻
              </div>
              <h3 className="font-bold text-gray-800 text-lg">Full-Stack Developer</h3>
              <p className="text-sm text-green-600 font-semibold mb-2">Software Engineer</p>
              <p className="text-xs text-gray-600 leading-relaxed">
                React & Flask specialist. Building scalable AI applications for agriculture.
              </p>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
            <span className="mr-2">✨</span>
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mr-4">🎯</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">High Accuracy</h3>
                <p className="text-sm text-gray-600">
                  92%+ accuracy on disease identification with continuous model improvements
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mr-4">⚡</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Fast Processing</h3>
                <p className="text-sm text-gray-600">
                  Get results in under 3 seconds with optimized model inference
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mr-4">📱</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Mobile Friendly</h3>
                <p className="text-sm text-gray-600">
                  Works seamlessly on any device with camera support
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mr-4">🌍</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Always Available</h3>
                <p className="text-sm text-gray-600">
                  24/7 access to expert-level diagnostics anywhere, anytime
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mr-4">📊</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">8 Classes Detected</h3>
                <p className="text-sm text-gray-600">
                  Identifies diseases, pests, nutrient deficiencies, and healthy leaves
                </p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mr-4">💡</div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Expert Recommendations</h3>
                <p className="text-sm text-gray-600">
                  Detailed treatment plans and prevention strategies for each condition
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How AI Works */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center">
            <span className="mr-2">🤖</span>
            How Our AI Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center text-green-700 font-bold mr-4 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Image Preprocessing</h3>
                <p className="text-sm text-gray-600">
                  Your uploaded image is resized, normalized, and optimized for model input using OpenCV
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center text-green-700 font-bold mr-4 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Feature Extraction</h3>
                <p className="text-sm text-gray-600">
                  Convolutional layers extract important visual patterns, textures, and disease markers
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center text-green-700 font-bold mr-4 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Classification</h3>
                <p className="text-sm text-gray-600">
                  Neural network analyzes features and predicts the most likely condition with confidence score
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center text-green-700 font-bold mr-4 flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Results & Recommendations</h3>
                <p className="text-sm text-gray-600">
                  System retrieves expert recommendations and presents actionable treatment information
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-xl p-10 text-white text-center">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-3xl font-bold mb-4">
            Ready to protect your mango crops?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of farmers using AI for better crop health management
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-green-50 transition transform hover:scale-105 shadow-lg"
          >
            Start Free Detection
          </button>
        </div>

        {/* Contact & Support */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6 text-center">
          <p className="text-gray-600 text-sm">
            For technical support or partnership inquiries, contact us at{' '}
            <a href="mailto:support@mangoleaf.ai" className="text-green-600 font-semibold hover:underline">
              support@mangoleaf.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}