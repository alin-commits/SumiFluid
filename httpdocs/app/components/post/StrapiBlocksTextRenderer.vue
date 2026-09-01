<script setup>
const props = defineProps({
  content: {
    type: [Array, Object, String],
    default: null,
  },
});
</script>

<template>
  <div class="strapi-text-content">
    <StrapiBlocksText v-if="content" :content="content" />
  </div>
</template>

<style scoped>
.strapi-text-content :deep(h2) {
  color: var(--accent);
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.strapi-text-content :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.strapi-text-content :deep(p) {
  margin-bottom: 1rem;
  line-height: 1.7;
}

.strapi-text-content :deep(ul),
.strapi-text-content :deep(ol) {
  list-style: disc;
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.strapi-text-content :deep(li) {
  margin-bottom: 0.5rem;
}

.strapi-text-content :deep(strong) {
  font-weight: 600;
}

.strapi-text-content :deep(em) {
  font-style: italic;
}

.strapi-text-content :deep(a) {
  color: var(--accent);
  text-decoration: underline;
}

.strapi-text-content :deep(code) {
  font-family: var(--mono);
  background: var(--panel);
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
}

.strapi-text-content :deep(pre) {
  background: var(--panel);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.strapi-text-content :deep(blockquote) {
  border-left: 4px solid var(--accent);
  padding-left: 1rem;
  margin: 1rem 0;
  color: var(--ink-soft);
}
</style>
