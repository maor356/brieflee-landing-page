const GA_MEASUREMENT_ID = "G-3FX519GSZV";

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const isBrowser = typeof window !== "undefined";

if (isBrowser) {
  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };

  // Ensure the base configuration runs even if the embed script loads slowly.
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_MEASUREMENT_ID);
}

/**
 * Fire a GA4 event when user interactions occur.
 *
 * Usage examples:
 *   trackEvent("sign_up_button_click", { method: "hero" });
 *   trackEvent("contact_form_submit", { status: "success" });
 */
export const trackEvent = (
  eventName: string,
  params: Record<string, any> = {}
) => {
  if (!isBrowser || typeof window.gtag !== "function") return;

  window.gtag("event", eventName, params);
};

export { GA_MEASUREMENT_ID };
