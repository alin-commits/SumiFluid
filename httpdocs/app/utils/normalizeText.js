const normalizeWord = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const getArticulo = (titulo = "") => {
  const firstWord = normalizeWord(titulo.split(/\s+/)[0] || "").replace(
    /[^a-z]/g,
    "",
  );
  const isPlural = firstWord.endsWith("s") && firstWord.length > 2;
  const isFeminine = /a$/.test(firstWord);

  if (isPlural) {
    return isFeminine ? "las" : "los";
  }

  return isFeminine ? "la" : "el";
};
