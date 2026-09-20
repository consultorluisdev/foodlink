import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, ShoppingCart, ClipboardList, Package, Tag, Users, LogOut, PanelLeftClose, PanelLeft } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/pdv', label: 'PDV', icon: ShoppingCart },
  { path: '/pedidos', label: 'Pedidos', icon: ClipboardList },
  { path: '/produtos', label: 'Produtos', icon: Package },
  { path: '/categorias', label: 'Categorias', icon: Tag },
  { path: '/clientes', label: 'Clientes', icon: Users },
]

export default function Sidebar({ collapsed, onToggle }) {
  const navigate = useNavigate()
  const location = useLocation()

  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={`flex flex-col justify-between h-full bg-foodlink-char border-r border-foodlink-gold/15 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div>
        {/* LOGO */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-foodlink-gold/15">
          {!collapsed && (
            <button onClick={() => navigate('/dashboard')} className="flex items-baseline gap-1">
              <span className="font-display text-xl text-foodlink-gold">FOOD</span>
              <span className="font-script text-2xl text-foodlink-gold-pale">link</span>
            </button>
          )}
          {collapsed && (
            <span className="font-display text-xl text-foodlink-gold mx-auto">F</span>
          )}
          <button onClick={onToggle} className="text-foodlink-gold-pale hover:text-foodlink-gold transition">
            {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* MENU */}
        <nav className="mt-4 px-2 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                title={item.label}
                className={[
                  'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm transition',
                  isActive
                    ? 'bg-foodlink-wood-light text-foodlink-gold font-semibold border-l-2 border-foodlink-gold'
                    : 'text-foodlink-gold-pale/70 hover:bg-foodlink-wood-light/60 hover:text-foodlink-gold',
                ].join(' ')}
              >
                <Icon size={18} className="shrink-0" />
                {!collapsed && item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* LOGOUT */}
      <div className="p-2">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm text-foodlink-ember border border-foodlink-ember/50 hover:bg-foodlink-ember hover:text-white transition"
          title="Sair"
        >
          <LogOut size={18} className="shrink-0" />
          {!collapsed && 'Sair'}
        </button>
      </div>
    </aside>
  )
}
