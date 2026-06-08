const config = {
  TRAIN_HARD: {
    label: 'Train Hard',
    color: '#00ff88',
    border: '#00ff88',
    icon: '⚡',
  },
  MODERATE: {
    label: 'Moderate Training',
    color: '#00f5ff',
    border: '#00f5ff',
    icon: '🎯',
  },
  LIGHT: {
    label: 'Go Light',
    color: '#ffd60a',
    border: '#ffd60a',
    icon: '🌤',
  },
  REST: {
    label: 'Rest Today',
    color: '#ff2d55',
    border: '#ff2d55',
    icon: '🛌',
  },
}

export default function RecommendationCard({ recommendation, reason }) {
  const c = config[recommendation] || config.REST

  return (
    <div
      className="rounded-xl p-5 border bg-[#13131f]"
      style={{ borderColor: `${c.border}30` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">{c.icon}</span>
        <span className="font-mono font-bold text-sm" style={{ color: c.color }}>
          {c.label.toUpperCase()}
        </span>
      </div>
      <p className="text-[#6b6b8a] text-xs font-mono leading-relaxed">{reason}</p>
    </div>
  )
}