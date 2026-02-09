import { MOCK_DOCTORS, MOCK_APPOINTMENTS } from './mockData'

const LS_APPOINTMENTS = 'appointments'
const LS_USER = 'medi_user_v1'

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function readAppointmentsFromStorage() {
  const raw = localStorage.getItem(LS_APPOINTMENTS)
  if (raw) return JSON.parse(raw)
 
  const seeded = MOCK_APPOINTMENTS.map((a) => ({
    ...a,
    doctor: MOCK_DOCTORS.find((d) => d.id === a.doctorId) || { name: 'Unknown' }
  }))
  localStorage.setItem(LS_APPOINTMENTS, JSON.stringify(seeded))
  return seeded
}

function writeAppointmentsToStorage(list) {
  localStorage.setItem(LS_APPOINTMENTS, JSON.stringify(list))
}

export async function getAppointments() {
  await delay(300)
  const list = readAppointmentsFromStorage()
  try {
    const rawUser = localStorage.getItem(LS_USER)
    if (rawUser) {
      const u = JSON.parse(rawUser)
      const filtered = list.filter((a) => a.userId === u.id)
      const enriched = filtered.map((a) => ({
        ...a,
        doctor: a.doctor || MOCK_DOCTORS.find((d) => d.id === a.doctorId) || { name: 'Unknown' },
        date: a.date
      }))
      enriched.sort((x, y) => Date.parse(x.date) - Date.parse(y.date))
      return enriched
    }
  } catch (e) {
   
  }
  return []
}

export async function createAppointment(payload) {
  await delay(300)
  const list = readAppointmentsFromStorage()
  const id = Date.now() + Math.floor(Math.random() * 1000)
  const isoDate = new Date(payload.date).toISOString()
  const dt = new Date(isoDate)
  const hh = String(dt.getHours()).padStart(2, '0')
  const mm = String(dt.getMinutes()).padStart(2, '0')
  const time = `${hh}:${mm}`

  let userId
  try {
    const rawUser = localStorage.getItem(LS_USER)
    if (rawUser) {
      const u = JSON.parse(rawUser)
      userId = u.id
    }
  } catch (e) {}

  const doctor = MOCK_DOCTORS.find((d) => d.id === payload.doctorId) || { id: payload.doctorId, name: 'Unknown' }

  const created = {
    id,
    userId: payload.userId || userId || null,
    doctorId: payload.doctorId,
    doctor,
    date: isoDate,
    time,
    status: payload.status || 'upcoming',
    type: payload.type || 'Consultation',
    notes: payload.notes || ''
  }

  const next = [...list, created]
  writeAppointmentsToStorage(next)
  return created
}

export async function cancelAppointment(id) {
  await delay(200)
  const list = readAppointmentsFromStorage()
  const next = list.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
  writeAppointmentsToStorage(next)
  return next.find((a) => a.id === id)
}
