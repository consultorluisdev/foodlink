
# Correções Pendentes - backend/api

Erros que ainda precisam ser corrigidos. Cada item tem o arquivo, a linha, e o código errado → certo.

---

## 1. Data/AppDbContext.cs

**Linha 23** — `PasswordHash` não existe no User (tem `Password`):
```csharp
// ERRADO (linha 23):
entity.Property(e => e.PasswordHash).IsRequired();

// CERTO:
entity.Property(e => e.Password).IsRequired();
```

**Linha 24** — `Name` não existe no User:
```csharp
// ERRADO (linha 24):
entity.Property(e => e.Name).IsRequired().HasMaxLength(100);

// CERTO: apague essa linha inteira
```

**Linhas 34-35** — faltam `;` no final:
```csharp
// ERRADO (linhas 34-35):
entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP")
entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP")

// CERTO:
entity.Property(e => e.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
entity.Property(e => e.UpdatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
```

**Linha 43** — typo `HasMaxLenght`:
```csharp
// ERRADO (linha 43):
entity.Property(e => e.Name).IsRequired().HasMaxLenght(200);

// CERTO:
entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
```

**Linha 59** — `onDelete` com o minúsculo:
```csharp
// ERRADO (linha 59):
.onDelete(DeleteBehavior.Restrict);

// CERTO:
.OnDelete(DeleteBehavior.Restrict);
```

---

## 2. Controllers/ProductsController.cs

**Linha 67** — falta `;`:
```csharp
// ERRADO (linha 67):
return Ok(products)

// CERTO:
return Ok(products);
```

**Linha 93** — variável errada:
```csharp
// ERRADO (linha 93):
if (product == null)

// CERTO:
if (products == null)
```

**Linha 96** — falta `;`:
```csharp
// ERRADO (linha 96):
return Ok(products)

// CERTO:
return Ok(products);
```

**Linha 115** — `stock` lowercase (entity agora tem `Stock`):
```csharp
// ERRADO (linha 115):
stock = createDto.Stock,

// CERTO:
Stock = createDto.Stock,
```

**Linha 145** — typo `reponse`:
```csharp
// ERRADO (linha 145):
return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, reponse);

// CERTO:
return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, response);
```

**Linha 150** — nome do metodo igual ao tipo do parametro:
```csharp
// ERRADO (linha 150):
public async Task<ActionResult> UpdateProductDto(int id, UpdateProductDto updateDto)

// CERTO:
public async Task<ActionResult> UpdateProduct(int id, UpdateProductDto updateDto)
```

**Linha 195** — `IsActivate` não existe (tem `IsActive`):
```csharp
// ERRADO (linha 195):
isActive = product.IsActivate

// CERTO:
isActive = product.IsActive
```

---

## 3. Controllers/CategoriesController.cs

**Linhas 26 e 35** — `c.Product` (singular) mas entity agora tem `Products` (plural):
```csharp
// ERRADO (linha 26):
.Include(c => c.Product)

// CERTO:
.Include(c => c.Products)


// ERRADO (linha 35):
ProductCount = c.Product.Count

// CERTO:
ProductCount = c.Products.Count
```

**Linha 101** — parametro sem nome:
```csharp
// ERRADO (linha 101):
public async Task<IActionResult> UpdatedCategory(int id, UpdateCategoryDto)

// CERTO:
public async Task<IActionResult> UpdatedCategory(int id, UpdateCategoryDto updateDto)
```

**Linhas 103-108** — logica quebrada, variavel `c` e `exists` não existem nesse escopo:
```csharp
// ERRADO (linhas 103-108):
var category = await _context.Categories.FindAsync(id);
if(category == null)
  return NotFound(c.Id != id && c.Name.ToLower() == updateDto.Name.ToLower());

  if(exists)
    return Conflict(new { message = "Já existe outra categoria com este nome"});

// CERTO (substitua essas 6 linhas por):
var category = await _context.Categories.FindAsync(id);
if (category == null)
    return NotFound(new { message = "Categoria não encontrada" });

var exists = await _context.Categories
    .AnyAsync(c => c.Id != id && c.Name.ToLower() == updateDto.Name.ToLower());

if (exists)
    return Conflict(new { message = "Já existe outra categoria com este nome" });
```

---

## 4. Controllers/AuthController.cs

**Linhas 2-3 e 8** — namespaces inconsistentes (o resto do projeto usa `api.*`):
```csharp
// ERRADO (linha 2):
using App.Data;

// CERTO:
using api.Data;


// ERRADO (linha 3):
using App.Entities;

// CERTO:
using api.Entities;


// ERRADO (linha 8):
namespace App.Controllers;

// CERTO:
namespace api.Controllers;
```

