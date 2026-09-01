<script setup>
const { get } = useStrapi();

const { data } = await get("empresa");
const telefono = computed(
  () => data.value?.data.telefonoPrincipalNoSpaces ?? "",
);

defineProps({
  id: {
    type: Number,
  },
  seccion: {
    type: Object,
    required: true,
  },
  numBotones: {
    type: Number,
    default: 2,
  },
});
</script>

<template>
  <Section
    class="section-contact"
    :id="id"
    :titulo="seccion.titulo"
    :preview="seccion.preview"
    :descripcion="seccion.descripcion"
    :center-head="true"
    :is-dark="true"
    dark-background="var(--ink)"
  >
    <div class="btn-stack">
      <Boton
        :btnSecondary="true"
        :label="numBotones === 2 ? 'pedir presupuesto' : 'Ir a contacto'"
        :enlace="'/contacto'"
        :flecha="true"
      />
      <Boton
        v-if="numBotones === 2"
        :btnGhostLight="true"
        :label="`llamar: ${telefono.replace(/(\d{3})(?=\d)/g, '$1 ')}`"
        :enlace="`tel:+34${telefono}`"
      />
    </div>
  </Section>
</template>

<style scoped>
.section-contact {
  padding-top: 4rem;
  padding-bottom: 4rem;
}
.btn-stack {
  display: flex;
  gap: 1rem;
  justify-content: center;
}
@media (max-width: 640px) {
  .section-contact {
    padding-top: 2.8rem;
    padding-bottom: 2.8rem;
  }
}
@media (max-width: 560px) {
  .btn-stack {
    flex-direction: column;
    text-align: center;
  }
}
</style>
