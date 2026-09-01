// https://nuxt.com/docs/api/configuration/nuxt-config

const siteName =
  process.env.NUXT_PUBLIC_SITE_NAME ||
  process.env.NUXT_SITE_NAME ||
  "Sumifluid | Hidraulica, Neumatica y Vacio en Elche";
const siteUrl =
  process.env.NUXT_PUBLIC_SITE_URL ||
  process.env.NUXT_SITE_URL ||
  "https://sumifluid.es";
const siteDescription =
  process.env.NUXT_PUBLIC_SITE_DESCRIPTION ||
  "Suministro de productos y soluciones de hidraulica, neumatica y vacio en Elche.";
const siteKeywords = process.env.NUXT_PUBLIC_SITE_KEYWORDS || "";
const businessAddress = {
  ...(process.env.NUXT_PUBLIC_ADDRESS_STREET && {
    streetAddress: process.env.NUXT_PUBLIC_ADDRESS_STREET,
  }),
  ...(process.env.NUXT_PUBLIC_ADDRESS_LOCALITY && {
    addressLocality: process.env.NUXT_PUBLIC_ADDRESS_LOCALITY,
  }),
  ...(process.env.NUXT_PUBLIC_ADDRESS_REGION && {
    addressRegion: process.env.NUXT_PUBLIC_ADDRESS_REGION,
  }),
  ...(process.env.NUXT_PUBLIC_ADDRESS_POSTAL_CODE && {
    postalCode: process.env.NUXT_PUBLIC_ADDRESS_POSTAL_CODE,
  }),
  addressCountry: process.env.NUXT_PUBLIC_ADDRESS_COUNTRY || "ES",
};
const businessTelephone = process.env.NUXT_PUBLIC_BUSINESS_TELEPHONE;
const googleAnalyticsId = process.env.NUXT_PUBLIC_GA_ID || "G-WCW8Z9VZLM";

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      strapiUrl: process.env.STRAPI_URL || "http://localhost:1337",
      siteName,
      siteUrl,
      siteDescription,
      siteKeywords,
      businessAddress,
      businessTelephone,
    },
  },
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "nuxt-nodemailer",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap",
    "nuxt-schema-org",
    "nuxt-strapi-blocks-renderer",
  ],
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },
  css: ["~/assets/css/main.css"],
  ui: {
    colorMode: false,
  },
  nodemailer: {
    from: "",
    host: "",
    port: 465,
    secure: true,
    auth: {
      user: "",
      pass: "",
    },
  },
  image: {
    // Options
  },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      title: siteName,
      htmlAttrs: {
        lang: "es",
      },
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/favicon-16x16.png",
        },
        {
          rel: "apple-touch-icon",
          sizes: "180x180",
          href: "/apple-touch-icon.png",
        },
        {
          rel: "canonical",
          href: siteUrl,
        },
      ],
      meta: [
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:locale",
          content: "es_ES",
        },
        {
          name: "og:site_name",
          content: siteName,
        },
        {
          name: "description",
          content: siteDescription,
        },
        ...(siteKeywords ? [{ name: "keywords", content: siteKeywords }] : []),
        {
          name: "og:image",
          content: `${siteUrl}/images/logo.png`,
        },
      ],
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`,
          async: true,
        },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}');`,
        },
      ],
    },
  },
  site: {
    url: siteUrl,
    name: siteName,
    description: siteDescription,
  },
  schemaOrg: {
    identity: {
      type: "LocalBusiness",
      name: siteName,
      logo: `${siteUrl}/images/logo.png`,
      address: businessAddress,
      ...(businessTelephone ? { telephone: businessTelephone } : {}),
      openingHoursSpecification: [
        {
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "08:00",
          closes: "18:00",
        },
      ],
    },
  },
  sitemap: {
    autoLastmod: true,
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
    },
    sources: ["/api/sitemap-urls"],
  },
  // nitro: {
  //   prerender: {
  //     failOnError: false,
  //   },
  // },

  routeRules: {
    "/**": {
      robots: {
        index: true, // permite que Google indexe estas páginas (que aparezcan en resultados de búsqueda)
        follow: true, // permite que los rastreadores sigan los enlaces internos de la página
        "max-image-preview": "large", // permite que Google muestre previsualizaciones de imágenes grandes en los resultados de búsqueda (en vez de recortadas o sin imagen)
        "max-snippet": -1, // no hay límite de caracteres para el fragmento de texto (snippet) que Google puede mostrar debajo del título en los resultados
        "max-video-preview": -1, // sin límite de duración para las previsualizaciones de video en los resultados
      },
    },
    "/api/**": {
      robots: false,
    },
  },

  robots: {
    groups: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
});
