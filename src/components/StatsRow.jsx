const Stat = ({ label, value, unit, color }) => (
  <div className="bg-theme-card border border-theme rounded-2xl p-4 flex flex-col gap-1 transition-all shadow-sm">
    <span className="text-theme-muted text-[10px] font-mono uppercase tracking-widest">{label}</span>
    <div className="flex items-end gap-1">
      <span className="font-mono font-bold text-2xl" style={{ color }}>{value}</span>
      {unit && <span className="text-theme-muted text-xs font-mono mb-0.5">{unit}</span>}
    </div>
  </div>
)

export default function StatsRow({ log }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat label="Sleep" value={log.sleepHours} unit="hrs" color="#3b82f6" />
      <Stat label="Sleep Quality" value={`${log.sleepQuality}/5`} color="#3b82f6" />
      <Stat label="Soreness" value={`${log.sorenessLevel}/5`} color="#ef233c" />
      <Stat label="Workout" value={`${log.workoutIntensity}/10`} color="#f97316" />
    </div>
  )
}