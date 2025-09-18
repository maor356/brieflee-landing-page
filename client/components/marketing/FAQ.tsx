import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQS = [
  {
    q: "What types of legal sources can I search with this tool?",
    a: "You can search across Belgian court decisions as well as articles of law — and even see how they connect. This allows you to understand both the rule and how it’s been applied in real cases.",
  },
  {
    q: "Is the platform available in both French and Dutch?",
    a: "Yes. We support legal texts and case law in both official languages.",
  },
  {
    q: "How accurate is the search and drafting assistant?",
    a: "Our AI is trained on real Belgian court rulings. It retrieves actual legal language and precedent — not general AI content — so your work is grounded in how courts have reasoned and ruled.",
  },
  {
    q: "Will my legal searches or documents be stored?",
    a: "No. Your data stays private. We make sure that your data is encrypted and only available to yourself and the people you choose to share it with.",
  },
  {
    q: "Who is this platform for?",
    a: "Practicing lawyers, legal assistants, researchers, and anyone working with Belgian law. No technical skills needed — if you can draft a memo, you can use this tool.",
  },
  {
    q: "How is this different from traditional legal databases or search tools?",
    a: "Unlike keyword-based databases, our tool understands the legal context and retrieves court decisions based on meaning — not just matching words. It’s built to help you find what matters, faster.",
  },
  {
    q: "How do you ensure that your legal data is up to date?",
    a: "We regularly sync with official public sources and update our database as new decisions are made available.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="container py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl">Questions, answered</h2>
        <p className="mt-3 text-muted-foreground">Everything you need to know about Brieflee.</p>
      </div>
      <div className="mx-auto mt-10 max-w-2xl">
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, idx) => (
            <AccordionItem value={`item-${idx}`} key={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
