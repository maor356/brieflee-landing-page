import { FormEvent } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";

const CONTACT_METHODS = [
  {
    icon: Mail,
    heading: "Email",
    detail: "support@brieflee.be",
    link: "mailto:support@brieflee.be",
  },
  {
    icon: Phone,
    heading: "Phone",
    detail: "+32 470 12 12 68",
    link: "tel:+32470121268",
  },
  {
    icon: MapPin,
    heading: "Office",
    detail: "Charlottalei 58, 2018 Antwerpen",
  },
  {
    icon: Clock,
    heading: "Hours",
    detail: "Monday – Friday, 09:00 – 18:00 CET",
  },
] satisfies Array<{ icon: LucideIcon; heading: string; detail: string; link?: string }>;

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const rawName = formData.get("name");
    const trimmedName = typeof rawName === "string" ? rawName.trim() : "";
    const salutation = trimmedName ? `, ${trimmedName}` : "";

    toast({
      title: "Message sent",
      description: `Thanks${salutation}. We'll reply within one business day.`,
    });

    form.reset();
  };

  return (
    <div className="bg-background text-foreground">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-4xl md:text-5xl">Contact Brieflee</h1>
          <p className="mt-3 text-muted-foreground">
            We work with Belgian legal teams that need reliable research, fast. Share a few details and we'll schedule a tailored walkthrough.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr,1.1fr]">
          <Card className="border bg-card">
            <CardHeader>
              <CardTitle>Let's talk</CardTitle>
              <CardDescription>Tell us about your practice so we can tailor the demo.</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" name="name" placeholder="Marie Peeters" required autoComplete="name" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Work email</Label>
                  <Input id="email" name="email" type="email" placeholder="you@firm.be" required autoComplete="email" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="organisation">Firm or organisation</Label>
                  <Input id="organisation" name="organisation" placeholder="Peeters & Co" autoComplete="organization" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">How can we help?</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Share anything specific you'd like to see in the demo."
                    rows={5}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Submit</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border bg-card">
              <CardHeader>
                <CardTitle>Talk to a specialist</CardTitle>
                <CardDescription>We'll connect you with the right person on the Brieflee team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {CONTACT_METHODS.map(({ icon: Icon, heading, detail, link }) => (
                  <div key={heading} className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium">{heading}</p>
                      {link ? (
                        <a href={link} className="text-sm text-muted-foreground hover:text-foreground">
                          {detail}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{detail}</p>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border bg-card">
              <CardHeader>
                <CardTitle>What to expect</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>✔ A live walkthrough of how Brieflee surfaces the right precedent in seconds.</p>
                <p>✔ Discussion around onboarding, pricing, and data security.</p>
                <p>✔ Follow-up notes with links to all sources referenced in the demo.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
