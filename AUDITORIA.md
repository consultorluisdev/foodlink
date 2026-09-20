# 🍕 FoodLink — Auditoria do Projeto

> Auditoria técnica completa realizada em **14/09/2026** | Atualizado em **15/09/2026**
> Objetivo: mapear o estado atual e definir o que fazer para deixar o projeto **funcional** e para o **foodlink-catalog receber dados reais da API**.

---

## 1. Estado Geral

| Componente | Compila? | Funcional? | Nível |
|------------|----------|------------|-------|
| Backend API (.NET) | ✅ | Parcialmente | 70% |
| Testes (xUnit) | ✅ | 2/2 passando | 30% |
| Admin (`foodlink-admin`) | ✅ | Só Login/Register; resto em stub | 25% |
| Catálogo (`foodlink-catalog`) | ✅ | SPA estática (mock), sem backend | 40% |
| Docker | ✅ (só Postgres) | — | 20% |
| Deploy Vercel | Config existe | `catalogo/` vazio | 10% |

**Modelo de negócio:** 3 aplicações + 1 DB
```
foodlink-admin   → painel administrativo (React, porta 5174)
foodlink-catalog → vitrine/catálogo do cliente (React TS, Vercel)
api/             → backend .NET (porta 5167, PostgreSQL)
postgres:15      → banco via docker (porta 5433, db `pizza_db`)
```

---

## 2. Backend (`backend/api`)

### 2.1 Stack
- `.NET 10` — target `net10.0`
- EF Core 10 + Npgsql (PostgreSQL 15)
- JWT (`Microsoft.AspNetCore.Authentication.JwtBearer`)
- BCrypt (`BCrypt.Net-Next`) para senhas
- Swagger (`/swagger`)

### 2.2 Endpoints existentes

| Método | Rota | Auth? |
|--------|------|-------|
| POST | `/api/auth/register` | Não |
| POST | `/api/auth/login` | Não |
| GET | `/api/categories` | Não |
| GET/POST | `/api/categories/{id}` | Não |
| PUT/DELETE | `/api/categories/{id}` | Não |
| GET | `/api/products` | Não |
| POST/PUT/DELETE | `/api/products(/{id})` | Não |
| PATCH | `/api/products/{id}/status` | Não |
| GET | `/api/clientes` | Não |
| GET/POST | `/api/clientes(/{id})` | Não |
| PUT/DELETE | `/api/clientes/{id}` | Não |
| GET | `/api/dashboard` | Não |

> ⚠️ **Nenhum endpoint usa `[Authorize]`** — todos os CRUDs são públicos.

### 2.3 Banco de dados
- 6 tabelas: `Users`, `Categories`, `Products`, `Clientes`, `Pedidos`, `ItensPedido`
- 2 migrations: `InitialCreate` + `AddClientesPedidosItensPedido`
- Connection string **hardcoded no `Program.cs`** (ignora `appsettings.json`):
  `Host=localhost;Port=5433;Database=pizza_db;Username=postgres;Password=postgres`

---

## 3. Problemas encontrados

### 🔴 Críticos
| # | Problema | Arquivo |
|---|----------|---------|
| 1 | Testes **não compilavam** (5 erros CS7036/CS1503 — construtor e assinatura do `AuthController` desatualizados) — **CORRIGIDO** | `backend/tests/.../AuthControllerTests.cs` |
| 2 | **Secret key JWT commitada** no git | `backend/api/appsettings.json` |
| 3 | **Connection string hardcoded** | `backend/api/Program.cs` |
| 4 | Nenhum endpoint protegido (`[Authorize]` ausente) | Todos os Controllers |
| 5 | `CategoriesController.UpdateCategory`: `if (exists)` **vazio** — verificação de duplicado ignorada | `CategoriesController.cs:110` |

### 🟠 Altos
| # | Problema | Arquivo |
|---|----------|---------|
| 6 | **Sem `PedidosController`** — **CRIADO** (`Controllers/PedidosController.cs`) | `backend/api/Controllers/PedidosController.cs` |
| 7 | **Dashboard hardcoded** (32/1280/18 fixos) | `Controllers/DashboardController.cs` |
| 8 | Admin: 6 páginas são **stubs** (`data=[]`, sem chamada à API) | `frontend/foodlink-admin/src/pages/` |
| 9 | Catálogo: **zero integração com a API** (100% mock) | `frontend/foodlink-catalog/src/hooks/useCatalog.ts` |
| 10 | `README.md` e `TODO.md` desatualizados (falam de PizzaERP/pizza-web) | raiz |

