const KEY = 'recovery_os_logs'

export const getLogs = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}

export const saveLogs = (logs) => {
  localStorage.setItem(KEY, JSON.stringify(logs))
}

export const getToday = () => new Date().toISOString().split('T')[0]
// returns "2026-06-07" — used as unique key per entry