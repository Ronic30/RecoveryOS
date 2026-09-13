import { useState } from 'react'

const defaultForm = {
  workoutIntensity: 5,
  sleepHours: 7,
  sleepQuality: 3,
  sorenessLevel: 3,
}

const sliders = [
  {
    key: 'workoutIntensity',
    label: 'Yesterday\'s Workout Intensity',
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

export default function DailyLogForm({ onSubmit, alreadyLogged }) {
  const [form, setForm] = useState(defaultForm)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    setError(null)
    setLoading(true)
    try {
      await onSubmit(form)
      setSubmitted(true)
    } catch (err) {
      console.error('Submit log error:', err)
      setError(err.message || 'Failed to save log entry.')
    } finally {
      setLoading(false)
    }
  }

  if (alreadyLogged && !submitted) {
    return (
      <div className="border border-theme bg-theme-card rounded-2xl p-8 text-center shadow-sm">
        <p className="text-[#10b981] text-sm font-mono mb-2">✓ Already logged today</p>
        <p className="text-theme-muted text-xs font-mono">Come back tomorrow to log your next entry.</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="border border-[#10b981]/30 bg-theme-card rounded-2xl p-8 text-center shadow-sm">
        <p className="text-[#10b981] text-2xl mb-2">✓</p>
        <p className="text-theme-primary text-sm font-mono">Today's log saved to database.</p>
        <p className="text-theme-muted text-xs font-mono mt-1">Check the Dashboard for your Recovery Score.</p>
      </div>
    )
  }

  return (
    <div className="border border-theme bg-theme-card rounded-2xl p-6 space-y-6 shadow-sm">
      <div>
        <h2 className="text-theme-primary font-mono font-bold text-lg">Log Today</h2>
        <p className="text-theme-muted text-xs font-mono mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

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
        {loading ? 'SAVING LOG...' : 'CALCULATE RECOVERY SCORE →'}
      </button>
    </div>
  )
}