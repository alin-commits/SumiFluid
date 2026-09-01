<script setup>
const searchOpen = ref(false);

function toggleSearch() {
  searchOpen.value = !searchOpen.value;
}
</script>

<template>
  <UHeader
    :ui="{
      root: 'sticky top-0 z-[100] h-(--nav-h) bg-[rgba(244,245,243,0.92)] backdrop-blur-md border-b border-[color:var(--line)]',
      left: 'flex-shrink-0',
    }"
  >
    <template #left>
      <NuxtLink to="/" class="flex items-center">
        <NuxtImg
          src="/images/logo-sumifluid.png"
          alt="Sumifluid"
          loading="lazy"
          height="19"
        />
      </NuxtLink>
    </template>

    <LayoutHeaderNavigation :top-pos="true" />

    <template #right>
      <div class="flex items-center gap-4">
        <LayoutHeaderSearchButton
          :search-open="searchOpen"
          @toggle-search="toggleSearch"
        />
        <LayoutHeaderButton :right-pos="true" />
      </div>
    </template>

    <template #body>
      <LayoutHeaderNavigation />

      <LayoutHeaderButton :body-pos="true" />
    </template>
  </UHeader>

  <LayoutHeaderSearch v-model:open="searchOpen" />
</template>
