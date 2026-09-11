import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, X } from "lucide-react";
import type { BlogPost } from "../types/blog";

const BLOG_FILTERS = ["Todos", "Receitas", "Bastidores", "Dicas"];

interface BlogProps {
  posts: BlogPost[];
  whatsapp: string;
}

export function Blog({ posts, whatsapp }: BlogProps) {
  const [filter, setFilter] = useState("Todos");
  const [selected, setSelected] = useState<BlogPost | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filtered =
    filter === "Todos" ? posts : posts.filter((p) => p.category === filter);

  return (
    <section id="blog" className="mx-auto max-w-7xl px-4 py-16">
      <h2 className="font-display mb-3 text-center text-3xl text-cream">
        Histórias do Foodlink
      </h2>
      <p className="mb-8 text-center text-gold-pale">
        Receitas, bastidores e dicas de sábado
      </p>

      <div className="mb-10 flex flex-wrap justify-center gap-2">
        {BLOG_FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`filter-btn rounded-lg px-4 py-2 text-sm transition ${
              filter === item ? "active" : ""
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="product-card cursor-pointer"
            onClick={() => setSelected(post)}
          >
            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-wood-light to-char">
              <span className="text-5xl text-gold" aria-hidden>
                {post.icon}
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-center gap-2 text-xs text-gold-pale">
                <span className="rounded-full bg-gold px-2 py-0.5 font-bold text-[#1a1206]">
                  {post.category}
                </span>
                <span>{post.date}</span>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="mb-2 text-lg font-bold text-cream">
                {post.title}
              </h3>
              <p className="mb-3 text-sm text-gold-pale">{post.excerpt}</p>
              <span className="flex items-center gap-1 text-sm font-semibold text-gold">
                Ler mais
                <ArrowRight size={14} />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="modal-overlay"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-content relative w-full max-w-[700px]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center"
              onClick={() => setSelected(null)}
              aria-label="Fechar"
            >
              <X size={18} />
            </button>

            <div className="flex h-40 items-center justify-center bg-gradient-to-br from-wood-light to-char">
              <span className="text-6xl text-gold" aria-hidden>
                {selected.icon}
              </span>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-3 flex items-center gap-2 text-xs text-gold-pale">
                <span className="rounded-full bg-gold px-2 py-0.5 font-bold text-[#1a1206]">
                  {selected.category}
                </span>
                <span>{selected.date}</span>
                <span aria-hidden>·</span>
                <span>{selected.readTime} de leitura</span>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-cream">
                {selected.title}
              </h2>
              <div className="space-y-4 leading-relaxed text-[#c9bfae]">
                {selected.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
              </div>
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp mt-6 inline-flex px-6 py-3 text-sm"
              >
                <MessageCircle size={16} />
                Fazer meu pedido
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}