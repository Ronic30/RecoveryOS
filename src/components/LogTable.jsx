const recommendationColor = {
  TRAIN_HARD: '#10b981',
  MODERATE: '#3b82f6',
  LIGHT: '#eab308',
  REST: '#ef233c',
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
      <div className="bg-theme-card border border-theme rounded-2xl p-8 text-center shadow-sm">
        <p className="text-theme-muted font-mono text-sm">No logs recorded yet.</p>
      </div>
    )
  }

  return (
    <div className="bg-theme-card border border-theme rounded-2xl overflow-hidden shadow-sm">
      <div className="grid grid-cols-6 px-4 py-3 border-b border-theme bg-theme-main/50">
        {['Date', 'Score', 'Sleep', 'Soreness', 'Rec.', ''].map(h => (
          <span key={h} className="text-theme-muted text-[10px] font-mono uppercase tracking-widest">{h}</span>
        ))}
      </div>

      {logs.map((log) => (
        <div
          key={log.date}
          className="grid grid-cols-6 px-4 py-3.5 border-b border-theme last:border-0 hover:bg-theme-main/60 transition-colors items-center"
        >
          <span className="text-theme-primary font-mono text-xs">{log.date.slice(5)}</span>

          <span className="font-mono text-sm font-bold" style={{
            color: log.score >= 75 ? '#10b981' : log.score >= 55 ? '#3b82f6' : log.score >= 35 ? '#eab308' : '#ef233c'
          }}>
            {log.score}
          </span>

          <span className="text-theme-secondary font-mono text-xs">{log.sleepHours}h</span>

          <span className="text-theme-secondary font-mono text-xs">{log.sorenessLevel}/5</span>

          <span className="font-mono text-xs font-medium" style={{ color: recommendationColor[log.recommendation] }}>
            {recommendationLabel[log.recommendation]}
          </span>

          <button
            onClick={() => onDelete(log.date)}
            className="text-theme-muted hover:text-[#ef233c] font-mono text-xs transition-colors cursor-pointer text-right p-1"
            title="Delete Log"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}