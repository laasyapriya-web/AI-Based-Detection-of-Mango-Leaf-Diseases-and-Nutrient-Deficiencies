export default function LandingPage({ onStartDetection }) {
  return (
    <div className="container mx-auto px-6 py-16">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="mb-8 animate-pulse-slow">
          <span className="text-8xl">🥭</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">
          AI-Powered Mango Leaf Disease Detection
        </h1>
        <p className="text-xl text-gray-700 mb-8 leading-relaxed">
          Upload a photo of your mango leaf and get instant diagnosis with 
          expert recommendations powered by deep learning technology
        </p>
        <button
          onClick={onStartDetection}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition transform hover:scale-105 shadow-lg hover:shadow-xl"
        >
          Start Detection →
        </button>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="text-5xl mb-4">🔬</div>
          <h3 className="text-xl font-bold text-green-700 mb-3">
            AI-Powered Analysis
          </h3>
          <p className="text-gray-600">
            Advanced deep learning model trained on thousands of mango leaf images 
            for accurate disease identification
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="text-5xl mb-4">⚡</div>
          <h3 className="text-xl font-bold text-green-700 mb-3">
            Instant Results
          </h3>
          <p className="text-gray-600">
            Get disease diagnosis with confidence score in seconds. 
            No waiting, immediate actionable insights
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition transform hover:-translate-y-1">
          <div className="text-5xl mb-4">💊</div>
          <h3 className="text-xl font-bold text-green-700 mb-3">
            Expert Recommendations
          </h3>
          <p className="text-gray-600">
            Receive detailed treatment plans, prevention strategies, 
            and symptom descriptions for each condition
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mb-16">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">92%+</div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">8</div>
            <div className="text-sm text-gray-600">Disease Classes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">&lt;3s</div>
            <div className="text-sm text-gray-600">Detection Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-sm text-gray-600">Availability</div>
          </div>
        </div>
      </div>

      {/* Detection Categories */}
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-8">
          What We Detect
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Diseases */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center">
              <span className="mr-2">🦠</span> Diseases & Pests
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Anthracnose</strong> - Fungal disease causing dark lesions</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Bacterial Canker</strong> - Water-soaked lesions</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Powdery Mildew</strong> - White powdery growth</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Die Back</strong> - Progressive twig drying</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Cutting Weevil</strong> - Notched leaf margins</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Gall Midge</strong> - Galls on inflorescence</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Sooty Mould</strong> - Black sooty coating</span>
              </li>
            </ul>
          </div>

          {/* Nutrient Deficiencies */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-yellow-600 mb-4 flex items-center">
              <span className="mr-2">🌿</span> Nutrient Deficiencies
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Nitrogen Deficiency</strong> - Yellowing of older leaves</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Potassium Deficiency</strong> - Marginal scorching</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Magnesium Deficiency</strong> - Interveinal chlorosis</span>
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2 font-bold">✓</span>
                <span><strong>Iron Deficiency</strong> - Young leaf yellowing</span>
              </li>
              <li className="flex items-center mt-6">
                <span className="text-blue-500 mr-2 font-bold">✓</span>
                <span><strong>Healthy Leaves</strong> - Normal condition detection</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-green-800 text-center mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-green-700">
              1
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Upload Image</h3>
            <p className="text-sm text-gray-600">
              Take or upload a clear photo of the mango leaf
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-green-700">
              2
            </div>
            <h3 className="font-bold text-gray-800 mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-600">
              Our model analyzes the leaf for diseases and deficiencies
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-green-700">
              3
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Get Results</h3>
            <p className="text-sm text-gray-600">
              Receive diagnosis with confidence score instantly
            </p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-green-700">
              4
            </div>
            <h3 className="font-bold text-gray-800 mb-2">Take Action</h3>
            <p className="text-sm text-gray-600">
              Follow expert treatment and prevention recommendations
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl p-12 max-w-3xl mx-auto shadow-xl">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to diagnose your mango leaves?
          </h3>
          <p className="text-white text-lg mb-6 opacity-90">
            Take a clear photo of the affected leaf and upload it for instant AI-powered analysis
          </p>
          <button
            onClick={onStartDetection}
            className="bg-white text-green-600 hover:bg-green-50 font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            Get Started Now
          </button>
        </div>
      </div>
    </div>
  )
}