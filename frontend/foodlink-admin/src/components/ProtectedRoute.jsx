import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function ProtectedRoute() {
  const { loading, user } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center hero-gradient">
        <span className="font-display text-foodlink-gold text-2xl animate-pulse">FOOD<link className="font-script text-foodlink-gold-pale">link</link></span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  return <Outlet />
}