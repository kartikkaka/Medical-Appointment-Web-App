import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Spinner from './Spinner'
import Footer from './Footer'

const Layout = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Navbar />
    <main style={{ flex: 1, maxWidth: 1200, margin: '1.5rem auto', padding: '0 0.5rem' }}>
      <Suspense fallback={<Spinner text="Loading page..." />}>
        <Outlet />
      </Suspense>
    </main>
    <Footer />
  </div>
)

export default Layout
