import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const [email, setEmail] = useState('patient@test.com')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/app/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    const res = await login(email, password)
    if (res.success) {
      navigate(from, { replace: true })
    } else {
      setError(res.error)
    }
    setIsSubmitting(false)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card" style={{ width: 400 }}>
        <h2 style={{ textAlign: 'center', color: 'var(--primary)' }}>MediPortal</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '1rem' }}>Patient Access</p>
        <form onSubmit={handleSubmit} aria-label="Login form">
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="email" style={{ display: 'block', marginBottom: 6 }}>Email</label>
            <input id="email" className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label htmlFor="password" style={{ display: 'block', marginBottom: 6 }}>Password</label>
            <input id="password" className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <div role="alert" style={{ color: 'var(--danger)', marginBottom: 8 }}>{error}</div>}
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>{isSubmitting ? 'Logging in...' : 'Login'}</button>
        </form>
        <div style={{ marginTop: 12, fontSize: 12, color: '#666', textAlign: 'center' }}>
          Demo: patient@test.com / 123456
        </div>
      </div>
    </div>
  )
}

export default Login
