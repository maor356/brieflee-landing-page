import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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
        <Link to="/" className="flex items-center text-base font-semibold text-foreground sm:text-lg">
          Brieflee
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map((item) => (
            <Link key={item.href} to={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-transparent text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open navigation menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="flex h-full w-full flex-col gap-8 sm:max-w-xs">
              <div className="space-y-6 pt-10">
                <div className="text-base font-semibold text-foreground">Brieflee</div>
                <nav className="flex flex-col gap-4 text-base">
                  {nav.map((item) => (
                    <SheetClose key={item.href} asChild>
                      <Link to={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </div>
              <div className="mt-auto flex flex-col gap-3 pb-6">
                <SheetClose asChild>
                  <Button variant="ghost" size="lg" asChild>
                    <a href="https://app.brieflee.be" target="_blank" rel="noreferrer">
                      Sign in
                    </a>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button size="lg" asChild>
                    <a href="https://brieflee.fillout.com/waitinglist" target="_blank" rel="noreferrer">
                      Book a demo
                    </a>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="ghost" className="hidden sm:inline-flex" asChild>
            <a href="https://app.brieflee.be" target="_blank" rel="noreferrer">
              Sign in
            </a>
          </Button>
          <Button className={cn("hidden sm:inline-flex")} asChild>
            <a href="https://brieflee.fillout.com/waitinglist" target="_blank" rel="noreferrer">
              Book a demo
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
