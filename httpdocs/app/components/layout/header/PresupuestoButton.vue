<script setup>
const { count } = usePresupuesto();
</script>

<template>
  <NuxtLink to="/presupuesto" class="presupuesto-header-btn" aria-label="Ver mi presupuesto">
    <span v-if="count > 0" class="presupuesto-header-badge">{{ count }}</span>
    <Icon name="lucide:file-text" size="1.15rem" />
  </NuxtLink>
</template>

<style scoped>
.presupuesto-header-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: color 0.2s;
}
.presupuesto-header-btn:hover {
  color: var(--accent);
}

.presupuesto-header-badge {
  position: absolute;
  top: 0;
  right: 0;
  min-width: 16px;
  height: 16px;
  padding: 0 3px;
  border-radius: 8px;
  background: var(--accent);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.62rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #fff;
}
</style>
