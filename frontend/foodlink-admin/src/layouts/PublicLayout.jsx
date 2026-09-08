import { Outlet } from 'react-router-dom'

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 hero-gradient">
      <Outlet />
    </div>
  )
}