import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#13131f] border border-[#1e1e32] rounded-lg p-3 font-mono text-xs">
      <p className="text-[#6b6b8a] mb-1">{label}</p>
      <p className="text-[#00f5ff]">Sleep: <span className="text-[#e8e8f0]">{payload[0].value}hrs</span></p>
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
    <div className="bg-[#13131f] border border-[#1e1e32] rounded-xl p-5">
      <h3 className="text-[#e8e8f0] font-mono text-sm font-bold mb-4">Sleep Hours — Last 14 Days</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" tick={{ fill: '#6b6b8a', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 12]} tick={{ fill: '#6b6b8a', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <ReferenceLine y={8} stroke="#00f5ff" strokeDasharray="3 3" strokeOpacity={0.3} />
          <Bar dataKey="sleep" fill="#00f5ff" fillOpacity={0.7} radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}