<script setup>
const { getMediaUrl } = useStrapi();

defineProps({
  seccionId: {
    type: Number,
    required: true,
  },
  seccionTitulo: {
    type: String,
    required: true,
  },
  seccionPreview: {
    type: String,
    default: "",
  },
  seccionDescripcion: {
    type: String,
    default: "",
  },
  catTitulo: {
    type: String,
    required: true,
  },
  catEnlace: {
    type: String,
    default: "/",
  },
  subcatTitulo: {
    type: String,
    default: "",
  },
  imagen: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <Section
    class="subcategoria-intro"
    :id="seccionId"
    :titulo="seccionTitulo"
    :preview="seccionPreview"
    :descripcion="seccionDescripcion"
    :split-layout="true"
  >
    <template #preview-action>
      <div class="btn-stack btn-stack-left">
        <Boton label="pedir presupuesto" enlace="/contacto" :flecha="true" />
        <Boton :btnGhost="true" :label="catTitulo" :enlace="catEnlace" />
      </div>
    </template>

    <div class="subcategoria-intro-media">
      <NuxtImg
        :src="
          getMediaUrl(
            imagen?.formats?.small?.url ??
              imagen?.url ??
              '/images/placeholder.png',
          )
        "
        :alt="subcatTitulo"
        loading="lazy"
        :height="imagen?.formats?.small?.height ?? 400"
        :width="imagen?.formats?.small?.width ?? 400"
        fit="cover"
      />
    </div>
  </Section>
</template>

<style scoped>
.subcategoria-intro {
  &:deep(.section-head) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &:deep(.preview-action) {
    margin-top: 1.25rem;
  }
}

.subcategoria-intro-media {
  width: 100%;
  overflow: hidden;
  max-width: 400px;
  margin-inline: auto;

  & img {
    display: block;
    width: 100%;
    height: auto;
  }
}

.btn-stack {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-stack-left {
  justify-content: flex-start;
}
@media (max-width: 640px) {
  .subcategoria-intro-media {
    max-width: 100%;
    margin-left: 0;

    &img {
      aspect-ratio: 16 / 10;
    }
  }
}
</style>
