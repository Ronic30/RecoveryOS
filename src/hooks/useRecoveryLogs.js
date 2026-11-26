import { useState, useEffect, useCallback } from 'react'
import { useAuth } from '../context/AuthContext'
import { getToday } from '../utils/storage'
import { calculateRecoveryScore } from '../utils/recoveryScore'
import { safeFetchJson } from '../utils/api'

export function useRecoveryLogs() {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { token } = useAuth()

  const fetchLogs = useCallback(async () => {
    if (!token) {
      setLogs([])
      setLoading(false)
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/logs', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.ok) {
        const data = await safeFetchJson(res)
        setLogs(data)
        setError(null)
      } else {
        const errData = await safeFetchJson(res).catch(() => ({}))
        setError(errData.error || 'Failed to fetch logs')
      }
    } catch (err) {
      console.error('Error fetching user logs:', err)
      setError('Network error fetching logs')
    } finally {
      setLoading(false)
    }
  }, [token])

  // Sync legacy local storage logs if existing when user logs in
  useEffect(() => {
    async function syncLegacyLogs() {
      if (!token) return

      try {
        const localData = localStorage.getItem('recovery_os_logs')
        if (localData) {
          const parsed = JSON.parse(localData)
          if (Array.isArray(parsed) && parsed.length > 0) {
            // Post each legacy log to user account
            for (const item of parsed) {
              await fetch('/api/logs', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(item)
              })
            }
            // Clear legacy local storage after sync
            localStorage.removeItem('recovery_os_logs')
          }
        }
      } catch (err) {
        console.error('Error syncing legacy logs:', err)
      } finally {
        fetchLogs()
      }
    }

    syncLegacyLogs()
  }, [token, fetchLogs])

  const addLog = async (formData) => {
    if (!token) return null

    const logDate = formData.date || getToday()
    const calculated = calculateRecoveryScore(formData)

    const entry = {
      date: logDate,
      workoutIntensity: Number(formData.workoutIntensity),
      sleepHours: Number(formData.sleepHours),
      sleepQuality: Number(formData.sleepQuality),
      sorenessLevel: Number(formData.sorenessLevel),
      score: calculated.score,
      level: calculated.recommendation || 'MODERATE',
      recommendation: calculated.recommendation,
      reason: calculated.reason
    }

    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(entry)
      })

      if (res.ok) {
        const savedEntry = await safeFetchJson(res)
        setLogs(prev => {
          const filtered = prev.filter(l => l.date !== logDate)
          return [savedEntry, ...filtered].sort((a, b) => b.date.localeCompare(a.date))
        })
        return savedEntry
      } else {
        const errData = await safeFetchJson(res).catch(() => ({}))
        throw new Error(errData.error || 'Failed to save log entry')
      }
    } catch (err) {
      console.error('addLog error:', err)
      throw err
    }
  }

  const deleteLog = async (date) => {
    if (!token) return

    try {
      const res = await fetch(`/api/logs/${date}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (res.ok) {
        setLogs(prev => prev.filter(l => l.date !== date))
      }
    } catch (err) {
      console.error('deleteLog error:', err)
    }
  }

  const getTodayLog = () => {
    const todayStr = getToday()
    return logs.find(l => l.date === todayStr) || null
  }

  const getLogByDate = (date) => {
    return logs.find(l => l.date === date) || null
  }

  const getStreak = () => {
    if (logs.length === 0) return 0
    const dateSet = new Set(logs.map(l => l.date))
    const todayStr = getToday()
    const today = new Date(todayStr + 'T00:00:00')

    let checkDate = new Date(today)
    if (!dateSet.has(todayStr)) {
      // If today has not been logged yet, start checking from yesterday
      checkDate.setDate(checkDate.getDate() - 1)
    }

    let streak = 0
    while (true) {
      const year = checkDate.getFullYear()
      const month = String(checkDate.getMonth() + 1).padStart(2, '0')
      const day = String(checkDate.getDate()).padStart(2, '0')
      const str = `${year}-${month}-${day}`
      if (dateSet.has(str)) {
        streak++
        checkDate.setDate(checkDate.getDate() - 1)
      } else {
        break
      }
    }
    return streak
  }

  return { logs, loading, error, addLog, deleteLog, getTodayLog, getLogByDate, getStreak, refetch: fetchLogs }
}