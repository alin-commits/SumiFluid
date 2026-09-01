<script setup>
const props = defineProps({
  numSectores: {
    type: Number,
    default: null,
  },
  isDark: {
    type: Boolean,
    default: false,
  },
});

const statsRef = ref(null);
const foundedYear = 2007;
const currentYear = useState("current-year", () => new Date().getFullYear());

const items = computed(() => [
  {
    text: "Años operando",
    value: currentYear.value - foundedYear - 1,
    suffix: "+",
  },
  { text: "Sectores atendidos", value: props.numSectores || "", suffix: "" },
  { text: "Refs. en stock", value: 5000, suffix: "+" },
  { text: "Taller propio", value: 1, suffix: "" },
  { text: "Provincias atendidas", value: 4, suffix: "" },
]);

const { displayValues } = useCountUp(items.value, {
  duration: 1400,
  stagger: 180,
  target: statsRef,
});
</script>

<template>
  <div
    ref="statsRef"
    class="col-span-7 reveal"
    style="background: transparent; padding-right: 0"
  >
    <div class="stat-grid" :class="{ 'is-dark': isDark }">
      <div
        v-for="(item, index) in items"
        :key="item.text"
        :class="{ 'is-dark': isDark }"
      >
        <span>{{ item.text }}</span>
        <strong>{{ displayValues[index] }}{{ item.suffix }} </strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(120px, 1fr));
  background: var(--line);
  border-block: 1px solid var(--line);
  gap: 1px;

  & > div {
    background: #fff;
    padding: 2rem 1.4rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > strong {
      font-size: 2.2rem;
      font-weight: 800;
      display: block;
      font-family: var(--sans);
      color: var(--ink);
    }

    & > span {
      font-family: var(--mono);
      font-size: 0.76rem;
      color: var(--ink-mute);
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
  }

  & > div.is-dark {
    background: #183463;

    & > strong {
      color: #fff;
    }
  }
  @media (max-width: 1240px) {
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    & > div {
      padding: 1.2rem 1rem;
    }
  }
  @media (max-width: 900px) {
    grid-template-columns: repeat(5, minmax(120px, 1fr));
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;

    & > div strong {
      font-size: 1.7rem;
      font-weight: 700;
    }

    & > div span {
      font-size: 0.68rem;
    }
  }

  @media (max-width: 680px) {
    grid-template-columns: repeat(3, minmax(120px, 1fr));
    & > div {
      padding: 0.8rem;
    }
  }
}
</style>
