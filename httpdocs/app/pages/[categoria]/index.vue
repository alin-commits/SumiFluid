<script setup>
const route = useRoute();
const siteConfig = useSiteConfig();

const { get, getMediaUrl } = useStrapi();
const [{ data: empresa }, { data: cat }] = await Promise.all([
  get("empresa"),
  get("categorias", {
    query: {
      populate: {
        imagen: true,
        subcategorias: {
          populate: {
            imagen: true,
          },
        },
      },
    },
  }),
]);
const telefono = computed(() => empresa.value?.data?.telefonoPrincipalNoSpaces);

const categoryCopyBySlug = {
  hidraulica: {
    preview: "Sistemas hidráulicos, diseñados para no parar su producción.",
    descripcion:
      "Bombas, motores, centrales, cilindros y latiguillos con stock permanente. Cuando la pieza estándar no encaja, la diseñamos y fabricamos en nuestro propio taller de Elche.",
  },
  neumatica: {
    preview: "Automatización industrial a la velocidad del aire comprimido.",
    descripcion:
      "Cilindros, válvulas y racordaje bajo normativa ISO 6431 y Unitop. Si no está en catálogo, lo fabricamos con entrega inmediata.",
  },
  estanqueidad: {
    preview: "Más de 5.000 referencias para que nada gotee.",
    descripcion:
      "Juntas tóricas, retenes y collarines en NBR, EPDM, VMQ, FKM y PTFE para aplicaciones dinámicas y estáticas.",
  },
  vacio: {
    preview: "La fuerza invisible que sostiene su producción.",
    descripcion:
      "Bombas de vacío, eyectores, turbinas y ventosas. Trabajamos con COVAL y DVP Vacuum Technology para reducir el consumo energético y el ruido de su instalación.",
  },
};

const pageCopyBySlug = {
  hidraulica: {
    section4: {
      titulo: "Ingeniería hidráulica a medida",
      preview: "Diseño, cálculo y montaje para cada ciclo de trabajo",
      descripcion:
        "Analizamos caudal, presión y respuesta para montar centrales, cilindros y regulación con componentes de primeras marcas y fabricación propia.",
    },
    section6: {
      preview:
        "Cuéntenos su circuito hidráulico y le proponemos la solución más rápida",
      descripcion:
        "Si necesita una equivalencia, una reparación o una central completa, respondemos con disponibilidad, plazos y alternativa técnica en el menor tiempo posible.",
    },
  },
  neumatica: {
    section4: {
      titulo: "Automatización neumática en planta",
      preview: "Eficiencia, velocidad y repetibilidad para su línea",
      descripcion:
        "Dimensionamos cilindros, válvulas y racordaje para conseguir ciclos estables, ahorro de aire y una puesta en marcha sencilla.",
    },
    section6: {
      preview:
        "¿Necesita una línea neumática a medida o una equivalencia urgente?",
      descripcion:
        "Le damos respuesta con producto en stock, asesoramiento técnico y montaje de soluciones para automatización industrial.",
    },
  },
  estanqueidad: {
    section4: {
      titulo: "Sellado técnico para cero fugas",
      preview: "Elegimos el material correcto para cada movimiento",
      descripcion:
        "Definimos juntas, retenes y collarines según temperatura, presión, fluido y velocidad para alargar la vida útil del conjunto.",
    },
    section6: {
      preview: "¿Busca una referencia concreta o una alternativa compatible?",
      descripcion:
        "Localizamos la pieza, verificamos medidas y le proponemos la solución más fiable para recuperar estanqueidad sin detener la instalación.",
    },
  },
  vacio: {
    section4: {
      titulo: "Tecnología de vacío para ciclos más limpios",
      preview: "Menos consumo, menos ruido y más control",
      descripcion:
        "Seleccionamos bombas, turbinas, eyectores y ventosas para mejorar el agarre, reducir el consumo energético y simplificar el mantenimiento.",
    },
    section6: {
      preview: "¿Necesita una solución de vacío que encaje con su aplicación?",
      descripcion:
        "Le ayudamos a dimensionar la instalación y a escoger equipos con disponibilidad real y soporte técnico desde el primer contacto.",
    },
  },
};

const categorias = computed(() =>
  (cat.value?.data ?? []).map((categoria) => ({
    ...categoria,
    ...categoryCopyBySlug[categoria.slug],
  })),
);

const bannerImagen = computed(
  () =>
    getMediaUrl(
      categoria.value?.imagen?.formats?.large?.url ??
        categoria.value?.imagen?.url,
    ) ?? "/images/placeholder.png",
);

const categoria = computed(() => {
  const catSlug = route.params.categoria;
  return categorias.value.find((cat) => cat.slug === catSlug);
});

const subcategorias = computed(() => categoria.value.subcategorias);
const processedSubcategorias = computed(() => {
  if (!categoria.value?.subcategorias) return [];

  return categoria.value.subcategorias
    .filter((subcat) => subcat.destacado === true)
    .map((subcat) => ({
      ...subcat,
      routeSlug: `${categoria.value.slug}/${subcat.slug}`,
    }))
    .slice(0, 10);
});

