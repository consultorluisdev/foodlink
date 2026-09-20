# FoodLink — Auditoria do Projeto

> **Status:** Em andamento | **Última atualização:** 20/09/2026
> **Meta da semana:** Tudo funcional com testes — Catálogo, Admin, PDV, Clientes

---

## Visão Geral do Projeto

| Componente | Estado | Progresso |
|------------|--------|-----------|
| Backend API (.NET) | Parcialmente funcional | 70% |
| Testes (xUnit) | 2/2 passando | 30% |
| Admin (foodlink-admin) | Só Login/Register | 25% |
| Catálogo (foodlink-catalog) | SPA estática (mock) | 40% |
| Docker | Só Postgres | 20% |
| Deploy Vercel | Config existe | 10% |

**Stack Principal:** .NET 10 + PostgreSQL 15 + React + Vercel

---

## Tarefas da Semana

### Fase 1 — Base do Backend
- [x] Corrigir AuthControllerTests.cs para nova assinatura
- [x] Criar PedidosController.cs com filtros e CRUD
- [x] DashboardController com dados reais (pedidos, faturamento, clientes)
- [x] Seed no Program.cs (admin + categorias + produtos)
- [x] dotnet build + dotnet test verdes

### Fase 2 — Catálogo Dinâmico
- [ ] Criar `.env` com `VITE_API_URL=http://localhost:5167/api`
- [ ] Liberar endpoints GET para catálogo público (`[AllowAnonymous]`)
- [ ] Adaptar `useCatalog.ts` para consumir API com fallback para mock
- [ ] Adaptar tipos (backend `int` → frontend `string` nos IDs)
- [ ] Adicionar imagens no seed dos produtos
- [ ] Testar catálogo com backend rodando

### Fase 3 — Admin Completo
- [ ] Criar `.env` com `VITE_API_URL=http://localhost:5167/api`
- [ ] Dashboard com dados reais (`GET /api/dashboard`)
- [ ] Produtos: CRUD real (listar, criar, editar, excluir)
- [ ] Categorias: CRUD real (listar, criar, editar, excluir)
- [ ] Clientes: CRUD real (listar, criar, editar, excluir)
- [ ] Pedidos: Listagem + PATCH status (aceitar, cancelar, entregar)
- [ ] PDV: Carrinho → `POST /api/pedidos` com itens

### Fase 4 — Testes
- [ ] Testes de integração: CategoriesController (CRUD)
- [ ] Testes de integração: ProductsController (CRUD)
- [ ] Testes de integração: PedidosController (criar, listar, status)
- [ ] Testes de integração: DashboardController (dados reais)
- [ ] Testes de integração: AuthController (login, register)
- [ ] Testes de unidade: Adaptador de tipos do catálogo
- [ ] `dotnet test` todos passando

### Fase 5 — Segurança e Higiene
- [ ] `[Authorize]` em controllers protegidos (admin)
- [ ] `[AllowAnonymous]` em endpoints públicos (catálogo)
- [ ] Secret JWT + connection string em variáveis de ambiente
- [ ] CORS restrito a origens conhecidas (5174, Vercel)
- [ ] Renomear `pizza_db` → `foodlink_db`
- [ ] Remover arquivos legado (*.backup, api.http, .vercel)
- [ ] Atualizar README.md e TODO.md
- [ ] docker-compose completo (Postgres + API + admin)

---

## Fluxo Completo (Meta)

```
1. Admin cadastra categorias e produtos
2. API salva no banco (PostgreSQL)
3. Catálogo consome GET /api/categories e /api/products
4. Cliente vê produtos reais no catálogo
5. Cliente faz pedido via WhatsApp (futuro)
6. Admin vê pedidos no painel e atualiza status
7. Dashboard mostra métricas reais
```

### Status do Fluxo
- [ ] Passo 1: Admin cadastra produtos → OK (seed automático)
- [ ] Passo 2: API salva no banco → OK (EF Core)
- [ ] Passo 3: Catálogo consome API → Pendente
- [ ] Passo 4: Cliente vê produtos reais → Pendente
- [ ] Passo 5: Pedido via WhatsApp → Futuro
- [ ] Passo 6: Admin gerencia pedidos → Pendente
- [ ] Passo 7: Dashboard com métricas → OK (backend)

---

## Prioridades

| Dia | Foco | Entregável |
|-----|------|------------|
| Segunda | Catálogo dinâmico | Catálogo consumindo API |
| Terça | Admin CRUD | Produtos/Categorias/Clientes funcionais |
| Quarta | PDV + Pedidos | Carrinho → Pedido → Status |
| Quinta | Testes | Todos os testes passando |
| Sexta | Limpeza + Deploy | Tudo rodando + docker-compose |

---

*Autor: auditoria automatizada (opencode) — 14/09/2026 | Atualizado: 20/09/2026*
