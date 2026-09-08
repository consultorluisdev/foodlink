# 📚 Aprender Testes — Guia de Estudo (xUnit + Vitest)

> Objetivo: **nunca mais criar código sem teste** — no backend nem no frontend.
> Este arquivo é para você ler/revisar com calma. Amanhã começamos a prática.

---

## 🧠 O princípio (TDD - Test Driven Development)

A ideia central: **escrever o teste ANTES da lógica real**.

Fluxo mental de todo dev que testa:
1. Escrever o teste (que falha — porque a feature ainda não existe)
2. Escrever o código mínimo pra passar no teste
3. Melhorar/refatorar o código (o teste garante que nada quebrou)

Regra prática que você quer adotar no projeto:
> **"Se eu crio uma rota/componente/função nova, ela tem que vir com teste."**

---

## 🧪 Backend — .NET + xUnit

### O que é teste de unidade?

Testar **uma unidade isolada** do sistema — geralmente **um método**
(ex: `CategoriesController.GetCategories()`).

Não queremos o banco PostgreSQL real nem o servidor subindo.
Testamos o controller, mas com um **banco fake** (InMemory) no lugar do banco real.

---

### ✏️ Os 3 passos de TODO teste: **AAA**

Este é o conceito MAIS importante. Todo teste segue:

```csharp
[Fact]
public async Task GetCategories_RetornaLista_QuandoExistemCategorias()
{
    // ARRANGE  = prepara o cenário (dados + objeto a testar)
    // ACT      = executa o método
    // ASSERT   = confere se o resultado está certo
}
```

Exemplo concreto com o seu `CategoriesController`:

```csharp
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Entities;
using api.Controllers;

[Fact]
public async Task GetCategories_RetornaLista_QuandoExistemCategorias()
{
    // ARRANGE: cria 2 categorias num banco fake
    var context = CriarContextoInMemory();
    context.Categories.AddRange(
        new Category { Name = "Pizzas" },
        new Category { Name = "Bebidas" });
    await context.SaveChangesAsync();
    var controller = new CategoriesController(context);

    // ACT: chama o método GET
    var resultado = await controller.GetCategories();

    // ASSERT: confere se voltou 2 categorias
    Assert.NotNull(resultado);
}
```

**Por que o nome do teste é comprido?**
O nome do teste *documenta* o comportamento:
`Método_Cenário_ResultadoEsperado`
`GetCategories_ExistemCategorias_RetornaLista`

---

### 📌 `[Fact]` vs `[Theory]`

| | `[Fact]` | `[Theory]` + `[InlineData]` |
|---|---|---|
| Uso | Um caso único | Mesmo teste com vários valores |
| Exemplo | `Soma(2,3) == 5` | `Soma(1,1)==2`, `Soma(2,2)==4`, ... |

```csharp
[Fact]
public void Soma_2mas3_Retorna5()
{
    Assert.Equal(5, Soma(2, 3));
}

[Theory]
[InlineData(2, 3, 5)]
[InlineData(10, 20, 30)]
[InlineData(-1, 1, 0)]
public void Soma_DoisNumeros_RetornaSoma(int a, int b, int esperado)
{
    Assert.Equal(esperado, Soma(a, b));
}
```

---

### ✅ Os `Assert` que você vai usar 90% do tempo

```csharp
Assert.Equal(esperado, atual);            // valores iguais
Assert.NotNull(obj);                      // não é nulo
Assert.True(condicao);                    // condição verdadeira
Assert.False(condicao);                   // condição falsa
Assert.Empty(colecao);                    // coleção vazia
Assert.Contains(item, colecao);           // tem o item
Assert.IsType<OkObjectResult>(res);       // é do tipo esperado
await Assert.ThrowsAsync<Exception>(() => metodoAsync()); // deve lançar erro
```

Como os controllers retornam `IActionResult`/`ActionResult`, o padrão comum é:

