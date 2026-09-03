<script setup>
const { public: publicConfig } = useRuntimeConfig();
</script>

<template>
  <div>
    <LayoutHeader />
    <slot />
    <LayoutFooter />
    <LayoutFabs class="fab-stack" />
    <LayoutChatPanel />
    <LayoutPresupuestoPanel v-if="publicConfig.presupuestoEnabled" />
    <LayoutCookieBanner />
    <LayoutImageLightbox />
  </div>
</template>

<style scoped>
.fab-stack {
  position: fixed;
  right: 1.4rem;
  bottom: 1.4rem;
  z-index: 90;
}
</style>
