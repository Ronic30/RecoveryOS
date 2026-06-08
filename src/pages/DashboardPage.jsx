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
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-[#6b6b8a] font-mono text-sm">No log for today yet.</p>
        <p className="text-[#1e1e32] font-mono text-xs">Go to Log Today to get your Recovery Score.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[#e8e8f0] font-mono font-bold text-xl">Today's Recovery</h1>
          <p className="text-[#6b6b8a] text-xs font-mono mt-0.5">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {streak > 0 && (
          <div className="bg-[#13131f] border border-[#1e1e32] rounded-xl px-4 py-2 text-center">
            <p className="text-[#ffd60a] font-mono font-bold text-lg">{streak}</p>
            <p className="text-[#6b6b8a] text-[10px] font-mono uppercase tracking-widest">day streak</p>
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