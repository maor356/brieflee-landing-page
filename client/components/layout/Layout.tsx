import { Outlet } from "react-router-dom";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import ScrollToHash from "./ScrollToHash";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToHash />
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
