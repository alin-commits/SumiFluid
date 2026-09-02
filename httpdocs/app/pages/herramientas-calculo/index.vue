<script setup>
import { calculadoras, seoIndice } from "~/data/calculadoras";

const enlacesCalculadoras = calculadoras.map((c) => ({
  label: c.titulo,
  to: `/herramientas-calculo/${c.slug}`,
}));

const route = useRoute();
const siteConfig = useSiteConfig();

const pageTitle = "Herramientas de Cálculo Hidráulico y Neumático | Sumifluid";
const pageDescription =
  "Calculadoras online gratuitas para dimensionar cilindros, bombas y motores hidráulicos: área, capacidad, fuerza, velocidad, potencia y par de giro.";

// #region SEO
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
  { label: "Herramientas de cálculo", to: route.path },
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
]);
// #endregion
</script>

<template>
  <main>
    <Breadcrumbs />

    <Section
      :id="1"
      titulo="herramientas"
      preview="Calculadoras de hidráulica y neumática"
      descripcion="Herramientas online gratuitas para dimensionar cilindros, bombas y motores. Introduzca los datos de su instalación y obtenga el resultado al instante, sin registro."
      :bigger-head="true"
      class="calc-index-hero"
    >
      <div class="calc-grid">
        <SectionCalculadoraCard
          v-for="calculadora in calculadoras"
          :key="calculadora.slug"
          :titulo="calculadora.titulo"
          :formula-texto="calculadora.formulaTexto"
          :slug="calculadora.slug"
        />
      </div>
    </Section>

    <Section :id="2" class="section-tight calc-index-seo">
      <SectionCalculadoraSeo
        :titulo="seoIndice.titulo"
        :parrafos="seoIndice.parrafos"
        :enlaces="enlacesCalculadoras"
      />
    </Section>
  </main>
</template>

<style scoped>
.calc-index-hero {
  padding-bottom: 1rem !important;
}

.calc-index-seo {
  padding-bottom: 6rem !important;
}

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
