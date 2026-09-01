<script setup>
const props = defineProps({
  error: {
    type: Object,
    required: true,
  },
});

const is404 = computed(() => props.error?.statusCode === 404);

const titulo = computed(() =>
  is404.value ? "Página no encontrada" : "Ha ocurrido un error",
);
const descripcion = computed(() =>
  is404.value
    ? "La página que buscas no existe o se ha movido de sitio."
    : "Algo ha fallado al cargar esta página. Puedes volver al inicio o intentarlo de nuevo.",
);

useSeoMeta({
  title: `${titulo.value} | Sumifluid`,
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <div class="error-page wrap">
        <p class="kicker">{{ error.statusCode }}</p>
        <h1>{{ titulo }}</h1>
        <p class="descripcion">{{ descripcion }}</p>
        <div class="btn-stack">
          <Boton label="volver al inicio" enlace="/" :flecha="true" />
          <Boton :btnGhost="true" label="ir a contacto" enlace="/contacto" />
        </div>
      </div>
    </NuxtLayout>
  </UApp>
</template>

<style scoped>
.error-page {
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-block: 6rem;
  gap: 1rem;
}
h1 {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
}
.descripcion {
  color: var(--ink-soft);
  max-width: 50ch;
  margin-bottom: 1rem;
}
.btn-stack {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
