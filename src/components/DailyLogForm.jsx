import { useState } from 'react'
import { getToday } from '../utils/storage'
import { Calendar } from 'lucide-react'

const defaultForm = {
  workoutIntensity: 5,
  sleepHours: 7,
  sleepQuality: 3,
  sorenessLevel: 3,
}

const sliders = [
  {
    key: 'workoutIntensity',
    label: "Yesterday's Workout Intensity",
    min: 1, max: 10,
    description: (v) => ['', 'Rest day', 'Very light', 'Light', 'Easy', 'Moderate', 'Challenging', 'Hard', 'Very hard', 'Intense', 'Max effort'][v],
    color: '#f97316',
  },
  {
    key: 'sleepHours',
    label: 'Sleep Hours',
    min: 1, max: 12,
    description: (v) => `${v} hour${v !== 1 ? 's' : ''}`,
    color: '#3b82f6',
  },
  {
    key: 'sleepQuality',
    label: 'Sleep Quality',
    min: 1, max: 5,
    description: (v) => ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Perfect'][v],
    color: '#3b82f6',
  },
  {
    key: 'sorenessLevel',
    label: 'Muscle Soreness',
    min: 1, max: 5,
    description: (v) => ['', 'None', 'Mild', 'Moderate', 'Significant', 'Severe'][v],
    color: '#ef233c',
  },
]

export default function DailyLogForm({ onSubmit, existingLogs = [] }) {
  const [selectedDate, setSelectedDate] = useState(getToday)
  const [form, setForm] = useState(() => {
    const today = getToday()
    const existing = existingLogs.find(l => l.date === today)
    if (existing) {
      return {
        workoutIntensity: existing.workoutIntensity ?? 5,
        sleepHours: existing.sleepHours ?? 7,
        sleepQuality: existing.sleepQuality ?? 3,
        sorenessLevel: existing.sorenessLevel ?? 3,
      }
    }
    return defaultForm
  })
  const [submitted, setSubmitted] = useState(false)
  const [submittedEntry, setSubmittedEntry] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Find if there is an existing entry for the currently selected date
  const existingEntry = existingLogs.find(l => l.date === selectedDate)

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
    const existing = existingLogs.find(l => l.date === newDate)
    if (existing) {
      setForm({
        workoutIntensity: existing.workoutIntensity ?? 5,
        sleepHours: existing.sleepHours ?? 7,
        sleepQuality: existing.sleepQuality ?? 3,
        sorenessLevel: existing.sorenessLevel ?? 3,
      })
    } else {
      setForm(defaultForm)
    }
    setError(null)
    setSubmitted(false)
  }

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)
    try {
      const saved = await onSubmit({
        ...form,
        date: selectedDate
      })
      setSubmittedEntry(saved || { date: selectedDate })
      setSubmitted(true)
    } catch (err) {
      console.error('Submit log error:', err)
      setError(err.message || 'Failed to save log entry.')
    } finally {
      setLoading(false)
    }
  }

  const displayDate = (() => {
    try {
      if (!selectedDate) return ''
      return new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      })
    } catch {
      return selectedDate
    }
  })()

  if (submitted) {
    return (
      <div className="border border-[#10b981]/30 bg-theme-card rounded-2xl p-8 text-center shadow-sm space-y-4">
        <p className="text-[#10b981] text-3xl">✓</p>
        <div>
          <p className="text-theme-primary text-base font-mono font-bold">
            Log saved for {selectedDate}
          </p>
          {submittedEntry?.score !== undefined && (
            <p className="text-theme-secondary text-sm font-mono mt-1">
              Recovery Score: <span className="text-[#ef233c] font-bold">{submittedEntry.score}</span>
              {submittedEntry.recommendation && ` • ${submittedEntry.recommendation}`}
            </p>
          )}
          <p className="text-theme-muted text-xs font-mono mt-2">
            Your data has been recorded in the database.
          </p>
        </div>
        <div className="pt-2 flex justify-center gap-3">
          <button
            onClick={() => setSubmitted(false)}
            className="px-4 py-2.5 rounded-xl text-xs font-mono border border-theme bg-theme-main hover:bg-theme-card text-theme-primary transition-all cursor-pointer"
          >
            Edit / Log Another Date
          </button>
        </div>
      </div>
    )
  }

  const isToday = selectedDate === getToday()

  return (
    <div className="border border-theme bg-theme-card rounded-2xl p-6 space-y-6 shadow-sm">
      {/* Date Header & Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-theme">
        <div>
          <h2 className="text-theme-primary font-mono font-bold text-lg">Log Recovery</h2>
          <p className="text-theme-muted text-xs font-mono mt-0.5">
            {displayDate} {isToday ? '(Today)' : ''}
          </p>
        </div>

        {/* Date Picker Control */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center">
            <span className="absolute left-2.5 text-theme-muted pointer-events-none">
              <Calendar size={13} />
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="bg-theme-main border border-theme text-theme-primary text-xs font-mono pl-8 pr-3 py-1.5 rounded-xl focus:outline-none focus:border-[#ef233c] transition-colors cursor-pointer"
            />
          </div>
          <button
            type="button"
            onClick={() => handleDateChange(getToday())}
            disabled={isToday}
            className={`text-xs font-mono px-3 py-1.5 rounded-xl border border-theme transition-all ${
              isToday
                ? 'opacity-40 text-theme-muted cursor-not-allowed bg-theme-main'
                : 'hover:bg-theme-main text-[#ef233c] cursor-pointer'
            }`}
          >
            Today
          </button>
        </div>
      </div>

      {/* Notice if entry already exists */}
      {existingEntry && (
        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono flex items-center justify-between">
          <span>ℹ Entry already exists for this date (Score: {existingEntry.score}). Modifying sliders will update it.</span>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/40 text-[#ef233c] text-xs leading-relaxed font-mono">
          {error}
        </div>
      )}

      {sliders.map(({ key, label, min, max, description, color }) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-theme-primary text-xs font-mono">{label}</label>
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-theme bg-theme-main"
              style={{ color }}>
              {description(form[key])}
            </span>
          </div>

          <div className="relative">
            <input
              type="range"
              min={min}
              max={max}
              value={form[key]}
              onChange={(e) => setForm(prev => ({ ...prev, [key]: Number(e.target.value) }))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${color} 0%, ${color} ${((form[key] - min) / (max - min)) * 100}%, var(--border-color) ${((form[key] - min) / (max - min)) * 100}%, var(--border-color) 100%)`,
              }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-theme-muted font-mono">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3.5 rounded-xl font-mono text-xs font-bold tracking-widest uppercase transition-all cursor-pointer disabled:opacity-50
          bg-[#ef233c] hover:bg-[#d90429] text-white shadow-md flex items-center justify-center gap-2"
      >
        {loading
          ? 'SAVING LOG...'
          : existingEntry
          ? 'UPDATE RECOVERY SCORE →'
          : 'CALCULATE RECOVERY SCORE →'}
      </button>
    </div>
  )
}
