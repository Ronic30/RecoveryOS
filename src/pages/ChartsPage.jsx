import { useRecoveryLogs } from '../hooks/useRecoveryLogs'
import ScoreLineChart from '../components/ScoreLineChart'
import SleepBarChart from '../components/SleepBarChart'
import SorenessIntensityChart from '../components/SorenessIntensityChart'

export default function ChartsPage() {
  const { logs } = useRecoveryLogs()

  if (logs.length < 2) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <p className="text-[#6b6b8a] font-mono text-sm">Not enough data yet.</p>
        <p className="text-[#1e1e32] font-mono text-xs">Log at least 2 days to see charts.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <h1 className="text-[#e8e8f0] font-mono font-bold text-xl">Trends</h1>
      <ScoreLineChart logs={logs} />
      <SleepBarChart logs={logs} />
      <SorenessIntensityChart logs={logs} />
    </div>
  )
}