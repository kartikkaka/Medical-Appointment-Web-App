import React from 'react'
import { Link } from 'react-router-dom'
import styles from './PageStyles.module.css'
import { useAuth } from '../context/AuthContext'

const Landing = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className={styles.container} style={{ textAlign: 'center', paddingTop: 40 }}>
      <div className="hero card" style={{ maxWidth: 900, margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 320px' }}>
            <h1 style={{ color: 'var(--primary)', marginBottom: 8 }}>Welcome to MediPortal</h1>
            <p style={{ color: '#555', fontSize: 18 }}>Your patient portal for booking appointments, viewing records, and staying on top of your health.</p>
            <div style={{ display: 'flex', gap: 12, marginTop: 18, justifyContent: 'center' }}>
              {isAuthenticated ? (
                <Link to="/app/dashboard" className="btn btn-primary">Go to Dashboard</Link>
              ) : (
                <>
                  <Link to="/signup" className="btn btn-primary">Get Started</Link>
                  <Link to="/login" className="btn btn-outline">Login</Link>
                </>
              )}
              <Link to="/app/search" className="btn btn-secondary">Find a Doctor</Link>
            </div>
          </div>
          <div style={{ flex: '0 0 260px', textAlign: 'left' }}>
            <div style={{ background: '#f6f9ff', padding: 12, borderRadius: 8 }}>
              <h3 style={{ marginTop: 0 }}>Quick Features</h3>
              <ul style={{ paddingLeft: 18 }}>
                <li>Search doctors by specialty & location</li>
                <li>Fast multi-step booking</li>
                <li>View appointments & records</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section style={{ marginTop: 24 }}>
        <div className="card">
          <h2>Why MediPortal?</h2>
          <p style={{ color: '#444' }}>MediPortal was designed to make healthcare simple: find the right doctor, pick a time that works, and keep all your medical records in one place.</p>
        </div>
      </section>
    </div>
  )
}

export default Landing
