const STORAGE_KEY = "sumifluid-cookie-consent";

const consent = ref(null);
let initialized = false;

function loadGoogleAnalytics() {
  const config = useRuntimeConfig();
  const gaId = config.public.googleAnalyticsId;
  if (!gaId || document.querySelector(`script[data-ga-id="${gaId}"]`)) return;

  const loader = document.createElement("script");
  loader.async = true;
  loader.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  loader.setAttribute("data-ga-id", gaId);
  document.head.appendChild(loader);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", gaId);
}

export function useCookieConsent() {
  if (!initialized && import.meta.client) {
    initialized = true;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    consent.value = stored === "accepted" || stored === "rejected" ? stored : null;
    if (consent.value === "accepted") {
      loadGoogleAnalytics();
    }
  }

  function accept() {
    consent.value = "accepted";
    window.localStorage.setItem(STORAGE_KEY, "accepted");
    loadGoogleAnalytics();
  }

  function reject() {
    consent.value = "rejected";
    window.localStorage.setItem(STORAGE_KEY, "rejected");
  }

  function reopen() {
    consent.value = null;
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return { consent, accept, reject, reopen };
}
