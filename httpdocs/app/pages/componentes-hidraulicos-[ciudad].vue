<script setup>
import { ciudades } from "~/data/ciudades";

definePageMeta({
  validate: (route) => ciudades.some((c) => c.slug === route.params.ciudad),
});

const route = useRoute();
const siteConfig = useSiteConfig();

const { get, getMediaUrl } = useStrapi();
const [{ data: empresa }, { data: cat }] = await Promise.all([
  get("empresa"),
  get("categorias", { query: { populate: "*" } }),
]);
const telefono = computed(
  () => empresa.value?.data?.telefonoPrincipalNoSpaces ?? "",
);
const categoriasHero = computed(() => cat.value?.data ?? []);
const processedCategorias = computed(() =>
  categoriasHero.value.map((categoria, index) => ({
    ...categoria,
    id: index + 1,
    imagenUrl:
      getMediaUrl(
        categoria.imagen?.formats?.small?.url ?? categoria.imagen?.url,
      ) ?? "/images/placeholder.png",
  })),
);

const ciudad = computed(() =>
  ciudades.find((c) => c.slug === route.params.ciudad),
);

const trustItems = computed(() => [
  {
    icono: "lucide:badge-check",
    titulo: "Certificado de calidad",
    descripcion: `Cada pieza enviada a ${ciudad.value.nombre} incluye certificado de calidad de fábrica.`,
  },
  {
    icono: "lucide:list-checks",
    titulo: "Trazabilidad completa",
    descripcion: "Control total de existencias y lote de cada referencia en stock.",
  },
  {
    icono: "lucide:refresh-cw",
    titulo: "Reposición inmediata",
    descripcion: "¿Referencia dañada? Indíquenos el código y le enviamos la pieza exacta.",
  },
]);

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
    <SectionHomeHero :categorias="categoriasHero" />

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
        <SectionHomeAreasCard
          v-for="categoria in processedCategorias"
          :key="categoria.slug"
          :id="categoria.id"
          :titulo="categoria.nombre"
          :productos_breve="categoria.productos_breve"
          :imagen="categoria.imagenUrl"
          :slug="categoria.slug"
        />
      </div>

      <p v-if="ciudad.localidadesCercanas?.length" class="localidades">
        Si su empresa está en {{ ciudad.nombre }},
        {{ ciudad.localidadesCercanas.join(", ") }} o cualquier otro
        municipio de la zona, puede contar con nuestro servicio de
        suministro y asesoramiento técnico.
      </p>
    </Section>

    <!-- Sección Recambios (solo ciudades con ciudad.recambios) -->
    <Section
      v-if="ciudad.recambios"
      titulo="recambios"
      :preview="`Recambios hidráulicos en ${ciudad.nombre}`"
      :descripcion="`Si su maquinaria hidráulica o neumática necesita una pieza de recambio, en Sumifluid encontrará la referencia exacta o su equivalente compatible. Trabajamos con equipos ya instalados en ${ciudad.nombre}, identificando el componente dañado a partir del código de fábrica o las medidas, con envío rápido desde nuestro almacén en Elche.`"
      :wider-parragraph="true"
      class="section-tight"
    />

    <!-- Sección Trazabilidad -->
    <Section
      :id="3"
      titulo="calidad"
      preview="Trazabilidad y calidad garantizada"
      class="section-tight"
    >
      <div class="trust-grid">
        <div v-for="item in trustItems" :key="item.titulo" class="trust-tile">
          <Icon :name="item.icono" size="2rem" class="trust-icon" />
          <p class="trust-titulo">{{ item.titulo }}</p>
          <p class="trust-desc">{{ item.descripcion }}</p>
        </div>
      </div>
    </Section>

    <!-- Sección Taller propio (CTA final) -->
    <Section
      :id="4"
      titulo="fabricación propia"
      preview="Taller propio en Elche"
      descripcion="Además del suministro de piezas en catálogo, disponemos de taller propio para la fabricación de latiguillos a medida y reparación de maquinaria hidráulica y neumática, con entrega rápida a cualquier punto de la península."
      :is-dark="true"
      dark-background="var(--panel)"
    >
      <div class="btn-stack btn-stack-left">
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
.localidades {
  margin-top: 1.6rem;
  color: var(--ink-soft);
  max-width: 90ch;
}
.trust-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.trust-tile {
  background: var(--bg-2);
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.trust-icon {
  color: var(--accent);
  margin-bottom: 0.4rem;
}
.trust-titulo {
  font-weight: 700;
  font-size: 1.05rem;
}
.trust-desc {
  font-size: 0.9rem;
  color: var(--ink-soft);
}
@media (max-width: 980px) {
  .cat-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 820px) {
  .trust-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 500px) {
  .cat-grid {
    grid-template-columns: 1fr;
  }
}
</style>
