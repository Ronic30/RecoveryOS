const Stat = ({ label, value, unit, color }) => (
  <div className="bg-[#13131f] border border-[#1e1e32] rounded-xl p-4 flex flex-col gap-1">
    <span className="text-[#6b6b8a] text-[10px] font-mono uppercase tracking-widest">{label}</span>
    <div className="flex items-end gap-1">
      <span className="font-mono font-bold text-2xl" style={{ color }}>{value}</span>
      {unit && <span className="text-[#6b6b8a] text-xs font-mono mb-0.5">{unit}</span>}
    </div>
  </div>
)

export default function StatsRow({ log }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <Stat label="Sleep" value={log.sleepHours} unit="hrs" color="#00f5ff" />
      <Stat label="Sleep Quality" value={`${log.sleepQuality}/5`} color="#00f5ff" />
      <Stat label="Soreness" value={`${log.sorenessLevel}/5`} color="#ff2d55" />
      <Stat label="Workout" value={`${log.workoutIntensity}/10`} color="#ff6b35" />
    </div>
  )
}