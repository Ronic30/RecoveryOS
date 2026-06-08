import { useRecoveryLogs } from '../hooks/useRecoveryLogs'
import StreakBadge from '../components/StreakBadge'
import LogTable from '../components/LogTable'

export default function HistoryPage() {
  const { logs, deleteLog, getStreak } = useRecoveryLogs()
  const streak = getStreak()

  return (
    <div className="space-y-5">
      <h1 className="text-[#e8e8f0] font-mono font-bold text-xl">History</h1>
      <StreakBadge streak={streak} />
      <LogTable logs={logs} onDelete={deleteLog} />
    </div>
  )
}