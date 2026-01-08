"""
Mango Leaf Disease Prediction Module
With disease-to-nutrient deficiency mapping
"""

import os
import cv2
import numpy as np
import tensorflow as tf
from datetime import datetime
import traceback

# ================= CONFIGURATION =================
# Model paths
MODEL_PATHS = [
    os.path.join('model', 'mango_model.keras'),
    os.path.join('model', 'mango_model.h5'),
    'mango_model.keras',
    'mango_model.h5'
]

# Find which model exists
MODEL_PATH = None
MODEL_FORMAT = None
for path in MODEL_PATHS:
    if os.path.exists(path):
        MODEL_PATH = path
        MODEL_FORMAT = 'keras' if path.endswith('.keras') else 'h5'
        print(f"✅ Found model: {path} ({MODEL_FORMAT} format)")
        break

if MODEL_PATH is None:
    print("⚠️ WARNING: No model file found!")
    if os.path.exists('model'):
        print(f"📁 Model folder contents: {os.listdir('model')}")

# ================= CLASS DEFINITIONS =================
# 8 Disease classes from your training
DISEASE_CLASSES = [
    'Anthracnose',
    'Bacterial Canker', 
    'Cutting Weevil',
    'Die Back',
    'Gall Midge',
    'Healthy',
    'Powdery Mildew',
    'Sooty Mould'
]

# 4 Nutrient deficiency classes (mapped from diseases)
NUTRIENT_CLASSES = [
    'Nitrogen Deficiency',
    'Potassium Deficiency', 
    'Magnesium Deficiency',
    'Iron Deficiency'
]

# Combined list for API (12 total classes)
CLASS_NAMES = DISEASE_CLASSES + NUTRIENT_CLASSES

# ================= DISEASE TO NUTRIENT MAPPING =================
# Based on your training code mapping
DISEASE_TO_NUTRIENTS = {
    'Anthracnose': ['Nitrogen Deficiency', 'Potassium Deficiency'],
    'Bacterial Canker': ['Calcium Deficiency', 'Magnesium Deficiency'],
    'Cutting Weevil': ['Phosphorus Deficiency'],
    'Die Back': ['Nitrogen Deficiency', 'Potassium Deficiency', 'Magnesium Deficiency'],
    'Gall Midge': ['Nitrogen Deficiency'],
    'Healthy': [],
    'Powdery Mildew': ['Calcium Deficiency', 'Sulfur Deficiency'],
    'Sooty Mould': ['Potassium Deficiency']
}

# Alternative mapping using your 4 nutrient classes
DISEASE_TO_NUTRIENTS_SIMPLE = {
    'Anthracnose': ['Nitrogen Deficiency', 'Potassium Deficiency'],
    'Bacterial Canker': ['Magnesium Deficiency'],
    'Cutting Weevil': [],  # No direct nutrient mapping in your 4 classes
    'Die Back': ['Nitrogen Deficiency', 'Potassium Deficiency', 'Magnesium Deficiency'],
    'Gall Midge': ['Nitrogen Deficiency'],
    'Healthy': [],
    'Powdery Mildew': ['Magnesium Deficiency'],  # Closest match
    'Sooty Mould': ['Potassium Deficiency']
}

