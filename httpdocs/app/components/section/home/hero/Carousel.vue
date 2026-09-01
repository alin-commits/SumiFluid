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
    <div class="hero-slide">
      <NuxtImg
        :src="item.imagen"
        :alt="`Componentes de ${item.nombre} industrial`"
        fit="cover"
        fetchpriority="high"
      />
      <div class="hc-overlay"></div>
      <div class="wrap">
        <div class="hc-content">
          <p class="hero-num mono">0{{ item.id }} · {{ item.nombre }}</p>
          <div class="hc-title">
            <StrapiBlocksText :nodes="item.preview" />
          </div>
          <p class="hero-sub">{{ item.descripcion }}</p>
          <div class="hero-ctas">
            <Boton
              :label="`Ver ${item.nombre}`"
              :enlace="item.pagina"
              :flecha="true"
            />
            <Boton
              :btnGhostLight="true"
              :label="'Pedir presupuesto'"
              :enlace="'/contacto'"
            />
          </div>
        </div>
      </div>
    </div>
  </UCarousel>
</template>

<style scoped>
.hero-slide {
  position: relative;
  width: 100%;
  min-height: clamp(420px, 70vh, 720px);
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }

  .hc-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      100deg,
      rgba(15, 33, 64, 0.95) 0%,
      rgba(15, 33, 64, 0.82) 38%,
      rgba(15, 33, 64, 0.42) 68%,
      rgba(15, 33, 64, 0.22) 100%
    );
    z-index: 1;
  }

  .wrap {
    position: relative;
    z-index: 2;
    min-height: inherit;
    display: flex;
    align-items: center;

    .hc-content {
      max-width: 660px;
      color: #fff;

      .hero-num {
        font-size: 0.85rem;
        color: var(--accent);
        margin-bottom: 1.2rem;
      }

      .hc-title {
        font-size: clamp(2.1rem, 5.4vw, 4.2rem);
        margin-bottom: 1.2rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        line-height: 1.05;
      }

      .hero-sub {
        color: rgba(255, 255, 255, 0.84);
        font-size: 1.1rem;
        max-width: 50ch;
        margin-bottom: 2rem;
      }

      .hero-ctas {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
      }
    }
  }
}

.hc-content :deep(strong) {
  color: var(--accent);
}

.hc-content :deep(.hc-title p) {
  margin: 0;
}

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
  .hc-content {
    max-width: 100%;
  }
  .hc-content .hero-sub {
    font-size: 1rem;
  }
  .hero-carousel :deep(.hc-arrow) {
    display: none;
  }
}

@media (max-width: 500px) {
  .hero-ctas {
    display: flex;
    flex-direction: column;
  }
}
</style>
