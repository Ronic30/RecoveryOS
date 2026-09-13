import { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import AuthPage from './pages/AuthPage'
import NavBar from './components/NavBar'
import DashboardPage from './pages/DashboardPage'
import LogPage from './pages/LogPage'
import ChartsPage from './pages/ChartsPage'
import HistoryPage from './pages/HistoryPage'
import { useRecoveryLogs } from './hooks/useRecoveryLogs'

function MainApp() {
  const { user, loading: authLoading } = useAuth()
  const { getTodayLog } = useRecoveryLogs()

  const [page, setPage] = useState('dashboard')

  if (authLoading) {
    return (
      <div className="min-h-screen bg-theme-main flex items-center justify-center text-xs text-theme-muted font-mono">
        Initializing RecoveryOS session...
      </div>
    )
  }

  if (!user) {
    return <AuthPage />
  }

  const pages = {
    dashboard: <DashboardPage />,
    log: <LogPage />,
    charts: <ChartsPage />,
    history: <HistoryPage />
  }

  return (
    <div className="min-h-screen bg-theme-main transition-colors">
      <NavBar currentPage={page} onNavigate={setPage} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {pages[page]}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ThemeProvider>
  )
}