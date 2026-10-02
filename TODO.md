# 🍕 FoodLink - Tarefas

> Atualizado: 02/10/2026 | Estimativa total: ~4h

## ✅ Concluído
- [x] Estrutura do projeto
- [x] Backend .NET (Controllers + Endpoints)
- [x] Frontend React (Vite + Tailwind)
- [x] Login/Register (funcional com API)
- [x] Layout com sidebar
- [x] Docker PostgreSQL (`foodlink_db`)
- [x] CORS configurado (via `FOODLINK_ALLOWED_ORIGINS`)
- [x] Dashboard com dados reais
- [x] Seed completo (admin + 4 categorias + 17 produtos)
- [x] PedidosController criado
- [x] Clientes/Pedidos com [Authorize]
- [x] Connection string via variável de ambiente
- [x] TokenService lendo config (ExpiresInMinutes)
- [x] Build verde + testes 2/2 (02/10)

---

## 🔴 Fase 1 — Backend Crítico (~55 min)
- [x] Fix Program.cs: usar variável `connectionString` no UseNpgsql (~5 min)
- [x] Fix TokenService: ler ExpiresInMinutes do config (~5 min)
- [x] Adicionar [Authorize] em CategoriesController e ProductsController (~10 min)
- [x] Padronizar status de Pedido ("pendente" → "Pendente") (~10 min)
- [x] Adicionar validação nos DTOs de Pedido (~10 min)
- [x] Alinhar namespace DTO (Product → Products) (~10 min)
- [x] Seed de produtos (17 itens a partir do catálogo) (~10 min)
- [x] Proteger DeleteProduct (checar ItensPedido → 409) (~5 min)
- [x] JWT Key para variável de ambiente (fora do git) (~10 min)
- [x] `appsettings.Development.json` fora do git (~2 min)
- [x] Renomear `pizza_db` → `foodlink_db` (~5 min)
- [x] `Description` faltando no GET de categorias (~2 min)

## 🟠 Fase 2 — Admin Funcional (~110 min)
- [ ] Fix bug AuthContext.jsx: linha 10 retorna null para user logado (~5 min)
- [ ] Dashboard: conectar GET /api/dashboard para KPIs (~15 min)
- [ ] Categorias: CRUD real com API (~20 min)
- [ ] Clientes: CRUD real com API (~20 min)
- [ ] Produtos: CRUD real com API (~30 min)
- [ ] Pedidos: listagem + PATCH status (~20 min)

## 🟡 Fase 3 — Catálogo + Deploy (~25 min)
- [ ] Corrigir adaptadores (adaptCategory/adaptProduct) para não perder campos (~15 min)
- [ ] Remover .env.local com token OIDC do Vercel (~5 min)
- [ ] Configurar VITE_API_URL de produção no Vercel (~5 min)

## ⚪ Fase 4 — Docker + Extras (~30 min)
- [ ] docker-compose completo (Postgres + API + Admin) (~15 min)
- [ ] Atualizar AUDITORIA.md com estado real (~10 min)
- [ ] Atualizar este arquivo (TODO.md) (~5 min)

## 🔮 Futuro (não urgente)
- [ ] PDV: carrinho + checkout via POST /api/pedidos (~40 min)
- [ ] Testes para todos os controllers (~30 min)
- [ ] App React Native (Expo)

---

## ⏱️ Sessões sugeridas

### Sessão 1 (2h): Fase 1 + metade da Fase 2
- Backend crítico (~50 min)
- Fix AuthContext (~5 min)
- Dashboard (~15 min)
- CRUD Categorias (~20 min)
- CRUD Clientes (~20 min)

### Sessão 2 (2h): Restante da Fase 2 + Fase 3
- CRUD Produtos (~30 min)
- CRUD Pedidos (~20 min)
- Catálogo adaptors (~15 min)
- Docker (~15 min)
- Docs (~10 min)
