<script setup>
const props = defineProps({
  categoria: {
    type: String,
    default: "bombas hidráulicas",
  },
  telefono_principal: {
    type: String,
    required: true,
  },
  telefono_secundario: {
    type: String,
    required: true,
  },
});
const formLink = "#presupuesto";
const sectionRef = ref(null);
useRevealObserver(sectionRef);
</script>

<template>
  <section ref="sectionRef" class="prod-guide-cta-band reveal">
    <div class="wrap">
      <p>
        En Sumifluid le ofrecemos todo tipo de {{ categoria }} sin necesidad de
        desplazarse, con la máxima calidad y los precios más competitivos.
        Operamos en toda España, gestionando su pedido en 24/48 horas. Contacte
        con nuestro técnico profesional y encuentre la mejor respuesta para su
        aplicación: rellene el
        <NuxtLink :to="formLink">formulario de presupuesto</NuxtLink> o llámenos
        al
        <NuxtLink :href="`tel:+34${telefono_principal}`">
          {{ telefono_principal.replace(/(\d{3})(?=\d)/g, "$1 ") }}
        </NuxtLink>
        <span v-if="telefono_secundario">
          o al
          <NuxtLink :href="`tel:+34${telefono_secundario}`">
            {{ telefono_secundario.replace(/(\d{3})(?=\d)/g, "$1 ") }}
          </NuxtLink>
        </span>

        .
      </p>
    </div>
  </section>
</template>

<style scoped>
.prod-guide-cta-band {
  background: var(--panel);
  padding: 2rem 0;
  text-align: center;
}
.prod-guide-cta-band p {
  color: #fff;
  font-size: 1.05rem;
  line-height: 1.75;
  max-width: 92ch;
  margin: 0 auto;
}
.prod-guide-cta-band a {
  color: var(--accent);
  font-weight: 600;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.prod-guide-cta-band a:hover {
  border-bottom-color: var(--accent);
}
</style>
