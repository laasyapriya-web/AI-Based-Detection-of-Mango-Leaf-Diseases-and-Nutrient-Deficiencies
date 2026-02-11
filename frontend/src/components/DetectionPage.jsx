import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function DetectionPage() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showWebcam, setShowWebcam] = useState(false)
  const [stream, setStream] = useState(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)
  const navigate = useNavigate()
  const { t } = useTranslation()

  useEffect(() => {
    if (showWebcam && videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [showWebcam, stream])

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [stream])

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
      stopWebcam()
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setError(null)
      stopWebcam()
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDropZoneClick = () => {
    if (!showWebcam && !previewUrl) {
      fileInputRef.current?.click()
    }
  }

  const startWebcam = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      setStream(mediaStream)
      setShowWebcam(true)
      setSelectedFile(null)
      setPreviewUrl(null)
      setError(null)
    } catch (err) {
      setError('Unable to access camera. Please check permissions.')
      console.error('Camera error:', err)
    }
  }

  const stopWebcam = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
    }
    setShowWebcam(false)
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current
      const canvas = canvasRef.current
      
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      
      const ctx = canvas.getContext('2d')
      ctx.drawImage(video, 0, 0)
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'webcam-capture.jpg', { type: 'image/jpeg' })
        setSelectedFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        stopWebcam()
      }, 'image/jpeg', 0.95)
    }
  }

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError('Please select an image first')
      return
    }

    setLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append('file', selectedFile)

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Prediction failed')
      }

      const result = await response.json()
      navigate('/results', { state: { result, imageUrl: previewUrl } })
    } catch (err) {
      setError('Failed to analyze image. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
    setError(null)
    stopWebcam()
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4 transition-colors duration-300">
            {t('detection.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">
            {t('detection.subtitle')}
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300">
          {!showWebcam && !previewUrl && (
            <div className="mb-6 flex justify-center gap-4">
              <label
                htmlFor="file-input"
                className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg cursor-pointer transition font-semibold flex items-center gap-2"
              >
                <span>📁</span>
                {t('detection.uploadImage')}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-input"
              />
              <button
                onClick={startWebcam}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-semibold flex items-center gap-2"
              >
                <span>📷</span>
                {t('detection.useCamera')}
              </button>
            </div>
          )}

          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={handleDropZoneClick}
            className={`border-3 border-dashed border-green-300 dark:border-green-700 rounded-xl p-12 text-center hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 bg-green-50 dark:bg-gray-900/50 ${
              !showWebcam && !previewUrl ? 'cursor-pointer' : ''
            }`}
          >
            {showWebcam ? (
              <div className="space-y-6">
                <div className="relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="max-h-96 w-auto mx-auto rounded-lg shadow-lg"
                  />
                </div>
                <canvas ref={canvasRef} className="hidden" />
                <div className="flex justify-center gap-4">
                  <button
                    onClick={capturePhoto}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition font-semibold"
                  >
                    📸 {t('detection.capturePhoto')}
                  </button>
                  <button
                    onClick={stopWebcam}
                    className="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition font-semibold"
                  >
                    {t('detection.cancel')}
                  </button>
                </div>
              </div>
            ) : previewUrl ? (
              <div className="space-y-6">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="max-h-96 mx-auto rounded-lg shadow-lg"
                />
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition font-medium"
                >
                  {t('detection.chooseDifferent')}
                </button>
              </div>
            ) : (
              <>
                <div className="text-6xl mb-4">📷</div>
                <p className="text-xl text-gray-700 dark:text-gray-300 mb-4 font-medium">
                  {t('detection.clickToSelect')}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                  {t('detection.supportedFormats')}
                </p>
              </>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

          {selectedFile && !loading && (
            <div className="mt-8 text-center">
              <button
                onClick={handleSubmit}
                className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {t('detection.analyzeLeaf')} →
              </button>
            </div>
          )}

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mb-4"></div>
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {t('detection.analyzing')}
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl transition-colors duration-300">
            <div className="text-3xl mb-3">✅</div>
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">
              {t('detection.accurateDetection')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('detection.accurateDetectionDesc')}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl transition-colors duration-300">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">
              {t('detection.highConfidence')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('detection.highConfidenceDesc')}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl transition-colors duration-300">
            <div className="text-3xl mb-3">💡</div>
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">
              {t('detection.expertAdvice')}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t('detection.expertAdviceDesc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetectionPage