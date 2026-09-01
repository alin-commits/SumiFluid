<script setup>
const { get } = useStrapi();
const { data } = await get("empresa", {
  query: {
    populate: "*",
  },
});
const empresa = computed(() => data.value?.data);

const servicios = [
  {
    titulo: "Asesoramiento técnico",
    icono: "icons/icono_asesoramiento_tecnico.png",
    preview:
      "Le ayudamos a encontrar la solución correcta para su instalación hidráulica o neumática, no solo la pieza que pide.",
  },
  {
    titulo: "Amplio stock",
    icono: "icons/icono_amplio_stock.png",
    preview:
      "Mantenemos un almacén permanente de material y maquinaria industrial, y consultamos con fabricantes lo que no tenemos en stock.",
  },
  {
    titulo: "Taller especializado",
    icono: "icons/icono_taller_especializado.png",
    preview:
      "Reparamos maquinaria y fabricamos latiguillos a medida en plazos cortos, informando en todo momento del estado de cada trabajo.",
  },
  {
    titulo: "Garantía Sumifluid",
    icono: "icons/icono_garantia.png",
    preview:
      "Más de 15 años de experiencia en hidráulica, neumática, estanqueidad y vacío avalan cada pieza que sale de nuestro almacén.",
  },
];
const ventajas = [
  {
    titulo: "Atención al cliente",
    icono: "icons/Icono_Atencion_al_Cliente.png",
    preview:
      "Teléfono, WhatsApp, chat, email o formulario: respondemos rápido por el canal que le resulte más cómodo.",
  },
  {
    titulo: "Mejora continua",
    icono: "icons/Icono_Mejora_de_Servicio.png",
    preview:
      "Formación constante de nuestro equipo en nuevas marcas, productos y normativas, y revisión continua de procesos.",
  },
  {
    titulo: "Sostenibilidad",
    icono: "icons/Icono_Sostenibilidad.png",
    preview:
      "Reducimos consumo de energía y papel, y asesoramos en el uso de fluidos menos contaminantes en cada instalación.",
  },
];
const tallerImgs = [
  "images/about/taller_1.png",
  "images/about/taller_2.png",
  "images/about/taller_3.png",
  "images/about/taller_4.png",
  "images/about/taller_5.png",
  "images/about/taller_6.png",
  "images/about/taller_7.png",
  "images/about/taller_8.png",
];
const seccionContacto = ref({
  titulo: "Contacto directo",
  preview: "¿Hablamos de su próximo proyecto?",
  descripcion:
    "Nuestro equipo técnico está para ayudarle, desde una pieza urgente hasta el diseño de una instalación completa.",
});
const route = useRoute();
const siteConfig = useSiteConfig();

// #region SEO
const pageTitle = computed(() =>
  empresa?.seo?.metaTitle
    ? `Sobre nosotros | ${empresa.seo.metaTitle}`
    : `Sobre nosotros | ${empresa?.nombre || siteConfig.name}`,
);

const pageDescription = computed(() =>
  empresa?.seo?.metaDescription
    ? `Sobre nosotros | ${empresa.seo.metaDescription}`
    : "Sobre nosotros | Soluciones técnicas para la industria.",
);
const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));
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

const breadcrumbItems = computed(() => [
  { label: "Inicio", to: "/" },
  { label: "Sobre nosotros", to: route.path },
]);

useSchemaOrg([
  defineWebPage({
    "@type": "ItemPage",
    name: pageTitle,
    description: pageDescription,
  }),
  defineBreadcrumb({
    itemListElement: () =>
      breadcrumbItems.value.map((item) => ({
        name: item.label,
        item: item.to,
      })),
  }),
]);
// #endregion
</script>

<template>
  <div>
    <main>
      <Breadcrumbs />
      <Section
        titulo="Sobre nosotros"
        preview="El taller hidráulico de Sumifluid."
        descripcion="Especialistas en hidráulica y neumática desde 2007. Más de 15 años acompañando a la industria de Alicante, Murcia, Valencia y Albacete con stock permanente, taller propio y un equipo que conoce cada pieza que vende."
        :bigger-head="true"
      >
        <SectionHomeAboutStats :num-sectores="6" />
      </Section>

      <Section
        titulo="Nuestra trayectoria"
        preview="Más de 15 años al servicio de la industria"
        descripcion="Sumifluid nació en 2007 como proveedor de hidráulica, neumática, estanqueidad y vacío, y desde entonces ha ido ampliando su catálogo y sus servicios para acompañar a la industria en cada etapa: desde la pieza más pequeña hasta la central hidráulica completa."
      >
        <div class="sector-grid reveal">
          <SectionHomeSectores
            v-for="(servicio, index) in servicios"
            :key="index"
            :label="servicio.titulo"
            :preview="servicio.preview"
            :icon="servicio.icono"
          />
        </div>
      </Section>

      <Section
        :is-dark="true"
        titulo="Mejoramos día a día"
        preview="Un compromiso que no termina nunca"
        descripcion="Llevamos más de una década construyendo relaciones duraderas con nuestros clientes. Estos son los tres frentes en los que trabajamos cada día para mejorar."
      >
        <div
          class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 text-white"
        >
          <div
            v-for="(ventaja, index) in ventajas"
            :key="index"
            class="flex gap-3 items-start"
          >
            <NuxtImg
              :src="ventaja.icono"
              :alt="ventaja.titulo"
              loading="lazy"
              width="40"
              height="40"
            />
            <div class="flex flex-col gap-2">
              <h4>{{ ventaja.titulo }}</h4>
              <p>{{ ventaja.preview }}</p>
            </div>
          </div>
        </div>
      </Section>

      <Section
        titulo="Nuestras instalaciones"
        preview="Taller de reparación a su servicio"
        descripcion="Además de nuestro catálogo, contamos con un taller de reparaciones y una línea de fabricación de latiguillos a medida, con trazabilidad completa por código desde la fabricación hasta la instalación."
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
        >
          <NuxtImg
            class="mx-auto"
            v-for="(img, index) in tallerImgs"
            :key="index"
            :src="img"
            :alt="'Instalaciones Sumifluid ' + (index + 1)"
            loading="lazy"
            width="350"
            height="250"
          />
        </div>
      </Section>

      <SectionContact
        :seccion="seccionContacto"
        :num-botones="1"
      ></SectionContact>
    </main>
  </div>
</template>

<style scoped>
h4 {
  font-weight: 700;
}
.sector-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  background: var(--line);
  border: 1px solid var(--line);
}

@media (max-width: 900px) {
  .sector-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 560px) {
  .sector-grid {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
