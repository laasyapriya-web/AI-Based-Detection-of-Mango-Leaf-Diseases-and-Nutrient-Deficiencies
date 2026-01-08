# 🥭 Mango Leaf Detection Backend

Flask-based REST API for mango leaf disease and nutrient deficiency detection using deep learning.

## 📋 Prerequisites

- Python 3.8+
- pip package manager
- Trained TensorFlow/Keras model (.h5 file)

## 🚀 Quick Start

### 1. Create Virtual Environment

```bash
python -m venv venv

# Activate on Windows
venv\Scripts\activate

# Activate on macOS/Linux
source venv/bin/activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Add Your Model

Place your trained model at:
```
backend/model/mango_model.h5
```

**Model Requirements:**
- Input shape: `(224, 224, 3)` - RGB images
- Output: 12 classes (softmax activation)
- Format: Keras .h5 file

### 4. Run Server

```bash
python app.py
```

Server will start at: `http://localhost:5000`

## 📡 API Endpoints

### Health Check
```bash
GET /health
```

### Predict Disease
```bash
POST /predict
Content-Type: multipart/form-data

Body:
  file: <image file>
```

**Response:**
```json
{
  "label": "Anthracnose",
  "category": "Disease",
  "confidence": 92.5,
  "recommendations": {
    "symptoms": "...",
    "treatment": "...",
    "prevention": "..."
  }
}
```

### Get All Classes
```bash
GET /classes
```

## 🧪 Testing

### Using curl
```bash
curl -X POST -F "file=@test_leaf.jpg" http://localhost:5000/predict
```

### Using Python
```python
import requests

url = "http://localhost:5000/predict"
files = {'file': open('leaf_image.jpg', 'rb')}
response = requests.post(url, files=files)
print(response.json())
```

## 📂 Project Structure

```
backend/
├── app.py                 # Main Flask application
├── requirements.txt       # Python dependencies
├── model/
│   └── mango_model.h5    # Trained model (you provide this)
├── utils/
│   ├── __init__.py
│   └── predict.py        # Prediction logic
└── uploads/              # Temporary upload folder
```

## 🔧 Configuration

Edit these settings in `app.py`:

```python
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Max file size
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
```

## 📊 Detected Classes

1. Anthracnose
2. Bacterial Canker
3. Cutting Weevil
4. Die Back
5. Gall Midge
6. Healthy
7. Powdery Mildew
8. Sooty Mould
9. Nutrient Deficiency - Nitrogen
10. Nutrient Deficiency - Potassium
11. Nutrient Deficiency - Magnesium
12. Nutrient Deficiency - Iron

## 🐛 Troubleshooting

**Model not found error:**
- Ensure model file exists at `model/mango_model.h5`
- Check file permissions

**Import errors:**
- Activate virtual environment
- Reinstall dependencies: `pip install -r requirements.txt`

**CORS errors:**
- flask-cors is installed and configured
- Check frontend API URL

## 🚀 Deployment

### Using Gunicorn
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Environment Variables
```bash
export FLASK_ENV=production
export MODEL_PATH=model/mango_model.h5
```

## 📝 License

MIT License - See LICENSE file for details