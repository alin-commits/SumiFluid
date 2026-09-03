<script setup>
const route = useRoute();
const siteConfig = useSiteConfig();

const { get, getMediaUrl } = useStrapi();
const { data } = await get("marcas", {
  query: {
    populate: {
      logo: true,
      banner: true,
      imagenesDeProductos: true,
      catalogo: true,
    },
    pagination: {
      pageSize: 100,
    },
  },
});
const marcas = computed(() => data.value?.data ?? []);

const marca = computed(() => {
  const marcaSlug = route.params.slug;
  return marcas.value.find((marca) => marca.slug === marcaSlug);
});

const VISIBLE_ITEMS = 3;
const MIN_MULTIPLIER = 4;

const imgList = computed(() => {
  const base = marca.value?.imagenesDeProductos ?? [];
  if (base.length === 0) return [];
  if (base.length < 2) return base;
  const minSlides = VISIBLE_ITEMS * MIN_MULTIPLIER;
  const repeats = Math.max(MIN_MULTIPLIER, Math.ceil(minSlides / base.length));

  return Array.from({ length: repeats }, () => base).flat();
});

// #region SEO
// const nombreMarca = marca.value?.nombre ?? "Marca";
// const pageTitle = computed(
//   () => `${nombreMarca} | Marca industrial en Sumifluid`,
// );

// const pageDescription = computed(
//   () =>
//     `${marca.value?.preview || ""}. Distribución y asesoramiento técnico de ${nombreMarca} en Elche, Alicante, con envío rápido a toda España.`,
// );

// const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));
// const ogImageUrl = computed(() => {
//   const imagen = marca.value?.logo.url ?? "";
//   const path = imagen.startsWith("/") ? imagen : `/${imagen}`;
//   return siteConfig.url + path;
// });
// useSeoMeta({
//   title: pageTitle,
//   description: pageDescription,
//   ogTitle: pageTitle,
//   ogDescription: pageDescription,
//   ogUrl: canonicalUrl,
//   ogImage: ogImageUrl,
// });

// useHead(() => ({
//   link: [
//     {
//       rel: "canonical",
//       href: canonicalUrl.value,
//     },
//   ],
// }));

// const breadcrumbItems = computed(() => [
//   { label: "Inicio", to: "/" },
//   { label: marca.value.nombre, to: route.path },
// ]);

// useSchemaOrg([
//   defineWebPage({
//     "@type": "ItemPage",
//     name: pageTitle,
//     description: pageDescription,
//   }),
//   defineBreadcrumb({
//     itemListElement: () =>
//       breadcrumbItems.value.map((item) => ({
//         name: item.label,
//         item: item.to,
//       })),
//   }),
// ]);
// #endregion
</script>

<template>
  <SectionMarcaHeader
    v-if="marca"
    :marca="marca.nombre"
    :preview="marca.preview"
    :imagen="getMediaUrl(marca.logo?.url) ?? '/images/placeholder.png'"
    :banner="getMediaUrl(marca.banner?.url) ?? '/images/placeholder.png'"
    :catalogo="marca.catalogo"
  />
  <Breadcrumbs />
  <div class="container wrap">
    <Section titulo="sobre la compañía" :wider-parragraph="true">
      <div>
        <div class="text-content">
          <StrapiBlocksText :nodes="marca.descripcion" />
        </div>
        <UCarousel
          v-slot="{ item }"
          :items="imgList"
          autoplay
          loop
          :ui="{
            item: 'basis-1/3 max-[1240px]:basis-1/2 max-[960px]:basis-1/3 max-[700px]:basis-1/2 max-[600px]:basis-full',
          }"
          class="brand-carousel"
        >
          <img
            :src="
              getMediaUrl(
                item.formats?.xsmall?.url ??
                  item.url ??
                  `/images/placeholder.png`,
              )
            "
            loading="lazy"
            class="brand-carousel-image"
            :alt="`producto ${marca.nombre}`"
          />
        </UCarousel>
      </div>
    </Section>
    <Formulario :producto="marca.nombre" />
  </div>
</template>

<style scoped>
.brand-carousel {
  margin-top: 4rem;

  & .brand-carousel-image {
    max-height: 200px;
    width: 100%;
    max-width: 320px;
    object-fit: contain;
    margin-inline: auto;
  }
}

.container {
  display: grid;
  gap: 2rem;
  grid-template-columns: 2.5fr 1.5fr;

  & form {
    margin-block: 4rem;
  }
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  & :deep(h2) {
    padding-top: 2rem;
    font-size: 1.5rem;
    font-weight: 700;
  }
  & :deep(ul) {
    list-style: disc;
    padding-left: 2rem;
  }
}
@media (max-width: 1240px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 960px) {
  .container {
    gap: 0;
    grid-template-columns: 1fr;
    & form {
      margin-block: auto;
    }
  }
}
</style>
