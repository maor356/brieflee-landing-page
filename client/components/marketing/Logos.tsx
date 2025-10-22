export default function Logos() {
  const logos = ["OpenAI", "Claude", "Azure", "Google Cloud"];
  return (
    <section aria-label="Powered by" className="py-8">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          <span className="uppercase tracking-wider">Powered by</span>
          {logos.map((l) => (
            <span key={l} className="rounded-md border bg-secondary px-3 py-1">{l}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
