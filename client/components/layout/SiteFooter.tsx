import { Link } from "react-router-dom";
import { Building2, Hash, MapPin, Phone, Mail } from "lucide-react";

export default function SiteFooter() {
  return (
    <footer className="border-t bg-white/60 dark:bg-background/80">
      <div className="container py-10 grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="text-base font-semibold text-foreground sm:text-lg">
            Brieflee
          </Link>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Brieflee is your AI legal research copilot for Belgian law—find on-point cases, codes, and doctrine, trace citations, and save decisions, all with transparent links to the underlying sources. Search less, argue more.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold mb-3">Product</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/#features" className="hover:text-foreground">Features</Link></li>
            <li><Link to="/#pricing" className="hover:text-foreground">Pricing</Link></li>
            <li><Link to="/#faq" className="hover:text-foreground">FAQ</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-foreground">Privacy</Link></li>
            <li><Link to="/security" className="hover:text-foreground">Security</Link></li>
            <li><Link to="/terms" className="hover:text-foreground">Terms</Link></li>
          </ul>
        </div>

        <div className="text-sm">
          <p className="font-semibold mb-3">Legal Details</p>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-start gap-2">
              <Building2 className="mt-1 h-4 w-4" />
              <div>
                <span className="block">BZ Trade (Brieflee)</span>
                <span className="text-xs text-muted-foreground/80">BE0784.941.123</span>
              </div>
            </li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /><span>Charlottalei 58, 2018 Antwerpen</span></li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+32 470 12 12 68</span></li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><a className="hover:text-foreground" href="mailto:support@brieflee.be">support@brieflee.be</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="container py-6 text-xs text-muted-foreground">© {new Date().getFullYear()} Brieflee, Inc. All rights reserved.</div>
      </div>
    </footer>
  );
}
