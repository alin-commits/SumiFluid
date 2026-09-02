<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
  },
  formulaTexto: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <NuxtLink
    class="calc-card"
    :to="`/herramientas-calculo/${slug}`"
    :aria-label="`Abrir calculadora: ${titulo}`"
  >
    <Icon name="lucide:calculator" class="calc-card-icon" />
    <h3>{{ titulo }}</h3>
    <p class="mono">{{ formulaTexto }}</p>
    <div class="calc-card-link mono">
      Calcular
      <span class="calc-card-link-icon">
        <Icon name="lucide:arrow-right" />
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.calc-card {
  background: var(--bg-2);
  padding: 1.8rem 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: background 0.2s;
}
.calc-card:hover {
  background: #fbf2df;
}
.calc-card-icon {
  font-size: 1.6rem;
  color: var(--accent);
  margin-bottom: 0.4rem;
}
.calc-card h3 {
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
}
.calc-card p {
  font-size: 0.78rem;
  color: var(--ink-soft);
}
.calc-card-link {
  margin-top: 0.6rem;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--ink);
  transition: color 0.25s var(--ease);
}
.calc-card-link-icon {
  display: inline-flex;
  transition: transform 0.25s var(--ease);
}
.calc-card:hover .calc-card-link {
  color: var(--accent);
}
.calc-card:hover .calc-card-link-icon {
  transform: translateX(4px);
}
</style>
