import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Plus, Clock, CheckCircle2, AlertCircle, LayoutDashboard } from 'lucide-react'
import useAuthStore from '@/stores/authStore'
import { getUserDocuments } from '@/lib/supabase'

const TYPE_LABELS = {
  'risk-assessment':  { label: 'Risk Assessment',  color: 'text-red-500 bg-red-50' },
  'toolbox-talk':     { label: 'Toolbox Talk',      color: 'text-caprivi bg-green-50' },
  'method-statement': { label: 'Method Statement',  color: 'text-blue-500 bg-blue-50' },
  'hira':             { label: 'HIRA',              color: 'text-orange-500 bg-orange-50' },
  'ptw':              { label: 'Permit to Work',    color: 'text-amber-600 bg-amber-50' },
  'policy':           { label: 'HSE Policy',        color: 'text-purple-500 bg-purple-50' },
}

export default function Dashboard() {
  const { user } = useAuthStore()
  const [docs, setDocs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    getUserDocuments(user.id).then(({ data }) => {
      setDocs(data || [])
      setLoading(false)
    })
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-kalahari flex items-center justify-center">
        <div className="card text-center max-w-sm">
          <AlertCircle size={32} className="text-flame mx-auto mb-3" />
          <h2 className="font-display font-bold text-navy text-lg mb-2">Sign in required</h2>
          <p className="text-sm text-muted mb-4">You need an account to save documents.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-kalahari">
      <div className="bg-navy py-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 mb-1">
            <LayoutDashboard size={18} className="text-flame" />
            <p className="section-label">My Dashboard</p>
          </div>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl">
            Welcome back{user.user_metadata?.full_name ? `, ${user.user_metadata.full_name.split(' ')[0]}` : ''}
          </h1>
          <p className="text-white/50 text-sm mt-1">{user.email}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
          {Object.entries(TYPE_LABELS).map(([type, { label, color }]) => (
            <Link key={type} to={`/generators/${type}`}
              className="card flex items-center gap-3 hover:shadow-sm hover:border-flame transition-all">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
                <Plus size={16} />
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">New {label}</p>
                <p className="text-xs text-muted">Create document</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Document library */}
        <div>
          <h2 className="font-display font-bold text-navy text-lg mb-4">My Documents</h2>

          {loading ? (
            <div className="card text-center py-12">
              <p className="text-muted text-sm">Loading documents…</p>
            </div>
          ) : docs.length === 0 ? (
            <div className="card text-center py-16">
              <FileText size={36} className="text-border mx-auto mb-4" />
              <p className="font-display font-semibold text-navy">No documents yet</p>
              <p className="text-sm text-muted mt-1 mb-6">Create your first HSE document to see it here</p>
              <Link to="/generators/risk-assessment" className="btn-primary">
                <Plus size={16} /> Create Risk Assessment
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {docs.map(doc => {
                const t = TYPE_LABELS[doc.type] || { label: doc.type, color: 'text-gray-500 bg-gray-50' }
                return (
                  <div key={doc.id} className="card flex items-center justify-between gap-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${t.color}`}>
                        <FileText size={15} />
                      </div>
                      <div>
                        <p className="font-semibold text-navy text-sm">{doc.title}</p>
                        <p className="text-xs text-muted">{t.label} · {new Date(doc.created_at).toLocaleDateString('en-NA')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === 'complete'
                        ? <CheckCircle2 size={15} className="text-caprivi" />
                        : <Clock size={15} className="text-muted" />}
                      <span className="text-xs text-muted capitalize">{doc.status}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
