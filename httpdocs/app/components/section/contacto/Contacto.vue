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
    default: "Lun–Vie: 8:00–13:30 y 15:30–18:00",
  },
  mapaUrl: {
    type: String,
    default: "https://maps.app.goo.gl/3q27PjnMEXSrGUoF6",
  },
  mapaSrc: {
    type: String,
    default:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.9097099305327!2d-0.7149325!3d38.28158579999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63b652b66391fb%3A0xf464f773e92e4015!2sC.%20Almansa%2C%2012%2C%2003206%20Elche%2C%20Alicante!5e0!3m2!1ses!2ses!4v1784630199959!5m2!1ses!2ses",
  },
});
</script>

<template>
  <div>
    <Section
      titulo="Contacto"
      preview="¿Tiene dudas sobre hidráulica o neumática? Hablemos."
      descripcion="Pieza urgente, pieza descatalogada, máquina parada o un proyecto nuevo: cuéntenos su caso y le respondemos con la solución más rápida."
    >
      <div class="content">
        <SectionContactoDatosContacto
          :nombre-empresa="nombreEmpresa"
          :direccion="direccion"
          :telefono_principal="telefono_principal"
          :telefono_secundario="telefono_secundario"
          :email="email"
          :horario="horario"
          :mapa-url="mapaUrl"
        ></SectionContactoDatosContacto>
        <Formulario />
      </div>
    </Section>
    <div id="mapa">
      <Section
        titulo="Cómo llegar"
        preview="Nuestro almacén en Elche"
        descripcion="P.I. Carrús, a 10 minutos del centro de Elche y bien conectado con la A-7 y la N-340 para envíos rápidos a toda España."
      >
        <SectionContactoMapa
          class="reveal"
          :mapa-src="mapaSrc"
        ></SectionContactoMapa>
      </Section>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
@media (max-width: 1040px) {
  .content {
    grid-template-columns: 1fr;
  }
}
</style>
