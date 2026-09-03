<script setup>
const {
  consent,
  dismissedThisSession,
  save,
  acceptAll,
  rejectAll,
  dismiss,
} = useCookieConsent();

const visible = computed(() => consent.value === null && !dismissedThisSession.value);

const expanded = ref(false);
const activeTab = ref("declaracion");
const openDetail = reactive({});

const prefs = reactive({
  necesarias: true,
  rendimiento: false,
  preferencias: false,
  funcionalidad: false,
  noClasificadas: false,
});

function toggleDetail(key) {
  openDetail[key] = !openDetail[key];
}

function handleGuardar() {
  save({ ...prefs });
}

function handleRechazar() {
  rejectAll();
}

function handleAceptar() {
  acceptAll();
}
</script>

<template>
  <Transition name="cookie-fade">
    <div v-if="visible" class="cookie-overlay" role="dialog" aria-modal="true" aria-label="Aviso de cookies">
      <div class="cookie-modal" :class="{ expanded }">
        <div class="cookie-modal-header">
          <h2>Este sitio web utiliza cookies</h2>
          <button type="button" class="cookie-close" aria-label="Cerrar" @click="dismiss">
            <Icon name="lucide:x" />
          </button>
        </div>

        <p class="cookie-desc">
          Utilizamos cookies para personalizar el contenido y analizar
          nuestro tráfico. También podemos compartir información sobre el
          uso del sitio con nuestros socios de análisis, quienes pueden
          combinarla con otra información que les haya proporcionado.
          <NuxtLink to="/politica-de-cookies">Política de cookies</NuxtLink>.
        </p>

        <template v-if="expanded">
          <div class="cookie-tabs">
            <button
              type="button"
              class="cookie-tab"
              :class="{ active: activeTab === 'declaracion' }"
              @click="activeTab = 'declaracion'"
            >
              Declaración de cookies
            </button>
            <button
              type="button"
              class="cookie-tab"
              :class="{ active: activeTab === 'info' }"
              @click="activeTab = 'info'"
            >
              Sobre las cookies
            </button>
          </div>

          <div v-if="activeTab === 'declaracion'" class="cookie-categories">
            <div v-for="cat in COOKIE_CATEGORIES" :key="cat.key" class="cookie-category">
              <div class="cookie-category-row">
                <div class="cookie-category-text">
                  <p class="cookie-category-label">{{ cat.label }}</p>
                  <p class="cookie-category-description">{{ cat.description }}</p>
                  <button
                    type="button"
                    class="cookie-detail-toggle"
                    @click="toggleDetail(cat.key)"
                  >
                    {{ openDetail[cat.key] ? "Ocultar cookies" : "Mostrar cookies" }}
                    <Icon
                      :name="openDetail[cat.key] ? 'lucide:chevron-up' : 'lucide:chevron-down'"
                    />
                  </button>
                  <p v-if="openDetail[cat.key]" class="cookie-detail-list">
                    {{ cat.cookies }}
                  </p>
                </div>
                <label
                  class="cookie-switch"
                  :class="{ locked: cat.locked }"
                >
                  <input
                    type="checkbox"
                    v-model="prefs[cat.key]"
                    :disabled="cat.locked"
                    :aria-label="cat.label"
                  />
                  <span class="cookie-switch-track"></span>
                </label>
              </div>
            </div>
          </div>

          <div v-else class="cookie-info">
            <p>
              Las cookies son pequeños archivos de texto que los sitios web
              que usted visita colocan en su ordenador. Se utilizan
              ampliamente para que los sitios web funcionen, o funcionen de
              forma más eficiente, así como para ofrecer información a los
              propietarios del sitio.
            </p>
            <p>
              Las cookies que se necesitan para que el sitio web funcione
              correctamente se pueden configurar sin su autorización. Todas
              las demás cookies deben ser aprobadas antes de que se puedan
              usar en su navegador.
            </p>
            <p>
              Puede cambiar su consentimiento para el uso de cookies en
              cualquier momento desde el enlace disponible en el pie de
              página de este sitio.
            </p>
          </div>
        </template>

        <template v-else>
          <div class="cookie-categories-compact">
            <label
              v-for="cat in COOKIE_CATEGORIES"
              :key="cat.key"
              class="cookie-checkbox-row"
              :class="{ locked: cat.locked }"
            >
              <input
                type="checkbox"
                v-model="prefs[cat.key]"
                :disabled="cat.locked"
              />
              <span>{{ cat.label.toUpperCase() }}</span>
            </label>
          </div>
        </template>

        <div class="cookie-actions">
          <button
            v-if="expanded"
            type="button"
            class="cookie-btn cookie-btn-outline"
            @click="handleAceptar"
          >
            Aceptar todo
          </button>
          <button type="button" class="cookie-btn cookie-btn-outline" @click="handleRechazar">
            Rechazar todo
          </button>
          <button type="button" class="cookie-btn cookie-btn-primary" @click="handleGuardar">
            Guardar y cerrar
          </button>
        </div>

        <button
          v-if="!expanded"
          type="button"
          class="cookie-details-link"
          @click="expanded = true"
        >
          <Icon name="lucide:settings" />
          Mostrar detalles
        </button>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
