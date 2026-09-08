import { useEffect, useState } from 'react'
import { Search, Clock, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Topbar({ title }) {
  const navigate = useNavigate()
  const [time, setTime] = useState('')

  useEffect(() => {
    const sync = () => setTime(new Date().toLocaleTimeString())
    sync()
    const id = setInterval(sync, 1000)
    return () => clearInterval(id)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between gap-4 h-16 px-6 bg-foodlink-char border-b border-foodlink-gold/15">
      <h1 className="font-display text-lg uppercase text-foodlink-gold">{title}</h1>

      <div className="relative hidden md:block">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foodlink-gold-pale/50" />
        <input
          placeholder="Buscar..."
          className="input-dark pl-9 pr-4 py-2 text-sm w-64"
        />
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 text-xs text-foodlink-gold-pale/70">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Online
        </span>
        <span className="flex items-center gap-2 text-sm text-foodlink-gold-pale">
          <Clock size={15} /> {time}
        </span>
        <button
          onClick={handleLogout}
          className="btn-danger px-3 py-1.5 text-xs rounded-md flex items-center gap-1.5"
        >
          <LogOut size={14} />
          Sair
        </button>
      </div>
    </header>
  )
}