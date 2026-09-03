<script setup>
const props = defineProps({
  productos: {
    type: Array,
    default: () => [],
  },
});

const route = useRoute();
const { getMediaUrl } = useStrapi();
const { addItem, toggle: toggleCarrito } = usePresupuesto();
const { open: openLightbox } = useImageLightbox();
const { public: publicConfig } = useRuntimeConfig();

const cantidades = reactive({});
function cantidadDe(codigo) {
  return cantidades[codigo] ?? 1;
}

const anadidos = reactive({});
function handleAnadir(producto) {
  addItem(
    {
      codigo: producto.codigo,
      nombre: producto.nombre,
      imagenUrl: producto.imagen?.url ? getMediaUrl(producto.imagen.url) : null,
      enlace: route.path,
    },
    cantidadDe(producto.codigo),
  );
  anadidos[producto.codigo] = true;
  setTimeout(() => {
    anadidos[producto.codigo] = false;
  }, 1600);
}
</script>

<template>
  <div v-if="publicConfig.presupuestoEnabled && productos.length" class="wrap referencias-wrap">
    <div class="referencias-head">
      <p class="kicker">Referencias disponibles</p>
      <button type="button" class="ver-presupuesto" @click="toggleCarrito">
        <Icon name="lucide:file-text" />
        Ver mi presupuesto
      </button>
    </div>
    <div class="referencias-table-scroll">
      <table class="referencias-table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Artículo</th>
            <th>Imagen</th>
            <th>Cantidad</th>
            <th>Solicitud oferta</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="producto in productos" :key="producto.codigo">
            <td class="col-codigo" data-label="Código">{{ producto.codigo }}</td>
            <td class="col-nombre" data-label="Artículo">{{ producto.nombre }}</td>
            <td class="col-imagen" data-label="Imagen">
              <img
                v-if="producto.imagen?.url"
                :src="getMediaUrl(producto.imagen.url)"
                :alt="producto.nombre"
                loading="lazy"
                class="col-imagen-clickable"
                @click="openLightbox(getMediaUrl(producto.imagen.url), producto.nombre)"
              />
            </td>
            <td class="col-cantidad" data-label="Cantidad">
              <input
                type="number"
                min="1"
                :value="cantidadDe(producto.codigo)"
                @input="cantidades[producto.codigo] = Number($event.target.value) || 1"
              />
            </td>
            <td class="col-accion">
              <button
                type="button"
                class="anadir-btn"
                :class="{ anadido: anadidos[producto.codigo] }"
                @click="handleAnadir(producto)"
              >
                <Icon
                  :name="anadidos[producto.codigo] ? 'lucide:check' : 'lucide:plus'"
                />
                {{ anadidos[producto.codigo] ? "Añadido" : "Añade al presupuesto" }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.referencias-wrap {
  container-type: inline-size;
  padding: 2.5rem 0 1.5rem;
}

.referencias-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.kicker {
  font-family: var(--mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ink-mute);
}

.ver-presupuesto {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1rem;
  background: var(--ink);
  color: #fff;
  border: none;
  font-family: var(--mono);
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: background 0.2s;
}
.ver-presupuesto:hover {
  background: var(--accent);
  color: var(--ink);
}

.referencias-table-scroll {
  overflow-x: auto;
  border: 1px solid var(--line);
}

.referencias-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}

.referencias-table thead {
  background: var(--panel);
}
.referencias-table th {
  color: #fff;
  text-align: left;
  padding: 0.8rem 1rem;
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: 700;
}

.referencias-table td {
  padding: 0.7rem 1rem;
  border-top: 1px solid var(--line);
  font-size: 0.9rem;
  vertical-align: middle;
}

.col-codigo {
  color: var(--ink-mute);
  font-family: var(--mono);
  font-size: 0.82rem;
  white-space: nowrap;
}

.col-nombre {
  color: var(--ink);
  font-weight: 600;
}

.col-imagen img {
  width: 42px;
  height: 42px;
  object-fit: contain;
}
.col-imagen-clickable {
  cursor: zoom-in;
  transition: opacity 0.2s;
}
.col-imagen-clickable:hover {
  opacity: 0.75;
}

.col-cantidad input {
  width: 60px;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--line);
  text-align: center;
  font-family: var(--sans);
}
.col-cantidad input:focus {
  outline: none;
  border-color: var(--accent);
}

.col-accion {
  white-space: nowrap;
}

.anadir-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 0.9rem;
  background: var(--accent);
  color: var(--ink);
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s;
  white-space: nowrap;
}
.anadir-btn:hover {
  background: var(--ink);
  color: #fff;
}
.anadir-btn.anadido {
  background: #16a34a;
  color: #fff;
}

@container (max-width: 560px) {
  .referencias-head {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.7rem;
  }
  .ver-presupuesto {
    width: 100%;
    justify-content: center;
  }

  /* Tabla -> tarjetas apiladas en pantallas estrechas */
  .referencias-table-scroll {
    overflow-x: visible;
    border: none;
  }
  .referencias-table {
    min-width: 0;
  }
  .referencias-table thead {
    display: none;
  }
  .referencias-table,
  .referencias-table tbody,
  .referencias-table tr,
  .referencias-table td {
    display: block;
    width: 100%;
  }
  .referencias-table tr {
    margin-bottom: 0.9rem;
    border: 1px solid var(--line);
    padding: 0.9rem;
  }
  .referencias-table td {
    border-top: none;
    padding: 0.4rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.8rem;
  }
  .referencias-table td[data-label]::before {
    content: attr(data-label);
    flex-shrink: 0;
    font-family: var(--mono);
    font-size: 0.68rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: var(--ink-mute);
  }
  .col-nombre {
    text-align: right;
  }
  .col-imagen img {
    margin-left: auto;
  }
  .col-accion {
    margin-top: 0.5rem;
  }
  .anadir-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
