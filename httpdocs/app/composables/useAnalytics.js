/**
 * Envía eventos a Google Analytics 4 (gtag). No hace nada si el usuario no
 * ha dado consentimiento de cookies de rendimiento (gtag nunca se carga en
 * ese caso) — no hay que comprobar el consentimiento aquí explícitamente.
 */
export function useAnalytics() {
  function trackEvent(name, params = {}) {
    if (import.meta.client && typeof window.gtag === "function") {
      window.gtag("event", name, params);
    }
  }

  return { trackEvent };
}
