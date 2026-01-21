import { useState, useRef } from 'react'
import axios from 'axios'

export default function DetectionPage({ onResultReceived }) {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef(null)

  const API_URL = 'http://localhost:5000/predict'

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) validateAndSetFile(file)
  }

  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true) }
  const handleDragLeave = () => setIsDragging(false)
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) validateAndSetFile(file)
  }

  const validateAndSetFile = (file) => {
    setError('')
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image (JPG, PNG, or WebP)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB')
      return
    }
    setSelectedFile(file)
    const reader = new FileReader()
    reader.onload = (e) => setPreviewUrl(e.target.result)
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) { setError('Please select an image first'); return }

    setIsLoading(true)
    setError('')
    setProgress(10)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const progressInterval = setInterval(() => {
        setProgress(prev => (prev >= 90 ? 90 : prev + 10))
      }, 200)

      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (response.data && response.data.prediction) {
        const data = response.data

        // Determine category based on disease and nutrient deficiency
        let category = 'Healthy'
        if (!data.prediction.is_healthy) {
          if (data.prediction.nutrient_deficiency) {
            category = 'Nutrient Deficiency'
          } else {
            category = 'Disease'
          }
        }

        const mappedResult = {
          prediction: {
            class: data.prediction.disease || data.prediction.nutrient_deficiency || 'Unknown',
            category: category,
            confidence: Math.round(data.prediction.confidence * 100),
            symptoms: data.prediction.symptoms || [],
            treatment: data.recommendations?.remedies || [],
            prevention: data.recommendations?.prevention || [],
            nutrients: data.recommendations?.nutrients || []
          },
          top_predictions: (data.top_predictions || []).map(p => ({
            class: p.disease || p.nutrient_deficiency || 'Unknown',
            confidence: Math.round(p.confidence * 100)
          })),
          success: true
        }

        setTimeout(() => onResultReceived(mappedResult), 500)
      } else {
        setError('No results found. Please try another image.')
      }

    } catch (err) {
      console.error('Analysis error:', err)
      if (err.response) {
        if (err.response.status === 413)
          setError('File too large. Please upload an image smaller than 16MB')
        else if (err.response.status === 400)
          setError('Invalid file type. Please upload JPG, PNG, or JPEG')
        else if (err.response.data?.error)
          setError(`Server error: ${err.response.data.error}`)
        else
          setError(`Server error: ${err.response.status}`)
      } else if (err.request) {
        setError('No response from server. Please check if the backend is running.')
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.')
      } else {
        setError(`Analysis failed: ${err.message}`)
      }
    } finally {
      setIsLoading(false)
      setProgress(0)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setError('')
    setProgress(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCameraCapture = () => {
    alert('Camera capture coming soon! Please upload an image for now.')
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-4">Upload Leaf Image</h1>
        <p className="text-lg text-gray-600">Upload a clear photo of your mango leaf for AI-powered analysis</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Upload Section */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-green-700 mb-4">Upload Options</h2>

            <div
              className={`border-3 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 mb-6 ${
                isDragging ? 'border-green-500 bg-green-50 scale-105' : 'border-green-300 hover:border-green-400 hover:bg-green-50'
              } ${previewUrl ? 'hidden' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-5xl mb-4">📤</div>
              <p className="text-lg font-medium text-gray-700 mb-2">Drag & drop your image here</p>
              <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
              <p className="text-xs text-gray-400">Supports JPG, PNG, WebP (max 10MB)</p>
            </div>

            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/*" className="hidden" />

            <button onClick={handleCameraCapture} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition mb-6 flex items-center justify-center">
              <span className="mr-2">📷</span>Capture from Camera (Coming Soon)
            </button>

            <div className="flex space-x-4">
              <button onClick={handleReset} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition" disabled={isLoading}>Reset</button>
              <button onClick={handleAnalyze} disabled={!selectedFile || isLoading} className={`flex-1 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center ${!selectedFile || isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'}`}>
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>Analyzing...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔬</span>Analyze Leaf
                  </>
                )}
              </button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-700">
                  <span className="mr-2">⚠️</span>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Preview Section */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold text-green-700 mb-4">Image Preview</h2>
            {previewUrl ? (
              <div className="mb-6">
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                  <img src={previewUrl} alt="Leaf preview" className="w-full h-64 object-contain bg-gray-50" />
                  {selectedFile && <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2">{selectedFile.name} • {(selectedFile.size / 1024).toFixed(1)} KB</div>}
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center h-64 flex flex-col items-center justify-center mb-6">
                <div className="text-4xl mb-4 text-gray-400">🌿</div>
                <p className="text-gray-500">No image selected</p>
                <p className="text-sm text-gray-400 mt-2">Upload an image to see preview</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
