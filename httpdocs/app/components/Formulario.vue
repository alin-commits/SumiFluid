<script setup>
import { contactSchema } from "~~/shared/schemas/contact";

const props = defineProps({
  producto: {
    type: String,
    default: "",
  },
});

const asuntos = ref([
  "Necesito una pieza urgente",
  "Tengo una pieza y no sé lo que es",
  "Necesito una solución para una pieza obsoleta",
  "Tengo una máquina parada",
  "Necesito modificar o mejorar prestaciones",
  "Tengo problemas de producción",
  "No sé muy bien lo que necesito",
]);
const state = reactive({
  nombre: "",
  email: "",
  telefono: "",
  asunto: asuntos.value[0],
  mensaje: "",
  producto: props.producto,
  website: "", // Honeypot - debe quedar vacío
});

const enviando = ref(false);
const exitoso = ref(false);
const toast = useToast();

async function onSubmit(event) {
  enviando.value = true;
  exitoso.value = false;
  try {
    await $fetch("/api/contact", {
      method: "POST",
      body: event.data,
    });

    toast.add({
      title: "Mensaje enviado",
      description: "Nos pondremos en contacto lo antes posible.",
      color: "success",
    });

    // Limpiar formulario
    state.nombre = "";
    state.email = "";
    state.telefono = "";
    state.mensaje = "";
    state.asunto = asuntos.value[0];
    state.website = "";

    exitoso.value = true;
    setTimeout(() => {
      exitoso.value = false;
    }, 5000);
  } catch (error) {
    console.error(error);
    toast.add({
      title: "Error al enviar",
      description: "Inténtalo de nuevo en unos minutos.",
      color: "error",
    });
  } finally {
    enviando.value = false;
  }
}
</script>

<template>
  <UForm :schema="contactSchema" :state="state" class="form" @submit="onSubmit">
    <p class="kicker">Formulario</p>
    <h2>Cuéntenos su caso</h2>

    <p v-if="producto" class="producto-contexto">
      Consulta sobre: <strong>{{ producto }}</strong>
    </p>

    <UFormField label="Motivo de la consulta" name="asunto">
      <USelect v-model="state.asunto" :items="asuntos" class="w-full" />
    </UFormField>

    <!-- Honeypot field - debe permanecer vacío -->
    <div class="honeypot">
      <label for="website">Website</label>
      <input
        id="website"
        v-model="state.website"
        type="text"
        name="website"
        tabindex="-1"
        autocomplete="off"
      />
    </div>

    <UFormField label="Nombre y Empresa" name="nombre" required>
      <UInput
        v-model="state.nombre"
        placeholder="Nombre y Empresa"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Correo electrónico" name="email" required>
      <UInput
        v-model="state.email"
        type="email"
        placeholder="correo@empresa.com"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Teléfono" name="telefono" required>
      <UInput
        v-model="state.telefono"
        type="tel"
        placeholder="Le llamamos en horario laboral"
        class="w-full"
      />
    </UFormField>

    <UFormField label="Mensaje" name="mensaje" required>
      <UTextarea
        v-model="state.mensaje"
        :rows="5"
        placeholder="Describa la pieza, medida o problemática..."
        class="w-full"
      />
    </UFormField>

    <div v-if="exitoso" class="mensaje-exito">
      <Icon name="lucide:check-circle" />
      <div>
        <strong>¡Mensaje enviado correctamente!</strong>
        <p>Nos pondremos en contacto con usted lo antes posible.</p>
      </div>
    </div>

    <UButton type="submit" :loading="enviando" block class="mono">
      {{ enviando ? "Enviando..." : "Enviar mensaje" }}
    </UButton>
  </UForm>
</template>

<style scoped>
.form {
  padding: 3rem;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  background: #fff;
  border: 1px solid var(--line);
}

.producto-contexto {
  font-size: 0.85rem;
  color: var(--ink-soft);
  padding: 0.6rem 0.9rem;
  background: var(--bg);
  border: 1px solid var(--line);

  & strong {
    color: var(--ink);
  }
}

.form :deep(label) {
  font-size: 0.74rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--ink-mute);
}

.form :deep(input),
.form :deep(textarea),
.form :deep([data-slot="base"]) {
  width: 100%;
  padding: 0.85rem 1rem;
  border-radius: 0;
  font-family: var(--sans);
  font-size: 0.95rem;
  color: var(--ink);
}

.form :deep(textarea:focus),
.form :deep(input:focus) {
  border-color: var(--accent);
}

button {
  text-transform: uppercase;
  font-family: var(--mono) !important;
  padding: 0.7rem;
  background-color: var(--ink);
  color: white !important;
  border: none;
  transition: background-color 0.2s ease;
}

button:hover:not(:disabled) {
  background-color: var(--accent);
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mensaje-exito {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  border-radius: 0.25rem;
  animation: slideDown 0.3s ease;
}

.mensaje-exito svg {
  flex-shrink: 0;
  width: 1.5rem;
  height: 1.5rem;
  color: #28a745;
}

.mensaje-exito strong {
  display: block;
  margin-bottom: 0.25rem;
  font-size: 0.95rem;
}

.mensaje-exito p {
  margin: 0;
  font-size: 0.875rem;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Honeypot field - oculto visualmente pero presente en el DOM */
.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
