import { useRecoveryLogs } from '../hooks/useRecoveryLogs'
import RecoveryRing from '../components/RecoveringRing'
import RecommendationCard from '../components/RecommendationCard'
import StatsRow from '../components/StatsRow'

export default function DashboardPage() {
  const { getTodayLog, getStreak } = useRecoveryLogs()
  const todayLog = getTodayLog()
  const streak = getStreak()

  if (!todayLog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center">
        <p className="text-theme-muted font-mono text-sm font-medium">No log recorded for today yet.</p>
        <p className="text-theme-muted/70 font-mono text-xs">Head over to 'Log Today' to calculate your recovery score.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-theme-primary font-mono font-bold text-xl">Today's Recovery</h1>
          <p className="text-theme-muted text-xs font-mono mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {streak > 0 && (
          <div className="bg-theme-card border border-theme rounded-2xl px-4 py-2 text-center shadow-sm">
            <p className="text-[#ef233c] font-mono font-bold text-lg">{streak}</p>
            <p className="text-theme-muted text-[10px] font-mono uppercase tracking-widest">day streak</p>
          </div>
        )}
      </div>

      <div className="relative flex items-center justify-center py-4">
        <RecoveryRing score={todayLog.score} />
      </div>

      <RecommendationCard
        recommendation={todayLog.recommendation}
        reason={todayLog.reason}
      />

      <StatsRow log={todayLog} />
    </div>
  )
}