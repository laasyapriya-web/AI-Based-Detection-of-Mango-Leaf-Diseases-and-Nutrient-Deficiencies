import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import jsPDF from 'jspdf'

function ResultsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const { result, imageUrl } = location.state || {}
  const { t } = useTranslation()

  useEffect(() => {
    if (!result) {
      navigate('/detect')
    }
  }, [result, navigate])

  if (!result) {
    return null
  }

  const isHealthy = result.prediction.is_healthy
  const confidence = (result.prediction.confidence * 100).toFixed(1)
  const hasNutrientDeficiency = result.recommendations.nutrients && result.recommendations.nutrients.length > 0

  const downloadPDF = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 20
    let yPosition = margin

    // Title
    pdf.setFontSize(22)
    pdf.setFont('helvetica', 'bold')
    pdf.text('MangoLeaf AI Diagnostic Report', pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 10

    // Date and Time
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    const reportDate = new Date().toLocaleString()
    pdf.text(`Generated: ${reportDate}`, pageWidth / 2, yPosition, { align: 'center' })
    yPosition += 15

    // Add Image
    if (imageUrl) {
      try {
        const img = new Image()
        img.src = imageUrl
        await new Promise((resolve) => {
          img.onload = resolve
        })
        
        const imgWidth = 80
        const imgHeight = (img.height * imgWidth) / img.width
        const imgX = (pageWidth - imgWidth) / 2
        
        pdf.addImage(imageUrl, 'JPEG', imgX, yPosition, imgWidth, imgHeight)
        yPosition += imgHeight + 15
      } catch (error) {
        console.error('Error adding image to PDF:', error)
        yPosition += 10
      }
    }

    // Disease Detection Section
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Disease Detection', margin, yPosition)
    yPosition += 8

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`Disease: ${result.prediction.disease}`, margin, yPosition)
    yPosition += 7
    pdf.text(`Confidence: ${confidence}%`, margin, yPosition)
    yPosition += 7
    pdf.text(`Status: ${isHealthy ? 'Healthy' : 'Disease Detected'}`, margin, yPosition)
    yPosition += 12

    // Nutrient Analysis Section
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('Nutrient Analysis', margin, yPosition)
    yPosition += 8

    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    if (hasNutrientDeficiency) {
      pdf.text('Detected Deficiencies:', margin, yPosition)
      yPosition += 7
      result.recommendations.nutrients.forEach((nutrient, idx) => {
        pdf.text(`  ${idx + 1}. ${nutrient}`, margin + 5, yPosition)
        yPosition += 6
      })
    } else {
      pdf.text('No nutrient deficiencies detected', margin, yPosition)
      yPosition += 7
    }
    yPosition += 8

    // Treatment Recommendations Section
    if (result.recommendations.remedies && result.recommendations.remedies.length > 0) {
      if (yPosition > pageHeight - 60) {
        pdf.addPage()
        yPosition = margin
      }

      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Treatment Recommendations', margin, yPosition)
      yPosition += 8

      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      result.recommendations.remedies.forEach((remedy, idx) => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage()
          yPosition = margin
        }
        const lines = pdf.splitTextToSize(`${idx + 1}. ${remedy}`, pageWidth - 2 * margin)
        pdf.text(lines, margin, yPosition)
        yPosition += lines.length * 6 + 3
      })
    }

    // Top Predictions Section
    if (result.top_predictions && result.top_predictions.length > 0) {
      if (yPosition > pageHeight - 40) {
        pdf.addPage()
        yPosition = margin
      }

      yPosition += 8
      pdf.setFontSize(16)
      pdf.setFont('helvetica', 'bold')
      pdf.text('Top Predictions', margin, yPosition)
      yPosition += 8

      pdf.setFontSize(12)
      pdf.setFont('helvetica', 'normal')
      result.top_predictions.forEach((pred, idx) => {
        const predConfidence = (pred.confidence * 100).toFixed(1)
        pdf.text(`${idx + 1}. ${pred.disease}: ${predConfidence}%`, margin, yPosition)
        yPosition += 6
      })
    }

    // Footer
    pdf.setFontSize(8)
    pdf.setFont('helvetica', 'italic')
    pdf.text('MangoLeaf AI - Powered by Deep Learning', pageWidth / 2, pageHeight - 10, { align: 'center' })

    // Save PDF
    pdf.save(`MangoLeaf_Report_${Date.now()}.pdf`)
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-700 dark:text-green-400 mb-4 transition-colors duration-300">
            {t('results.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg transition-colors duration-300">
            {t('results.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {t('results.uploadedImage')}
            </h2>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="Analyzed leaf"
                className="w-full rounded-lg shadow-lg"
              />
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('results.diseaseDetection')}
              </h2>
              
              <div className={`p-6 rounded-xl mb-6 ${
                isHealthy 
                  ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' 
                  : 'bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-4xl">{isHealthy ? '✅' : '⚠️'}</span>
                  <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
                    isHealthy 
                      ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200' 
                      : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                  }`}>
                    {confidence}% {t('results.confidence')}
                  </span>
                </div>
                
                <h3 className={`text-2xl font-bold mb-2 ${
                  isHealthy 
                    ? 'text-green-700 dark:text-green-400' 
                    : 'text-red-700 dark:text-red-400'
                }`}>
                  {result.prediction.disease}
                </h3>
                
                <p className={`${
                  isHealthy 
                    ? 'text-green-600 dark:text-green-300' 
                    : 'text-red-600 dark:text-red-300'
                }`}>
                  {isHealthy ? t('results.healthy') : t('results.diseaseDetected')}
                </p>
              </div>

              {result.top_predictions && result.top_predictions.length > 0 && (
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-3">
                    {t('results.topPredictions')}
                  </h4>
                  <div className="space-y-2">
                    {result.top_predictions.map((pred, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          {pred.disease}
                        </span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {(pred.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('results.nutrientAnalysis')}
              </h2>
              
              {hasNutrientDeficiency ? (
                <div className="p-6 rounded-xl bg-orange-50 dark:bg-orange-900/20 border-2 border-orange-200 dark:border-orange-800">
                  <div className="flex items-center mb-4">
                    <span className="text-4xl mr-3">🌱</span>
                    <h3 className="text-xl font-bold text-orange-700 dark:text-orange-400">
                      {t('results.nutrientDeficiency')}
                    </h3>
                  </div>
                  <p className="text-orange-600 dark:text-orange-300 mb-4">
                    {t('results.nutrientDeficiencyDesc')}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {result.recommendations.nutrients.map((nutrient, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded-full font-semibold text-sm"
                      >
                        {nutrient}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800">
                  <div className="flex items-center">
                    <span className="text-4xl mr-3">✓</span>
                    <div>
                      <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-1">
                        {t('results.optimalNutrition')}
                      </h3>
                      <p className="text-green-600 dark:text-green-300">
                        {t('results.noDeficiency')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {result.recommendations.remedies && result.recommendations.remedies.length > 0 && (
          <div className="mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <span className="text-3xl mr-3">💊</span>
                {t('results.treatmentRecommendations')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {result.recommendations.remedies.map((remedy, idx) => (
                  <div
                    key={idx}
                    className="flex items-start p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800"
                  >
                    <span className="text-blue-600 dark:text-blue-400 mr-3 mt-1 font-bold">
                      {idx + 1}.
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {remedy}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="text-center space-y-4">
          <button
            onClick={downloadPDF}
            className="px-12 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mr-4"
          >
            📄 {t('results.downloadReport')}
          </button>
          <button
            onClick={() => navigate('/detect')}
            className="px-12 py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            {t('results.analyzeAnother')}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage