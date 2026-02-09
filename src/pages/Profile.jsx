import React from 'react'
import { useMedicalRecords } from '../hooks/useData'
import { useAuth } from '../context/AuthContext'
import styles from './PageStyles.module.css'
import Spinner from '../components/Spinner'

const Profile = () => {
  const { user } = useAuth()
  const { data: records, isLoading } = useMedicalRecords()

  if (isLoading) return <Spinner />

  const vitals = records.filter((r) => r.type === 'Vitals')

  return (
    <div className={styles.container}>
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0 }}>{user?.name}</h1>
            <p style={{ margin: 0 }}>{user?.email} | ID: #982374</p>
          </div>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{user?.name?.charAt(0)}</div>
        </div>
      </div>

      <h2>Medical Records</h2>
      <div className="card" style={{ padding: 0 }}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Details</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr key={r.id}>
                <td>{r.date}</td>
                <td>{r.type}</td>
                <td>{r.name}</td>
                <td style={{ fontWeight: 700 }}>{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 style={{ marginTop: 16 }}>Recent Vitals</h2>
      <div className="card">
        {vitals.length ? (
          <ul>
            {vitals.map((v) => (
              <li key={v.id}>{v.name} — {v.value} ({v.date})</li>
            ))}
          </ul>
        ) : <p>No vitals recorded.</p>}
      </div>
    </div>
  )
}

export default Profile
