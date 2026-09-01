<script setup>
import { ciudades } from "~/data/ciudades";

definePageMeta({
  validate: (route) => ciudades.some((c) => c.slug === route.params.ciudad),
});

const route = useRoute();
const siteConfig = useSiteConfig();

const { get } = useStrapi();
const { data: empresa } = await get("empresa");
const telefono = computed(
  () => empresa.value?.data?.telefonoPrincipalNoSpaces ?? "",
);

const ciudad = computed(() =>
  ciudades.find((c) => c.slug === route.params.ciudad),
);

const categorias = [
  {
    slug: "hidraulica",
    nombre: "Hidráulica",
    descripcion:
      "Bombas, motores, centrales hidráulicas, cilindros, latiguillos a medida y filtraje.",
  },
  {
    slug: "neumatica",
    nombre: "Neumática",
    descripcion:
      "Cilindros, válvulas, racordaje y automatización bajo normativa ISO 6431 y Unitop.",
  },
  {
    slug: "estanqueidad",
    nombre: "Estanqueidad",
    descripcion:
      "Más de 5.000 referencias en juntas tóricas, retenes y collarines (NBR, EPDM, VMQ, FKM, PTFE).",
  },
  {
    slug: "vacio",
    nombre: "Vacío",
    descripcion:
      "Bombas, eyectores y ventosas junto a fabricantes como COVAL y DVP Vacuum Technology.",
  },
];

// #region SEO
const pageTitle = computed(
  () =>
    `Componentes Hidráulicos y Neumáticos en ${ciudad.value.nombre} | Sumifluid`,
);
const pageDescription = computed(
  () =>
    `Suministro de hidráulica, neumática, estanqueidad y vacío en ${ciudad.value.nombre}. Stock permanente, envíos 24/48h y taller propio en Elche. Pida presupuesto.`,
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
  <main>
    <Breadcrumbs />

    <!-- Sección Intro -->
    <Section
      :id="1"
      titulo="cobertura nacional"
      :preview="`Componentes hidráulicos y neumáticos en ${ciudad.nombre}`"
      :descripcion="`Sumifluid suministra componentes de hidráulica, neumática, estanqueidad y vacío a empresas industriales en ${ciudad.nombre} y su área metropolitana. Con más de una década de experiencia y stock permanente en nuestros almacenes de Elche, garantizamos envíos a ${ciudad.nombre} en 24/48 horas.`"
      :bigger-head="true"
    >
      <div class="btn-stack btn-stack-left">
        <Boton label="pedir presupuesto" enlace="/contacto" :flecha="true" />
      </div>
    </Section>

    <!-- Sección Catálogo -->
    <Section
      :id="2"
      titulo="catálogo"
      :preview="`Lo que ofrecemos a la industria ${ciudad.gentilicio}`"
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

      <p v-if="ciudad.localidadesCercanas?.length" class="localidades">
        Si su empresa está en {{ ciudad.nombre }},
        {{ ciudad.localidadesCercanas.join(", ") }} o cualquier otro
        municipio de la zona, puede contar con nuestro servicio de
        suministro y asesoramiento técnico.
      </p>
    </Section>

    <!-- Sección Trazabilidad -->
    <Section
      :id="3"
      titulo="calidad"
      preview="Trazabilidad y calidad garantizada"
      :descripcion="`Cada pieza que enviamos a ${ciudad.nombre} cuenta con certificado de calidad de fábrica y trazabilidad completa de existencias. Si necesita reponer una referencia dañada, basta con indicarnos el código y le enviamos la pieza exacta.`"
      :wider-parragraph="true"
    />

    <!-- Sección Taller propio (CTA final) -->
    <Section
      class="section-individual-vcenter"
      :id="4"
      titulo="fabricación propia"
      preview="Taller propio en Elche"
      descripcion="Además del suministro de piezas en catálogo, disponemos de taller propio para la fabricación de latiguillos a medida y reparación de maquinaria hidráulica y neumática, con entrega rápida a cualquier punto de la península."
      :split-layout="true"
      :is-dark="true"
      dark-background="var(--panel)"
    >
      <div class="btn-stack btn-stack-vcenter">
        <Boton
          :btnSecondary="true"
          label="pedir presupuesto"
          enlace="/contacto"
          :flecha="true"
        />
        <Boton
          v-if="telefono"
          :btnGhostLight="true"
          label="llamar ahora"
          :enlace="`tel:+34${telefono}`"
        />
      </div>
    </Section>

    <!-- Sección Marcas -->
    <Section class="section-tight" :id="5" :titulo="`Marcas en ${ciudad.nombre}`" preview="Trabajamos con los fabricantes de referencia">
      <template #preview-action>
        <NuxtLink class="brands-link mono" to="/marcas" aria-label="Ir a marcas">
          ver marcas
          <Icon name="lucide:arrow-right" />
        </NuxtLink>
      </template>
      <SectionBrandTrack />
    </Section>
  </main>
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
.localidades {
  margin-top: 1.6rem;
  color: var(--ink-soft);
  max-width: 90ch;
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
