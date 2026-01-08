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

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  // Handle drag and drop
  const handleDragOver = (event) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (event) => {
    event.preventDefault()
    setIsDragging(false)
    
    const file = event.dataTransfer.files[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  // Validate and set file
  const validateAndSetFile = (file) => {
    setError('')
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image (JPG, PNG, or WebP)')
      return
    }
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size should be less than 10MB')
      return
    }
    
    setSelectedFile(file)
    
    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreviewUrl(e.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Handle analyze button click
  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError('Please select an image first')
      return
    }

    setIsLoading(true)
    setError('')
    setProgress(10)

    try {
      // Create form data
      const formData = new FormData()
      formData.append('file', selectedFile)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 200)

      // Make API request
      const response = await axios.post(API_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        timeout: 30000 // 30 seconds timeout
      })

      clearInterval(progressInterval)
      setProgress(100)

      // Check if prediction was successful
      if (response.data.success) {
        // Wait a moment to show 100% progress
        setTimeout(() => {
          onResultReceived(response.data)
        }, 500)
      } else {
        throw new Error(response.data.error || 'Prediction failed')
      }

    } catch (error) {
      console.error('Analysis error:', error)
      
      // Handle different error types
      if (error.response) {
        // Server responded with error status
        if (error.response.status === 413) {
          setError('File too large. Please upload an image smaller than 16MB')
        } else if (error.response.status === 400) {
          setError('Invalid file type. Please upload JPG, PNG, or JPEG')
        } else if (error.response.data?.error) {
          setError(`Server error: ${error.response.data.error}`)
        } else {
          setError(`Server error: ${error.response.status}`)
        }
      } else if (error.request) {
        // Request made but no response
        setError('No response from server. Please check if the backend is running.')
      } else if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.')
      } else {
        // Other errors
        setError(`Analysis failed: ${error.message}`)
      }
    } finally {
      setIsLoading(false)
      setProgress(0)
    }
  }

  // Handle reset
  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl('')
    setError('')
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Handle camera capture (future feature)
  const handleCameraCapture = () => {
    alert('Camera capture feature coming soon! For now, please upload an image.')
  }

  return (
    <div className="container mx-auto px-6 py-12 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-green-800 mb-4">
          Upload Leaf Image
        </h1>
        <p className="text-lg text-gray-600">
          Upload a clear photo of your mango leaf for AI-powered analysis
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left Column - Upload */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Upload Options
            </h2>
            
            {/* Drag & Drop Area */}
            <div
              className={`border-3 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all duration-300 mb-6 ${
                isDragging 
                  ? 'border-green-500 bg-green-50 scale-105' 
                  : 'border-green-300 hover:border-green-400 hover:bg-green-50'
              } ${previewUrl ? 'hidden' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="text-5xl mb-4">📤</div>
              <p className="text-lg font-medium text-gray-700 mb-2">
                Drag & drop your image here
              </p>
              <p className="text-sm text-gray-500 mb-4">
                or click to browse files
              </p>
              <p className="text-xs text-gray-400">
                Supports JPG, PNG, WebP (max 10MB)
              </p>
            </div>

            {/* File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              className="hidden"
            />

            {/* Or Camera Button */}
            <button
              onClick={handleCameraCapture}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition mb-6 flex items-center justify-center"
            >
              <span className="mr-2">📷</span>
              Capture from Camera (Coming Soon)
            </button>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg transition"
                disabled={isLoading}
              >
                Reset
              </button>
              <button
                onClick={handleAnalyze}
                disabled={!selectedFile || isLoading}
                className={`flex-1 font-medium py-3 px-4 rounded-lg transition flex items-center justify-center ${
                  !selectedFile || isLoading
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 text-white transform hover:scale-105'
                }`}
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <span className="mr-2">🔬</span>
                    Analyze Leaf
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-700">
                  <span className="mr-2">⚠️</span>
                  <p className="font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <h3 className="font-bold text-yellow-800 mb-3 flex items-center">
              <span className="mr-2">💡</span>
              Tips for Best Results
            </h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Use natural daylight, avoid shadows</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Fill the frame with the leaf</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Include both sides of the leaf if possible</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Focus on the affected area</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Upload high-resolution images (but under 10MB)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <h2 className="text-xl font-bold text-green-700 mb-4">
              Image Preview
            </h2>
            
            {/* Preview Area */}
            {previewUrl ? (
              <div className="mb-6">
                <div className="relative rounded-lg overflow-hidden border border-gray-200">
                  <img
                    src={previewUrl}
                    alt="Leaf preview"
                    className="w-full h-64 object-contain bg-gray-50"
                  />
                  {selectedFile && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-sm p-2">
                      {selectedFile.name} • {(selectedFile.size / 1024).toFixed(1)} KB
                    </div>
                  )}
                </div>
                
                {/* File Info */}
                {selectedFile && (
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <strong>Selected:</strong> {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Type:</strong> {selectedFile.type}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center h-64 flex flex-col items-center justify-center mb-6">
                <div className="text-4xl mb-4 text-gray-400">🌿</div>
                <p className="text-gray-500">No image selected</p>
                <p className="text-sm text-gray-400 mt-2">
                  Upload an image to see preview
                </p>
              </div>
            )}

            {/* Progress Bar */}
            {isLoading && (
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Analyzing image...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  This usually takes 2-5 seconds
                </p>
              </div>
            )}

            {/* Supported Classes */}
            <div className="mt-8">
              <h3 className="font-bold text-gray-700 mb-3">
                What We Detect
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  Anthracnose
                </span>
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  Bacterial Canker
                </span>
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  Cutting Weevil
                </span>
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  Die Back
                </span>
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  Gall Midge
                </span>
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  Powdery Mildew
                </span>
                <span className="bg-red-50 text-red-700 px-2 py-1 rounded">
                  Sooty Mould
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                  N Deficiency
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                  K Deficiency
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                  Mg Deficiency
                </span>
                <span className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                  Fe Deficiency
                </span>
                <span className="bg-green-50 text-green-700 px-2 py-1 rounded">
                  Healthy
                </span>
              </div>
            </div>
          </div>

          {/* API Status */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${true ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm text-blue-700">
                  Backend API: Connected
                </span>
              </div>
              <span className="text-xs text-blue-500">
                http://localhost:5000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Analyzing Leaf Image
              </h3>
              <p className="text-gray-600 mb-4">
                Our AI model is examining your leaf for diseases and nutrient deficiencies...
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}