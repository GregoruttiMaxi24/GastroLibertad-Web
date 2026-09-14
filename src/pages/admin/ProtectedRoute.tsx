import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { admin, cargando } = useAuth()

  if (cargando) return null
  if (!admin) return <Navigate to="/admin" replace />
  return <>{children}</>
}
