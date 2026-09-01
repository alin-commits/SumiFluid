function toQueryString(params, prefix) {
  const parts = [];

  for (const key in params) {
    const value = params[key];
    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      parts.push(toQueryString(value, fullKey));
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        if (v !== null && typeof v === "object") {
          parts.push(toQueryString(v, `${fullKey}[${i}]`));
        } else {
          parts.push(
            `${encodeURIComponent(`${fullKey}[${i}]`)}=${encodeURIComponent(v)}`,
          );
        }
      });
    } else if (value !== undefined) {
      parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
    }
  }

  return parts.filter(Boolean).join("&");
}

export const useStrapi = () => {
  const config = useRuntimeConfig();

  const baseUrl = `${config.public.strapiUrl}/api`;

  const getMediaUrl = (url) => {
    if (!url) {
      return null;
    }

    // URL absoluta
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }

    // Recursos locales de Nuxt
    if (url.startsWith("/images/") || url.startsWith("/icons/")) {
      return url;
    }

    // Recursos de Strapi
    return `${config.public.strapiUrl}${url}`;
  };

  const get = (contentType, options = {}) => {
    const { query, ...rest } = options;
    const qs = query ? toQueryString(query) : "";
    const url = qs
      ? `${baseUrl}/${contentType}?${qs}`
      : `${baseUrl}/${contentType}`;

    return useFetch(url, {
      ...rest,
    });
  };

  return {
    get,
    getMediaUrl,
  };
};
