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
    color: '#ff6b35',
  },
  {
    key: 'sleepHours',
    label: 'Sleep Hours',
    min: 1, max: 12,
    description: (v) => `${v} hour${v !== 1 ? 's' : ''}`,
    color: '#00f5ff',
  },
  {
    key: 'sleepQuality',
    label: 'Sleep Quality',
    min: 1, max: 5,
    description: (v) => ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Perfect'][v],
    color: '#00f5ff',
  },
  {
    key: 'sorenessLevel',
    label: 'Muscle Soreness',
    min: 1, max: 5,
    description: (v) => ['', 'None', 'Mild', 'Moderate', 'Significant', 'Severe'][v],
    color: '#ff2d55',
  },
]

export default function DailyLogForm({ onSubmit, alreadyLogged }) {
  const [form, setForm] = useState(defaultForm)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    const result = onSubmit(form)
    setSubmitted(true)
    return result
  }

  if (alreadyLogged && !submitted) {
    return (
      <div className="border border-[#1e1e32] bg-[#13131f] rounded-xl p-8 text-center">
        <p className="text-[#00ff88] text-sm font-mono mb-2">✓ Already logged today</p>
        <p className="text-[#6b6b8a] text-xs">Come back tomorrow to log your next entry.</p>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="border border-[#00ff88]/30 bg-[#13131f] rounded-xl p-8 text-center">
        <p className="text-[#00ff88] text-2xl mb-2">✓</p>
        <p className="text-[#e8e8f0] text-sm font-mono">Today's log saved.</p>
        <p className="text-[#6b6b8a] text-xs mt-1">Check the Dashboard for your Recovery Score.</p>
      </div>
    )
  }

  return (
    <div className="border border-[#1e1e32] bg-[#13131f] rounded-xl p-6 space-y-6">
      <div>
        <h2 className="text-[#e8e8f0] font-mono font-bold text-lg">Log Today</h2>
        <p className="text-[#6b6b8a] text-xs mt-1">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {sliders.map(({ key, label, min, max, description, color }) => (
        <div key={key} className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-[#e8e8f0] text-xs font-mono">{label}</label>
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-[#1e1e32]"
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
              className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, ${color} 0%, ${color} ${((form[key] - min) / (max - min)) * 100}%, #1e1e32 ${((form[key] - min) / (max - min)) * 100}%, #1e1e32 100%)`,
              }}
            />
          </div>

          <div className="flex justify-between text-[10px] text-[#6b6b8a] font-mono">
            <span>{min}</span>
            <span>{max}</span>
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-lg font-mono text-sm font-bold tracking-widest transition-all cursor-pointer
          bg-[#1a1a2e] text-[#00f5ff] border border-[#00f5ff]/30
          hover:bg-[#00f5ff]/10 hover:border-[#00f5ff]/60"
      >
        CALCULATE RECOVERY SCORE →
      </button>
    </div>
  )
}