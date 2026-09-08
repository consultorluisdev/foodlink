# PLANO FOODLINK-ADMIN

> Plano de implementação do frontend FoodLink Admin + extensões no backend `api/`
> Criado em: 04/09/2026

---

## Visão Geral

Criar um sistema administrativo completo para o FoodLink:
- **Auth** (login/cadastro)
- **Dashboard** (KPIs, pedidos recentes, cardápio)
- **Catálogo** (categorias + produtos para vendas)
- **Clientes** (gerenciamento de clientes)
- **PDV** (ponto de venda / carrinho)
- **Pedidos** (listagem, status, filtros)

**Backend:** `api/` (porta 5167, PostgreSQL)
**Frontend:** `foodlink-admin/` (novo projeto, porta 5174)
**Stack:** React 19 + Vite 8 + Tailwind 3 + React Router 7 + Lucide + Axios

---

## Fase 0: Backend — Novas Entidades e Controllers

### 0.1 Novas Entidades

#### `Entities/Cliente.cs`
```csharp
namespace api.Entities;

[Table("Clientes")]
public class Cliente
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(200)]
    public string Nome { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? Email { get; set; }

    [MaxLength(20)]
    public string? Telefone { get; set; }

    public bool Ativo { get; set; } = true;

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }
}
```

#### `Entities/Pedido.cs`
```csharp
namespace api.Entities;

[Table("Pedidos")]
public class Pedido
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int ClienteId { get; set; }

    [Required]
    [MaxLength(20)]
    public string Status { get; set; } = "pendente"; // pendente, preparando, saiu, entregue, cancelado

    [Column(TypeName = "decimal(18,2)")]
    public decimal ValorTotal { get; set; }

    [MaxLength(500)]
    public string? Observacao { get; set; }

    public bool Fiado { get; set; } = false;

    public DateTime CreatedAt { get; set; }

    [ForeignKey(nameof(ClienteId))]
    public virtual Cliente? Cliente { get; set; }

    public virtual ICollection<ItemPedido> Itens { get; set; } = new List<ItemPedido>();
}
```

#### `Entities/ItemPedido.cs`
```csharp
namespace api.Entities;

[Table("ItensPedido")]
public class ItemPedido
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    public int PedidoId { get; set; }

    [Required]
    public int ProdutoId { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantidade { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal PrecoUnitario { get; set; }

    [ForeignKey(nameof(PedidoId))]
    public virtual Pedido? Pedido { get; set; }

    [ForeignKey(nameof(ProdutoId))]
    public virtual Product? Produto { get; set; }
}
```

#### Melhorias em `Entities/User.cs`
- Adicionar campo `Name`
- Usar BCrypt para hash de senha
- Adicionar campo `Role` ("Admin" ou "Operador")

### 0.2 Novos Controllers

#### `Controllers/ClientesController.cs`
- `GET /api/clientes` — listar todos (com busca por nome)
- `GET /api/clientes/{id}` — buscar por id
- `POST /api/clientes` — criar
- `PUT /api/clientes/{id}` — atualizar
- `DELETE /api/clientes/{id}` — excluir

#### `Controllers/PedidosController.cs`
- `GET /api/pedidos` — listar todos (com filtros: status, data, clienteId)
- `GET /api/pedidos/{id}` — buscar por id (com itens + cliente)
- `POST /api/pedidos` — criar pedido com itens (transação)
- `PATCH /api/pedidos/{id}/status` — atualizar status

#### Melhorias em `Controllers/AuthController.cs`
- `POST /api/auth/register` — com BCrypt hash + validação email duplicado
- `POST /api/auth/login` — com BCrypt verify + retorno de token fake + user info

#### Melhorias em `Controllers/DashboardController.cs`
- Dados reais: contar pedidos do dia, somar faturamento, contar clientes

### 0.3 AppDbContext

Adicionar DbSets:
```csharp
public DbSet<Cliente> Clientes { get; set; }
public DbSet<Pedido> Pedidos { get; set; }
public DbSet<ItemPedido> ItensPedido { get; set; }
```

Fluent API config para as 3 tabelas novas (índices, FKs, defaults).

### 0.4 Migration + Seed

```bash
dotnet ef migrations add AddClientesPedidosItensPedido
dotnet ef database update
```

Seed em `Program.cs`:
- Usuário admin padrão (admin@foodlink.com / 123456)
- 3-4 categorias de exemplo (Bebidas, Acompanhamentos, Pizzas, Lanches)
- 5-6 produtos de exemplo