# ================= TREATMENT MAPPING =================
DISEASE_TO_TREATMENT = {
    'Anthracnose': {
        'description': 'Fungal disease causing dark lesions on leaves and fruits.',
        'symptoms': ['Dark sunken lesions', 'Black fruit spots', 'Twig dieback'],
        'chemical_treatment': ['Copper-based fungicides', 'Carbendazim', 'Mancozeb'],
        'organic_treatment': ['Neem oil spray', 'Baking soda solution', 'Garlic extract'],
        'prevention': ['Proper spacing', 'Avoid overhead watering', 'Remove infected leaves']
    },
    'Bacterial Canker': {
        'description': 'Bacterial infection causing cankers and gum oozing.',
        'symptoms': ['Water-soaked lesions', 'Cankers with gum', 'Leaf wilting'],
        'chemical_treatment': ['Copper oxychloride', 'Streptomycin sulfate', 'Kasugamycin'],
        'organic_treatment': ['Copper soap', 'Bordeaux mixture', 'Garlic-chili spray'],
        'prevention': ['Sterilize pruning tools', 'Improve drainage', 'Use resistant varieties']
    },
    'Cutting Weevil': {
        'description': 'Insect damage causing notches on leaf margins.',
        'symptoms': ['Notched leaf margins', 'Irregular feeding patterns', 'Reduced leaf area'],
        'chemical_treatment': ['Chlorpyriphos', 'Carbaryl', 'Imidacloprid'],
        'organic_treatment': ['Neem oil', 'Pyrethrin spray', 'Diatomaceous earth'],
        'prevention': ['Light traps', 'Manual removal', 'Crop rotation']
    },
    'Die Back': {
        'description': 'Fungal disease causing branch dieback from tips.',
        'symptoms': ['Tip drying', 'Brown discoloration', 'Leaf wilting on branches'],
        'chemical_treatment': ['Carbendazim', 'Thiophanate-methyl', 'Hexaconazole'],
        'organic_treatment': ['Prune infected branches', 'Apply neem paste', 'Cinnamon powder'],
        'prevention': ['Avoid waterlogging', 'Balanced fertilization', 'Proper pruning']
    },
    'Gall Midge': {
        'description': 'Insect infestation causing galls on leaves.',
        'symptoms': ['Leaf galls', 'Distorted growth', 'Reduced flowering'],
        'chemical_treatment': ['Dimethoate', 'Monocrotophos', 'Lambda-cyhalothrin'],
        'organic_treatment': ['Remove galled leaves', 'Neem seed extract', 'Yellow sticky traps'],
        'prevention': ['Destroy affected parts', 'Maintain hygiene', 'Avoid excess nitrogen']
    },
    'Healthy': {
        'description': 'Leaf is healthy with no disease symptoms.',
        'symptoms': ['Uniform green color', 'Normal leaf shape', 'No spots or lesions'],
        'chemical_treatment': ['No treatment needed'],
        'organic_treatment': ['Maintain current care'],
        'prevention': ['Regular monitoring', 'Balanced nutrition', 'Proper irrigation']
    },
    'Powdery Mildew': {
        'description': 'White powdery fungal growth on leaves.',
        'symptoms': ['White powdery coating', 'Leaf curling', 'Premature shedding'],
        'chemical_treatment': ['Wettable sulfur', 'Triadimefon', 'Myclobutanil'],
        'organic_treatment': ['Milk spray (1:9)', 'Baking soda solution', 'Neem oil'],
        'prevention': ['Good air circulation', 'Avoid dense planting', 'Morning watering']
    },
    'Sooty Mould': {
        'description': 'Black fungal growth from insect honeydew.',
        'symptoms': ['Black sooty coating', 'Reduced photosynthesis', 'Stunted growth'],
        'chemical_treatment': ['Control aphids/scales', 'Mild soap solution', 'Starch spray'],
        'organic_treatment': ['Wash leaves', 'Neem oil', 'Garlic spray for insects'],
        'prevention': ['Control sap-sucking insects', 'Maintain predators', 'Proper pruning']
    }
}

# Nutrient deficiency treatments
NUTRIENT_TREATMENTS = {
    'Nitrogen Deficiency': {
        'description': 'Essential for chlorophyll and growth.',
        'symptoms': ['Yellowing of older leaves', 'Stunted growth', 'Small leaves'],
        'treatment': ['Apply urea (46% N)', 'Ammonium sulfate', 'Well-decomposed FYM'],
        'application': ['Soil: 500g urea/tree', 'Foliar: 2% urea spray', 'Split applications'],
        'prevention': ['Regular soil testing', 'Balanced fertilization', 'Green manuring']
    },
    'Potassium Deficiency': {
        'description': 'Essential for fruit quality and disease resistance.',
        'symptoms': ['Leaf margin scorching', 'Leaf curling', 'Poor fruit color'],
        'treatment': ['Muriate of potash (60% K2O)', 'Potassium sulfate', 'Wood ash'],
        'application': ['Soil: 250g MOP/tree', 'Foliar: KNO3 spray', 'During fruit development'],
        'prevention': ['Maintain soil pH 6-7.5', 'Regular K application', 'Avoid waterlogging']
    },
    'Magnesium Deficiency': {
        'description': 'Essential for chlorophyll formation.',
        'symptoms': ['Interveinal chlorosis', 'Leaf margin curling up', 'Reduced fruit size'],
        'treatment': ['Magnesium sulfate', 'Dolomitic limestone', 'Epsom salt'],
        'application': ['Soil: 250g MgSO4/tree', 'Foliar: 1-2% Epsom salt', 'Corrects in 2-3 weeks'],
        'prevention': ['Balance with Ca & K', 'Regular soil testing', 'Use Mg-rich fertilizers']
    },
    'Iron Deficiency': {
        'description': 'Essential for chlorophyll synthesis.',
        'symptoms': ['Yellowing of young leaves', 'Green veins', 'Stunted new growth'],
        'treatment': ['Iron chelates', 'Ferrous sulfate', 'Iron-EDTA'],
        'application': ['Soil: 50g iron chelates', 'Foliar: 0.5% FeSO4 spray', 'Repeat 2-3 times'],
        'prevention': ['Maintain pH < 7.0', 'Add organic matter', 'Avoid waterlogging']
    }
}

# ================= MODEL LOADING =================
_model = None
_model_loaded = False

def load_prediction_model():
    """Load the TensorFlow model"""
    global _model, _model_loaded
    
    if not _model_loaded:
        try:
            if MODEL_PATH is None:
                raise FileNotFoundError("Model file not found. Check model/ folder.")
            
            print(f"📦 Loading model from: {os.path.abspath(MODEL_PATH)}")
            
            if MODEL_FORMAT == 'keras':
                _model = tf.keras.models.load_model(MODEL_PATH)
                print("✅ Model loaded (.keras format)")
            else:
                # Handle .h5 with potential batch_shape issue
                try:
                    _model = tf.keras.models.load_model(MODEL_PATH)
                    print("✅ Model loaded (.h5 format)")
                except Exception as e:
                    if "batch_shape" in str(e):
                        class FixedInputLayer(tf.keras.layers.InputLayer):
                            def __init__(self, **kwargs):
                                kwargs.pop('batch_shape', None)
                                super().__init__(**kwargs)
                        _model = tf.keras.models.load_model(
                            MODEL_PATH, 
                            custom_objects={'InputLayer': FixedInputLayer}
                        )
                        print("✅ Model loaded with batch_shape fix")
                    else:
                        raise
            
            print(f"📐 Input shape: {_model.input_shape}")
            print(f"📊 Output shape: {_model.output_shape}")
            print(f"🔢 Predicts {len(DISEASE_CLASSES)} diseases")
            
            _model_loaded = True
            
        except Exception as e:
            print(f"❌ Error loading model: {e}")
            raise
    
    return _model

# ================= IMAGE PROCESSING =================
def preprocess_image(image_path):
    """Preprocess image for model"""
    try:
        img = cv2.imread(image_path)
        if img is None:
            raise ValueError(f"Cannot read image: {image_path}")
        
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (224, 224))
        img = img.astype('float32') / 255.0
        img = np.expand_dims(img, axis=0)
        
        return img
    except Exception as e:
        print(f"❌ Preprocessing error: {e}")
        raise

# ================= PREDICTION LOGIC =================
def predict_leaf(image_path):
    """Main prediction function with nutrient mapping"""
    try:
        print(f"\n🔍 Predicting: {os.path.basename(image_path)}")
        
        # Load and preprocess
        model = load_prediction_model()
        img_array = preprocess_image(image_path)
        
        # Get disease prediction
        predictions = model.predict(img_array, verbose=0)[0]
        disease_idx = np.argmax(predictions)
        disease = DISEASE_CLASSES[disease_idx]
        disease_confidence = float(predictions[disease_idx]) * 100
        
        print(f"🎯 Disease: {disease} ({disease_confidence:.1f}%)")
        
        # Map to nutrient deficiencies
        nutrient_defs = DISEASE_TO_NUTRIENTS_SIMPLE.get(disease, [])
        
        # Get treatment info
        disease_info = DISEASE_TO_TREATMENT.get(disease, {})
        nutrient_info = {}
        
        if nutrient_defs:
            nutrient_info = NUTRIENT_TREATMENTS.get(nutrient_defs[0], {}) if nutrient_defs else {}
        
        # Prepare detailed response
        result = {
            'success': True,
            'disease_prediction': {
                'disease': disease,
                'confidence': round(disease_confidence, 2),
                'category': 'Healthy' if disease == 'Healthy' else 'Disease',
                'description': disease_info.get('description', ''),
                'symptoms': disease_info.get('symptoms', []),
                'chemical_treatment': disease_info.get('chemical_treatment', []),
                'organic_treatment': disease_info.get('organic_treatment', []),
                'prevention': disease_info.get('prevention', [])
            },
            'nutrient_analysis': {
                'deficiencies': nutrient_defs,
                'primary_deficiency': nutrient_defs[0] if nutrient_defs else None,
                'description': nutrient_info.get('description', ''),
                'treatment': nutrient_info.get('treatment', []),
                'application': nutrient_info.get('application', []),
                'prevention': nutrient_info.get('prevention', [])
            },
            'all_disease_predictions': [
                {'disease': DISEASE_CLASSES[i], 'confidence': round(float(pred) * 100, 2)}
                for i, pred in enumerate(predictions)
            ],
            'severity': 'Low' if disease == 'Healthy' else 'High',
            'timestamp': datetime.now().isoformat()
        }
        
        print(f"✅ Analysis complete!")
        print(f"   Nutrient deficiencies: {', '.join(nutrient_defs) if nutrient_defs else 'None'}")
        
        return result
        
    except Exception as e:
        print(f"❌ Prediction error: {e}")
        return {
            'success': False,
            'error': str(e),
            'disease_prediction': None,
            'nutrient_analysis': None
        }

