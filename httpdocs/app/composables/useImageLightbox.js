const isOpen = ref(false);
const src = ref(null);
const alt = ref("");

export function useImageLightbox() {
  function open(imgSrc, imgAlt = "") {
    if (!imgSrc) return;
    src.value = imgSrc;
    alt.value = imgAlt;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  return { isOpen, src, alt, open, close };
}
