<script setup>
const stripRef = ref(null);
const foundedYear = 2007;
const currentYear = useState("current-year", () => new Date().getFullYear());

const items = ref([
  {
    text: "Años de experiencia",
    value: currentYear.value - foundedYear - 1,
    suffix: "+",
  },
  { text: "Referencias en stock", value: 5000, suffix: "+" },
  { text: "Envíos península", value: 24, suffix: "h" },
  { text: "Marcas representadas", value: 40, suffix: "+" },
]);

const { displayValues: displayValores } = useCountUp(items.value, {
  duration: 1400,
  stagger: 180,
  target: stripRef,
});
</script>

<template>
  <div class="border-t-5 border-(--accent)">
    <div ref="stripRef" class="hero-strip wrap">
      <div v-for="(item, index) in items" :key="item.text">
        <strong>{{ displayValores[index] }} {{ item.suffix }}</strong>
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  div {
    padding: 1.4rem 1.8rem;
    border-right: 1px solid var(--line);
    font-family: var(--mono);
    font-size: 0.78rem;
    color: var(--ink-mute);
  }
  div:last-child {
    border-right: none;
  }

  strong {
    display: block;
    font-size: 1.6rem;
    color: var(--ink);
    font-family: var(--sans);
    font-weight: 800;
  }
}

@media (max-width: 720px) {
  .hero-strip {
    grid-template-columns: repeat(2, 1fr);
    div:nth-child(2n) {
      border-right: none;
    }
    div:nth-child(-n + 2) {
      border-bottom: 1px solid var(--line);
    }
  }
}
</style>
