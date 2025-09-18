import Hero from "@/components/marketing/Hero";
import Logos from "@/components/marketing/Logos";
import Features from "@/components/marketing/Features";
import Testimonials from "@/components/marketing/Testimonials";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import CTA from "@/components/marketing/CTA";

export default function Index() {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <Logos />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}
