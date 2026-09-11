import { useState } from "react";
import { useCatalog } from "./hooks/useCatalog";
import { useCart } from "./context/CartContext";
import { CartDrawer } from "./components/CartDrawer";

function formatBRL(value: number) {
  return value.toFixed(2).replace(".", ",");
}

function App() {
  const { catalog, loading } = useCatalog();
  const { addItem, totalItems } = useCart()

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCartOpen, setIsCartOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-5xl mb-4">🍗</div>

          <p className="text-gray-600">Carregando catálogo...</p>
        </div>
      </div>
    );
  }
  if (!catalog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Não foi possivel carregar o catálogo</p>
      </div>
    );
  }

  const { restaurant, categories, products } = catalog;

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.categoryId === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-cream">
      {/* HEADER */}

      <header className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1
              className="text-xl md:text-2xl font-bold text-gold"
              style={{
                color: restaurant.theme.primaryColor,
              }}
            >
              {restaurant.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Faça o seu pedido WhatsApp
            </p>
          </div>

          <button
            className="btn-gold relative px-4 py-2"
            onClick={() => setIsCartOpen(true)}
          >
            🛒 Carrinho
            {totalItems > 0 && (
              <span className="cart-badge absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center px-1">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* HERO */}
      <section
        className="hero-gradient text-white"
        style={{
          backgroundColor: restaurant.theme.secondaryColor,
        }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 bg-gold">
              🍗 Peça agora
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              {restaurant.name}
            </h2>
            <p className="text-lg text-white/80 mb-6">
              {restaurant.description}
            </p>

            {/* botao do whatsApp*/}
            <a
              href={`https://wa.me/${restaurant.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold"
            >
              📲 Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
      {/* CATEGORIAS */}
      <section className="max-w-7xl mx-auto px-4 py-8 bg-black">
        <h2 className="text-2xl font-bold mb-5 text-cream">Nosso Cardápio</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-full whitespace-nowrap font-medium ${
              selectedCategory === "all"
                ? "text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Todos
          </button>

          {categories
            .filter((category) => category.isActive)
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2 rounded-full whitespace-nowrap font-medium ${
                  selectedCategory === category.id
                    ? "text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {category.name}
              </button>
            ))}
        </div>
      </section>

      {/* PRODUTOS */}
      <main className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts
            .filter((product) => product.available)
            .map((product) => {
              const finalPrice = product.promotionalPrice ?? product.price;

              const hasPromotion = product.promotionalPrice !== undefined;
              return (
                <article
                  key={product.id}
                  className="product-card"
                >

                  {/* IMAGEM TEMPORARIA */}
                  <div className="h-48 bg-wood-light flex items-center justify-center">
                    <span className="text-6xl">🍗</span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold mb-2">{product.name}</h3>

                    <p className="text-sm text-gray-500 mb-4">
                      {product.description}
                    </p>

                    <div className="mb-4">
                      {hasPromotion && (
                        <span className="block text-sm text-gray-400 line-through">
                          R$ {formatBRL(product.price)}
                        </span>
                      )}

                      <span
                        className="text-xl font-bold text-gold"
                        style={{
                          color: restaurant.theme.primaryColor,
                        }}
                      >
                        R$ {formatBRL(finalPrice)}
                      </span>
                    </div>

                    <button
                      className="btn-gold w-full py-3"
                      style={{
                        backgroundColor: restaurant.theme.primaryColor,
                      }}
                      onClick={() => addItem(product)}
                    >
                      + Adicionar
                    </button>
                  </div>
                </article>
              );
            })}
        </div>
      </main>
      {/* FOOTER */}
      <footer className="border-t bg-white/10 bg-char">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <h3 className="font-bold text-lg mb-2 text-gold">{restaurant.name}</h3>
          <p className="text-sm text-gold-pale">{restaurant.address}</p>
          <p className="text-sm text-gold-pale">{restaurant.phone}</p>
        </div>
      </footer>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        restaurantName={restaurant.name}
        whatsapp={restaurant.whatsapp}
        primaryColor={restaurant.theme.primaryColor}
      />
    </div>
  );
}

export default App;
