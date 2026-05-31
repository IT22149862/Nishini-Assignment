const BASE = 'http://localhost:5000/api'

export const getServices = async () => {
  const res = await fetch(`${BASE}/services`)
  const data = await res.json()
  if (!data.success) throw new Error(data.message)
  return data.data
}

export const createBooking = async (body) => {
  const res = await fetch(`${BASE}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.message)
  return data
}

export const getAdminBookings = async (secret) => {
  const res = await fetch(`${BASE}/admin/bookings`, {
    headers: { 'x-admin-secret': secret },
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.message)
  return data.data
}

export const markCompleted = async (id, secret) => {
  const res = await fetch(`${BASE}/admin/bookings/${id}/complete`, {
    method: 'PATCH',
    headers: { 'x-admin-secret': secret },
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.message)
  return data.data
}

export const deleteBooking = async (id, secret) => {
  const res = await fetch(`${BASE}/admin/bookings/${id}`, {
    method: 'DELETE',
    headers: { 'x-admin-secret': secret },
  })
  const data = await res.json()
  if (!data.success) throw new Error(data.message)
  return data
}
