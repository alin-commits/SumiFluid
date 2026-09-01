<script setup>
defineProps({
  categorias: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <section
    class="hero-carousel"
    aria-roledescription="carousel"
    aria-label="Áreas de especialización Sumifluid"
  >
    <h1 class="sr-only">
      Sumifluid — suministros de hidráulica, neumática, estanqueidad y vacío en
      Elche
    </h1>
    <SectionHomeHeroCarousel
      class="hc-slide is-active"
      :categorias="categorias"
    />
    <SectionHomeHeroStats />
  </section>
</template>
