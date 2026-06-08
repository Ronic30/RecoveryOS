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
    <div className="relative flex items-center justify-center" style={{ width: 140, height: 140 }}>
      <svg width="140" height="140" className="absolute top-0 left-0 -rotate-90">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#1e1e32" strokeWidth="10" />
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
      <div className="flex flex-col items-center justify-center z-10">
        <span className="font-mono font-bold text-4xl" style={{ color }}>{score}</span>
        <span className="text-[#6b6b8a] text-[10px] font-mono tracking-widest">RECOVERY</span>
      </div>
    </div>
  )
}