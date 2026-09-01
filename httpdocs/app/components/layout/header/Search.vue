<script setup>
const { get, getMediaUrl } = useStrapi();
const [
  { data: marcasRes },
  { data: cats },
  { data: subcats },
  { data: postsRes },
] = await Promise.all([
  get("marcas", {
    query: {
      populate: {
        imagen: true,
      },
    },
  }),
  get("categorias", {
    query: {
      populate: {
        imagen: true,
      },
    },
  }),
  get("subcategorias", {
    query: {
      populate: {
        imagen: true,
        categoria: true,
      },
    },
  }),
  get("posts", {
    query: {
      populate: {
        portada: true,
      },
      fields: ["titulo", "slug"],
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    },
  }),
]);
const marcas = computed(() => marcasRes.value?.data ?? []);
const categorias = computed(() => cats.value?.data ?? []);
const subcategorias = computed(() => subcats.value?.data ?? []);
const blogPosts = computed(() => postsRes.value?.data ?? []);
const MIN_CHARS = 3;
const MAX_RESULTS = 10;

const open = defineModel("open", {
  type: Boolean,
  default: false,
});

const route = useRoute();
const searchQuery = ref("");

const categoryLabels = categorias.value.reduce((labels, cat) => {
  labels[cat.slug] = cat.nombre;
  return labels;
}, {});

const searchIndex = computed(() => [
  ...subcategorias.value.map((subcat) => ({
    type: "subcategory",
    slug: subcat.slug,
    title: subcat.nombre,
    image: getMediaUrl(
      subcat.imagen?.formats?.thumbnail?.url ??
        subcat.imagen?.url ??
        `/images/placeholder.png`,
    ),
    categoryLabel: categoryLabels[subcat.categoria?.slug] || "Producto",
    to: `/${subcat.categoria?.slug}/${subcat.slug}`,
  })),
  ...marcas.value.map((marca) => ({
    type: "brand",
    slug: marca.slug,
    title: marca.nombre,
    image: getMediaUrl(
      marca.logo?.formats?.thumbnail?.url ??
        marca.logo?.url ??
        `/images/placeholder.png`,
    ),
    categoryLabel: "Marca",
    to: `/marcas/${marca.slug}`,
  })),
  ...blogPosts.value.map((post) => ({
    type: "post",
    slug: post.slug,
    title: post.titulo,
    image: post.portada
      ? getMediaUrl(post.portada?.formats?.thumbnail?.url ?? post.portada?.url)
      : undefined,
    categoryLabel: "Blog",
    to: `/blog/${post.slug}`,
  })),
]);

const normalize = (value) =>
  (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

const normalizedQuery = computed(() => normalize(searchQuery.value));

const hasMinChars = computed(() => normalizedQuery.value.length >= MIN_CHARS);

const searchResults = computed(() => {
  const query = normalizedQuery.value;

  if (!hasMinChars.value) return [];

  return searchIndex.value
    .filter((item) => normalize(item.title).includes(query))
    .sort((a, b) => {
      const aStarts = normalize(a.title).startsWith(query) ? 0 : 1;
      const bStarts = normalize(b.title).startsWith(query) ? 0 : 1;
      return aStarts - bStarts;
    })
    .slice(0, MAX_RESULTS);
});

function closeSearch() {
  open.value = false;
  searchQuery.value = "";
}

function handleKeydown(event) {
  if (event.key === "Escape" && open.value) closeSearch();
}

watch(
  () => route.fullPath,
  () => closeSearch(),
);

onMounted(() => window.addEventListener("keydown", handleKeydown));
onBeforeUnmount(() => window.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <div v-if="open" class="fixed inset-0 z-98" @click="closeSearch" />

  <Transition
    enter-active-class="transition duration-150 ease-out"
    enter-from-class="-translate-y-2 opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-100 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-2 opacity-0"
  >
    <div
      v-if="open"
      class="fixed inset-x-0 top-(--nav-h) z-99 bg-white shadow-[0_12px_24px_rgba(18,40,76,0.12)]"
    >
      <div class="mx-auto max-w-2xl px-5 py-5">
        <UInput
          v-model="searchQuery"
          icon="i-lucide-search"
          size="xl"
          autofocus
          placeholder="Buscar productos, marcas o artículos ..."
          class="w-full"
          :ui="{ base: '[font-family:var(--mono)] rounded-none' }"
        />

        <div v-if="hasMinChars" class="mt-4 max-h-[55vh] overflow-y-auto">
          <div v-if="searchResults.length" class="flex flex-col gap-1">
            <NuxtLink
              v-for="result in searchResults"
              :key="`${result.type}-${result.slug}`"
              :to="result.to"
              class="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-(--line-soft)"
              @click="closeSearch"
            >
              <NuxtImg
                v-if="result.image"
                :src="result.image"
                :alt="result.title"
                fit="contain"
                width="44"
                height="44"
                loading="lazy"
                class="h-11 w-11 shrink-0 rounded-md p-1"
              />

              <span class="min-w-0 flex-1 truncate text-[15px] text-(--ink)">
                {{ result.title }}
              </span>

              <UBadge
                color="warning"
                variant="outline"
                class="shrink-0 [font-family:var(--mono)] uppercase tracking-[0.03em]"
              >
                {{ result.categoryLabel }}
              </UBadge>
            </NuxtLink>
          </div>

          <p v-else class="py-8 text-center text-sm text-(--ink-soft)">
            No se han encontrado resultados para "{{ searchQuery }}"
          </p>
        </div>

        <p
          v-else-if="searchQuery.length > 0"
          class="mt-4 text-center text-sm text-(--ink-soft)"
        >
          Escribe al menos {{ MIN_CHARS }} caracteres para buscar
        </p>
      </div>
    </div>
  </Transition>
</template>
