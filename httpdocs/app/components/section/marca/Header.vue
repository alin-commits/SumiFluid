<script setup>
const props = defineProps({
  marca: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
  },
  imagen: {
    type: String,
  },
  banner: {
    type: String,
  },
  catalogo: {
    type: Array,
    default: () => [],
  },
});

const { getMediaUrl } = useStrapi();

const catalogoUrl = computed(() => {
  if (!props.catalogo || props.catalogo.length === 0) return null;
  return getMediaUrl(props.catalogo[0].url);
});

const multipleCatalogos = computed(
  () => props.catalogo && props.catalogo.length > 1,
);

const catalogosItems = computed(() => {
  if (!props.catalogo || props.catalogo.length === 0) return [];

  return props.catalogo.map((cat, index) => ({
    label: cat.name || `Catálogo ${index + 1}`,
    icon: "i-lucide-file-text",
    onSelect: () => {
      const url = getMediaUrl(cat.url);
      window.open(url, "_blank");
    },
  }));
});
</script>

<template>
  <section>
    <div class="hero-image-wrap">
      <NuxtImg
        :src="banner"
        :alt="marca"
        class="hero-image"
        loading="lazy"
        height="400"
      />
      <div class="hero-overlay"></div>

      <div class="hero-content wrap">
        <p class="kicker">partner estratégico</p>
        <div class="brand-content">
          <div class="brand-img">
            <NuxtImg :src="imagen" :alt="marca" loading="lazy" width="220" />
          </div>
          <div class="brand-text">
            <h2>{{ marca }}</h2>
            <p>{{ preview }}</p>
          </div>
        </div>
        <div class="btn-stack btn-stack-left">
          <Boton
            :btnSecondary="true"
            label="solicitar información"
            enlace="/contacto"
          />

          <!-- Un solo catálogo -->
          <Boton
            v-if="catalogoUrl && !multipleCatalogos"
            :btnGhostLight="true"
            label="descargar catálogo"
            :enlace="catalogoUrl"
          />

          <!-- Múltiples catálogos -->
          <UDropdownMenu
            v-else-if="multipleCatalogos"
            :items="catalogosItems"
            :popper="{ placement: 'bottom-start' }"
          >
            <button class="btn btn-ghost-light">
              Descargar catálogo
              <Icon name="i-lucide-chevron-down" />
            </button>
          </UDropdownMenu>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-image-wrap {
  position: relative;
  width: 100%;
  min-height: clamp(320px, 40vh, 520px);
  overflow: hidden;
  color: white;
  padding-block: 3rem;

  .hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    z-index: 0;
  }
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(10, 26, 51, 0.8);
}

.hero-content {
  position: relative;
  z-index: 2;
  & .kicker {
    color: var(--accent);
    font-size: 0.9rem;
  }
  & h2 {
    font-size: 1.8rem;
    font-weight: 700;
  }
  & p {
    color: rgba(255, 255, 255, 0.68);
  }

  & .brand-content {
    display: flex;
    align-items: stretch;
    gap: 1rem;
    padding-block: 1.1rem;
    margin-bottom: 2rem;

    & .brand-img {
      max-width: min(220px, 45vw);
      flex-shrink: 0;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 5px solid var(--accent);

      & img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        height: auto;
        object-fit: contain;
        display: block;
      }
    }

    & .brand-text {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      & h2 {
        text-transform: capitalize;
        letter-spacing: 0.1rem;
      }
    }
  }

  & .btn-stack {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;

    &.btn-stack-left {
      justify-content: flex-start;
    }
  }
}

.btn {
  min-width: 210px;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: var(--mono);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 1rem 1.6rem;
  border: 1px solid var(--ink);
  transition:
    background-color 0.3s,
    color 0.3s,
    border-color 0.3s,
    transform 0.3s;

  &:active {
    transform: scale(0.97);
  }
}

.btn-ghost-light {
  background: transparent;
  border-color: rgba(255, 255, 255, 0.55);
  color: #fff;

  &:hover {
    background: var(--accent);
    border-color: var(--accent);
  }
}
</style>
