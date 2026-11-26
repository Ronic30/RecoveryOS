import { useState } from 'react'
import { useRecoveryLogs } from '../hooks/useRecoveryLogs'
import { getToday } from '../utils/storage'
import RecoveryRing from '../components/RecoveringRing'
import RecommendationCard from '../components/RecommendationCard'
import StatsRow from '../components/StatsRow'

export default function DashboardPage() {
  const { logs, getTodayLog, getStreak } = useRecoveryLogs()
  const todayLog = getTodayLog()
  const streak = getStreak()
  const [selectedDate, setSelectedDate] = useState('')

  // Derive active log directly from state and logs (no cascading effect needed)
  const activeLog = (selectedDate && logs.find(l => l.date === selectedDate)) || todayLog || logs[0]

  if (!activeLog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <p className="text-theme-muted font-mono text-sm font-medium">No logs recorded yet.</p>
        <p className="text-theme-muted/70 font-mono text-xs">Head over to 'Log Recovery' to calculate your recovery score.</p>
      </div>
    )
  }

  const isToday = activeLog.date === getToday()
  const formattedDate = new Date(activeLog.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-theme-primary font-mono font-bold text-xl">
              {isToday ? "Today's Recovery" : "Recovery Overview"}
            </h1>
            {logs.length > 1 && (
              <select
                value={activeLog.date}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="bg-theme-card border border-theme text-theme-primary text-xs font-mono px-2.5 py-1 rounded-xl focus:outline-none focus:border-[#ef233c] cursor-pointer"
              >
                {logs.map(l => (
                  <option key={l.date} value={l.date}>
                    {l.date === getToday() ? `Today (${l.date})` : l.date}
                  </option>
                ))}
              </select>
            )}
          </div>
          <p className="text-theme-muted text-xs font-mono mt-0.5">
            {formattedDate} {!isToday && !todayLog ? '• (Showing latest recorded entry)' : ''}
          </p>
        </div>
        {streak > 0 && (
          <div className="bg-theme-card border border-theme rounded-2xl px-4 py-2 text-center shadow-sm self-start sm:self-auto">
            <p className="text-[#ef233c] font-mono font-bold text-lg">{streak}</p>
            <p className="text-theme-muted text-[10px] font-mono uppercase tracking-widest">day streak</p>
          </div>
        )}
      </div>

      <div className="relative flex items-center justify-center py-4">
        <RecoveryRing score={activeLog.score} />
      </div>

      <RecommendationCard
        recommendation={activeLog.recommendation}
        reason={activeLog.reason}
      />

      <StatsRow log={activeLog} />
    </div>
  )
}
