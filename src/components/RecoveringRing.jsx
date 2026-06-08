export default function RecoveryRing({ score }) {
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  const color =
    score >= 75 ? '#00ff88' :
    score >= 55 ? '#00f5ff' :
    score >= 35 ? '#ffd60a' :
    '#ff2d55'

  return (
    <div className="flex flex-col items-center justify-center">
      <svg width="140" height="140" className="-rotate-90">
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke="#1e1e32"
          strokeWidth="10"
        />
        <circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono font-bold text-4xl" style={{ color }}>
          {score}
        </span>
        <span className="text-[#6b6b8a] text-xs font-mono">RECOVERY</span>
      </div>
    </div>
  )
}