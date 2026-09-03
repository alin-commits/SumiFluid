<script setup>
const searchOpen = ref(false);

function toggleSearch() {
  searchOpen.value = !searchOpen.value;
}

const { get } = useStrapi();
const { data: empresa } = await get("empresa");
const telNoSpaces = computed(
  () => empresa.value?.data.telefonoPrincipalNoSpaces,
);
const { public: publicConfig } = useRuntimeConfig();
</script>

<template>
  <UHeader
    :ui="{
      root: 'sticky top-0 z-[100] h-(--nav-h) bg-[rgba(244,245,243,0.92)] backdrop-blur-md border-b border-[color:var(--line)]',
      container: 'px-3 sm:px-3 lg:px-4',
      left: 'flex-shrink-0 me-6 lg:me-10',
      center: 'hidden 2xl:flex 2xl:flex-1',
      right: 'flex-shrink-0',
      toggle: '2xl:hidden',
    }"
  >
    <template #left>
      <NuxtLink to="/" class="flex items-center header-group-logo">
        <NuxtImg
          src="/images/logo-sumifluid.png"
          alt="Sumifluid"
          loading="lazy"
          height="19"
          class="header-logo"
        />
      </NuxtLink>
    </template>

    <div class="header-group-nav">
      <LayoutHeaderNavigation :top-pos="true" />
    </div>

    <template #right>
      <div class="header-group-actions">
        <LayoutHeaderSearchButton
          :search-open="searchOpen"
          @toggle-search="toggleSearch"
        />
        <LayoutHeaderPresupuestoButton v-if="publicConfig.presupuestoEnabled" />
        <LayoutHeaderButton :right-pos="true" />
      </div>
    </template>

    <template #body>
      <LayoutHeaderNavigation />

      <a v-if="telNoSpaces" :href="`tel:+34${telNoSpaces}`" class="header-mobile-call">
        <Icon name="lucide:phone" />
        Llamar por teléfono
      </a>

      <LayoutHeaderButton :body-pos="true" />
    </template>
  </UHeader>

  <LayoutHeaderSearch v-model:open="searchOpen" />
</template>

<style scoped>
.header-logo {
  height: 19px;
  width: auto;
}
@media (max-width: 480px) {
  .header-logo {
    height: 15px;
  }
}

/* Los 3 grupos del header: logo | enlaces | acciones (buscar, presupuesto, CTA) */
.header-group-nav {
  display: flex;
  align-items: center;
  width: 100%;
}

.header-group-actions {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding-left: 0.9rem;
  margin-left: 0.3rem;
  border-left: 1px solid var(--line);
}
@media (max-width: 640px) {
  .header-group-actions {
    padding-left: 0.5rem;
    margin-left: 0;
    gap: 0.5rem;
  }
}

.header-mobile-call {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 1rem;
  padding: 0.85rem 1rem;
  border: 1px solid var(--line);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
}
</style>
