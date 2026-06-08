import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#13131f] border border-[#1e1e32] rounded-lg p-3 font-mono text-xs">
      <p className="text-[#6b6b8a] mb-1">{label}</p>
      <p className="text-[#00f5ff]">Score: <span className="text-[#e8e8f0]">{payload[0].value}</span></p>
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
    <div className="bg-[#13131f] border border-[#1e1e32] rounded-xl p-5">
      <h3 className="text-[#e8e8f0] font-mono text-sm font-bold mb-4">Recovery Score — Last 14 Days</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={data}>
          <XAxis dataKey="date" tick={{ fill: '#6b6b8a', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#6b6b8a', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={75} stroke="#00ff88" strokeDasharray="3 3" strokeOpacity={0.3} />
          <ReferenceLine y={35} stroke="#ff2d55" strokeDasharray="3 3" strokeOpacity={0.3} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#00f5ff"
            strokeWidth={2}
            dot={{ fill: '#00f5ff', r: 3, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#00f5ff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}