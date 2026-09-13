const config = {
  TRAIN_HARD: {
    label: 'Train Hard',
    color: '#10b981',
    border: '#10b981',
    icon: '⚡',
  },
  MODERATE: {
    label: 'Moderate Training',
    color: '#3b82f6',
    border: '#3b82f6',
    icon: '🎯',
  },
  LIGHT: {
    label: 'Go Light',
    color: '#eab308',
    border: '#eab308',
    icon: '🌤',
  },
  REST: {
    label: 'Rest Today',
    color: '#ef233c',
    border: '#ef233c',
    icon: '🛌',
  },
}

export default function RecommendationCard({ recommendation, reason }) {
  const c = config[recommendation] || config.REST

  return (
    <div
      className="rounded-2xl p-5 border bg-theme-card transition-all shadow-sm"
      style={{ borderColor: `${c.border}40` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{c.icon}</span>
        <span className="font-mono font-bold text-sm tracking-wide" style={{ color: c.color }}>
          {c.label.toUpperCase()}
        </span>
      </div>
      <p className="text-theme-secondary text-xs font-mono leading-relaxed">{reason}</p>
    </div>
  )
}