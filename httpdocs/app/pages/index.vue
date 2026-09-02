<script setup>
const route = useRoute();
const siteConfig = useSiteConfig();

const { get, getMediaUrl } = useStrapi();
const { data: cat } = await get("categorias", {
  query: {
    populate: "*",
    populate: {
      imagen: true,
      subcategorias: {
        populate: {
          imagen: true,
        },
      },
    },
  },
});
const categorias = computed(() => cat.value?.data ?? []);

const processedCategorias = computed(() =>
  categorias.value.map((item, index) => ({
    ...item,
    id: index + 1,
  })),
);
const processedSubcategorias = computed(() => {
  const pool = categorias.value.flatMap((categoria) => {
    if (!Array.isArray(categoria.subcategorias)) return [];

    return categoria.subcategorias
      .filter((subcategoria) => subcategoria.destacado === true)
      .map((subcategoria) => ({
        ...subcategoria,
        routeSlug: `${categoria.slug}/${subcategoria.slug}`,
      }));
  });
  return pool.slice(0, 10);
});

const servicios = [
  {
    titulo: "Suministro",
    preview: "Venta de suministros industriales",
    descripcion:
      "Catálogo permanente en stock de las marcas más exigentes del sector, listo para envío en 24/48h.",
    imagen: "/images/servicios/suministro.png",
  },
  {
    titulo: "Taller",
    preview: "Reparaciones y mantenimiento",
    descripcion:
      "Fabricación de latiguillos a medida con trazabilidad por código y asistencia técnica en planta.",
    imagen: "/images/servicios/taller.png",
  },
  {
    titulo: "Ingeniería",
    preview: "Soluciones llave en mano",
    descripcion:
      "Diseño, cálculo y montaje de centrales y grupos hidráulicos a medida de cada instalación.",
    imagen: "/images/servicios/ingenieria.png",
  },
];

const sectores = [
  {
    nombre: "Naval",
    icono: "icons/icono-naval.png",
  },
  {
    nombre: "Alimentación",
    icono: "icons/icono-alimentacion.png",
  },
  {
    nombre: "Embalaje",
    icono: "icons/icono-embalaje.png",
  },
  {
    nombre: "Robótica",
    icono: "icons/icono-robotica.png",
  },
  {
    nombre: "Obra Pública",
    icono: "icons/icono-obra.png",
  },
  {
    nombre: "Calzado",
    icono: "icons/icono-calzado.png",
  },
];
const seccion = {
  titulo: "Contacto directo",
  preview: "¿Necesita componentes o asesoramiento técnico?",
  descripcion:
    "Cuéntenos su problemática de funcionamiento o mantenimiento. Respondemos con la solución más rápida y competitiva del mercado.",
};
// #region SEO
const pageTitle = siteConfig.name;
const pageDescription = siteConfig.description;
const canonicalUrl = computed(() => siteConfig.url + route.path);

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogUrl: canonicalUrl,
});

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: canonicalUrl.value,
    },
  ],
}));
// #endregion
</script>

