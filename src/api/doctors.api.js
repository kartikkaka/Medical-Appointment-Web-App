import { MOCK_DOCTORS } from './mockData'

const LS_DOCTORS = 'doctors'
const delay = (ms) => new Promise((res) => setTimeout(res, ms))

function readDoctorsFromStorage() {
  const raw = localStorage.getItem(LS_DOCTORS)
  if (raw) return JSON.parse(raw)
  const seeded = MOCK_DOCTORS.map((d) => ({ ...d, bookedSlots: d.bookedSlots || [] }))
  localStorage.setItem(LS_DOCTORS, JSON.stringify(seeded))
  return seeded
}

function writeDoctorsToStorage(list) {
  localStorage.setItem(LS_DOCTORS, JSON.stringify(list))
}

export async function getDoctors() {
  await delay(200)
  return readDoctorsFromStorage()
}

export async function markSlotBooked(doctorId, isoDate, time) {
  await delay(100)
  const list = readDoctorsFromStorage()
  const idx = list.findIndex((d) => d.id === doctorId)
  if (idx === -1) throw new Error('Doctor not found')
  const doc = list[idx]
  const exists = (doc.bookedSlots || []).some((s) => s.date === isoDate && s.time === time)
  if (exists) throw new Error('Slot already booked')
  const nextSlots = [...(doc.bookedSlots || []), { date: isoDate, time }]
  const next = [...list]
  next[idx] = { ...doc, bookedSlots: nextSlots }
  writeDoctorsToStorage(next)
  return next[idx]
}

export async function removeBookedSlot(doctorId, isoDate, time) {
  await delay(80)
  const list = readDoctorsFromStorage()
  const idx = list.findIndex((d) => d.id === doctorId)
  if (idx === -1) throw new Error('Doctor not found')
  const doc = list[idx]
  const nextSlots = (doc.bookedSlots || []).filter((s) => !(s.date === isoDate && s.time === time))
  const next = [...list]
  next[idx] = { ...doc, bookedSlots: nextSlots }
  writeDoctorsToStorage(next)
  return next[idx]
}
