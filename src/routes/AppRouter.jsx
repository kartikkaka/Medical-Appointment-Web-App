import React, { lazy } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import ProtectedRoute from '../components/ProtectedRoute'

const Landing = lazy(() => import('../pages/Landing'))
const Login = lazy(() => import('../pages/Login'))
const Signup = lazy(() => import('../pages/Signup'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const DoctorSearch = lazy(() => import('../pages/DoctorSearch'))
const BookingWizard = lazy(() => import('../pages/BookingWizard'))
const Appointments = lazy(() => import('../pages/Appointments'))
const Profile = lazy(() => import('../pages/Profile'))

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <Signup /> },
  {
    path: '/app', element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'search', element: <DoctorSearch /> },
      { path: 'book', element: <BookingWizard /> },
      { path: 'appointments', element: <Appointments /> },
      { path: 'profile', element: <Profile /> }
    ]
  },
  { path: '*', element: <Navigate to="/" replace /> }
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter
