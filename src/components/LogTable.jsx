const recommendationColor = {
  TRAIN_HARD: '#00ff88',
  MODERATE: '#00f5ff',
  LIGHT: '#ffd60a',
  REST: '#ff2d55',
}

const recommendationLabel = {
  TRAIN_HARD: 'Train Hard',
  MODERATE: 'Moderate',
  LIGHT: 'Light',
  REST: 'Rest',
}

export default function LogTable({ logs, onDelete }) {
  if (logs.length === 0) {
    return (
      <div className="bg-[#13131f] border border-[#1e1e32] rounded-xl p-8 text-center">
        <p className="text-[#6b6b8a] font-mono text-sm">No logs yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-[#13131f] border border-[#1e1e32] rounded-xl overflow-hidden">
      <div className="grid grid-cols-6 px-4 py-2 border-b border-[#1e1e32]">
        {['Date', 'Score', 'Sleep', 'Soreness', 'Rec.', ''].map(h => (
          <span key={h} className="text-[#6b6b8a] text-[10px] font-mono uppercase tracking-widest">{h}</span>
        ))}
      </div>

      {logs.map((log) => (
        <div
          key={log.date}
          className="grid grid-cols-6 px-4 py-3 border-b border-[#1e1e32] last:border-0 hover:bg-[#1a1a2e] transition-colors items-center"
        >
          <span className="text-[#e8e8f0] font-mono text-xs">{log.date.slice(5)}</span>

          <span className="font-mono text-sm font-bold" style={{
            color: log.score >= 75 ? '#00ff88' : log.score >= 55 ? '#00f5ff' : log.score >= 35 ? '#ffd60a' : '#ff2d55'
          }}>
            {log.score}
          </span>

          <span className="text-[#e8e8f0] font-mono text-xs">{log.sleepHours}h</span>

          <span className="text-[#e8e8f0] font-mono text-xs">{log.sorenessLevel}/5</span>

          <span className="font-mono text-xs" style={{ color: recommendationColor[log.recommendation] }}>
            {recommendationLabel[log.recommendation]}
          </span>

          <button
            onClick={() => onDelete(log.date)}
            className="text-[#1e1e32] hover:text-[#ff2d55] font-mono text-xs transition-colors cursor-pointer text-right"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}