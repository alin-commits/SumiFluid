<script setup>
import { parseChatMarkup } from "~/utils/chatMarkup";

const { isOpen, messages, isSending, error, toggle, sendMessage } = useChat();
const { addItem } = usePresupuesto();

const draft = ref("");
const listRef = ref(null);
const productosAnadidos = reactive({});

function handleAnadirProducto(node) {
  addItem(
    { codigo: node.codigo, nombre: node.nombre, enlace: node.enlace },
    1,
  );
  productosAnadidos[node.codigo] = true;
}

const quickReplies = [
  { label: "Pedir presupuesto", text: "Quiero pedir un presupuesto" },
  { label: "Ver catálogo", text: "¿Qué categorías de producto tenéis?" },
  { label: "Taller propio", text: "Cuéntame sobre vuestro taller propio" },
  { label: "Contacto", text: "¿Cómo puedo contactar con vosotros?" },
];

// Solo se muestran antes de la primera consulta del cliente
const showQuickReplies = computed(() => messages.value.length <= 1);

async function handleSend(text) {
  const value = text ?? draft.value;
  draft.value = "";
  await sendMessage(value);
}

function scrollToBottom() {
  if (listRef.value) {
    listRef.value.scrollTop = listRef.value.scrollHeight;
  }
}

// Solo hace autoscroll cuando el USUARIO envía un mensaje propio (para que vea
// lo que acaba de escribir). Cuando llega la respuesta del asistente, el
// scroll se queda donde estaba: es el usuario quien decide bajar a leerla.
watch(
  () => messages.value.length,
  () => {
    const ultimo = messages.value[messages.value.length - 1];
    if (ultimo?.role === "user") {
      nextTick(scrollToBottom);
    }
  },
);

watch(isOpen, (open) => {
  if (open) nextTick(scrollToBottom);
});
</script>

<template>
  <Transition name="chat-panel">
    <div v-if="isOpen" class="chat-panel">
      <div class="chat-header">
        <div class="chat-header-brand">
          <div class="chat-logo">
            <NuxtImg src="/images/logo-sumifluid.png" alt="" height="16" />
          </div>
          <div>
            <p class="chat-title">Asistente Sumifluid</p>
            <p class="chat-status"><span class="chat-status-dot"></span>En línea</p>
          </div>
        </div>
        <button
          type="button"
          class="chat-close"
          aria-label="Cerrar chat"
          @click="toggle"
        >
          <Icon name="lucide:x" />
        </button>
      </div>

      <div ref="listRef" class="chat-body">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="chat-msg"
          :class="msg.role"
        >
          <template v-if="msg.role === 'assistant'">
            <template
              v-for="(node, ni) in parseChatMarkup(msg.content)"
              :key="ni"
            >
              <strong v-if="node.type === 'bold'">{{ node.text }}</strong>
              <u v-else-if="node.type === 'underline'">{{ node.text }}</u>
              <NuxtLink
                v-else-if="node.type === 'link'"
                :to="node.url"
                class="chat-link"
                >{{ node.text }}</NuxtLink
              >
              <div v-else-if="node.type === 'producto'" class="chat-producto-card">
                <div class="chat-producto-info">
                  <p class="chat-producto-nombre">{{ node.nombre }}</p>
                  <p class="chat-producto-codigo">{{ node.codigo }}</p>
                </div>
                <div class="chat-producto-actions">
                  <NuxtLink :to="node.enlace" class="chat-producto-ver">Ver producto</NuxtLink>
                  <button
                    type="button"
                    class="chat-producto-anadir"
                    :class="{ anadido: productosAnadidos[node.codigo] }"
                    @click="handleAnadirProducto(node)"
                  >
                    {{ productosAnadidos[node.codigo] ? "Añadido" : "Añadir al presupuesto" }}
                  </button>
                </div>
              </div>
              <template v-else>{{ node.text }}</template>
            </template>
          </template>
          <template v-else>{{ msg.content }}</template>
        </div>
        <div v-if="isSending" class="chat-msg assistant chat-typing">
          <span></span><span></span><span></span>
        </div>
        <p v-if="error" class="chat-error">{{ error }}</p>
      </div>

      <div v-if="showQuickReplies" class="chat-quick-replies">
        <button
          v-for="qr in quickReplies"
          :key="qr.label"
          type="button"
          class="chat-quick-reply"
          :disabled="isSending"
          @click="handleSend(qr.text)"
        >
          {{ qr.label }}
        </button>
      </div>

      <form class="chat-input-row" @submit.prevent="handleSend()">
        <input
          v-model="draft"
          type="text"
          placeholder="Escribe tu consulta..."
          :disabled="isSending"
          maxlength="1000"
        />
        <button type="submit" :disabled="isSending || !draft.trim()">
          <Icon name="lucide:send" />
        </button>
      </form>
      <div class="chat-footer">
        <span>No compartas datos personales o sensibles en el chat.</span>
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
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.76rem;
  color: rgba(255, 255, 255, 0.65);
}

