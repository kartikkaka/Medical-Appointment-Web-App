import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import BookingWizard from '../pages/BookingWizard'


vi.mock('../hooks/useData', () => ({
  useDoctors: () => ({ data: [{ id: 1, name: 'Dr. Mock', specialty: 'Test', available: true }] }),
  useCreateAppointment: () => ({ mutate: vi.fn(), isLoading: false })
}))

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })

const renderWithProviders = (ui) => render(
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{ui}</MemoryRouter>
  </QueryClientProvider>
)

test('validates step 1 and proceeds to step 2', async () => {
  renderWithProviders(<BookingWizard />)
  expect(screen.getByText(/Step 1: Select Doctor/i)).toBeInTheDocument()
  const nextBtn = screen.getByText('Next')
  fireEvent.click(nextBtn)
  expect(screen.getByText(/Please select a doctor./i)).toBeInTheDocument()
  const select = screen.getByRole('combobox')
  fireEvent.change(select, { target: { value: '1' } })
  fireEvent.click(nextBtn)
  await waitFor(() => expect(screen.getByText(/Step 2: Date & Time/i)).toBeInTheDocument())
})
