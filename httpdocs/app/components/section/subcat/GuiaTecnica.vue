<script setup>
const props = defineProps({
  subcategoria: {
    type: Object,
    required: true,
  },
});
const articulo = computed(() => getArticulo(props.subcategoria.nombre));
const verbo = computed(() =>
  props.subcategoria.nombre.endsWith("s") ? "son" : "es",
);
const titulo = computed(() => props.subcategoria.nombre.toLowerCase());
</script>

<template>
  <div class="wrap reveal">
    <div>
      <div>
        <h3>Especialistas en {{ titulo }} de todo tipo</h3>
        <p>
          {{ subcategoria.descripcionExtra }}
        </p>
      </div>
    </div>
    <div>
      <div>
        <h3>Tipos de {{ titulo }} para cualquier solución</h3>
        <p>
          En Sumifluid contamos con todo tipo de suministro industrial y
          {{ articulo }} {{ titulo }} no {{ verbo }} menos, ya que disponemos de
          diferentes tipos de {{ titulo }} de alta calidad:
        </p>
      </div>

      <ul>
        <li v-for="tipo in subcategoria.tipos" :key="tipo">
          <Icon name="lucide:arrow-right" size="0.78rem" />
          <span>{{ tipo.item }}</span>
        </li>
      </ul>
    </div>
    <div>
      <div>
        <h3>Características de {{ articulo }} {{ titulo }} de Sumifluid</h3>
        <p>
          Dentro de nuestro catálogo contamos con {{ titulo }} con
          características diferenciadoras respecto a lo que puede encontrar en
          el mercado. Estas son las características principales y algunos
          consejos para nuestros productos:
        </p>
      </div>

      <ul>
        <li
          v-for="caracteristica in subcategoria.caracteristicas"
          :key="caracteristica"
        >
          <Icon name="lucide:arrow-right" size="0.78rem" />
          <span>{{ caracteristica.item }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.1rem;
  margin-bottom: 0.8rem;
  padding-left: 0.9rem;
  border-left: 3px solid var(--accent);
}
p {
  font-size: 0.94rem;
  line-height: 1.65;
  color: var(--ink-soft);
  margin-bottom: 1.1rem;
}
ul {
  border: 1px solid var(--line);
  background: var(--line);
  display: flex;
  flex-direction: column;
  gap: 1px;
}
li {
  list-style: none;
  margin: 0;
  background: var(--bg-2);
  padding: 0.7rem 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: var(--ink);

  & .iconify {
    color: var(--accent);
  }
}

.wrap {
  & > div {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &:first-child {
      grid-area: especialistas;
      width: 90%;
    }
    &:nth-child(2) {
      grid-area: tipos;
    }
    &:last-child {
      grid-area: caracteristicas;
    }
  }

  display: grid;
  align-items: stretch;
  grid-template-areas:
    "especialistas especialistas"
    "tipos caracteristicas";
  grid-template-columns: 45% 55%;
  gap: 2rem;

  @media (max-width: 920px) {
    grid-template-areas:
      "especialistas"
      "tipos"
      "caracteristicas";
    grid-template-columns: 1fr;
  }
}
</style>
