import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LEADERS = [
  {
    name: "Shahar Zeplovitch",
    role: "Co-CTO",
    bio:
      "Lead Engineer at LinkedIn (Video), previously Google (Google Cloud Platform), and Capital One. Shipped large‑scale media and platform features; strengths include front‑end performance, full‑stack delivery, and high‑quality UX. At Brieflee, Shachar owns application architecture and the end‑to‑end product experience.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F10f30fd3248046fd9f2ec5b9c32120c9%2F5fdfacb9f1544ce6aeb8c076385851f3?format=webp&width=800",
  },
  {
    name: "Maor Ben Zvi",
    role: "COO",
    bio:
      "Previously at Coolblue (the Netherlands’ largest e‑commerce company) in the personalization domain, focused on back‑end engineering. Former CTO of Welexit (raised €500k), responsible for product management and building the tech stack. At Brieflee, Maor runs operations, turns vision into an executable roadmap, and leads growth and founder‑led sales.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F10f30fd3248046fd9f2ec5b9c32120c9%2Ff94272187adb4a1882f0c7040d10433b?format=webp&width=800",
  },
  {
    name: "Yizhaq Kricheli",
    role: "CEO",
    bio:
      "Former lawyer and one of the youngest to found his own practice. He later led the legal department at Claim It, a European legal‑tech company automating delayed‑flight compensation. As CEO of Welexit, he raised €500,000 and onboarded a network of nearly 200 lawyers. At Brieflee he drives product vision, legal strategy, and co‑leads sales and customer onboarding.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F10f30fd3248046fd9f2ec5b9c32120c9%2F171d5dca64ce4ca4a40973669f4da9f7?format=webp&width=800",
  },
  {
    name: "Dror Zeplovitch",
    role: "Co-CTO",
    bio:
      "30+ years of software engineering experience across finance, media, and e‑commerce. Currently VP Full Stack Engineer at BNY Mellon. Prior roles include team lead at Viacom and senior engineering positions at HUBX and others. At Brieflee, Dror leads backend/data architecture, scalability, and developer productivity.",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F10f30fd3248046fd9f2ec5b9c32120c9%2F48e330eae8fd4317ab16f5deadb59574?format=webp&width=800",
  },
] as const;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function About() {
  return (
    <div className="bg-background text-foreground">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl">About Brieflee</h1>
          <p className="mt-3 text-muted-foreground">Building the fastest path from legal question to answer.</p>
        </div>
      </section>

      <section className="container py-8 md:py-12 border-y">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-primary/70">Features</h2>
            <h3 className="mt-2 font-serif text-3xl">The fastest path from legal question to answer</h3>
            <p className="mt-3 text-muted-foreground">Brieflee streamlines the hardest part of legal practice—researching and drafting—so lawyers can focus on strategy and clients.</p>
            <a
              href="https://brieflee.fillout.com/waitinglist"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Join waiting list
            </a>
          </div>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p>Our story</p>
            <p>
              Legal practice in Belgium is flooded with interruptions—hearings, calls, messages, notifications—while the core work of analysing past decisions and legislation remains slow and manual. This inefficiency drives costs up and limits capacity; meanwhile an estimated 80% of people’s legal needs go unmet because access to lawyers is constrained.
            </p>
            <p>
              Brieflee was founded in 2025 to remove that research burden. We transform raw public case law into structured, searchable intelligence so lawyers get precise results, linked sources, and organised insight in seconds. The goal: make legal research seamless and free up time for higher-value client work.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <h2 className="font-serif text-3xl md:text-4xl">Leadership</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {LEADERS.map((p) => (
            <article key={p.name} className="rounded-xl border p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 md:h-20 md:w-20">
                  {p.image && (
                    <AvatarImage src={p.image} alt={p.name} />
                  )}
                  <AvatarFallback className="text-sm font-medium">
                    {initials(p.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{p.role} - {p.name}</h3>
                </div>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{p.bio}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container py-16 md:py-20 border-t">
        <div className="space-y-16">
          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl">How It Works</h2>
              <p className="mt-3 text-muted-foreground">All our data comes from public Belgian legal sources. Raw judgments are messy and inconsistent; we clean, normalise, and structure them, then use AI to build links between decisions, articles of law, courts, dates, and ECLI identifiers.</p>
              <p className="mt-3 text-muted-foreground">The result: a research environment where relevant rulings, cited provisions, and authentic judicial language surface in seconds.</p>
              <a
                href="https://brieflee.fillout.com/waitinglist"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Join waiting list
              </a>
            </div>
            <div className="rounded-2xl border bg-card p-6 shadow-sm">
              <p className="text-sm uppercase tracking-wide text-muted-foreground">Behind the scenes</p>
              <p className="mt-3 text-base text-foreground">Brieflee continuously enriches public case law with metadata and cross-references so lawyers can move from question to insight without leaving the workspace.</p>
              <p className="mt-4 text-sm text-muted-foreground">Every output links straight back to the original source so you always remain in control of the argument.</p>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2 items-start">
            <div className="md:order-2 md:pl-10">
              <h2 className="font-serif text-3xl md:text-4xl">Privacy &amp; Security</h2>
              <p className="mt-3 text-muted-foreground md:max-w-md">Built for firms that need confidentiality guarantees. Brieflee keeps sensitive client data out of our training loops while giving teams auditable control over access.</p>
              <ul className="mt-6 space-y-2 text-sm md:max-w-md">
                <li>Every request is encrypted in transit and at rest.</li>
                <li>Only public Belgian legal sources are indexed by default.</li>
                <li>Firm-specific workspaces stay logically isolated.</li>
                <li>No retention of privileged client uploads.</li>
                <li>Granular audit trails make compliance reviews straightforward.</li>
              </ul>
            </div>
            <div className="md:order-1">
              <div className="rounded-2xl border bg-card p-6 shadow-sm">
                <p className="text-sm uppercase tracking-wide text-muted-foreground">Security posture</p>
                <p className="mt-3 text-base text-foreground">Zero-trust tooling, short-lived credentials, and EU-based infrastructure keep your lateral movement surface minimal.</p>
                <p className="mt-4 text-sm text-muted-foreground">We run automated penetration scanning and manual reviews ahead of every major release.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="container py-16 md:py-24">
        <div className="mx-auto max-w-2xl rounded-2xl border p-8 text-center">
          <h2 className="font-serif text-3xl">Join the waiting list</h2>
          <p className="mt-2 text-muted-foreground">We’ll notify you when Brieflee opens more seats.</p>
          <form className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input type="email" required placeholder="your@email.com" className="w-full sm:w-auto rounded-md border bg-background px-4 py-2 outline-none focus:ring-2 focus:ring-ring" />
            <button type="submit" className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">Request access</button>
          </form>
        </div>
      </section>
    </div>
  );
}
