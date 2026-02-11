function AboutSection() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-green-700 dark:text-green-400 mb-6 transition-colors duration-300">
            About MangoLeaf AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 transition-colors duration-300">
            Empowering farmers with cutting-edge AI technology
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 mb-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-6">
            MangoLeaf AI is dedicated to revolutionizing agricultural practices by making
            advanced disease detection technology accessible to farmers worldwide. Our
            AI-powered platform helps identify mango leaf diseases early, enabling
            timely intervention and protecting valuable crops.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            We believe that technology should serve agriculture, not replace it. Our goal
            is to empower farmers with the tools they need to make informed decisions and
            maintain healthy, productive orchards.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 mb-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
            Our Technology
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Deep Learning Models
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our system is powered by state-of-the-art convolutional neural networks
                trained on thousands of mango leaf images. We use TensorFlow and Keras
                to build models that can accurately identify 8 different diseases and
                conditions with over 92% accuracy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Computer Vision
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Using OpenCV and advanced image processing techniques, we analyze leaf
                patterns, discoloration, and other visual indicators to provide accurate
                diagnoses in under 3 seconds.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                User-Friendly Interface
              </h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Built with React and modern web technologies, our platform is designed
                to be intuitive and accessible, even for those with limited technical
                knowledge. Works seamlessly on any device with camera support.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 mb-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-8 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg transition-colors duration-300">
                👨‍💻
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">Gurajala Laasyapriya</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">BCA Student</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                ML Enthusiast
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg transition-colors duration-300">
                🌾
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">Katta Teena Reddy</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">BCA Student</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                ML Enthusiast
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/40 rounded-full w-32 h-32 mx-auto mb-4 flex items-center justify-center text-5xl shadow-lg transition-colors duration-300">
                💻
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">Kovvuri Srivalli</h3>
              <p className="text-sm text-green-600 dark:text-green-400 font-semibold mb-2">BCA Student</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                ML Enthusiast
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 transition-all duration-300">
          <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-6">
            Detected Conditions
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Anthracnose',
              'Bacterial Canker',
              'Cutting Weevil',
              'Die Back',
              'Gall Midge',
              'Powdery Mildew',
              'Sooty Mould',
              'Healthy Leaves'
            ].map((disease, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 bg-green-50 dark:bg-gray-700 rounded-lg transition-colors duration-300"
              >
                <span className="text-green-600 dark:text-green-400 text-2xl mr-4">
                  ✓
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium">
                  {disease}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutSection