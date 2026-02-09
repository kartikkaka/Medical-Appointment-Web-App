import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDoctors } from '../hooks/useData'
import styles from './PageStyles.module.css'
import Spinner from '../components/Spinner'

const DoctorSearch = () => {
  const { data: doctors, isLoading, error } = useDoctors()
  const [specialty, setSpecialty] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const filtered = useMemo(() => {
    if (!doctors) return []
    return doctors.filter((d) => (!specialty || d.specialty === specialty) && (!location || d.location === location))
  }, [doctors, specialty, location])

  if (isLoading) return <Spinner text="Loading Directory..." />
  if (error) return <div className={styles.error}>Failed to load doctors</div>

  const specialties = [...new Set(doctors.map((d) => d.specialty))]
  const locations = [...new Set(doctors.map((d) => d.location))]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Find a Doctor</h1>
        <p>Search by specialty or location to book your next visit.</p>
      </div>

      <div className="card" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }} aria-label="Filters">
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Specialty</label>
          <select className="form-input" value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="">All Specialties</option>
            {specialties.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: 6 }}>Location</label>
          <select className="form-input" value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All Locations</option>
            {locations.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.grid} style={{ marginTop: 12 }}>
        {filtered.map((doc) => (
          <div key={doc.id} className="card" role="article" aria-label={`Doctor ${doc.name}`}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{doc.name}</h3>
              <div style={{ color: '#f1c40f', fontWeight: 700 }}>★ {doc.rating}</div>
            </div>
            <p style={{ color: 'var(--secondary)' }}>{doc.specialty}</p>
            <p>📍 {doc.location}</p>
            <button className={`btn ${doc.available ? 'btn-primary' : 'btn-secondary'}`} disabled={!doc.available} style={{ width: '100%', marginTop: 8 }} onClick={() => navigate(`/app/book?doctor=${doc.id}`)}>
              {doc.available ? 'Book Appointment' : 'Unavailable'}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && <p>No results found.</p>}
    </div>
  )
}

export default DoctorSearch
