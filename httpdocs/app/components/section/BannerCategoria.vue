<script setup>
defineProps({
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
    default: "/contacto",
  },
});
</script>

<template>
  <section class="hero-banner" aria-label="Imagen destacada de la categoría">
    <SectionHomeHeroSlide
      :nombre="nombre"
      :preview="preview"
      :rich-preview="richPreview"
      :descripcion="descripcion"
      :imagen="imagen"
      :pagina="pagina"
      :compact="true"
    >
      <template v-if="$slots.ctas" #ctas>
        <slot name="ctas" />
      </template>
    </SectionHomeHeroSlide>
  </section>
</template>