// #region SEO
const pageTitle = computed(
  () =>
    `Soluciones de ${categoria.value?.nombre} industrial en Elche | Sumifluid`,
);
const pageDescription = computed(
  () =>
    `${categoria.value?.productos_breve} Stock en Elche, asesoramiento técnico y envío rápido en España.`,
);
const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));

const ogImageUrl = computed(() => {
  const imagenUrl = getMediaUrl(categoria.value?.imagen?.url);
  return imagenUrl ?? `${siteConfig.url}/images/og-default.jpg`;
});

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: canonicalUrl,
  ogImage: ogImageUrl,
});

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: canonicalUrl.value,
    },
  ],
}));

const breadcrumbItems = computed(() => [
  { label: "Inicio", to: "/" },
  { label: categoria.value.nombre, to: route.path },
]);

useSchemaOrg([
  defineWebPage({
    "@type": "CollectionPage",
    name: pageTitle,
    description: pageDescription,
  }),
  defineBreadcrumb({
    itemListElement: () =>
      breadcrumbItems.value.map((item) => ({
        name: item.label,
        item: item.to,
      })),
  }),
  defineItemList({
    name: () => `Productos de ${categoria.value.nombre}`,
    itemListElement: () =>
      subcategorias.value.map((subcat) => ({
        name: subcat.nombre,
        url: `${route.path}/${subcat.slug}`,
      })),
  }),
]);
// #endregion
</script>

<template>
  <main>
    <!-- Banner de categoría -->
    <SectionBannerCategoria
      :nombre="categoria.nombre"
      :preview="categoria.preview"
      :rich-preview="false"
      :descripcion="categoria.descripcion"
      :imagen="bannerImagen"
      pagina="#catalogo"
    >
      <template #ctas>
        <Boton
          :btnSecondary="true"
          label="pedir presupuesto"
          enlace="#presupuesto"
          :flecha="true"
        />
        <Boton
          :btnGhostLight="true"
          label="ver catálogo completo"
          :enlace="`#catalogo`"
        />
      </template>
    </SectionBannerCategoria>

    <Breadcrumbs />

    <!-- Sección Productos destacados -->
    <Section
      :id="2"
      class="section-notop"
      titulo="Destacado"
      :preview="`Lo más solicitado en ${categoria.nombre}`"
      descripcion="Una selección de referencias de alta rotación, pensadas para resolver necesidades habituales de esta familia de producto."
    >
      <div class="tile-grid">
        <SectionCard
          v-for="subcategoria in processedSubcategorias"
          :key="subcategoria.routeSlug"
          :titulo="subcategoria.nombre"
          :imagen="subcategoria.imagen"
          :slug="subcategoria.routeSlug"
        />
      </div>
    </Section>

    <!-- Sección Catálogo completo -->
    <Section
      :id="3"
      titulo="Catálogo completo"
      :preview="`Todas las familias de ${categoria.nombre}`"
      :descripcion="`${categoria.subcategorias.length} familias de producto en stock permanente. Cada enlace abre la ficha técnica completa con marcas y referencias disponibles.`"
      class="section-tight"
    >
      <SectionDataView
        id="catalogo"
        :categoria-slug="categoria.slug"
        :subcategorias="subcategorias"
      />
    </Section>

    <!-- Section Individual -->
    <Section
      :id="4"
      :titulo="pageCopyBySlug[categoria.slug].section4.titulo"
      :preview="pageCopyBySlug[categoria.slug].section4.preview"
      :descripcion="pageCopyBySlug[categoria.slug].section4.descripcion"
      :is-dark="true"
      :dark-background="'var(--panel)'"
    >
      <div class="btn-stack btn-stack-left">
        <Boton
          :btnSecondary="true"
          :label="'pedir presupuesto'"
          :enlace="'#presupuesto'"
          :flecha="true"
        />
        <Boton
          :btnGhostLight="true"
          :label="'llamar ahora'"
          :enlace="`tel:+34${telefono}`"
        />
      </div>
    </Section>

    <!-- Formulario de presupuesto -->
    <div id="presupuesto">
      <Section
        titulo="Presupuesto"
        :preview="pageCopyBySlug[categoria.slug].section6.preview"
        :descripcion="pageCopyBySlug[categoria.slug].section6.descripcion"
      >
        <Formulario :producto="categoria.nombre" />
      </Section>
    </div>

    <!-- Sección Marcas -->
    <Section
      class="section-tight"
      :id="5"
      :titulo="`Marcas en ${categoria.nombre}`"
      preview="Trabajamos con los fabricantes de referencia"
      descripcion=""
    >
      <template #preview-action>
        <NuxtLink
          class="brands-link mono"
          to="/marcas"
          aria-label="Ir a marcas"
        >
          ver marcas
          <Icon name="lucide:arrow-right" />
        </NuxtLink>
      </template>
    </Section>
    <SectionBrandTrack />
  </main>
</template>

<style>
.section-notop {
  padding-top: 1rem !important;
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

@media (max-width: 980px) {
  .tile-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 620px) {
  .tile-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
