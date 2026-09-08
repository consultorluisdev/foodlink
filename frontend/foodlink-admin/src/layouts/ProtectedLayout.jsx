import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import Topbar from '../components/layout/Topbar'

const titles = {
  '/dashboard': 'Dashboard',
  '/pdv': 'PDV',
  '/pedidos': 'Pedidos',
  '/produtos': 'Produtos',
  '/categorias': 'Categorias',
  '/clientes': 'Clientes',
}

export default function ProtectedLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Topbar title={titles[location.pathname] ?? 'FoodLink'} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}