import { useState } from "react";
import { Search, Bookmark, BookmarkCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseItem {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: number;
  summary: string;
  tags: string[];
}

const SAMPLE_CASES: CaseItem[] = [
  {
    id: "1",
    title: "Cour de cassation, 14 septembre 2023 — TVA",
    citation: "C.22.0451.F",
    court: "Cour de cassation (FR)",
    year: 2023,
    summary:
      "Le non-respect du delai de reclamation TVA ne prive pas l'assujetti du droit a deduction si la bonne foi est prouvee et que l'administration n'est pas lesee.",
    tags: ["TVA", "droit fiscal", "bonne foi"],
  },
  {
    id: "2",
    title: "Hof van Cassatie, 3 mei 2024 — Btw-carrousel",
    citation: "C.23.0345.N",
    court: "Hof van Cassatie",
    year: 2024,
    summary:
      "De belastingplichtige die redelijke controles uitvoert, kan niet aansprakelijk worden gesteld voor een btw-carrousel veroorzaakt door een leverancier.",
    tags: ["btw", "economische fraude", "controleplicht"],
  },
  {
    id: "3",
    title: "Arbeidshof Brussel, 21 juni 2023 — Ontslag om dringende reden",
    citation: "AR 2022/AB/347",
    court: "Arbeidshof Brussel",
    year: 2023,
    summary:
      "Een werkgever moet binnen drie werkdagen na vaststelling van de feiten het ontslag om dringende reden motiveren om geldig te zijn.",
    tags: ["arbeidsrecht", "ontslag", "procedure"],
  },
  {
    id: "4",
    title: "Tribunal de l'entreprise Bruxelles, 5 fevrier 2024 — Responsabilite d'administrateur",
    citation: "A/24/4587",
    court: "Tribunal de l'entreprise Bruxelles",
    year: 2024,
    summary:
      "L'administrateur qui omet de deposer les comptes annuels malgre avertissements engage sa responsabilite sur base de l'article 2:56 CSA.",
    tags: ["CSA", "responsabilite", "comptes annuels"],
  },
  {
    id: "5",
    title: "Ondernemingsrechtbank Antwerpen, 12 januari 2024 — Voorlopige maatregelen",
    citation: "A/23/1954",
    court: "Ondernemingsrechtbank Antwerpen",
    year: 2024,
    summary:
      "Een niet-concurrentiebeding kan voorlopig worden afgedwongen wanneer er duidelijke aanwijzingen zijn van schending en ernstige schade voor de onderneming.",
    tags: ["niet-concurrentie", "voorlopige maatregel", "ondernemingsrecht"],
  },
];

export default function DemoSearch() {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => new Set());

  const toggleSaved = (id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const results = SAMPLE_CASES;

  return (
    <div className="rounded-xl border bg-white shadow-sm">
      <div className="p-4 md:p-6">
        <div className="relative rounded-md border bg-background py-3 pl-10 pr-4 text-sm text-foreground">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          Hoe voorkomt een btw-plichtige aansprakelijkheid bij een vermoedelijke btw-carrousel?
        </div>

        <div className="mt-6 space-y-3">
          {results.map((item) => {
            const isSaved = savedIds.has(item.id);
            return (
              <article key={item.id} className="rounded-lg border p-4 hover:bg-secondary/50 transition-colors">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="space-y-1">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.citation}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => toggleSaved(item.id)}
                      className={cn(
                        "inline-flex h-8 w-8 items-center justify-center rounded-md border transition-colors",
                        isSaved ? "bg-primary text-primary-foreground border-primary" : "bg-secondary text-foreground"
                      )}
                      aria-pressed={isSaved}
                      aria-label={isSaved ? `Remove ${item.title} from saved` : `Save ${item.title}`}
                    >
                      {isSaved ? <BookmarkCheck className="h-4 w-4" /> : <Bookmark className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-sm">{item.summary}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.tags.map((t) => (
                    <span key={t} className="inline-flex items-center rounded-full bg-accent px-2.5 py-0.5 text-xs text-accent-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            );
          })}

          {results.length === 0 && (
            <div className="text-sm text-muted-foreground">No results. Try a broader query or switch jurisdiction.</div>
          )}
        </div>
      </div>
      <div className="border-t bg-secondary/40 px-4 py-3 text-xs text-muted-foreground">
        Resultaten illustreren hoe Brieflee arresten en Justel-artikels koppelt. Controleer altijd de officiële bron (Justel, Juridat) voor gebruik in een dossier.
      </div>
    </div>
  );
}