/* Texto secundario más oscuro que --ink-mute: sobre fondo blanco, --ink-mute da ~4.24:1
   (por debajo del mínimo AA de 4.5:1 para texto normal). Este tono da ~7.7:1. */
.cookie-modal {
  --cookie-mute: #45536b;
}

.cookie-overlay {
  position: fixed;
  inset: 0;
  z-index: 200;
  background: rgba(15, 20, 28, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
}

.cookie-modal {
  background: #fff;
  width: 100%;
  max-width: 420px;
  max-height: calc(100vh - 2.4rem);
  overflow-y: auto;
  padding: 1.6rem;
  border-radius: 4px;
  box-shadow: 0 20px 60px rgba(14, 18, 24, 0.35);
}
.cookie-modal.expanded {
  max-width: 620px;
}

.cookie-modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.8rem;
}
.cookie-modal-header h2 {
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--ink);
}
.cookie-close {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--ink);
  cursor: pointer;
  transition: color 0.2s;
  font-size: 1.2rem;
}
.cookie-close:hover {
  color: var(--ink);
}

.cookie-desc {
  font-size: 1rem;
  line-height: 1.65;
  color: var(--cookie-mute);
  margin-bottom: 1.2rem;

  & a {
    color: var(--accent);
    text-decoration: underline;
  }
}

.cookie-categories-compact {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-bottom: 1.2rem;
}
.cookie-checkbox-row {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: var(--ink);
  cursor: pointer;

  & input {
    width: 22px;
    height: 22px;
    accent-color: var(--accent);
    flex-shrink: 0;
  }
  &.locked {
    color: var(--cookie-mute);
    cursor: default;
  }
}

.cookie-tabs {
  display: flex;
  border-bottom: 1px solid var(--line);
  margin-bottom: 1rem;
}
.cookie-tab {
  padding: 0.8rem 1rem;
  border: none;
  background: transparent;
  font-family: var(--mono);
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: var(--cookie-mute);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}
.cookie-tab.active {
  color: var(--ink);
  border-bottom-color: var(--accent);
  font-weight: 700;
}

.cookie-categories {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.2rem;
  max-height: 320px;
  overflow-y: auto;
}
.cookie-category {
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--line);
}
.cookie-category:last-child {
  border-bottom: none;
}
.cookie-category-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}
.cookie-category-label {
  font-size: 1rem;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 0.3rem;
}
.cookie-category-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--cookie-mute);
}
.cookie-detail-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-top: 0.5rem;
  border: none;
  background: transparent;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
}
.cookie-detail-list {
  margin-top: 0.4rem;
  padding: 0.6rem 0.8rem;
  background: var(--bg-2);
  font-size: 0.85rem;
  line-height: 1.5;
  color: var(--cookie-mute);
}

.cookie-switch {
  flex-shrink: 0;
  position: relative;
  width: 40px;
  height: 22px;
  cursor: pointer;

  & input {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    cursor: pointer;
  }
}
.cookie-switch-track {
  position: absolute;
  inset: 0;
  background: #d5d5d5;
  border-radius: 11px;
  transition: background 0.2s;
}
.cookie-switch-track::after {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  transition: transform 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.cookie-switch input:checked ~ .cookie-switch-track {
  background: var(--accent);
}
.cookie-switch input:checked ~ .cookie-switch-track::after {
  transform: translateX(18px);
}
.cookie-switch.locked .cookie-switch-track {
  background: #b8c4d9;
}
.cookie-switch.locked {
  cursor: default;
}

.cookie-info {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  margin-bottom: 1.2rem;
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--cookie-mute);
}

.cookie-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.cookie-btn {
  flex: 1;
  min-width: 130px;
  padding: 0.8rem 1rem;
  font-family: var(--mono);
  font-size: 0.86rem;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: all 0.2s;
  border-radius: 2px;
}
.cookie-btn-outline {
  background: transparent;
  border: 1px solid var(--line);
  color: var(--ink);
}
.cookie-btn-outline:hover {
  border-color: var(--ink);
}
.cookie-btn-primary {
  background: var(--ink);
  border: 1px solid var(--ink);
  color: #fff;
}
.cookie-btn-primary:hover {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--ink);
}

.cookie-details-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
  margin-top: 0.9rem;
  padding: 0.4rem;
  border: none;
  background: transparent;
  color: var(--cookie-mute);
  font-size: 0.88rem;
  font-weight: 700;
  cursor: pointer;
}
.cookie-details-link:hover {
  color: var(--ink);
}

.cookie-fade-enter-active,
.cookie-fade-leave-active {
  transition: opacity 0.2s ease;
}
.cookie-fade-enter-from,
.cookie-fade-leave-to {
  opacity: 0;
}

@media (max-width: 640px) {
  .cookie-modal {
    padding: 1.2rem;
    max-height: calc(100vh - 1.6rem);
  }
  .cookie-actions {
    flex-direction: column;
  }
  .cookie-btn {
    width: 100%;
  }
}
</style>
