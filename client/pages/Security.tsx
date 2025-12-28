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
  "Brieflee keeps legal work private with EU hosting, GDPR-aligned safeguards, and Azure OpenAI processing that respects professional secrecy.";

const TRUST_SIGNALS = [
  "Data hosted in the EU (Paris)",
  "GDPR-aligned by design",
  "AI processing via Azure OpenAI",
  "ISO 27001 — in progress",
] as const;

type LegalFearItem = {
  title: string;
  detail: string;
};

const LEGAL_FEAR_ITEMS: LegalFearItem[] = [
  {
    title: "Violating client confidentiality (professional secrecy)",
    detail:
      "Client materials stay inside your private workspace. Access is limited to your team, and data is never repurposed for AI training or shared outside your matters.",
  },
  {
    title: "My data being used to train AI models",
    detail:
      "Brieflee does not use customer inputs or outputs to train public or shared AI models. Azure OpenAI only processes the text you submit for the action you trigger.",
  },
  {
    title: "GDPR or regulatory exposure",
    detail:
      "Infrastructure stays in the EU with clearly defined purposes. Data exports and deletions are available on request so you can demonstrate diligence to clients and regulators.",
  },
  {
    title: "Unauthorized access to my work",
    detail:
      "Workspaces are logically isolated, role-based access keeps projects limited to invited members, and operational logging helps detect suspicious behavior.",
  },
  {
    title: "Opposing counsel accessing my research",
    detail:
      "There is no public content pool. Only authenticated users you invite can view your workspace, keeping drafts and strategies out of opposing counsel’s reach.",
  },
];

type SimpleFaqItem = {
  question: string;
  answer: string;
};

const SIMPLE_FAQ: SimpleFaqItem[] = [
  {
    question: "Can Brieflee see my client files?",
    answer:
      "Only you and teammates you invite can view your files. Support staff access happens solely when you request help with a specific matter.",
  },
  {
    question: "Is my data used to train AI models?",
    answer:
      "No. Customer data is not used to train public or shared AI models, and AI features run only when you initiate them.",
  },
  {
    question: "Where is my data stored?",
    answer:
      "Services run on AWS infrastructure in Paris (eu-west-3) with private storage for user uploads and a separate store for public legal sources.",
  },
  {
    question: "Who can access my data?",
    answer:
      "Only authenticated users inside your workspace can access it. Administrative access is limited and logged.",
  },
  {
    question: "Is this compatible with my professional secrecy obligations?",
    answer:
      "Brieflee is designed for Belgian lawyers, emphasizing confidentiality, GDPR alignment, and contractual support for professional secrecy duties.",
  },
];

const QUICK_FACTS = [
  { title: "Hosting", detail: "AWS EC2 (France / Paris region)" },
  { title: "Database", detail: "Self-hosted MongoDB on AWS EC2" },
  {
    title: "Storage",
    detail: "Amazon S3 — public court decision PDFs and private user documents",
  },
  { title: "AI Processing", detail: "Azure OpenAI (LLM services)" },
  {
    title: "Encryption",
    detail: "HTTPS enforced in transit, encryption at rest enabled",
  },
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
  "We do not send personal identifiers to AI models.",
  "Your data is not used to train public or shared models.",
  "AI features only run when you explicitly use them.",
  "We only send the minimum text needed for the action you request.",
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
    answer:
      "No. Brieflee does not use customer data to train public or shared AI models.",
  },
  {
    question: "Do you store prompts and outputs?",
    answer:
      "We store application data needed to provide the feature and project history. Retained content is minimized where possible.",
  },
  {
    question: "Where is AI processing performed?",
    answer:
      "AI requests are processed using Azure OpenAI services within Microsoft’s cloud infrastructure.",
  },
  {
    question: "Can we request data deletion?",
    answer:
      "Yes. We support deletion requests for customer data according to our policies.",
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
  {
    title: "Process",
    detail: "Search, retrieval & AI via Azure OpenAI",
    icon: Bot,
  },
  { title: "Delete", detail: "User deletion + admin requests", icon: Trash2 },
];

type RoadmapStatus = "In progress" | "Planned" | "Available";

const ROADMAP: { title: string; status: RoadmapStatus; description: string }[] =
  [
    {
      title: "ISO 27001",
      status: "In progress",
      description:
        "Formalizing our information security management system and supporting documentation.",
    },
    {
      title: "Two-factor authentication (2FA)",
      status: "Planned",
      description:
        "Adding an optional second factor during sign-in for extra account protection.",
    },
    {
      title: "Audit logs",
      status: "Planned",
      description:
        "Detailed workspace activity logs to support compliance reviews and investigations.",
    },
    {
      title: "DPA & subprocessors documentation",
      status: "Planned",
      description:
        "Customer-ready documentation that lists subprocessors and standard DPA commitments.",
    },
    {
      title: "Single sign-on (SSO)",
      status: "Planned",
      description:
        "Support for identity providers so firms can control access centrally.",
    },
  ];

