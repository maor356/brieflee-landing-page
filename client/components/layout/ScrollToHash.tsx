import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_OPTIONS: ScrollIntoViewOptions = {
  behavior: "smooth",
  block: "start",
};

function scrollToElement(id: string) {
  const element = document.getElementById(id);

  if (!element) return;

  requestAnimationFrame(() => {
    element.scrollIntoView(SCROLL_OPTIONS);
  });
}

export default function ScrollToHash() {
  const { hash, pathname } = useLocation();
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (!hash) return;

    scrollToElement(hash.replace(/^#/, ""));
  }, [hash]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;

      if (!hash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [hash, pathname]);

  return null;
}
