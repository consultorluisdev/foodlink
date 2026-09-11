import { MessageCircle, ExternalLink, Smartphone, Tag } from "lucide-react";

interface QrSectionProps {
  catalogUrl: string;
}

export function QrSection({ catalogUrl }: QrSectionProps) {
  return (
    <section className="bg-char px-4 py-16 text-cream">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display mb-3 text-3xl">
          Acesse nosso cardápio pelo QR Code
        </h2>
        <p className="mb-8 text-gold-pale">
          Escaneie com o celular e veja o cardápio completo
        </p>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
          <div className="rounded-xl bg-white p-4 shadow-2xl">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(catalogUrl)}&bgcolor=ffffff&color=000000&margin=10`}
              alt="QR Code Foodlink"
              loading="lazy"
              className="h-48 w-48 md:h-56 md:w-56"
            />
          </div>
          <div className="text-left">
            <p className="mb-2 flex items-center gap-2 text-lg">
              <Smartphone size={18} className="text-gold" />
              Escaneie e veja o cardápio
            </p>
            <p className="mb-2 flex items-center gap-2 text-lg">
              <MessageCircle size={18} className="text-green-500" />
              Faça seu pedido direto
            </p>
            <p className="flex items-center gap-2 text-lg">
              <Tag size={18} className="text-gold" />
              Aproveite os combos
            </p>
            <a
              href={catalogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold mt-6 inline-block rounded-lg px-6 py-3 transition"
            >
              <ExternalLink size={16} />
              Acessar Cardápio
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}