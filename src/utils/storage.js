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

export const getToday = () => {
  const d = new Date()
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
// returns "YYYY-MM-DD" in local time — used as unique key per entry