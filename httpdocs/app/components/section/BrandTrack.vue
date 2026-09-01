<script setup>
const { get, getMediaUrl } = useStrapi();

const { data } = await get("marcas", {
  query: {
    "populate[logo]": true,
    pagination: {
      pageSize: 100,
    },
  },
});
const marcas = computed(() => data.value?.data ?? []);
</script>

<template>
  <UMarquee
    reverse
    pauseOnHover
    :overlay="false"
    :ui="{ root: '[--duration:100s]' }"
    class="brand-marquee border-y border-gray-200 py-6 bg-white"
  >
    <NuxtLink
      v-for="(marca, index) in marcas"
      :key="`${marca.nombre}-${index}`"
      :to="`/marcas/${marca.slug}`"
    >
      <NuxtImg
        :src="
          getMediaUrl(
            marca.logo?.formats?.thumbnail?.url ??
              marca.logo?.url ??
              `/images/placeholder.png`,
          )
        "
        :alt="marca.nombre"
        loading="lazy"
        :height="marca.logo?.formats?.thumbnail?.height ?? 50"
        :width="marca.logo?.formats?.thumbnail?.width ?? 100"
        fit="contain"
      />
    </NuxtLink>
  </UMarquee>
</template>

<style scoped>
.brand-marquee {
  & img {
    filter: grayscale(1) opacity(0.55);
    transition: filter 0.25s;
    height: 50px;
    width: 100px;

    &:hover {
      filter: grayscale(0) opacity(1);
    }
  }
}
</style>
