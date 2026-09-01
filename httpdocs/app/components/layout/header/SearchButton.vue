<script setup>
defineProps({
  searchOpen: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["toggle-search"]);
</script>

<template>
  <UButton
    :icon="searchOpen ? 'i-lucide-x' : 'i-lucide-search'"
    color="neutral"
    variant="ghost"
    square
    :aria-label="searchOpen ? 'Cerrar búsqueda' : 'Buscar'"
    :aria-expanded="searchOpen"
    @click="$emit('toggle-search')"
  />
</template>
