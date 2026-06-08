import DailyLogForm from '../components/DailyLogForm'
import { useRecoveryLogs } from '../hooks/useRecoveryLogs'

export default function LogPage() {
  const { addLog, getTodayLog } = useRecoveryLogs()

  return (
    <div className="max-w-lg mx-auto">
      <DailyLogForm
        onSubmit={addLog}
        alreadyLogged={!!getTodayLog()}
      />
    </div>
  )
}