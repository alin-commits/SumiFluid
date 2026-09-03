<script setup>
const { items, clear } = usePresupuesto();

const state = reactive({
  nombre: "",
  email: "",
  telefono: "",
  notas: "",
  website: "", // Honeypot - debe quedar vacío
});

const enviando = ref(false);
const exitoso = ref(false);
const error = ref(null);
const toast = useToast();

async function onSubmit() {
  error.value = null;
  enviando.value = true;
  try {
    await $fetch("/api/presupuesto", {
      method: "POST",
      body: {
        ...state,
        items: items.value.map(({ codigo, nombre, cantidad }) => ({
          codigo,
          nombre,
          cantidad,
        })),
      },
    });

    toast.add({
      title: "Solicitud enviada",
      description: "Nos pondremos en contacto lo antes posible.",
      color: "success",
    });

    clear();
    state.nombre = "";
    state.email = "";
    state.telefono = "";
    state.notas = "";
    state.website = "";
    exitoso.value = true;
  } catch (err) {
    error.value =
      err?.data?.message || "No se pudo enviar la solicitud. Inténtalo de nuevo.";
  } finally {
    enviando.value = false;
  }
}

defineExpose({ onSubmit });
</script>

<template>
  <div class="presupuesto-contact-form">
    <div v-if="exitoso" class="mensaje-exito">
      <Icon name="lucide:check-circle" />
      <div>
        <strong>¡Solicitud enviada correctamente!</strong>
        <p>Nuestro equipo técnico le llamará con el presupuesto.</p>
      </div>
    </div>

    <form v-else-if="items.length" :id="$attrs.formId" class="presupuesto-form" @submit.prevent="onSubmit">
      <div class="honeypot">
        <label for="pp-website">Website</label>
        <input
          id="pp-website"
          v-model="state.website"
          type="text"
          tabindex="-1"
          autocomplete="off"
        />
      </div>
      <label>
        Nombre y Empresa
        <input v-model="state.nombre" type="text" required />
      </label>
      <label>
        Correo electrónico
        <input v-model="state.email" type="email" required />
      </label>
      <label>
        Teléfono
        <input v-model="state.telefono" type="tel" required />
      </label>
      <label>
        Notas (opcional)
        <textarea v-model="state.notas" rows="2"></textarea>
      </label>
      <p v-if="error" class="form-error">{{ error }}</p>
      <button type="submit" class="enviar-btn" :disabled="enviando">
        {{ enviando ? "Enviando..." : "Enviar solicitud de presupuesto" }}
      </button>
    </form>
  </div>
</template>

<style scoped>
.presupuesto-form {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  & label {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.78rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--ink-mute);
  }
  & input,
  & textarea {
    padding: 0.7rem 0.8rem;
    border: 1px solid var(--line);
    font-family: var(--sans);
    font-size: 0.92rem;
    color: var(--ink);
  }
  & input:focus,
  & textarea:focus {
    outline: none;
    border-color: var(--accent);
  }
}

.honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.form-error {
  color: #d92d20;
  font-size: 0.85rem;
}

.enviar-btn {
  padding: 0.85rem;
  background: var(--ink);
  color: #fff;
  border: none;
  font-family: var(--mono);
  text-transform: uppercase;
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 0.2s;
}
.enviar-btn:hover:not(:disabled) {
  background: var(--accent);
  color: var(--ink);
}
.enviar-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.mensaje-exito {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.1rem;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;

  & svg {
    flex-shrink: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #28a745;
  }
  & strong {
    display: block;
    margin-bottom: 0.25rem;
    font-size: 0.94rem;
  }
  & p {
    margin: 0;
    font-size: 0.87rem;
  }
}
</style>
