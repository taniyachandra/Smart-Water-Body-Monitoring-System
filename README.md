# 💧 SWMS — Smart Water Monitoring System

A full-stack **MERN** web application to monitor the quality of India's rivers and lakes, report pollution, and explore live sensor readings, trends and machine-learning based water quality prediction.



![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Build-646CFF?logo=vite&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-Random%20Forest-F7931E?logo=scikitlearn&logoColor=white)

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Reference](#-api-reference)
- [Machine Learning Model](#-machine-learning-model)
- [Live Sensor Simulation](#-live-sensor-simulation)
- [Roles and Admin Access](#-roles-and-admin-access)
- [Known Limitations](#-known-limitations)
- [Future Scope](#-future-scope)
- [Author](#-author)

---

## 🌊 Overview

Water pollution is hard to track when data is scattered and citizens have no easy way to report problems. **SWMS** brings everything into one place:

- A **dashboard** of monitored water bodies with quality status, pH, turbidity, dissolved oxygen, TDS and temperature.
- An **interactive map** with quality-coloured markers.
- A **reporting system** where logged-in users submit pollution reports with photos, and admins review them.
- **Analytics, live monitoring and AI prediction** to understand trends and predict water quality.

---

## ✨ Features

### 🌍 For everyone
- **Water Bodies** — search by name or state, filter by type and quality, sort by name, quality, pH or TDS.
- **Water Body Details** — full readings for each river or lake.
- **Interactive Map** — MapLibre + MapTiler map with markers coloured by quality (Good / Moderate / Poor).
- **Analytics** — pie and bar charts (Recharts) for quality distribution, state-wise counts, TDS and dissolved oxygen.
- **Live & AI** — live sensor readings (auto-refresh every 10 s), 24-hour trends, and an AI quality predictor.
- **Quality alert banner** — shows when any water body is rated *Poor*.

### 👤 For registered users
- Signup / login with **JWT authentication** and **bcrypt** password hashing.
- **Forgot / reset password** with a secure, expiring, one-time link.
- **Report Pollution** with description, location and an optional **photo upload**.
- **My Reports** — track the status of every report you submitted.

### 🛠️ For admins
- **Manage reports** — change status (*Pending review, In progress, Resolved, Rejected*) and view reporter details and photos.
- **Manage water bodies** — add, edit and delete water bodies.
- **Role-based access control** enforced on the backend (not just hidden in the UI).

### 🎨 UI / UX
- Water-themed responsive design with animated waves
- **Dark mode** (remembers your choice)
- Toast notifications, skeleton loaders and a custom 404 page

---

## 🧰 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router, Recharts, MapLibre GL, react-hot-toast, CSS (custom design system) |
| **Backend** | Node.js, Express 5, Mongoose, JWT, bcryptjs, Multer, Nodemailer |
| **Database** | MongoDB Atlas |
| **Machine Learning** | Python, scikit-learn (Random Forest), model exported to JSON and served from Node |
| **Maps** | MapTiler (tiles) + MapLibre GL |

---

## 📸 Screenshots

> Add your screenshots to `docs/screenshots/` and they will appear here.

| Home | Map |
|---|---|
| ![Home](docs/screenshots/home.png) | ![Map](docs/screenshots/map.png) |

| Analytics | Live & AI |
|---|---|
| ![Analytics](docs/screenshots/analytics.png) | ![Live and AI](docs/screenshots/live-ai.png) |

| Admin Panel | Dark Mode |
|---|---|
| ![Admin](docs/screenshots/admin.png) | ![Dark mode](docs/screenshots/dark-mode.png) |

---

## 📁 Project Structure

```
Smart Water Monitoring System/
├── backend/
│   ├── config/            # Database connection
│   ├── middleware/        # auth (JWT), admin (role check), upload (Multer)
│   ├── ml/                # train.py and model.json (Random Forest)
│   ├── models/            # User, WaterBody, Report, Reading
│   ├── routes/            # auth, waterBodies, reports, admin, insights
│   ├── services/          # simulator.js (live sensor simulation)
│   ├── utils/             # quality.js (prediction), sendEmail.js
│   ├── seed.js            # Seeds the initial water bodies
│   ├── seedReadings.js    # Seeds 24 hours of history
│   ├── makeAdmin.js       # Promotes a user to admin
│   └── server.js
│
├── frontend/
│   └── src/
│       ├── components/    # Navbar, Footer, MapView, LiveMonitor, QualityPredictor ...
│       ├── context/       # AuthContext
│       ├── data/          # Initial water bodies data (used by seed.js)
│       ├── pages/         # Home, WaterBodies, MapPage, Analytics, Admin, Insights ...
│       ├── services/      # api.js, useWaterBodies.js
│       ├── water-theme.css
│       └── dark-theme.css
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster
- A free [MapTiler](https://www.maptiler.com/) API key
- *(Optional)* Python 3 with `scikit-learn` and `numpy`, only if you want to retrain the model

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

### 2. MongoDB Atlas setup

1. Create a free **M0** cluster.
2. Under **Database Access**, create a database user (use a simple password without special characters).
3. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) for development.
4. Copy the connection string from **Connect → Drivers**.

### 3. Backend setup

```bash
cd backend
npm install
```

Create `backend/.env` (see [Environment Variables](#-environment-variables)), then:

```bash
npm run seed            # add the initial water bodies
npm run seed:readings   # add 24 hours of history for the trend charts
npm run dev             # start the API on http://localhost:5000
```

### 4. Frontend setup

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_MAPTILER_API_KEY=your_maptiler_key
```

Then start the app:

```bash
npm run dev             # http://localhost:5173
```

> Run the backend and the frontend in **two separate terminals**.

### 5. Create an admin user

Sign up from the website first, then run:

```bash
cd backend
node makeAdmin.js your-email@example.com
```

Log out and log in again to see the **Admin Panel** option in the user menu.

> ⚠️ Do **not** run `npm run seed` again after using the app. It resets the water bodies to their original values.

---

## 🔐 Environment Variables

### `backend/.env`

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | API port (default `5000`) |
| `MONGO_URI` | **Yes** | MongoDB Atlas connection string (include the database name, e.g. `/swms`) |
| `JWT_SECRET` | **Yes** | Long random string used to sign tokens |
| `CLIENT_URL` | No | Frontend URL used in reset-password links (default `http://localhost:5173`) |
| `SIMULATION` | No | Set to `on` to enable live sensor simulation |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM` | No | SMTP settings to send real emails. If missing, the reset link is printed in the backend terminal |

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/swms?appName=Cluster0
JWT_SECRET=use_a_long_random_secret_here
CLIENT_URL=http://localhost:5173
SIMULATION=on
```

### `frontend/.env.local`

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |
| `VITE_MAPTILER_API_KEY` | MapTiler API key for the map |

> Never commit `.env` or `.env.local`. They are already in `.gitignore`.

---

## 📡 API Reference

Base URL: `http://localhost:5000/api`

### Auth

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/signup` | Create an account |
| POST | `/auth/login` | Log in and receive a JWT |
| POST | `/auth/forgot-password` | Request a password reset link |
| POST | `/auth/reset-password/:token` | Set a new password |

### Water bodies

| Method | Endpoint | Description |
|---|---|---|
| GET | `/water-bodies` | List all water bodies |
| GET | `/water-bodies/:id` | Get one water body |

### Reports *(login required)*

| Method | Endpoint | Description |
|---|---|---|
| POST | `/reports` | Submit a report (multipart form, optional `photo`) |
| GET | `/reports/mine` | List your own reports |

### Admin *(admin only)*

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/reports` | List all reports with reporter details |
| PATCH | `/admin/reports/:id` | Update report status |
| POST | `/admin/water-bodies` | Add a water body |
| PUT | `/admin/water-bodies/:id` | Edit a water body |
| DELETE | `/admin/water-bodies/:id` | Delete a water body |

### Live and AI

| Method | Endpoint | Description |
|---|---|---|
| POST | `/predict` | Predict quality from pH, temperature, turbidity, dissolved oxygen and TDS |
| GET | `/readings/:id?range=live` | Last 60 readings of a water body |
| GET | `/readings/:id?range=day` | Last 24 hours (downsampled) |

Protected routes expect the header `Authorization: Bearer <token>`.

---

## 🤖 Machine Learning Model

The **AI Prediction** tab predicts whether water is **Good**, **Moderate** or **Poor** from five readings: pH, temperature, turbidity, dissolved oxygen and TDS.

| Item | Details |
|---|---|
| Algorithm | Random Forest (15 trees, max depth 6) |
| Training | `backend/ml/train.py` (scikit-learn) |
| Dataset | **Synthetic** — 6,000 generated samples |
| Labels | Generated from water-quality rules based on common BIS / WHO limits, with 4% label noise |
| Test accuracy | ~91% (on the held-out synthetic test set) |
| Serving | Trees are exported to `ml/model.json` and evaluated directly in Node.js, so no Python is needed at runtime |
| Fallback | If `model.json` is missing, the backend uses the rule-based thresholds instead |

To retrain:

```bash
pip install scikit-learn numpy
python backend/ml/train.py
```

> **Note:** because the dataset is synthetic, the accuracy reflects how well the model learned these rules, not performance on real field data. See [Known Limitations](#-known-limitations).

---

## 📟 Live Sensor Simulation

There are no physical sensors connected. When `SIMULATION=on`, the backend simulates them:

- Every **10 seconds**, each water body's readings drift slightly (a bounded random walk that gently returns to the base values).
- The quality is **recalculated** with the ML model after every update.
- Each update is stored as a **reading**, which powers the live chart and the 24-hour trend.
- Readings are removed automatically after 24 hours (MongoDB TTL index).
- If an admin edits a water body, the simulation adopts the new values as its base.

---

## 🔑 Roles and Admin Access

| Role | Can do |
|---|---|
| **Visitor** | Browse water bodies, map, analytics, live monitor and AI prediction |
| **User** | Everything above, plus submit reports and view *My Reports* |
| **Admin** | Everything above, plus manage report status and add, edit or delete water bodies |

Admin routes are protected by both JWT authentication and a role check against the database on every request.

---

## ⚠️ Known Limitations

- **Readings are simulated.** Water body values come from seed data and a simulator, not from real sensors or government data feeds.
- **The ML dataset is synthetic.** The model is a demonstration of the full ML-to-web pipeline, not a validated scientific tool.
- **Photos are stored on the server's local disk.** On hosting platforms with temporary storage, use a cloud service such as Cloudinary before deploying.
- **No automated tests** yet.

---

## 🔭 Future Scope

- Integrate real data from CPCB / India-WRIS or IoT sensors
- Cloud image storage (Cloudinary / S3)
- Email and SMS alerts when a water body turns *Poor*
- Train the model on real labelled data
- Deploy the app (Render / Vercel)
- Unit and integration tests
- Multi-language support (Hindi and English)

---

## 👩‍💻 Author

**Taniya Chandra**
