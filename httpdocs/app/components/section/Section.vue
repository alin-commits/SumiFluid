<script setup>
const props = defineProps({
  // Datos
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

  // Estilos
  splitLayout: {
    type: Boolean,
    default: false,
  },
  centerHead: {
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
  darkBackground: {
    type: String,
    default: "var(--panel)",
  },
});

const sectionStyle = computed(() => {
  if (!props.isDark) return null;
  return {
    "--section-dark-bg": props.darkBackground,
  };
});

const sectionRef = ref(null);
useRevealObserver(sectionRef);
</script>

<template>
  <section
    ref="sectionRef"
    class="section"
    :class="{ 'is-dark': isDark }"
    :style="sectionStyle"
  >
    <div class="wrap">
      <div
        v-if="splitLayout"
        class="grid-12 section-split-grid"
        style="background: transparent; border: none"
      >
        <SectionEncabezado
          :id="id"
          :titulo="titulo"
          :preview="preview"
          :descripcion="descripcion"
          :grid-item="true"
          :centered="centerHead"
          :is-dark="isDark"
          :bigger-head="biggerHead"
          :wider-parragraph="widerParragraph"
        >
          <template v-if="$slots['preview-action']" #preview-action>
            <slot name="preview-action" />
          </template>
        </SectionEncabezado>
        <div v-if="$slots.default" class="section-content reveal">
          <slot />
        </div>
      </div>
      <template v-else>
        <SectionEncabezado
          :id="id"
          :titulo="titulo"
          :preview="preview"
          :descripcion="descripcion"
          :centered="centerHead"
          :is-dark="isDark"
          :bigger-head="biggerHead"
          :wider-parragraph="widerParragraph"
        >
          <template v-if="$slots['preview-action']" #preview-action>
            <slot name="preview-action" />
          </template>
        </SectionEncabezado>
        <div v-if="$slots.default" class="section-content reveal">
          <slot />
        </div>
      </template>
    </div>
  </section>
</template>

<style scoped>
.section {
  padding: 4rem 0;
}
.section-tight {
  padding: 3.2rem 0;
}
.section.is-dark {
  color: #fff;
  background: var(--section-dark-bg, var(--panel));
}
.section-content.reveal {
  opacity: 0;
  transform: translateY(28px);
  transition:
    opacity 0.7s var(--ease),
    transform 0.7s var(--ease);
}
.section-content.reveal.is-visible {
  opacity: 1;
  transform: none;
}
.section-split-grid {
  border: none;
  background: transparent;
  align-items: start;
  column-gap: 2.4rem;
}
.section-split-grid > * {
  padding: 0;
}
.section-split-grid .section-content {
  grid-column: span 7;
}
@media (max-width: 640px) {
  .section {
    padding: 3.2rem 0;
  }
  .section-tight {
    padding: 2.2rem 0;
  }
}
</style>
