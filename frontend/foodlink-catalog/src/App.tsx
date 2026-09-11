import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useCatalog } from "./hooks/useCatalog";
import { useCart } from "./context/CartContext";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Categories } from "./components/Categories";
import { Menu } from "./components/Menu";
import { Promotions } from "./components/Promotions";
import { Blog } from "./components/Blog";
import { QrSection } from "./components/QrSection";
import { About } from "./components/About";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CartDrawer } from "./components/CartDrawer";
import { ProductModal } from "./components/ProductModal";
import { mockPosts } from "./data/mock";
import type { Category } from "./types/category";
import type { Product } from "./types/product";

const CATALOG_URL = "https://catalogo.foodlink.com.br";

function App() {
  const { catalog, loading } = useCatalog();
  const {
    items,
    totalItems,
    addItem,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const toastTimer = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const showToast = (message: string) => {
    setToast(message);
    if (toastTimer.current) window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2200);
  };

  const handleAddItem = (product: Product) => {
    addItem(product);
    showToast(`${product.emoji ?? "🍗"} ${product.name} adicionado!`);
  };

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    setSearch("");
  };

  const selectFromCard = (category: Category) => {
    selectCategory(category.id);
    const menuSection = document.getElementById("menu");
    menuSection?.scrollIntoView({ behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d0b08]">
        <div className="mx-auto max-w-5xl animate-pulse px-4 pt-6">
          <div className="h-44 rounded-3xl bg-wood md:h-56" />
          <div className="mt-6 h-12 rounded-full bg-wood" />
          <div className="mt-6 space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="flex gap-4 rounded-2xl border border-gold/10 bg-wood p-3"
              >
                <div className="h-28 w-28 rounded-xl bg-wood-light" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-4 w-2/3 rounded bg-wood-light" />
                  <div className="h-3 w-full rounded bg-wood-light" />
                  <div className="h-3 w-1/2 rounded bg-wood-light" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!catalog) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0d0b08]">
        <p className="text-gold-pale">Não foi possível carregar o catálogo</p>
      </div>
    );
  }

  const { restaurant, categories, products } = catalog;

  const activeCategories = [...categories]
    .filter((category) => category.isActive)
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const filteredProducts = products.filter((product) => {
    if (!product.available) return false;

    const matchesCategory =
      selectedCategory === "all" || product.categoryId === selectedCategory;

    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);

    return matchesCategory && matchesSearch;
  });

  const promotions = products.filter(
    (product) => product.categoryId === "combos",
  );

  const primary = restaurant.theme.primaryColor;
  const selectedCategoryName = activeCategories.find(
    (category) => category.id === selectedProduct?.categoryId,
  )?.name;

  return (
    <div className="min-h-screen bg-[#0d0b08] text-cream">
      {/* TOAST */}
      {toast && (
        <div className="toast-pop fixed left-1/2 top-4 z-[90] -translate-x-1/2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-[#1a1206] shadow-xl">
          {toast}
        </div>
      )}

      <Navbar
        restaurant={restaurant}
        cartCount={totalItems}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <Hero restaurant={restaurant} />

      <Categories
        categories={activeCategories}
        onSelect={selectFromCard}
      />

      <Menu
        products={filteredProducts}
        categories={activeCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={selectCategory}
        search={search}
        onSearchChange={setSearch}
        onAdd={handleAddItem}
        onOpen={setSelectedProduct}
      />

      <Promotions promotions={promotions} onAdd={handleAddItem} />

      <Blog posts={mockPosts} whatsapp={restaurant.whatsapp} />

      <QrSection catalogUrl={CATALOG_URL} />

      <About />

      <Contact restaurant={restaurant} />

      <Footer restaurant={restaurant} />

      {/* VOLTAR AO TOPO */}
      {showBackToTop && (
        <button
          type="button"
          className="btn-gold fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full p-3 text-[#1a1206] shadow-lg transition"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={20} />
        </button>
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        restaurantName={restaurant.name}
        whatsapp={restaurant.whatsapp}
        primaryColor={primary}
      />

      <ProductModal
        product={selectedProduct}
        categoryName={selectedCategoryName}
        quantity={
          selectedProduct
            ? items.find((item) => item.product.id === selectedProduct.id)
                ?.quantity ?? 0
            : 0
        }
        primaryColor={primary}
        onAdd={() => {
          if (selectedProduct) {
            handleAddItem(selectedProduct);
            setSelectedProduct(null);
          }
        }}
        onIncrease={() => selectedProduct && increaseQuantity(selectedProduct.id)}
        onDecrease={() => selectedProduct && decreaseQuantity(selectedProduct.id)}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}

export default App;