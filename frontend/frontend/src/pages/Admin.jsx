import { useState } from 'react'
import { getAdminBookings, markCompleted, deleteBooking } from '../services/api'

const STATUSES = ['All', 'Pending', 'Completed']

const statusStyle = {
  Pending:   'bg-amber-100 text-amber-800',
  Completed: 'bg-emerald-100 text-emerald-800',
  Cancelled: 'bg-red-100 text-red-700',
}

const fmt = d => new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })

export default function Admin() {
  const [secret, setSecret]           = useState('')
  const [authed, setAuthed]           = useState(false)
  const [bookings, setBookings]       = useState([])
  const [filter, setFilter]           = useState('All')
  const [loading, setLoading]         = useState(false)
  const [actionId, setActionId]       = useState(null)
  const [loginError, setLoginError]   = useState('')

  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter)

  const login = async () => {
    setLoginError('')
    if (!secret.trim()) { setLoginError('Please enter the admin secret'); return }
    setLoading(true)
    try {
      const data = await getAdminBookings(secret)
      setBookings(data)
      setAuthed(true)
    } catch {
      setLoginError('Invalid secret key. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const complete = async (id) => {
    setActionId(id)
    try {
      const updated = await markCompleted(id, secret)
      setBookings(bs => bs.map(b => b._id === id ? updated : b))
    } catch (e) { alert(e.message) }
    finally { setActionId(null) }
  }

  const remove = async (id) => {
    if (!window.confirm('Delete this booking?')) return
    setActionId(id)
    try {
      await deleteBooking(id, secret)
      setBookings(bs => bs.filter(b => b._id !== id))
    } catch (e) { alert(e.message) }
    finally { setActionId(null) }
  }

  // ── Login screen ──────────────────────────────────────────────
  if (!authed) return (
    <main className="min-h-screen pt-20 bg-cream flex items-center justify-center px-6">
      <div className="bg-white w-full max-w-sm rounded-sm shadow-lg p-10 text-center">
        <p className="font-display text-xl text-forest mb-2">✦ SpotlessHome</p>
        <h2 className="font-display text-3xl font-bold text-dark mb-2">Admin Access</h2>
        <p className="text-warm-gray text-sm mb-8">Enter your admin secret to continue.</p>

        <input
          type="password"
          value={secret}
          onChange={e => setSecret(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          placeholder="Admin secret key"
          className={`w-full px-4 py-3 border rounded-sm text-center text-sm outline-none transition-colors mb-2 ${
            loginError ? 'border-red-400' : 'border-gray-200 focus:border-forest'
          }`}
        />
        {loginError && <p className="text-red-500 text-xs mb-3">{loginError}</p>}

        <button onClick={login} disabled={loading}
          className="w-full py-3.5 bg-forest text-white text-xs font-medium uppercase tracking-widest rounded-sm hover:bg-sage disabled:opacity-60 transition-colors flex items-center justify-center gap-2 mt-2">
          {loading
            ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" />Checking...</>
            : 'Enter Dashboard'}
        </button>
      </div>
    </main>
  )

  // ── Dashboard ─────────────────────────────────────────────────
  return (
    <main className="min-h-screen pt-24 bg-cream pb-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-4xl font-bold text-dark">Bookings Dashboard</h1>
            <p className="text-warm-gray text-sm mt-1">{bookings.length} total booking(s)</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex gap-2">
              {STATUSES.map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-4 py-2 text-xs uppercase tracking-wider rounded-sm border transition-colors ${
                    filter === s
                      ? 'bg-forest text-white border-forest'
                      : 'bg-white text-warm-gray border-gray-200 hover:border-forest'
                  }`}>
                  {s}
                </button>
              ))}
            </div>
            <button onClick={() => { setAuthed(false); setSecret(''); setBookings([]) }}
              className="px-4 py-2 text-xs uppercase tracking-wider rounded-sm border border-gray-200 text-warm-gray hover:border-red-400 hover:text-red-500 transition-colors">
              Log Out
            </button>
          </div>
        </div>

        {/* Empty */}
        {filtered.length === 0 && (
          <div className="text-center py-20 text-warm-gray">
            No {filter !== 'All' ? filter.toLowerCase() : ''} bookings found.
          </div>
        )}

        {/* Table */}
        {filtered.length > 0 && (
          <div className="overflow-x-auto rounded-sm shadow-sm">
            <table className="w-full bg-white text-sm">
              <thead>
                <tr className="bg-dark text-white text-xs uppercase tracking-wider">
                  {['Customer','Service','Date & Time','Address','Status','Actions'].map(h => (
                    <th key={h} className="px-5 py-4 text-left font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b._id} className="border-b border-gray-100 hover:bg-cream transition-colors">
                    <td className="px-5 py-4">
                      <strong className="block text-dark">{b.customerName}</strong>
                      <span className="text-warm-gray text-xs">{b.email}</span>
                      <span className="text-warm-gray text-xs block">{b.phone}</span>
                    </td>
                    <td className="px-5 py-4">
                      <strong className="block text-dark">{b.service?.name || 'N/A'}</strong>
                      {b.service?.price && (
                        <span className="text-warm-gray text-xs">LKR {b.service.price.toLocaleString()}</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <strong className="block text-dark">{fmt(b.date)}</strong>
                      <span className="text-warm-gray text-xs">{b.time}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="block text-dark max-w-[160px]">{b.address}</span>
                      {b.notes && <span className="text-warm-gray text-xs block">📝 {b.notes}</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-block px-3 py-1 rounded-sm text-[11px] font-medium uppercase tracking-wide ${statusStyle[b.status] || ''}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        {b.status !== 'Completed' && (
                          <button onClick={() => complete(b._id)} disabled={actionId === b._id}
                            className="px-3 py-1.5 bg-forest text-white text-xs rounded-sm hover:bg-sage disabled:opacity-50 transition-colors">
                            ✓ Done
                          </button>
                        )}
                        <button onClick={() => remove(b._id)} disabled={actionId === b._id}
                          className="px-3 py-1.5 border border-red-200 text-red-500 text-xs rounded-sm hover:bg-red-500 hover:text-white disabled:opacity-50 transition-colors">
                          ✕
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  )
}
