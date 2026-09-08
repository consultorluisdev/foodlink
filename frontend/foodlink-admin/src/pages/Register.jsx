import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(form.name, form.email, form.password)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Falha no cadastro. Tente novamente.')
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
        <p className="mt-2 text-sm text-foodlink-gold-pale/70">Crie sua conta</p>
      </div>

      <form onSubmit={handleSubmit} className="card-wood p-6 space-y-4">
        {error && (
          <p className="px-4 py-3 text-sm rounded-lg bg-foodlink-ember/15 border border-foodlink-ember/40 text-foodlink-cream">
            {error}
          </p>
        )}

        <Input
          id="name"
          label="Nome"
          placeholder="Seu nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          <UserPlus size={18} />
          {loading ? 'Criando...' : 'Criar conta'}
        </Button>

        <p className="text-center text-sm text-foodlink-gold-pale/70">
          Já tem conta?{' '}
          <Link to="/login" className="text-foodlink-gold hover:underline font-semibold">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}