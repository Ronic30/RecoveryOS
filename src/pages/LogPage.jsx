import DailyLogForm from '../components/DailyLogForm'
import { useRecoveryLogs } from '../hooks/useRecoveryLogs'

export default function LogPage() {
  const { addLog, logs } = useRecoveryLogs()

  return (
    <div className="max-w-lg mx-auto">
      <DailyLogForm
        onSubmit={addLog}
        existingLogs={logs}
      />
    </div>
  )
}
