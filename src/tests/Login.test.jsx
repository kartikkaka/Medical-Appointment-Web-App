import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Login from '../pages/Login'
import { AuthProvider } from '../context/AuthContext'

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

test('renders login and shows demo credentials text', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
  expect(screen.getByText(/Demo: patient@test.com \/ 123456/i)).toBeInTheDocument()
})