# ================= HELPER FUNCTIONS =================
def get_model_info():
    """Get model information"""
    try:
        model = load_prediction_model()
        return {
            'success': True,
            'model': {
                'input_shape': model.input_shape[1:],
                'disease_classes': len(DISEASE_CLASSES),
                'nutrient_classes': len(NUTRIENT_CLASSES),
                'total_classes': len(CLASS_NAMES),
                'format': MODEL_FORMAT
            },
            'disease_classes': DISEASE_CLASSES,
            'nutrient_classes': NUTRIENT_CLASSES,
            'disease_to_nutrient_mapping': DISEASE_TO_NUTRIENTS_SIMPLE
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}

# For backward compatibility
def get_diagnosis_info(disease, category=None):
    """Legacy function for app.py"""
    info = DISEASE_TO_TREATMENT.get(disease, {})
    return {
        'description': info.get('description', ''),
        'symptoms': info.get('symptoms', []),
        'treatment': info.get('chemical_treatment', []),  # Default to chemical
        'prevention': info.get('prevention', [])
    }

def determine_category(disease):
    """Legacy function"""
    return 'Healthy' if disease == 'Healthy' else 'Disease'

# ================= TEST =================
if __name__ == "__main__":
    print("🧪 Testing Disease + Nutrient Prediction System")
    print("=" * 60)
    
    # Create test image
    test_img = np.zeros((300, 300, 3), dtype=np.uint8)
    test_img[:, :] = [0, 150, 0]
    cv2.imwrite('test_leaf.jpg', test_img)
    
    # Test prediction
    result = predict_leaf('test_leaf.jpg')
    
    if result['success']:
        print(f"\n✅ Test passed!")
        print(f"   Disease: {result['disease_prediction']['disease']}")
        print(f"   Confidence: {result['disease_prediction']['confidence']}%")
        print(f"   Nutrients: {result['nutrient_analysis']['deficiencies']}")
    else:
        print(f"\n❌ Test failed: {result.get('error')}")
    
    # Clean up
    if os.path.exists('test_leaf.jpg'):
        os.remove('test_leaf.jpg')

# ================= LEGACY SUPPORT =================
def predict_leaf_legacy(image_path):
    """Legacy version for frontend compatibility"""
    result = predict_leaf(image_path)
    
    if not result.get('success'):
        return result
    
    # Convert new format to old format
    disease_pred = result['disease_prediction']
    nutrient_analysis = result['nutrient_analysis']
    
    return {
        'success': True,
        'prediction': {
            'class': disease_pred['disease'],
            'confidence': disease_pred['confidence'],
            'category': disease_pred['category'],
            'description': disease_pred['description'],
            'symptoms': disease_pred['symptoms'],
            'treatment': disease_pred['chemical_treatment'],  # Default to chemical
            'prevention': disease_pred['prevention']
        },
        'top_predictions': result.get('all_disease_predictions', []),
        'nutrient_deficiencies': nutrient_analysis.get('deficiencies', []),
        'timestamp': result.get('timestamp'),
        'severity': result.get('severity', 'Medium')
    }