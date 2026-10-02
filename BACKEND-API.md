# FoodLink — Backend API (.NET 10)

## 📊 Stack

| Componente | Tecnologia | Versão |
|------------|------------|--------|
| Framework | .NET | 10 |
| ORM | EF Core + Npgsql | 10 |
| Banco | PostgreSQL (`foodlink_db`, porta 5433) | 15 |
| Auth | JWT + BCrypt | — |
| Porta | 5167 | — |
| Swagger | /swagger | — |

## 🔧 Variáveis de ambiente

Nada de segredo no git. Copie `backend/api/.env.example` e exporte antes de rodar
(ou use `backend/api/appsettings.Development.json`, que está no `.gitignore`).

| Variável | Fallback | Descrição |
|----------|----------|-----------|
| `FOODLINK_DB_CONNECTION` | `ConnectionStrings:DefaultConnection` | String de conexão do PostgreSQL. **Obrigatória** — a API não sobe sem ela |
| `FOODLINK_JWT_KEY` | `Jwt:Key` | Chave de assinatura do JWT (mín. 32 chars). **Obrigatória** |
| `FOODLINK_ALLOWED_ORIGINS` | 3 origens de dev | Origens do CORS, separadas por vírgula. Inclua o domínio do catálogo |

## 🔌 Endpoints

| Endpoint | Método | Controller | Auth? | Status |
|----------|--------|------------|-------|--------|
| `/api/auth/register` | POST | Auth | Não | ✅ Pronto |
| `/api/auth/login` | POST | Auth | Não | ✅ Pronto |
| `/api/categories` | GET | Categories | Não (AllowAnonymous) | ✅ Catálogo público |
| `/api/categories/{id}` | GET | Categories | Não (AllowAnonymous) | ✅ Catálogo público |
| `/api/categories` | POST | Categories | Sim | ✅ Pronto |
| `/api/categories/{id}` | PUT | Categories | Sim | ✅ Pronto |
| `/api/categories/{id}` | DELETE | Categories | Sim | ✅ Pronto |
| `/api/products` | GET | Products | Não (AllowAnonymous) | ✅ Catálogo público |
| `/api/products/{id}` | GET | Products | Não (AllowAnonymous) | ✅ Catálogo público |
| `/api/products` | POST | Products | Sim | ✅ Pronto |
| `/api/products/{id}` | PUT | Products | Sim | ✅ Pronto |
| `/api/products/{id}/status` | PATCH | Products | Sim | ✅ Pronto |
| `/api/products/{id}` | DELETE | Products | Sim | ✅ Pronto |
| `/api/clientes` | GET | Clientes | Sim | ✅ Pronto |
| `/api/clientes/{id}` | GET | Clientes | Sim | ✅ Pronto |
| `/api/clientes` | POST | Clientes | Sim | ✅ Pronto |
| `/api/clientes/{id}` | PUT | Clientes | Sim | ✅ Pronto |
| `/api/clientes/{id}` | DELETE | Clientes | Sim | ✅ Pronto |
| `/api/pedidos` | GET | Pedidos | Sim | ✅ Pronto |
| `/api/pedidos/{id}` | GET | Pedidos | Sim | ✅ Pronto |
| `/api/pedidos` | POST | Pedidos | Sim | ✅ Pronto |
| `/api/pedidos/{id}/status` | PATCH | Pedidos | Sim | ✅ Pronto |
| `/api/pedidos/{id}` | DELETE | Pedidos | Sim | ✅ Pronto |
| `/api/dashboard` | GET | Dashboard | Sim | ✅ Pronto |

**Legenda:** ✅ Pronto (autenticado) | ✅ Catálogo público (sem token)

## 🗄️ Entidades

| Entidade | Tabela | Campos |
|----------|--------|--------|
| User | Users | Id, Name, Email, Password (BCrypt), Role |
| Category | Categories | Id, Name, Description, IsActive, CreatedAt, UpdatedAt |
| Product | Products | Id, Name, Description, Price, CostPrice, Stock, CategoryId, ImageUrl, IsActive, CreatedAt, UpdatedAt |
| Cliente | Clientes | Id, Nome, Email, Telefone, Ativo, CreatedAt, UpdatedAt |
| Pedido | Pedidos | Id, ClienteId, Status, ValorTotal, Observacao, Fiado, CreatedAt |
| ItemPedido | ItensPedido | Id, PedidoId, ProdutoId, Quantidade, PrecoUnitario |

## 🔗 Relacionamentos

```
Category (1) ── (N) Product
Product (1) ── (N) ItemPedido
Pedido (1) ── (N) ItemPedido
Cliente (1) ── (N) Pedido
```

## 🌱 Seed Automático

`backend/api/Data/DbSeeder.cs` roda no startup, logo após `Database.Migrate()`.
É idempotente: só cria o que estiver faltando, nunca duplica.

| Tipo | Dados |
|------|-------|
| Admin | `admin@foodlink.com` / `admin123` |
| Categorias | Assados, Combos, Pizzas, Bebidas |
| Produtos | 17 itens: 2 assados (R$60/R$35), 3 combos (R$75/R$45/R$180), 9 pizzas (R$10 + combo família R$100), 3 bebidas (R$12/R$9/R$5) |
| Preenchimento | `Stock` 100, `CostPrice` 60% do preço, `IsActive` true |

Status de pedido (aceitos no `PATCH /api/pedidos/{id}/status`):
`Pendente` · `Em preparo` · `Saiu para entrega` · `Entregue` · `Cancelado`

## ✅ Status

- ✅ `dotnet build` sem erros, `dotnet test` 2/2
- ✅ Secret JWT e connection string fora do git
- ✅ `DELETE /api/products/{id}` devolve 409 se o produto tem pedido
- ⚠️ `GET /api/dashboard` só devolve `pedidosHoje`, `faturamento`, `clientes`

## 📁 Estrutura de Arquivos

```
backend/
├── api/
│   ├── api.csproj
│   ├── Program.cs
│   ├── appsettings.json
│   ├── .env.example
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── CategoriesController.cs
│   │   ├── ClientesController.cs
│   │   ├── DashboardController.cs
│   │   ├── PedidosController.cs
│   │   └── ProductsController.cs
│   ├── Entities/
│   │   ├── AuthDtos.cs
│   │   ├── Category.cs
│   │   ├── Cliente.cs
│   │   ├── ItemPedido.cs
│   │   ├── Pedido.cs
│   │   ├── Product.cs
│   │   └── User.cs
│   ├── DTOs/
│   │   ├── Categories/
│   │   │   ├── CategoryResponseDto.cs
│   │   │   ├── CreateCategoryDto.cs
│   │   │   └── UpdateCategoryDto.cs
│   │   ├── Products/
│   │   │   ├── CreateProductDto.cs
│   │   │   ├── ProductResponseDto.cs
│   │   │   ├── UpdateProducDto.cs
│   │   │   └── UpdateProductStatusDto.cs
│   │   └── Pedidos/
│   │       ├── CreateItemPedidoDto.cs
│   │       ├── CreatePedidoDto.cs
│   │       └── UpdatePedidoStatusDto.cs
│   ├── Data/
│   │   ├── AppDbContext.cs
│   │   └── DbSeeder.cs
│   ├── Services/
│   │   └── TokenService.cs
│   └── Migrations/
└── tests/
    └── foodlink.Api.Tests/
        ├── foodlink.Api.Tests.csproj
        └── Auth/
            └── AuthControllerTests.cs
```

*Última atualização: 02/10/2026*
