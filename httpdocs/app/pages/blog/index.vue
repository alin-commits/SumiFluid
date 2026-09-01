<script setup>
const route = useRoute();
const siteConfig = useSiteConfig();

const pageTitle = "Blog Sumifluid";
const pageDescription = "Todo sobre hidráulica y neumática en nuestro blog";

const ordenFecha = ref("desc");

const { get, getMediaUrl } = useStrapi();
const { data: postsData } = await get("posts", {
  query: {
    populate: {
      portada: true,
    },
    sort: ["fecha:desc"],
    pagination: {
      pageSize: 100,
    },
  },
});
const posts = computed(() => postsData.value?.data ?? []);

const postsOrdenados = computed(() => {
  const lista = [...posts.value];

  return lista.sort((a, b) => {
    const fechaA = new Date(a.fecha).getTime();
    const fechaB = new Date(b.fecha).getTime();

    return ordenFecha.value === "asc" ? fechaA - fechaB : fechaB - fechaA;
  });
});

// #region Paginación
const page = ref(1);
const itemsPerPage = 9;

const postsPaginados = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return postsOrdenados.value.slice(start, start + itemsPerPage);
});

watch(ordenFecha, () => {
  page.value = 1;
});
// #endregion

function getImagenPost(post) {
  if (!post.portada) return "/images/placeholder.png";
  return (
    getMediaUrl(
      post.portada?.formats?.medium?.url ??
        post.portada?.formats?.small?.url ??
        post.portada?.url,
    ) ?? "/images/placeholder.png"
  );
}
function formatearFecha(fecha) {
  const date = new Date(fecha);
  const dia = String(date.getDate()).padStart(2, "0");
  const mes = String(date.getMonth() + 1).padStart(2, "0");
  const anio = date.getFullYear();
  return `${dia}/${mes}/${anio}`;
}

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
  { label: "Blog", to: route.path },
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
    name: () => `Posts de ${pageTitle}`,
    itemListElement: () =>
      postsOrdenados.value.map((post) => ({
        name: post.titulo,
        url: `${route.path}/${post.slug}`,
      })),
  }),
]);
// #endregion
</script>

<template>
  <main>
    <Breadcrumbs />

    <Section :titulo="pageTitle" :preview="pageDescription" :is-dark="true">
      <section class="wrap">
        <div class="filter-bar">
          <button
            class="filter-btn"
            @click="ordenFecha = ordenFecha === 'desc' ? 'asc' : 'desc'"
          >
            Ordenar por fecha:
            <Icon
              :name="
                ordenFecha === 'desc'
                  ? 'i-lucide-arrow-up'
                  : 'i-lucide-arrow-down'
              "
            />
          </button>
        </div>

        <div v-if="postsPaginados.length" class="posts-grid">
          <article v-for="post in postsPaginados" :key="post.slug">
            <NuxtLink :to="`/blog/${post.slug}`">
              <SectionBlogCard
                :titulo="post.titulo"
                :fecha="formatearFecha(post.fecha)"
                :imagen="getImagenPost(post)"
              ></SectionBlogCard>
            </NuxtLink>
          </article>
        </div>

        <p v-else>No hay posts publicados todavía.</p>
        <UPagination
          v-if="postsOrdenados.length > itemsPerPage"
          v-model:page="page"
          :total="postsOrdenados.length"
          :items-per-page="itemsPerPage"
          color="warning"
          variant="outline"
          activeColor="warning"
          activeVariant="subtle"
          class="mt-8 flex justify-center pagination"
        />
      </section>
    </Section>
  </main>
</template>

<style scoped>
.pagination button {
  border-radius: 0 !important;
}
.filter-bar {
  display: flex;
  align-items: center;
  margin-bottom: 2.5rem;
  justify-content: flex-end;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1rem;
  font-family: var(--mono);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink-soft);
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background: var(--line-soft);
    border-color: var(--ink-soft);
    color: var(--line);
  }
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@media (max-width: 980px) {
  .posts-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
