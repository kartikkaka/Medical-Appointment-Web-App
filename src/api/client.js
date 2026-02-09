import { MOCK_DOCTORS, MOCK_APPOINTMENTS, MOCK_RECORDS } from './mockData'


const delay = (ms) => new Promise((res) => setTimeout(res, ms))


const LS_APPOINTMENTS = 'medi_appointments_v1'
const LS_RECORDS = 'medi_records_v1'
const LS_USERS = 'medi_users_v1'


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

function readRecordsFromStorage() {
  const raw = localStorage.getItem(LS_RECORDS)
  if (raw) return JSON.parse(raw)
  localStorage.setItem(LS_RECORDS, JSON.stringify(MOCK_RECORDS))
  return MOCK_RECORDS
}

export const api = {

  login: async (email, password) => {
    await delay(800)

    try {
      const raw = localStorage.getItem(LS_USERS)
      if (raw) {
        const users = JSON.parse(raw)
        const found = users.find((u) => u.email === email && u.password === password)
        if (found) return { id: found.id, name: found.name, email: found.email, role: 'patient' }
      }
    } catch (e) {
      
    }

 
    if (email === 'patient@test.com' && password === '123456') {
      return { id: 'u_demo_1', name: 'Demo Patient', email, role: 'patient' }
    }

    throw new Error('Invalid credentials')
  },

  register: async (name, email, password) => {
    await delay(800)
    const raw = localStorage.getItem(LS_USERS)
    const users = raw ? JSON.parse(raw) : []
    if (users.find((u) => u.email === email)) throw new Error('Email already registered')
    const id = `u_${Date.now()}`
    const created = { id, name, email, password }
    const next = [...users, created]
    localStorage.setItem(LS_USERS, JSON.stringify(next))
    return { id, name, email, role: 'patient' }
  },

  
  getDoctors: async () => {
    await delay(700)
  
    return MOCK_DOCTORS
  },

  getAppointments: async () => {
    await delay(900)
    const list = readAppointmentsFromStorage()
    try {
      const rawUser = localStorage.getItem(LS_USER)
      if (rawUser) {
        const u = JSON.parse(rawUser)
        const filtered = list.filter((a) => a.userId === u.id)
        const enriched = filtered.map((a) => ({
          ...a,
          doctor: a.doctor || MOCK_DOCTORS.find((d) => d.id === a.doctorId) || { name: 'Unknown' }
        }))
        enriched.sort((x, y) => new Date(x.date) - new Date(y.date))
        return enriched
      }
    } catch (e) {
      
    }
    return []
  },

  createAppointment: async (payload) => {
    await delay(1000)
    const list = readAppointmentsFromStorage()
    const id = Math.max(0, ...list.map((a) => a.id)) + Math.floor(Math.random() * 100) + 1
    let payloadWithUser = { ...payload }
    try {
      const rawUser = localStorage.getItem(LS_USER)
      if (rawUser) {
        const u = JSON.parse(rawUser)
        payloadWithUser.userId = payloadWithUser.userId || u.id
      }
    } catch (e) {}
    const doctor = MOCK_DOCTORS.find((d) => d.id === payloadWithUser.doctorId) || { name: 'Unknown' }
    const created = { id, ...payloadWithUser, status: 'upcoming', doctor }
    const next = [...list, created]
    writeAppointmentsToStorage(next)
    return created
  },

  cancelAppointment: async (id) => {
    await delay(600)
    const list = readAppointmentsFromStorage()
    const next = list.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a))
    writeAppointmentsToStorage(next)
    return next.find((a) => a.id === id)
  },

  getMedicalRecords: async () => {
    await delay(700)
    const all = readRecordsFromStorage()
    try {
      const rawUser = localStorage.getItem(LS_USER)
      if (rawUser) {
        const u = JSON.parse(rawUser)
        return all.filter((r) => r.userId === u.id)
      }
    } catch (e) {
    }
    return []
  },

  addMedicalRecord: async (record) => {
    await delay(600)
    const list = readRecordsFromStorage()
    const id = Math.max(0, ...list.map((r) => r.id)) + 1
    let payload = { ...record }
    try {
      const rawUser = localStorage.getItem(LS_USER)
      if (rawUser) {
        const u = JSON.parse(rawUser)
        payload.userId = payload.userId || u.id
      }
    } catch (e) {}
    const created = { id, ...payload }
    const next = [...list, created]
    localStorage.setItem(LS_RECORDS, JSON.stringify(next))
    return created
  }
}