```csharp
var ok = Assert.IsType<OkObjectResult>(resultado);
var dados = Assert.IsType<List<CategoryResponseDto>>(ok.Value);
Assert.Equal(2, dados.Count);
```

---

### 🪄 O que é "mock" no seu caso?

**Mock = um objeto falso** que simula uma dependência real.

O controller depende do `AppDbContext` (que aponta pro PostgreSQL).
Para testar SEM o banco real, injetamos um **banco InMemory**:

```csharp
var options = new DbContextOptionsBuilder<AppDbContext>()
    .UseInMemoryDatabase(Guid.NewGuid().ToString()) // banco fake, isolado
    .Options;

var context = new AppDbContext(options);
```

**Por que `Guid.NewGuid()`?** Cada teste cria um banco separado.
Se todos usassem o mesmo nome, um teste poluiria o dado do outro.

---

### 🚀 Próximo nível: Integration test (`WebApplicationFactory`)

Depois de dominar o básico, evolui pra **integration test**: sobe a API real via `HttpClient`.

```csharp
var factory = new WebApplicationFactory<Program>();
var client = factory.CreateClient();

var response = await client.GetAsync("/api/categories");
Assert.Equal(HttpStatusCode.OK, response.StatusCode);
```

Diferença:
- **Unidade/controller**: método isolado, rápido.
- **Integração**: rota → controller → banco → resposta HTTP, realista.

> **Ordem:** domine o teste de controller com InMemory primeiro. Integração depois.

---

## 🌐 Frontend — React + Vitest

### Mesma coisa, outro framework

React usa **Vitest** (baseado no Jest) + **Testing Library**.
O conceito **AAA é o mesmo**.

```tsx
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

describe('CartCard', () => {
  it('exibe o nome do produto no carrinho', () => {
    // ARRANGE
    const produto = { name: 'Calabresa', price: 25 };

    // ACT
    render(<CartCard product={produto} />);

    // ASSERT
    expect(screen.getByText('Calabresa')).toBeInTheDocument();
  });
});
```

**Conceitos novos no front:**
- `render(...)` — monta o componente
- `screen.getByText(...)` / `getByRole(...)` — procura na tela como um usuário faria
- `describe` / `it` — organizam testes (iguais a `[Fact]`/classe)

**Regra de ouro:** teste pelo que o **usuário vê** (texto, botão).
Evite achar por detalhe interno (ex: `data-testid`) se puder achar pelo texto.

---

## 🗺️ Plano de prática (por etapas)

| Etapa | O que fazer |
|-------|-------------|
| 1 | Criar `api.Tests`, configurar InMemory |
| 2 | Testar `CategoriesController` (1º teste: GET retorna lista) |
| 3 | Cobrir a API toda (Categories + Products + Auth) |
| 4 | Evoluir p/ integration test (`WebApplicationFactory`) |
| 5 | Configurar Vitest no frontend |
| 6 | Testar componentes mais simples (hooks/cart) |
| 7 | Testar telas/páginas |

---

## 📝 Comandos rápidos

**Criar projeto de teste (backend):**
```bash
cd backend
dotnet new xunit -n api.Tests
dotnet add api.Tests/api.Tests.csproj reference api/api.csproj
dotnet add api.Tests/api.Tests.csproj package Microsoft.EntityFrameworkCore.InMemory
dotnet add api.Tests/api.Tests.csproj package Microsoft.AspNetCore.Mvc.Testing
```

**Rodar testes backend:**
```bash
cd backend
dotnet test
```

**Instalar teste frontend:**
```bash
cd frontend/foodlink-catalog
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```
(E depois adicionar o script `"test": "vitest"` no package.json)

**Rodar testes frontend:**
```bash
npm test
```

---

## ✅ Checklist do "hábito"

Toda vez que for criar algo novo:
- [ ] Backend: tem controller novo? → tem teste de controller
- [ ] Backend: tem regra de negócio? → tem teste dessa regra
- [ ] Frontend: tem componente/hook novo? → tem teste de componente
- [ ] Rodei `dotnet test` / `npm test` e está verde?
