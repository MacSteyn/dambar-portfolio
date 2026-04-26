# ⚡ devfolio — Full-Stack Developer Portfolio

A modern, production-ready portfolio web application built with **React**, **Node.js**, **Express**, and **MongoDB**. Features dark mode, PWA support, CRUD admin panel, college projects showcase, and smooth animations.

---

## 📁 Project Structure

```
portfolio/
├── frontend/                    # React application (CRA)
│   ├── public/
│   │   ├── index.html           # SEO-optimized HTML shell
│   │   ├── manifest.json        # PWA manifest
│   │   ├── sw.js                # Service worker (offline support)
│   │   └── robots.txt
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.jsx   # Responsive nav + dark mode toggle
│       │   │   └── Footer.jsx
│       │   ├── pages/
│       │   │   ├── HomePage.jsx          # Hero, stats, featured work
│       │   │   ├── AboutPage.jsx         # Bio, skill bars, timeline
│       │   │   ├── ProjectsPage.jsx      # Filterable project grid
│       │   │   ├── CollegeProjectsPage.jsx  # Academic project showcase
│       │   │   ├── ContactPage.jsx       # Validated contact form
│       │   │   ├── AdminLoginPage.jsx    # JWT-protected admin login
│       │   │   ├── AdminDashboard.jsx    # Full CRUD admin panel
│       │   │   └── NotFoundPage.jsx
│       │   ├── sections/
│       │   │   ├── FeaturedProjects.jsx  # Home page projects section
│       │   │   └── SkillsPreview.jsx     # Animated tech stack grid
│       │   └── common/
│       │       ├── ProtectedRoute.jsx    # Auth guard for admin
│       │       └── ScrollToTop.jsx       # Route scroll + back-to-top
│       ├── context/
│       │   ├── ThemeContext.jsx          # Dark/light mode state
│       │   └── AuthContext.jsx           # Admin auth state
│       ├── utils/
│       │   └── api.js                   # Axios instance + interceptors
│       ├── styles/
│       │   ├── _variables.scss          # Design tokens + CSS vars
│       │   └── global.scss              # Global styles + Bootstrap import
│       ├── App.jsx                      # Routes + layout + providers
│       └── index.js
│
├── backend/                     # Node.js / Express API
│   ├── controllers/
│   │   ├── projectController.js # Full CRUD for projects
│   │   ├── contactController.js # Contact form + email
│   │   └── authController.js    # JWT login
│   ├── models/
│   │   ├── Project.js           # Project schema (incl. college fields)
│   │   ├── Contact.js           # Contact message schema
│   │   ├── Skill.js             # Skills schema
│   │   └── User.js              # Admin user schema
│   ├── routes/
│   │   ├── projects.js
│   │   ├── contact.js
│   │   ├── auth.js
│   │   └── skills.js
│   ├── middleware/
│   │   └── auth.js              # JWT verification middleware
│   ├── utils/
│   │   └── seed.js              # Sample data seeder
│   ├── uploads/                 # Uploaded images (gitignored)
│   ├── .env.example
│   ├── package.json
│   └── server.js                # Express app + DB connection
│
├── package.json                 # Root monorepo scripts
├── .gitignore
└── README.md
```

---

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** v18+ and npm v9+
- **MongoDB** (local) or MongoDB Atlas account
- **Git**

### 1 — Clone & Install

```bash
git clone https://github.com/yourusername/devfolio.git
cd devfolio

# Install all dependencies at once
npm run install:all
```

### 2 — Configure Environment

```bash
cd backend
cp .env.example .env
```
### 3 — Seed the Database

```bash
cd backend
npm run seed
```

### 4 — Run Both Servers

```bash
# From root — starts frontend (port 3000) + backend (port 5000) concurrently
npm run dev
```

Or run separately:
```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm start
```


### Frontend
- ⚡ React 18 with code splitting & lazy loading
- 🌙 Dark/Light mode with localStorage persistence
- 🎬 Framer Motion animations (page transitions, scroll reveals, hover effects)
- 📱 Fully responsive (mobile-first Bootstrap 5 grid)
- 🔍 SEO-optimized (react-helmet-async, structured data, OG tags)
- ♿ Accessible (semantic HTML, ARIA labels, focus management)
- 💀 Skeleton loading screens
- 🔔 Toast notifications (react-hot-toast)
- 🔤 Type animation on hero heading
- 📊 Animated skill bars with Intersection Observer

### Backend
- 🔐 JWT authentication for admin routes
- 🛡️ Helmet, CORS, rate limiting, mongo-sanitize (security)
- ✅ express-validator on all POST/PUT routes
- 📧 Nodemailer email notifications on contact form submit
- 🗜️ Gzip compression
- 🌱 Database seeder with sample data


---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 (CRA, functional components + hooks) |
| Styling | SCSS + Bootstrap 5 + CSS custom properties |
| Animations | Framer Motion |
| Routing | React Router v6 |
| HTTP Client | Axios with interceptors |
| State | React Context API |
| SEO | react-helmet-async |
| Backend | Node.js + Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JSON Web Tokens (JWT) |
| Validation | express-validator (BE) + custom (FE) |
| Email | Nodemailer |
| Security | Helmet, CORS, rate-limit, mongo-sanitize |
| PWA | Custom service worker + Web App Manifest |
| Deployment | Vercel (FE) + Render (BE) + MongoDB Atlas |

---

## 📄 License

MIT — Free to use and modify for personal portfolios.