### 0.5 Pacotes NuGet (se necessário)

```bash
dotnet add package BCrypt.Net-Next
```

### 0.6 Program.cs

Adicionar CORS para `http://localhost:5174` (frontend).

---

## Fase 1: Infraestrutura do Frontend

### 1.1 Criar Projeto

```bash
cd frontend
npm create vite@latest foodlink-admin -- --template react
cd foodlink-admin
npm install
```

### 1.2 Instalar Dependências

```bash
npm install react-router-dom axios lucide-react
npm install -D tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
```

### 1.3 Estrutura de Pastas

```
foodlink-admin/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── KPICard.jsx
│   │   │   └── LoadingSkeleton.jsx
│   │   └── layout/
│   │       ├── Sidebar.jsx
│   │       └── Topbar.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   └── ProtectedLayout.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Categorias.jsx
│   │   ├── Produtos.jsx
│   │   ├── Clientes.jsx
│   │   ├── PDV.jsx
│   │   └── Pedidos.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

### 1.4 Variáveis de Ambiente

#### `.env`
```
VITE_API_URL=http://localhost:5167/api
```

#### `.env.example`
```
VITE_API_URL=http://localhost:5167/api
```

### 1.5 tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        foodlink: {
          50:  '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        surface: {
          900: '#09090b',
          800: '#18181b',
          700: '#27272a',
          600: '#3f3f46',
        },
      },
    },
  },
  plugins: [],
}
```

### 1.6 vite.config.js

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  server: { port: 5174, host: true }
})
```

### 1.7 index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
  font-family: system-ui, -apple-system, sans-serif;
  background-color: #09090b;
  color: white;
  -webkit-font-smoothing: antialiased;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-track { background: #09090b; }
::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
::-webkit-scrollbar-thumb:hover { background: #dc2626; }

::selection { background: #dc2626; color: white; }
```

---

## Fase 2: Infraestrutura Core

### 2.1 `services/api.js`

```js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5167/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export { api };
```

### 2.2 `contexts/AuthContext.jsx`

```jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    setUser(res.data.user);
    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
```

### 2.3 `layouts/PublicLayout.jsx`

Layout para Login e Register (sem sidebar, só o gradiente dark).

```jsx
import { Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-surface-900 to-red-950">
      <Outlet />
    </div>
  );
}
```

### 2.4 `layouts/ProtectedLayout.jsx`

Layout com Sidebar + Topbar + `<Outlet />`.

- Sidebar colapsável (w-64 / w-16)
- Topbar com relógio, busca e botão logout
- Nav items: Dashboard, PDV, Pedidos, Produtos, Categorias, Clientes

### 2.5 `components/layout/Sidebar.jsx`

Itens de navegação:
| Ícone | Label | Rota |
|-------|-------|------|
| LayoutDashboard | Dashboard | /dashboard |
| ShoppingCart | PDV | /pdv |
| ClipboardList | Pedidos | /pedidos |
| Package | Produtos | /produtos |
| Tag | Categorias | /categorias |
| Users | Clientes | /clientes |

- Active route highlighting com `useLocation()`
- Botão logout no rodapé
- Logo FoodLink no topo

### 2.6 `components/layout/Topbar.jsx`

- Relógio em tempo real
- Campo de busca (placeholder)
- Botão "Sair" (logout)

### 2.7 Rotas (`App.jsx`)

```jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PublicLayout from './layouts/PublicLayout';
import ProtectedLayout from './layouts/ProtectedLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PDV from './pages/PDV';
import Pedidos from './pages/Pedidos';
import Produtos from './pages/Produtos';
import Categorias from './pages/Categorias';
import Clientes from './pages/Clientes';

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

          {/* Redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

### 2.8 `components/ProtectedRoute.jsx`

```jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-white p-8">Carregando...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
```

---

## Fase 3: Páginas Públicas

### 3.1 `pages/Login.jsx`

- Gradiente dark (`from-black via-surface-900 to-red-950`)
- Card glass (`bg-surface-800/80 backdrop-blur-md`)
- Campos: email, senha
- Botão "Entrar" vermelho
- Link "Criar conta" → /register
- Loading state no botão
- Tratamento de erro (toast/alerta, não `alert()`)

### 3.2 `pages/Register.jsx`

- Mesmo padrão do Login
- Campos: nome, email, senha
- Botão "Registrar"
- Link "Já tem conta?" → /login

---

## Fase 4: Componentes Reutilizáveis

### 4.1 `components/ui/Modal.jsx`

- Props: `isOpen`, `onClose`, `title`, `children`
- Overlay escuro com backdrop-blur
- Card centralizado com animação fade-in
- Botão X no topo-direita

### 4.2 `components/ui/KPICard.jsx`

- Props: `icon`, `label`, `value`, `color`
- Card com fundo surface-800
- Ícone colorido à esquerda
- Label em cinza, valor grande e colorido

### 4.3 `components/ui/DataTable.jsx`

- Props: `columns`, `data`, `emptyMessage`
- Header com fundo surface-700
- Linhas com hover em surface-800
- Bordas em surface-700

### 4.4 `components/ui/LoadingSkeleton.jsx`

- Skeleton animado (pulsing)
- Variantes: `line`, `card`, `table`

---

## Fase 5: Páginas do Sistema

### 5.1 `pages/Dashboard.jsx`

- **KPI Cards**: Pedidos Hoje, Faturamento, Produtos Cadastrados, Clientes
- **Pedidos Recentes**: tabela com últimos 5 pedidos
- **Cardápio**: grid de cards com produtos
- Dados via `GET /api/dashboard`, `GET /api/produtos`, `GET /api/pedidos`

### 5.2 `pages/Categorias.jsx`

- Grid de cards com categorias (nome, qtd produtos, status)
- Botão "Nova Categoria" → Modal de criação
- Botão editar → Modal preenchido
- Botão excluir → confirmação
- Dados via CRUD `/api/categories`

### 5.3 `pages/Produtos.jsx`

- Grid de cards com produtos (imagem, nome, preço, categoria, status)
- Filtro por categoria + busca por nome
- Botão "Novo Produto" → Modal de criação
- Botão editar → Modal preenchido
- Botão excluir → confirmação
- Toggle ativo/inativo via `PATCH /api/products/{id}/status`
- Dados via CRUD `/api/products`

### 5.4 `pages/Clientes.jsx`

- Tabela com clientes (nome, email, telefone, status, data cadastro)
- Botão "Novo Cliente" → Modal de criação
- Botão editar → Modal preenchido
- Busca por nome
- Dados via CRUD `/api/clientes`

### 5.5 `pages/PDV.jsx`

- **Layout dois painéis**:
  - Esquerda (flex: 2): grid de produtos do cardápio, clique para adicionar ao carrinho
  - Direita (width: 350): carrinho com itens, quantidade +/-, total, seleção de cliente, toggle fiado, botão finalizar
- Lógica de carrinho: adicionar/remover/incrementar/decrementar
- Finalizar → `POST /api/pedidos` com itens array
- Referência: `pizza-web/src/pages/Pdv.jsx`

### 5.6 `pages/Pedidos.jsx`

- Tabela com todos os pedidos
- Colunas: #, Cliente, Status, Valor, Data, Ações
- Status com cores: pendente (amarelo), preparando (azul), saiu (roxo), entregue (verde), cancelado (vermelho)
- Filtros: por status, por data
- Ação: atualizar status via `PATCH /api/pedidos/{id}/status`
- Dados via `GET /api/pedidos`

---

## Fase 6: Apagar o Antigo

```bash
rm -rf frontend/pizza-web
```

---

## Comandos Úteis

### Backend
```bash
cd backend/api
dotnet build                          # compilar
dotnet run                            # rodar (porta 5167)
dotnet ef migrations add <Nome>       # criar migration
dotnet ef database update             # aplicar migration
dotnet test                           # rodar testes
```

### Frontend
```bash
cd frontend/foodlink-admin
npm run dev                           # rodar dev (porta 5174)
npm run build                         # build de produção
npm run lint                          # lint
```

### Swagger (backend rodando)
```
http://localhost:5167/swagger
```

---

## Checklist de Implementação

- [ ] **Fase 0**: Backend — entities, controllers, migrations, seed
- [ ] **Fase 1**: Scaffold novo projeto + dependências
- [ ] **Fase 2**: api.js + AuthContext + layouts + rotas
- [ ] **Fase 3**: Login + Register
- [ ] **Fase 4**: Componentes reutilizáveis (Modal, KPICard, DataTable, Skeleton)
- [ ] **Fase 5.1**: Dashboard
- [ ] **Fase 5.2**: Categorias
- [ ] **Fase 5.3**: Produtos
- [ ] **Fase 5.4**: Clientes
- [ ] **Fase 5.5**: PDV
- [ ] **Fase 5.6**: Pedidos
- [ ] **Fase 6**: Apagar pizza-web
- [ ] Testes finais com backend rodando
