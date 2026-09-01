<template>
  <div>
    <!-- deploy-test-2026-09-01 -->
    <LayoutHeader />
    <slot />
    <LayoutFooter />
    <LayoutFabs class="fab-stack" />
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
