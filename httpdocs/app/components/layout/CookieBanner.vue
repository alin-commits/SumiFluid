<script setup>
const { consent, accept, reject } = useCookieConsent();
</script>

<template>
  <Transition name="cookie-banner">
    <div v-if="consent === null" class="cookie-banner" role="dialog" aria-label="Aviso de cookies">
      <div class="wrap cookie-banner-inner">
        <p>
          Utilizamos cookies propias y de análisis (Google Analytics) para
          mejorar su experiencia en este sitio. Puede aceptarlas o
          rechazarlas; consulte más información en nuestra
          <NuxtLink to="/politica-de-cookies">Política de Cookies</NuxtLink>.
        </p>
        <div class="cookie-banner-actions">
          <button class="cookie-btn cookie-btn-reject" @click="reject">
            Rechazar
          </button>
          <button class="cookie-btn cookie-btn-accept" @click="accept">
            Aceptar
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cookie-banner {
  position: fixed;
  inset-inline: 0;
  bottom: 0;
  z-index: 200;
  background: var(--panel);
  border-top: 1px solid rgba(255, 255, 255, 0.12);
}

.cookie-banner-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.6rem;
  padding-block: 1.2rem;
  flex-wrap: wrap;
}

.cookie-banner p {
  margin: 0;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.88rem;
  line-height: 1.6;
  max-width: 70ch;

  & a {
    color: var(--accent);
    text-decoration: underline;
  }
}

.cookie-banner-actions {
  display: flex;
  gap: 0.8rem;
  flex-shrink: 0;
}

.cookie-btn {
  font-family: var(--mono);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.7rem 1.4rem;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: transparent;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cookie-btn-reject:hover {
  background: rgba(255, 255, 255, 0.1);
}

.cookie-btn-accept {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--ink);
}

.cookie-btn-accept:hover {
  background: #fff;
  border-color: #fff;
}

.cookie-banner-enter-active,
.cookie-banner-leave-active {
  transition: transform 0.3s ease;
}
.cookie-banner-enter-from,
.cookie-banner-leave-to {
  transform: translateY(100%);
}

@media (max-width: 640px) {
  .cookie-banner-inner {
    flex-direction: column;
    align-items: stretch;
  }
  .cookie-banner-actions {
    justify-content: stretch;

    & .cookie-btn {
      flex: 1;
    }
  }
}
</style>
