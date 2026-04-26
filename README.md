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

Edit `backend/.env`:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your_super_secret_key_minimum_32_characters
JWT_EXPIRE=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password        # Gmail App Password
EMAIL_FROM=your@gmail.com
FRONTEND_URL=http://localhost:3000
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=Admin@123456
```

### 3 — Seed the Database

```bash
cd backend
npm run seed
```

This creates:
- 6 sample projects (3 personal + 3 college)
- 20 skills across categories
- Admin user with the credentials from your `.env`

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

### 5 — Access the App

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Portfolio frontend |
| `http://localhost:3000/admin/login` | Admin panel login |
| `http://localhost:5000/api/health` | API health check |
| `http://localhost:5000/api/projects` | Projects API |

---

## 🔧 Customization Checklist

### Personal Info (must update)
- [ ] **`frontend/public/index.html`** — name, description, Twitter handle, OG URL
- [ ] **`frontend/src/components/pages/HomePage.jsx`** — your name, bio, GitHub/LinkedIn URLs
- [ ] **`frontend/src/components/pages/AboutPage.jsx`** — bio text, skills, timeline entries
- [ ] **`frontend/src/components/layout/Navbar.jsx`** — logo text, nav links
- [ ] **`frontend/src/components/layout/Footer.jsx`** — social links
- [ ] **`frontend/public/manifest.json`** — app name
- [ ] **`frontend/public/robots.txt`** — your domain
- [ ] **Avatar image** — replace the GitHub avatar URL with your own photo
- [ ] **Resume** — add `frontend/public/resume.pdf`

### Projects
Add via the Admin Panel at `/admin` or directly via the API:
```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"title":"My Project","description":"...","techStack":["React","Node.js"],"type":"personal"}'
```

---

## 🌐 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build

# Install Vercel CLI
npm i -g vercel
vercel --prod
```

Add environment variable in Vercel dashboard:
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

### Backend → Render

1. Push code to GitHub
2. Create new **Web Service** on [render.com](https://render.com)
3. Set **Root Directory** to `backend`
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Add all environment variables from `.env` (use `MONGODB_URI_PROD` with Atlas URI)

### Database → MongoDB Atlas

1. Create cluster at [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create database user and whitelist IPs (0.0.0.0/0 for Render)
3. Copy connection string to `MONGODB_URI_PROD` in your `.env`
4. Run the seed script pointing to Atlas:
   ```bash
   MONGODB_URI=mongodb+srv://... node backend/utils/seed.js
   ```

### HTTPS / SSL
- **Vercel** — HTTPS automatic on all deployments
- **Render** — HTTPS automatic on `.onrender.com` domains
- **Custom domain** — add in Vercel/Render dashboard; certificates auto-provisioned via Let's Encrypt

---

## 🔑 API Reference

### Projects
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | ❌ | List all projects (supports `?type=college&category=web&featured=true&search=react&page=1`) |
| GET | `/api/projects/college` | ❌ | College projects only |
| GET | `/api/projects/:id` | ❌ | Single project |
| POST | `/api/projects` | ✅ Admin | Create project |
| PUT | `/api/projects/:id` | ✅ Admin | Update project |
| DELETE | `/api/projects/:id` | ✅ Admin | Delete project |

### Contact
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/contact` | ❌ | Submit contact form |
| GET | `/api/contact` | ✅ Admin | List all messages |
| PATCH | `/api/contact/:id` | ✅ Admin | Update message status |

### Skills
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/skills` | ❌ | All skills (grouped by category) |
| POST | `/api/skills` | ✅ Admin | Create skill |
| PUT | `/api/skills/:id` | ✅ Admin | Update skill |
| DELETE | `/api/skills/:id` | ✅ Admin | Delete skill |

### Auth
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/login` | ❌ | Admin login → returns JWT |
| GET | `/api/auth/me` | ✅ | Get current user |

---

## ✨ Features

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

### PWA
- 📲 Installable on mobile & desktop
- 📶 Offline fallback via service worker
- ⚡ Static asset caching

---

## 🚀 Advanced Features to Add (2026 Roadmap)

| Feature | Complexity | Impact |
|---------|-----------|--------|
| **AI Chatbot** — OpenAI-powered chat widget that answers visitor questions about your experience | Medium | ⭐⭐⭐⭐⭐ |
| **Analytics Dashboard** — Plausible/Umami self-hosted privacy-friendly analytics | Low | ⭐⭐⭐⭐ |
| **Blog Section** — MDX-powered blog with syntax highlighting and reading time | Medium | ⭐⭐⭐⭐ |
| **GitHub Activity Feed** — Live GitHub contribution graph via API | Low | ⭐⭐⭐ |
| **3D Hero** — Three.js particle background or 3D avatar with React Three Fiber | High | ⭐⭐⭐⭐ |
| **Resume Parser** — AI that reads your PDF resume and auto-populates skills | High | ⭐⭐⭐⭐ |
| **Visitor Counter** — Redis-backed real-time visitor count | Low | ⭐⭐ |
| **Internationalization (i18n)** — Multi-language support with react-i18next | Medium | ⭐⭐⭐ |
| **Project Case Studies** — Rich project detail pages with MDX content | Medium | ⭐⭐⭐⭐ |
| **Testimonials Section** — Carousel with LinkedIn recommendations | Low | ⭐⭐⭐ |

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
