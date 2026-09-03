<script setup>
const { items, isOpen, toggle, removeItem, updateCantidad, verPdf } =
  usePresupuesto();
const { open: openLightbox } = useImageLightbox();

const generandoPdf = ref(false);
async function handleVerPdf() {
  generandoPdf.value = true;
  try {
    await verPdf();
  } finally {
    generandoPdf.value = false;
  }
}
</script>

<template>
  <Transition name="chat-panel">
    <div v-if="isOpen" class="chat-panel presupuesto-panel">
      <div class="chat-header">
        <div class="chat-header-brand">
          <div class="chat-logo">
            <Icon name="lucide:file-text" size="1.2rem" />
          </div>
          <div>
            <p class="chat-title">Tu presupuesto</p>
            <p class="chat-status">
              {{ items.length }} {{ items.length === 1 ? "producto" : "productos" }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="chat-close"
          aria-label="Cerrar presupuesto"
          @click="toggle"
        >
          <Icon name="lucide:x" />
        </button>
      </div>

      <div class="chat-body">
        <p v-if="!items.length" class="vacio">
          Todavía no has añadido productos. Búscalos en las páginas de
          producto y pulsa «Añade al presupuesto».
        </p>

        <template v-else>
          <ul class="items-list">
            <li v-for="item in items" :key="item.codigo" class="item-row">
              <img
                v-if="item.imagenUrl"
                :src="item.imagenUrl"
                :alt="item.nombre"
                class="item-imagen item-imagen-clickable"
                @click="openLightbox(item.imagenUrl, item.nombre)"
              />
              <div class="item-info">
                <p class="item-nombre">{{ item.nombre }}</p>
                <p class="item-codigo">{{ item.codigo }}</p>
              </div>
              <input
                type="number"
                min="1"
                :value="item.cantidad"
                class="item-cantidad"
                @input="updateCantidad(item.codigo, Number($event.target.value))"
              />
              <button
                type="button"
                class="item-remove"
                aria-label="Quitar producto"
                @click="removeItem(item.codigo)"
              >
                <Icon name="lucide:trash-2" />
              </button>
            </li>
          </ul>

          <div class="panel-actions">
            <button type="button" class="pdf-btn" :disabled="generandoPdf" @click="handleVerPdf">
              <Icon name="lucide:file-down" />
              {{ generandoPdf ? "Generando..." : "Ver PDF" }}
            </button>
            <NuxtLink to="/presupuesto" class="pdf-btn" @click="toggle">
              <Icon name="lucide:maximize-2" />
              Página completa
            </NuxtLink>
          </div>

          <SectionPresupuestoContactForm />
        </template>
      </div>

      <div class="chat-footer">
        <span>Sin precios en línea: le llamamos con la oferta.</span>
        <NuxtLink to="/contacto">Contactar con Sumifluid</NuxtLink>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.chat-panel {
  position: fixed;
  right: 1.4rem;
  bottom: 6.5rem;
  z-index: 150;
  width: min(380px, calc(100vw - 2.8rem));
  height: min(560px, calc(100vh - 8rem));
  background: #fff;
  border-radius: 16px;
  border: 1px solid var(--line);
  box-shadow: 0 16px 40px rgba(14, 18, 24, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  background: var(--panel);
  color: #fff;
  padding: 1rem 1.1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.chat-header-brand {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}

.chat-logo {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: #fff;
  color: var(--ink);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.chat-title {
  font-weight: 700;
  font-size: 0.92rem;
  line-height: 1.3;
}

.chat-status {
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.65);
}

.chat-close {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}
.chat-close:hover {
  background: rgba(255, 255, 255, 0.22);
}

.chat-body {
  flex-grow: 1;
  overflow-y: auto;
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.chat-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
  padding: 0.7rem 1.1rem;
  border-top: 1px solid var(--line);
  flex-shrink: 0;

  & span {
    font-size: 0.68rem;
    color: var(--ink-mute);
  }
  & a {
    font-size: 0.72rem;
    font-weight: 600;
    color: var(--ink);
    white-space: nowrap;
  }
  & a:hover {
    color: var(--accent);
  }
}

.chat-panel-enter-active,
.chat-panel-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.chat-panel-enter-from,
.chat-panel-leave-to {
  opacity: 0;
  transform: translateY(12px);
}

@media (max-width: 640px) {
  .chat-panel {
    inset: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    height: 100dvh;
    border-radius: 0;
    border: none;
  }
  .chat-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
}

.vacio {
  font-size: 0.86rem;
  color: var(--ink-mute);
  line-height: 1.6;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.item-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem;
  border: 1px solid var(--line);
  background: var(--bg-2);
}

.item-imagen {
  width: 36px;
  height: 36px;
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

.item-info {
  flex-grow: 1;
  min-width: 0;
}

.item-nombre {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--ink);
}

.item-codigo {
  font-size: 0.74rem;
  font-family: var(--mono);
  color: var(--ink-mute);
}

.item-cantidad {
  width: 50px;
  flex-shrink: 0;
  padding: 0.35rem;
  border: 1px solid var(--line);
  text-align: center;
}
.item-cantidad:focus {
  outline: none;
  border-color: var(--accent);
}

.item-remove {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--ink-mute);
  cursor: pointer;
  transition: color 0.2s;
}
.item-remove:hover {
  color: #d92d20;
}

.panel-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  padding-top: 0.4rem;
}

.pdf-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.7rem 0.5rem;
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
  font-family: var(--mono);
  font-size: 0.76rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: border-color 0.2s;
  text-align: center;
}
.pdf-btn:hover:not(:disabled) {
  border-color: var(--accent);
}
.pdf-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
