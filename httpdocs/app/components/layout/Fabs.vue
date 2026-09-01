<script setup>
const { get } = useStrapi();

const { data } = await get("empresa");

const nombreEmpresa = computed(() => data.value?.data.nombre);

const telNoSpaces = computed(() => data.value?.data.telefonoPrincipalNoSpaces);
const whatsappHref = computed(() => {
  return `https://wa.me/34${telNoSpaces.value}?text=Hola%20${nombreEmpresa.value}%2C%20quer%C3%ADa%20hacer%20una%20consulta`;
});
</script>

<template>
  <div class="fab-stack">
    <a
      :href="whatsappHref"
      class="fab fab-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
    >
      <span class="fab-pulse" aria-hidden="true"></span>
      <Icon name="ic:outline-whatsapp" size="2rem" />
      <span class="fab-label">WhatsApp</span>
    </a>
    <a
      :href="`tel:+34${telNoSpaces}`"
      class="fab fab-call"
      aria-label="Llamar por teléfono"
    >
      <Icon name="lucide:phone" size="2rem" />
      <span class="fab-label">Llamar</span>
    </a>
  </div>
</template>

<style>
.fab-stack {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
.fab {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(18, 40, 76, 0.28);
  transition:
    transform 0.2s var(--ease),
    box-shadow 0.2s;
  border: none;
  position: relative;
}
.fab:hover {
  transform: scale(1.07);
  box-shadow: 0 10px 30px rgba(74, 96, 133, 0.36);
}
.fab:active {
  transform: scale(0.96);
}
.fab-call {
  background: #f5a623;
  color: #fff;
  box-shadow: 0.7px 1px 0.7px rgba(171, 171, 171, 0.4);
}

.fab-whatsapp {
  background: #25d366;
  color: #fff;
}
.fab-label {
  position: absolute;
  right: calc(100% + 0.7rem);
  top: 50%;
  transform: translateY(-50%) translateX(6px);
  background: var(--ink);
  color: #fff;
  font-family: var(--mono);
  font-size: 0.74rem;
  letter-spacing: 0.03em;
  padding: 0.5rem 0.8rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.2s,
    transform 0.2s;
}
.fab:hover .fab-label {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}
.fab-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: #25d366;
  animation: fabPulse 2.4s ease-out infinite;
}
@keyframes fabPulse {
  0% {
    transform: scale(1);
    opacity: 0.55;
  }
  100% {
    transform: scale(1.7);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .fab-pulse {
    animation: none;
    display: none;
  }
}
@media (max-width: 640px) {
  .fab-stack {
    right: 1rem;
    bottom: 1rem;
    gap: 0.65rem;
  }
  .fab {
    width: 50px;
    height: 50px;
  }
  .fab svg {
    width: 23px;
    height: 23px;
  }
  .fab-label {
    display: none;
  }
}
</style>
