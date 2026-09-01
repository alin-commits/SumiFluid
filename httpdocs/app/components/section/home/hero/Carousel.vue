<script setup>
const { get, getMediaUrl } = useStrapi();
const { data } = await get("categorias", {
  query: {
    populate: "*",
  },
});
const categorias = computed(() => data.value?.data ?? []);

const AUTOPLAY_DELAY = 5000;

const heroItems = computed(() =>
  [...categorias.value]
    .sort((a, b) => Number(a.posicion) - Number(b.posicion))
    .map((item, index) => ({
      id: index + 1,
      nombre: item.nombre,
      preview: item.preview,
      descripcion: item.descripcion,
      imagen: getMediaUrl(item.imagen?.formats?.large?.url ?? item.imagen?.url),
      pagina: `/${item.slug}`,
    })),
);

const carouselUi = {
  container: "ms-0 hc-container",
  item: "basis-full ps-0 hc-item",
  controls: "hc-controls",
  prev: "hc-arrow hc-prev",
  next: "hc-arrow hc-next",
  dots: "hc-dots",
  dot: "hc-dot",
};
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="heroItems"
    loop
    arrows
    dots
    :autoplay="{
      delay: AUTOPLAY_DELAY,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }"
    prev-icon="lucide:chevron-left"
    next-icon="lucide:chevron-right"
    :ui="carouselUi"
    class="hero-carousel"
  >
    <SectionHomeHeroSlide
      :numero="item.id"
      :nombre="item.nombre"
      :preview="item.preview"
      :descripcion="item.descripcion"
      :imagen="item.imagen"
      :pagina="item.pagina"
    />
  </UCarousel>
</template>

<style scoped>
.hero-carousel :deep(.hc-arrow) {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(6px);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s,
    border-color 0.2s,
    color 0.2s;
}

.hero-carousel :deep(.hc-arrow:hover) {
  background: var(--accent);
  color: var(--ink);
}

.hero-carousel :deep(.hc-prev) {
  left: 1.4rem;
}

.hero-carousel :deep(.hc-next) {
  right: 1.4rem;
}

.hero-carousel :deep(.hc-dots) {
  position: absolute;
  bottom: 1.6rem;
}

.hero-carousel :deep(.hc-dot[data-state="active"]) {
  background: var(--accent);
  width: 24px;
}

@media (max-width: 860px) {
  .hero-carousel :deep(.hc-arrow) {
    width: 38px;
    height: 38px;
    font-size: 1.2rem;
  }
  .hero-carousel :deep(.hc-prev) {
    left: 0.7rem;
  }
  .hero-carousel :deep(.hc-next) {
    right: 0.7rem;
  }
}

@media (max-width: 560px) {
  .hero-carousel :deep(.hc-arrow) {
    display: none;
  }
}
</style>
