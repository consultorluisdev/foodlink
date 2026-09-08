import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Falha no login. Verifique suas credenciais.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Link to="/login" className="inline-flex items-baseline gap-1">
          <span className="font-display text-3xl text-foodlink-gold">FOOD</span>
          <span className="font-script text-4xl text-foodlink-gold-pale">link</span>
        </Link>
        <p className="mt-2 text-sm text-foodlink-gold-pale/70">Painel administrativo</p>
      </div>

      <form onSubmit={handleSubmit} className="card-wood p-6 space-y-4">
        {error && (
          <p className="px-4 py-3 text-sm rounded-lg bg-foodlink-ember/15 border border-foodlink-ember/40 text-foodlink-cream">
            {error}
          </p>
        )}

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="seu@email.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          id="password"
          label="Senha"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          <LogIn size={18} />
          {loading ? 'Entrando...' : 'Entrar'}
        </Button>

        <p className="text-center text-sm text-foodlink-gold-pale/70">
          Não tem conta?{' '}
          <Link to="/register" className="text-foodlink-gold hover:underline font-semibold">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  )
}