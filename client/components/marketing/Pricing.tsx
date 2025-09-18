import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Pricing() {
  return (
    <section id="pricing" className="container py-20 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <div className="inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5 text-primary" /> Invitation-only
        </div>
        <h2 className="mt-3 font-serif text-3xl md:text-4xl">Early Access Program</h2>
        <p className="mt-3 text-muted-foreground">Join our Early Access Program — Help shape the future of legal research.</p>
      </div>

      <div className="mx-auto mt-10 max-w-3xl">
        <div className="rounded-2xl border p-6 md:p-8">
          <div className="grid gap-6 md:grid-cols-5 md:items-center">
            <div className="md:col-span-3">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Early access users get <strong>2 months free</strong> — no billing, no card needed.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Full product access during the program.</span>
                </li>
              </ul>
              <p className="mt-4 text-sm text-muted-foreground">
                You’ll get full access for free for the first <strong>2 months</strong>. After that, we’ll ask if you’d like to continue on our <strong>99€/mo</strong> plan — no surprise charges.
              </p>
            </div>
            <div className="md:col-span-2">
              <div className="rounded-xl border bg-card p-5 text-center">
                <div className="text-sm text-muted-foreground">After Early Access</div>
                <div className="mt-1 text-4xl font-semibold">99€<span className="text-base font-normal text-muted-foreground">/mo</span></div>
                <div className="mt-5 flex flex-col gap-2">
                  <Button size="lg" asChild>
                    <a href="https://brieflee.fillout.com/waitinglist" target="_blank" rel="noreferrer">
                      Join waiting list
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/contact">Contact us</a>
                  </Button>
                </div>
                <div className="mt-3 text-xs text-muted-foreground">No card required • Cancel anytime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
