import { Activity, PlusCircle, BarChart2, Clock, LogOut, User, Sun, Moon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'log', label: 'Log Today', icon: PlusCircle },
  { id: 'charts', label: 'Charts', icon: BarChart2 },
  { id: 'history', label: 'History', icon: Clock },
]

export default function Navbar({ currentPage, onNavigate }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="border-b border-theme bg-theme-nav sticky top-0 z-50 transition-colors">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14 gap-2">
        {/* Brand */}
        <span className="text-[#ef233c] font-bold tracking-widest text-sm uppercase flex items-center gap-2">
          Recovery<span className="text-theme-primary">OS</span>
        </span>

        {/* Navigation Tabs */}
        <div className="flex gap-1 items-center">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                currentPage === id
                  ? 'bg-theme-card text-[#ef233c] border border-[#ef233c]/30 shadow-sm'
                  : 'text-theme-muted hover:text-theme-primary hover:bg-theme-card/50'
              }`}
            >
              <Icon size={14} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Right Section: Theme Toggle & User Info */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            className="p-1.5 rounded-lg border border-theme text-theme-secondary hover:text-theme-primary bg-theme-card hover:bg-theme-main transition-all cursor-pointer"
          >
            {theme === 'dark' ? <Sun size={15} className="text-[#ffd60a]" /> : <Moon size={15} className="text-[#3b82f6]" />}
          </button>

          {user && (
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="hidden md:flex items-center gap-1.5 bg-theme-card border border-theme px-2.5 py-1 rounded-full text-xs text-theme-primary">
                <User size={12} className="text-[#ef233c]" />
                <span className="font-medium">{user.name}</span>
              </div>
              <button
                onClick={logout}
                title="Sign Out"
                className="flex items-center gap-1 text-xs text-theme-muted hover:text-[#ef233c] bg-theme-card border border-theme px-2.5 py-1.5 rounded-lg transition-all cursor-pointer"
              >
                <LogOut size={13} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {user && (
        <div className="border-t border-theme px-4 py-1 flex justify-between items-center text-[10px]">
          <span className="text-theme-muted">
            User: <strong className="text-theme-primary font-medium">{user.email}</strong>
          </span>
          <span className="text-[#ef233c] font-mono">
            {new Date().toISOString().split('T')[0]}
          </span>
        </div>
      )}
    </nav>
  )
}