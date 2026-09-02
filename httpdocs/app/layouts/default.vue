<template>
  <div>
    <LayoutHeader />
    <slot />
    <LayoutFooter />
    <LayoutFabs class="fab-stack" />
    <LayoutCookieBanner />
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
