import type { Category } from "../types/category";

interface CategoriesProps {
  categories: Category[];
  onSelect: (category: Category) => void;
}

export function Categories({ categories, onSelect }: CategoriesProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="font-display mb-3 text-center text-3xl text-cream">
        Categorias
      </h2>
      <p className="mb-12 text-center text-gold-pale">
        Escolha o seu jeito de frango
      </p>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className="category-card"
            onClick={() => onSelect(category)}
          >
            <span className="mb-3 block text-4xl text-gold" aria-hidden>
              {category.emoji}
            </span>
            <h3 className="text-lg font-bold text-cream">{category.name}</h3>
            <p className="text-sm text-gold-pale">{category.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}