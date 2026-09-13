import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-theme-card border border-theme rounded-xl p-3 font-mono text-xs shadow-md">
      <p className="text-theme-muted mb-1">{label}</p>
      <p className="text-[#3b82f6] font-semibold">Score: <span className="text-theme-primary">{payload[0].value}</span></p>
    </div>
  )
}

export default function ScoreLineChart({ logs }) {
  const data = [...logs]
    .slice(0, 14)
    .reverse()
    .map(l => ({
      date: l.date.slice(5),
      score: l.score,
    }))

  return (
    <div className="bg-theme-card border border-theme rounded-2xl p-5 shadow-sm">
      <h3 className="text-theme-primary font-mono text-sm font-bold mb-4">Recovery Score — Last 14 Days</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: 'var(--text-muted)', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={75} stroke="#10b981" strokeDasharray="3 3" strokeOpacity={0.4} />
          <ReferenceLine y={35} stroke="#ef233c" strokeDasharray="3 3" strokeOpacity={0.4} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ fill: '#3b82f6', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#3b82f6' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}