/**
 * Envía eventos a Google Tag Manager a través del dataLayer. Si el usuario no
 * ha dado consentimiento de cookies de rendimiento, GTM nunca llega a
 * cargarse, así que estos eventos simplemente se acumulan sin efecto (no
 * sale nada del navegador) — no hace falta comprobar el consentimiento aquí.
 */
export function useAnalytics() {
  function trackEvent(name, params = {}) {
    if (import.meta.client) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: name, ...params });
    }
  }

  return { trackEvent };
}
