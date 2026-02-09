import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import styles from './Navbar.module.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
   
    if (confirm('Logout from MediPortal?')) {
      logout()
      navigate('/login')
    }
  }

  return (
    <nav className={styles.navbar} aria-label="Main Navigation">
      <div className={styles.inner}>
        <div className={styles.brand}>
          <NavLink to={user ? '/app/dashboard' : '/'} className={({ isActive }) => (isActive ? styles.brandActive : '')}>MediPortal</NavLink>
        </div>
        <div className={styles.right}>
          <button onClick={toggle} aria-label="Toggle theme" className={styles.themeBtn}>
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          {user ? (
            <div className={styles.links}>
              <NavLink to="/app/dashboard" className={({ isActive }) => (isActive ? styles.active : '')}>Dashboard</NavLink>
              <NavLink to="/app/search" className={({ isActive }) => (isActive ? styles.active : '')}>Find Doctor</NavLink>
              <NavLink to="/app/appointments" className={({ isActive }) => (isActive ? styles.active : '')}>Appointments</NavLink>
              <NavLink to="/app/profile" className={({ isActive }) => (isActive ? styles.active : '')}>Profile</NavLink>
              <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <div className={styles.links}>
              <NavLink to="/app/search" className={({ isActive }) => (isActive ? styles.active : '')}>Find Doctor</NavLink>
              <NavLink to="/signup" className={({ isActive }) => (isActive ? styles.active : '')}>Sign Up</NavLink>
              <NavLink to="/login" className={({ isActive }) => (isActive ? styles.active : '')}>Login</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
