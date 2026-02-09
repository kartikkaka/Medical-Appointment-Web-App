import React, { useState, useEffect, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useDoctors, useCreateAppointment } from '../hooks/useData'
import { useToast } from '../context/ToastContext'
import styles from './PageStyles.module.css'

// Using useState for clarity and simplicity in the UI form state; useReducer
// would be preferred for highly complex nested forms. For this 3-step wizard,
// useState keeps code readable while still being fully controlled.
const BookingWizard = () => {
  const [params] = useSearchParams()
  const doctorFromQuery = params.get('doctor')
  const { data: doctors } = useDoctors()
  const create = useCreateAppointment()
  const { push } = useToast()
  const navigate = useNavigate()

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ doctorId: doctorFromQuery || '', date: '', time: '', notes: '' })
  const [error, setError] = useState('')
  const doctorSelectRef = useRef(null)

  useEffect(() => {
   
    if (step === 1) doctorSelectRef.current?.focus()
  }, [step])

  const doctor = doctors?.find((d) => d.id === Number(form.doctorId))
  const bookedTimes = (doctor?.bookedSlots || []).filter((bs) => bs.date && bs.date.slice(0, 10) === form.date).map((bs) => bs.time)

  const validate = () => {
    if (step === 1 && !form.doctorId) return 'Please select a doctor.'
    if (step === 2 && (!form.date || !form.time)) return 'Please select date and time.'
    if (step === 2 && form.time && bookedTimes.includes(form.time)) return 'Selected time slot is no longer available. Please choose a different time.'
    return null
  }

  const next = () => {
    const err = validate()
    if (err) return setError(err)
    setError('')
    setStep((s) => Math.min(3, s + 1))
  }

  const back = () => {
    setError('')
    setStep((s) => Math.max(1, s - 1))
  }

  const submit = () => {
    const payload = { doctorId: Number(form.doctorId), date: `${form.date}T${form.time}`, time: form.time, type: 'Consultation', notes: form.notes }
    create.mutate(payload, {
      onSuccess: () => {
        push('Appointment booked successfully', { type: 'success' })
        navigate('/app/appointments')
      },
      onError: () => setError('Failed to book appointment. Please try again.')
    })
  }

  return (
    <div className={styles.container} style={{ maxWidth: 640 }}>
      <div className={styles.header} style={{ textAlign: 'center' }}>
        <h1>Book Appointment</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12 }} aria-hidden>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ width: 30, height: 30, borderRadius: 15, background: step >= i ? 'var(--primary)' : '#ddd', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i}</div>
          ))}
        </div>
      </div>

      <div className="card">
        {error && <div className={styles.error} role="alert" style={{ marginBottom: 8 }}>{error}</div>}

        {step === 1 && (
          <div>
            <h2>Step 1: Select Doctor</h2>
            <label htmlFor="doctor-select" className="sr-only">Doctor</label>
            <select id="doctor-select" ref={doctorSelectRef} className="form-input" value={form.doctorId} onChange={(e) => setForm({ ...form, doctorId: e.target.value })}>
              <option value="">-- Choose a Doctor --</option>
              {doctors?.map((d) => <option key={d.id} value={d.id}>{d.name} — {d.specialty}</option>)}
            </select>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>Step 2: Date & Time</h2>
            <p>Booking with <strong>{doctor?.name}</strong></p>
            <div style={{ marginBottom: 8 }}>
              <label htmlFor="date">Date</label>
              <input id="date" className="form-input" type="date" min={new Date().toISOString().split('T')[0]} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <select id="time" className="form-input" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                <option value="">-- Select Time --</option>
                {['09:00', '10:00', '14:00', '16:00'].map((t) => {
                  const isBooked = bookedTimes.includes(t)
                  return (
                    <option key={t} value={t} disabled={isBooked}>{isBooked ? `${t} (Booked)` : t}</option>
                  )
                })}
              </select>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2>Step 3: Confirmation</h2>
            <div style={{ background: '#f8f9fa', padding: 12, borderRadius: 6, marginBottom: 12 }}>
              <p><strong>Doctor:</strong> {doctor?.name}</p>
              <p><strong>Date:</strong> {form.date}</p>
              <p><strong>Time:</strong> {form.time}</p>
            </div>
            <label htmlFor="notes">Notes (optional)</label>
            <textarea id="notes" className="form-input" rows={4} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
          {step > 1 ? <button className="btn btn-secondary" onClick={back}>Back</button> : <div />}
          {step < 3 ? <button className="btn btn-primary" onClick={next}>Next</button> : <button className="btn btn-success" onClick={submit} disabled={create.isLoading}>{create.isLoading ? 'Booking...' : 'Confirm Appointment'}</button>}
        </div>
      </div>
    </div>
  )
}

export default BookingWizard
