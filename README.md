# Ethiopian Elections 2026 Portal (የኢትዮጵያ ምርጫ 2018)

A comprehensive, state-of-art civic technology front-end web portal engineered to provide detailed information and open data concerning the upcoming 7th General Ethiopian Election.

This project is a standalone, performance-focused Vanilla HTML/CSS/JS application that emphasizes offline-first data availability and beautiful Dark Glassmorphism UI aesthetics.

## 🚀 Features
- **Deep Leader Profiles**: Extensive biographical data and official social media footprints for politically exposed persons.
- **Interactive TopoJSON Map**: A dynamic, fully projected Highcharts SVG Map of Ethiopia allowing users to visualize regional political data.
- **Real-Time Analytics**: Live data visualization dashboards built with Chart.js measuring party representation and digital influence.
- **Election Timeline**: Live synchronized countdown timers tracking voter registration deadlines and election day milestones.
- **Bilingual Interface**: Beautiful typography utilizing Google's `Noto Sans Ethiopic` to natively support Amharic alongside English.
- **Dynamic Search**: High-performance local filtering index for quick leader search.

## 📁 Architecture
The project strictly enforces a highly organized directory structure with no external local setup dependencies.
```text
/
├── index.html           # Main bilingual brutalist landing portal
├── css/
│   └── style.css        # Core Dark Glassmorphism design system
├── js/
│   ├── app.js           # Main directory logic and search grid
│   ├── et-all.js        # Hardcoded geo-topology map polygons
│   ├── ethiopia_data.js # Global civic database (JSON payload)
│   ├── map_app.js       # Highmaps integration logic
│   ├── parties_app.js   # Political party rendering and filtering
│   ├── parties_data.js  # Dedicated party manifesto database
│   └── profile.js       # Dynamic URL-param Deep Profile loader
└── html/
    ├── analytics.html   # Charts and real-time visualization dashboards
    ├── ethiopia.html    # Core directory search container
    ├── map.html         # Interactive regional mapping tool
    ├── parties.html     # Registered organizations grid
    ├── profile.html     # Reusable individual bio viewer
    └── timeline.html    # Live countdown engine
```

## 🛠 Technology Stack
- **HTML5 & Vanilla CSS3**: Highly optimized semantic markup built fundamentally on a pure dark glassmorphism design. No CSS Frameworks utilized.
- **Vanilla JavaScript**: Pure JS implementation without React/Vue overhead ensuring instantaneous loading.
- **Highmaps & Proj4js**: Enterprise-grade SVG map rendering and geo-coordinate projection.
- **Chart.js**: Lightweight, responsive line, bar, and pie charting tool.

## ⚡ Setup & Deployment
This application relies on localized data arrays. It does not require a backend engine to view records and can function entirely offline via local files, circumventing internet restrictions.

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   ```
2. **Open `index.html`** in any modern web browser. No `npm install` or node server is required to view the core project functionality.

## 🎨 Design System
Powered entirely by custom CSS utilizing:
- **Fonts**: `Outfit` (Primary), `Noto Sans Ethiopic` (Amharic), `Caveat` (Handwriting)
- **UI Paradigm**: Frosted Glass UI `backdrop-filter: blur(16px)`
- **Color Palette**: Off-Black Slate (`#0f172a`), Azure Blue (`#3b82f6`), Neon Purple (`#8b5cf6`) with responsive ambient background blobs.
