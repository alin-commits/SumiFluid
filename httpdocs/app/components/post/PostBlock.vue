<script setup>
const props = defineProps({
  block: {
    type: Object,
    required: true,
  },
});

const { getMediaUrl } = useStrapi();
</script>

<template>
  <div class="strapi-block">
    <!-- Componente de texto -->
    <div v-if="block.__component === 'shared.text'" class="text-block">
      <StrapiBlocksText :nodes="block.texto" />
    </div>

    <!-- Componente de imagen -->
    <div v-else-if="block.__component === 'shared.imagen'" class="image-block">
      <NuxtImg
        v-if="block.imagen"
        :src="getMediaUrl(block.imagen?.url)"
        :alt="block.imagen?.alternativeText || 'Imagen del post'"
        loading="lazy"
        class="post-image"
      />
    </div>

    <!-- Componente de galería de imágenes -->
    <div
      v-else-if="block.__component === 'shared.galeria-imagenes'"
      class="gallery-block"
    >
      <div class="gallery-grid">
        <NuxtImg
          v-for="imagen in block.galeriaImagenes"
          :key="imagen.id"
          :src="getMediaUrl(imagen?.url)"
          :alt="imagen?.alternativeText || 'Imagen de galería'"
          loading="lazy"
          class="gallery-image"
        />
      </div>
    </div>

    <!-- Componente de tabla -->
    <div v-else-if="block.__component === 'shared.tabla'" class="table-block">
      <div class="table-wrapper">
        <table v-if="block.tabla && block.tabla.columns && block.tabla.rows">
          <thead>
            <tr>
              <th v-for="(column, idx) in block.tabla.columns" :key="idx">
                {{ column.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIdx) in block.tabla.rows" :key="rowIdx">
              <td v-for="(cell, cellIdx) in row" :key="cellIdx">
                {{ cell }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.strapi-block {
  margin-bottom: 1.5rem;
}

.text-block {
  line-height: 1.7;
}

.text-block :deep(h2) {
  color: var(--accent);
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.text-block :deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.text-block :deep(p) {
  margin-bottom: 1rem;
}

.text-block :deep(ul),
.text-block :deep(ol) {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
}

.text-block :deep(li) {
  margin-bottom: 0.5rem;
}

.text-block :deep(strong) {
  font-weight: 600;
}

.text-block :deep(a) {
  color: var(--accent);
  text-decoration: underline;
}

.image-block {
  margin: 2rem 0;
}

.post-image {
  width: 100%;
  height: auto;
  border-radius: 0.5rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
}

.gallery-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.table-wrapper {
  overflow-x: auto;
  margin: 2rem 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--line);
  border-radius: 0.5rem;
  overflow: hidden;
}

th,
td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border: 1px solid var(--line);
}

th {
  font-weight: 600;
  font-size: 0.875rem;
  background: var(--line-soft);
}

tbody tr:hover {
  background: var(--line-soft);
}
</style>
