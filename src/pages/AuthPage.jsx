import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Activity, Lock, Mail, User, ArrowRight, Sun, Moon } from 'lucide-react'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { login, signup } = useAuth()
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all required fields.')
      return
    }

    if (!isLogin && !name.trim()) {
      setError('Please enter your full name.')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.')
      return
    }

    setSubmitting(true)

    try {
      let res
      if (isLogin) {
        res = await login(email, password)
      } else {
        res = await signup(name, email, password)
      }

      if (!res.success) {
        setError(res.error || 'Authentication failed')
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-theme-main flex flex-col justify-center items-center px-4 py-12 transition-colors relative">
      {/* Absolute Theme Switcher Top Right */}
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          className="p-2 rounded-xl border border-theme text-theme-secondary hover:text-theme-primary bg-theme-card transition-all cursor-pointer shadow-sm"
        >
          {theme === 'dark' ? <Sun size={18} className="text-[#ffd60a]" /> : <Moon size={18} className="text-[#3b82f6]" />}
        </button>
      </div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-theme-card border border-[#ef233c]/30 text-[#ef233c] mb-4 shadow-lg shadow-[#ef233c]/10">
            <Activity size={28} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-wider uppercase text-theme-primary">
            Recovery<span className="text-[#ef233c]">OS</span>
          </h1>
          <p className="text-xs text-theme-muted mt-2 font-mono">
            Personalized recovery tracking & daily performance engine
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-theme-card border border-theme rounded-2xl p-6 sm:p-8 shadow-xl transition-colors">
          {/* Tab Switcher */}
          <div className="flex bg-theme-main p-1 rounded-xl border border-theme mb-6">
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError('') }}
              className={`flex-1 py-2 text-xs font-semibold font-mono rounded-lg transition-all cursor-pointer ${
                isLogin
                  ? 'bg-theme-card text-[#ef233c] border border-[#ef233c]/30 shadow-sm'
                  : 'text-theme-muted hover:text-theme-primary'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError('') }}
              className={`flex-1 py-2 text-xs font-semibold font-mono rounded-lg transition-all cursor-pointer ${
                !isLogin
                  ? 'bg-theme-card text-[#ef233c] border border-[#ef233c]/30 shadow-sm'
                  : 'text-theme-muted hover:text-theme-primary'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#ef233c]/10 border border-[#ef233c]/40 text-[#ef233c] text-xs font-mono leading-relaxed">
              {error}
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-mono">
            {!isLogin && (
              <div>
                <label className="block text-xs text-theme-muted font-medium mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-theme-main border border-theme focus:border-[#ef233c] text-theme-primary text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs text-theme-muted font-medium mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="w-full bg-theme-main border border-theme focus:border-[#ef233c] text-theme-primary text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-theme-muted font-medium mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-theme-main border border-theme focus:border-[#ef233c] text-theme-primary text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full mt-2 bg-[#ef233c] hover:bg-[#d90429] disabled:opacity-50 text-white text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              {submitting ? (
                <span>Processing...</span>
              ) : (
                <>
                  <span>{isLogin ? 'Sign In to RecoveryOS' : 'Create Account'}</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="text-center mt-6 text-xs text-theme-muted font-mono">
          Protected by RecoveryOS Private Database Security
        </div>
      </div>
    </div>
  )
}
