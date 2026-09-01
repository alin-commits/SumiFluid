<script setup>
const props = defineProps({
  nombreEmpresa: {
    type: String,
    default: "Sumifluid S.L",
  },
  direccion: {
    type: Object,
    required: true,
  },
  telefono_principal: {
    type: String,
    required: true,
  },
  telefono_secundario: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  mapaUrl: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="contenedor">
    <p class="kicker">Datos de contacto</p>
    <h3>{{ nombreEmpresa }}</h3>
    <address>
      <p class="mono col-1">Dirección</p>
      <a
        :href="mapaUrl"
        rel="noopener noreferrer"
        target="_blank"
        class="col-2"
      >
        <span>{{ direccion.direccion }}, {{ direccion.infoExtra }}</span>
        <br />
        <span
          >{{ direccion.cp }}, {{ direccion.municipio }}, ({{
            direccion.provincia
          }})</span
        >
      </a>
    </address>
    <div>
      <p class="mono col-1">Teléfono</p>
      <div class="col-2">
        <a :href="'tel:+34' + telefono_principal">{{
          telefono_principal.replace(/(\d{3})(?=\d)/g, "$1 ")
        }}</a>
        <br />
        <a v-if="telefono_secundario" :href="'tel:+34' + telefono_secundario">{{
          telefono_secundario.replace(/(\d{3})(?=\d)/g, "$1 ")
        }}</a>
      </div>
    </div>
    <div>
      <p class="mono col-1">Email</p>
      <a class="col-2" :href="`mailto:${email}`">{{ email }}</a>
    </div>
    <div>
      <p class="mono col-1">Horario</p>
      <p class="col-2">{{ horario }}</p>
    </div>
    <hr style="border-color: rgba(255, 255, 255, 0.15); margin: 1.8rem 0" />
    <p style="color: rgba(255, 255, 255, 0.45)">
      ¿Máquina parada por una pieza urgente? Llámenos directamente — es nuestra
      prioridad número uno.
    </p>
  </div>
</template>

<style scoped>
.contenedor {
  padding: 3rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  background-color: var(--ink);
  color: #fff;
  border: 1px solid var(--line);

  & > div,
  & > address {
    display: grid;
    grid-template-columns: 1fr 3fr;
  }
}
address {
  font-style: normal;
}
hr {
  border: none;
  border-top: 1px solid var(--line);
}
a:hover {
  color: var(--accent);
}
.mono.col-1 {
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.45);
  font-style: normal;
  font-size: 0.74rem;
}
</style>
