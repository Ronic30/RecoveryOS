export default function StreakBadge({ streak }) {
  if (streak === 0) return null

  return (
    <div className="flex items-center gap-3 bg-theme-card border border-[#eab308]/30 rounded-2xl px-5 py-4 shadow-sm transition-all">
      <span className="text-3xl">🔥</span>
      <div>
        <p className="text-[#eab308] font-mono font-bold text-2xl">{streak} day{streak !== 1 ? 's' : ''}</p>
        <p className="text-theme-muted text-xs font-mono uppercase tracking-widest">current streak</p>
      </div>
    </div>
  )
}