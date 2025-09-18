import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section id="cta" className="relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-primary/5 via-transparent to-accent/20" />
      <div className="container py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-8 text-center shadow-sm">
          <h3 className="font-serif text-2xl md:text-3xl">Research smarter. Win more.</h3>
          <p className="mt-2 text-muted-foreground">Join thousands of attorneys accelerating their legal research with Brieflee.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <a href="https://brieflee.fillout.com/waitinglist" target="_blank" rel="noreferrer">
                Join waiting list
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/contact">Contact sales</a>
            </Button>
          </div>
          <p className="sr-only">Contact sales</p>
        </div>
      </div>
    </section>
  );
}
