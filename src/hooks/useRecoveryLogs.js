import { useState, useEffect } from 'react'
import { getLogs, saveLogs, getToday } from '../utils/storage'
import { calculateRecoveryScore } from '../utils/recoveryScore'

export function useRecoveryLogs() {
  const [logs, setLogs] = useState([])

  useEffect(() => {
    setLogs(getLogs())
  }, [])

  const addLog = (formData) => {
    const today = getToday()
    const existing = logs.filter(l => l.date !== today)  // one entry per day

    const entry = {
      date: today,
      workoutIntensity: formData.workoutIntensity,  // 1–10
      sleepHours: formData.sleepHours,              // 1–12
      sleepQuality: formData.sleepQuality,          // 1–5
      sorenessLevel: formData.sorenessLevel,        // 1–5
      ...calculateRecoveryScore(formData),          // score + recommendation + reason
    }

    const updated = [entry, ...existing].sort((a, b) => b.date.localeCompare(a.date))
    setLogs(updated)
    saveLogs(updated)
    return entry
  }

  const deleteLog = (date) => {
    const updated = logs.filter(l => l.date !== date)
    setLogs(updated)
    saveLogs(updated)
  }

  const getTodayLog = () => logs.find(l => l.date === getToday()) || null

  const getStreak = () => {
    if (logs.length === 0) return 0
    let streak = 0
    const today = new Date(getToday())

    for (let i = 0; i < logs.length; i++) {
      const expected = new Date(today)
      expected.setDate(today.getDate() - i)
      const expectedStr = expected.toISOString().split('T')[0]
      if (logs[i]?.date === expectedStr) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  return { logs, addLog, deleteLog, getTodayLog, getStreak }
}