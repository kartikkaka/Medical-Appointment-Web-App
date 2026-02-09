import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password) return setError('Please fill all required fields')
    if (password !== confirm) return setError('Passwords do not match')
    setIsSubmitting(true)
    const res = await register(name, email, password)
    if (res.success) {
      navigate('/app/dashboard', { replace: true })
    } else {
      setError(res.error)
    }
    setIsSubmitting(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: 420 }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>Create an account</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>Sign up to access your MediPortal account.</p>
        <form onSubmit={handleSubmit} aria-label="Signup form">
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="name" style={{ display: 'block', marginBottom: 6 }}>Full name</label>
            <input id="name" className="form-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
            <input id="email" className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
            <input id="password" className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="confirm" style={{ display: 'block', marginBottom: 6 }}>Confirm Password</label>
            <input id="confirm" className="form-input" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
          </div>
          {error && <div role="alert" style={{ color: 'var(--danger)', marginBottom: 8 }}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>{isSubmitting ? 'Creating...' : 'Sign Up'}</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 13, color: '#666', textAlign: 'center' }}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  )
}

export default Signup
