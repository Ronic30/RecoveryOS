import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-theme-card border border-theme rounded-xl p-3 font-mono text-xs space-y-1 shadow-md">
      <p className="text-theme-muted mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }} className="font-semibold">
          {p.dataKey === 'soreness' ? 'Soreness' : 'Intensity'}: <span className="text-theme-primary">{p.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function SorenessIntensityChart({ logs }) {
  const data = [...logs]
    .slice(0, 14)
    .reverse()
    .map(l => ({
      date: l.date.slice(5),
      soreness: l.sorenessLevel,
      intensity: l.workoutIntensity,
    }))

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-5 shadow-sm">
      <h3 className="text-theme-primary font-mono text-sm font-bold mb-4">Soreness vs Workout Intensity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace' }}>
                {value === 'soreness' ? 'Soreness' : 'Intensity'}
              </span>
            )}
          />
          <Area type="monotone" dataKey="intensity" stroke="#f97316" fill="#f97316" fillOpacity={0.15} strokeWidth={2} />
          <Area type="monotone" dataKey="soreness" stroke="#ef233c" fill="#ef233c" fillOpacity={0.15} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}