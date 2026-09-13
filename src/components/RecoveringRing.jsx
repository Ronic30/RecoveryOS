export default function RecoveryRing({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color =
    score >= 75 ? '#10b981' :
    score >= 55 ? '#3b82f6' :
    score >= 35 ? '#eab308' :
    '#ef233c'

  return (
    <div className="relative flex items-center justify-center" style={{ width: 150, height: 150 }}>
      <svg width="150" height="150" className="absolute top-0 left-0 -rotate-90">
        <circle cx="75" cy="75" r={radius} fill="none" stroke="var(--ring-track)" strokeWidth="10" />
        <circle
          cx="75" cy="75" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="flex flex-col items-center justify-center z-10">
        <span className="font-mono font-bold text-4xl" style={{ color }}>{score}</span>
        <span className="text-theme-muted text-[10px] font-mono tracking-widest">RECOVERY</span>
      </div>
    </div>
  )
}