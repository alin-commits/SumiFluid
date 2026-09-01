<script setup>
import Section from "~/components/section/Section.vue";

const slug = useRoute().params.slug;
const route = useRoute();
const siteConfig = useSiteConfig();

if (!slug) {
  throw createError({
    statusCode: 404,
    message: "Post no encontrado",
  });
}

const { get, getMediaUrl } = useStrapi();
const { data: postData } = await get("posts", {
  query: {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      portada: true,
      contenido: {
        on: {
          "shared.text": {
            populate: "*",
          },
          "shared.imagen": {
            populate: {
              imagen: true,
            },
          },
          "shared.galeria-imagenes": {
            populate: {
              galeriaImagenes: true,
            },
          },
          "shared.tabla": {
            populate: "*",
          },
        },
      },
    },
  },
});

const post = computed(() => {
  const posts = postData.value?.data;
  return Array.isArray(posts) && posts.length > 0 ? posts[0] : null;
});
if (!post.value) {
  throw createError({
    statusCode: 404,
    message: "Post no encontrado",
  });
}
function formatearFecha(fecha) {
  const date = new Date(fecha);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const anio = date.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

// #region SEO
const pageTitle = computed(() => post.value?.titulo ?? "Post");
const pageDescription = computed(() => post.value?.preview ?? "");
const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));
const ogImageUrl = computed(() => {
  if (!post.value?.portada) return "";
  return getMediaUrl(post.value.portada?.url);
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
  { label: "Blog", to: "/blog" },
  { label: post.value?.titulo ?? "Post", to: route.path },
]);

useSchemaOrg([
  defineWebPage({
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
    <article v-if="post">
      <Section
        :preview="post.titulo"
        :descripcion="post.preview"
        :is-dark="true"
        :wider-parragraph="true"
      >
        <div class="fecha">
          <Icon name="lucide:calendar" />
          <span>{{ formatearFecha(post.fecha) }}</span>
        </div>
      </Section>
      <div class="wrap">
        <PostBlock
          v-for="(block, index) in post.contenido"
          :key="index"
          :block="block"
        />
      </div>
    </article>
    <p v-else>No se encontró el post.</p>
  </main>
</template>

<style scoped>
section:deep(h2) {
  color: var(--accent);
}
.wrap {
  margin-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
}
.fecha {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  & span {
    color: rgba(255, 255, 255, 0.68);
    font-family: var(--mono);
  }
  & .iconify {
    color: var(--accent);
  }
}
</style>
