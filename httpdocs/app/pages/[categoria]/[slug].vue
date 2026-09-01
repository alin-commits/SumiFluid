<script setup>
const route = useRoute();
const siteConfig = useSiteConfig();

const { get, getMediaUrl } = useStrapi();
const { data: empresa } = await get("empresa");
const telefonoPrincipal = computed(
  () => empresa.value?.data.telefonoPrincipal ?? "",
);
const telefonoSecundario = computed(
  () => empresa.value?.data.telefonoSecundario ?? "",
);
const { data: subcat } = await get("subcategorias", {
  query: {
    populate: {
      imagen: true,
      preguntas: true,
      caracteristicas: true,
      tipos: true,
      categoria: {
        populate: {
          subcategorias: { populate: { imagen: true } },
        },
      },
    },
    pagination: {
      pageSize: 100,
    },
  },
});
const subcategorias = computed(() => subcat.value?.data ?? []);
const subcategoria = computed(() => {
  const subcatSlug = route.params.slug;
  return subcategorias.value.find((subcat) => subcat.slug === subcatSlug);
});

const categoria = computed(() => subcategoria.value?.categoria);
const catalogoSubcategorias = computed(
  () => categoria.value?.subcategorias ?? [],
);
const faqs = computed(() => subcategoria.value?.preguntas ?? []);

// #region SEO
const pageTitle = computed(
  () =>
    `${subcategoria.value?.nombre} | ${categoria.value?.nombre} | Sumifluid`,
);
const pageDescription = computed(
  () =>
    `${subcategoria.value?.nombre} para ${categoria.value?.nombre.toLowerCase()} con asesoramiento técnico de Sumifluid. Stock en Elche y envío rápido en España.`,
);
const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));
const ogImageUrl = computed(() => {
  const imagenUrl = getMediaUrl(subcategoria.value?.imagen?.url);
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
  { label: categoria.value.nombre, to: `/${categoria.value.slug}` },
  { label: subcategoria.value.nombre, to: route.path },
]);

useSchemaOrg([
  defineWebPage({
    "@type": "ItemPage",
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
]);
// #endregion
</script>

<template>
  <div>
    <Breadcrumbs />

    <!-- Sección Intro -->
    <SectionSubcatHero
      :seccion-id="1"
      :seccion-titulo="categoria.nombre"
      :seccion-preview="subcategoria.nombre"
      :seccion-descripcion="subcategoria.preview"
      :imagen="subcategoria.imagen"
      :cat-titulo="categoria.nombre"
      :subcat-titulo="subcategoria.nombre"
      :cat-enlace="`/${route.params.categoria}`"
    >
    </SectionSubcatHero>

    <SectionSubcatPorQueComprar :subcategoria="subcategoria.nombre" />

    <!-- Guía técnica -->
    <Section
      :id="2"
      titulo="Guía técnica"
      :preview="`Todo sobre ${getArticulo(subcategoria.nombre)} ${subcategoria.nombre}`"
      :descripcion="subcategoria.descripcion"
      :wider-parragraph="true"
    >
      <SectionSubcatGuiaTecnica :subcategoria="subcategoria" />
    </Section>

    <!-- Separador -->
    <SectionSubcatSeparador
      :categoria="categoria.nombre"
      :telefono_principal="telefonoPrincipal"
      :telefono_secundario="telefonoSecundario"
    />
    <!-- Otras familias -->
    <Section
      :id="3"
      titulo="Otras familias"
      :preview="`Más categorías de ${categoria.nombre}`"
      class="section-tight"
    >
      <SectionDataView
        :categoria-slug="categoria.slug"
        :subcategorias="catalogoSubcategorias"
      />
    </Section>

    <!-- Sección Marcas -->
    <SectionBrandTrack />

    <!-- FAQ -->
    <SectionSubcatFaq :faqs="faqs" :subcat-nombre="subcategoria.nombre" />
  </div>
</template>
