<script setup>
const { getMediaUrl } = useStrapi();

const props = defineProps({
  categoriaSlug: {
    type: String,
    required: true,
  },
  subcategorias: {
    type: Array,
    default: () => [],
  },
  moreGap: {
    type: Boolean,
    default: false,
  },
});

const sortedSubcategorias = computed(() =>
  [...props.subcategorias].sort((a, b) => a.nombre.localeCompare(b.slug)),
);
</script>

<template>
  <div class="fam-list">
    <NuxtLink
      v-for="subcategoria in sortedSubcategorias"
      :key="subcategoria.slug"
      class="fam-row"
      :to="`/${categoriaSlug}/${subcategoria.slug}`"
      :aria-label="`Ver ${subcategoria.nombre}`"
      :style="moreGap ? { gap: '2rem' } : {}"
    >
      <span class="fam-row-arrow">
        <Icon name="lucide:arrow-right" size="0.95rem" />
      </span>

      <span class="fam-row-thumb">
        <NuxtImg
          :src="
            getMediaUrl(
              subcategoria.logo?.formats?.thumbnail?.url ??
                subcategoria.imagen?.formats?.thumbnail?.url ??
                subcategoria.logo?.url ??
                subcategoria.imagen?.url ??
                `/images/placeholder.png`,
            )
          "
          :alt="subcategoria.nombre"
          fit="cover"
          loading="lazy"
          :height="subcategoria.imagen?.formats?.thumbnail?.height ?? 42"
          :width="subcategoria.imagen?.formats?.thumbnail?.width ?? 42"
        />
      </span>
      <span class="fam-row-name">{{ subcategoria.nombre }}</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.fam-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}
.fam-row-name {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--ink);
  line-height: 1.25;
}
@media (max-width: 760px) {
  .fam-list {
    grid-template-columns: 1fr;
  }
}
.fam-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 1.1rem;
  background: var(--bg-2);
  transition: background 0.2s;

  &:hover {
    background: #fbf2df;
    & .fam-row-arrow {
      transform: translateX(4px);
    }
  }
  & .fam-row-arrow {
    color: var(--accent);
    flex-shrink: 0;
    transition: transform 0.2s var(--ease);
  }
}
.fam-row-thumb {
  height: 42px;
  width: auto;
  flex-shrink: 0;
  overflow: hidden;
  background: var(--bg);
  display: flex;
  align-items: center;
  justify-content: center;

  &.is-mono {
    background: var(--ink);

    & span {
      font-family: var(--mono);
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--accent);
    }
  }

  & img {
    width: 100%;
    height: 100%;
  }
}
</style>
