<script setup>
const { get, getMediaUrl } = useStrapi();
const { data } = await get("categorias", {
  query: {
    populate: {
      subcategorias: {
        populate: { imagen: true },
      },
    },
  },
});
const categorias = computed(() => data.value?.data ?? []);

const { topPos } = defineProps({
  topPos: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const route = useRoute();

const categoryItems = computed(() =>
  [...categorias.value]
    .sort((a, b) => Number(a.posicion) - Number(b.posicion))
    .map((cat) => ({
      label: cat.slug === "productos" ? "+ Productos" : cat.nombre,
      to: `/${cat.slug}`,
      active: route.path === `/${cat.slug}`,
      subcategorias: [...(cat.subcategorias ?? [])].sort((a, b) =>
        a.nombre.localeCompare(b.nombre),
      ),
    })),
);

const plainItems = [
  { label: "Marcas", to: "/marcas" },
  { label: "Blog", to: "/blog" },
  { label: "Contacto", to: "/contacto" },
];

const navigationItems = computed(() => [
  ...categoryItems.value.map(({ label, to, active }) => ({
    label,
    to,
    active,
  })),
  ...plainItems.map((item) => ({
    ...item,
    active: route.path.startsWith(item.to),
  })),
]);

const openSlug = ref(null);
let closeTimeout = null;

function openMenu(slug) {
  clearTimeout(closeTimeout);
  openSlug.value = slug;
}
function scheduleClose() {
  clearTimeout(closeTimeout);
  closeTimeout = setTimeout(() => {
    openSlug.value = null;
  }, 150);
}

const openMobileSlug = ref(null);
function toggleMobile(slug) {
  openMobileSlug.value = openMobileSlug.value === slug ? null : slug;
}

function subImagen(sub) {
  return (
    getMediaUrl(sub.imagen?.formats?.thumbnail?.url ?? sub.imagen?.url) ??
    "/images/placeholder.png"
  );
}

const baseLinkClasses =
  "[font-family:var(--mono)] uppercase tracking-[0.03em] !text-[color:var(--ink-soft)] hover:!text-[color:var(--ink)] focus:!text-[color:var(--ink)] transition-colors duration-200";
</script>

<template>
  <nav v-if="topPos" class="mega-nav hidden lg:flex">
    <div
      v-for="item in categoryItems"
      :key="item.to"
      class="mega-nav-item"
      @mouseenter="openMenu(item.to)"
      @mouseleave="scheduleClose"
    >
      <NuxtLink
        :to="item.to"
        class="mega-nav-link"
        :class="{ 'is-active': item.active || openSlug === item.to }"
        >{{ item.label }}</NuxtLink
      >
      <Transition name="mega-panel">
        <div
          v-if="item.subcategorias.length && openSlug === item.to"
          class="mega-panel"
          @mouseenter="openMenu(item.to)"
          @mouseleave="scheduleClose"
        >
          <div class="wrap mega-grid">
            <NuxtLink
              v-for="sub in item.subcategorias"
              :key="sub.slug"
              :to="`${item.to}/${sub.slug}`"
              class="mega-sub"
            >
              <NuxtImg
                :src="subImagen(sub)"
                :alt="sub.nombre"
                loading="lazy"
                width="36"
                height="36"
              />
              <span>{{ sub.nombre }}</span>
            </NuxtLink>
          </div>
        </div>
      </Transition>
    </div>
    <NuxtLink
      v-for="item in plainItems"
      :key="item.to"
      :to="item.to"
      class="mega-nav-link"
      :class="{ 'is-active': route.path.startsWith(item.to) }"
      >{{ item.label }}</NuxtLink
    >
  </nav>

  <nav v-else class="mobile-nav">
    <div v-for="item in categoryItems" :key="item.to" class="mobile-nav-item">
      <div class="mobile-nav-row">
        <NuxtLink :to="item.to" class="mobile-nav-link">{{
          item.label
        }}</NuxtLink>
        <button
          v-if="item.subcategorias.length"
          type="button"
          class="mobile-nav-toggle"
          :aria-expanded="openMobileSlug === item.to"
          :aria-label="`Ver subcategorías de ${item.label}`"
          @click="toggleMobile(item.to)"
        >
          <Icon
            :name="
              openMobileSlug === item.to
                ? 'lucide:chevron-up'
                : 'lucide:chevron-down'
            "
          />
        </button>
      </div>
      <div v-if="openMobileSlug === item.to" class="mobile-sub-list">
        <NuxtLink
          v-for="sub in item.subcategorias"
          :key="sub.slug"
          :to="`${item.to}/${sub.slug}`"
          class="mobile-sub-link"
          >{{ sub.nombre }}</NuxtLink
        >
      </div>
    </div>
    <NuxtLink
      v-for="item in plainItems"
      :key="item.to"
      :to="item.to"
      class="mobile-nav-link mobile-nav-plain"
      >{{ item.label }}</NuxtLink
    >
  </nav>
</template>

<style scoped>
.mega-nav {
  align-items: center;
  gap: 1.5rem;
  position: relative;
}

.mega-nav-item {
  position: relative;
  height: var(--nav-h);
  display: flex;
  align-items: center;
}

.mega-nav-link {
  font-family: var(--mono);
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--ink-soft);
  transition: color 0.2s;
  padding-block: 0.25rem;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -4px;
    height: 2px;
    background: transparent;
    transition: background-color 0.2s;
  }
}
.mega-nav-link:hover,
.mega-nav-link.is-active {
  color: var(--ink);
}
.mega-nav-link:hover::after,
.mega-nav-link.is-active::after {
  background: var(--accent);
}

.mega-panel {
  position: fixed;
  top: var(--nav-h);
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 12px 24px rgba(14, 18, 24, 0.08);
  z-index: 110;
  max-height: calc(100vh - var(--nav-h));
  overflow-y: auto;
}

.mega-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0.5rem 1.5rem;
  padding-block: 1.6rem;
}

.mega-sub {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0.5rem;
  color: var(--ink-soft);
  font-size: 0.82rem;
  font-weight: 500;
  transition: color 0.2s;

  & img {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    object-fit: contain;
  }
}
.mega-sub:hover {
  color: var(--accent);
}

.mega-panel-enter-active,
.mega-panel-leave-active {
  transition:
    opacity 0.15s ease,
    transform 0.15s ease;
}
.mega-panel-enter-from,
.mega-panel-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-soft);
}

.mobile-nav-link {
  flex-grow: 1;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--ink);
  padding-block: 1rem;
}

.mobile-nav-plain {
  border-bottom: 1px solid var(--line-soft);
}

.mobile-nav-toggle {
  padding: 1rem 0.25rem;
  color: var(--ink-soft);
  background: none;
  border: none;
}

.mobile-sub-list {
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5rem;
}

.mobile-sub-link {
  padding: 0.6rem 0.5rem 0.6rem 1rem;
  font-size: 0.88rem;
  color: var(--ink-soft);
}
.mobile-sub-link:hover {
  color: var(--accent);
}
</style>
