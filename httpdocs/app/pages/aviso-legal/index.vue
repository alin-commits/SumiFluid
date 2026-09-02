<script setup>
const { get } = useStrapi();
const { data } = await get("empresa", {
  query: {
    populate: "*",
  },
});
const empresa = computed(() => data.value?.data);

const route = useRoute();
const siteConfig = useSiteConfig();

const pageTitle = "Aviso Legal | Sumifluid";
const pageDescription =
  "Información legal, condiciones de uso y propiedad intelectual de sumifluid.es.";
const canonicalUrl = computed(() => siteConfig.url + (route.path || "/"));

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
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
  { label: "Aviso legal", to: route.path },
]);

useSchemaOrg([
  defineWebPage({
    "@type": "WebPage",
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
</script>

<template>
  <main>
    <Breadcrumbs />
    <Section
      titulo="Legal"
      preview="Aviso Legal"
      descripcion="Última actualización: 2 de septiembre de 2026"
    >
      <div class="legal-content">
        <h2>1. Datos identificativos</h2>
        <p>
          En cumplimiento del deber de información recogido en el artículo 10
          de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la
          Información y de Comercio Electrónico (LSSI-CE), se informa de los
          siguientes datos: el titular de este sitio web es
          <strong>{{ empresa?.nombre || "Sumifluid S.L" }}</strong>, con CIF
          <strong>B54197157</strong>, con domicilio en
          {{ empresa?.direccion?.direccion }}
          ({{ empresa?.direccion?.infoExtra }}), CP
          {{ empresa?.direccion?.cp }}, {{ empresa?.direccion?.municipio }}
          ({{ empresa?.direccion?.provincia }}).
        </p>
        <p>
          Puede contactar con nosotros en el correo electrónico
          <a :href="`mailto:${empresa?.emailPrincipal}`">{{
            empresa?.emailPrincipal
          }}</a>
          o en el teléfono
          <a :href="`tel:+34${empresa?.telefonoPrincipalNoSpaces}`">{{
            empresa?.telefonoPrincipalNoSpaces
          }}</a
          >.
        </p>

        <h2>2. Objeto y ámbito de aplicación</h2>
        <p>
          El presente aviso legal regula el uso del sitio web
          sumifluid.es (en adelante, el "sitio web"), que Sumifluid S.L. pone
          a disposición de los usuarios de internet. La navegación por el
          sitio web atribuye la condición de usuario e implica la aceptación
          plena de todas las cláusulas y condiciones incluidas en este aviso
          legal.
        </p>

        <h2>3. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del sitio web, entendiendo por estos a título
          meramente enunciativo los textos, fotografías, gráficos, imágenes,
          iconos, tecnología, software, enlaces y demás contenidos
          audiovisuales o sonoros, así como su diseño gráfico y códigos
          fuente, son propiedad intelectual de Sumifluid S.L. o de terceros
          que han autorizado su uso, sin que puedan entenderse cedidos al
          usuario ninguno de los derechos de explotación reconocidos por la
          normativa vigente en materia de propiedad intelectual e industrial.
        </p>
        <p>
          Las marcas, nombres comerciales o signos distintivos de terceros
          fabricantes que aparecen en el sitio web pertenecen a sus
          respectivos titulares y se muestran con fines meramente
          informativos, sin que ello implique relación comercial alguna salvo
          la que se indique expresamente.
        </p>

        <h2>4. Condiciones de uso</h2>
        <p>
          El usuario se compromete a hacer un uso adecuado y lícito del sitio
          web y de sus contenidos, conforme a la legislación aplicable, el
          presente aviso legal, la moral y el orden público. Queda prohibido
          el uso del sitio web con fines ilícitos o lesivos, o que de
          cualquier forma puedan causar perjuicio o impedir el normal
          funcionamiento del sitio web.
        </p>

        <h2>5. Exclusión de responsabilidad</h2>
        <p>
          Sumifluid S.L. no se hace responsable de los daños y perjuicios de
          cualquier naturaleza que pudieran derivarse de la falta de
          disponibilidad o continuidad del funcionamiento del sitio web, de
          la existencia de virus u otros elementos lesivos, ni del uso ilícito,
          negligente, fraudulento o contrario al presente aviso legal por
          parte de los usuarios.
        </p>
        <p>
          La información técnica (precios, medidas, características de
          producto) publicada en el catálogo tiene carácter orientativo.
          Recomendamos confirmar con nuestro equipo técnico cualquier dato
          crítico antes de tomar una decisión de compra o de dimensionado de
          una instalación.
        </p>

        <h2>6. Enlaces</h2>
        <p>
          En caso de que el sitio web incluyera enlaces a sitios web de
          terceros, Sumifluid S.L. no ejercerá ningún tipo de control sobre
          dichos sitios y contenidos. En ningún caso Sumifluid S.L. asumirá
          responsabilidad alguna por los contenidos de algún enlace
          perteneciente a un sitio web ajeno.
        </p>

        <h2>7. Protección de datos</h2>
        <p>
          El tratamiento de los datos personales facilitados a través del
          sitio web se rige por lo dispuesto en nuestra
          <NuxtLink to="/politica-de-privacidad"
            >Política de Privacidad</NuxtLink
          >.
        </p>

        <h2>8. Legislación aplicable y jurisdicción</h2>
        <p>
          Las presentes condiciones se rigen por la legislación española.
          Para la resolución de cualquier controversia que pudiera derivarse
          del acceso o uso del sitio web, Sumifluid S.L. y el usuario se
          someten a los juzgados y tribunales del domicilio del usuario,
          siempre que este tenga la condición de consumidor; en caso
          contrario, ambas partes se someten a los juzgados y tribunales de
          Elche (Alicante), con renuncia expresa a cualquier otro fuero que
          pudiera corresponderles.
        </p>
      </div>
    </Section>
  </main>
</template>

<style scoped>
.legal-content {
  max-width: 80ch;

  & h2 {
    color: var(--accent);
    font-size: 1.35rem;
    font-weight: 600;
    margin-top: 2.2rem;
    margin-bottom: 0.9rem;
  }
  & h2:first-child {
    margin-top: 0;
  }
  & p {
    margin-bottom: 1rem;
    line-height: 1.7;
    color: var(--ink-soft);
  }
  & a {
    color: var(--ink);
    text-decoration: underline;
  }
  & a:hover {
    color: var(--accent);
  }
}
</style>
