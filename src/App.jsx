import { useState } from 'react'
import Navbar from './components/Navbar'
import DashboardPage from './pages/DashboardPage'
import LogPage from './pages/LogPage'
import ChartsPage from './pages/ChartsPage'
import HistoryPage from './pages/HistoryPage'

export default function App(){
  const [page, setPage] = useState('dashboard')

  const pages = {
    dashboard: <DashboardPage />,
    log: <LogPage />,
    charts: <ChartsPage />,
    history: <HistoryPage />
  }

  return(
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar currentPage={page} onNavigate={setPage} />
      <main className="max-w-5xl mx-auto px-4 py-8">
        {pages[page]}
      </main>
    </div>
  )
}