<script setup>
import { calculadoras } from "~/data/calculadoras";

definePageMeta({
  validate: (route) =>
    calculadoras.some((c) => c.slug === route.params.calculadora),
});

const route = useRoute();
const siteConfig = useSiteConfig();

const calculadora = computed(() =>
  calculadoras.find((c) => c.slug === route.params.calculadora),
);

const otrasCalculadoras = computed(() =>
  calculadoras.filter((c) => c.slug !== calculadora.value.slug),
);

// #region SEO
const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));

useSeoMeta({
  title: () => calculadora.value.metaTitulo,
  description: () => calculadora.value.metaDescripcion,
  ogTitle: () => calculadora.value.metaTitulo,
  ogDescription: () => calculadora.value.metaDescripcion,
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
  { label: "Herramientas de cálculo", to: "/herramientas-calculo" },
  { label: calculadora.value.titulo, to: route.path },
]);

useSchemaOrg([
  defineWebPage({
    "@type": "ItemPage",
    name: () => calculadora.value.metaTitulo,
    description: () => calculadora.value.metaDescripcion,
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

    <Section
      :id="1"
      titulo="herramientas de cálculo"
      :preview="calculadora.titulo"
      :descripcion="calculadora.descripcion"
      :bigger-head="true"
      :split-layout="true"
    >
      <SectionCalculadoraFormulario :calculadora="calculadora" />
    </Section>

    <Section :id="2" class="section-tight">
      <SectionCalculadoraSeo
        :titulo="calculadora.seoTitulo"
        :parrafos="calculadora.seoParrafos"
        :faqs="calculadora.seoFaqs"
      />
    </Section>

    <Section :id="3" titulo="otras calculadoras" class="section-tight">
      <div class="calc-grid">
        <SectionCalculadoraCard
          v-for="otra in otrasCalculadoras"
          :key="otra.slug"
          :titulo="otra.titulo"
          :formula-texto="otra.formulaTexto"
          :slug="otra.slug"
        />
      </div>
    </Section>
  </main>
</template>

<style scoped>
.calc-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

@media (max-width: 980px) {
  .calc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .calc-grid {
    grid-template-columns: 1fr;
  }
}
</style>
