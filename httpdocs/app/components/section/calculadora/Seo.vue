<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
  },
  parrafos: {
    type: Array,
    required: true,
  },
  faqs: {
    type: Array,
    default: () => [],
  },
  enlaces: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <div class="calc-seo">
    <h2>{{ titulo }}</h2>
    <p v-for="(parrafo, index) in parrafos" :key="index">{{ parrafo }}</p>

    <ul v-if="enlaces.length" class="calc-seo-enlaces">
      <li v-for="enlace in enlaces" :key="enlace.to">
        <NuxtLink :to="enlace.to">{{ enlace.label }}</NuxtLink>
      </li>
    </ul>

    <div v-if="faqs.length" class="calc-seo-faqs">
      <div v-for="faq in faqs" :key="faq.pregunta" class="calc-seo-faq">
        <p class="calc-seo-faq-pregunta">{{ faq.pregunta }}</p>
        <p class="calc-seo-faq-respuesta">{{ faq.respuesta }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calc-seo {
  max-width: 80ch;

  h2 {
    font-size: clamp(1.4rem, 2.6vw, 1.9rem);
    font-weight: 800;
    margin-bottom: 1.1rem;
  }

  p {
    color: var(--ink-soft);
    line-height: 1.7;
    margin-bottom: 1rem;
  }
}

.calc-seo-enlaces {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1.5rem;
  margin: 1.5rem 0;
  padding: 1.2rem 1.4rem;
  background: var(--bg-2);

  & li {
    list-style: none;
  }

  & a {
    font-family: var(--mono);
    font-size: 0.85rem;
    color: var(--ink);
  }
  & a:hover {
    color: var(--accent);
  }
}

@media (max-width: 640px) {
  .calc-seo-enlaces {
    grid-template-columns: 1fr;
  }
}

.calc-seo-faqs {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin-top: 1.6rem;
}

.calc-seo-faq {
  border-top: 1px solid var(--line);
  padding-top: 1.2rem;
}

.calc-seo-faq-pregunta {
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.4rem;
}

.calc-seo-faq-respuesta {
  margin-bottom: 0;
}
</style>
