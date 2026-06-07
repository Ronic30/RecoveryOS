import { Activity, PlusCircle, BarChart2, Clock } from 'lucide-react'

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: Activity },
  { id: 'log', label: 'Log Today', icon: PlusCircle },
  { id: 'charts', label: 'Charts', icon: BarChart2 },
  { id: 'history', label: 'History', icon: Clock },
]

export default function Navbar({ currentPage, onNavigate }) {
  return (
    <nav className="border-b border-[#1e1e32] bg-[#0a0a0f] sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 flex items-center justify-between h-14">
        <span className="text-[#00f5ff] font-bold tracking-widest text-sm uppercase">
          Recovery<span className="text-[#e8e8f0]">OS</span>
        </span>
        <div className="flex gap-1">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-all cursor-pointer ${
                currentPage === id
                  ? 'bg-[#1a1a2e] text-[#00f5ff] border border-[#00f5ff]/30'
                  : 'text-[#6b6b8a] hover:text-[#e8e8f0]'
              }`}
            >
              <Icon size={13} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}