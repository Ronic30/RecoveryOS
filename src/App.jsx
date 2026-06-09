import { useState } from 'react'
import NavBar from './components/NavBar'
import DashboardPage from './pages/DashboardPage'
import LogPage from './pages/LogPage'
import ChartsPage from './pages/ChartsPage'
import HistoryPage from './pages/HistoryPage'
import { useRecoveryLogs } from './hooks/useRecoveryLogs'

export default function App(){
  const{getTodayLog} = useRecoveryLogs()
  const todayLoggedIn = getTodayLog()

  const [page, setPage] = useState(
    !todayLoggedIn ? 'log' : 'dashboard'
  )

  const pages = {
    dashboard: <DashboardPage />,
    log: <LogPage />,
    charts: <ChartsPage />,
    history: <HistoryPage />
  }

  return(
    <div className="min-h-screen bg-[#0a0a0f]">
      <NavBar currentPage={page} onNavigate={setPage} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {pages[page]}
      </main>
    </div>
  )
}