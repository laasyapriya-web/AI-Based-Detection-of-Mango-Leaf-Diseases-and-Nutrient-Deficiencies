from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import cv2
import os
import traceback
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model

# --------------------------------------------------
# App setup
# --------------------------------------------------
app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = "uploads"
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg"}
MODEL_PATH = "model/best_model.keras"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16MB

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# --------------------------------------------------
# Classes (MUST match training order)
# --------------------------------------------------
CLASS_NAMES = [
    "Anthracnose",
    "Bacterial Canker",
    "Cutting Weevil",
    "Die Back",
    "Gall Midge",
    "Healthy",
    "Powdery Mildew",
    "Sooty Mould"
]

# --------------------------------------------------
# Recommendations
# --------------------------------------------------
DISEASE_TO_NUTRIENTS = {
    "Anthracnose": ["Nitrogen", "Potassium"],
    "Bacterial Canker": ["Calcium", "Magnesium"],
    "Cutting Weevil": ["Phosphorus"],
    "Die Back": ["Nitrogen", "Potassium", "Magnesium"],
    "Gall Midge": ["Nitrogen"],
    "Healthy": [],
    "Powdery Mildew": ["Calcium", "Sulfur"],
    "Sooty Mould": ["Potassium"]
}

DISEASE_TO_REMEDIES = {
    "Anthracnose": ["Apply copper-based fungicides", "Prune infected leaves"],
    "Bacterial Canker": ["Apply copper bactericides", "Prune infected branches"],
    "Cutting Weevil": ["Use neem-based insecticides", "Remove affected leaves"],
    "Die Back": ["Apply balanced NPK fertilizer", "Prune dead branches"],
    "Gall Midge": ["Apply systemic insecticides", "Remove galled leaves"],
    "Healthy": ["Maintain current care routine"],
    "Powdery Mildew": ["Apply sulfur-based fungicides", "Improve air circulation"],
    "Sooty Mould": ["Control sap-sucking insects", "Wash leaves with soap water"]
}

# --------------------------------------------------
# Load Keras model
# --------------------------------------------------
model = None

def load_keras_model():
    global model
    try:
        if not os.path.exists(MODEL_PATH):
            print(f"❌ Model not found: {MODEL_PATH}")
            return False

        print(f"📂 Loading model from {MODEL_PATH}")
        model = load_model(MODEL_PATH)
        print("✅ Model loaded successfully")
        return True

    except Exception:
        traceback.print_exc()
        return False

# --------------------------------------------------
# Helpers
# --------------------------------------------------
def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def preprocess_image(img):
    """
    MUST match training preprocessing
    """
    img = cv2.resize(img, (224, 224))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

# --------------------------------------------------
# Routes
# --------------------------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({
        "message": "Mango Leaf Disease Detection API",
        "status": "running"
    })


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "model_loaded": model is not None,
        "classes": len(CLASS_NAMES)
    })


@app.route("/classes", methods=["GET"])
def classes():
    return jsonify(CLASS_NAMES)


@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded"}), 503

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Invalid file type"}), 400

    filepath = os.path.join(app.config["UPLOAD_FOLDER"], secure_filename(file.filename))
    file.save(filepath)

    try:
        img = cv2.imread(filepath)
        if img is None:
            raise ValueError("Invalid image")

        img = preprocess_image(img)

        preds = model.predict(img)[0]
        class_index = int(np.argmax(preds))
        prediction = CLASS_NAMES[class_index]
        confidence = float(preds[class_index])

        response = {
            "prediction": {
                "disease": prediction,
                "confidence": confidence,
                "is_healthy": prediction == "Healthy"
            },
            "recommendations": {
                "nutrients": DISEASE_TO_NUTRIENTS.get(prediction, []),
                "remedies": DISEASE_TO_REMEDIES.get(prediction, [])
            },
            "top_predictions": [
                {
                    "disease": CLASS_NAMES[i],
                    "confidence": float(preds[i])
                }
                for i in np.argsort(preds)[-3:][::-1]
            ]
        }

        return jsonify(response)

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

    finally:
        if os.path.exists(filepath):
            os.remove(filepath)

# --------------------------------------------------
# Main
# --------------------------------------------------
if __name__ == "__main__":
    print("🚀 Starting Mango Leaf Detection API")

    if load_keras_model():
        app.run(host="0.0.0.0", port=5000, debug=True)
    else:
        print("❌ Failed to load model")
