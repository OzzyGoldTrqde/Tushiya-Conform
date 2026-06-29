import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield } from 'lucide-react'
import useAuthStore from '@/stores/authStore'

function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-kalahari flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-navy rounded-lg flex items-center justify-center">
              <Shield size={16} className="text-white" />
            </div>
            <span className="font-display font-bold text-navy">Tushiya <span className="text-flame">Conform</span></span>
          </Link>
          <h1 className="font-display font-bold text-navy text-2xl">{title}</h1>
          <p className="text-muted text-sm mt-1">{subtitle}</p>
        </div>
        <div className="card">{children}</div>
      </div>
    </div>
  )
}

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await login(email, password)
    if (ok) navigate('/dashboard')
  }

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to your Tushiya Conform account">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy" />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
        <p className="text-center text-sm text-muted">
          No account? <Link to="/signup" className="text-flame font-medium hover:underline">Create one free</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, loading, error } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const ok = await register(email, password, name)
    if (ok) navigate('/dashboard')
  }

  return (
    <AuthLayout title="Create free account" subtitle="Start generating HSE documents in minutes">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{error}</p>}
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Full Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy" />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Email</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy" />
        </div>
        <div>
          <label className="block text-xs font-medium text-navy mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8}
            className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-navy" />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-2.5">
          {loading ? 'Creating account…' : 'Create Free Account'}
        </button>
        <p className="text-xs text-muted text-center">Free forever — no credit card required</p>
        <p className="text-center text-sm text-muted">
          Already have an account? <Link to="/login" className="text-flame font-medium hover:underline">Sign in</Link>
        </p>
      </form>
    </AuthLayout>
  )
}

export default Login
