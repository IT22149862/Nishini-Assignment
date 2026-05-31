import { useState, useEffect } from 'react'
import { getServices, createBooking } from '../services/api'

const TIME_SLOTS = [
  '08:00 AM','09:00 AM','10:00 AM','11:00 AM','12:00 PM',
  '01:00 PM','02:00 PM','03:00 PM','04:00 PM','05:00 PM',
]
const FEATURES = [
  'Free cancellation 24h before',
  'Eco-friendly products used',
  'Insured & bonded team',
  'Flexible scheduling',
]

const EMPTY = { customerName:'', email:'', phone:'', service:'', date:'', time:'', address:'', notes:'' }

export default function Booking() {
  const [services, setServices] = useState([])
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const minDate = new Date().toISOString().split('T')[0]

  useEffect(() => {
    getServices().then(setServices).catch(() => {})
  }, [])

  const set = (field, value) => {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => ({ ...e, [field]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.customerName.trim())  e.customerName = 'Name is required'
    if (!form.email.trim())         e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Invalid email address'
    if (!form.phone.trim())         e.phone = 'Phone is required'
    if (!form.service)              e.service = 'Please select a service'
    if (!form.date)                 e.date = 'Date is required'
    if (!form.time)                 e.time = 'Time is required'
    if (!form.address.trim())       e.address = 'Address is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return
    setLoading(true)
    try {
      await createBooking(form)
      setSubmitted(true)
      setForm(EMPTY)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full px-4 py-3 border rounded-sm font-body text-sm text-dark bg-white outline-none transition-colors ${
      errors[field] ? 'border-red-400' : 'border-gray-200 focus:border-forest'
    }`

  return (
    <section id="booking" className="py-24 bg-dark">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">

        {/* Left info */}
        <div>
          <p className="text-gold text-xs font-medium uppercase tracking-[3px] mb-4">Reserve Your Slot</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Book a <em className="text-sage">Cleaning</em>
          </h2>
          <p className="text-white/60 leading-relaxed mb-8">
            Fill in the form and our team will confirm your appointment within 2 hours.
          </p>
          <div className="flex flex-col gap-3 mb-10">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-3 text-white/65 text-sm">
                <span className="text-gold">✦</span>{f}
              </div>
            ))}
          </div>
          <button
            onClick={() => window.open('https://wa.me/94752505366?text=Hi! I want to enquire about cleaning services.', '_blank')}
            className="flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-sm text-sm font-medium hover:opacity-90 transition-opacity">
            💬 Quick query via WhatsApp
          </button>
        </div>

        {/* Form */}
        <div className="bg-cream rounded-sm p-8 md:p-10">
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-12 text-center animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-forest text-white text-3xl flex items-center justify-center">✓</div>
              <h3 className="font-display text-2xl font-bold text-dark">Booking Confirmed!</h3>
              <p className="text-warm-gray">We'll contact you shortly to confirm your appointment.</p>
              <button onClick={() => setSubmitted(false)}
                className="mt-2 px-8 py-3 bg-forest text-white text-xs uppercase tracking-widest rounded-sm hover:bg-sage transition-colors">
                Book Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Full Name *</label>
                  <input type="text" value={form.customerName} onChange={e => set('customerName', e.target.value)}
                    placeholder="John Silva" className={inputClass('customerName')} />
                  {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                    placeholder="john@email.com" className={inputClass('email')} />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Phone *</label>
                  <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)}
                    placeholder="077 123 4567" className={inputClass('phone')} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Service *</label>
                  <select value={form.service} onChange={e => set('service', e.target.value)} className={inputClass('service')}>
                    <option value="">Choose a service</option>
                    {services.map(s => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                  {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Date *</label>
                  <input type="date" value={form.date} min={minDate} onChange={e => set('date', e.target.value)}
                    className={inputClass('date')} />
                  {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                </div>
                <div>
                  <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Time *</label>
                  <select value={form.time} onChange={e => set('time', e.target.value)} className={inputClass('time')}>
                    <option value="">Select time</option>
                    {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Address *</label>
                <input type="text" value={form.address} onChange={e => set('address', e.target.value)}
                  placeholder="45 Galle Road, Colombo 03" className={inputClass('address')} />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-dark uppercase tracking-wider mb-1.5">Notes</label>
                <textarea value={form.notes} onChange={e => set('notes', e.target.value)}
                  rows={3} placeholder="Any special instructions..."
                  className="w-full px-4 py-3 border border-gray-200 focus:border-forest rounded-sm font-body text-sm text-dark bg-white outline-none resize-y transition-colors" />
              </div>

              {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-forest text-white text-xs font-medium uppercase tracking-widest rounded-sm hover:bg-sage disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-3">
                {loading
                  ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin-slow" /> Processing...</>
                  : 'Confirm Booking'}
              </button>

            </form>
          )}
        </div>
      </div>
    </section>
  )
}
