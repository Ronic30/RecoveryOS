# RecoveryOS 🧠

> *People track workouts obsessively but ignore recovery — which is where gains actually happen.*

A post-workout recovery dashboard built with React + Vite + Tailwind CSS v4. Log your daily workout intensity, sleep, and soreness — RecoveryOS calculates a **Recovery Score (0–100)** and tells you exactly whether to train hard, go light, or rest, with reasoning.

---

## Features

- **Recovery Score Engine** — weighted algorithm across 4 inputs: sleep hours, sleep quality, soreness, and workout intensity
- **Training Recommendation** — one of four states: `TRAIN HARD`, `MODERATE`, `LIGHT`, or `REST`, each with a reason
- **Recovery Ring** — animated SVG progress ring, color-coded by score range
- **Charts** — line chart (score trend), bar chart (sleep hours), area chart (soreness vs intensity) over 14 days
- **Streaks** — consecutive day logging streak counter
- **History** — full log table with per-entry delete
- **Persistent Storage** — all data lives in localStorage, no backend required
- **One log per day** — upsert pattern prevents duplicate entries

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 + Vite | Frontend framework + build tool |
| Tailwind CSS v4 | Utility-first styling via `@tailwindcss/vite` |
| Recharts | Line, bar, and area charts |
| lucide-react | Icons |
| localStorage | Client-side data persistence |

---

## How the Recovery Score Works

Each daily log entry takes 4 inputs:

| Input | Range | Weight |
|-------|-------|--------|
| Sleep Hours | 1–12 hrs | 35% |
| Sleep Quality | 1–5 | 30% |
| Soreness Level | 1–5 (inverted) | 25% |
| Workout Intensity | 1–10 (inverted) | 10% |

Each factor is normalized to a 0–100 scale, weighted, and summed into a final score:

```js
const score =
  sleepHoursScore   * 0.35 +
  sleepQualityScore * 0.30 +
  sorenessScore     * 0.25 +   // inverted: high soreness = low score
  intensityScore    * 0.10     // inverted: hard session = needs more recovery
```

**Score → Recommendation mapping:**

| Score | Recommendation |
|-------|----------------|
| 75–100 | ⚡ Train Hard |
| 55–74 | 🎯 Moderate |
| 35–54 | 🌤 Go Light |
| 0–34 | 🛌 Rest Today |

---

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── RecoveryRing.jsx         # Animated SVG score ring
│   ├── RecommendationCard.jsx   # Color-coded training advice
│   ├── StatsRow.jsx             # Today's 4-metric summary
│   ├── DailyLogForm.jsx         # Slider-based input form
│   ├── StreakBadge.jsx          # Consecutive day counter
│   ├── LogTable.jsx             # History table with delete
│   ├── ScoreLineChart.jsx       # 14-day score trend
│   ├── SleepBarChart.jsx        # 14-day sleep bar chart
│   └── SorenessIntensityChart.jsx
├── hooks/
│   └── useRecoveryLogs.js       # State + localStorage sync
├── pages/
│   ├── DashboardPage.jsx
│   ├── LogPage.jsx
│   ├── ChartsPage.jsx
│   └── HistoryPage.jsx
├── utils/
│   ├── recoveryScore.js         # Pure score calculation function
│   └── storage.js               # localStorage read/write helpers
└── App.jsx                      # State-based routing
```

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Ronic30/recovery-os.git
cd recovery-os

# Install dependencies
npm install

# Start dev server
npm run dev
```

---

## Key Concepts Used

- **Custom Hook** — `useRecoveryLogs` encapsulates state, localStorage sync, streak calculation, and upsert logic
- **Scale Inversion** — soreness and intensity scores are inverted so the algorithm direction is consistent
- **Linear Normalization** — `(value - min) / (max - min)` used for slider fill and score calculation
- **SVG strokeDashoffset** — progress ring drawn by offsetting a single full-circumference dash
- **Upsert Pattern** — existing today entry filtered out before inserting new one, preventing duplicates

---

## Author

**Ronic**