export default function Security() {
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = PAGE_TITLE;
      const existingDescription = document.head.querySelector(
        "meta[name='description']",
      );
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
        <div className="mx-auto flex max-w-4xl flex-col gap-6">
          <Badge
            variant="secondary"
            className="w-fit gap-2 rounded-full px-4 py-1 text-xs font-medium tracking-tight"
          >
            <ShieldCheck className="h-4 w-4" />
            Security for lawyers
          </Badge>
          <div className="space-y-4">
            <h1 className="font-serif text-4xl md:text-5xl">
              Built for professional secrecy.
            </h1>
            <p className="text-lg text-muted-foreground">
              Brieflee lets lawyers use AI without risking client
              confidentiality, bar compliance, or GDPR exposure.
            </p>
          </div>
          <div className="grid gap-3 text-sm font-semibold text-muted-foreground sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_SIGNALS.map((signal) => (
              <div
                key={signal}
                className="rounded-xl border border-dashed border-muted bg-card/30 px-4 py-3"
              >
                {signal}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container border-t py-16 md:py-20">
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-serif text-3xl">What this protects you from</h2>
            <p className="text-muted-foreground">
              Each point pairs a concern with the safeguard in place.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {LEGAL_FEAR_ITEMS.map((item) => (
              <Card key={item.title} className="h-full border-muted">
                <CardContent className="space-y-2 p-6">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container border-t py-16 md:py-20">
        <div className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-serif text-3xl">Questions lawyers ask us</h2>
            <p className="text-muted-foreground">
              Short answers to the most common questions.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {SIMPLE_FAQ.map((item) => (
              <Card key={item.question} className="h-full border-muted">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 text-sm text-muted-foreground">
                  {item.answer}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t bg-primary/5 py-10">
        <div className="container text-center">
          <p className="text-base font-semibold text-primary">
            Brieflee is designed to respect professional secrecy obligations
            under Belgian law (beroepsgeheim / secret professionnel).
          </p>
        </div>
      </section>

      <section className="container border-t py-16 md:py-20">
        <div className="space-y-6">
          <div className="max-w-3xl space-y-2">
            <h2 className="font-serif text-3xl">What we’re improving next</h2>
            <p className="text-muted-foreground">
              Upcoming items that make Brieflee even safer for legal work.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {ROADMAP.map((item) => (
              <Card
                key={item.title}
                className="h-full border-primary/30 bg-primary/5"
              >
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-4">
                    <p className="font-semibold">{item.title}</p>
                    <Badge
                      variant={
                        item.status === "In progress"
                          ? "secondary"
                          : item.status === "Available"
                            ? "default"
                            : "outline"
                      }
                      className="whitespace-nowrap"
                    >
                      {item.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            Roadmap items represent current goals and may evolve as the platform
            matures.
          </p>
        </div>
      </section>

      <section className="border-t bg-muted/30">
        <div className="container space-y-16 py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="text-muted-foreground">
              Details for firms that need to review the controls behind
              Brieflee.
            </p>
          </div>

          <div className="space-y-16">
            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <h2 className="font-serif text-3xl">
                  Who can access your workspace
                </h2>
                <p className="text-muted-foreground">
                  Safeguards that keep matters limited to authorized people.
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
                        <h4 className="text-base font-semibold">
                          {control.title}
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {control.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="max-w-2xl space-y-2">
                <h2 className="font-serif text-3xl">
                  Where your data is stored
                </h2>
                <p className="text-muted-foreground">
                  Infrastructure and storage choices at a glance.
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {QUICK_FACTS.map((item) => (
                  <Card key={item.title} className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base font-semibold">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 text-sm text-muted-foreground">
                      {item.detail}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <h2 className="font-serif text-3xl">
                  How AI is used — and what is (not) shared
                </h2>
                <p className="text-muted-foreground">
                  AI features follow the same privacy rules as the rest of
                  Brieflee and only process what you ask them to.
                </p>
              </div>
              <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
                <div className="space-y-5">
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {AI_BULLETS.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span
                          className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-primary"
                          aria-hidden
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-muted-foreground">
                    For additional information on how Azure OpenAI processes
                    data within Microsoft’s cloud environment, see the{" "}
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
                </div>
                <div>
                  <Accordion
                    type="single"
                    collapsible
                    className="rounded-2xl border bg-card/70"
                  >
                    {AI_FAQ.map((item) => (
                      <AccordionItem
                        key={item.question}
                        value={item.question}
                        className="px-6"
                      >
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
            </div>

            <div className="space-y-4">
              <div className="max-w-3xl space-y-2">
                <h2 className="font-serif text-3xl">
                  Where AI processing happens
                </h2>
                <p className="text-muted-foreground">
                  Brieflee uses Azure OpenAI for AI-powered features. AI
                  requests are processed within Azure’s cloud environment and
                  are not used to train public or shared models. Brieflee is
                  designed to minimize data exposure and limit processing to
                  what is necessary for each feature.
                </p>
              </div>
              <Card className="border-primary/30 bg-primary/5">
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base font-semibold">
                    Private AI processing via Azure OpenAI
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Learn more in Microsoft’s{" "}
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

            <div className="space-y-6">
              <div className="max-w-3xl space-y-2">
                <h2 className="font-serif text-3xl">Backups and recovery</h2>
                <p className="text-muted-foreground">
                  Regular backups, health monitoring, and a clearly defined data
                  lifecycle keep the service dependable even when things go
                  wrong.
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
                        <h4 className="text-base font-semibold">
                          {step.title}
                        </h4>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {step.detail}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="max-w-3xl space-y-2">
                <h2 className="font-serif text-3xl">
                  Monitoring and reliability
                </h2>
                <p className="text-sm text-muted-foreground">
                  Every stage—from collection to deletion—follows consistent
                  handling expectations so issues are detected and addressed
                  quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container border-t py-16 md:py-20">
        <div className="max-w-2xl space-y-4">
          <h2 className="font-serif text-3xl">Security contact</h2>
          <p className="text-muted-foreground">
            If you believe you’ve found a security issue, please contact us
            responsibly so we can investigate and address it quickly.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm font-medium">
            <a
              className="text-primary underline-offset-4 hover:underline"
              href="mailto:support@brieflee.be"
            >
              support@brieflee.be
            </a>
            <Link
              to="/privacy"
              className="text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy policy
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