<template>
  <main class="home-content">
    <SectionHomeHero :categorias="categorias" />

    <!-- Áreas de especialización -->
    <Section
      :id="1"
      titulo="Áreas de especialización"
      preview="Cuatro líneas de producto, un único interlocutor."
      descripcion="Desde el racor más pequeño hasta la central hidráulica a medida. Si trabaja con aire, agua o aceite, tenemos la solución en stock o la fabricamos en nuestro taller."
    >
      <div class="cat-grid">
        <SectionHomeAreasCard
          v-for="categoria in processedCategorias"
          :key="categoria.id"
          :id="categoria.id"
          :titulo="categoria.nombre"
          :productos_breve="categoria.productos_breve"
          :imagen="
            getMediaUrl(
              categoria.imagen?.formats?.small?.url ?? categoria.imagen?.url,
            ) ?? '/images/placeholder.png'
          "
          :slug="categoria.slug"
        />
      </div>
    </Section>

    <!-- Servicio técnico -->
    <Section
      class="section-tight"
      :id="2"
      titulo="Servicio técnico"
      preview="No solo vendemos piezas. Las diseñamos y reparamos."
      descripcion="Taller propio en Elche para fabricación de latiguillos a medida, reparación de maquinaria hidráulica y neumática, y montaje de soluciones llave en mano."
    >
      <div class="svc-grid">
        <SectionHomeServicioCard
          v-for="servicio in servicios"
          :key="servicio.id"
          :titulo="servicio.titulo"
          :preview="servicio.preview"
          :descripcion="servicio.descripcion"
          :imagen="servicio.imagen"
        />
      </div>
    </Section>

    <!-- Categorías destacadas -->
    <Section class="section-tight" :id="3" titulo="Categorías destacadas">
      <div class="tile-grid">
        <SectionCard
          v-for="subcategoria in processedSubcategorias"
          :key="subcategoria.routeSlug"
          :titulo="subcategoria.nombre"
          :imagen="subcategoria.imagen"
          :slug="subcategoria.routeSlug"
        />
      </div>
    </Section>

    <SectionBrandTrack />

    <!-- Quiénes somos -->
    <Section
      :id="4"
      titulo="Quiénes somos"
      preview="Empresa líder de suministros industriales en el Levante"
      descripcion="Más de una década sirviendo a la industria de Alicante, Murcia, Valencia y Albacete. Trazabilidad completa de existencias, certificados de calidad de fábrica y stock permanente para no parar su producción."
      :is-dark="true"
      dark-background="var(--panel)"
    >
      <SectionHomeAboutStats :num-sectores="sectores.length" :is-dark="true" />
    </Section>

    <!-- Sectores -->
    <Section
      class="section-tight"
      :id="5"
      titulo="Sectores"
      preview="Servimos a la industria en toda su diversidad"
    >
      <div class="sector-grid">
        <SectionHomeSectores
          v-for="sector in sectores"
          :label="sector.nombre"
          :icon="sector.icono"
        />
      </div>
    </Section>

    <!-- Contact -->
    <SectionContact :seccion="seccion" :id="6"></SectionContact>
  </main>
</template>

<style scoped>
.section-tight {
  padding: 3.2rem 0;
}

.cat-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);

  & > * {
    flex: 1 1 calc(33.333% - 1px);
  }

  /* 5 tarjetas en 3 columnas: la última fila queda con 2 tarjetas al 50%
     de ancho. Compensamos su aspect-ratio para que la altura coincida con
     la fila de arriba (33% de ancho), en vez de crecer con el ancho. */
  & > :deep(.cat-card):nth-child(4),
  & > :deep(.cat-card):nth-child(5) {
    aspect-ratio: 6 / 5;
  }
}

.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.tile-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

.sector-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

@media (max-width: 980px) {
  .cat-grid > * {
    flex-basis: calc(50% - 1px);
  }
  /* En 2 columnas, la fila 2 (items 3-4) va completa al 50%: aspect-ratio
     por defecto. Solo el item 5, solo en su fila al 100%, necesita
     compensarse para mantener la misma altura. */
  .cat-grid > :deep(.cat-card):nth-child(4) {
    aspect-ratio: 4 / 5;
  }
  .cat-grid > :deep(.cat-card):nth-child(5) {
    aspect-ratio: 8 / 5;
  }
  .tile-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media (max-width: 900px) {
  .svc-grid {
    grid-template-columns: 1fr;
  }
  .sector-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .section-tight {
    padding: 2.2rem 0;
  }
}
@media (max-width: 620px) {
  .tile-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 560px) {
  .cat-grid > * {
    flex-basis: 100%;
  }
  .cat-grid > :deep(.cat-card):nth-child(4),
  .cat-grid > :deep(.cat-card):nth-child(5) {
    aspect-ratio: 4 / 5;
  }
  .sector-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
