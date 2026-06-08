export default function StreakBadge({ streak }) {
  if (streak === 0) return null

  return (
    <div className="flex items-center gap-3 bg-[#13131f] border border-[#ffd60a]/20 rounded-xl px-5 py-4">
      <span className="text-3xl">🔥</span>
      <div>
        <p className="text-[#ffd60a] font-mono font-bold text-2xl">{streak} day{streak !== 1 ? 's' : ''}</p>
        <p className="text-[#6b6b8a] text-xs font-mono uppercase tracking-widest">current streak</p>
      </div>
    </div>
  )
}