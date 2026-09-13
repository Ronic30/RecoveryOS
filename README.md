# RecoveryOS 🧠

> *People track workouts obsessively but ignore recovery — which is where gains actually happen.*

A full-stack recovery tracking dashboard. Log your daily workout intensity, sleep, and soreness — RecoveryOS calculates a **Recovery Score (0–100)** and tells you exactly whether to train hard, go light, or rest, with reasoning.

**Live demo:** [recovery-os-six.vercel.app](https://recovery-os-six.vercel.app/)

---

## Features

- **Recovery Score Engine** — weighted algorithm across 4 inputs: sleep hours, sleep quality, soreness, and workout intensity
- **Training Recommendation** — one of four states: `TRAIN HARD`, `MODERATE`, `LIGHT`, or `REST`, each with a reason
- **Theme Switcher** — dynamic Dark Mode & Light Mode support with smooth transition
- **Recovery Ring** — animated SVG progress ring, color-coded by score range
- **Charts** — line chart (score trend), bar chart (sleep hours), area chart (soreness vs intensity) over 14 days
- **Streaks** — consecutive day logging streak counter
- **History** — full log table with per-entry delete
- **Accounts & Auth** — JWT-based signup/login; each user's logs are private to their account
- **MongoDB Atlas Storage** — logs and accounts are stored server-side in MongoDB Cloud
- **One log per day** — upsert pattern (`findOneAndUpdate` with `upsert: true`) prevents duplicate entries

---

## Tech Stack

| Layer    | Tool                                           |
| -------- | ----------------------------------------------- |
| Frontend | React 19 + Vite, Tailwind CSS v4, Recharts, lucide-react |
| Backend  | Express, Mongoose, Node.js                      |
| Auth     | JWT (jsonwebtoken) + bcryptjs for password hashing |
| Database | MongoDB / MongoDB Atlas Cloud                   |

---

## How the Recovery Score Works

Each daily log entry takes 4 inputs:

| Input             | Range           | Weight |
| ----------------- | --------------- | ------ |
| Sleep Hours       | 1–12 hrs        | 35%    |
| Sleep Quality     | 1–5             | 30%    |
| Soreness Level    | 1–5 (inverted)  | 25%    |
| Workout Intensity | 1–10 (inverted) | 10%    |

Each factor is normalized to a 0–100 scale, weighted, and summed into a final score:

```js
const score =
  sleepHoursScore   * 0.35 +
  sleepQualityScore * 0.30 +
  sorenessScore     * 0.25 +   // inverted: high soreness = low score
  intensityScore    * 0.10     // inverted: hard session = needs more recovery
```

**Score → Recommendation mapping:**

| Score  | Recommendation |
| ------ | -------------- |
| 75–100 | ⚡ Train Hard   |
| 55–74  | 🎯 Moderate     |
| 35–54  | 🌤 Go Light     |
| 0–34   | 🛌 Rest Today   |

---

## API

All `/api/logs` routes require `Authorization: Bearer <token>`.

| Method | Route              | Description                          |
| ------ | ------------------ | ------------------------------------- |
| POST   | `/api/auth/signup` | Create an account, returns `{ user, token }` |
| POST   | `/api/auth/login`  | Log in, returns `{ user, token }`     |
| GET    | `/api/auth/me`     | Get the logged-in user's profile      |
| GET    | `/api/logs`        | List all recovery logs for the user   |
| POST   | `/api/logs`        | Create or update today's log (upsert by date) |
| DELETE | `/api/logs/:date`  | Delete the log for a given date       |

---

## Project Structure

```
server/
├── db.js                        # Mongoose MongoDB connection
├── index.js                     # Express app + routes
├── middleware/
│   └── auth.js                  # JWT verification middleware
└── models/
    ├── User.js                  # MongoDB User schema
    └── RecoveryLog.js           # MongoDB RecoveryLog schema

src/
├── components/
│   ├── Navbar.jsx               # Theme switcher + navigation
│   ├── RecoveryRing.jsx         # Animated SVG score ring
│   ├── RecommendationCard.jsx   # Color-coded training advice
│   ├── StatsRow.jsx             # Today's 4-metric summary
│   ├── DailyLogForm.jsx         # Slider-based input form
│   ├── StreakBadge.jsx          # Consecutive day counter
│   ├── LogTable.jsx             # History table with delete
│   ├── ScoreLineChart.jsx       # 14-day score trend
│   ├── SleepBarChart.jsx        # 14-day sleep bar chart
│   └── SorenessIntensityChart.jsx
├── context/
│   ├── AuthContext.jsx          # Global Auth state
│   └── ThemeContext.jsx         # Global Theme switcher (Dark/Light)
├── hooks/
│   └── useRecoveryLogs.js       # State + MongoDB API sync
├── pages/
│   ├── AuthPage.jsx
│   ├── DashboardPage.jsx
│   ├── LogPage.jsx
│   ├── ChartsPage.jsx
│   └── HistoryPage.jsx
├── utils/
│   ├── recoveryScore.js         # Pure score calculation function
│   └── storage.js
└── App.jsx                      # App root with ThemeProvider & AuthProvider
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Ronic30/RecoveryOS.git
cd RecoveryOS

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# fill in JWT_SECRET and MONGODB_URI

# Run backend + frontend together
npm run dev:all

# Or run them separately:
npm run server   # Express API on http://localhost:5000
npm run dev      # Vite dev server
```

---

## Key Concepts Used

- **Custom Hook** — `useRecoveryLogs` encapsulates state, API sync, streak calculation, and upsert logic
- **MongoDB Atlas & Mongoose** — cloud database storage with strict Mongoose schemas
- **JWT Auth** — stateless authentication; token issued on signup/login, verified via middleware on protected routes
- **Password Hashing** — bcryptjs, never storing plaintext passwords
- **Theme Switcher** — CSS custom properties toggled dynamically via React Context
- **Upsert Pattern** — `findOneAndUpdate({ userId, date }, ..., { upsert: true })` prevents duplicate daily entries
- **Scale Inversion** — soreness and intensity scores are inverted so the algorithm direction is consistent
- **Linear Normalization** — `(value - min) / (max - min)` used for slider fill and score calculation
- **SVG strokeDashoffset** — progress ring drawn by offsetting a single full-circumference dash

---

## Author

**Ronic**
