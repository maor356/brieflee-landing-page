import { useEffect } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LucideIcon,
  Activity,
  Bot,
  Bug,
  Database,
  KeySquare,
  Layers,
  Lock,
  RefreshCcw,
  ShieldCheck,
  Trash2,
  Upload,
  Server,
} from "lucide-react";

const PAGE_TITLE = "Security & Privacy | Brieflee";
const PAGE_DESCRIPTION =
  "How Brieflee protects legal data using AWS infrastructure, Azure OpenAI, encryption, access controls, and operational safeguards.";

const QUICK_FACTS = [
  { title: "Hosting", detail: "AWS EC2 (France / Paris region)" },
  { title: "Database", detail: "Self-hosted MongoDB on AWS EC2" },
  { title: "Storage", detail: "Amazon S3 — public court decision PDFs and private user documents" },
  { title: "AI Processing", detail: "Azure OpenAI (LLM services)" },
  { title: "Encryption", detail: "HTTPS enforced in transit, encryption at rest enabled" },
  { title: "Backups", detail: "Regular backups in place" },
] as const;

const AZURE_OPENAI_DATA_PRIVACY_URL =
  "https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-ai/openai/data-privacy" as const;

type Control = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const SECURITY_CONTROLS: Control[] = [
  {
    title: "Authentication",
    description:
      "Brieflee requires authenticated access to use the application. Only signed-in users can view private workspaces and projects. Two-factor authentication is planned for additional account protection.",
    icon: ShieldCheck,
  },
  {
    title: "Access control",
    description:
      "Access to projects and documents is enforced at the application layer. Users only see data within their workspace, and administrative access stays restricted to authorized personnel.",
    icon: KeySquare,
  },
  {
    title: "Data isolation",
    description:
      "Private user documents live in private S3 buckets with authorized requests. Public court decision PDFs are stored separately so customer uploads are not mixed with public data, reducing exposure.",
    icon: Layers,
  },
  {
    title: "Encryption in transit",
    description:
      "All network traffic is served over HTTPS. Connections are encrypted end-to-end during transfer to keep client and server communications protected in transit.",
    icon: Lock,
  },
  {
    title: "Encryption at rest",
    description:
      "Stored data is encrypted at rest using cloud-provider managed encryption. This applies to S3 documents as well as MongoDB application data hosted on AWS.",
    icon: Database,
  },
  {
    title: "Backups & recovery",
    description:
      "Regular backups are in place to support recovery from accidental deletion, corruption, or infrastructure failure. Restore procedures are verified as part of operations.",
    icon: RefreshCcw,
  },
  {
    title: "Monitoring & logging",
    description:
      "We monitor service health and error conditions to maintain reliability. Operational logs support troubleshooting and help detect anomalies across the platform.",
    icon: Activity,
  },
  {
    title: "Vulnerability management",
    description:
      "Dependencies are kept current, security patches are applied as needed, and changes are reviewed prior to deployment so our baseline steadily improves.",
    icon: Bug,
  },
];

const AI_BULLETS = [
  "Brieflee does not use customer inputs, outputs, or uploaded documents to train public or shared AI models.",
  "We ensure AI-powered features are only triggered by explicit user actions.",
  "We process only the minimum text and context required to fulfill a specific request.",
  "Brieflee does not intentionally send direct personal identifiers (such as names or email addresses) to language models.",
] as const;

type AiFaqItem = {
  question: string;
  answer: ReactNode;
};

const AI_FAQ: AiFaqItem[] = [
  {
    question: "Is personal data sent to AI models?",
    answer:
      "Brieflee is designed to minimize personal data exposure. We do not intentionally send direct personal identifiers, and only the data required to fulfill a user request is processed.",
  },
  {
    question: "Is our data used to train AI models?",
    answer: "No. Brieflee does not use customer data to train public or shared AI models.",
  },
  {
    question: "Do you store prompts and outputs?",
    answer:
      "We store application data needed to provide the feature and project history. Retained content is minimized where possible.",
  },
  {
    question: "Where is AI processing performed?",
    answer: "AI requests are processed using Azure OpenAI services within Microsoft’s cloud infrastructure.",
  },
  {
    question: "Can we request data deletion?",
    answer: "Yes. We support deletion requests for customer data according to our policies.",
  },
];

type LifecycleStep = {
  title: string;
  detail: string;
  icon: LucideIcon;
};

const DATA_LIFECYCLE: LifecycleStep[] = [
  { title: "Collect", detail: "User uploads & inputs", icon: Upload },
  { title: "Store", detail: "Private S3 + MongoDB", icon: Server },
  { title: "Process", detail: "Search, retrieval & AI via Azure OpenAI", icon: Bot },
  { title: "Delete", detail: "User deletion + admin requests", icon: Trash2 },
];

type RoadmapStatus = "In progress" | "Planned" | "Available";

