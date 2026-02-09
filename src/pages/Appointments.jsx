import React from 'react'
import { useAppointments, useCancelAppointment } from '../hooks/useData'
import styles from './PageStyles.module.css'
import Spinner from '../components/Spinner'
import { useToast } from '../context/ToastContext'

const Appointments = () => {
  const { data: list = [], isLoading } = useAppointments()
  const cancel = useCancelAppointment()
  const { push } = useToast()

  if (isLoading) return <Spinner text="Loading appointments..." />

  const now = Date.now()
  const upcoming = (list || []).filter((a) => a.status === 'upcoming' && a.date && Date.parse(a.date) >= now)
  const past = (list || []).filter((a) => !(a.status === 'upcoming' && a.date && Date.parse(a.date) >= now))

  const handleCancel = (id) => {
    if (!confirm('Cancel this appointment?')) return
    cancel.mutate(id, {
      onSuccess: () => push('Appointment cancelled', { type: 'info' }),
      onError: () => push('Failed to cancel', { type: 'error' })
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}><h1>My Appointments</h1></div>

      <section className={styles.section}>
        <h2>Upcoming</h2>
        {upcoming && upcoming.length > 0 ? (
          <div className={styles.appointmentList}>
            {upcoming.map((a) => (
              <div key={a.id} className={styles.appointmentCard}>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentAvatar}>{a.doctor?.name?.charAt(0)}</div>
                  <div>
                    <div className={styles.appointmentDoctor}>{a.doctor?.name}</div>
                    <div className={styles.appointmentMeta}>{a.type} • {new Date(a.date).toLocaleString()}</div>
                  </div>
                </div>
                <div className={styles.appointmentActions}>
                  <button className="btn btn-outline" onClick={() => alert('View details not implemented in mock')}>Details</button>
                  <button className={`btn ${styles.appointmentCancel}`} onClick={() => handleCancel(a.id)}>Cancel</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No upcoming appointments.</div>
        )}
      </section>

      <section className={styles.section}>
        <h2>History</h2>
        {past && past.length > 0 ? (
          <div className={styles.appointmentList}>
            {past.map((a) => (
              <div key={a.id} className={styles.appointmentCard}>
                <div className={styles.appointmentInfo}>
                  <div className={styles.appointmentAvatar}>{a.doctor?.name?.charAt(0)}</div>
                  <div>
                    <div className={styles.appointmentDoctor}>{a.doctor?.name}</div>
                    <div className={styles.appointmentMeta}>{a.type} • {a.date ? new Date(a.date).toLocaleString() : '—'}</div>
                  </div>
                </div>
                <div><span className={`${styles.tag} ${a.status === 'upcoming' ? styles.tagUpcoming : styles.tagPast}`}>{a.status.toUpperCase()}</span></div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>No past visits.</div>
        )}
      </section>
    </div>
  )
}

export default Appointments
