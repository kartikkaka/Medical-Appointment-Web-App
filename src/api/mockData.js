
export const MOCK_DOCTORS = [
  { id: 1, name: 'Dr. Sarah Chen', specialty: 'Cardiology', location: 'New York', available: true, rating: 4.8 },
  { id: 2, name: 'Dr. James Wilson', specialty: 'Dermatology', location: 'California', available: true, rating: 4.5 },
  { id: 3, name: 'Dr. Emily Davis', specialty: 'General Practice', location: 'New York', available: false, rating: 4.9 },
  { id: 4, name: 'Dr. Raj Patel', specialty: 'Cardiology', location: 'Texas', available: true, rating: 4.7 },
  { id: 5, name: 'Dr. Lisa Wong', specialty: 'Pediatrics', location: 'California', available: true, rating: 4.9 }
]

export const MOCK_APPOINTMENTS = [
  { id: 101, userId: 'u_demo_1', doctorId: 1, date: '2025-11-15T10:00:00', status: 'upcoming', type: 'Check-up' },
  { id: 102, userId: 'u_demo_1', doctorId: 2, date: '2024-10-01T14:30:00', status: 'completed', type: 'Consultation' }
]

export const MOCK_RECORDS = [
  { id: 501, userId: 'u_demo_1', type: 'Lab Result', name: 'Complete Blood Count', date: '2024-10-01', status: 'Normal', value: 'WBC: 6.5' },
  { id: 502, userId: 'u_demo_1', type: 'Vitals', name: 'Blood Pressure', date: '2024-10-01', status: 'Elevated', value: '130/85' },
  { id: 503, userId: 'u_demo_1', type: 'Imaging', name: 'Chest X-Ray', date: '2024-09-15', status: 'Clear', value: 'No abnormalities' }
]
