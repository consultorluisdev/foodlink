import { useState } from "react";
import { Clock, MapPin, MessageCircle, Send } from "lucide-react";
import type { Restaurant } from "../types/restaurant";
import { mapsEmbedUrl, mapsSearchUrl } from "../utils/maps";

interface ContactProps {
  restaurant: Restaurant;
}

export function Contact({ restaurant }: ContactProps) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = `Olá! Meu nome é ${name}. ${message}`;
    window.open(
      `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  const instagramUrl = `https://instagram.com/${restaurant.instagram.replace("@", "")}`;

  return (
    <section id="contact" className="py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display mb-3 text-center text-3xl text-cream">
          Contato
        </h2>
        <p className="mb-12 text-center text-gold-pale">
          Entre em contato conosco
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-gold/20 bg-wood p-6">
            <h3 className="mb-4 text-xl font-bold text-cream">
              Informações
            </h3>
            <div className="space-y-4 text-gold-pale">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="mt-1 text-gold" />
                <div>
                  <p className="font-semibold text-cream">Endereço</p>
                  <a
                    href={mapsSearchUrl(restaurant.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-gold"
                  >
                    {restaurant.address}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={20} className="mt-1 text-gold" />
                <div>
                  <p className="font-semibold text-cream">Horário</p>
                  <p>{restaurant.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MessageCircle size={20} className="mt-1 text-green-500" />
                <div>
                  <p className="font-semibold text-cream">WhatsApp — Luis</p>
                  <p>{restaurant.phone}</p>
                </div>
              </div>
              {restaurant.whatsappSandra && (
                <div className="flex items-start gap-3">
                  <MessageCircle size={20} className="mt-1 text-green-500" />
                  <div>
                    <p className="font-semibold text-cream">
                      WhatsApp — Sandra
                    </p>
                    <p>(47) 99613-9382</p>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-3">
                <span className="mt-1 text-pink-400">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <div>
                  <p className="font-semibold text-cream">Instagram</p>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition hover:text-gold"
                  >
                    {restaurant.instagram}
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={`https://wa.me/${restaurant.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp flex-1 justify-center text-center text-sm"
              >
                <MessageCircle size={16} />
                Luis
              </a>
              <a
                href={mapsSearchUrl(restaurant.address)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold flex-1 justify-center text-center text-sm"
              >
                <MapPin size={16} />
                Ver no mapa
              </a>
              {restaurant.whatsappSandra && (
                <a
                  href={`https://wa.me/${restaurant.whatsappSandra}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp flex-1 justify-center text-center text-sm"
                >
                  <MessageCircle size={16} />
                  Sandra
                </a>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gold/20 bg-wood p-6">
            <h3 className="mb-4 text-xl font-bold text-cream">
              Envie uma mensagem
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="contact-name"
                  className="mb-2 block text-sm font-medium text-gold-pale"
                >
                  Nome
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="search-input w-full rounded-lg border border-gold/25 bg-char px-4 py-2 text-cream focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="contact-message"
                  className="mb-2 block text-sm font-medium text-gold-pale"
                >
                  Mensagem
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  className="search-input w-full rounded-lg border border-gold/25 bg-char px-4 py-2 text-cream focus:outline-none"
                />
              </div>
              <button type="submit" className="btn-whatsapp w-full">
                <Send size={16} />
                Enviar pelo WhatsApp
              </button>
            </form>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-2xl border border-gold/20 shadow-lg">
          <iframe
            src={mapsEmbedUrl(restaurant.address)}
            title="Localização da Foodlink — Rua Hercílio Luz, 325, Brusque"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}