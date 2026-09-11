import { Info, Plus, Search } from "lucide-react";
import type { Category } from "../types/category";
import type { Product } from "../types/product";

interface MenuProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  search: string;
  onSearchChange: (value: string) => void;
  onAdd: (product: Product) => void;
  onOpen: (product: Product) => void;
}

export function Menu({
  products,
  categories,
  selectedCategory,
  onSelectCategory,
  search,
  onSearchChange,
  onAdd,
  onOpen,
}: MenuProps) {
  return (
    <section id="menu" className="py-16 px-4">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display mb-3 text-center text-3xl text-cream">
          Cardápio
        </h2>
        <p className="mb-8 text-center text-gold-pale">
          Frango, pizza brotinho e xineca — do jeito da casa
        </p>

        <div className="mx-auto mb-12 max-w-md">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-pale"
              aria-hidden
            />
            <input
              type="text"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Buscar no cardápio..."
              className="search-input w-full rounded-lg border border-gold/25 bg-char py-3 pl-12 pr-4 text-cream placeholder:text-gold-pale transition focus:outline-none"
            />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => onSelectCategory("all")}
              className={`filter-btn rounded-lg px-4 py-2 text-sm transition ${
                selectedCategory === "all" ? "active" : ""
              }`}
            >
              Todos
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => onSelectCategory(category.id)}
                className={`filter-btn rounded-lg px-4 py-2 text-sm transition ${
                  selectedCategory === category.id ? "active" : ""
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-12 text-center">
            <span className="mb-4 block text-6xl text-wood-light" aria-hidden>
              🍗
            </span>
            <h3 className="text-2xl font-bold text-gold-pale">
              Nada encontrado
            </h3>
            <p className="mt-2 text-gold-pale/60">
              Tente buscar por outro nome
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article key={product.id} className="product-card">
                <div className="relative">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="h-48 w-full object-cover"
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-gold px-2 py-1 text-xs font-bold text-[#1a1206]">
                    R$ {product.price},00
                  </span>
                  <span className="absolute left-2 top-2 rounded-full bg-black/70 px-2 py-1 text-xs text-cream">
                    {categories.find((c) => c.id === product.categoryId)?.name ??
                      product.categoryId}
                  </span>
                  {product.size && (
                    <span className="absolute bottom-2 left-2 rounded-full bg-cream/95 px-2 py-1 text-xs font-semibold text-[#1a1206] shadow">
                      {product.size}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-cream">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gold-pale">
                    {product.description}
                  </p>

                  {product.ingredients && product.ingredients.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {product.ingredients.map((ingredient) => (
                        <span
                          key={ingredient}
                          className="rounded-full bg-wood-light px-2 py-1 text-xs text-[#c9bfae]"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex items-center justify-between border-t border-gold/15 pt-4">
                    <span className="text-xl font-bold text-gold">
                      R$ {product.price},00
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onOpen(product)}
                        className="text-sm font-medium text-gold transition hover:text-gold-pale"
                        aria-label={`Ver detalhes de ${product.name}`}
                      >
                        <Info size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onAdd(product)}
                        className="btn-gold flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-sm"
                      >
                        <Plus size={15} />
                        Adicionar
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}