---

## 5. Entities/User.cs

**Linha 1** — namespace inconsistente:
```csharp
// ERRADO (linha 1):
namespace App.Entities;

// CERTO:
namespace api.Entities;
```

---

## Ordem para corrigir

1. `Entities/User.cs` (namespace)
2. `Data/AppDbContext.cs` (User config + typos)
3. `Controllers/ProductsController.cs` (7 correções)
4. `Controllers/CategoriesController.cs` (4 correções)
5. `Controllers/AuthController.cs` (3 namespaces)

Depois: `dotnet build` pra confirmar que compila.

---

## 6. Testes

Depois de corrigir tudo e o `dotnet build` passar, criar o projeto de testes.

### 6.1 Criar projeto de testes

Rodar na pasta `backend/`:
```bash
dotnet new xunit -n api.Tests
dotnet add api.Tests/api.Tests.csproj reference api/api.csproj
dotnet add api.Tests/api.Tests.csproj package Microsoft.AspNetCore.Mvc.Testing
dotnet add api.Tests/api.Tests.csproj package Microsoft.EntityFrameworkCore.InMemory
```

### 6.2 Estrutura de pastas

```
backend/api.Tests/
├── Controllers/
│   ├── ProductsControllerTests.cs
│   ├── CategoriesControllerTests.cs
│   └── AuthControllerTests.cs
└── Fixtures/
    └── TestDatabaseFixture.cs
```

### 6.3 Testes para criar

#### CategoriesControllerTests.cs
- [ ] `GetCategories_RetornaLista` — cria 2 categorias, GET retorna 2
- [ ] `GetCategory_PorId_RetornaCategoria` — cria categoria, GET /{id} retorna ela
- [ ] `GetCategory_IdInvalido_RetornaNotFound` — GET /999 retorna 404
- [ ] `CreateCategory_RetornaCreated` — POST com dados validos retorna 201
- [ ] `CreateCategory_NomeDuplicado_RetornaConflict` — POST com nome existente retorna 409
- [ ] `UpdateCategory_RetornaOk` — PUT com dados validos retorna 200
- [ ] `UpdateCategory_NomeDuplicado_RetornaConflict` — PUT com nome de outra categoria retorna 409
- [ ] `DeleteCategory_RetornaNoContent` — DELETE categoria sem produtos retorna 204
- [ ] `DeleteCategory_ComProdutos_RetornaConflict` — DELETE categoria com produtos retorna 409

#### ProductsControllerTests.cs
- [ ] `GetProducts_RetornaLista` — cria produto, GET retorna lista
- [ ] `GetProducts_FiltroPorCategoria` — cria 2 produtos em categorias diferentes, filtra por uma
- [ ] `GetProducts_FiltroPorAtivo` — cria produto inativo, filtra so ativos
- [ ] `GetProducts_BuscaPorNome` — busca por texto no nome
- [ ] `GetProduct_PorId_RetornaProduto` — GET /{id} retorna produto certo
- [ ] `GetProduct_IdInvalido_RetornaNotFound` — GET /999 retorna 404
- [ ] `CreateProduct_RetornaCreated` — POST com categoria existente retorna 201
- [ ] `CreateProduct_CategoriaInvalida_RetornaNotFound` — POST com CategoryId inexistente retorna 404
- [ ] `UpdateProduct_RetornaOk` — PUT atualiza todos os campos
- [ ] `UpdateProduct_NaoEncontrado_RetornaNotFound` — PUT /999 retorna 404
- [ ] `UpdateProductStatus_AlternaAtivo` — PATCH ativa/desativa produto
- [ ] `DeleteProduct_RetornaNoContent` — DELETE remove produto
- [ ] `DeleteProduct_NaoEncontrado_RetornaNotFound` — DELETE /999 retorna 404

#### AuthControllerTests.cs
- [ ] `Register_RetornaOk` — POST register com dados validos retorna 200
- [ ] `Login_RetornaOk` — POST login com credenciais corretas retorna 200
- [ ] `Login_CredenciaisInvalidas_RetornaUnauthorized` — POST login errado retorna 401

### 6.4 TestDatabaseFixture.cs

Usar InMemory database pra nao depender do PostgreSQL nos testes:
```csharp
public class TestDatabaseFixture
{
    public AppDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<AppDbContext>()
            .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
            .Options;

        var context = new AppDbContext(options);
        context.Database.EnsureCreated();
        return context;
    }
}
```

### 6.5 Rodar testes

```bash
dotnet test api.Tests/api.Tests.csproj
```
