<script setup>
const { getMediaUrl } = useStrapi();

defineProps({
  titulo: {
    type: String,
    required: true,
  },
  imagen: {
    type: Object,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <NuxtLink class="tile" :to="`/${slug}`" :aria-label="`Ver ${titulo}`">
    <div class="tile-thumb">
      <NuxtImg
        :src="
          getMediaUrl(
            imagen?.formats?.small?.url ??
              imagen?.url ??
              '/images/placeholder.png',
          )
        "
        :alt="titulo"
        loading="lazy"
        :height="imagen?.formats?.small?.height ?? 250"
        :width="imagen?.formats?.small?.width ?? 250"
        fit="cover"
      />
    </div>
    <span class="tile-name">{{ titulo }}</span>
    <div class="tile-link">
      <span class="tile-arrow"
        >Ver más <Icon name="lucide:arrow-right" />
      </span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.tile {
  background: var(--bg-2);
  padding: 1.4rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  transition: background 0.2s;
}
.tile:hover {
  background: #fbf2df;
}
.tile-thumb {
  width: 100%;
  aspect-ratio: 1/1;
  background: var(--bg);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 250px;
    max-height: 250px;
    width: 100%;
    object-fit: cover;
    filter: grayscale(0.1) contrast(1.02);
    transition: transform 0.5s var(--ease);
  }
}
.tile:hover .tile-thumb img {
  transform: scale(1.07);
}
.tile-name {
  font-size: 0.86rem;
  font-weight: 600;
  line-height: 1.3;
}
.tile-arrow {
  font-family: var(--mono);
  font-size: 0.72rem;
  color: var(--ink-mute);
  display: inline-flex;
  transition: transform 0.25s var(--ease);
  align-items: center;
  gap: 0.3rem;
}
a:hover .tile-arrow {
  color: var(--accent);
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
