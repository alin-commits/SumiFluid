<script setup>
const props = defineProps({
  subcatNombre: {
    type: String,
    required: true,
  },
  faqs: {
    type: Array,
    required: true,
  },
});

const accordionItems = computed(() =>
  (props.faqs ?? []).filter(Boolean).map((faq, index) => ({
    label: faq?.titulo ?? `Pregunta ${index + 1}`,
    content: faq?.contenido ?? "",
  })),
);
</script>
<template>
  <div class="wrap">
    <div class="container">
      <h2>Preguntas frecuentes sobre {{ subcatNombre }}</h2>
      <UAccordion
        :items="accordionItems"
        :ui="{
          trigger: [
            'py-5 text-[var(--ink)]',
            'hover:text-[var(--accent)]',
            'data-[state=open]:text-[var(--accent)]',
          ],
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 4rem 0;

  & h2 {
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    margin-bottom: 2rem;
  }
}
.acc-header {
  font-size: 1.1rem;
  color: var(--ink-soft);
  padding: 0;

  &:hover {
    color: var(--ink-mute);
  }
}
.acc-content {
  padding: 1rem 2rem 0 0;
}
</style>
