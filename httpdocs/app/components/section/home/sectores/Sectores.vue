<script setup>
defineProps({
  label: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
  },
  icon: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="sector-tile">
    <NuxtImg
      :class="preview ? '' : 'self-center'"
      :src="icon"
      :alt="label"
      loading="lazy"
      width="44"
      height="44"
    />
    <h4 class="font-semibold" :class="preview ? '' : 'text-center text-sm'">
      {{ label }}
    </h4>
    <p v-if="preview">{{ preview }}</p>
  </div>
</template>

<style scoped>
.sector-tile {
  background: var(--bg-2);
  padding: 1.6rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.sector-tile img {
  object-fit: contain;
}
</style>
