const STORAGE_KEY = "sumifluid-cookie-consent-v2";

export const COOKIE_CATEGORIES = [
  {
    key: "necesarias",
    label: "Cookies estrictamente necesarias",
    locked: true,
    description:
      "Las cookies estrictamente necesarias permiten la funcionalidad principal del sitio web, como la navegación segura y el guardado de sus preferencias de cookies. El sitio web no se puede utilizar correctamente sin ellas.",
    cookies: "Cookie de consentimiento (guarda su elección durante 12 meses).",
  },
  {
    key: "rendimiento",
    label: "Cookies de rendimiento",
    description:
      "Las cookies de rendimiento se utilizan para entender cómo los visitantes usan el sitio web, mediante estadísticas de uso anónimas. Nos ayudan a mejorar el contenido y la navegación.",
    cookies: "Google Analytics (_ga, _gid, _gat).",
  },
  {
    key: "preferencias",
    label: "Cookies de preferencias",
    description:
      "Las cookies de preferencias permiten que el sitio recuerde información que cambia su comportamiento o aspecto, como el idioma o la región.",
    cookies: "Actualmente no utilizamos cookies de este tipo.",
  },
  {
    key: "funcionalidad",
    label: "Cookies de funcionalidad",
    description:
      "Las cookies de funcionalidad permiten ofrecer una experiencia personalizada, por ejemplo recordando el contenido de un formulario ya cumplimentado.",
    cookies: "Actualmente no utilizamos cookies de este tipo.",
  },
  {
    key: "noClasificadas",
    label: "Cookies no clasificadas",
    description:
      "Las cookies no clasificadas son aquellas que estamos en proceso de clasificar, junto con los proveedores de cada cookie individual.",
    cookies: "Actualmente no hay cookies sin clasificar en el sitio.",
  },
];

function defaultPrefs() {
  return {
    necesarias: true,
    rendimiento: false,
    preferencias: false,
    funcionalidad: false,
    noClasificadas: false,
  };
}

const consent = ref(null); // null = todavía sin decidir; si no, objeto de preferencias
const dismissedThisSession = ref(false);
let initialized = false;

export function useCookieConsent() {
  if (!initialized && import.meta.client) {
    initialized = true;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        consent.value = { ...defaultPrefs(), ...parsed, necesarias: true };
      } catch {
        consent.value = null;
      }
    }
  }

  function save(prefs) {
    const full = { ...defaultPrefs(), ...prefs, necesarias: true };
    consent.value = full;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(full));
  }

  function acceptAll() {
    save({
      necesarias: true,
      rendimiento: true,
      preferencias: true,
      funcionalidad: true,
      noClasificadas: true,
    });
  }

  function rejectAll() {
    save(defaultPrefs());
  }

  function dismiss() {
    dismissedThisSession.value = true;
  }

  function reopen() {
    consent.value = null;
    dismissedThisSession.value = false;
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return {
    consent,
    dismissedThisSession,
    save,
    acceptAll,
    rejectAll,
    dismiss,
    reopen,
  };
}
