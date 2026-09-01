<script setup>
import { ciudades } from "~/data/ciudades";

const route = useRoute();
const siteConfig = useSiteConfig();

const ciudad = computed(() =>
  ciudades.find((c) => c.slug === route.params.ciudad),
);

if (!ciudad.value) {
  throw createError({ statusCode: 404, statusMessage: "Ciudad no encontrada" });
}

const categorias = [
  {
    slug: "hidraulica",
    nombre: "Hidráulica",
    descripcion: "Bombas, motores, centrales, cilindros y latiguillos.",
  },
  {
    slug: "neumatica",
    nombre: "Neumática",
    descripcion: "Cilindros, válvulas y racordaje bajo normativa ISO.",
  },
  {
    slug: "estanqueidad",
    nombre: "Estanqueidad",
    descripcion: "Juntas tóricas, retenes y collarines a medida.",
  },
  {
    slug: "vacio",
    nombre: "Vacío",
    descripcion: "Ventosas, generadores y componentes de vacío industrial.",
  },
];

// #region SEO
const pageTitle = computed(
  () =>
    `Componentes hidráulicos y neumáticos en ${ciudad.value.nombre} | Sumifluid`,
);
const pageDescription = computed(
  () =>
    `${ciudad.value.intro} Hidráulica, neumática, estanqueidad y vacío con más de 5.000 referencias en stock.`,
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
  { label: ciudad.value.nombre, to: route.path },
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
  <div v-if="ciudad">
    <Breadcrumbs />

    <SectionEncabezado
      class="wrap"
      titulo="cobertura nacional"
      :preview="`Componentes hidráulicos y neumáticos en ${ciudad.nombre}`"
      :descripcion="ciudad.intro"
      :bigger-head="true"
    />

    <Section
      titulo="Catálogo"
      :preview="`Lo que ofrecemos en ${ciudad.nombre}`"
      descripcion="Más de 5.000 referencias en stock permanente, con asesoramiento técnico y envío rápido desde nuestro almacén en Elche."
      class="section-tight"
    >
      <div class="cat-grid">
        <NuxtLink
          v-for="cat in categorias"
          :key="cat.slug"
          :to="`/${cat.slug}`"
          class="cat-tile"
        >
          <span class="cat-name">{{ cat.nombre }}</span>
          <span class="cat-desc">{{ cat.descripcion }}</span>
        </NuxtLink>
      </div>
    </Section>

    <SectionSubcatPorQueComprar :subcategoria="ciudad.nombre" />

    <SectionBrandTrack />

    <SectionContact
      :seccion="{
        titulo: 'Contacto directo',
        preview: `¿Necesita suministro en ${ciudad.nombre}?`,
        descripcion: `Escríbanos su consulta y le confirmamos disponibilidad y plazo de entrega en ${ciudad.nombre} sin compromiso.`,
      }"
    />
  </div>
</template>

<style scoped>
.cat-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.cat-tile {
  background: var(--bg-2);
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: background 0.2s;

  &:hover {
    background: #fbf2df;
  }
}
.cat-name {
  font-weight: 700;
  font-size: 1.05rem;
}
.cat-desc {
  font-size: 0.86rem;
  color: var(--ink-soft);
}
@media (max-width: 820px) {
  .cat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 500px) {
  .cat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
