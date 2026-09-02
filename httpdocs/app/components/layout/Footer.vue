<script setup>
const { get } = useStrapi();
const { data } = await get("empresa", {
  query: {
    populate: "*",
  },
});

const empresa = computed(() => data.value?.data);
const catalogo = [
  { title: "Hidráulica", path: "/hidraulica" },
  { title: "Neumática", path: "/neumatica" },
  { title: "Estanqueidad", path: "/estanqueidad" },
  { title: "Vacío", path: "/vacio" },
  { title: "Productos", path: "/productos" },
  { title: "Marcas", path: "/marcas" },
];
const empresaLinks = [
  { title: "Sobre Nosotros", path: "/about" },
  { title: "Herramientas de cálculo", path: "/herramientas-calculo" },
  { title: "Contacto", path: "/contacto" },
];
const legalLinks = [
  { title: "Aviso legal", path: "/aviso-legal" },
  { title: "Política de privacidad", path: "/politica-de-privacidad" },
  { title: "Política de cookies", path: "/politica-de-cookies" },
];
const currentYear = new Date().getFullYear();
const { reopen: reopenCookieBanner } = useCookieConsent();
</script>

<template>
  <footer>
    <div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="foot-brand">
            <NuxtImg
              src="/images/logo-sumifluid-white.png"
              alt="Sumifluid"
              loading="lazy"
              height="17"
              class="foot-logo"
            />
          </div>
          <p>
            Proveedor de componentes hidráulicos y soluciones neumáticas a nivel
            nacional. Desde Elche, más de 10 años sirviendo a la industria de
            Alicante, Murcia, Valencia y Albacete.
          </p>
        </div>
        <div class="foot-col">
          <h4>Catálogo</h4>
          <NuxtLink v-for="item in catalogo" :key="item.path" :to="item.path">
            {{ item.title }}
          </NuxtLink>
        </div>
        <div class="foot-col">
          <h4>Empresa</h4>
          <NuxtLink
            v-for="item in empresaLinks"
            :key="item.path"
            :to="item.path"
            >{{ item.title }}</NuxtLink
          >
        </div>
        <div class="foot-col">
          <h4>Contacto</h4>
          <div class="flex items-center gap-2 flex-nowrap">
            <Icon name="lucide:map-pin" class="text-(--accent)" />
            <NuxtLink :to="'/contacto#mapa'">
              <address class="not-italic">
                <span
                  >{{ empresa.direccion.direccion }},
                  {{ empresa.direccion.infoExtra }}</span
                >
                <br />
                <span>
                  {{ empresa.direccion.municipio }}
                  ({{ empresa.direccion.provincia }})
                </span>
              </address>
            </NuxtLink>
          </div>
          <div class="flex items-center gap-2 flex-nowrap">
            <Icon name="lucide:phone" class="text-(--accent)" />
            <a :href="`tel:+34${empresa.telefonoPrincipalNoSpaces}`">
              {{
                empresa.telefonoPrincipalNoSpaces.replace(
                  /(\d{3})(?=\d)/g,
                  "$1 ",
                )
              }}
            </a>
          </div>
          <div class="flex items-center gap-2 flex-nowrap">
            <Icon name="lucide:mail" class="text-(--accent)" />
            <a :href="`mailto:${empresa.emailPrincipal}`">{{
              empresa.emailPrincipal
            }}</a>
          </div>
        </div>
      </div>
      <div class="foot-bottom">
        <p>
          © <span>{{ currentYear }}</span>
          {{ empresa.nombre.toUpperCase() }} Todos los derechos reservados.
        </p>
        <nav class="foot-legal">
          <NuxtLink
            v-for="item in legalLinks"
            :key="item.path"
            :to="item.path"
            >{{ item.title }}</NuxtLink
          >
          <button type="button" @click="reopenCookieBanner">
            Cambiar preferencias de cookies
          </button>
        </nav>
        <div class="foot-social">
          <a
            v-if="empresa.facebook"
            :href="empresa.facebook"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="lucide:facebook" />
          </a>
          <a
            v-if="empresa.linkedin"
            :href="empresa.linkedin"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="lucide:linkedin" />
          </a>
          <a
            v-if="empresa.instagram"
            :href="empresa.instagram"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="lucide:instagram" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background: var(--panel);
  color: rgba(255, 255, 255, 0.7);
  padding: 4rem 0 2rem;
  font-size: 0.92rem;
}

.foot-grid {
  display: grid;
  grid-template-columns: 2fr repeat(3, 1fr);
  grid-template-areas: "brand catalogo empresa contacto";
  gap: 2.5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

@media (max-width: 820px) {
  .foot-grid > div:nth-child(1) {
    grid-area: brand;
  }
  .foot-grid > div:nth-child(2) {
    grid-area: catalogo;
  }
  .foot-grid > div:nth-child(3) {
    grid-area: empresa;
  }
  .foot-grid > div:nth-child(4) {
    grid-area: contacto;
  }
  .foot-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-areas:
      "brand brand brand"
      "catalogo empresa contacto";
  }
}

@media (max-width: 500px) {
  .foot-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));

    grid-template-areas:
      "brand brand"
      "catalogo empresa"
      "contacto contacto";
    gap: 1.5rem;
  }
}
.foot-brand {
  display: flex;
  align-items: center;
  margin-bottom: 1.1rem;
}
.foot-logo {
  display: block;
}
.foot-col {
  & h4 {
    font-family: var(--mono);
    font-size: 0.76rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.45);
    margin-bottom: 1rem;
    font-weight: 600;
  }
  & > * {
    color: rgba(255, 255, 255, 0.72);
    margin-bottom: 0.6rem;
    font-size: 0.9rem;
  }

  & > a {
    display: block;
  }
  & a:hover,
  & address:hover {
    color: var(--accent);
  }
}

.foot-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.6rem;
  flex-wrap: wrap;
  gap: 1rem;

  & p {
    color: rgba(255, 255, 255, 0.45);
    font-size: 0.82rem;
    font-family: var(--mono);
  }

  .foot-legal {
    display: flex;
    gap: 1.2rem;
    flex-wrap: wrap;

    & a,
    & button {
      color: rgba(255, 255, 255, 0.45);
      font-size: 0.82rem;
      font-family: var(--mono);
    }
    & button {
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
    & a:hover,
    & button:hover {
      color: var(--accent);
    }
  }

  .foot-social {
    display: flex;
    gap: 0.9rem;
    margin-right: 4rem;

    & > a {
      width: 34px;
      height: 34px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--mono);
    }
    & > a:hover {
      background: var(--accent);
      border-color: var(--accent);
      color: var(--ink);
    }
  }
}
</style>
