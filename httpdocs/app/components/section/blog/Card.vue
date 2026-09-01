<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <div class="card">
    <div class="img-container">
      <NuxtImg
        :src="imagen"
        :alt="titulo"
        loading="lazy"
        width="350"
        height="250"
      />
    </div>
    <div class="card-body">
      <p>{{ fecha }}</p>
      <h3>{{ titulo }}</h3>
    </div>
    <div class="card-footer" :aria-label="`Ver articulo`">
      Leer más
      <span class="link-icon">
        <Icon name="lucide:arrow-right" />
      </span>
    </div>
  </div>
</template>
<style scoped>
.img-container {
  overflow: hidden;
  height: 200px;
  flex-shrink: 0;
}
.img-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease);
  filter: saturate(1.05);
}
.card {
  padding: 1.6rem;
  background: var(--bg);
  height: 100%;
  display: flex;
  flex-direction: column;
  /* justify-content: space-around; */
  border: 1px solid #dfe1e4ff;
  box-shadow:
    0px 2px 4px #0a1a3314,
    0px 0px 0px #171a1f00;
}

.card:hover .img-container img {
  transform: scale(1.06);
}

.card-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-block: 1.5rem;
  & h3 {
    font-size: 1.2rem;
    margin-top: 0.6rem;
    color: var(--ink);
  }
  & p {
    color: var(--ink-soft);
    font-size: 0.9rem;
  }
}
.card-footer {
  margin-top: auto;
  flex: 0 0 3rem;
  font-family: var(--mono);
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: var(--accent);
  padding: 0;
  border: 0;
  transition:
    transform 0.25s var(--ease),
    color 0.25s var(--ease);
}
.card-footer:hover {
  transform: translateX(2px);
}
.link-icon {
  display: inline-flex;
  transition: transform 0.25s var(--ease);
}
</style>
