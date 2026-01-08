# 🥭 MangoLeaf AI - Frontend

React-based frontend for the Mango Leaf Disease Detection System.

## 📋 Prerequisites

- Node.js 18+ and npm
- Running backend server (Flask API)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file:

```bash
VITE_API_URL=http://localhost:5000
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── LandingPage.jsx      # Home page
│   │   ├── DetectionPage.jsx    # Image upload & detection
│   │   ├── ResultsPage.jsx      # Results display
│   │   └── AboutSection.jsx     # About/Team page
│   ├── App.jsx                  # Main application
│   ├── main.jsx                 # React entry point
│   └── index.css                # Global styles
├── index.html                   # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
└── package.json                # Dependencies

## 🎨 Technologies

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### Environment Variables

Set `VITE_API_URL` in your deployment platform:

```
VITE_API_URL=https://your-backend-api.com
```

## 🐛 Troubleshooting

**API Connection Issues:**
- Ensure backend is running on correct port
- Check CORS configuration
- Verify API URL in `.env`

**Build Errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

MIT License