const ROADMAP: { title: string; status: RoadmapStatus }[] = [
  { title: "ISO 27001 readiness program", status: "In progress" },
  { title: "DPA & subprocessors documentation", status: "Planned" },
  { title: "Audit logs for project activity", status: "Planned" },
  { title: "Single sign-on (SSO)", status: "Planned" },
  { title: "Penetration testing", status: "Planned" },
];

export default function Security() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = PAGE_TITLE;
      const existingDescription = document.head.querySelector("meta[name='description']");
      if (existingDescription) {
        existingDescription.setAttribute("content", PAGE_DESCRIPTION);
      } else {
        const meta = document.createElement("meta");
        meta.name = "description";
        meta.content = PAGE_DESCRIPTION;
        document.head.appendChild(meta);
      }
    }
  }, []);

  return (
    <div className="bg-background text-foreground">
      <section className="container py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-4">
          <Badge
            variant="secondary"
            className="w-fit gap-2 rounded-full px-4 py-1 text-xs font-medium tracking-tight"
          >
            <ShieldCheck className="h-4 w-4" />
            Security &amp; Privacy
          </Badge>
          <h1 className="font-serif text-4xl md:text-5xl">Security &amp; Privacy</h1>
          <p className="text-lg text-muted-foreground">
            Brieflee is built for legal professionals. We protect your data using modern cloud infrastructure and practical security safeguards.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-20 border-t">
        <div className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl">Security controls</h2>
            <p className="mt-2 text-muted-foreground">
              Practical safeguards that keep customer workspaces private and dependable.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {SECURITY_CONTROLS.map((control) => (
              <Card key={control.title} className="h-full border-muted">
                <CardContent className="space-y-3 p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <control.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{control.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{control.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12 md:py-16 border-t">
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl">Quick facts</h2>
            <p className="mt-2 text-muted-foreground">Infrastructure and storage choices at a glance.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {QUICK_FACTS.map((item) => (
              <Card key={item.title} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">{item.detail}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20 border-t">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h2 className="font-serif text-3xl">Anonymity &amp; AI data minimization</h2>
              <p className="mt-2 text-muted-foreground">
                AI workflows follow the same privacy expectations as the rest of the product, emphasizing anonymity and minimizing the data shared with language models.
              </p>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {AI_BULLETS.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              For additional information on how Azure OpenAI processes data within Microsoft’s cloud environment, see the{' '}
              <a
                href={AZURE_OPENAI_DATA_PRIVACY_URL}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline-offset-4 hover:underline"
              >
                official Azure OpenAI data privacy documentation
              </a>
              .
            </p>
            <Card className="border-primary/30 bg-primary/5">
              <CardHeader className="space-y-2">
                <CardTitle className="text-base font-semibold">Private AI processing via Azure OpenAI</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Brieflee uses Azure OpenAI for AI-powered features. AI requests are processed within Azure’s cloud environment and are not used to train public or shared models. Brieflee is designed to minimize data exposure and limit processing to what is necessary for each feature. Learn more in Microsoft’s{' '}
                  <a
                    href={AZURE_OPENAI_DATA_PRIVACY_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    Azure OpenAI data privacy documentation
                  </a>
                  .
                </p>
              </CardHeader>
            </Card>
          </div>
          <div>
            <Accordion type="single" collapsible className="rounded-2xl border bg-card/70">
              {AI_FAQ.map((item) => (
                <AccordionItem key={item.question} value={item.question} className="px-6">
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20 border-t">
        <div className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl">Data lifecycle</h2>
            <p className="mt-2 text-muted-foreground">
              Every stage—from collection to deletion—follows consistent handling expectations.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {DATA_LIFECYCLE.map((step) => (
              <Card key={step.title} className="h-full border-muted">
                <CardContent className="space-y-3 p-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20 border-t">
        <div className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="font-serif text-3xl">Security roadmap</h2>
            <p className="mt-2 text-muted-foreground">Upcoming initiatives that deepen safeguards over time.</p>
          </div>
          <div className="space-y-4">
            {ROADMAP.map((item) => (
              <Card key={item.title} className="border-muted">
                <CardContent className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">Status: {item.status}</p>
                  </div>
                  <Badge
                    variant={item.status === "In progress" ? "secondary" : item.status === "Available" ? "default" : "outline"}
                    className="w-fit"
                  >
                    {item.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Roadmap items represent current goals and may evolve as the platform matures.
          </p>
        </div>
      </section>

      <section className="container py-16 md:py-20 border-t">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl">Security contact</h2>
          <p className="text-muted-foreground">
            If you believe you’ve found a security issue, please contact us responsibly so we can investigate and address it quickly.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="mailto:support@brieflee.be"
            >
              support@brieflee.be
            </a>
            <Link to="/privacy" className="text-muted-foreground underline-offset-4 hover:underline">
              Privacy policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
