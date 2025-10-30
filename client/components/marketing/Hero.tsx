import { Button } from "@/components/ui/button";
import DemoSearch from "./DemoSearch";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-secondary/40" />
      <div className="container py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold tracking-wide text-primary/70">Legal research, reimagined</p>
            <h1 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-serif leading-tight">
              Find the right precedent in seconds
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Brieflee is an AI-powered research assistant for lawyers. Search case law, statutes, and secondary sources with natural language, get reliable citations, and draft arguments backed by authority.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <a href="https://brieflee.fillout.com/waitinglist" target="_blank" rel="noreferrer">
                  Book a demo
                </a>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <a href="#features">See how it works</a>
              </Button>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">Early access spots are limited • Apply in under two minutes</div>
          </div>
          <div className="hidden md:block">
            <DemoSearch />
          </div>
        </div>
      </div>
    </section>
  );
}
