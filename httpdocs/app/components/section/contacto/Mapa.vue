<script setup>
const props = defineProps({
  mapaSrc: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div>
    <iframe
      title="Mapa Sumifluid Elche"
      width="100%"
      height="100%"
      style="border: 0; display: block"
      loading="lazy"
      :src="mapaSrc"
    ></iframe>
  </div>
</template>

<style scoped>
div {
  border: 1px solid var(--line);
  aspect-ratio: 16/6;
  overflow: hidden;
}
</style>
