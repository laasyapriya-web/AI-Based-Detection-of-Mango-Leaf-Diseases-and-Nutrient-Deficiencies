# 📂 Complete File Structure

## 🗂️ Full Project Tree

```
mangoleaf-ai/
│
├── README.md                          # Master documentation
├── QUICKSTART.md                      # 5-minute setup guide
├── FILE_STRUCTURE.md                  # This file
│
├── backend/                           # Flask Backend API
│   ├── app.py                        # Main Flask application (120 lines)
│   ├── requirements.txt              # Python dependencies (8 packages)
│   ├── README.md                     # Backend documentation
│   ├── .gitignore                    # Git ignore file
│   │
│   ├── model/                        # ML Model folder
│   │   ├── .gitkeep                 # Keep empty folder in git
│   │   └── mango_model.h5           # YOUR TRAINED MODEL (you provide)
│   │
│   ├── utils/                        # Utility modules
│   │   ├── __init__.py              # Package init (5 lines)
│   │   └── predict.py               # Prediction logic (300+ lines)
│   │
│   ├── uploads/                      # Temporary upload folder
│   │   └── .gitkeep                 # Keep empty folder in git
│   │
│   └── venv/                         # Virtual environment (auto-generated)
│
└── frontend/                          # React Frontend
    ├── package.json                  # Node dependencies
    ├── package-lock.json             # Lock file (auto-generated)
    ├── vite.config.js               # Vite configuration
    ├── tailwind.config.js           # Tailwind CSS config
    ├── postcss.config.js            # PostCSS config
    ├── .gitignore                   # Git ignore file
    ├── .env.example                 # Environment variables template
    ├── README.md                    # Frontend documentation
    ├── index.html                   # HTML entry point
    │
    ├── src/                         # Source code
    │   ├── main.jsx                # React entry point (10 lines)
    │   ├── App.jsx                 # Main App component (100+ lines)
    │   ├── index.css               # Global styles (80+ lines)
    │   │
    │   └── components/             # React components
    │       ├── LandingPage.jsx    # Home page (300+ lines)
    │       ├── DetectionPage.jsx  # Upload & detect (250+ lines)
    │       ├── ResultsPage.jsx    # Results display (250+ lines)
    │       └── AboutSection.jsx   # About/Team page (300+ lines)
    │
    ├── public/                      # Static assets
    │   └── vite.svg                # Vite logo
    │
    ├── node_modules/                # Dependencies (auto-generated)
    └── dist/                        # Production build (auto-generated)
```

---

## 📊 File Statistics

### Backend Files
| File | Lines | Purpose |
|------|-------|---------|
| app.py | ~120 | Main Flask API with endpoints |
| utils/predict.py | ~300 | ML prediction & recommendations |
| requirements.txt | 8 | Python dependencies |
| README.md | ~150 | Backend documentation |

**Total Backend Code:** ~600 lines

### Frontend Files
| File | Lines | Purpose |
|------|-------|---------|
| App.jsx | ~100 | Main application routing |
| LandingPage.jsx | ~300 | Home page with features |
| DetectionPage.jsx | ~250 | Image upload interface |
| ResultsPage.jsx | ~250 | Results display |
| AboutSection.jsx | ~300 | About/Team page |
| index.css | ~80 | Global styles |
| main.jsx | ~10 | React entry point |

**Total Frontend Code:** ~1,300 lines

### Configuration Files
| File | Purpose |
|------|---------|
| package.json | Node.js dependencies (React, Vite, Tailwind, Axios) |
| vite.config.js | Vite build configuration |
| tailwind.config.js | Tailwind CSS customization |
| postcss.config.js | PostCSS configuration |
| .env.example | Environment variables template |

---

## 📝 Key Files Explained

### Backend

#### `app.py`
Main Flask application with:
- `/health` - Health check endpoint
- `/predict` - Main prediction endpoint
- `/classes` - Get all detection classes
- File upload handling
- CORS configuration
- Error handling

#### `utils/predict.py`
ML prediction module with:
- Model loading (TensorFlow/Keras)
- Image preprocessing (OpenCV)
- 12 detection classes
- Comprehensive recommendations database
- Prediction logic

#### `requirements.txt`
Python dependencies:
```
Flask==3.0.0
flask-cors==4.0.0
tensorflow==2.15.0
opencv-python==4.8.1.78
numpy==1.24.3
Werkzeug==3.0.1
Pillow==10.1.0
gunicorn==21.2.0
```

---

### Frontend

#### `App.jsx`
Main application component:
- Page routing logic
- Navigation bar
- Footer
- State management

#### `LandingPage.jsx`
Home page with:
- Hero section
- Feature highlights
- Detection categories
- How it works
- Call-to-action

#### `DetectionPage.jsx`
Image upload interface:
- Drag-and-drop upload
- Image preview
- Loading states
- Error handling
- Tips section

#### `ResultsPage.jsx`
Results display:
- Confidence score bar
- Category badge
- Symptoms, treatment, prevention
- Print functionality
- Debug predictions panel

#### `AboutSection.jsx`
About page:
- Mission statement
- Technology stack
- Team members
- Key features
- How AI works

---

## 🔧 Configuration Files Details

### `package.json`
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.2"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.2.1",
    "tailwindcss": "^3.3.6",
    "vite": "^5.0.8"
  }
}
```

### `vite.config.js`
```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})
```

### `tailwind.config.js`
Custom Tailwind configuration with green theme colors

---

## 📦 Auto-Generated Folders

### Backend
- `venv/` - Python virtual environment
- `uploads/` - Temporary image storage
- `__pycache__/` - Python cache files

### Frontend
- `node_modules/` - Node.js packages
- `dist/` - Production build output

---

## 🚫 Ignored Files (.gitignore)

### Backend
```
__pycache__/
*.py[cod]
venv/
uploads/*
.env
```

### Frontend
```
node_modules/
dist/
.env
.env.local
```

---

## 📁 Empty Folders (with .gitkeep)

```
backend/model/.gitkeep
backend/uploads/.gitkeep
```

These ensure empty folders are tracked in git.

---

## 🎯 Files You Need to Create/Modify

### Required
1. **backend/model/mango_model.h5** - YOUR TRAINED MODEL

### Optional Customization
1. **backend/utils/predict.py** - Update CLASS_NAMES if needed
2. **frontend/.env** - Set API URL for production
3. **frontend/src/components/** - Customize UI

---

## 📊 Project Size

```
Total Files: ~25 files
Total Code Lines: ~2,000 lines
Backend Size: ~50 KB (without model)
Frontend Size: ~500 KB (without node_modules)
Model Size: Varies (typically 10-100 MB)
```

---

## ✅ Checklist for Complete Setup

- [ ] All backend files created
- [ ] All frontend files created
- [ ] Virtual environment set up
- [ ] Dependencies installed (backend)
- [ ] Dependencies installed (frontend)
- [ ] Model file added (mango_model.h5)
- [ ] .env file configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000

---

## 📞 Need a File?

All files have been provided in the artifacts. Simply:
1. Create the folder structure
2. Copy each file to its location
3. Follow QUICKSTART.md

---

**Complete file tree provided! 🎉**