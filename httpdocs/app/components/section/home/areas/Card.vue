<script setup>
defineProps({
  id: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  productos_breve: {
    type: String,
    required: true,
  },
  imagen: {
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
    class="cat-card"
    :to="`/${slug}`"
    :aria-label="`Ver componentes de ${titulo}`"
  >
    <NuxtImg
      :src="imagen"
      :alt="`Componentes de ${titulo} industrial`"
      loading="lazy"
      width="350"
      height="450"
    />
    <div class="cat-card-body">
      <span class="cat-index mono">0{{ id }}</span>
      <h3 class="font-semibold text-[1.6rem] mbe-2">{{ titulo }}</h3>
      <p>{{ productos_breve }}</p>
      <div class="cat-link font-mono">
        Ver componentes
        <span class="cat-link-icon">
          <Icon name="lucide:arrow-right" />
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped>
.cat-card {
  position: relative;
  background: var(--ink);
  color: #fff;
  aspect-ratio: 4/5;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.cat-card-hitarea {
  display: none;
}
.cat-card img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.55;
  transition:
    transform 0.6s var(--ease),
    opacity 0.3s;
}
.cat-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(14, 18, 24, 0.15) 0%,
    rgba(14, 18, 24, 0.92) 88%
  );
  z-index: 1;
}
.cat-card-body {
  position: relative;
  z-index: 2;
  padding: 1.6rem;
}
.cat-index {
  font-family: var(--mono);
  font-size: 0.75rem;
  color: var(--accent);
  display: block;
  margin-bottom: 0.5rem;
}
p {
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1rem;
}
.cat-link {
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  color: #fff;
  padding: 0;
  border: 0;
  transition:
    transform 0.25s var(--ease),
    color 0.25s var(--ease);
}

.cat-link-icon {
  display: inline-flex;
  transition: transform 0.25s var(--ease);
}
.cat-card:hover {
  & .cat-link {
    transform: translateY(-2px);
    color: var(--accent);
  }
  & .cat-link-icon {
    transform: translateX(4px);
  }
  & img {
    transform: scale(1.08);
    opacity: 0.4;
  }
}

@media (max-width: 980px) {
  .cat-card-hitarea {
    display: block;
    position: absolute;
    inset: 0;
    z-index: 3;
  }
}
</style>
