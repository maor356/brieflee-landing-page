import { BookOpen, Bookmark, FileText, Languages, LibraryBig, Network } from "lucide-react";

const FEATURES = [
  {
    icon: <Languages className="h-5 w-5" />,
    title: "Natural-language search",
    desc: "Ask questions in French or Dutch and get on-point Belgian court decisions with direct source links and plain-language snippets.",
  },
  {
    icon: <Network className="h-5 w-5" />,
    title: "Belgian courts & filters",
    desc: "Search across the Court of Cassation, courts of appeal, and tribunals; refine by court, year, language, and keywords.",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Answers with citations",
    desc: "Brieflee explains what matters and anchors every statement to the underlying decision or article of law so you can verify before you cite.",
  },
  {
    icon: <LibraryBig className="h-5 w-5" />,
    title: "Similar decisions",
    desc: "Each case page suggests closely related decisions based on summaries and keywords to help you broaden or confirm your research.",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Articles of law (linked)",
    desc: "See the articles cited in a decision (from Justel) with quick links and cross-references to other relevant cases.",
  },
  {
    icon: <Bookmark className="h-5 w-5" />,
    title: "Save & organize",
    desc: "Save decisions to folders by matter so you can come back to key authorities when drafting.",
  },
];

export default function Features() {
  return (
    <section id="features" className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Research that keeps up with your practice</h2>
        <p className="mt-3 text-muted-foreground">Designed for litigators and transactional attorneys who need speed, accuracy, and trustworthy citations.</p>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-xl border p-6">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
              {f.icon}
            </div>
            <h3 className="mt-4 text-lg font-medium">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
