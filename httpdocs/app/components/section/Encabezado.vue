<script setup>
defineProps({
  id: {
    type: Number,
  },
  titulo: {
    type: String,
  },
  preview: {
    type: String,
  },
  descripcion: {
    type: String,
  },
  gridItem: {
    type: Boolean,
    default: false,
  },
  centered: {
    type: Boolean,
    default: false,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
  biggerHead: {
    type: Boolean,
    default: false,
  },
  widerParragraph: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div
    class="section-head"
    :class="{
      'grid-item': gridItem,
      'is-centered': centered,
      'is-dark': isDark,
    }"
  >
    <div class="preview-row" :class="{ 'is-centered': centered }">
      <p v-if="titulo" class="kicker">
        <span v-if="id">0{{ id }} · </span>{{ titulo }}
      </p>

      <h2 v-if="preview" :class="{ 'bigger-head': biggerHead }">
        {{ preview }}
      </h2>
      <p v-if="descripcion" :class="{ 'wider-parragraph': widerParragraph }">
        {{ descripcion }}
      </p>
    </div>
    <div v-if="$slots['preview-action']" class="preview-action">
      <slot name="preview-action" />
    </div>
  </div>
</template>

<style scoped>
.section-head {
  margin-bottom: 2.6rem;
  display: flex;

  h2 {
    font-size: clamp(1.7rem, 3.4vw, 2.6rem);
    font-weight: 800;
    max-width: 30ch;
    &.bigger-head {
      font-size: clamp(2.1rem, 5vw, 3.6rem);
      margin-bottom: 1.2rem;
    }
  }

  p {
    max-width: 70ch;
    color: var(--ink-soft);
    margin-top: 0.9rem;
    font-size: 1.05rem;

    &.wider-parragraph {
      max-width: 100ch;
    }
  }

  .preview-row {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .preview-row.is-centered {
    justify-content: center;
    flex-wrap: wrap;
  }

  .preview-action {
    flex-shrink: 0;
  }
}
.grid-item {
  background: transparent;
  padding-right: 0;
  grid-column: span 5;
}
.is-centered {
  max-width: 100%;
  & > * {
    margin-inline: auto;
    text-align: center;
  }
  h2 {
    max-width: 90%;
  }
  .kicker {
    justify-content: center;
  }
}

.is-dark {
  .kicker {
    color: var(--accent);
  }
  p {
    color: rgba(255, 255, 255, 0.68);
  }
}

@media (max-width: 640px) {
  .section-head .preview-row {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
