<script setup>
import { ciudades } from "~/data/ciudades";

const route = useRoute();
const siteConfig = useSiteConfig();

const { get } = useStrapi();
const { data } = await get("empresa", {
  query: {
    populate: "*",
  },
});
const empresa = computed(() => data.value?.data);

// #region SEO
const pageTitle = computed(() =>
  empresa?.seo?.metaTitle
    ? `Contactos | ${empresa.seo.metaTitle}`
    : `Contactos | ${empresa?.nombre || siteConfig.name}`,
);

const pageDescription = computed(() =>
  empresa?.seo?.metaDescription
    ? `Contactos | ${empresa.seo.metaDescription}`
    : "Contactos | Soluciones técnicas para la industria.",
);

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
  { label: "Contacto", to: route.path },
]);

useSchemaOrg([
  defineWebPage({
    "@type": "ContactPage",
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
    <SectionContacto
      :nombre-empresa="empresa?.nombre"
      :direccion="empresa?.direccion"
      :telefono_principal="empresa?.telefonoPrincipalNoSpaces"
      :telefono_secundario="empresa?.telefonoSecundariolNoSpaces"
      :email="empresa?.emailPrincipal"
      :horario="empresa?.horario"
    ></SectionContacto>

    <Section
      titulo="Zonas de cobertura"
      preview="Enviamos a toda España"
      descripcion="Consulte disponibilidad y plazo de entrega en su ciudad."
      class="section-tight wrap"
    >
      <div class="ciudades-grid">
        <NuxtLink
          v-for="ciudad in ciudades"
          :key="ciudad.slug"
          :to="`/componentes-hidraulicos-${ciudad.slug}`"
          class="ciudad-pill"
        >
          {{ ciudad.nombre }}
        </NuxtLink>
      </div>
    </Section>
  </div>
</template>

<style scoped>
.ciudades-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}
.ciudad-pill {
  border: 1px solid var(--line);
  padding: 0.5rem 1rem;
  font-size: 0.86rem;
  font-weight: 600;
  transition:
    background 0.2s,
    border-color 0.2s;

  &:hover {
    background: #fbf2df;
    border-color: var(--accent);
  }
}
</style>
