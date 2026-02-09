import React from 'react'

const Spinner = ({ text = 'Loading...' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
    <div style={{
      width: 40, height: 40, border: '4px solid #f3f3f3',
      borderTop: '4px solid var(--primary)', borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <p style={{ marginTop: '1rem', color: 'var(--secondary)' }}>{text}</p>
    <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
  </div>
)

export default Spinner
