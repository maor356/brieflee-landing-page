import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const sections = [
  {
    id: "research",
    navNumber: "01",
    label: "Research",
    title: "Smart Legal Research",
    subtitle: "Find what matters — instantly.",
    description:
      "Use natural language to search through thousands of court decisions and articles of law. Filter by topic, date, or court, and uncover relevant precedents in seconds.",
    image: "/landing-images/Search-results.png",
    gradientClass:
      "bg-[radial-gradient(70%_60%_at_50%_50%,rgba(15,23,42,0.08),transparent)]",
  },
  {
    id: "context",
    navNumber: "02",
    label: "Legal Context",
    title: "Real-time Legal Context",
    subtitle: "See the law behind every decision.",
    description:
      "Every court decision is linked directly to the articles of law it cites — no manual lookup required. Explore related rulings interpreting the same article in real time.",
    image: "/landing-images/Articles-of-law.png",
    gradientClass:
      "bg-[radial-gradient(70%_60%_at_50%_50%,rgba(68,64,60,0.08),transparent)]",
  },
  {
    id: "organize",
    navNumber: "03",
    label: "Organize",
    title: "Organize & Personalize",
    subtitle: "Your workspace, your structure.",
    description:
      "Create custom projects for each client, topic, or case. Store documents, notes, and saved articles of law — all in one place.",
    image: "/landing-images/Project-organisation.png",
    gradientClass:
      "bg-[radial-gradient(70%_60%_at_50%_50%,rgba(217,119,6,0.08),transparent)]",
  },
  {
    id: "personalisation",
    navNumber: "04",
    label: "Personalisation",
    title: "Personalised Workflows",
    subtitle: "Make every review your own.",
    description:
      "Comment on specific documents or entire projects to capture context, and validate files with a personal tag so you always know what you've already reviewed.",
    image: "/landing-images/Notes-taking.png",
    gradientClass:
      "bg-[radial-gradient(70%_60%_at_50%_50%,rgba(5,150,105,0.08),transparent)]",
  },
] as const;

type Section = (typeof sections)[number];
type SectionId = Section["id"];
type SectionRefs = Record<SectionId, HTMLElement | null>;

export default function LandingSections() {
  const [activeSection, setActiveSection] = useState<SectionId>(sections[0]?.id ?? "research");
  const sectionRefs = useRef<SectionRefs>({
    research: null,
    context: null,
    organize: null,
    personalisation: null,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as SectionId);
          }
        });
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0, 0.3, 0.6, 1],
      },
    );

    const elements = Object.values(sectionRefs.current).filter(Boolean) as HTMLElement[];
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return (
    <section className="bg-background mt-16 md:mt-20 lg:mt-32">
      <div className="mx-auto max-w-[104rem] px-6 pb-32 lg:px-12 lg:pb-40">
        <div className="space-y-0">
          {sections.map((section, index) => (
            <LandingSectionBlock
              key={section.id}
              section={section}
              isActive={activeSection === section.id}
              isFirst={index === 0}
              registerRef={(el) => {
                sectionRefs.current[section.id] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

type LandingSectionBlockProps = {
  section: Section;
  registerRef: (el: HTMLElement | null) => void;
  isActive: boolean;
  isFirst: boolean;
};

function LandingSectionBlock({ section, registerRef, isActive, isFirst }: LandingSectionBlockProps) {
  return (
    <motion.section
      id={section.id}
      ref={registerRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className={cn("relative scroll-mt-24 py-12 md:py-16 lg:py-20", isFirst && "pt-0")}
    >
      <div className="lg:grid lg:grid-cols-[minmax(0,1.7fr)_minmax(0,0.8fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
        <div className="mt-8 md:mt-10 lg:order-1 lg:mt-0 lg:-ml-10 xl:-ml-16">
          <MediaFrame
            image={section.image}
            title={section.title}
            gradientClass={section.gradientClass}
            isActive={isActive}
          />
        </div>
        <div className="mt-10 space-y-6 text-center md:mt-12 lg:mt-0 lg:order-2 lg:pl-10 lg:text-left xl:pl-14">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground/80">
            {section.label.toUpperCase()}
          </p>
          <h2
            className={cn(
              "font-serif text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl",
              !isActive && "text-foreground/70",
            )}
          >
            {section.title}
          </h2>
          <p
            className={cn(
              "text-lg font-medium text-muted-foreground",
              !isActive && "text-muted-foreground/80",
            )}
          >
            {section.subtitle}
          </p>
          <p
            className={cn(
              "mx-auto max-w-prose text-base leading-7 text-muted-foreground lg:mx-0",
              !isActive && "text-muted-foreground/80",
            )}
          >
            {section.description}
          </p>
        </div>
      </div>
    </motion.section>
  );
}

type MediaFrameProps = {
  image: string;
  title: string;
  gradientClass: string;
  isActive: boolean;
};

function MediaFrame({ image, title, gradientClass, isActive }: MediaFrameProps) {
  return (
    <div
      className={cn(
        "relative w-full transition duration-500 ease-out",
        isActive ? "scale-100 opacity-100" : "scale-[0.97] opacity-65",
      )}
    >
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-x-0 -top-12 h-64 rounded-full sm:-inset-x-12 sm:-top-14 sm:h-72 lg:-inset-x-24 lg:-top-16",
          gradientClass,
        )}
      />
      <div className="relative overflow-hidden rounded-[28px] bg-card shadow-2xl ring-1 ring-black/5">
        <img src={image} alt={title} className="h-auto w-full" loading="lazy" />
      </div>
    </div>
  );
}
