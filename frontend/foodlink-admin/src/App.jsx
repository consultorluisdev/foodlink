import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import PublicLayout from './layouts/PublicLayout'
import ProtectedLayout from './layouts/ProtectedLayout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import PDV from './pages/PDV'
import Pedidos from './pages/Pedidos'
import Produtos from './pages/Produtos'
import Categorias from './pages/Categorias'
import Clientes from './pages/Clientes'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Públicas */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/pdv" element={<PDV />} />
              <Route path="/pedidos" element={<Pedidos />} />
              <Route path="/produtos" element={<Produtos />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/clientes" element={<Clientes />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}