<script setup>
const { isOpen, src, alt, close } = useImageLightbox();

function handleKeydown(e) {
  if (e.key === "Escape") close();
}

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<template>
  <Transition name="lightbox-fade">
    <div v-if="isOpen" class="lightbox-overlay" @click="close">
      <button type="button" class="lightbox-close" aria-label="Cerrar" @click="close">
        <Icon name="lucide:x" />
      </button>
      <img :src="src" :alt="alt" class="lightbox-image" @click.stop />
    </div>
  </Transition>
</template>

<style scoped>
.lightbox-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  background: rgba(10, 14, 20, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  cursor: zoom-out;
}

.lightbox-image {
  max-width: min(90vw, 900px);
  max-height: 85vh;
  object-fit: contain;
  background: #fff;
  cursor: default;
}

.lightbox-close {
  position: fixed;
  top: 1.2rem;
  right: 1.2rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.2s;
}
.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.2s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}
</style>
