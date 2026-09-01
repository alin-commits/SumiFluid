<script setup>
defineProps({
  subcategoria: {
    type: String,
    required: true,
  },
});

const sectionRef = ref(null);
useRevealObserver(sectionRef);
</script>

<template>
  <section ref="sectionRef" class="reveal">
    <div class="wrap">
      <p class="kicker">Por qué comprarlo en Sumifluid</p>
      <h2>{{ subcategoria }} con garantía de suministro</h2>
      <div class="content">
        <div>
          <p class="kicker">Stock permanente</p>
          <p class="tile-name">
            Referencia disponible en nuestro almacén de Elche para envío
            inmediato.
          </p>
        </div>
        <div>
          <p class="kicker">Asesoramiento técnico</p>
          <p class="tile-name">
            Equipo especializado que le ayuda a elegir la referencia exacta.
          </p>
        </div>
        <div>
          <p class="kicker">Envíos 24/48h</p>
          <p class="tile-name">
            Cobertura a toda la península desde nuestro almacén en Elche.
          </p>
        </div>
        <div>
          <p class="kicker">Fabricación a medida</p>
          <p class="tile-name">
            Si no está en catálogo, lo diseñamos en nuestro taller propio.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background-color: var(--bg-2);
  border-block: 1px solid var(--line);
}
.wrap {
  padding-block: 2rem;
}
h2 {
  font-size: clamp(1.4rem, 2.6vw, 1.9rem);
  margin-bottom: 1.4rem;
  font-weight: 700;
}
.content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  & > div {
    padding: 1rem;
    cursor: default;
    display: flex;
    flex-direction: column;
    transition: background 0.2s;

    & .tile-name {
      font-size: 0.86rem;
      font-weight: 600;
    }
    &:hover {
      background-color: #fbf2df;
    }
  }
}
@media (max-width: 980px) {
  .content {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 620px) {
  .content {
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;
  }
}
.tile-arrow {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--ink-mute);
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
</style>
