# ⚡ Quick Start Guide - 5 Minutes Setup

Get MangoLeaf AI running in 5 minutes!

## 📋 Prerequisites Checklist

- [ ] Python 3.8+ installed
- [ ] Node.js 18+ installed
- [ ] Git installed

---

## 🚀 Backend Setup (2 minutes)

```bash
# 1. Navigate to backend
cd backend

# 2. Create & activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 3. Install dependencies (takes ~1 minute)
pip install -r requirements.txt

# 4. Place your model (IMPORTANT!)
# Copy your mango_model.h5 to: backend/model/mango_model.h5

# 5. Start server
python app.py
```

✅ **Backend running at http://localhost:5000**

---

## 🎨 Frontend Setup (2 minutes)

**Open a NEW terminal** (keep backend running!)

```bash
# 1. Navigate to frontend
cd frontend

# 2. Install dependencies (takes ~1 minute)
npm install

# 3. Start development server
npm run dev
```

✅ **Frontend running at http://localhost:3000**

---

## 🎯 Quick Test

### Test Backend API:
```bash
curl http://localhost:5000/health
```

Should return:
```json
{"status": "healthy", "message": "API is running"}
```

### Test Frontend:
Open browser: **http://localhost:3000**

---

## 📦 What You Get

```
✅ Landing page with features
✅ Image upload interface
✅ AI-powered detection
✅ Results with recommendations
✅ About page
```

---

## 🔑 Key Files to Customize

### Backend
- `backend/utils/predict.py` - Update CLASS_NAMES if your model differs
- `backend/model/mango_model.h5` - YOUR TRAINED MODEL GOES HERE

### Frontend
- `frontend/src/components/DetectionPage.jsx` - Update API_URL if needed

---

## 🐛 Quick Troubleshooting

### Backend not starting?
```bash
# Check Python version
python --version  # Should be 3.8+

# Check if virtual environment is activated
which python  # Should point to venv/bin/python
```

### Frontend not starting?
```bash
# Check Node version
node --version  # Should be 18+

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Model not found?
```bash
# Check if model exists
ls backend/model/mango_model.h5

# If not, create directory and add your model
mkdir -p backend/model
# Then copy your model file there
```

---

## 📝 One-Command Setup (Advanced)

Create a `setup.sh` script:

```bash
#!/bin/bash

# Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python app.py &

# Frontend setup
cd ../frontend
npm install
npm run dev &

echo "✅ Setup complete! Open http://localhost:3000"
```

Run with:
```bash
chmod +x setup.sh
./setup.sh
```

---

## 🎉 You're Ready!

1. Open **http://localhost:3000**
2. Click **"Start Detection"**
3. Upload a mango leaf image
4. Get instant AI diagnosis!

---

## 📞 Need Help?

- Check full README.md
- Review backend/README.md
- Review frontend/README.md
- Create GitHub issue

---

**Happy Detecting! 🥭✨**