<script setup>
const props = defineProps({
  calculadora: {
    type: Object,
    required: true,
  },
});

const valores = reactive(
  Object.fromEntries(props.calculadora.campos.map((c) => [c.key, ""])),
);
const errores = reactive({});
const resultado = ref(null);

function formatearNumero(num) {
  return num.toLocaleString("es-ES", { maximumFractionDigits: 3 });
}

function calcular() {
  resultado.value = null;
  let valido = true;

  for (const campo of props.calculadora.campos) {
    const raw = valores[campo.key];
    const num = Number(raw);

    if (raw === "" || raw === null || Number.isNaN(num)) {
      errores[campo.key] = "Introduzca un valor.";
      valido = false;
    } else if (num < 0) {
      errores[campo.key] = "No se admiten valores negativos.";
      valido = false;
    } else if (num === 0) {
      errores[campo.key] = "Debe ser mayor que cero.";
      valido = false;
    } else {
      errores[campo.key] = "";
    }
  }

  if (!valido) return;

  const entrada = Object.fromEntries(
    props.calculadora.campos.map((c) => [c.key, Number(valores[c.key])]),
  );
  resultado.value = props.calculadora.calcular(entrada);
}
</script>

<template>
  <div class="calc-form">
    <p class="calc-formula mono">{{ calculadora.formulaTexto }}</p>

    <div class="calc-campos">
      <div v-for="campo in calculadora.campos" :key="campo.key" class="calc-campo">
        <label :for="`campo-${campo.key}`">
          {{ campo.label }}
          <span class="calc-unidad">({{ campo.unidad }})</span>
        </label>
        <input
          :id="`campo-${campo.key}`"
          v-model="valores[campo.key]"
          type="number"
          min="0"
          step="any"
          inputmode="decimal"
          :aria-invalid="!!errores[campo.key]"
        />
        <p v-if="errores[campo.key]" class="calc-error">
          {{ errores[campo.key] }}
        </p>
      </div>
    </div>

    <UButton class="mono calc-btn" block @click="calcular">
      Calcular
    </UButton>

    <div v-if="resultado" class="calc-resultado">
      <div
        v-for="res in calculadora.resultados"
        :key="res.key"
        class="calc-resultado-item"
      >
        <span class="calc-resultado-label">{{ res.label }}</span>
        <span class="calc-resultado-valor"
          >{{ formatearNumero(resultado[res.key]) }} {{ res.unidad }}</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.calc-form {
  padding: 3rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  background: #fff;
  border: 1px solid var(--line);
}

.calc-formula {
  font-size: 0.85rem;
  color: var(--ink-soft);
  padding: 0.6rem 0.9rem;
  background: var(--bg);
  border: 1px solid var(--line);
}

.calc-campos {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.calc-campo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & label {
    font-size: 0.74rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--ink-mute);
  }

  & .calc-unidad {
    color: var(--ink-soft);
    text-transform: none;
    letter-spacing: 0;
  }

  & input {
    width: 100%;
    padding: 0.85rem 1rem;
    border-radius: 0;
    border: 1px solid var(--line);
    font-family: var(--sans);
    font-size: 0.95rem;
    color: var(--ink);
    background: #fff;
  }

  & input:focus {
    outline: none;
    border-color: var(--accent);
  }

  & input[aria-invalid="true"] {
    border-color: #d92d20;
  }
}

.calc-error {
  font-size: 0.8rem;
  color: #d92d20;
}

.calc-btn {
  text-transform: uppercase;
  font-family: var(--mono) !important;
  padding: 0.7rem;
  background-color: var(--ink);
  color: white !important;
  border-radius: 0;
  border: none;
  transition: background-color 0.2s ease;
}

.calc-btn:hover {
  background-color: var(--accent);
}

.calc-resultado {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  padding: 1.2rem 1.4rem;
  background-color: #fbf2df;
  border: 1px solid var(--accent);
  animation: slideDown 0.3s ease;
}

.calc-resultado-item {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 1rem;
}

.calc-resultado-label {
  font-size: 0.85rem;
  color: var(--ink-soft);
}

.calc-resultado-valor {
  font-family: var(--mono);
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--ink);
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
</style>
