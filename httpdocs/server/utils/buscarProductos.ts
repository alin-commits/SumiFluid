const STOPWORDS = new Set([
  "de",
  "la",
  "el",
  "los",
  "las",
  "para",
  "con",
  "por",
  "una",
  "uno",
  "del",
  "en",
  "al",
  "que",
  "cual",
  "cuales",
  "necesito",
  "quiero",
  "tienen",
  "tienes",
  "hay",
  "busco",
  "precio",
  "cuanto",
  "cuesta",
  "hola",
  "gracias",
]);

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function palabrasSignificativas(texto: string): string[] {
  return normalizar(texto)
    .split(/[^a-z0-9]+/)
    .filter((w) => w.length >= 3 && !STOPWORDS.has(w));
}

export interface ProductoEncontrado {
  codigo: string;
  nombre: string;
  enlace: string;
}

export async function buscarProductosRelevantes(
  strapiUrl: string,
  mensaje: string,
  max = 3,
): Promise<ProductoEncontrado[]> {
  const palabrasMensaje = new Set(palabrasSignificativas(mensaje));
  if (palabrasMensaje.size === 0) return [];

  try {
    const res = await fetch(
      `${strapiUrl}/api/productos?populate[subcategoria][populate][categoria]=true&pagination[pageSize]=200`,
    );
    if (!res.ok) return [];
    const json = await res.json();
    const productos = json?.data ?? [];

    const encontrados = productos
      .map((p: any) => {
        const palabrasNombre = palabrasSignificativas(`${p.nombre} ${p.codigo}`);
        const score = palabrasNombre.filter((w) => palabrasMensaje.has(w)).length;
        const subcategoria = p.subcategoria;
        const categoria = subcategoria?.categoria;
        const enlace =
          subcategoria?.slug && categoria?.slug
            ? `/${categoria.slug}/${subcategoria.slug}`
            : null;
        return { codigo: p.codigo, nombre: p.nombre, enlace, score };
      })
      .filter((p: any) => p.score > 0 && p.enlace)
      .sort((a: any, b: any) => b.score - a.score)
      .slice(0, max)
      .map(({ codigo, nombre, enlace }: any) => ({ codigo, nombre, enlace }));

    return encontrados;
  } catch {
    return [];
  }
}
