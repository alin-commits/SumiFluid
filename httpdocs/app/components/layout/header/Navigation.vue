<script setup>
const { get } = useStrapi();
const { data } = await get("categorias");
const categorias = computed(() => data.value?.data ?? []);

const { topPos } = defineProps({
  topPos: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const route = useRoute();

const navigationItems = computed(() => [
  ...[...categorias.value]
    .sort((a, b) => Number(a.posicion) - Number(b.posicion))
    .map((cat) => ({
      label: cat.nombre,
      to: `/${cat.slug}`,
      active: route.path === `/${cat.slug}`,
    })),
  {
    label: "Marcas",
    to: "/marcas",
    active: route.path.startsWith("/marcas"),
  },
  {
    label: "Blog",
    to: "/blog",
    active: route.path.startsWith("/blog"),
  },
  {
    label: "Contacto",
    to: "/contacto",
    active: route.path.startsWith("/contacto"),
  },
]);

const baseLinkClasses =
  "[font-family:var(--mono)] uppercase tracking-[0.03em] !text-[color:var(--ink-soft)] hover:!text-[color:var(--ink)] focus:!text-[color:var(--ink)] transition-colors duration-200";
</script>

<template>
  <UNavigationMenu
    :items="navigationItems"
    :orientation="topPos ? 'horizontal' : 'vertical'"
    color="primary"
    variant="link"
    :highlight="topPos"
    :highlight-color="topPos ? 'warning' : undefined"
    :class="topPos ? 'hidden lg:flex' : '-mx-2.5'"
    :ui="
      topPos
        ? {
            list: 'gap-[1.5rem]',
            item: 'py-1.5',
            link: `${baseLinkClasses} text-[13px] px-0 py-1 after:-bottom-1 after:h-[2px] after:inset-x-0 hover:after:bg-warning`,
          }
        : {
            link: `${baseLinkClasses} text-[0.95rem] py-4 border-b border-[color:var(--line-soft)] after:-start-1 after:w-[3px] hover:after:bg-warning`,
          }
    "
  />
</template>
