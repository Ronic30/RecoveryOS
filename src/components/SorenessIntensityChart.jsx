import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#13131f] border border-[#1e1e32] rounded-lg p-3 font-mono text-xs space-y-1">
      <p className="text-[#6b6b8a] mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.dataKey === 'soreness' ? 'Soreness' : 'Intensity'}: <span className="text-[#e8e8f0]">{p.value}</span>
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
    <div className="bg-[#13131f] border border-[#1e1e32] rounded-xl p-5">
      <h3 className="text-[#e8e8f0] font-mono text-sm font-bold mb-4">Soreness vs Workout Intensity</h3>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={data}>
          <XAxis dataKey="date" tick={{ fill: '#6b6b8a', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#6b6b8a', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(value) => (
              <span style={{ color: '#6b6b8a', fontSize: 10, fontFamily: 'monospace' }}>
                {value === 'soreness' ? 'Soreness' : 'Intensity'}
              </span>
            )}
          />
          <Area type="monotone" dataKey="intensity" stroke="#ff6b35" fill="#ff6b35" fillOpacity={0.1} strokeWidth={2} />
          <Area type="monotone" dataKey="soreness" stroke="#ff2d55" fill="#ff2d55" fillOpacity={0.1} strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}