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

const pageTitle = "Política de Cookies | Sumifluid";
const pageDescription =
  "Qué cookies utiliza sumifluid.es, con qué finalidad y cómo puede desactivarlas desde su navegador.";
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
  { label: "Política de cookies", to: route.path },
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
      preview="Política de Cookies"
      descripcion="Última actualización: 2 de septiembre de 2026"
    >
      <div class="legal-content">
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que un sitio web
          almacena en el navegador del usuario cuando lo visita. Permiten,
          entre otras cosas, recordar preferencias de navegación o recopilar
          información estadística sobre el uso del sitio.
        </p>

        <h2>2. Cookies utilizadas en este sitio web</h2>
        <p>
          sumifluid.es utiliza únicamente las siguientes cookies:
        </p>
        <ul>
          <li>
            <strong>Cookies técnicas:</strong> necesarias para el
            funcionamiento básico del sitio web (por ejemplo, para mantener
            su sesión de navegación). No requieren consentimiento previo por
            ser estrictamente necesarias para prestar el servicio solicitado.
          </li>
          <li>
            <strong>Cookies analíticas de Google Analytics:</strong>
            utilizadas para conocer el número de visitas y el uso que se
            hace del sitio web, con el fin de mejorar nuestros contenidos y
            servicios. Google Analytics puede instalar cookies como
            <code>_ga</code> o <code>_ga_*</code>, con una duración de hasta
            2 años.
          </li>
        </ul>
        <p>
          Este sitio web no utiliza cookies de publicidad ni de seguimiento
          de terceros más allá de la analítica indicada.
        </p>

        <h2>3. Aceptación de la política de cookies</h2>
        <p>
          Al navegar y continuar en este sitio web, usted acepta el uso de
          las cookies descritas en esta política. Si no está de acuerdo con
          su uso, puede desactivarlas o eliminarlas en cualquier momento
          siguiendo las instrucciones de su navegador, tal y como se explica
          en el siguiente apartado.
        </p>

        <h2>4. Cómo desactivar o eliminar las cookies</h2>
        <p>
          Puede permitir, bloquear o eliminar las cookies instaladas en su
          equipo mediante la configuración de su navegador. A continuación,
          algunos enlaces de referencia a las instrucciones de los
          navegadores más habituales:
        </p>
        <ul>
          <li>
            <a
              href="https://support.google.com/chrome/answer/95647"
              target="_blank"
              rel="noopener noreferrer"
              >Google Chrome</a
            >
          </li>
          <li>
            <a
              href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias"
              target="_blank"
              rel="noopener noreferrer"
              >Mozilla Firefox</a
            >
          </li>
          <li>
            <a
              href="https://support.microsoft.com/es-es/microsoft-edge"
              target="_blank"
              rel="noopener noreferrer"
              >Microsoft Edge</a
            >
          </li>
          <li>
            <a
              href="https://support.apple.com/es-es/guide/safari/sfri11471/mac"
              target="_blank"
              rel="noopener noreferrer"
              >Safari</a
            >
          </li>
        </ul>
        <p>
          Tenga en cuenta que desactivar las cookies técnicas puede afectar
          al correcto funcionamiento de algunas partes del sitio web.
        </p>

        <h2>5. Sus derechos</h2>
        <p>
          Los datos recogidos a través de cookies analíticas se tratan
          conforme a lo indicado en nuestra
          <NuxtLink to="/politica-de-privacidad"
            >Política de Privacidad</NuxtLink
          >, donde puede consultar cómo ejercer sus derechos de acceso,
          rectificación, supresión y oposición.
        </p>

        <h2>6. Contacto</h2>
        <p>
          Para cualquier duda sobre esta política de cookies, puede
          escribirnos a
          <a :href="`mailto:${empresa?.emailPrincipal}`">{{
            empresa?.emailPrincipal
          }}</a>
          .
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
  & code {
    font-family: var(--mono);
    font-size: 0.85em;
    background: var(--bg-2);
    padding: 0.1rem 0.35rem;
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
