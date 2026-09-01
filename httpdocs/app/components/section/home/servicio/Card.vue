<script setup>
defineProps({
  titulo: {
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  descripcion: {
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
  <div class="svc-card">
    <div class="svc-img">
      <NuxtImg
        :src="imagen"
        :alt="preview"
        loading="lazy"
        width="450"
        height="300"
      />
    </div>
    <div class="svc-body">
      <p class="kicker" style="margin-bottom: 0.4rem">{{ titulo }}</p>
      <h3>{{ preview }}</h3>
      <p>{{ descripcion }}</p>
    </div>
  </div>
</template>
<style scoped>
.svc-img {
  aspect-ratio: 16/10;
  overflow: hidden;
}
.svc-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s var(--ease);
  filter: saturate(1.05);
}
.svc-card {
  background: var(--bg-2);
  position: relative;
  cursor: default;
}

.svc-card:hover .svc-img img {
  transform: scale(1.06);
}

.svc-body {
  padding: 1.6rem;
}
.svc-body .kicker {
  margin-bottom: 0.7rem;
}
.svc-body h3 {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}
.svc-body p {
  color: var(--ink-soft);
  font-size: 0.92rem;
}
</style>
