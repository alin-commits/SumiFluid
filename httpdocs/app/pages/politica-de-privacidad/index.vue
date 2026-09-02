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

const pageTitle = "Política de Privacidad | Sumifluid";
const pageDescription =
  "Cómo tratamos sus datos personales en sumifluid.es: finalidad, legitimación, conservación y derechos del usuario.";
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
  { label: "Política de privacidad", to: route.path },
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
      preview="Política de Privacidad"
      descripcion="Última actualización: 2 de septiembre de 2026"
    >
      <div class="legal-content">
        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos personales recogidos a
          través de este sitio web es
          <strong>{{ empresa?.nombre || "Sumifluid S.L" }}</strong>, con CIF
          <strong>B54197157</strong>, domicilio en
          {{ empresa?.direccion?.direccion }}
          ({{ empresa?.direccion?.infoExtra }}), CP
          {{ empresa?.direccion?.cp }}, {{ empresa?.direccion?.municipio }}
          ({{ empresa?.direccion?.provincia }}), correo electrónico
          <a :href="`mailto:${empresa?.emailPrincipal}`">{{
            empresa?.emailPrincipal
          }}</a>
          y teléfono
          <a :href="`tel:+34${empresa?.telefonoPrincipalNoSpaces}`">{{
            empresa?.telefonoPrincipalNoSpaces
          }}</a
          >.
        </p>

        <h2>2. Ámbito de aplicación</h2>
        <p>
          Esta política de privacidad se aplica al tratamiento de los datos
          personales que Sumifluid S.L. recoge a través de sumifluid.es,
          incluidos los formularios de contacto y presupuesto. No cubre el
          tratamiento de datos por parte de sitios web de terceros a los que
          este sitio pudiera enlazar.
        </p>

        <h2>3. Qué datos tratamos</h2>
        <p>Según cómo interactúe con el sitio web, podemos tratar:</p>
        <ul>
          <li>
            Datos de identificación y contacto que nos facilite mediante los
            formularios (nombre, empresa, correo electrónico, teléfono).
          </li>
          <li>
            El contenido de las consultas o mensajes que nos envíe, incluido,
            en su caso, el producto sobre el que consulta.
          </li>
          <li>
            Datos técnicos de navegación recogidos mediante cookies, como los
            descritos en nuestra
            <NuxtLink to="/politica-de-cookies"
              >Política de Cookies</NuxtLink
            >.
          </li>
        </ul>

        <h2>4. Finalidad del tratamiento</h2>
        <p>Tratamos sus datos personales para las siguientes finalidades:</p>
        <ul>
          <li>
            Atender y dar respuesta a las solicitudes de información o
            presupuesto que nos remita a través de los formularios del sitio
            web.
          </li>
          <li>
            Gestionar la relación comercial y contractual con nuestros
            clientes y proveedores.
          </li>
          <li>
            Elaborar estadísticas de uso del sitio web con fines de mejora
            del servicio, cuando así lo haya consentido.
          </li>
        </ul>

        <h2>5. Legitimación</h2>
        <p>
          La base legal para el tratamiento de sus datos es, según el caso,
          el consentimiento que nos presta al remitirnos un formulario, la
          ejecución de una relación contractual o precontractual, y el
          interés legítimo de Sumifluid S.L. en atender y dar seguimiento a
          las consultas recibidas.
        </p>

        <h2>6. Plazo de conservación</h2>
        <p>
          Sus datos se conservarán mientras se mantenga la relación
          comercial o la finalidad para la que fueron recabados, y
          posteriormente durante los plazos legalmente exigidos para atender
          a las eventuales responsabilidades que pudieran derivarse del
          tratamiento.
        </p>

        <h2>7. Destinatarios de los datos</h2>
        <p>
          Sus datos no se cederán a terceros salvo obligación legal. Podrán
          tener acceso a sus datos, en calidad de encargados del tratamiento,
          proveedores de servicios tecnológicos (por ejemplo, alojamiento web
          o herramientas de gestión de formularios) que actúan bajo
          instrucciones de Sumifluid S.L. y con las garantías exigidas por la
          normativa de protección de datos.
        </p>

        <h2>8. Medidas de seguridad</h2>
        <p>
          Sumifluid S.L. aplica las medidas técnicas y organizativas
          necesarias para garantizar la seguridad e integridad de los datos
          personales tratados y evitar su alteración, pérdida, tratamiento o
          acceso no autorizado.
        </p>

        <h2>9. Derechos del interesado</h2>
        <p>
          Puede ejercer en cualquier momento sus derechos de acceso,
          rectificación, supresión, oposición, limitación del tratamiento y
          portabilidad de los datos, así como retirar el consentimiento
          prestado, dirigiéndose por escrito a
          <a :href="`mailto:${empresa?.emailPrincipal}`">{{
            empresa?.emailPrincipal
          }}</a>
          o a la dirección postal indicada en el apartado 1, acreditando su
          identidad. Asimismo, tiene derecho a presentar una reclamación
          ante la Agencia Española de Protección de Datos (AEPD) si
          considera que el tratamiento no se ajusta a la normativa vigente.
        </p>

        <h2>10. Cambios en esta política</h2>
        <p>
          Sumifluid S.L. podrá modificar esta política de privacidad para
          adaptarla a novedades legislativas o cambios en el tratamiento de
          datos. La fecha de última actualización se indica al inicio de
          esta página.
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
  & ul {
    list-style: disc;
    margin-left: 1.5rem;
    margin-bottom: 1rem;
    color: var(--ink-soft);
  }
  & li {
    margin-bottom: 0.5rem;
    line-height: 1.7;
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
