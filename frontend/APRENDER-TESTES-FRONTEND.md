# 🌐 Frontend — Mapa de Integração & Testes

> Contexto geral para você revisar com calma.
> Objetivo: entender onde cada frontend se conecta ao backend e como/onde encaixar os testes.

---

## 🗂️ Estrutura atual do frontend

```
frontend/
├── pizza-web/          ← APP PRINCIPAL (funciona, JSX)
│   └── src/
│       ├── services/api.js      →  BASE DA API (axios → :5108/api)
│       ├── pages/               →  Login, Register, Dashboard, Produtos, Pedidos, Pdv
│       └── components/layout/   →  Layout, Sidebar, Topbar
│
├── foodlink-catalog/   ← CATÁLOGO (em construção, TypeScript)
│   └── src/
│       ├── hooks/useCatalog.ts  →  VAZIO (esqueleto)
│       ├── hooks/useCart.ts     →  VAZIO
│       ├── data/mock/           →  dados fake (restaurant, categories, products)
│       ├── types/               →  interfaces TS
│       └── App.tsx              →  TEMPLATE PADRÃO DO VITE (não é tela real)
│
└── catalogo-react/     ← PASTA VAZIA
```

---

## 🔌 Como cada um se conecta ao backend

### 1. `pizza-web` — ✅ JÁ ESTÁ INTEGRADO

O ponto de conexão é **`services/api.js`**:

```js
export const api = axios.create({
    baseURL: "http://localhost:5108/api",   // backend real (POSTGRES)
});
```

Todas as páginas usam esse `api` pra bater nos endpoints (auth, products, categories, ...).

**É aqui que vive a integração real de hoje.**

### 2. `foodlink-catalog` — ❌ NÃO ESTÁ INTEGRADO AINDA

- Hooks **vazios** (`useCatalog` não tem `return` nem fetch; `useCart` é arquivo em branco).
- `App.tsx` é o **template padrão do Vite** (tela "Get started" com o contador).
- Só tem **dados mock** (`data/mock/`) — nada consumido do servidor.

**Está no zero**: tem estrutura de tipos + mock, mas não está funcional.

---

## ⚠️ Observação importante sobre a porta

O `api.js` do pizza-web aponta pra **`:5108`**.

No `Program.cs` do backend, o `UseNpgsql` vai pro Postgres em `:5433` — isso é o **banco**, não a API.
A porta da API em si vem de `Properties/launchSettings.json`.

**Se a API subir em outra porta, o frontend não conecta.** ➜ vale conferir a porta no `launchSettings.json`.

---

## 🧪 Onde encaixar os testes

| Frontend | O que dá pra testar |
|----------|---------------------|
| **pizza-web** | `services/api.js` (axios), funções de página/componente |
| **foodlink-catalog** | Types + mocks, e os hooks **depois de implementados** |

### Sequência recomendada

1. **Terminar/funcionar o `foodlink-catalog`** (hooks + App real + integrar com a API igual o pizza-web faz).
2. **Configurar Vitest** e testar conforme for construindo (tipos → mocks → hooks).
3. Depois cobrir o `pizza-web`.

> **Regra de ouro:** testar o que está sendo construído, não código morto/template.

---

## ⚙️ Setup do Vitest (quando for rodar)

```bash
cd frontend/foodlink-catalog
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
```

Depois adicionar no `package.json` (script):
```json
"scripts": {
  ...
  "test": "vitest"
}
```

**Rodar testes:**
```bash
npm test
```

(opcional: `"test": "vitest run"` para rodar uma vez sem watch)

---

## ✅ Checklist do "hábito"

Toda vez que criar algo novo no frontend:
- [ ] Componente novo? → tem teste de componente
- [ ] Hook novo? → tem teste de hook
- [ ] Chamada de API nova? → tem teste do serviço/mock
- [ ] Rodei `npm test` e está verde?
