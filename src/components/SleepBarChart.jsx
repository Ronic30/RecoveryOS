import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-theme-card border border-theme rounded-xl p-3 font-mono text-xs shadow-md">
      <p className="text-theme-muted mb-1">{label}</p>
      <p className="text-[#3b82f6] font-semibold">Sleep: <span className="text-theme-primary">{payload[0].value}hrs</span></p>
    </div>
  )
}

export default function SleepBarChart({ logs }) {
  const data = [...logs]
    .slice(0, 14)
    .reverse()
    .map(l => ({
      date: l.date.slice(5),
      sleep: l.sleepHours,
    }))

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-5 shadow-sm">
      <h3 className="text-theme-primary font-mono text-sm font-bold mb-4">Sleep Hours — Last 14 Days</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 12]} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={8} stroke="#3b82f6" strokeDasharray="3 3" strokeOpacity={0.4} />
          <Bar dataKey="sleep" fill="#3b82f6" fillOpacity={0.7} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}