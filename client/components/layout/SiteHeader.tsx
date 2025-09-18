import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold">Bf</span>
          <span className="text-lg font-semibold tracking-tight">Brieflee</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map((item) => (
            <Link key={item.href} to={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <a href="https://app.brieflee.be" target="_blank" rel="noreferrer">
              Sign in
            </a>
          </Button>
          <Button className={cn("hidden sm:inline-flex")} asChild>
            <a href="https://brieflee.fillout.com/waitinglist" target="_blank" rel="noreferrer">
              Join waiting list
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
