# FoodLink — Frontend

## 📊 Visão Geral

| Aplicação | Linguagem | Framework | Porta | Status |
|-----------|-----------|-----------|-------|--------|
| foodlink-admin | JavaScript (JSX) | React 19 + Vite | 5174 | ⚠️ Stub |
| foodlink-catalog | TypeScript (TSX) | React 19 + Vite | 5173 | ⚠️ Mock |

## 🛠️ Stack

| Tecnologia | Admin | Catálogo |
|------------|-------|----------|
| React | 19.2.8 | 19.2.8 |
| Vite | 8.2.2 | 8.2.2 |
| React Router | 7.18.3 | 7.18.3 |
| Axios | 1.20.0 | 1.20.0 |
| Lucide React | 1.38.0 | 1.38.0 |
| Tailwind CSS | 3.4.17 | 3.4.17 |
| TypeScript | Não | 6.0.2 |

## 📄 Admin — Páginas

| Página | Integração API | Status |
|--------|----------------|--------|
| Login | ✅ POST /api/auth/login | Funcional |
| Register | ✅ POST /api/auth/register | Funcional |
| Dashboard | ❌ Valores hardcoded | Stub |
| Produtos | ❌ data={[]} | Stub |
| Categorias | ❌ data={[]} | Stub |
| Clientes | ❌ data={[]} | Stub |
| Pedidos | ❌ data={[]} | Stub |
| PDV | ❌ Placeholder | Não funciona |

## 🎨 Catálogo — Componentes

| Componente | Função | Status |
|------------|--------|--------|
| Navbar | Logo + carrinho | ✅ |
| Hero | Banner do restaurante | ✅ |
| Categories | Lista categorias ativas | ✅ |
| Menu | Lista produtos filtrados | ✅ |
| ProductModal | Detalhes + adicionar | ✅ |
| CartDrawer | Carrinho lateral | ✅ |
| Promotions | Produtos "combos" | ✅ |
| Blog | Posts mock | ✅ |
| QrSection | QR Code catálogo | ✅ |
| About | Sobre o restaurante | ✅ |
| Contact | WhatsApp + endereço | ✅ |
| Footer | Rodapé | ✅ |

## 🔄 Fluxo de Dados

```
API (GET /api/categories) → useCatalog.ts → adaptCategory() → Category[]
API (GET /api/products)   → useCatalog.ts → adaptProduct()  → Product[]
                              ↓
                        CatalogData
                              ↓
           App.tsx (categories, products)
                   ↙         ↓         ↘
             Hero      Menu/Categories   Promotions
```

## 📁 Estrutura de Arquivos

### foodlink-admin (JavaScript)

```
frontend/foodlink-admin/
├── package.json
├── .env (VITE_API_URL=http://localhost:5167/api)
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Produtos.jsx
│   │   ├── Categorias.jsx
│   │   ├── Clientes.jsx
│   │   ├── Pedidos.jsx
│   │   └── PDV.jsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.jsx
│   │   │   ├── DataTable.jsx
│   │   │   ├── Input.jsx
│   │   │   ├── KPICard.jsx
│   │   │   ├── LoadingSkeleton.jsx
│   │   │   └── Modal.jsx
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Topbar.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── layouts/
│   │   ├── ProtectedLayout.jsx
│   │   └── PublicLayout.jsx
│   └── services/
│       └── api.js
```

### foodlink-catalog (TypeScript)

```
frontend/foodlink-catalog/
├── package.json
├── .env (VITE_API_URL=http://localhost:5167/api)
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Categories.tsx
│   │   ├── Menu.tsx
│   │   ├── ProductModal.tsx
│   │   ├── CartDrawer.tsx
│   │   ├── Promotions.tsx
│   │   ├── Blog.tsx
│   │   ├── QrSection.tsx
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── hooks/
│   │   └── useCatalog.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── blog.ts
│   │   ├── catalog.ts
│   │   ├── category.ts
│   │   ├── product.ts
│   │   ├── restaurant.ts
│   │   └── review.ts
│   ├── context/
│   │   └── CartContext.tsx
│   ├── data/
│   │   └── mock/
│   │       ├── index.ts
│   │       ├── categories.ts
│   │       ├── products.ts
│   │       ├── restaurant.ts
│   │       ├── posts.ts
│   │       └── reviews.ts
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   └── utils/
│       └── maps.ts
```

## ✅ Tarefas Pendentes

### Catálogo
- [ ] Ajustar `.env` para `http://` (não `https`)
- [ ] Limpar comentários em `useCatalog.ts`
- [ ] Testar com backend rodando

### Admin
- [ ] Dashboard: buscar dados de `GET /api/dashboard`
- [ ] Produtos: CRUD real com API
- [ ] Categorias: CRUD real com API
- [ ] Clientes: CRUD real com API
- [ ] Pedidos: listagem + PATCH status
- [ ] PDV: carrinho → `POST /api/pedidos`

### Ambos
- [ ] Criar testes (Vitest + Testing Library)

*Última atualização: 20/09/2026*