### 🟡 Médios
| # | Problema |
|---|----------|
| 11 | Namespace DTO inconsistente (`api.DTOs.Product` vs `api.DTOs.Products`) |
| 12 | `.env` commitado (`gitignore` só exclui `.env.local`) |
| 13 | `api.http` referencia `/weatherforecast/` (endpoint que não existe) |
| 14 | `docker-compose.yml` incompleto (só Postgres) + nomes legado `erp_pizza_postgres`/`pizza_db` |
| 15 | CORS `AllowAll` (`AllowAnyOrigin`) — risco em produção |
| 16 | `EROS.md` desatualizado |
| 17 | `.vercel/` commitado (projectId/orgId) |
| 18 | Docs `APRENDER-TESTES-*` desatualizados |
| 19 | `frontend/package.json` raiz sem sentido (só `axios`) + `package-lock.json` raiz vazio |
| 20 | Backups commitados: `api.csproj.backup`, `Program.cs.backup` |

### ⚪ Menores
- Nome do banco `pizza_db` (legado PizzaERP)
- Teste valida senha em plaintext (`Assert.Equal("123456")` — falharia com BCrypt)
- `useAuth.js` re-export redundante
- `ProductsController` importa namespace singular por acidente

---

## 4. Plano de ação — deixar funcional

### Fase 1 — Base do backend 🎯
- [x] Corrigir `AuthControllerTests.cs` para a nova assinatura (2 params: `AppDbContext` + `TokenService`) e validar com BCrypt
- [x] Criar `Controllers/PedidosController.cs` (GET com filtros, GET por id com itens+cliente, POST com itens, PATCH status)
- [ ] `DashboardController` com dados reais (pedidos do dia, faturamento, clientes, produtos)
- [ ] Seed no `Program.cs`:
  - Usuário admin padrão (`admin@foodlink.com`)
  - 5 categorias + 10 produtos **a partir dos mocks do foodlink-catalog**
- [ ] `dotnet build` + `dotnet test` verdes

### Fase 2 — Catálogo dinâmico 🎯
- [ ] `useCatalog.ts`: consumir `GET /api/categories` + `GET /api/products` com fallback para mock
- [ ] Base URL via `VITE_API_URL` (igual ao admin)
- [ ] Rodar com a API + Postgres + seed populado

### Fase 3 — Admin completo
- [ ] Dashboard com dados reais (`GET /api/dashboard`)
- [ ] Produtos / Categorias / Clientes (CRUD real)
- [ ] PDV (carrinho → `POST /api/pedidos`)
- [ ] Pedidos (listagem + `PATCH /api/pedidos/{id}/status`)

### Fase 4 — Segurança e higiene
- [ ] `[Authorize]` em todos os controllers (exceto catálogo público)
- [ ] Secret JWT + connection string para `.env`/`appsettings` (fora do git)
- [ ] CORS restrito a origens conhecidas (5174, Vercel)
- [ ] Renomear `pizza_db` → `foodlink_db` (docker-compose + Program.cs)
- [ ] Remover `*.backup`, `api.http`, `catalogo/` vazio, `.vercel` do git
- [ ] Atualizar `README.md` e `TODO.md`
- [ ] `docker-compose` completo (Postgres + API + admin)

---

## 5. Foco: foodlink-catalog receber dados

**Fluxo alvo:**
```
admin cadastra produto → API produtos/categorias → catálogo (Vercel) consome → cliente pede via WhatsApp
```

**Gargalo atual:** `useCatalog.ts` simula a API com dados hardcoded e nunca busca no servidor. Para o catálogo receber dados reais precisamos, em ordem:

1. **Seed** — popular Categories/Products no banco (usar os `mockCategories`/`mockProducts` como base)
2. **Expor** os dados via `GET /api/categories` e `GET /api/products` (já existem)
3. **Consumir** no `useCatalog.ts` com fallback para os mocks (se a API estiver fora do ar, o catálogo continua visível)

---

*Autor: auditoria automatizada (opencode) — 14/09/2026 | Atualizado: 15/09/2026*