import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAppointments, createAppointment, cancelAppointment } from '../api/appointments.api'
import { getDoctors, markSlotBooked, removeBookedSlot } from '../api/doctors.api'
import { api } from '../api/client'

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: getDoctors,
    staleTime: 1000 * 60 * 5
  })
}

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: getAppointments,
    staleTime: 1000 * 60
  })
}

export const useCreateAppointment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => {
   
      const dt = new Date(payload.date)
      const isoDate = dt.toISOString()
      const hh = String(dt.getHours()).padStart(2, '0')
      const mm = String(dt.getMinutes()).padStart(2, '0')
      const time = payload.time || `${hh}:${mm}`

     
      await markSlotBooked(payload.doctorId, isoDate, time)
      try {
        const created = await createAppointment({ ...payload, date: isoDate, time })
        return created
      } catch (err) {
    
        try { await removeBookedSlot(payload.doctorId, isoDate, time) } catch (e) {}
        throw err
      }
    },
    onSuccess: (created) => {
      qc.setQueryData(['appointments'], (old = []) => {
        const next = [...old, created]
        next.sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
        return next
      })
      qc.invalidateQueries(['appointments'])
      qc.invalidateQueries(['doctors'])
    }
  })
}

export const useCancelAppointment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: cancelAppointment,
    onSuccess: (updated) => {
      qc.setQueryData(['appointments'], (old = []) => {
        return old.map((a) => (a.id === updated.id ? { ...a, status: updated.status } : a))
      })
      qc.invalidateQueries(['appointments'])
    }
  })
}

export const useMedicalRecords = () => {
  return useQuery({
    queryKey: ['records'],
    queryFn: api.getMedicalRecords
  })
}
