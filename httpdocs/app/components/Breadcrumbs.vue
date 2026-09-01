<script setup>
const route = useRoute();

const formatLabel = (value) =>
  value.replace(/[-_]/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const slug = computed(() => {
  const rawSlug = route.query.slug;
  return Array.isArray(rawSlug) ? rawSlug[0] : rawSlug || "";
});

const breadcrumbs = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  const items = [{ label: "Inicio", to: "/" }];

  let currentPath = "";
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    items.push({
      label: formatLabel(segment),
      to: currentPath,
      active: isLast && !slug.value,
    });
  });

  if (slug.value) {
    items.push({
      label: formatLabel(slug.value),
      to: route.fullPath,
      active: true,
    });
  }
  return items;
});
</script>

<template>
  <UBreadcrumb
    :items="breadcrumbs"
    class="font-mono text-sm text-[(--ink-mute)] px-4 py-6"
    :ui="{
      link: 'hover:!text-[var(--accent)] aria-[current=page]:!font-normal aria-[current=page]:!underline',
    }"
  >
    <template #separator>
      <span class="mx-2 text-muted">/</span>
    </template>
  </UBreadcrumb>
</template>
