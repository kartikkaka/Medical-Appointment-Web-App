import React from 'react'
import { Link } from 'react-router-dom'
import { useAppointments } from '../hooks/useData'
import { useAuth } from '../context/AuthContext'
import styles from './PageStyles.module.css'

const Dashboard = () => {
  const { user } = useAuth()
  const { data: appointments, isLoading } = useAppointments()
  const nextApt = appointments?.find((a) => a.status === 'upcoming')

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome back, {user?.name}</h1>
        <p>Your personal health overview for {new Date().toLocaleDateString()}</p>
      </header>

      <div className={styles.grid}>
        <div className="card">
          <h2>Next Appointment</h2>
          {isLoading ? <p>Loading...</p> : nextApt ? (
            <div>
              <h3 style={{ color: 'var(--primary)' }}>{nextApt.type}</h3>
              <p><strong>Dr. {nextApt.doctor.name}</strong></p>
              <p>{new Date(nextApt.date).toLocaleString()}</p>
              <Link to="/app/appointments" className="btn btn-outline">View Details</Link>
            </div>
          ) : <p>No upcoming appointments.</p>}
          {!isLoading && !nextApt && <Link to="/app/search" className="btn btn-primary" style={{ marginTop: 10 }}>Book Now</Link>}
        </div>

        <div className="card" style={{ background: '#e8f5e9' }}>
          <h2>Daily Health Tip</h2>
          <p>Walking 30 minutes a day reduces cardiovascular risk by 30%. Have you moved today?</p>
        </div>

        <div className="card">
          <h2>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Link to="/app/search" className="btn btn-primary">Find a Doctor</Link>
            <Link to="/app/profile" className="btn btn-secondary">View Records</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
