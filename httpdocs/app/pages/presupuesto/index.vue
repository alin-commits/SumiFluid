<script setup>
const { public: publicConfig } = useRuntimeConfig();
if (!publicConfig.presupuestoEnabled) {
  await navigateTo("/", { redirectCode: 302 });
}

const { items, removeItem, updateCantidad, clear, verPdf } = usePresupuesto();
const { open: openLightbox } = useImageLightbox();

useSeoMeta({
  title: "Solicitar presupuesto | Sumifluid",
  robots: "noindex, follow",
});

const generandoPdf = ref(false);
async function handleVerPdf() {
  generandoPdf.value = true;
  try {
    await verPdf();
  } finally {
    generandoPdf.value = false;
  }
}

function handleLimpiar() {
  if (confirm("¿Vaciar todos los productos del presupuesto?")) {
    clear();
  }
}
</script>

<template>
  <div class="wrap presupuesto-page">
    <h1>Solicitar presupuesto</h1>

    <NuxtLink to="/" class="volver-btn">
      <Icon name="lucide:arrow-left" />
      Volver a la tienda
    </NuxtLink>

    <div v-if="!items.length" class="vacio-state">
      <Icon name="lucide:file-text" size="2.4rem" />
      <p>Todavía no has añadido ningún producto a tu presupuesto.</p>
      <NuxtLink to="/" class="volver-catalogo">Explorar catálogo</NuxtLink>
    </div>

    <div v-else class="presupuesto-grid">
      <div class="presupuesto-tabla-col">
        <div class="tabla-scroll">
          <table class="presupuesto-tabla">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in items" :key="item.codigo">
                <td class="col-producto">
                  <img
                    v-if="item.imagenUrl"
                    :src="item.imagenUrl"
                    :alt="item.nombre"
                    class="item-imagen item-imagen-clickable"
                    @click="openLightbox(item.imagenUrl, item.nombre)"
                  />
                  <div class="item-imagen item-imagen-placeholder" v-else>
                    <Icon name="lucide:package" />
                  </div>
                  <div>
                    <NuxtLink v-if="item.enlace" :to="item.enlace" class="item-nombre">
                      {{ item.nombre }}
                    </NuxtLink>
                    <p v-else class="item-nombre item-nombre-sin-link">
                      {{ item.nombre }}
                    </p>
                    <p class="item-codigo">{{ item.codigo }}</p>
                  </div>
                </td>
                <td class="col-cantidad">
                  <input
                    type="number"
                    min="1"
                    :value="item.cantidad"
                    @input="updateCantidad(item.codigo, Number($event.target.value))"
                  />
                </td>
                <td class="col-quitar">
                  <button
                    type="button"
                    aria-label="Quitar producto"
                    @click="removeItem(item.codigo)"
                  >
                    <Icon name="lucide:x" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="tabla-actions">
          <button type="button" class="btn-outline" @click="handleLimpiar">
            Limpiar lista
          </button>
          <button type="button" class="btn-outline" :disabled="generandoPdf" @click="handleVerPdf">
            <Icon name="lucide:file-down" />
            {{ generandoPdf ? "Generando..." : "Ver PDF" }}
          </button>
        </div>
      </div>

      <div class="presupuesto-form-col">
        <h2>Enviar la solicitud</h2>
        <SectionPresupuestoContactForm />
      </div>
    </div>
  </div>
</template>

<style scoped>
.presupuesto-page {
  padding-block: 3rem 5rem;
}

h1 {
  text-align: center;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  color: var(--ink);
  margin-bottom: 1.6rem;
}

.volver-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  background: var(--ink);
  color: #fff;
  font-family: var(--mono);
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin-bottom: 2rem;
  transition: background 0.2s;
}
.volver-btn:hover {
  background: var(--accent);
  color: var(--ink);
}

.vacio-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 1rem;
  color: var(--ink-mute);
  text-align: center;

  & svg {
    color: var(--line);
  }
  & p {
    font-size: 1rem;
  }
}
.volver-catalogo {
  padding: 0.7rem 1.4rem;
  background: var(--accent);
  color: var(--ink);
  font-weight: 700;
  font-size: 0.88rem;
}

.presupuesto-grid {
  display: grid;
  grid-template-columns: 1.6fr 1fr;
  gap: 2.5rem;
  align-items: start;
}

.tabla-scroll {
  overflow-x: auto;
  border: 1px solid var(--line);
}

.presupuesto-tabla {
  width: 100%;
  border-collapse: collapse;
  min-width: 480px;
}
.presupuesto-tabla thead {
  background: var(--panel);
}
.presupuesto-tabla th {
  color: #fff;
  text-align: left;
  padding: 0.8rem 1rem;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.presupuesto-tabla td {
  padding: 0.9rem 1rem;
  border-top: 1px solid var(--line);
  vertical-align: middle;
}

.col-producto {
  display: flex;
  align-items: center;
  gap: 0.9rem;
}

.item-imagen {
  width: 56px;
  height: 56px;
  object-fit: contain;
  flex-shrink: 0;
  background: #fff;
  border: 1px solid var(--line);
}
.item-imagen-clickable {
  cursor: zoom-in;
  transition: border-color 0.2s;
}
.item-imagen-clickable:hover {
  border-color: var(--accent);
}
.item-imagen-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--ink-mute);
  background: var(--bg-2);
}

.item-nombre {
  display: block;
  font-size: 0.94rem;
  font-weight: 700;
  color: var(--ink);
}
a.item-nombre:hover {
  color: var(--accent);
}
.item-nombre-sin-link {
  cursor: default;
}

.item-codigo {
  font-size: 0.78rem;
  font-family: var(--mono);
  color: var(--ink-mute);
  margin-top: 0.15rem;
}

.col-cantidad {
  white-space: nowrap;

  & input {
    width: 64px;
    padding: 0.5rem;
    border: 1px solid var(--line);
    text-align: center;
  }
  & input:focus {
    outline: none;
    border-color: var(--accent);
  }
}

.col-quitar {
  text-align: right;

  & button {
    width: 34px;
    height: 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    color: var(--ink-mute);
    cursor: pointer;
    transition: color 0.2s;
  }
  & button:hover {
    color: #d92d20;
  }
}

.tabla-actions {
  display: flex;
  gap: 0.8rem;
  margin-top: 1rem;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.2rem;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: border-color 0.2s;
}
.btn-outline:hover:not(:disabled) {
  border-color: var(--accent);
}
.btn-outline:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.presupuesto-form-col {
  background: var(--bg-2);
  border: 1px solid var(--line);
  padding: 1.6rem;

  & h2 {
    font-size: 1.15rem;
    font-weight: 700;
    color: var(--ink);
    margin-bottom: 1rem;
  }
}

@media (max-width: 900px) {
  .presupuesto-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .col-producto {
    flex-wrap: wrap;
  }
  .tabla-actions {
    flex-direction: column;
  }
  .btn-outline {
    justify-content: center;
  }
}
</style>