.chat-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #4ade80;
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

.chat-msg {
  max-width: 85%;
  padding: 0.65rem 0.9rem;
  border-radius: 12px;
  font-size: 0.88rem;
  line-height: 1.55;
  white-space: pre-wrap;
}

.chat-msg.assistant {
  align-self: flex-start;
  background: var(--bg-2);
  color: var(--ink);
  border-bottom-left-radius: 2px;
}

.chat-msg.user {
  align-self: flex-end;
  background: var(--ink);
  color: #fff;
  border-bottom-right-radius: 2px;
}

.chat-link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  margin: 0.3rem 0.3rem 0.1rem 0;
  padding: 0.45rem 0.8rem;
  border-radius: 20px;
  background: var(--accent);
  color: var(--ink);
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  vertical-align: middle;
  transition: background 0.2s;

  &::after {
    content: "→";
  }
}
.chat-link:hover {
  background: var(--ink);
  color: #fff;
}

.chat-producto-card {
  display: block;
  margin: 0.5rem 0;
  padding: 0.7rem 0.8rem;
  background: #fff;
  border: 1px solid var(--line);
  border-radius: 10px;
}
.chat-producto-nombre {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--ink);
}
.chat-producto-codigo {
  font-size: 0.72rem;
  font-family: var(--mono);
  color: var(--ink-mute);
  margin-bottom: 0.5rem;
}
.chat-producto-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}
.chat-producto-ver,
.chat-producto-anadir {
  padding: 0.4rem 0.7rem;
  border-radius: 16px;
  font-size: 0.74rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
}
.chat-producto-ver:hover {
  border-color: var(--ink);
}
.chat-producto-anadir {
  background: var(--accent);
  border-color: var(--accent);
  color: var(--ink);
}
.chat-producto-anadir:hover {
  background: var(--ink);
  border-color: var(--ink);
  color: #fff;
}
.chat-producto-anadir.anadido {
  background: #16a34a;
  border-color: #16a34a;
  color: #fff;
}

.chat-typing {
  display: flex;
  gap: 0.3rem;
  align-items: center;

  & span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ink-mute);
    animation: chatTyping 1.2s infinite ease-in-out;
  }
  & span:nth-child(2) {
    animation-delay: 0.15s;
  }
  & span:nth-child(3) {
    animation-delay: 0.3s;
  }
}
@keyframes chatTyping {
  0%,
  60%,
  100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-3px);
  }
}

.chat-error {
  color: #d92d20;
  font-size: 0.8rem;
}

.chat-quick-replies {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  padding: 0 1.1rem 0.9rem;
  flex-shrink: 0;
}

.chat-quick-reply {
  padding: 0.55rem 0.7rem;
  border-radius: 10px;
  border: 1px solid var(--line);
  background: #fff;
  color: var(--ink);
  font-size: 0.78rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}
.chat-quick-reply:hover:not(:disabled) {
  border-color: var(--accent);
  background: var(--bg-2);
}
.chat-quick-reply:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.chat-input-row {
  display: flex;
  gap: 0.5rem;
  padding: 0 1.1rem 0.8rem;
  flex-shrink: 0;

  & input {
    flex-grow: 1;
    padding: 0.75rem 1rem;
    border: 1px solid var(--line);
    border-radius: 24px;
    font-size: 0.88rem;
    color: var(--ink);
  }
  & input:focus {
    outline: none;
    border-color: var(--accent);
  }
  & button {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--accent);
    color: var(--ink);
    border: none;
    cursor: pointer;
    transition: background 0.2s;
  }
  & button:hover:not(:disabled) {
    background: var(--ink);
    color: #fff;
  }
  & button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
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
  .chat-quick-replies {
    grid-template-columns: 1fr;
  }
  .chat-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
}
</style>
