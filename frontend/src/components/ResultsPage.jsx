import { useState, useEffect } from 'react'

export default function ResultsPage({ result, onNewDetection }) {
  const [showDetails, setShowDetails] = useState(false)
  const [copySuccess, setCopySuccess] = useState('')

  useEffect(() => {
    if (!result) onNewDetection()
  }, [result, onNewDetection])

  if (!result || !result.success) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <div className="text-6xl mb-6">😔</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          No Results Found
        </h1>
        <p className="text-gray-600 mb-8">
          Please upload a leaf image for analysis
        </p>
        <button
          onClick={onNewDetection}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition"
        >
          Go Back to Detection
        </button>
      </div>
    )
  }

  const prediction = result.prediction
  const topPredictions = result.top_predictions || []

  const getCategoryInfo = (category) => {
    switch(category) {
      case 'Disease':
        return { color: 'red', icon: '🦠', bgColor: 'bg-red-50', textColor: 'text-red-700' }
      case 'Nutrient Deficiency':
        return { color: 'yellow', icon: '🌿', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700' }
      case 'Healthy':
        return { color: 'green', icon: '✅', bgColor: 'bg-green-50', textColor: 'text-green-700' }
      default:
        return { color: 'gray', icon: '❓', bgColor: 'bg-gray-50', textColor: 'text-gray-700' }
    }
  }

  const categoryInfo = getCategoryInfo(prediction.category)

  const copyToClipboard = () => {
    const text = `
Mango Leaf Analysis Results:
Condition: ${prediction.class}
Confidence: ${prediction.confidence}%
Category: ${prediction.category}

Symptoms: ${prediction.symptoms.join(', ')}

Recommended Treatment: ${prediction.treatment.join('; ')}

Recommended Nutrients: ${prediction.nutrients.join('; ')}

Prevention Tips: ${prediction.prevention.join('; ')}
    `.trim()

    navigator.clipboard.writeText(text)
      .then(() => setCopySuccess('Copied to clipboard!'))
      .catch(() => setCopySuccess('Failed to copy'))

    setTimeout(() => setCopySuccess(''), 2000)
  }

  const printResults = () => window.print()

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mango Leaf Analysis Results',
        text: `My mango leaf analysis detected: ${prediction.class} (${prediction.confidence}% confidence)`,
        url: window.location.href,
      })
    } else {
      alert('Sharing is not supported on this browser. You can copy the results instead.')
    }
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Analysis Results</h1>
        <p className="text-lg text-gray-600">Detailed diagnosis and recommendations for your mango leaf</p>
      </div>

      {/* Main Results Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className={`${categoryInfo.bgColor} p-4 border-b`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-3">{categoryInfo.icon}</span>
              <div>
                <span className={`text-sm font-semibold ${categoryInfo.textColor} uppercase tracking-wide`}>
                  {prediction.category}
                </span>
                <p className="text-xs text-gray-500 mt-1">Detected Condition</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-800">{prediction.confidence}%</div>
              <p className="text-xs text-gray-500">Confidence Score</p>
            </div>
          </div>
        </div>

        <div className="p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{prediction.class}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">{prediction.description}</p>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Confidence Level</span>
              <span>{prediction.confidence}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000" style={{ width: `${prediction.confidence}%` }}></div>
            </div>
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t p-6 flex flex-wrap gap-4 justify-center">
          <button onClick={() => setShowDetails(!showDetails)} className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg flex items-center">
            <span className="mr-2">{showDetails ? '▲' : '▼'}</span>
            {showDetails ? 'Hide Details' : 'Show Full Details'}
          </button>
          <button onClick={copyToClipboard} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg flex items-center">
            <span className="mr-2">📋</span>Copy Results
          </button>
          <button onClick={printResults} className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg flex items-center">
            <span className="mr-2">🖨️</span>Print Report
          </button>
          <button onClick={shareResults} className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-lg flex items-center">
            <span className="mr-2">📤</span>Share
          </button>
          <button onClick={onNewDetection} className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-6 rounded-lg flex items-center">
            <span className="mr-2">🔍</span>Analyze Another
          </button>
        </div>

        {copySuccess && <div className="text-center mt-4"><div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-lg"><span className="mr-2">✅</span>{copySuccess}</div></div>}

        {/* Detailed Information */}
        {showDetails && (
          <div className="border-t p-8 animate-slideDown">
            {/* Symptoms */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">🔍</span>Key Symptoms</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {prediction.symptoms.map((symptom, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">{index + 1}</div>
                      <p className="text-gray-700">{symptom}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Treatment */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">💊</span>Recommended Treatment</h3>
              <div className="space-y-4">
                {prediction.treatment.map((step, index) => (
                  <div key={index} className="flex items-start bg-green-50 rounded-lg p-4">
                    <div className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">✓</div>
                    <p className="text-gray-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrients */}
            {prediction.nutrients.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">🧪</span>Recommended Nutrients</h3>
                <div className="flex flex-wrap gap-4">
                  {prediction.nutrients.map((nutrient, index) => (
                    <div key={index} className="bg-blue-50 rounded-lg p-4">
                      <p className="text-gray-700">{nutrient}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prevention */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center"><span className="mr-2">🛡️</span>Prevention Strategies</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {prediction.prevention.map((strategy, index) => (
                  <div key={index} className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start">
                      <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">🛡️</div>
                      <p className="text-gray-700">{strategy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Recommendations */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center"><span className="mr-2">💡</span>Expert Recommendations</h4>
              <ul className="space-y-2 text-sm text-yellow-700">
                <li>• Monitor affected trees weekly for progress</li>
                <li>• Take follow-up photos to track treatment effectiveness</li>
                <li>• Consult local agricultural expert for severe cases</li>
                <li>• Consider soil testing for recurring nutrient issues</li>
                <li>• Maintain treatment records for future reference</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Top Predictions */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center"><span className="mr-2">📊</span>Top Predictions</h3>
        <div className="space-y-4">
          {topPredictions.map((pred, index) => {
            const predCategory = pred.class === 'Healthy Leaf' ? 'Healthy' : 
                                 pred.class.includes('Deficiency') ? 'Nutrient Deficiency' : 'Disease'
            const predInfo = getCategoryInfo(predCategory)
            return (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition">
                <div className="flex items-center">
                  <div className={`${predInfo.bgColor} rounded-full w-10 h-10 flex items-center justify-center mr-4`}>
                    <span className="text-lg">{predInfo.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{pred.class}</h4>
                    <p className="text-xs text-gray-500">{predCategory}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800">{pred.confidence.toFixed(1)}%</div>
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{ width: `${pred.confidence}%` }}></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Next Steps */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">📸</div>
          <h4 className="font-bold text-green-800 mb-2">Take Progress Photos</h4>
          <p className="text-sm text-gray-600">Document treatment progress with weekly photos</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">📝</div>
          <h4 className="font-bold text-blue-800 mb-2">Keep Records</h4>
          <p className="text-sm text-gray-600">Maintain a log of treatments and responses</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-xl p-6 text-center">
          <div className="text-4xl mb-4">👨‍🌾</div>
          <h4 className="font-bold text-purple-800 mb-2">Consult Experts</h4>
          <p className="text-sm text-gray-600">Seek professional advice for persistent issues</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <button onClick={onNewDetection} className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition transform hover:scale-105 shadow-lg">
          Analyze Another Leaf
        </button>
        <p className="text-gray-500 mt-4">
          Or return to the{' '}
          <button onClick={onNewDetection} className="text-green-600 hover:underline font-medium">
            detection page
          </button>
        </p>
      </div>
    </div>
  )
}
