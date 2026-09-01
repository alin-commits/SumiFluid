<script setup>
const { get, getMediaUrl } = useStrapi();

const { data } = await get("marcas", {
  query: {
    populate: "*",
    pagination: {
      pageSize: 100,
    },
  },
});

const marcas = computed(() => data.value?.data ?? []);

const route = useRoute();
const siteConfig = useSiteConfig();

const marcasDestacadas = computed(() =>
  marcas.value.filter((marca) => marca.destacado),
);
const seccion = ref({
  titulo: "Contacto directo",
  preview: "¿Busca una marca o modelo concreto?",
  descripcion:
    "Es muy probable que dispongamos de una opción equivalente entre nuestras marcas. Consúltenos sin compromiso.",
});

// #region SEO
const pageTitle =
  "Marcas de hidráulica, neumática, estanqueidad y vacío | Sumifluid";
const pageDescription =
  "Catálogo de marcas industriales en Sumifluid: fabricantes de referencia en hidráulica, neumática, estanqueidad y vacío. Asesoramiento técnico y stock en Elche.";
const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: canonicalUrl,
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
  { label: "Marcas", to: route.path },
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
    name: () => `Marcas de ${siteConfig.name}`,
    itemListElement: () =>
      marcas.value.map((marca) => ({
        name: marca.nombre,
        url: `${route.path}/${marca.slug}`,
      })),
  }),
]);
// #endregion
</script>

<template>
  <main>
    <Breadcrumbs />
    <SectionEncabezado
      class="wrap"
      titulo="marcas"
      preview="Más de 40 fabricantes.Un único punto de contacto."
      descripcion="Trabajamos con las marcas de referencia mundial en hidráulica, neumática, estanqueidad y vacío. Si busca un modelo concreto, es muy probable que ya lo tengamos en stock."
      :bigger-head="true"
    >
    </SectionEncabezado>

    <!-- Marcas grid -->
    <Section
      titulo="Fabricantes destacados"
      preview="Nuestro catálogo de marcas"
      class="section-tight"
    >
      <div class="brand-grid">
        <NuxtLink
          v-for="marca in marcasDestacadas"
          :key="marca.slug"
          class="brand-tile"
          :to="`/marcas/${marca.slug}`"
        >
          <NuxtImg
            :src="
              getMediaUrl(
                marca.logo?.formats?.xsmall?.url ??
                  marca.logo?.url ??
                  `/images/placeholder.png`,
              )
            "
            :alt="marca.nombre"
            loading="lazy"
            :height="marca.logo?.formats?.xsmall?.height ?? 50"
            :width="marca.logo?.formats?.xsmall?.width ?? 100"
            fit="cover"
          />
          <span>{{ marca.nombre }}</span>
        </NuxtLink>
      </div>
    </Section>

    <!-- Otras marcas -->
    <Section
      titulo="Todas las marcas"
      preview="Catálogo completo de fabricantes"
      descripcion="Más de 40 marcas activas. Consulte disponibilidad de cualquier modelo o referencia concreta."
      class="section-tight"
    >
      <SectionDataView
        categoria-slug="marcas"
        :subcategorias="marcas"
        :moreGap="true"
      />
    </Section>

    <!-- Seccion contacto -->
    <SectionContact :seccion="seccion"></SectionContact>
  </main>
</template>

<style scoped></style>
