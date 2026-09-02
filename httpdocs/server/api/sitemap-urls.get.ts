import { ciudades } from "../../app/data/ciudades";
import { calculadoras } from "../../app/data/calculadoras";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const strapiUrl = config.public.strapiUrl;
  const baseUrl = `${strapiUrl}/api`;

  type SitemapPriority =
    | 0
    | 0.1
    | 0.2
    | 0.3
    | 0.4
    | 0.5
    | 0.6
    | 0.7
    | 0.8
    | 0.9
    | 1;

  interface SitemapUrlItem {
    loc: string;
    lastmod: string;
    changefreq?: "daily" | "weekly" | "monthly" | "yearly" | "never";
    priority?: SitemapPriority;
  }

  console.log(`[Sitemap] Fetching URLs from Strapi: ${baseUrl}`);

  try {
    // Fetch data from Strapi
    const [categoriasRes, subcategoriasRes, marcasRes, postsRes] =
      await Promise.all([
        $fetch(`${baseUrl}/categorias`, {
          params: {
            populate: "subcategorias",
            "pagination[pageSize]": 100,
          },
        }).catch((e) => {
          console.error("[Sitemap] Error fetching categorias:", e.message);
          return { data: [] };
        }),
        $fetch(`${baseUrl}/subcategorias`, {
          params: {
            populate: "categoria",
            "pagination[pageSize]": 200,
          },
        }).catch((e) => {
          console.error("[Sitemap] Error fetching subcategorias:", e.message);
          return { data: [] };
        }),
        $fetch(`${baseUrl}/marcas`, {
          params: {
            "pagination[pageSize]": 100,
          },
        }).catch((e) => {
          console.error("[Sitemap] Error fetching marcas:", e.message);
          return { data: [] };
        }),
        $fetch(`${baseUrl}/posts`, {
          params: {
            "fields[0]": "slug",
            "fields[1]": "fecha",
            "pagination[pageSize]": 100,
            "filters[publishedAt][$notNull]": true,
          },
        }).catch((e) => {
          console.error("[Sitemap] Error fetching posts:", e.message);
          return { data: [] };
        }),
      ]);

    const now = new Date().toISOString();

    // Extract data arrays
    const categorias = (categoriasRes as any)?.data ?? [];
    const subcategorias = (subcategoriasRes as any)?.data ?? [];
    const marcas = (marcasRes as any)?.data ?? [];
    const posts = (postsRes as any)?.data ?? [];

    console.log(
      `[Sitemap] Found: ${categorias.length} categorias, ${subcategorias.length} subcategorias, ${marcas.length} marcas, ${posts.length} posts`,
    );

    // Build category URLs
    const categoryUrls: SitemapUrlItem[] = categorias.map((categoria: any) => ({
      loc: `/${categoria.slug}`,
      lastmod: now,
      changefreq: "weekly" as const,
      priority: 0.9 as SitemapPriority,
    }));

    // Build subcategory URLs
    const subcategoryUrls: SitemapUrlItem[] = subcategorias
      .filter((sub: any) => sub.categoria?.data?.slug) // Ensure category exists
      .map((sub: any) => ({
        loc: `/${sub.categoria.data.slug}/${sub.slug}`,
        lastmod: now,
        changefreq: "monthly" as const,
        priority: 0.7 as SitemapPriority,
      }));

    // Build marca URLs
    const marcaUrls: SitemapUrlItem[] = marcas.map((marca: any) => ({
      loc: `/marcas/${marca.slug}`,
      lastmod: now,
      changefreq: "monthly" as const,
      priority: 0.6 as SitemapPriority,
    }));

    // Build post URLs
    const postUrls: SitemapUrlItem[] = posts.map((post: any) => ({
      loc: `/blog/${post.slug}`,
      lastmod: post.fecha ? new Date(post.fecha).toISOString() : now,
      changefreq: "monthly" as const,
      priority: 0.5 as SitemapPriority,
    }));

    // Static URLs
    const staticUrls: SitemapUrlItem[] = [
      {
        loc: "/",
        lastmod: now,
        changefreq: "daily",
        priority: 1,
      },
      {
        loc: "/about",
        lastmod: now,
        changefreq: "monthly",
        priority: 0.6,
      },
      {
        loc: "/blog",
        lastmod: now,
        changefreq: "weekly",
        priority: 0.8,
      },
      {
        loc: "/contacto",
        lastmod: now,
        changefreq: "monthly",
        priority: 0.8,
      },
      {
        loc: "/marcas",
        lastmod: now,
        changefreq: "monthly",
        priority: 0.7,
      },
      {
        loc: "/herramientas-calculo",
        lastmod: now,
        changefreq: "monthly",
        priority: 0.7,
      },
    ];

    // Build city landing page URLs
    const ciudadUrls: SitemapUrlItem[] = ciudades.map((ciudad) => ({
      loc: `/componentes-hidraulicos-${ciudad.slug}`,
      lastmod: now,
      changefreq: "monthly" as const,
      priority: 0.6 as SitemapPriority,
    }));

    // Build calculator tool page URLs
    const calculadoraUrls: SitemapUrlItem[] = calculadoras.map((c) => ({
      loc: `/herramientas-calculo/${c.slug}`,
      lastmod: now,
      changefreq: "monthly" as const,
      priority: 0.6 as SitemapPriority,
    }));

    const allUrls = [
      ...staticUrls,
      ...categoryUrls,
      ...subcategoryUrls,
      ...marcaUrls,
      ...postUrls,
      ...ciudadUrls,
      ...calculadoraUrls,
    ];
    console.log(`[Sitemap] Returning ${allUrls.length} total URLs`);

    return allUrls;
  } catch (error) {
    console.error("[Sitemap] Fatal error:", error);

    // Fallback to minimal static URLs if Strapi is unavailable
    const now = new Date().toISOString();
    return [
      {
        loc: "/",
        lastmod: now,
        changefreq: "daily" as const,
        priority: 1 as SitemapPriority,
      },
      {
        loc: "/about",
        lastmod: now,
        changefreq: "monthly" as const,
        priority: 0.6 as SitemapPriority,
      },
      {
        loc: "/blog",
        lastmod: now,
        changefreq: "weekly" as const,
        priority: 0.8 as SitemapPriority,
      },
      {
        loc: "/contacto",
        lastmod: now,
        changefreq: "monthly" as const,
        priority: 0.8 as SitemapPriority,
      },
      {
        loc: "/marcas",
        lastmod: now,
        changefreq: "monthly" as const,
        priority: 0.7 as SitemapPriority,
      },
      {
        loc: "/herramientas-calculo",
        lastmod: now,
        changefreq: "monthly" as const,
        priority: 0.7 as SitemapPriority,
      },
      ...ciudades.map((ciudad) => ({
        loc: `/componentes-hidraulicos-${ciudad.slug}`,
        lastmod: now,
        changefreq: "monthly" as const,
        priority: 0.6 as SitemapPriority,
      })),
      ...calculadoras.map((c) => ({
        loc: `/herramientas-calculo/${c.slug}`,
        lastmod: now,
        changefreq: "monthly" as const,
        priority: 0.6 as SitemapPriority,
      })),
    ];
  }
});
