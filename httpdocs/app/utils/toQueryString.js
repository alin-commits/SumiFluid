export function toQueryString(params, prefix = "") {
  const parts = [];

  for (const key in params) {
    const value = params[key];
    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      value.forEach((item, i) => {
        parts.push(
          `${encodeURIComponent(`${fullKey}[${i}]`)}=${encodeURIComponent(item)}`,
        );
      });
    } else if (typeof value === "object") {
      parts.push(toQueryString(value, fullKey));
    } else {
      parts.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
    }
  }

  return parts.filter(Boolean).join("&");
}
