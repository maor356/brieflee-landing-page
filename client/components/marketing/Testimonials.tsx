const TESTIMONIALS = [
  {
    name: "Sarah Van den Broeck",
    role: "Partner, Antwerp litigation boutique",
    quote:
      "Brieflee halveerde onze zoektijd en verhoogde de kwaliteit van onze conclusies met preciezere verwijzingen.",
  },
  {
    name: "Mehdi El Arbi",
    role: "Associate, Brussel (cassatie en strafrecht)",
    quote:
      "De citator en filters per rechtscollege zijn bijzonder accuraat. Ik vind sneller de juiste arresten en kan ze meteen verifiëren.",
  },
  {
    name: "Lotte Peeters",
    role: "Advocaat, Leuven solo practice",
    quote:
      "Voor deze prijs bestaat er niets vergelijkbaars. De draft-assistent met directe verwijzingen is een game changer.",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="container py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Trusted by modern legal teams</h2>
        <p className="mt-3 text-muted-foreground">From solos to Am Law firms, lawyers rely on Brieflee for fast, reliable research.</p>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name} className="rounded-xl border p-6">
            <blockquote className="text-sm leading-relaxed">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm text-muted-foreground">{t.name} • {t.role}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
