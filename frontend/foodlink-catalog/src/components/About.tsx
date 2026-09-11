import { CheckCircle2, Clock, Flame, Smile, Trophy } from "lucide-react";

const STATS = [
  { icon: Flame, value: "100%", label: "Feito na hora" },
  { icon: Smile, value: "1000+", label: "Clientes felizes" },
  { icon: Clock, value: "30min", label: "Tempo médio" },
  { icon: Trophy, value: "5★", label: "Avaliações" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display mb-4 text-3xl text-cream">
            Sobre o Foodlink
          </h2>
          <p className="mb-4 text-gold-pale">
            Frango assado, temperado do jeito da casa e servido com maionese e
            farofa fresquinhas — o combo que virou marca registrada do bairro.
          </p>
          <p className="mb-4 text-gold-pale">
            Da garagem para a mesa da sua família, com ingredientes de
            qualidade e aquele sabor de comida feita com carinho.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-cream">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-gold" />
              Assado na hora
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-gold" />
              Entrega rápida
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-gold" />
              Preço justo
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-gold/20 bg-wood p-6 text-center"
            >
              <stat.icon size={36} className="mx-auto mb-2 text-gold" />
              <p className="font-display text-2xl text-cream">{stat.value}</p>
              <p className="text-gold-pale">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}