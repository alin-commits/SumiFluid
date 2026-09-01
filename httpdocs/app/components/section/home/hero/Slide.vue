<script setup>
defineProps({
  numero: {
    type: [String, Number],
    default: null,
  },
  nombre: {
    type: String,
    required: true,
  },
  preview: {
    type: [String, Array, Object],
    default: null,
  },
  richPreview: {
    type: Boolean,
    default: true,
  },
  descripcion: {
    type: String,
    default: "",
  },
  imagen: {
    type: String,
    required: true,
  },
  pagina: {
    type: String,
    default: "/",
  },
  compact: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="hero-slide" :class="{ 'is-compact': compact }">
    <NuxtImg
      :src="imagen"
      :alt="`Componentes de ${nombre} industrial`"
      fit="cover"
      fetchpriority="high"
    />
    <div class="hc-overlay"></div>
    <div class="wrap">
      <div class="hc-content">
        <p v-if="numero" class="hero-num mono">0{{ numero }} · {{ nombre }}</p>
        <div class="hc-title">
          <StrapiBlocksText v-if="richPreview && preview" :nodes="preview" />
          <p v-else-if="preview">{{ preview }}</p>
        </div>
        <p v-if="descripcion" class="hero-sub">{{ descripcion }}</p>
        <div class="hero-ctas">
          <slot name="ctas">
            <Boton
              :btnSecondary="true"
              :label="`Ver ${nombre}`"
              :enlace="pagina"
              :flecha="true"
            />
            <Boton
              :btnGhostLight="true"
              label="Pedir presupuesto"
              enlace="/contacto"
            />
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-slide {
  position: relative;
  width: 100%;
  min-height: clamp(420px, 70vh, 720px);
  overflow: hidden;

  &.is-compact {
    min-height: clamp(320px, 46vh, 480px);
  }

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

  &.is-compact .hc-content {
    .hc-title {
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      margin-bottom: 0.9rem;
      font-weight: 700;
    }
    .hero-sub {
      font-size: 1rem;
      margin-bottom: 1.6rem;
    }
  }
}

.hc-content :deep(strong) {
  color: var(--accent);
}

.hc-content :deep(.hc-title p) {
  margin: 0;
}

@media (max-width: 560px) {
  .hc-content {
    max-width: 100%;
  }
  .hc-content .hero-sub {
    font-size: 1rem;
  }
}

@media (max-width: 500px) {
  .hero-ctas {
    display: flex;
    flex-direction: column;
  }
}
</style>
