<script setup>
const { rightPos, bodyPos } = defineProps({
  rightPos: {
    type: Boolean,
    required: false,
    default: false,
  },
  bodyPos: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<template>
  <NuxtLink
    to="/contacto"
    class="items-center [font-family:var(--mono)] text-[13px] font-semibold uppercase tracking-[0.03em] bg-(--ink) text-white! px-5 whitespace-nowrap transition-[transform,box-shadow] duration-200 hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(18,40,76,0.28)]"
    :class="rightPos ? 'rightPos' : bodyPos ? 'bodyPos' : ''"
  >
    Pedir presupuesto
  </NuxtLink>
</template>

<style scoped>
.rightPos {
  display: inline-flex;
  padding-block: 0.7rem;
}
.bodyPos {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  padding-block: 0.75rem;
}
/* Se oculta en la barra superior en cuanto el header pasa a modo menú
   desplegable (mismo breakpoint que la navegación, 2xl = 1536px): a partir
   de ahí solo vive dentro del propio menú, no duplicado también arriba. */
@media (width < 1536px) {
  .rightPos {
    display: none;
  }
}
</style>
